import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import { WindowState, AppId } from '../../types';

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

  // Extract needed props for useEffect dependencies to avoid object dependency
  const { id, isMaximized, position, size, isOpen, isMinimized, zIndex } = windowState;

  // Mouse & Touch Move Handlers
  useEffect(() => {
    const handleMove = (clientX: number, clientY: number) => {
      if (isDragging && !isMaximized) {
        onMove(id, clientX - dragOffset.x, clientY - dragOffset.y);
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

        onResize(id, newWidth, newHeight, newX, newY);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging || isResizing) {
          e.preventDefault();
        }
        handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (isDragging || isResizing) {
            e.preventDefault(); // Prevent scrolling while dragging/resizing
        }
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
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, isResizing, dragOffset, startResize, resizeDir, onMove, onResize, id, isMaximized]);

  const handleStartDrag = (clientX: number, clientY: number) => {
    onFocus(id);
    setIsDragging(true);
    setDragOffset({
      x: clientX - position.x,
      y: clientY - position.y
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
      // Only drag if left click
      if (e.button !== 0) return;
      handleStartDrag(e.clientX, e.clientY);
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
      handleStartDrag(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleResizeStart = (e: React.MouseEvent | React.TouchEvent, dir: string) => {
      e.stopPropagation();
      onFocus(id);
      setIsResizing(true);
      setResizeDir(dir);
      
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

      setStartResize({
          x: clientX,
          y: clientY,
          width: size.width,
          height: size.height,
          posX: position.x,
          posY: position.y
      });
  };

  if (!isOpen || isMinimized) return null;

  return (
    <div
      ref={windowRef}
      className={`absolute flex flex-col glass-panel window-shadow rounded-lg overflow-hidden transition-[opacity] duration-200 ${
        isDragging ? 'cursor-grabbing' : ''
      }`}
      style={{
        left: Math.max(0, Math.min(position.x, typeof window !== 'undefined' ? window.innerWidth - 50 : position.x)),
        top: Math.max(0, Math.min(position.y, typeof window !== 'undefined' ? window.innerHeight - 80 : position.y)),
        width: isMaximized ? '100vw' : size.width,
        height: isMaximized ? 'calc(100vh - 44px)' : size.height,
        maxWidth: isMaximized ? '100vw' : `calc(100vw - ${Math.max(0, Math.min(position.x, typeof window !== 'undefined' ? window.innerWidth - 50 : position.x))}px)`,
        maxHeight: isMaximized ? 'calc(100vh - 44px)' : `calc(100vh - 44px - ${Math.max(0, Math.min(position.y, typeof window !== 'undefined' ? window.innerHeight - 80 : position.y))}px)`,
        zIndex: zIndex,
        touchAction: 'none' // Important for touch devices
      }}
      onMouseDown={() => onFocus(id)}
      onTouchStart={() => onFocus(id)}
    >
      {/* Resize Handles (Invisible but larger for touch) */}
      {!isMaximized && (
        <>
            <div className="absolute top-0 left-0 w-full h-2 cursor-n-resize z-50 -mt-1" onMouseDown={(e) => handleResizeStart(e, 'n')} onTouchStart={(e) => handleResizeStart(e, 'n')} />
            <div className="absolute bottom-0 left-0 w-full h-2 cursor-s-resize z-50 -mb-1" onMouseDown={(e) => handleResizeStart(e, 's')} onTouchStart={(e) => handleResizeStart(e, 's')} />
            <div className="absolute top-0 left-0 h-full w-2 cursor-w-resize z-50 -ml-1" onMouseDown={(e) => handleResizeStart(e, 'w')} onTouchStart={(e) => handleResizeStart(e, 'w')} />
            <div className="absolute top-0 right-0 h-full w-2 cursor-e-resize z-50 -mr-1" onMouseDown={(e) => handleResizeStart(e, 'e')} onTouchStart={(e) => handleResizeStart(e, 'e')} />
            
            {/* Corners (Larger hit targets) */}
            <div className="absolute top-0 left-0 w-6 h-6 cursor-nw-resize z-50 -ml-2 -mt-2" onMouseDown={(e) => handleResizeStart(e, 'nw')} onTouchStart={(e) => handleResizeStart(e, 'nw')} />
            <div className="absolute top-0 right-0 w-6 h-6 cursor-ne-resize z-50 -mr-2 -mt-2" onMouseDown={(e) => handleResizeStart(e, 'ne')} onTouchStart={(e) => handleResizeStart(e, 'ne')} />
            <div className="absolute bottom-0 left-0 w-6 h-6 cursor-sw-resize z-50 -ml-2 -mb-2" onMouseDown={(e) => handleResizeStart(e, 'sw')} onTouchStart={(e) => handleResizeStart(e, 'sw')} />
            <div className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize z-50 -mr-2 -mb-2" onMouseDown={(e) => handleResizeStart(e, 'se')} onTouchStart={(e) => handleResizeStart(e, 'se')} />
        </>
      )}

      {/* Window Header (Aero Titlebar) */}
      <div
        className="h-8 flex items-center justify-between px-2 cursor-default select-none bg-gradient-to-b from-white/70 via-white/30 to-white/10 border-b border-white/50 shrink-0 touch-none shadow-[0_1px_0_rgba(0,0,0,0.1)] relative"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"></div>
        <div className="flex items-center gap-2 px-1 pointer-events-none relative z-10">
          <windowState.icon size={16} className="text-slate-900 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]" />
          <span className="text-xs font-semibold tracking-wide text-slate-900 shadow-white drop-shadow-md" style={{ textShadow: '0 1px 3px rgba(255,255,255,0.9), 0 0 5px rgba(255,255,255,0.8)' }}>
            {windowState.title}
          </span>
        </div>
        
        <div 
          className="flex items-center window-controls gap-0.5 relative z-10 h-full py-1"
          onMouseDown={(e) => { e.stopPropagation(); onFocus(id); }}
          onTouchStart={(e) => { e.stopPropagation(); onFocus(id); }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(id); }}
            className="w-7 h-full flex items-center justify-center hover:bg-white/50 rounded-[3px] border border-transparent hover:border-white/50 transition-colors shadow-sm hover:shadow-[0_0_5px_rgba(255,255,255,0.8)]"
          >
            <Minus size={12} className="text-slate-800" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMaximize(id); }}
            className="w-7 h-full flex items-center justify-center hover:bg-white/50 rounded-[3px] border border-transparent hover:border-white/50 transition-colors shadow-sm hover:shadow-[0_0_5px_rgba(255,255,255,0.8)]"
          >
             {isMaximized ? <Square size={10} className="text-slate-800" /> : <Maximize2 size={10} className="text-slate-800" />}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(id); }}
            className="w-10 h-full flex items-center justify-center hover:bg-[#e81123] bg-transparent hover:text-white rounded-tr-md rounded-[3px] border border-transparent transition-colors group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <X size={14} className="text-slate-800 group-hover:text-white relative z-10" />
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