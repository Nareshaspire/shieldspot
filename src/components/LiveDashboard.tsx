import { useEffect, useMemo, useState } from 'react';
import { Activity, AlertTriangle, ArrowDownRight, ArrowUpRight, Check, Clock3, Gauge, Pause, Play, RotateCcw, ShieldCheck, Siren, Thermometer, Waves, Zap } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { motion } from 'motion/react';
import { advanceDemoState, createInitialDemoState, injectDemoAnomaly, type AssetStatus, type DemoState } from '../lib/demoStream';

const statusStyles: Record<AssetStatus, string> = {
  operational: 'text-emerald-300 bg-emerald-400/10 border-emerald-400/20',
  warning: 'text-amber-300 bg-amber-400/10 border-amber-400/20',
  critical: 'text-rose-300 bg-rose-400/10 border-rose-400/20',
};

const statusLabel: Record<AssetStatus, string> = {
  operational: 'Operational',
  warning: 'Warning',
  critical: 'Critical',
};

const timeAgo = (timestamp: number, now: number) => {
  const seconds = Math.max(0, Math.floor((now - timestamp) / 1000));
  return seconds < 2 ? 'just now' : `${seconds}s ago`;
};

export default function LiveDashboard() {
  const [state, setState] = useState<DemoState>(() => createInitialDemoState());
  const [selectedAssetId, setSelectedAssetId] = useState('turbine-04');
  const [isRunning, setIsRunning] = useState(true);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!isRunning) return;
    const timer = window.setInterval(() => {
      const tick = Date.now();
      setNow(tick);
      setState((current) => advanceDemoState(current, tick));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isRunning]);

  const selectedAsset = state.assets.find((asset) => asset.id === selectedAssetId) ?? state.assets[0];
  const chartData = state.history[selectedAsset.id] ?? [];
  const openAlerts = state.alerts.filter((alert) => !alert.acknowledged);
  const criticalAssets = state.assets.filter((asset) => asset.status === 'critical').length;
  const averageRisk = Math.round(state.assets.reduce((sum, asset) => sum + asset.riskScore, 0) / state.assets.length);
  const chartColor = selectedAsset.status === 'critical' ? '#fb7185' : selectedAsset.status === 'warning' ? '#fbbf24' : '#34d399';
  const formattedNow = useMemo(() => new Date(now).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }), [now]);

  const acknowledgeAlert = (alertId: string) => {
    setState((current) => ({
      ...current,
      alerts: current.alerts.map((alert) => alert.id === alertId ? { ...alert, acknowledged: true } : alert),
      events: [{
        id: `ack-${alertId}`,
        createdAt: Date.now(),
        title: 'Alert acknowledged',
        detail: 'An operator acknowledged an alert in this demo session.',
        kind: 'system',
      }, ...current.events].slice(0, 30),
    }));
  };

  const resetDemo = () => {
    const resetAt = Date.now();
    setNow(resetAt);
    setState(createInitialDemoState(resetAt));
    setSelectedAssetId('turbine-04');
    setIsRunning(true);
  };

  return (
    <div className="relative min-h-screen bg-[#070b0d] text-slate-100">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-56 left-1/4 h-[32rem] w-[32rem] rounded-full bg-emerald-500/[0.07] blur-[120px]" />
        <div className="absolute right-0 top-[30rem] h-[28rem] w-[28rem] rounded-full bg-cyan-500/[0.05] blur-[120px]" />
      </div>
      <div className="relative mx-auto max-w-[1600px] px-4 pb-14 pt-8 sm:px-6 lg:px-10">
        <header className="mb-8 flex flex-col gap-6 border-b border-white/[0.08] pb-7 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
              <ShieldCheck className="h-4 w-4" /> ShieldSpot Operations
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Live operations overview</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">Monitor equipment health, inspect changing telemetry, and respond to simulated risk events.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-2 text-xs font-medium text-emerald-200">
              <span className={`h-2 w-2 rounded-full ${isRunning ? 'animate-pulse bg-emerald-400' : 'bg-slate-500'}`} />
              {isRunning ? 'DEMO STREAM LIVE' : 'STREAM PAUSED'}
            </div>
            <button onClick={() => setIsRunning((running) => !running)} className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/[0.08]">
              {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}{isRunning ? 'Pause stream' : 'Resume stream'}
            </button>
            <button onClick={resetDemo} className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/[0.08]">
              <RotateCcw className="h-4 w-4" /> Reset demo
            </button>
          </div>
        </header>

        <div className="mb-6 flex items-start gap-3 rounded-xl border border-cyan-400/15 bg-cyan-400/[0.04] px-4 py-3 text-xs leading-relaxed text-cyan-100/80">
          <Zap className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
          <p><strong className="font-semibold text-cyan-100">Simulation mode.</strong> Readings and alerts are generated in this browser for demonstration only. They are not connected to physical equipment and must not be used for operational decisions.</p>
        </div>

        <section aria-label="Operations summary" className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard title="Assets monitored" value={String(state.assets.length).padStart(2, '0')} detail="Across 3 demo sites" icon={<Activity className="h-5 w-5" />} tone="emerald" />
          <MetricCard title="Open alerts" value={String(openAlerts.length).padStart(2, '0')} detail={`${state.alerts.length} alerts in this session`} icon={<AlertTriangle className="h-5 w-5" />} tone={openAlerts.length ? 'amber' : 'slate'} />
          <MetricCard title="Critical assets" value={String(criticalAssets).padStart(2, '0')} detail="Risk score ≥ 75" icon={<Siren className="h-5 w-5" />} tone={criticalAssets ? 'rose' : 'slate'} />
          <MetricCard title="Mean risk score" value={`${averageRisk}`} detail="Across monitored assets" icon={<Gauge className="h-5 w-5" />} tone="cyan" />
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="space-y-6 xl:col-span-8">
            <div className="rounded-2xl border border-white/[0.08] bg-[#0d1316]/90 p-5 shadow-xl shadow-black/10 sm:p-6">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-white"><Activity className="h-4 w-4 text-emerald-300" /> Telemetry trends</div>
                  <p className="mt-1 text-xs text-slate-500">Last 30 seconds · {selectedAsset.name} · updates every second</p>
                </div>
                <label className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="sr-only">Select asset for chart</span>
                  <select value={selectedAssetId} onChange={(event) => setSelectedAssetId(event.target.value)} className="rounded-lg border border-white/10 bg-[#11191d] px-3 py-2 text-xs text-slate-200 outline-none focus:border-emerald-400/40">
                    {state.assets.map((asset) => <option key={asset.id} value={asset.id}>{asset.name}</option>)}
                  </select>
                </label>
              </div>
              <div className="h-[290px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={chartColor} stopOpacity={0.28} /><stop offset="95%" stopColor={chartColor} stopOpacity={0} /></linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(148,163,184,0.10)" vertical={false} />
                    <XAxis dataKey="time" minTickGap={30} tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} axisLine={false} />
                    <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: '#0b1114', border: '1px solid rgba(255,255,255,.12)', borderRadius: 10, fontSize: 12 }} labelStyle={{ color: '#cbd5e1' }} />
                    <Area type="monotone" dataKey="riskScore" name="Risk score" stroke={chartColor} strokeWidth={2} fill="url(#riskGradient)" isAnimationActive={false} />
                    <Area type="monotone" dataKey="vibration" name="Vibration" stroke="#38bdf8" strokeWidth={1.5} fill="transparent" isAnimationActive={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-5 text-[11px] text-slate-400">
                <span className="flex items-center gap-2"><i className="h-2 w-2 rounded-full" style={{ backgroundColor: chartColor }} />Risk score</span>
                <span className="flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-sky-400" />Vibration index</span>
                <span className="ml-auto flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" />Updated {formattedNow}</span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#0d1316]/90 p-5 shadow-xl shadow-black/10 sm:p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold text-white">Monitored assets</h2>
                  <p className="mt-1 text-xs text-slate-500">Select an asset to inspect its live trend.</p>
                </div>
                <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">Risk thresholds: 50 watch · 75 critical</span>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {state.assets.map((asset) => (
                  <motion.button layout key={asset.id} onClick={() => setSelectedAssetId(asset.id)} className={`rounded-xl border p-4 text-left transition ${selectedAssetId === asset.id ? 'border-emerald-400/30 bg-emerald-400/[0.05]' : 'border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.05]'}`}>
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div><div className="font-semibold text-white">{asset.name}</div><div className="mt-1 text-xs text-slate-500">{asset.equipment} · {asset.site}</div></div>
                      <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${statusStyles[asset.status]}`}><span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current" />{statusLabel[asset.status]}</span>
                    </div>
                    <div className="mb-3 flex items-end justify-between"><span className="text-xs text-slate-500">Risk score</span><span className={`text-2xl font-semibold tabular-nums ${asset.status === 'critical' ? 'text-rose-300' : asset.status === 'warning' ? 'text-amber-300' : 'text-white'}`}>{Math.round(asset.riskScore)}<span className="ml-1 text-xs font-normal text-slate-500">/100</span></span></div>
                    <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-white/[0.07]"><div className={`h-full rounded-full transition-all duration-700 ${asset.status === 'critical' ? 'bg-rose-400' : asset.status === 'warning' ? 'bg-amber-400' : 'bg-emerald-400'}`} style={{ width: `${asset.riskScore}%` }} /></div>
                    <div className="grid grid-cols-3 gap-2 border-t border-white/[0.07] pt-3 text-xs">
                      <MiniReading icon={<Waves className="h-3.5 w-3.5" />} label="Vibration" value={`${Math.round(asset.vibration)}%`} />
                      <MiniReading icon={<Thermometer className="h-3.5 w-3.5" />} label="Temp" value={`${Math.round(asset.temperature)}°`} />
                      <MiniReading icon={<Gauge className="h-3.5 w-3.5" />} label="Pressure" value={`${Math.round(asset.pressure)}%`} />
                    </div>
                    <div className="mt-3 flex items-center justify-between text-[10px] text-slate-500"><span>Updated {timeAgo(asset.updatedAt, now)}</span><span className="inline-flex items-center gap-1 text-emerald-300"><Zap className="h-3 w-3" />Live</span></div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6 xl:col-span-4">
            <div className="rounded-2xl border border-white/[0.08] bg-[#0d1316]/90 p-5 shadow-xl shadow-black/10 sm:p-6">
              <div className="mb-4 flex items-center justify-between"><div><h2 className="text-sm font-semibold text-white">Alert queue</h2><p className="mt-1 text-xs text-slate-500">Review and acknowledge demo alerts.</p></div><span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-xs text-slate-300">{openAlerts.length} open</span></div>
              <button onClick={() => setState((current) => injectDemoAnomaly(current, selectedAssetId))} disabled={state.anomalyAssetId !== null} className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg border border-rose-400/20 bg-rose-400/[0.08] px-3 py-2.5 text-xs font-semibold text-rose-200 transition hover:bg-rose-400/[0.14] disabled:cursor-not-allowed disabled:opacity-50"><Siren className="h-4 w-4" />{state.anomalyAssetId ? 'Anomaly active · auto-clears in 15s' : `Inject anomaly · ${selectedAsset.name}`}</button>
              <div className="max-h-[370px] space-y-3 overflow-y-auto pr-1">
                {state.alerts.length === 0 ? <div className="rounded-xl border border-dashed border-white/10 px-4 py-8 text-center text-xs text-slate-500"><ShieldCheck className="mx-auto mb-2 h-5 w-5 text-emerald-300/70" />No alerts. Use “Inject anomaly” to test the response flow.</div> : state.alerts.map((alert) => (
                  <div key={alert.id} className={`rounded-xl border p-3.5 ${alert.acknowledged ? 'border-white/[0.06] bg-white/[0.015] opacity-60' : alert.severity === 'critical' ? 'border-rose-400/20 bg-rose-400/[0.045]' : 'border-amber-400/20 bg-amber-400/[0.045]'}`}>
                    <div className="flex items-start gap-3"><div className={`mt-0.5 rounded-lg p-2 ${alert.severity === 'critical' ? 'bg-rose-400/10 text-rose-300' : 'bg-amber-400/10 text-amber-300'}`}><AlertTriangle className="h-4 w-4" /></div><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-2"><span className="text-xs font-semibold text-slate-100">{alert.assetName}</span><span className={`text-[9px] font-bold uppercase tracking-wider ${alert.severity === 'critical' ? 'text-rose-300' : 'text-amber-300'}`}>{alert.severity}</span></div><p className="mt-1 text-[11px] leading-relaxed text-slate-400">{alert.message}</p><div className="mt-2 flex items-center justify-between"><span className="text-[10px] text-slate-500">{timeAgo(alert.createdAt, now)}</span>{alert.acknowledged ? <span className="inline-flex items-center gap-1 text-[10px] text-emerald-300"><Check className="h-3 w-3" />Acknowledged</span> : <button onClick={() => acknowledgeAlert(alert.id)} className="rounded-md px-2 py-1 text-[10px] font-medium text-slate-300 hover:bg-white/[0.08]">Acknowledge</button>}</div></div></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#0d1316]/90 p-5 shadow-xl shadow-black/10 sm:p-6">
              <div className="mb-4 flex items-center justify-between"><div><h2 className="text-sm font-semibold text-white">Activity timeline</h2><p className="mt-1 text-xs text-slate-500">Recent system and operator events.</p></div><span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-emerald-300"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />Live</span></div>
              <div className="max-h-[300px] space-y-0 overflow-y-auto">
                {state.events.map((event, index) => (
                  <div key={event.id} className="relative flex gap-3 pb-4 last:pb-0">
                    {index < state.events.length - 1 && <span className="absolute left-[5px] top-3 h-full w-px bg-white/[0.08]" />}
                    <span className={`relative mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ring-4 ring-[#0d1316] ${event.kind === 'critical' ? 'bg-rose-400' : event.kind === 'warning' ? 'bg-amber-400' : event.kind === 'recovery' ? 'bg-sky-400' : 'bg-emerald-400'}`} />
                    <div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-2"><span className="text-xs font-medium text-slate-200">{event.title}</span><span className="shrink-0 text-[9px] text-slate-600">{timeAgo(event.createdAt, now)}</span></div><p className="mt-1 text-[11px] leading-relaxed text-slate-500">{event.detail}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>
        <footer className="mt-8 flex flex-col justify-between gap-2 border-t border-white/[0.07] pt-4 text-[10px] text-slate-600 sm:flex-row sm:items-center"><span>ShieldSpot · Browser-based monitoring demo</span><span>Simulation only — no sensor connection, persistence, or emergency response.</span></footer>
      </div>
    </div>
  );
}

