# ShieldSpot

ShieldSpot is a React + Vite monitoring dashboard prototype for industrial telemetry. It can run with a local synthetic stream or subscribe directly to Firestore for live asset readings, alerts, and events. The dashboard is a monitoring aid, not a certified safety system.

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Without Firebase configuration, the app automatically uses the browser-based demo stream. To enable Firestore, set the following in `.env.local` and restart Vite:

```dotenv
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_APP_ID=your-firebase-app-id
```

Create a Firestore database and add documents to these top-level collections. Document IDs are used as IDs in the dashboard.

### `assets`

```json
{
  "name": "Turbine-04",
  "site": "North Plant",
  "equipment": "Wind turbine",
  "vibration": 42.5,
  "temperature": 68.2,
  "pressure": 71.0,
  "riskScore": 24,
  "status": "operational",
  "updatedAt": "2026-11-03T10:00:00.000Z"
}
```

Update asset documents as new readings arrive; Firestore `onSnapshot` pushes updates to the dashboard. `updatedAt` may be a Firestore Timestamp or a parseable date string/epoch milliseconds.

### `alerts`

```json
{
  "assetId": "turbine-04",
  "assetName": "Turbine-04",
  "severity": "warning",
  "message": "Vibration trend exceeded the watch threshold.",
  "createdAt": "2026-11-03T10:00:00.000Z",
  "acknowledged": false
}
```

The dashboard writes `acknowledged: true` when an operator acknowledges an alert. Configure authenticated access and Firestore Security Rules to allow only authorized readers and alert acknowledgments. Never rely on client-side thresholds or this prototype as an emergency control system.

### `events`

```json
{
  "title": "Telemetry update received",
  "detail": "Turbine-04 readings refreshed.",
  "kind": "system",
  "createdAt": "2026-11-03T10:00:00.000Z"
}
```

`kind` may be `system`, `warning`, `critical`, or `recovery`. The Firebase web config is public client configuration; it is not authorization. Do not put service-account credentials in this frontend. Secure the database with Authentication and least-privilege rules before loading real or sensitive telemetry.

## Commands

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

When `VITE_FIREBASE_*` configuration is present, the dashboard uses Firestore live subscriptions. “Switch to demo” returns to the synthetic stream for that browser session.
