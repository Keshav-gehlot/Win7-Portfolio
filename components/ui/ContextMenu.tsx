import React, { useEffect, useRef } from 'react';
import { Monitor, RefreshCw, Grid, Check, Sliders } from 'lucide-react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onRefresh: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose, onRefresh }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div 
      ref={menuRef}
      className="absolute w-56 bg-[#f0f0f0] border border-[#979797] shadow-[2px_2px_5px_rgba(0,0,0,0.3)] z-[9999] py-1 select-none font-[Segoe UI,sans-serif] text-sm text-slate-800"
      style={{ top: y, left: x }}
      onClick={(e) => e.stopPropagation()} // Prevent clicking menu from closing it immediately
    >
      <div className="flex items-center gap-3 px-3 py-1.5 hover:bg-[#e8eff7] hover:border-slate-300 border border-transparent cursor-pointer group">
         <div className="w-4"><Monitor size={16} className="text-slate-600" /></div>
         <span>View</span>
         <span className="ml-auto text-[10px] opacity-60">▶</span>
      </div>
      <div className="flex items-center gap-3 px-3 py-1.5 hover:bg-[#e8eff7] hover:border-slate-300 border border-transparent cursor-pointer">
         <div className="w-4"><Grid size={16} className="text-slate-600" /></div>
         <span>Sort by</span>
         <span className="ml-auto text-[10px] opacity-60">▶</span>
      </div>
      <div 
        className="flex items-center gap-3 px-3 py-1.5 hover:bg-[#e8eff7] hover:border-slate-300 border border-transparent cursor-pointer"
        onClick={() => { onRefresh(); onClose(); }}
      >
         <div className="w-4"><RefreshCw size={14} className="text-slate-600" /></div>
         <span>Refresh</span>
      </div>
      
      <div className="my-1 border-b border-[#d9d9d9] mx-1"></div>

      <div className="flex items-center gap-3 px-3 py-1.5 hover:bg-[#e8eff7] hover:border-slate-300 border border-transparent cursor-pointer opacity-50">
         <div className="w-4"></div>
         <span>Paste</span>
      </div>
      <div className="flex items-center gap-3 px-3 py-1.5 hover:bg-[#e8eff7] hover:border-slate-300 border border-transparent cursor-pointer opacity-50">
         <div className="w-4"></div>
         <span>Paste shortcut</span>
      </div>

      <div className="my-1 border-b border-[#d9d9d9] mx-1"></div>

      <div className="flex items-center gap-3 px-3 py-1.5 hover:bg-[#e8eff7] hover:border-slate-300 border border-transparent cursor-pointer">
         <div className="w-4"><Sliders size={16} className="text-slate-600" /></div>
         <span>Personalize</span>
      </div>
    </div>
  );
};
