import React from 'react';
import { User, Power, Search, ChevronRight, FileText, Folder, MessageSquare, Mail, Github, Lock, Image as ImageIcon } from 'lucide-react';
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
    { id: AppId.AI_IMAGE_GEN, label: 'AI Image Gen', icon: ImageIcon, sub: 'Nano Banana Pro' },
    { id: AppId.CONTACT, label: 'Contact', icon: Mail, sub: 'E-mail' },
    { id: AppId.GITHUB, label: 'GitHub', icon: Github, sub: 'Source Code' },
  ];

  const handleItemClick = (id: AppId) => {
      soundService.play('click');
      onOpenApp(id);
      onClose();
  };

  return (
    <div 
      className="fixed bottom-11 left-0 w-[400px] h-[550px] z-[60] flex rounded-tr-lg rounded-tl-lg overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-white/20 animate-in slide-in-from-bottom-5 duration-100 select-none font-[Segoe UI,sans-serif]"
      onClick={(e) => e.stopPropagation()}
    >
       {/* Aero Glass Background Container */}
       <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md -z-10"></div>
       
       {/* Left Column (White) */}
       <div className="w-[60%] bg-white h-full flex flex-col p-2 pt-3 relative z-10">
          <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
             {menuItems.map((item) => (
                 <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className="w-full flex items-center gap-3 p-2 hover:bg-[#d9eafe] hover:shadow-[inset_0_0_0_1px_rgba(125,162,206,0.4)] rounded-sm transition-colors group text-left"
                 >
                    <div className="w-9 h-9 flex items-center justify-center">
                        <item.icon size={32} strokeWidth={1.5} className="text-[#304764] drop-shadow-sm group-hover:scale-105 transition-transform" />
                    </div>
                    <div>
                        <div className="text-[13px] font-bold text-[#1e395b]">{item.label}</div>
                        <div className="text-[11px] text-slate-500">{item.sub}</div>
                    </div>
                 </button>
             ))}
             
             <div className="h-px bg-slate-200 my-2 mx-1"></div>
             
             <button className="w-full text-left p-2 hover:bg-[#d9eafe] text-xs font-semibold text-[#1e395b] flex items-center justify-between group rounded-sm transition-colors">
                All Programs
                <div className="bg-gradient-to-t from-[#1e5799] to-[#2989d8] rounded-full p-0.5 group-hover:brightness-110">
                    <ChevronRight size={10} className="text-white" />
                </div>
             </button>
          </div>

          <div className="mt-2 pt-2 border-t border-slate-200">
             <div className="relative">
                 <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                 <input 
                    type="text" 
                    placeholder="Search programs and files" 
                    className="w-full py-1.5 pl-8 pr-3 text-xs border border-[#8e98a1] rounded-sm italic text-slate-600 focus:outline-none focus:border-[#1c669e] shadow-inner bg-white"
                 />
             </div>
          </div>
       </div>

       {/* Right Column (Darker Glass) */}
       <div className="w-[40%] bg-[#1a2533]/20 h-full border-l border-white/20 flex flex-col text-white shadow-[inset_10px_0_20px_rgba(0,0,0,0.2)] p-3 text-xs relative z-10">
          
          <div className="flex items-center gap-3 mb-4 hover:bg-white/10 rounded cursor-pointer p-1 transition-colors">
              <div className="w-12 h-12 rounded-md bg-[#dcebfd] border-[3px] border-white/40 overflow-hidden shadow-lg flex items-center justify-center relative">
                   {/* Placeholder for user image */}
                   <User size={36} className="text-[#647990] absolute -bottom-1" />
              </div>
              <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white drop-shadow-md hover:text-[#dcebfd] transition-colors">Keshav</span>
              </div>
          </div>

          <div className="space-y-1 flex-1 text-[#dcebfd] font-medium">
             {['Documents', 'Pictures', 'Music'].map(item => (
                 <button key={item} className="w-full text-left px-3 py-1.5 hover:bg-white/10 rounded-sm transition-colors hover:text-white">
                     {item}
                 </button>
             ))}
             <div className="h-px bg-white/10 my-2"></div>
             {['Computer', 'Network'].map(item => (
                 <button key={item} className="w-full text-left px-3 py-1.5 hover:bg-white/10 rounded-sm transition-colors hover:text-white">
                     {item}
                 </button>
             ))}
             <div className="h-px bg-white/10 my-2"></div>
             {['Control Panel', 'Devices and Printers', 'Default Programs', 'Help and Support'].map(item => (
                 <button key={item} className="w-full text-left px-3 py-1.5 hover:bg-white/10 rounded-sm transition-colors hover:text-white">
                     {item}
                 </button>
             ))}
          </div>

          <div className="mt-auto pt-2 flex justify-end gap-2">
              <button 
                className="flex items-center gap-1.5 bg-gradient-to-b from-[#b24848] to-[#801919] hover:from-[#c55b5b] hover:to-[#962525] border border-[#601010] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] px-3 py-1.5 rounded-[3px] text-xs font-semibold active:translate-y-px transition-all"
                onClick={onShutdown}
              >
                  <span>Shut down</span>
              </button>
              <button className="bg-gradient-to-b from-[#b24848] to-[#801919] hover:from-[#c55b5b] hover:to-[#962525] border border-[#601010] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] px-2 rounded-[3px] flex items-center justify-center">
                 <Lock size={10} />
              </button>
          </div>
       </div>
    </div>
  );
};
