import React, { useEffect, useRef, useState } from 'react';
import { Monitor, RefreshCw, Grid, Check, Sliders, ChevronRight } from 'lucide-react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onRefresh: () => void;
  iconSize: 'large' | 'medium' | 'small';
  setIconSize: (size: 'large' | 'medium' | 'small') => void;
  sortOrder: 'name' | 'size' | 'type' | 'date';
  setSortOrder: (order: 'name' | 'size' | 'type' | 'date') => void;
  autoArrange: boolean;
  setAutoArrange: (v: boolean) => void;
  alignToGrid: boolean;
  setAlignToGrid: (v: boolean) => void;
  showDesktopIcons: boolean;
  setShowDesktopIcons: (v: boolean) => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ 
    x, y, onClose, onRefresh, 
    iconSize, setIconSize, 
    sortOrder, setSortOrder,
    autoArrange, setAutoArrange,
    alignToGrid, setAlignToGrid,
    showDesktopIcons, setShowDesktopIcons
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<'view' | 'sort' | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Handle boundary offset for submenus so they don't clip right screen edge
  const [openLeft, setOpenLeft] = useState(false);
  useEffect(() => {
     if (menuRef.current) {
        const rect = menuRef.current.getBoundingClientRect();
        if (rect.right + 200 > window.innerWidth) {
            setOpenLeft(true);
        } else {
            setOpenLeft(false);
        }
     }
  }, [x, y]);

  return (
    <div 
      ref={menuRef}
      className="absolute w-56 bg-[#f0f0f0] border border-[#979797] shadow-[2px_2px_5px_rgba(0,0,0,0.3)] z-[9999] py-1 select-none font-[Segoe UI,sans-serif] text-sm text-slate-800"
      style={{ top: Math.min(y, window.innerHeight - 300), left: Math.min(x, window.innerWidth - 250) }}
      onClick={(e) => e.stopPropagation()}
    >
      <div 
        className="relative"
        onMouseEnter={() => setActiveSubMenu('view')}
        onMouseLeave={() => setActiveSubMenu(null)}
      >
        <div className={`flex items-center gap-3 px-3 py-1.5 cursor-default ${activeSubMenu === 'view' ? 'bg-[#e8ebf0]' : 'hover:bg-[#e8ebf0]'}`}>
          <div className="w-4"><Monitor size={16} className="text-slate-600" /></div>
          <span>View</span>
          <span className="ml-auto flex items-center justify-center opacity-70"><ChevronRight size={14} /></span>
        </div>
        
        {activeSubMenu === 'view' && (
          <div className={`absolute ${openLeft ? 'right-[calc(100%-2px)]' : 'left-[calc(100%-2px)]'} -top-1 w-48 bg-[#f0f0f0] border border-[#979797] shadow-[2px_2px_5px_rgba(0,0,0,0.3)] z-[10000] py-1`}>
             <div className="flex items-center gap-3 px-3 py-1.5 hover:bg-[#e8ebf0] cursor-default" onClick={() => { setIconSize('large'); onClose(); }}>
                 <div className="w-4 flex justify-center">{iconSize === 'large' && <Check size={14} className="text-slate-800" />}</div>
                 <span>Large icons</span>
             </div>
             <div className="flex items-center gap-3 px-3 py-1.5 hover:bg-[#e8ebf0] cursor-default" onClick={() => { setIconSize('medium'); onClose(); }}>
                 <div className="w-4 flex justify-center">{iconSize === 'medium' && <Check size={14} className="text-slate-800" />}</div>
                 <span>Medium icons</span>
             </div>
             <div className="flex items-center gap-3 px-3 py-1.5 hover:bg-[#e8ebf0] cursor-default" onClick={() => { setIconSize('small'); onClose(); }}>
                 <div className="w-4 flex justify-center">{iconSize === 'small' && <Check size={14} className="text-slate-800" />}</div>
                 <span>Small icons</span>
             </div>
             <div className="my-1 border-b border-[#d9d9d9] mx-1"></div>
             <div className="flex items-center gap-3 px-3 py-1.5 hover:bg-[#e8ebf0] cursor-default" onClick={() => { setAutoArrange(!autoArrange); onClose(); }}>
                 <div className="w-4 flex justify-center">{autoArrange && <Check size={14} className="text-slate-800" />}</div>
                 <span>Auto arrange icons</span>
             </div>
             <div className="flex items-center gap-3 px-3 py-1.5 hover:bg-[#e8ebf0] cursor-default" onClick={() => { setAlignToGrid(!alignToGrid); onClose(); }}>
                 <div className="w-4 flex justify-center">{alignToGrid && <Check size={14} className="text-slate-800" />}</div>
                 <span>Align icons to grid</span>
             </div>
             <div className="my-1 border-b border-[#d9d9d9] mx-1"></div>
             <div className="flex items-center gap-3 px-3 py-1.5 hover:bg-[#e8ebf0] cursor-default" onClick={() => { setShowDesktopIcons(!showDesktopIcons); onClose(); }}>
                 <div className="w-4 flex justify-center">{showDesktopIcons && <Check size={14} className="text-slate-800" />}</div>
                 <span>Show desktop icons</span>
             </div>
          </div>
        )}
      </div>

      <div 
        className="relative"
        onMouseEnter={() => setActiveSubMenu('sort')}
        onMouseLeave={() => setActiveSubMenu(null)}
      >
        <div className={`flex items-center gap-3 px-3 py-1.5 cursor-default ${activeSubMenu === 'sort' ? 'bg-[#e8ebf0]' : 'hover:bg-[#e8ebf0]'}`}>
          <div className="w-4"><Grid size={16} className="text-slate-600" /></div>
          <span>Sort by</span>
          <span className="ml-auto flex items-center justify-center opacity-70"><ChevronRight size={14} /></span>
        </div>
        
        {activeSubMenu === 'sort' && (
          <div className={`absolute ${openLeft ? 'right-[calc(100%-2px)]' : 'left-[calc(100%-2px)]'} -top-1 w-40 bg-[#f0f0f0] border border-[#979797] shadow-[2px_2px_5px_rgba(0,0,0,0.3)] z-[10000] py-1`}>
             <div className="flex items-center gap-3 px-3 py-1.5 hover:bg-[#e8ebf0] cursor-default" onClick={() => { setSortOrder('name'); onClose(); }}>
                 <div className="w-4 flex justify-center">{sortOrder === 'name' && <Check size={14} className="text-slate-800" />}</div>
                 <span>Name</span>
             </div>
             <div className="flex items-center gap-3 px-3 py-1.5 hover:bg-[#e8ebf0] cursor-default" onClick={() => { setSortOrder('size'); onClose(); }}>
                 <div className="w-4 flex justify-center">{sortOrder === 'size' && <Check size={14} className="text-slate-800" />}</div>
                 <span>Size</span>
             </div>
             <div className="flex items-center gap-3 px-3 py-1.5 hover:bg-[#e8ebf0] cursor-default" onClick={() => { setSortOrder('type'); onClose(); }}>
                 <div className="w-4 flex justify-center">{sortOrder === 'type' && <Check size={14} className="text-slate-800" />}</div>
                 <span>Item type</span>
             </div>
             <div className="flex items-center gap-3 px-3 py-1.5 hover:bg-[#e8ebf0] cursor-default" onClick={() => { setSortOrder('date'); onClose(); }}>
                 <div className="w-4 flex justify-center">{sortOrder === 'date' && <Check size={14} className="text-slate-800" />}</div>
                 <span>Date modified</span>
             </div>
          </div>
        )}
      </div>

      <div 
        className="flex items-center gap-3 px-3 py-1.5 hover:bg-[#e8ebf0] cursor-default"
        onMouseEnter={() => setActiveSubMenu(null)}
        onClick={() => { onRefresh(); onClose(); }}
      >
         <div className="w-4 flex justify-center"><RefreshCw size={14} className="text-slate-600" /></div>
         <span>Refresh</span>
      </div>
      
      <div className="my-1 border-b border-[#d9d9d9] mx-1"></div>

      <div className="flex items-center gap-3 px-3 py-1.5 cursor-default opacity-50" onMouseEnter={() => setActiveSubMenu(null)}>
         <div className="w-4"></div>
         <span>Paste</span>
      </div>
      <div className="flex items-center gap-3 px-3 py-1.5 cursor-default opacity-50" onMouseEnter={() => setActiveSubMenu(null)}>
         <div className="w-4"></div>
         <span>Paste shortcut</span>
      </div>

      <div className="my-1 border-b border-[#d9d9d9] mx-1"></div>

      <div className="flex items-center gap-3 px-3 py-1.5 hover:bg-[#e8ebf0] cursor-default" onMouseEnter={() => setActiveSubMenu(null)} onClick={onClose}>
         <div className="w-4 flex justify-center"><Sliders size={16} className="text-slate-600" /></div>
         <span>Personalize</span>
      </div>
    </div>
  );
};
