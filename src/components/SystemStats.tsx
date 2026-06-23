import React, { useState, useEffect } from 'react';

export const SystemStats: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [uptime, setUptime] = useState(0);
  const [latency, setLatency] = useState(24);
  const [cpuHistory, setCpuHistory] = useState<number[]>([20, 24, 30, 28, 35, 30, 25, 20, 24, 28]);
  const [memHistory, setMemHistory] = useState<number[]>([45, 46, 45, 47, 48, 48, 49, 49, 48, 49]);

  useEffect(() => {
    // Current time clock
    const clockInterval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Session Uptime counter
    const uptimeInterval = setInterval(() => {
      setUptime(prev => prev + 1);
    }, 1000);

    // Real-time simulated stats update
    const statsInterval = setInterval(() => {
      // Shift latency slightly
      setLatency(prev => Math.max(12, Math.min(65, prev + Math.floor(Math.random() * 9) - 4)));

      // Shift CPU usage history
      setCpuHistory(prev => {
        const nextVal = Math.max(5, Math.min(95, (prev[prev.length - 1] ?? 30) + Math.floor(Math.random() * 21) - 10));
        return [...prev.slice(1), nextVal];
      });

      // Shift Memory usage history
      setMemHistory(prev => {
        const nextVal = Math.max(40, Math.min(75, (prev[prev.length - 1] ?? 48) + Math.floor(Math.random() * 5) - 2));
        return [...prev.slice(1), nextVal];
      });
    }, 1000);

    return () => {
      clearInterval(clockInterval);
      clearInterval(uptimeInterval);
      clearInterval(statsInterval);
    };
  }, []);

  const formatUptime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}m ${s}s`;
  };

  // Convert stats arrays to SVG path strings
  const getSvgPath = (data: number[]) => {
    const width = 180;
    const height = 40;
    const step = width / (data.length - 1);
    
    return data.map((val, idx) => {
      const x = idx * step;
      // invert Y coordinate (0 at top, height at bottom)
      const y = height - (val / 100) * height;
      return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(' ');
  };

  const currentCpu = cpuHistory[cpuHistory.length - 1] ?? 24;
  const currentMem = memHistory[memHistory.length - 1] ?? 48;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
      {/* Time & Sync Panel */}
      <div className="p-md glass-panel relative overflow-hidden flex flex-col justify-between h-28 border-[#00f0ff]/15">
        <div className="corner-decor"></div>
        <div className="text-[10px] font-label-caps text-surface-tint">SYSTEM_TEMPORAL_GRID</div>
        <div className="font-code-md text-2xl text-on-background font-bold tracking-tight">
          {time.toLocaleTimeString([], { hour12: false })}
        </div>
        <div className="flex justify-between items-center text-[10px] font-code-md text-outline">
          <span>UTC_OFFSET: +05:30</span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping"></span>
            CLOCK_SYNC_OK
          </span>
        </div>
      </div>

      {/* Connection & Session panel */}
      <div className="p-md glass-panel relative overflow-hidden flex flex-col justify-between h-28 border-[#00f0ff]/15">
        <div className="corner-decor"></div>
        <div className="text-[10px] font-label-caps text-secondary">SECURE_NODE_CONN</div>
        <div className="font-code-md text-xl text-on-background font-bold">
          {formatUptime(uptime)}
        </div>
        <div className="flex justify-between items-center text-[10px] font-code-md text-outline">
          <span>PING: {latency}ms</span>
          <span className="text-[#00f0ff] font-bold">ACTIVE_ENCRYPTED</span>
        </div>
      </div>

      {/* Simulated Real-Time CPU Graph */}
      <div className="p-md glass-panel relative overflow-hidden flex flex-col justify-between h-28 border-[#00f0ff]/15">
        <div className="corner-decor"></div>
        <div className="flex justify-between items-start">
          <div className="text-[10px] font-label-caps text-surface-tint">PROCESSOR_LOAD</div>
          <span className="font-code-md text-xs text-[#00f0ff] font-bold">{currentCpu}%</span>
        </div>
        <div className="my-2 h-10 w-full overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 180 40" preserveAspectRatio="none">
            <path
              d={getSvgPath(cpuHistory)}
              fill="none"
              stroke="#00f0ff"
              strokeWidth="2"
              className="transition-all duration-300"
            />
            {/* Area under curve */}
            <path
              d={`${getSvgPath(cpuHistory)} L 180 40 L 0 40 Z`}
              fill="url(#cpuGrad)"
              className="opacity-15 transition-all duration-300"
            />
            <defs>
              <linearGradient id="cpuGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00f0ff" />
                <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="text-[10px] font-code-md text-outline">CORE_STATUS: RUNNING</div>
      </div>

      {/* Simulated Real-Time Memory Graph */}
      <div className="p-md glass-panel relative overflow-hidden flex flex-col justify-between h-28 border-[#00f0ff]/15">
        <div className="corner-decor"></div>
        <div className="flex justify-between items-start">
          <div className="text-[10px] font-label-caps text-secondary">MEMORY_ALLOCATION</div>
          <span className="font-code-md text-xs text-secondary font-bold">{currentMem}%</span>
        </div>
        <div className="my-2 h-10 w-full overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 180 40" preserveAspectRatio="none">
            <path
              d={getSvgPath(memHistory)}
              fill="none"
              stroke="#bc13fe"
              strokeWidth="2"
              className="transition-all duration-300"
            />
            <path
              d={`${getSvgPath(memHistory)} L 180 40 L 0 40 Z`}
              fill="url(#memGrad)"
              className="opacity-15 transition-all duration-300"
            />
            <defs>
              <linearGradient id="memGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#bc13fe" />
                <stop offset="100%" stopColor="#bc13fe" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="text-[10px] font-code-md text-outline">ALLOC_RESOURCES: OK</div>
      </div>
    </div>
  );
};
