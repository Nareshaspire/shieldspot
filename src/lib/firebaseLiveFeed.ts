import { collection, getApps, initializeApp } from 'firebase/app';
import { getFirestore, onSnapshot, Timestamp, updateDoc, doc } from 'firebase/firestore';
import type { DemoAlert, DemoAsset, DemoEvent, DemoState, TelemetryPoint } from './demoStream';

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Object.values(config).every((value) => typeof value === 'string' && value.length > 0);

const db = isFirebaseConfigured
  ? getFirestore(getApps()[0] ?? initializeApp(config))
  : null;

function asNumber(value: unknown, fallback = 0): number {
  const number = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function asTimestamp(value: unknown): number {
  if (value instanceof Timestamp) return value.toMillis();
  if (typeof value === 'string') {
    const parsed = Date.parse(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return asNumber(value, Date.now());
}

function mapAsset(id: string, value: Record<string, unknown>): DemoAsset {
  const riskScore = Math.max(0, Math.min(100, asNumber(value.riskScore)));
  const reportedStatus = value.status;
  const status = reportedStatus === 'warning' || reportedStatus === 'critical'
    ? reportedStatus
    : riskScore >= 75 ? 'critical' : riskScore >= 50 ? 'warning' : 'operational';
  return {
    id,
    name: typeof value.name === 'string' ? value.name : id,
    site: typeof value.site === 'string' ? value.site : 'Unassigned site',
    equipment: typeof value.equipment === 'string' ? value.equipment : 'Equipment',
    vibration: asNumber(value.vibration),
    temperature: asNumber(value.temperature),
    pressure: asNumber(value.pressure),
    riskScore,
    status,
    updatedAt: asTimestamp(value.updatedAt),
  };
}

function mapAlert(id: string, value: Record<string, unknown>): DemoAlert {
  const severity = value.severity === 'critical' ? 'critical' : 'warning';
  return {
    id,
    assetId: typeof value.assetId === 'string' ? value.assetId : 'unknown',
    assetName: typeof value.assetName === 'string' ? value.assetName : 'Unknown asset',
    severity,
    message: typeof value.message === 'string' ? value.message : 'New telemetry alert',
    createdAt: asTimestamp(value.createdAt),
    acknowledged: value.acknowledged === true,
  };
}

function mapEvent(id: string, value: Record<string, unknown>): DemoEvent {
  const kind = value.kind === 'critical' || value.kind === 'warning' || value.kind === 'recovery' ? value.kind : 'system';
  return {
    id,
    createdAt: asTimestamp(value.createdAt),
    title: typeof value.title === 'string' ? value.title : 'System event',
    detail: typeof value.detail === 'string' ? value.detail : '',
    kind,
  };
}

/**
 * Subscribe to Firestore collections: assets, alerts, and events. Returns null when
 * Firebase environment configuration is absent. Collection shapes are documented in README.
 */
export function subscribeFirebaseFeed(
  onState: (state: DemoState) => void,
  onError: (message: string) => void,
): (() => void) | null {
  if (!db) return null;

  let assets: DemoAsset[] = [];
  let alerts: DemoAlert[] = [];
  let events: DemoEvent[] = [];
  let history: DemoState['history'] = {};
  let stopped = false;
  const unsubscribers: Array<() => void> = [];

  const publish = () => {
    if (stopped) return;
    const now = Date.now();
    for (const asset of assets) {
      const point: TelemetryPoint = {
        time: new Date(asset.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        timestamp: asset.updatedAt,
        vibration: asset.vibration,
        temperature: asset.temperature,
        riskScore: asset.riskScore,
      };
      const previous = history[asset.id] ?? [];
      if (previous.at(-1)?.timestamp !== point.timestamp) history = { ...history, [asset.id]: [...previous, point].slice(-30) };
    }
    onState({ assets, alerts, events, history, anomalyAssetId: null, anomalyUntil: null });
    if (!assets.length && !alerts.length && !events.length) onError('Connected to Firebase, but no documents have arrived yet.');
    void now;
  };

  const listen = <T,>(name: string, apply: (rows: Array<{ id: string; data: Record<string, unknown> }>) => void) => {
    unsubscribers.push(onSnapshot(collection(db!, name), (snapshot) => {
      apply(snapshot.docs.map((item) => ({ id: item.id, data: item.data() })));
      publish();
    }, (error) => onError(`Firestore ${name} subscription failed: ${error.message}`)));
  };

  listen('assets', (rows) => { assets = rows.map(({ id, data }) => mapAsset(id, data)); });
  listen('alerts', (rows) => { alerts = rows.map(({ id, data }) => mapAlert(id, data)).sort((a, b) => b.createdAt - a.createdAt).slice(0, 30); });
  listen('events', (rows) => { events = rows.map(({ id, data }) => mapEvent(id, data)).sort((a, b) => b.createdAt - a.createdAt).slice(0, 30); });

  return () => {
    stopped = true;
    unsubscribers.forEach((unsubscribe) => unsubscribe());
  };
}

export async function acknowledgeFirebaseAlert(alertId: string): Promise<void> {
  if (!db) throw new Error('Firebase is not configured.');
  await updateDoc(doc(db, 'alerts', alertId), { acknowledged: true });
}
