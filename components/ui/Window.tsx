import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import { WindowState, AppId } from '../../types';
import { soundService } from '../../services/soundService';

interface WindowProps {
  windowState: WindowState;
  onClose: (id: AppId) => void;
  onMinimize: (id: AppId) => void;
  onMaximize: (id: AppId) => void;
  onFocus: (id: AppId) => void;
  onMove: (id: AppId, x: number, y: number) => void;
  onResize: (id: AppId, width: number, height: number, x: number, y: number) => void;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({
  windowState,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  onResize,
  children,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDir, setResizeDir] = useState<string | null>(null);
  const [startResize, setStartResize] = useState({ x: 0, y: 0, width: 0, height: 0, posX: 0, posY: 0 });

  const windowRef = useRef<HTMLDivElement>(null);

  // Mouse & Touch Move Handlers
  useEffect(() => {
    const handleMove = (clientX: number, clientY: number) => {
      if (isDragging && !windowState.isMaximized) {
        onMove(windowState.id, clientX - dragOffset.x, clientY - dragOffset.y);
      } else if (isResizing && resizeDir) {
        let newWidth = startResize.width;
        let newHeight = startResize.height;
        let newX = startResize.posX;
        let newY = startResize.posY;

        const deltaX = clientX - startResize.x;
        const deltaY = clientY - startResize.y;

        if (resizeDir.includes('e')) newWidth = startResize.width + deltaX;
        if (resizeDir.includes('w')) {
            newWidth = startResize.width - deltaX;
            newX = startResize.posX + deltaX;
        }
        if (resizeDir.includes('s')) newHeight = startResize.height + deltaY;
        if (resizeDir.includes('n')) {
            newHeight = startResize.height - deltaY;
            newY = startResize.posY + deltaY;
        }

        // Min Constraints
        if (newWidth < 300) newWidth = 300;
        if (newHeight < 200) newHeight = 200;

        onResize(windowState.id, newWidth, newHeight, newX, newY);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
        handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length > 0) {
            handleMove(e.touches[0].clientX, e.touches[0].clientY);
        }
    };

    const handleEnd = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDir(null);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, isResizing, dragOffset, startResize, resizeDir, onMove, onResize, windowState]);

  const handleStartDrag = (clientX: number, clientY: number) => {
    onFocus(windowState.id);
    setIsDragging(true);
    setDragOffset({
      x: clientX - windowState.position.x,
      y: clientY - windowState.position.y
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => handleStartDrag(e.clientX, e.clientY);
  const handleTouchStart = (e: React.TouchEvent) => handleStartDrag(e.touches[0].clientX, e.touches[0].clientY);

  const handleResizeStart = (e: React.MouseEvent | React.TouchEvent, dir: string) => {
      e.stopPropagation();
      e.preventDefault(); // Prevent text selection
      onFocus(windowState.id);
      setIsResizing(true);
      setResizeDir(dir);
      
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

      setStartResize({
          x: clientX,
          y: clientY,
          width: windowState.size.width,
          height: windowState.size.height,
          posX: windowState.position.x,
          posY: windowState.position.y
      });
  };

  if (!windowState.isOpen || windowState.isMinimized) return null;

  return (
    <div
      ref={windowRef}
      className={`absolute flex flex-col glass-panel window-shadow rounded-lg overflow-hidden transition-[opacity] duration-200 ${
        isDragging ? 'cursor-grabbing' : ''
      }`}
      style={{
        left: windowState.position.x,
        top: windowState.position.y,
        width: windowState.size.width,
        height: windowState.size.height,
        zIndex: windowState.zIndex,
      }}
      onMouseDown={() => onFocus(windowState.id)}
      onTouchStart={() => onFocus(windowState.id)}
    >
      {/* Resize Handles (Invisible) */}
      {!windowState.isMaximized && (
        <>
            <div className="absolute top-0 left-0 w-full h-1 cursor-n-resize z-50" onMouseDown={(e) => handleResizeStart(e, 'n')} onTouchStart={(e) => handleResizeStart(e, 'n')} />
            <div className="absolute bottom-0 left-0 w-full h-1 cursor-s-resize z-50" onMouseDown={(e) => handleResizeStart(e, 's')} onTouchStart={(e) => handleResizeStart(e, 's')} />
            <div className="absolute top-0 left-0 h-full w-1 cursor-w-resize z-50" onMouseDown={(e) => handleResizeStart(e, 'w')} onTouchStart={(e) => handleResizeStart(e, 'w')} />
            <div className="absolute top-0 right-0 h-full w-1 cursor-e-resize z-50" onMouseDown={(e) => handleResizeStart(e, 'e')} onTouchStart={(e) => handleResizeStart(e, 'e')} />
            
            <div className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize z-50" onMouseDown={(e) => handleResizeStart(e, 'nw')} onTouchStart={(e) => handleResizeStart(e, 'nw')} />
            <div className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize z-50" onMouseDown={(e) => handleResizeStart(e, 'ne')} onTouchStart={(e) => handleResizeStart(e, 'ne')} />
            <div className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize z-50" onMouseDown={(e) => handleResizeStart(e, 'sw')} onTouchStart={(e) => handleResizeStart(e, 'sw')} />
            <div className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize z-50" onMouseDown={(e) => handleResizeStart(e, 'se')} onTouchStart={(e) => handleResizeStart(e, 'se')} />
        </>
      )}

      {/* Window Header (Aero Titlebar) */}
      <div
        className="h-8 flex items-center justify-between px-2 cursor-default select-none bg-gradient-to-b from-white/50 to-transparent border-b border-white/20 shrink-0"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="flex items-center gap-2 px-1 text-slate-800 shadow-black drop-shadow-sm">
          <windowState.icon size={16} className="text-slate-900 opacity-80" />
          <span className="text-xs font-semibold tracking-wide text-slate-900/90" style={{ textShadow: '0 0 5px rgba(255,255,255,0.8)' }}>
            {windowState.title}
          </span>
        </div>
        
        <div 
          className="flex items-center window-controls gap-1"
          onMouseDown={(e) => { e.stopPropagation(); onFocus(windowState.id); }}
          onTouchStart={(e) => { e.stopPropagation(); onFocus(windowState.id); }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(windowState.id); }}
            onTouchEnd={(e) => { e.stopPropagation(); onMinimize(windowState.id); }}
            className="w-6 h-5 flex items-center justify-center hover:bg-white/40 rounded-sm border border-transparent hover:border-white/30 transition-colors"
          >
            <Minus size={12} className="text-slate-800" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMaximize(windowState.id); }}
            onTouchEnd={(e) => { e.stopPropagation(); onMaximize(windowState.id); }}
            className="w-6 h-5 flex items-center justify-center hover:bg-white/40 rounded-sm border border-transparent hover:border-white/30 transition-colors"
          >
             {windowState.isMaximized ? <Square size={10} className="text-slate-800" /> : <Maximize2 size={10} className="text-slate-800" />}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(windowState.id); }}
            onTouchEnd={(e) => { e.stopPropagation(); onClose(windowState.id); }}
            className="w-10 h-5 flex items-center justify-center hover:bg-[#e81123] bg-transparent hover:text-white rounded-sm border border-transparent transition-colors group"
          >
            <X size={14} className="text-slate-800 group-hover:text-white" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 bg-white/80 overflow-hidden relative flex flex-col cursor-auto">
        {children}
      </div>
    </div>
  );
};
