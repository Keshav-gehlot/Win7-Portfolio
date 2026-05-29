import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ArrowRight, Search, ChevronRight, 
  Monitor, HardDrive, Star, Download, Globe, FileText, Image as ImageIcon, Music, HelpCircle, HardDrive as DeviceIcon, Cog, Folder 
} from 'lucide-react';
import { AppId } from '../../types';

interface FolderAppProps {
  folderId: AppId;
}

export const FolderApp: React.FC<FolderAppProps> = ({ folderId }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [storageData, setStorageData] = useState<{ usage: number, quota: number } | null>(null);

  useEffect(() => {
    if (navigator.storage && navigator.storage.estimate) {
        navigator.storage.estimate().then(estimate => {
            if (estimate.usage !== undefined && estimate.quota !== undefined) {
               setStorageData({ usage: estimate.usage, quota: estimate.quota });
            }
        }).catch(() => {});
    }
  }, []);

  const getFolderDetails = () => {
    switch (folderId) {
      case AppId.DOCUMENTS: return { title: 'Documents', icon: FileText };
      case AppId.PICTURES: return { title: 'Pictures', icon: ImageIcon };
      case AppId.MUSIC: return { title: 'Music', icon: Music };
      case AppId.COMPUTER: return { title: 'Computer', icon: Monitor };
      case AppId.NETWORK: return { title: 'Network', icon: Globe };
      case AppId.CONTROL_PANEL: return { title: 'Control Panel', icon: Cog };
      default: return { title: 'Folder', icon: Folder };
    }
  };

  const { title, icon: TitleIcon } = getFolderDetails();
  
  const formatBytes = (bytes: number) => {
      if (bytes === 0) return '0 B';
      const k = 1024;
      const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="flex flex-col h-full bg-[#f0f0f0] font-[Segoe UI,sans-serif] text-slate-800 select-none">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between p-2 bg-[#f5f6f7] border-b border-slate-300">
         <div className="flex items-center">
             <div className="flex gap-1 mr-4">
                 <button className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-[#e5e5e5] disabled:opacity-50 transition-colors">
                     <ArrowLeft size={20} />
                 </button>
                 <button className="p-1 rounded-full text-slate-400 disabled:opacity-50 transition-colors">
                     <ArrowRight size={20} />
                 </button>
             </div>
             
             {/* Path Bar */}
             <div className="flex items-center text-sm ml-2 mr-4 border border-slate-300 rounded overflow-hidden shadow-sm bg-white min-w-[300px]">
                 <div className="px-2 py-1 flex items-center text-slate-700">
                     <TitleIcon size={14} className="text-[#1c669e] mr-2" />
                     <span>This PC</span>
                     <ChevronRight size={14} className="text-slate-400 mx-1" />
                     <span className="font-semibold text-slate-800">{title}</span>
                 </div>
             </div>
         </div>
         
         {/* Search Box */}
         <div className="flex items-center border border-slate-300 rounded bg-white shadow-sm overflow-hidden w-[200px]">
             <div className="px-2 text-slate-400">
                <Search size={14} />
             </div>
             <input 
                type="text" 
                placeholder={`Search ${title}`}
                className="w-full py-1 pr-2 text-xs focus:outline-none italic text-slate-600 bg-transparent placeholder-slate-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
             />
         </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center px-4 py-2 bg-[#f5f6f7] border-b border-slate-200 text-xs text-slate-600 gap-6">
          <button className="hover:text-slate-800 transition-colors">Organize</button>
          <button className="hover:text-slate-800 transition-colors text-[#1979ca]">Share with</button>
          <button className="hover:text-slate-800 transition-colors">Burn</button>
          <button className="hover:text-slate-800 transition-colors">New folder</button>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden bg-white">
        {/* Left Sidebar */}
        <div className="w-[180px] bg-[#f5f6f7] border-r border-slate-200 p-2 overflow-y-auto custom-scrollbar hidden sm:block shadow-[inset_0_0_10px_rgba(0,0,0,0.02)]">
            <div className="space-y-4">
                <div>
                   <h3 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">Favorites</h3>
                   <div className="space-y-1 text-xs">
                       <button className="w-full flex items-center gap-2 px-2 py-1 hover:bg-[#e8ebf0] rounded text-slate-700">
                           <Star size={14} className="text-[#e2b714]" /> Desktop
                       </button>
                       <button className="w-full flex items-center gap-2 px-2 py-1 hover:bg-[#e8ebf0] rounded text-slate-700">
                           <Download size={14} className="text-[#1c669e]" /> Downloads
                       </button>
                   </div>
                </div>
                <div>
                   <h3 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">Libraries</h3>
                   <div className="space-y-1 text-xs">
                       <button className={`w-full flex items-center gap-2 px-2 py-1 rounded ${folderId === AppId.DOCUMENTS ? 'bg-[#cce8ff] text-slate-900 border border-[#99d1ff] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)]' : 'hover:bg-[#e8ebf0] text-slate-700'}`}>
                           <FileText size={14} className="text-[#1c669e]" /> Documents
                       </button>
                       <button className={`w-full flex items-center gap-2 px-2 py-1 rounded ${folderId === AppId.PICTURES ? 'bg-[#cce8ff] text-slate-900 border border-[#99d1ff] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)]' : 'hover:bg-[#e8ebf0] text-slate-700'}`}>
                           <ImageIcon size={14} className="text-[#1c669e]" /> Pictures
                       </button>
                   </div>
                </div>
                <div>
                   <h3 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">Computer</h3>
                   <div className="space-y-1 text-xs">
                       <button className="w-full flex items-center gap-2 px-2 py-1 hover:bg-[#e8ebf0] rounded text-slate-700">
                           <HardDrive size={14} className="text-slate-500" /> Local Disk (C:)
                       </button>
                   </div>
                </div>
            </div>
        </div>

        {/* Main Grid View */}
        <div className="flex-1 bg-white p-4 overflow-y-auto">
           {searchQuery ? (
              <div className="flex flex-col items-center justify-center text-slate-400 py-10 h-full">
                  <Search size={24} className="mb-2 opacity-50" />
                  <span>No items match your search.</span>
              </div>
           ) : folderId === AppId.COMPUTER ? (
              <div className="flex flex-col gap-6">
                 <div>
                    <h3 className="text-xs font-semibold text-slate-700 border-b border-slate-200 pb-1 mb-4">Hard Disk Drives (1)</h3>
                    <div className="flex items-start gap-4 p-2 hover:bg-[#e8ebf0] border border-transparent hover:border-slate-300 rounded cursor-pointer w-[300px]">
                        <HardDrive size={40} className="text-slate-600 mt-1" strokeWidth={1} />
                        <div className="flex flex-col flex-1">
                            <span className="text-sm font-medium text-slate-800">Local Disk (C:)</span>
                            {storageData ? (
                                <>
                                    <div className="w-full bg-slate-200 h-3 mt-1.5 mb-1 rounded-sm overflow-hidden border border-slate-300">
                                        <div 
                                            className="h-full bg-gradient-to-b from-[#4caf50] to-[#2e7d32]" 
                                            style={{ width: `${(storageData.usage / storageData.quota) * 100}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-slate-500">
                                        {formatBytes(storageData.quota - storageData.usage)} free of {formatBytes(storageData.quota)}
                                    </span>
                                </>
                            ) : (
                                <div className="text-xs text-slate-500 mt-1">Calculating storage...</div>
                            )}
                        </div>
                    </div>
                 </div>
              </div>
           ) : (
              <div className="flex flex-col items-center justify-center text-slate-400 py-10 h-full opacity-60">
                  <TitleIcon size={48} className="mb-3 text-slate-300" strokeWidth={1} />
                  <span>This folder is empty.</span>
              </div>
           )}
        </div>
      </div>
      
      {/* Status Bar */}
      <div className="bg-[#f0f0f0] border-t border-slate-300 px-3 py-1 flex items-center justify-between text-[11px] text-slate-500">
          <span>0 items</span>
      </div>
    </div>
  );
};
