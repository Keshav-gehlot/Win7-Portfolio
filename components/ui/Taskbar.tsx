import React, { useState, useEffect } from 'react';
import { AppId, WindowState } from '../../types';
import { Wifi, Volume2, Battery, ChevronUp } from 'lucide-react';
import { CalendarWidget } from './CalendarWidget';

interface TaskbarProps {
  windows: WindowState[];
  activeWindowId: AppId | null;
  onAppClick: (id: AppId) => void;
  onStartClick: () => void;
  isStartOpen: boolean;
  onShowDesktop: () => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({ 
  windows, 
  activeWindowId, 
  onAppClick, 
  onStartClick,
  isStartOpen,
  onShowDesktop
}) => {
  const [time, setTime] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className="h-[40px] w-full fixed bottom-0 left-0 z-50 flex items-center justify-between px-0 select-none"
      style={{
        background: 'linear-gradient(to bottom, rgba(30, 40, 50, 0.85) 0%, rgba(10, 10, 10, 0.95) 100%)',
        backdropFilter: 'blur(10px)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)'
      }}
      onClick={() => setIsCalendarOpen(false)}
    >
      <div className="flex items-center h-full">
        {/* Start Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); onStartClick(); setIsCalendarOpen(false); }}
          className={`h-[48px] w-[48px] rounded-full mx-0.5 flex items-center justify-center transform transition-all hover:brightness-110 active:scale-95 active:brightness-90 z-50 relative bottom-0.5 group ${
            isStartOpen ? 'brightness-110' : ''
          }`}
          title="Start"
        >
             {/* Orb Glow */}
            <div className={`absolute inset-0 rounded-full bg-cyan-400/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isStartOpen ? 'opacity-100' : ''}`}></div>
            
            <div className="relative w-full h-full rounded-full shadow-[0_4px_5px_rgba(0,0,0,0.5)] overflow-hidden"
                 style={{
                     background: 'radial-gradient(circle at 50% 50%, #185a9d 0%, #1f76ad 45%, #102a45 100%)',
                     boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.7), 0 0 2px 1px rgba(0,0,0,0.4)'
                 }}
            >
                {/* Windows Logo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[22px] h-[22px] grid grid-cols-2 gap-[1px]">
                    <div className="bg-[#f25022] rounded-tl-[1px] shadow-[inset_-1px_-1px_2px_rgba(0,0,0,0.2)]"></div>
                    <div className="bg-[#7fba00] rounded-tr-[1px] shadow-[inset_1px_-1px_2px_rgba(0,0,0,0.2)]"></div>
                    <div className="bg-[#00a4ef] rounded-bl-[1px] shadow-[inset_-1px_1px_2px_rgba(0,0,0,0.2)]"></div>
                    <div className="bg-[#ffb900] rounded-br-[1px] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)]"></div>
                </div>
                {/* Glass Shine */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/60 to-transparent rounded-t-full"></div>
            </div>
        </button>

        <div className="w-1"></div>

        {/* Running Apps */}
        <div className="flex items-center gap-1 h-full px-1">
          {windows.filter(w => w.isOpen).map(window => (
            <button
              key={window.id}
              onClick={() => onAppClick(window.id)}
              className={`
                group h-[34px] min-w-[150px] max-w-[180px] px-2 flex items-center gap-2 rounded-sm border transition-all relative overflow-hidden
                ${activeWindowId === window.id && !window.isMinimized
                  ? 'bg-white/30 border-white/40 shadow-[inset_0_0_10px_rgba(255,255,255,0.3)]'
                  : 'bg-transparent border-transparent hover:bg-white/20 hover:border-white/20 hover:shadow-[inset_0_0_5px_rgba(255,255,255,0.2)]'
                }
              `}
            >
              {/* Highlight Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

              <window.icon size={20} className="drop-shadow-lg text-slate-800 relative z-10" />
              <span className="text-xs text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)] truncate font-medium relative z-10" style={{ textShadow: '0 0 5px rgba(0,0,0,0.8)' }}>
                {window.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* System Tray */}
      <div className="flex items-center h-full bg-[#0a1018]/40 border-l border-white/10 shadow-[inset_1px_0_5px_rgba(0,0,0,0.2)] pl-2">
        <div className="flex items-center gap-1 px-1">
            <div className="p-1 hover:bg-white/10 rounded-sm cursor-pointer transition-colors">
                <ChevronUp size={14} className="text-white" />
            </div>
        </div>
        
        <div className="flex gap-2 text-white/90 px-2">
          <Wifi size={16} className="drop-shadow-sm cursor-pointer hover:text-white" />
          <Volume2 size={16} className="drop-shadow-sm cursor-pointer hover:text-white" />
          <Battery size={16} className="drop-shadow-sm cursor-pointer hover:text-white" />
        </div>

        {/* Clock & Calendar Trigger */}
        <div 
            className="flex flex-col items-center justify-center text-white text-[11px] leading-tight px-3 py-1 cursor-default hover:bg-white/10 hover:shadow-[inset_0_0_5px_rgba(255,255,255,0.2)] h-full transition-colors active:bg-white/20"
            title={time.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            onClick={(e) => { e.stopPropagation(); setIsCalendarOpen(!isCalendarOpen); }}
        >
            <span>{time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</span>
            <span>{time.toLocaleDateString()}</span>
        </div>
        
        {/* Show Desktop Button */}
        <div 
            className="w-3 h-full border-l border-white/20 ml-1 hover:bg-white/30 cursor-pointer shadow-[inset_1px_0_0_rgba(255,255,255,0.1)] active:bg-white/40 active:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)] transition-all" 
            title="Show Desktop"
            onClick={onShowDesktop}
        ></div>
      </div>
      
      {/* Calendar Flyout */}
      <CalendarWidget isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
    </div>
  );
};
