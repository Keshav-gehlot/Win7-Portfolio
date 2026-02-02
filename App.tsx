import React, { useState, useEffect, useCallback } from 'react';
import { Taskbar } from './components/ui/Taskbar';
import { StartMenu } from './components/ui/StartMenu';
import { Window } from './components/ui/Window';
import { LiveBackground } from './components/ui/LiveBackground';
import { LoginScreen } from './components/ui/LoginScreen';
import { ContextMenu } from './components/ui/ContextMenu';
import { AboutApp } from './components/apps/AboutApp';
import { ProjectsApp } from './components/apps/ProjectsApp';
import { ChatApp } from './components/apps/ChatApp';
import { ContactApp } from './components/apps/ContactApp';
import { GeminiImageApp } from './components/apps/GeminiImageApp';
import { AppId, WindowState } from './types';
import { User, Briefcase, Mail, MessageSquare, Github, Image as ImageIcon } from 'lucide-react';
import { soundService } from './services/soundService';

const INITIAL_WINDOWS: WindowState[] = [
  {
    id: AppId.ABOUT,
    title: 'About Me',
    icon: User,
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 50, y: 50 },
    size: { width: 600, height: 450 },
  },
  {
    id: AppId.PROJECTS,
    title: 'My Projects',
    icon: Briefcase,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 2,
    position: { x: 100, y: 80 },
    size: { width: 750, height: 500 },
  },
  {
    id: AppId.CHAT,
    title: 'Keshav AI Chat',
    icon: MessageSquare,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 3,
    position: { x: 150, y: 110 },
    size: { width: 500, height: 600 },
  },
  {
    id: AppId.CONTACT,
    title: 'Contact',
    icon: Mail,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 4,
    position: { x: 200, y: 140 },
    size: { width: 650, height: 450 },
  },
  {
    id: AppId.AI_IMAGE_GEN,
    title: 'AI Image Generator',
    icon: ImageIcon,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 5,
    position: { x: 250, y: 170 },
    size: { width: 700, height: 550 },
  },
];

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [windows, setWindows] = useState<WindowState[]>(INITIAL_WINDOWS);
  const [activeWindowId, setActiveWindowId] = useState<AppId | null>(AppId.ABOUT);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [maxZIndex, setMaxZIndex] = useState(5);
  
  // New States
  const [contextMenu, setContextMenu] = useState<{ visible: boolean; x: number; y: number } | null>(null);
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const [bsod, setBsod] = useState(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);

  // BSOD Easter Egg Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      setKeySequence(prev => {
        const newSeq = [...prev, key].slice(-4);
        if (newSeq.join('') === 'bsod') {
          setBsod(true);
        }
        return newSeq;
      });
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogin = () => {
    soundService.play('startup');
    setIsLoggedIn(true);
  };

  const handleFocus = (id: AppId) => {
    setActiveWindowId(id);
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, zIndex: maxZIndex + 1, isMinimized: false } : w
    ));
    setMaxZIndex(z => z + 1);
  };

  const handleOpenApp = (id: AppId) => {
    if (id === AppId.GITHUB) {
        soundService.play('click');
        window.open('https://github.com/Keshav-gehlot', '_blank');
        return;
    }

    const target = windows.find(w => w.id === id);
    if (!target) return;

    if (target.isOpen) {
        handleFocus(id);
    } else {
        soundService.play('open');
        setWindows(prev => prev.map(w => 
            w.id === id ? { ...w, isOpen: true, zIndex: maxZIndex + 1, isMinimized: false } : w
        ));
        setMaxZIndex(z => z + 1);
        setActiveWindowId(id);
    }
  };

  const handleClose = (id: AppId) => {
    soundService.play('close');
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false, isMinimized: false } : w));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const handleMinimize = (id: AppId) => {
    soundService.play('minimize');
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const handleMaximize = (id: AppId) => {
     setWindows(prev => prev.map(w => {
         if (w.id !== id) return w;
         if (w.isMaximized) {
             soundService.play('minimize');
             return { 
                ...w, 
                isMaximized: false, 
                position: { x: 50 + (Math.random() * 50), y: 50 + (Math.random() * 50) }, 
                size: w.id === AppId.PROJECTS ? { width: 750, height: 500 } : { width: 600, height: 450 } 
             };
         } else {
             soundService.play('open');
             return { ...w, isMaximized: true, position: { x: 0, y: 0 }, size: { width: window.innerWidth, height: window.innerHeight - 40 } };
         }
     }));
     handleFocus(id);
  };

  const handleMove = (id: AppId, x: number, y: number) => {
    setWindows(prev => prev.map(w => 
      w.id === id && !w.isMaximized ? { ...w, position: { x, y } } : w
    ));
  };

  const handleResize = (id: AppId, width: number, height: number, x: number, y: number) => {
      setWindows(prev => prev.map(w => 
          w.id === id ? { ...w, size: { width, height }, position: { x, y } } : w
      ));
  };

  const handleTaskbarClick = (id: AppId) => {
      const w = windows.find(win => win.id === id);
      soundService.play('click');
      if (w?.isMinimized || activeWindowId !== id) {
          handleFocus(id);
      } else {
          handleMinimize(id);
      }
      setIsStartOpen(false);
  };

  const handleShowDesktop = () => {
    const anyOpen = windows.some(w => w.isOpen && !w.isMinimized);
    if (anyOpen) {
        soundService.play('minimize');
        setWindows(prev => prev.map(w => ({ ...w, isMinimized: true })));
        setActiveWindowId(null);
    } else {
        // Restore logic could be implemented here to toggle back
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
  };

  const handleShutdown = () => {
    setIsShuttingDown(true);
    // Simulate shutdown process
    setTimeout(() => {
        window.location.reload();
    }, 3000);
  };

  // Extra Desktop Icons mapping
  const desktopIcons = [
      { id: AppId.ABOUT, label: 'About Me', icon: User },
      { id: AppId.PROJECTS, label: 'Projects', icon: Briefcase },
      { id: AppId.CHAT, label: 'Chat', icon: MessageSquare },
      { id: AppId.AI_IMAGE_GEN, label: 'AI Image Gen', icon: ImageIcon },
      { id: AppId.CONTACT, label: 'Contact Me', icon: Mail },
      { id: AppId.GITHUB, label: 'GitHub', icon: Github },
  ];

  if (bsod) {
      return (
          <div className="fixed inset-0 bg-[#000082] text-white font-[ 'Lucida Console', monospace] p-8 z-[99999] cursor-none" onClick={() => setBsod(false)}>
              <div className="max-w-4xl">
                <p className="mb-8">A problem has been detected and Windows has been shut down to prevent damage to your computer.</p>
                <p className="mb-8">DRIVER_IRQL_NOT_LESS_OR_EQUAL</p>
                <p className="mb-8">If this is the first time you've seen this Stop error screen, restart your computer. If this screen appears again, follow these steps:</p>
                <p className="mb-8">Check to make sure any new hardware or software is properly installed. If this is a new installation, ask your hardware or software manufacturer for any Windows updates you might need.</p>
                <p className="mb-8">Technical information:</p>
                <p className="mb-8">*** STOP: 0x000000D1 (0x0000000C, 0x00000002, 0x00000000, 0xF86B5A89)</p>
                <p className="mb-8">***  gv3.sys - Address F86B5A89 base at F86B5000, DateStamp 3dd9919eb</p>
                <p>Beginning dump of physical memory</p>
                <p>Physical memory dump complete.</p>
                <p>Contact your system administrator or technical support group for further assistance.</p>
              </div>
          </div>
      );
  }

  if (isShuttingDown) {
      return (
          <div className="fixed inset-0 bg-[#0c2e42] flex items-center justify-center z-[9999] cursor-wait select-none font-[Segoe UI,sans-serif]">
               <div className="flex flex-col items-center gap-4">
                   <div className="w-8 h-8 rounded-full border-t-2 border-r-2 border-white/50 animate-spin"></div>
                   <span className="text-white text-lg font-light tracking-wide">Shutting down...</span>
               </div>
          </div>
      );
  }

  if (!isLoggedIn) {
      return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div 
      className="h-screen w-screen overflow-hidden relative select-none animate-in fade-in duration-700"
      onClick={() => {
          setIsStartOpen(false);
          setContextMenu(null);
      }}
      onContextMenu={handleContextMenu}
    >
      {/* Background Layer - Static Wallpaper */}
      <div 
        className="absolute inset-0 z-[-2]"
        style={{
            background: 'url("https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80") center/cover no-repeat'
        }}
      />

      {/* Interactive Layer - Particles */}
      <LiveBackground />

      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 flex flex-col gap-6 items-start z-0">
        {desktopIcons.map(icon => (
            <button 
                key={icon.id}
                onDoubleClick={(e) => { e.stopPropagation(); handleOpenApp(icon.id); }}
                className="flex flex-col items-center gap-1 w-[80px] group text-center cursor-default hover:bg-white/10 rounded border border-transparent hover:border-white/20 p-2 transition-colors focus:bg-white/20 focus:border-white/30 active:bg-white/20"
                onClick={(e) => { e.stopPropagation(); soundService.play('click'); }}
            >
                <div className="drop-shadow-2xl filter shadow-black transition-transform group-hover:scale-105 group-active:scale-95">
                    <icon.icon size={42} className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" strokeWidth={1.5} />
                </div>
                <span className="text-white text-xs drop-shadow-[0_1px_2px_rgba(0,0,0,1)] font-medium leading-tight line-clamp-2 shadow-black text-shadow-sm" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>
                    {icon.label}
                </span>
            </button>
        ))}
      </div>

      {/* Windows Layer */}
      {windows.map(window => (
        <Window
          key={window.id}
          windowState={window}
          onClose={handleClose}
          onMinimize={handleMinimize}
          onMaximize={handleMaximize}
          onFocus={handleFocus}
          onMove={handleMove}
          onResize={handleResize}
        >
          {window.id === AppId.ABOUT && <AboutApp />}
          {window.id === AppId.PROJECTS && <ProjectsApp />}
          {window.id === AppId.CHAT && <ChatApp />}
          {window.id === AppId.CONTACT && <ContactApp />}
          {window.id === AppId.AI_IMAGE_GEN && <GeminiImageApp />}
        </Window>
      ))}

      {/* Context Menu */}
      {contextMenu && (
          <ContextMenu 
            x={contextMenu.x} 
            y={contextMenu.y} 
            onClose={() => setContextMenu(null)}
            onRefresh={() => {
                // Flash effect for refresh
                const bg = document.createElement('div');
                bg.className = "absolute inset-0 bg-white/20 z-50 pointer-events-none";
                document.body.appendChild(bg);
                setTimeout(() => document.body.removeChild(bg), 50);
            }} 
          />
      )}

      {/* System UI */}
      <StartMenu 
        isOpen={isStartOpen} 
        onOpenApp={handleOpenApp} 
        onClose={() => setIsStartOpen(false)} 
        onShutdown={handleShutdown}
      />
      
      <Taskbar 
        windows={windows} 
        activeWindowId={activeWindowId} 
        onAppClick={handleTaskbarClick} 
        onStartClick={() => { soundService.play('click'); setIsStartOpen(!isStartOpen); }}
        isStartOpen={isStartOpen}
        onShowDesktop={handleShowDesktop}
      />
    </div>
  );
};

export default App;
