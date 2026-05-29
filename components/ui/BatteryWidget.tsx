import React, { useState, useEffect } from 'react';
import { Battery, BatteryCharging, BatteryFull, BatteryMedium, BatteryLow } from 'lucide-react';

export const BatteryWidget: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [level, setLevel] = useState<number | null>(null);
  const [charging, setCharging] = useState(false);

  useEffect(() => {
    let batteryInfo: any = null;
    const updateBattery = () => {
      if (batteryInfo) {
        setLevel(Math.round(batteryInfo.level * 100));
        setCharging(batteryInfo.charging);
      }
    };

    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        batteryInfo = battery;
        updateBattery();
        battery.addEventListener('levelchange', updateBattery);
        battery.addEventListener('chargingchange', updateBattery);
      });
    } else {
      setLevel(100);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div 
        className="absolute bottom-12 right-20 z-50 w-64 bg-[#f0f0f0] border border-slate-300 rounded shadow-lg overflow-hidden font-[Segoe UI,sans-serif]"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 flex items-center justify-between bg-white border-b border-slate-200">
          <div className="flex items-center gap-3 text-slate-800">
            {charging ? (
              <BatteryCharging size={32} className="text-emerald-500" />
            ) : level !== null && level > 80 ? (
               <BatteryFull size={32} className="text-[#1c669e]" />
            ) : level !== null && level > 30 ? (
               <BatteryMedium size={32} className="text-[#1c669e]" />
            ) : (
               <BatteryLow size={32} className="text-red-500" />
            )}
            <div>
              <div className="font-semibold text-lg">{level !== null ? `${level}%` : 'Calculating...'}</div>
              <div className="text-xs text-slate-500">{charging ? 'Charging' : 'Remaining'}</div>
            </div>
          </div>
        </div>
        <div className="p-2 bg-[#f5f6f7] text-xs text-slate-500 text-center">
            Power and sleep settings
        </div>
      </div>
    </>
  );
};