function MetricCard({ title, value, detail, icon, tone }: { title: string; value: string; detail: string; icon: React.ReactNode; tone: 'emerald' | 'amber' | 'rose' | 'cyan' | 'slate' }) {
  const tones = {
    emerald: 'text-emerald-300 bg-emerald-400/10',
    amber: 'text-amber-300 bg-amber-400/10',
    rose: 'text-rose-300 bg-rose-400/10',
    cyan: 'text-cyan-300 bg-cyan-400/10',
    slate: 'text-slate-300 bg-white/[0.06]',
  };
  const trendIcon = tone === 'rose' || tone === 'amber' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />;
  return <div className="rounded-2xl border border-white/[0.08] bg-[#0d1316]/90 p-5 shadow-xl shadow-black/10"><div className="flex items-start justify-between"><div><p className="text-xs font-medium text-slate-400">{title}</p><div className="mt-2 text-3xl font-semibold tracking-tight text-white tabular-nums">{value}</div></div><span className={`rounded-xl p-2.5 ${tones[tone]}`}>{icon}</span></div><div className="mt-3 flex items-center gap-1 text-[10px] text-slate-500">{trendIcon}{detail}</div></div>;
}

function MiniReading({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div><div className="mb-1 flex items-center gap-1.5 text-[10px] text-slate-500">{icon}{label}</div><div className="font-medium tabular-nums text-slate-200">{value}</div></div>;
}
