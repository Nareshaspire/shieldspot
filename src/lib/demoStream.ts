export type AssetStatus = 'operational' | 'warning' | 'critical';
export type AlertSeverity = Exclude<AssetStatus, 'operational'>;

export interface DemoAsset {
  id: string;
  name: string;
  site: string;
  equipment: string;
  vibration: number;
  temperature: number;
  pressure: number;
  riskScore: number;
  status: AssetStatus;
  updatedAt: number;
}

export interface TelemetryPoint {
  time: string;
  timestamp: number;
  vibration: number;
  temperature: number;
  riskScore: number;
}

export interface DemoAlert {
  id: string;
  assetId: string;
  assetName: string;
  severity: AlertSeverity;
  message: string;
  createdAt: number;
  acknowledged: boolean;
}

export interface DemoEvent {
  id: string;
  createdAt: number;
  title: string;
  detail: string;
  kind: 'system' | 'warning' | 'critical' | 'recovery';
}

export interface DemoState {
  assets: DemoAsset[];
  history: Record<string, TelemetryPoint[]>;
  alerts: DemoAlert[];
  events: DemoEvent[];
  anomalyAssetId: string | null;
  anomalyUntil: number | null;
}

const statusForRisk = (riskScore: number): AssetStatus => {
  if (riskScore >= 75) return 'critical';
  if (riskScore >= 50) return 'warning';
  return 'operational';
};

const timeLabel = (timestamp: number) =>
  new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

const makeEvent = (now: number, title: string, detail: string, kind: DemoEvent['kind']): DemoEvent => ({
  id: `${now}-${Math.random().toString(36).slice(2, 8)}`,
  createdAt: now,
  title,
  detail,
  kind,
});

const makeAlert = (asset: DemoAsset, now: number): DemoAlert => ({
  id: `${asset.id}-${now}`,
  assetId: asset.id,
  assetName: asset.name,
  severity: asset.status as AlertSeverity,
  message: asset.status === 'critical'
    ? `Risk score ${Math.round(asset.riskScore)} exceeds the critical threshold.`
    : `Risk score ${Math.round(asset.riskScore)} is above the watch threshold.`,
  createdAt: now,
  acknowledged: false,
});

const initialAssets: Omit<DemoAsset, 'updatedAt'>[] = [
  { id: 'turbine-04', name: 'Turbine-04', site: 'North Plant', equipment: 'Wind turbine', vibration: 42, temperature: 68, pressure: 71, riskScore: 24, status: 'operational' },
  { id: 'pump-09', name: 'Pump-09', site: 'Water Works', equipment: 'Centrifugal pump', vibration: 51, temperature: 63, pressure: 76, riskScore: 38, status: 'operational' },
  { id: 'boiler-12', name: 'Boiler-12', site: 'Central Plant', equipment: 'Steam boiler', vibration: 34, temperature: 78, pressure: 68, riskScore: 31, status: 'operational' },
  { id: 'conveyor-02', name: 'Conveyor-02', site: 'Mine Site A', equipment: 'Belt conveyor', vibration: 59, temperature: 72, pressure: 55, riskScore: 47, status: 'operational' },
];

export function createInitialDemoState(now = Date.now()): DemoState {
  const assets = initialAssets.map((asset) => ({ ...asset, updatedAt: now }));
  const history: DemoState['history'] = {};
  for (const asset of assets) {
    history[asset.id] = Array.from({ length: 30 }, (_, index) => {
      const timestamp = now - (29 - index) * 1000;
      const drift = (Math.random() - 0.5) * 5;
      return {
        time: timeLabel(timestamp),
        timestamp,
        vibration: Math.max(0, Math.min(100, asset.vibration + drift)),
        temperature: Math.max(0, Math.min(120, asset.temperature + drift * 0.7)),
        riskScore: Math.max(0, Math.min(100, asset.riskScore + drift * 0.6)),
      };
    });
  }
  return {
    assets,
    history,
    alerts: [],
    events: [makeEvent(now, 'Demo stream connected', 'Synthetic telemetry is updating in this browser session.', 'system')],
    anomalyAssetId: null,
    anomalyUntil: null,
  };
}

