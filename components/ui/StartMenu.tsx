import React from 'react';
import { User, Search, ChevronRight, FileText, Folder, MessageSquare, Mail, Github, Lock, ShieldAlert, Terminal, Linkedin } from 'lucide-react';
import { AppId } from '../../types';
import { soundService } from '../../services/soundService';

interface StartMenuProps {
  isOpen: boolean;
  onOpenApp: (id: AppId) => void;
  onClose: () => void;
  onShutdown: () => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({ isOpen, onOpenApp, onClose, onShutdown }) => {
  if (!isOpen) return null;

  const menuItems = [
    { id: AppId.ABOUT, label: 'About Me', icon: FileText, sub: 'Portfolio' },
    { id: AppId.PROJECTS, label: 'Projects', icon: Folder, sub: 'Explorer' },
    { id: AppId.CHAT, label: 'Chat', icon: MessageSquare, sub: 'AI Chat' },
    { id: AppId.TERMINAL, label: 'Command Prompt', icon: Terminal, sub: 'System Tool' },
    { id: AppId.NO_APP, label: 'Admin Request', icon: ShieldAlert, sub: 'Admin Control' },
    { id: AppId.CONTACT, label: 'Contact', icon: Mail, sub: 'E-mail' },
    { id: AppId.GITHUB, label: 'GitHub', icon: Github, sub: 'Source Code' },
    { id: AppId.LINKEDIN, label: 'LinkedIn', icon: Linkedin, sub: 'Professional Profile' },
  ];

  const handleItemClick = (id: AppId) => {
      soundService.play('click');
      onOpenApp(id);
      onClose();
  };

  return (
    <div 
      className="fixed bottom-[44px] left-0 w-[95vw] sm:w-[420px] max-w-full h-[80vh] sm:h-[580px] max-h-[calc(100vh-44px)] z-[60] flex rounded-tr-lg overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.6)] border border-white/30 animate-in slide-in-from-bottom-5 duration-100 select-none font-[Segoe UI,sans-serif]"
      onClick={(e) => e.stopPropagation()}
    >
       {/* Aero Glass Background Container */}
       <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-3xl saturate-[1.5] -z-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"></div>
       
       {/* Left Column (White) */}
       <div className="w-[62%] h-full flex flex-col p-2 pt-3 relative z-10 m-[2px] mr-0 ml-[2px] mb-[2px] rounded-tl-[6px] rounded-bl-[6px] bg-white/95 shadow-[1px_0_10px_rgba(0,0,0,0.1)]">
          <div className="flex-1 overflow-y-auto space-y-0.5 pr-1 custom-scrollbar">
             {menuItems.map((item) => (
                 <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className="w-full flex items-center gap-3 p-2 hover:bg-[#d9eafe] hover:shadow-[0_0_0_1px_rgba(125,162,206,0.3)_inset] rounded-[3px] transition-all group text-left"
                 >
                    <div className="w-9 h-9 flex items-center justify-center">
                        <item.icon size={28} strokeWidth={1.5} className="text-[#304764] drop-shadow-sm group-hover:scale-110 transition-transform duration-200" />
                    </div>
                    <div>
                        <div className="text-[13px] font-semibold text-[#1e395b]">{item.label}</div>
                        <div className="text-[11px] text-slate-500 opacity-90">{item.sub}</div>
                    </div>
                 </button>
             ))}
             
             <div className="h-px bg-slate-200/50 my-3 mx-2"></div>
             
             <button className="w-full text-left p-2 hover:bg-[#d9eafe] hover:shadow-[0_0_0_1px_rgba(125,162,206,0.3)_inset] text-xs font-semibold text-[#1e395b] flex items-center justify-between group rounded-[3px] transition-all">
                All Programs
                <div className="bg-gradient-to-t from-[#1e5799] to-[#2989d8] rounded-full p-0.5 group-hover:scale-110 transition-transform">
                    <ChevronRight size={12} className="text-white" />
                </div>
             </button>
          </div>

          <div className="mt-2 pt-3 pb-1 border-t border-slate-200/50 px-1">
             <div className="relative group">
                 <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1c669e] transition-colors" />
                 <input 
                    type="text" 
                    placeholder="Search programs and files" 
                    className="w-full py-1.5 pl-8 pr-3 text-xs border border-[#8e98a1]/50 rounded-[3px] italic text-slate-600 focus:outline-none focus:border-[#1c669e] shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] bg-white/90 focus:bg-white transition-all"
                 />
             </div>
          </div>
       </div>

       {/* Right Column (Darker Glass) */}
       <div className="flex-1 h-full flex flex-col text-white px-2 py-3 text-xs relative z-10 m-[2px] ml-0 mb-[2px] rounded-tr-[6px] rounded-br-[6px] bg-black/20">
          
          <div className="flex items-center gap-3 mb-6 hover:bg-white/10 rounded-[3px] cursor-pointer p-2 transition-colors">
              <div className="w-12 h-12 rounded bg-[#dcebfd] border-[2px] border-white/60 overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.3)] flex items-center justify-center relative">
                   {/* Placeholder for user image */}
                   <User size={36} className="text-[#647990] absolute -bottom-1" />
              </div>
              <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white text-shadow-sm hover:text-blue-100 transition-colors">Keshav</span>
              </div>
          </div>

          <div className="space-y-0.5 flex-1 text-white/90 font-medium px-1">
             {[
               { id: AppId.DOCUMENTS, label: 'Documents' },
               { id: AppId.PICTURES, label: 'Pictures' },
               { id: AppId.MUSIC, label: 'Music' }
             ].map(item => (
                 <button key={item.id} onClick={() => handleItemClick(item.id)} className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-[3px] transition-colors hover:text-white hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]">
                     {item.label}
                 </button>
             ))}
          </div>

          <div className="mt-auto pt-3 pb-1 border-t border-white/10 px-1 flex justify-end gap-1">
              <button 
                className="flex items-center gap-1.5 bg-gradient-to-b from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 border border-red-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.3)] px-4 py-1.5 rounded-[3px] text-xs font-semibold active:translate-y-px transition-all"
                onClick={onShutdown}
              >
                  <span>Shut down</span>
              </button>
              <button className="bg-gradient-to-b from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 border border-red-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.3)] px-3 rounded-[3px] flex items-center justify-center transition-all active:translate-y-px">
                 <Lock size={12} className="drop-shadow-sm" />
              </button>
          </div>
       </div>
    </div>
  );
};