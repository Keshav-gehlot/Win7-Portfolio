import React, { useState, useEffect } from 'react';
import { AppId, WindowState } from '../../types';
import { Wifi, Volume2, Battery, ChevronUp } from 'lucide-react';
import { CalendarWidget } from './CalendarWidget';
import { BatteryWidget } from './BatteryWidget';
import { VolumeWidget } from './VolumeWidget';
import { WifiWidget } from './WifiWidget';

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
  const [isBatteryOpen, setIsBatteryOpen] = useState(false);
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);
  const [isWifiOpen, setIsWifiOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const closeAllPopups = () => {
      setIsCalendarOpen(false);
      setIsBatteryOpen(false);
      setIsVolumeOpen(false);
      setIsWifiOpen(false);
  };

  return (
    <div 
      className="h-[44px] w-full taskbar-glass fixed bottom-0 left-0 z-50 flex items-center justify-between px-0 select-none"
      onClick={closeAllPopups}
    >
      <div className="flex items-center h-full">
        {/* Start Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); onStartClick(); setIsCalendarOpen(false); }}
          className={`h-[48px] w-[48px] rounded-full mx-1 flex items-center justify-center transform transition-transform active:scale-95 z-50 relative bottom-[2px] group cursor-default`}
          title="Start"
        >
             {/* Glow behind orb */}
            <div className={`absolute inset-0 rounded-full bg-cyan-300/40 blur-[6px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isStartOpen ? 'opacity-100 bg-cyan-300/60' : ''}`}></div>
            
            <div className={`relative w-[40px] h-[40px] rounded-full overflow-hidden transition-all duration-300 border-[1.5px] ${isStartOpen ? 'border-cyan-200/80 shadow-[0_0_15px_rgba(34,211,238,0.5),inset_0_0_10px_rgba(255,255,255,0.4)]' : 'border-white/20 shadow-[0_2px_5px_rgba(0,0,0,0.5),inset_0_-2px_10px_rgba(0,0,0,0.4)] group-hover:border-white/50 group-hover:shadow-[0_0_10px_rgba(255,255,255,0.3),inset_0_0_10px_rgba(255,255,255,0.2)]'}`}
                 style={{
                     background: 'radial-gradient(circle at 30% 30%, #4facfe 0%, #00f2fe 40%, #003a7a 100%)',
                 }}
            >
                {/* Windows Logo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[18px] h-[18px] grid grid-cols-2 gap-[1px]">
                    <div className="bg-[#f25022] rounded-tl-[1px] shadow-[inset_-1px_-1px_2px_rgba(0,0,0,0.2)]"></div>
                    <div className="bg-[#7fba00] rounded-tr-[1px] shadow-[inset_1px_-1px_2px_rgba(0,0,0,0.2)]"></div>
                    <div className="bg-[#00a4ef] rounded-bl-[1px] shadow-[inset_-1px_1px_2px_rgba(0,0,0,0.2)]"></div>
                    <div className="bg-[#ffb900] rounded-br-[1px] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)]"></div>
                </div>
                {/* Top Glass Shine */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/80 to-transparent rounded-t-full"></div>
            </div>
        </button>

        <div className="w-1"></div>

        {/* Running Apps */}
        <div className="flex items-center gap-1 h-full px-1 py-[2px] flex-1 overflow-x-auto min-w-0 custom-scrollbar-hide">
          {windows.filter(w => w.isOpen).map(window => (
            <button
              key={window.id}
              onClick={() => onAppClick(window.id)}
              className={`
                group h-full flex-1 max-w-[180px] min-w-[40px] sm:min-w-[150px] px-2 flex items-center gap-2 rounded-[4px] border transition-all relative overflow-hidden backdrop-blur-md
                ${activeWindowId === window.id && !window.isMinimized
                  ? 'bg-white/20 border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)_inset]'
                  : 'bg-transparent border-transparent hover:bg-white/10 hover:border-white/10'
                }
              `}
            >
              {/* Highlight Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

              <window.icon size={20} className="drop-shadow-lg text-white opacity-90 relative z-10 shrink-0" />
              <span className="text-xs text-white truncate font-medium relative z-10 hidden sm:block" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>
                {window.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* System Tray */}
      <div className="flex items-center h-full text-white px-0 sm:px-2 shrink-0">
        <div className="hidden sm:flex items-center gap-1 px-1">
            <div className="p-1.5 hover:bg-white/10 rounded-[3px] cursor-pointer transition-colors shadow-sm">
                <ChevronUp size={14} className="text-white drop-shadow-md" />
            </div>
        </div>
        
        <div className="flex gap-1.5 sm:gap-2.5 text-white/90 px-2 sm:px-3 py-1 bg-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_0_5px_rgba(0,0,0,0.2)] rounded-[3px] mx-1 h-[28px] items-center">
          <Wifi size={14} className="drop-shadow-sm cursor-pointer hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); closeAllPopups(); setIsWifiOpen(!isWifiOpen); }} />
          <Volume2 size={14} className="drop-shadow-sm cursor-pointer hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); closeAllPopups(); setIsVolumeOpen(!isVolumeOpen); }} />
          <Battery size={14} className="drop-shadow-sm cursor-pointer hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); closeAllPopups(); setIsBatteryOpen(!isBatteryOpen); }} />
        </div>

        {/* Clock & Calendar Trigger */}
        <div 
            className="flex flex-col items-center justify-center text-white text-[11px] leading-tight px-1 sm:px-3 py-1 cursor-default hover:bg-white/10 hover:shadow-[0_0_5px_rgba(255,255,255,0.1)_inset] h-[34px] rounded-[3px] transition-colors active:bg-white/20 font-medium whitespace-nowrap"
            style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}
            title={time.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            onClick={(e) => { e.stopPropagation(); closeAllPopups(); setIsCalendarOpen(!isCalendarOpen); }}
        >
            <span>{time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</span>
            <span className="hidden sm:inline">{time.toLocaleDateString()}</span>
        </div>
        
        {/* Show Desktop Button */}
        <div 
            className="w-3.5 h-full border-l border-white/20 hover:bg-white/20 cursor-pointer shadow-[inset_1px_0_0_rgba(255,255,255,0.2)] active:bg-white/30 transition-all ml-1" 
            title="Show Desktop"
            onClick={onShowDesktop}
        ></div>
      </div>
      
      {/* Calendar Flyout */}
      <CalendarWidget isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
      <BatteryWidget isOpen={isBatteryOpen} onClose={() => setIsBatteryOpen(false)} />
      <VolumeWidget isOpen={isVolumeOpen} onClose={() => setIsVolumeOpen(false)} />
      <WifiWidget isOpen={isWifiOpen} onClose={() => setIsWifiOpen(false)} />
    </div>
  );
};