export function advanceDemoState(state: DemoState, now = Date.now()): DemoState {
  const anomalyExpired = state.anomalyAssetId !== null && state.anomalyUntil !== null && now >= state.anomalyUntil;
  const anomalyAssetId = anomalyExpired ? null : state.anomalyAssetId;
  const anomalyUntil = anomalyExpired ? null : state.anomalyUntil;
  const events = anomalyExpired
    ? [makeEvent(now, 'Demo anomaly cleared', 'The injected condition ended; readings are returning toward baseline.', 'recovery'), ...state.events].slice(0, 30)
    : state.events;
  const newAlerts: DemoAlert[] = [];
  const nextAssets = state.assets.map((asset) => {
    const isAnomalous = asset.id === anomalyAssetId;
    const riskScore = isAnomalous
      ? Math.min(96, Math.max(82, asset.riskScore + Math.random() * 4))
      : Math.max(8, Math.min(68, asset.riskScore + (Math.random() - 0.54) * 5 - (asset.status !== 'operational' ? 1 : 0)));
    const next: DemoAsset = {
      ...asset,
      vibration: Math.max(8, Math.min(100, asset.vibration + (isAnomalous ? Math.random() * 5 : (Math.random() - 0.5) * 4))),
      temperature: Math.max(25, Math.min(120, asset.temperature + (isAnomalous ? Math.random() * 2 : (Math.random() - 0.5) * 1.8))),
      pressure: Math.max(20, Math.min(100, asset.pressure + (Math.random() - 0.5) * 3)),
      riskScore,
      status: statusForRisk(riskScore),
      updatedAt: now,
    };
    if (next.status !== asset.status && next.status !== 'operational') newAlerts.push(makeAlert(next, now));
    return next;
  });

  const history = { ...state.history };
  for (const asset of nextAssets) {
    const point: TelemetryPoint = {
      time: timeLabel(now),
      timestamp: now,
      vibration: asset.vibration,
      temperature: asset.temperature,
      riskScore: asset.riskScore,
    };
    history[asset.id] = [...(history[asset.id] ?? []), point].slice(-30);
  }

  const transitionEvents = newAlerts.map((alert) => makeEvent(
    now,
    `${alert.severity === 'critical' ? 'Critical' : 'Warning'} risk detected`,
    `${alert.assetName}: ${alert.message}`,
    alert.severity,
  ));
  return {
    assets: nextAssets,
    history,
    alerts: [...newAlerts, ...state.alerts].slice(0, 30),
    events: [...transitionEvents, ...events].slice(0, 30),
    anomalyAssetId,
    anomalyUntil,
  };
}

export function injectDemoAnomaly(state: DemoState, assetId: string, now = Date.now()): DemoState {
  const asset = state.assets.find((item) => item.id === assetId);
  if (!asset) return state;
  const affected: DemoAsset = {
    ...asset,
    vibration: Math.min(100, Math.max(84, asset.vibration + 28)),
    temperature: Math.min(120, Math.max(94, asset.temperature + 17)),
    riskScore: 91,
    status: 'critical',
    updatedAt: now,
  };
  const alert: DemoAlert = {
    id: `${assetId}-injected-${now}`,
    assetId,
    assetName: asset.name,
    severity: 'critical',
    message: 'Injected vibration and thermal anomaly; simulated risk is critical.',
    createdAt: now,
    acknowledged: false,
  };
  const point: TelemetryPoint = {
    time: timeLabel(now),
    timestamp: now,
    vibration: affected.vibration,
    temperature: affected.temperature,
    riskScore: affected.riskScore,
  };
  return {
    ...state,
    assets: state.assets.map((item) => item.id === assetId ? affected : item),
    history: { ...state.history, [assetId]: [...(state.history[assetId] ?? []), point].slice(-30) },
    alerts: [alert, ...state.alerts].slice(0, 30),
    events: [makeEvent(now, 'Anomaly injected', `${asset.name}: simulated vibration and thermal readings exceeded safe limits.`, 'critical'), ...state.events].slice(0, 30),
    anomalyAssetId: assetId,
    anomalyUntil: now + 15000,
  };
}
