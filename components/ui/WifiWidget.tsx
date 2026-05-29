import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Lock, Signal, RefreshCw } from 'lucide-react';

export const WifiWidget: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [online, setOnline] = useState(true);
  const [connectionInfo, setConnectionInfo] = useState<any>(null);
  const [networks, setNetworks] = useState([
     { id: 2, name: 'Guest_WIFI', strength: 2, secure: false, connected: false },
     { id: 3, name: 'Coffee_Shop', strength: 3, secure: true, connected: false },
  ]);

  useEffect(() => {
    setOnline(navigator.onLine);
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const nav = navigator as any;
    if (nav.connection) {
        const updateConnection = () => {
            setConnectionInfo({
                type: nav.connection.effectiveType || 'wifi',
                downlink: nav.connection.downlink,
            });
        };
        updateConnection();
        nav.connection.addEventListener('change', updateConnection);
        return () => {
           window.removeEventListener('online', handleOnline);
           window.removeEventListener('offline', handleOffline);
           nav.connection.removeEventListener('change', updateConnection);
        };
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const activeNetworkName = connectionInfo 
        ? `Active Connection (${connectionInfo.type.toUpperCase()})` 
        : 'Active_Network';

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div 
        className="absolute bottom-12 right-12 z-50 w-72 bg-[#f0f0f0] border border-slate-300 rounded shadow-lg overflow-hidden font-[Segoe UI,sans-serif]"
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-white max-h-[300px] overflow-y-auto custom-scrollbar">
            {online ? (
                <>
                    <div className="p-3 border-b border-transparent bg-[#e8ebf0] border-slate-200 cursor-pointer flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-slate-900">{activeNetworkName}</span>
                            <span className="text-xs text-slate-500">Connected, {connectionInfo?.downlink ? `~${connectionInfo.downlink} Mbps` : 'secured'}</span>
                        </div>
                        <div className="flex items-center gap-1 opacity-80">
                            <Lock size={12} className="text-slate-600" />
                            <Signal size={20} className="text-[#1c669e]" />
                        </div>
                    </div>
                {networks.map(n => (
                    <div 
                        key={n.id} 
                        className={`p-3 border-b border-transparent hover:bg-[#e8ebf0] hover:border-slate-200 cursor-pointer flex items-center justify-between ${n.connected ? 'bg-[#e8ebf0] border-slate-200' : ''}`}
                    >
                        <div className="flex flex-col">
                            <span className={`text-sm font-medium ${n.connected ? 'text-slate-900' : 'text-slate-700'}`}>{n.name}</span>
                            {n.connected && <span className="text-xs text-slate-500">Connected, secured</span>}
                            {!n.connected && n.secure && <span className="text-xs text-slate-500">Secured</span>}
                            {!n.connected && !n.secure && <span className="text-xs text-slate-500">Open</span>}
                        </div>
                        <div className="flex items-center gap-1 opacity-80">
                            {n.secure && <Lock size={12} className="text-slate-600" />}
                            <Signal size={20} className={n.strength > 2 ? 'text-[#1c669e]' : 'text-slate-400'} />
                        </div>
                    </div>
                ))}
                </>
            ) : (
                <div className="p-6 flex flex-col items-center justify-center text-slate-500">
                    <WifiOff size={40} className="mb-2 opacity-50" />
                    <span className="text-sm">Not connected</span>
                    <span className="text-xs text-slate-400 text-center mt-1">Connections are available</span>
                </div>
            )}
        </div>
        <div className="p-2 bg-[#f5f6f7] border-t border-slate-300 flex items-center justify-between text-xs text-slate-600">
            <button className="flex items-center gap-1 hover:text-slate-900 hover:bg-slate-200 px-2 py-1 rounded transition-colors">
                 <RefreshCw size={12} /> Refresh
            </button>
            <button className="hover:text-[#1c669e] hover:underline">Network Settings</button>
        </div>
      </div>
    </>
  );
};
