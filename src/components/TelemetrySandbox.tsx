import React, { useState, useEffect } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { motion } from 'motion/react';
import { AlertTriangle, Activity } from 'lucide-react';

// Generate some initial mock data
const generateData = () => {
  const data = [];
  let time = 0;
  for (let i = 0; i < 20; i++) {
    data.push({
      time: time + 'h',
      vibration: 40 + Math.random() * 20,
      riskScore: 10 + Math.random() * 15,
    });
    time += 2;
  }
  return data;
};

export default function TelemetrySandbox() {
  const [data, setData] = useState(generateData());
  const [isSimulating, setIsSimulating] = useState(false);
  const [hasAnomaly, setHasAnomaly] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isSimulating) {
      interval = setInterval(() => {
        setData(prevData => {
          const newTime = parseInt(prevData[prevData.length - 1].time) + 2;
          const newVibration = hasAnomaly 
            ? Math.min(100, prevData[prevData.length - 1].vibration + (Math.random() * 15))
            : 40 + Math.random() * 20;
            
          const newRisk = hasAnomaly
            ? Math.min(100, prevData[prevData.length - 1].riskScore + (Math.random() * 20))
            : 10 + Math.random() * 15;

          const newDataPoint = {
            time: newTime + 'h',
            vibration: newVibration,
            riskScore: newRisk,
          };
          
          return [...prevData.slice(1), newDataPoint];
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSimulating, hasAnomaly]);

  const triggerAnomaly = () => {
    setHasAnomaly(true);
    setIsSimulating(true);
    setTimeout(() => {
      setHasAnomaly(false);
    }, 8000); // recover after 8 seconds
  };

  return (
    <div className="glass rounded-2xl p-6 border border-white/20 shadow-[0_0_30px_rgba(0,230,118,0.1)]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-sans text-[14px] font-bold tracking-widest text-[#00e676] uppercase flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Live Telemetry Stream (Edge Node)
          </h3>
          <p className="text-gray-400 text-xs mt-1 font-light">Turbine #4 Bearing Vibration & Local XAI Risk Assessment</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={() => setIsSimulating(!isSimulating)}
            className="px-4 py-2 rounded-full text-xs font-bold glass border border-white/20 hover:bg-white/10 transition-colors"
          >
            {isSimulating ? 'PAUSE STREAM' : 'RESUME STREAM'}
          </button>
          <button 
            onClick={triggerAnomaly}
            disabled={hasAnomaly}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              hasAnomaly 
                ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                : 'bg-gradient-accent text-white hover:opacity-90'
            }`}
          >
            {hasAnomaly ? 'ANOMALY DETECTED' : 'INJECT ANOMALY'}
          </button>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorVibration" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00e676" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#00e676" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff4b4b" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ff4b4b" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="time" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
              itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
              labelStyle={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}
            />
            <Area type="monotone" dataKey="vibration" stroke="#00e676" strokeWidth={2} fillOpacity={1} fill="url(#colorVibration)" name="Vibration (Hz)" isAnimationActive={false} />
            <Area type="monotone" dataKey="riskScore" stroke="#ff4b4b" strokeWidth={2} fillOpacity={1} fill="url(#colorRisk)" name="AI Risk Score" isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {hasAnomaly && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex flex-col sm:flex-row items-start gap-4"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
              <span className="text-red-400 font-bold text-xs uppercase tracking-widest">PREDICTIVE WARNING</span>
            </div>
            <span className="text-gray-300 text-xs font-light block leading-relaxed">
              Edge model detects abnormal vibration pattern matching historical failure #T-29. Estimated time to critical failure: 48h.
            </span>
          </div>
          
          <div className="sm:w-1/2 w-full bg-black/40 rounded p-3 border border-red-500/20">
            <span className="text-[#00e676] font-bold text-[10px] uppercase tracking-widest block mb-2">
              XAI DECISION FACTORS (SHAP)
            </span>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                  <span>Vibration Frequency</span>
                  <span className="text-red-400">68%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1">
                  <div className="bg-red-400 h-1 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                  <span>Thermal Gradient</span>
                  <span className="text-yellow-400">24%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1">
                  <div className="bg-yellow-400 h-1 rounded-full" style={{ width: '24%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                  <span>Pressure Anomaly</span>
                  <span className="text-white">8%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1">
                  <div className="bg-white h-1 rounded-full" style={{ width: '8%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
