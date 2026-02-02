import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, Search, ChevronRight, 
  Monitor, HardDrive, Star, Download, Globe, 
  ShieldAlert, Cpu, Eye, Terminal, Code, ChevronDown, Folder, X,
  Lock, Activity, Bug, Sprout, Music, Hand, Aperture, TrendingUp, Mail, Youtube, Heart, Trophy,
  Key, Wifi, Camera
} from 'lucide-react';

interface ProjectItem {
  id: number;
  name: string;
  desc: string;
  icon: React.ElementType;
  url: string | null;
  colorClass: string;
  category: string;
}

const projects: ProjectItem[] = [
  // Cybersecurity & Network
  { 
    id: 1, 
    name: "Kraken", 
    desc: "Password & hash cracking tool. Performs dictionary and brute-force attacks against hash types like MD5 and SHA-256.", 
    icon: Key, 
    url: "https://github.com/Keshav-gehlot/Kraken-password-cracker",
    colorClass: "text-red-600",
    category: "Security"
  },
  { 
    id: 2, 
    name: "Net-Watch", 
    desc: "Real-time network monitoring tool. Identifies active devices, tracks bandwidth usage, and alerts on suspicious network activity.", 
    icon: Wifi, 
    url: "https://github.com/Keshav-gehlot/Net-Watch",
    colorClass: "text-slate-700",
    category: "Network"
  },
  { 
    id: 3, 
    name: "Malware Visualizer", 
    desc: "Forensic tool that visualizes the execution path and API calls of potential malware for behavior analysis.", 
    icon: Bug, 
    url: "https://github.com/Keshav-gehlot/malware-behavior-visualizer",
    colorClass: "text-red-500",
    category: "Security"
  },
  
  // AI, ML & Computer Vision
  { 
    id: 4, 
    name: "CropDoc (CropSenz)", 
    desc: "AI-based crop disease diagnosis using Convolutional Neural Networks (CNN) to classify disease types from leaf images.", 
    icon: Sprout, 
    url: "https://github.com/Samarth-143/CropDoc",
    colorClass: "text-green-600",
    category: "AI/ML"
  },
  { 
    id: 5, 
    name: "Air Piano", 
    desc: "Virtual musical instrument played by moving hands in the air. Maps spatial hand coordinates to piano notes in real-time.", 
    icon: Music, 
    url: "https://github.com/Keshav-gehlot/-tracking-and-air-piano-",
    colorClass: "text-purple-600",
    category: "CV"
  },
  { 
    id: 6, 
    name: "Hands Tracking", 
    desc: "Computer vision engine capable of tracking 21-point hand landmarks in real-time using MediaPipe.", 
    icon: Hand, 
    url: "https://github.com/Keshav-gehlot/Hands-tracking",
    colorClass: "text-blue-500",
    category: "CV"
  },
  { 
    id: 7, 
    name: "Raw Image Processor", 
    desc: "Algorithms for performing low-level processing on raw image data, bypassing standard camera ISPs.", 
    icon: Camera, 
    url: "https://github.com/Keshav-gehlot/raw_image_processor",
    colorClass: "text-indigo-600",
    category: "Processing"
  },
  { 
    id: 8, 
    name: "AI Stock Prediction", 
    desc: "Financial forecasting tool using Long Short-Term Memory (LSTM) networks to predict future stock trends.", 
    icon: TrendingUp, 
    url: "https://github.com/Keshav-gehlot/AI-stock-prediction-",
    colorClass: "text-emerald-600",
    category: "AI/ML"
  },

  // Web & Utilities
  { 
    id: 9, 
    name: "Mass Mailer AI", 
    desc: "Automated email campaign tool that uses AI to generate personalized subject lines and email content.", 
    icon: Mail, 
    url: "https://github.com/Keshav-gehlot/Mass-Mailer-AI-",
    colorClass: "text-blue-400",
    category: "Web"
  },
  { 
    id: 10, 
    name: "YouTube Playlist Fetcher", 
    desc: "Tool for extracting data and metadata from YouTube playlists for analysis or archiving.", 
    icon: Youtube, 
    url: "https://github.com/Keshav-gehlot/youtube-playlist-fetcher",
    colorClass: "text-red-600",
    category: "Utility"
  },
  { 
    id: 11, 
    name: "Wellnest", 
    desc: "Mental health focused web application providing resources and tracking for user well-being.", 
    icon: Heart, 
    url: "https://github.com/Keshav-gehlot/WELLNEST",
    colorClass: "text-teal-500",
    category: "Web"
  },
  { 
    id: 12, 
    name: "IPL Website (RCB)", 
    desc: "Responsive fan website for the Royal Challengers Bangalore IPL team with player stats and galleries.", 
    icon: Trophy, 
    url: "https://github.com/Keshav-gehlot/IPL-website-RCB-",
    colorClass: "text-red-700",
    category: "Web"
  },
];

export const ProjectsApp: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [modalProject, setModalProject] = useState<ProjectItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDoubleClick = (project: ProjectItem) => {
    setModalProject(project);
  };

  const closeModal = () => {
    setModalProject(null);
  };

  const openProjectUrl = () => {
    if (modalProject?.url) {
      window.open(modalProject.url, "_blank");
    }
  };

  const filteredProjects = projects.filter(project => {
    const query = searchQuery.toLowerCase();
    return (
      project.name.toLowerCase().includes(query) ||
      project.desc.toLowerCase().includes(query) ||
      project.category.toLowerCase().includes(query)
    );
  });

  const selectedProject = projects.find(p => p.id === selectedId);

  return (
    <div className="flex flex-col h-full w-full bg-[#f0f2f5] select-none text-slate-800 font-[Segoe UI,sans-serif] relative">
      {/* Top Bar: Navigation & Address */}
      <div className="flex items-center gap-2 p-2 bg-[#f0f2f5] border-b border-[#d9d9d9]">
        <div className="flex gap-1 text-slate-400">
           <button className="p-1 hover:bg-[#dcebfd] hover:border hover:border-[#7da2ce] rounded-full border border-transparent transition-colors disabled:opacity-50" title="Back">
             <ArrowLeft size={16} className="text-[#607d8b]" />
           </button>
           <button className="p-1 hover:bg-[#dcebfd] hover:border hover:border-[#7da2ce] rounded-full border border-transparent transition-colors disabled:opacity-50" title="Forward">
             <ArrowRight size={16} className="text-[#607d8b]" />
           </button>
           <button className="p-1 hover:bg-[#dcebfd] hover:border hover:border-[#7da2ce] rounded-full border border-transparent transition-colors disabled:opacity-50" title="Recent Pages">
              <ChevronDown size={10} className="text-[#607d8b]" />
           </button>
        </div>

        {/* Address Bar */}
        <div className="flex-1 flex items-center bg-white border border-[#bdc3c7] h-6 px-2 text-xs shadow-inner rounded-sm overflow-hidden whitespace-nowrap">
           <Monitor size={14} className="text-slate-500 mr-2 flex-shrink-0" />
           <div className="flex items-center text-slate-700 w-full">
              <span className="hover:bg-slate-100 px-1 cursor-pointer flex items-center border border-transparent hover:border-slate-200">
                Computer <ChevronRight size={10} className="text-slate-400 mx-1" />
              </span>
              <span className="hover:bg-slate-100 px-1 cursor-pointer flex items-center border border-transparent hover:border-slate-200">
                Local Disk (C:) <ChevronRight size={10} className="text-slate-400 mx-1" />
              </span>
              <span className="font-semibold px-1 flex items-center">
                GitHub_Repos
              </span>
           </div>
        </div>

        {/* Search Bar */}
        <div className="w-48 bg-white border border-[#bdc3c7] h-6 px-2 flex items-center shadow-inner rounded-sm">
           <Search size={12} className="text-slate-400 mr-2" />
           <input 
             type="text" 
             placeholder="Search GitHub_Repos" 
             className="w-full text-xs outline-none bg-transparent placeholder-slate-400 italic font-sans" 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
           />
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-[#f5f6f7] border-b border-[#d9d9d9] py-1.5 px-3 flex items-center gap-4 text-xs text-slate-600 shadow-[inset_0_1px_0_white]">
        <span className="hover:text-blue-600 cursor-pointer px-2 py-0.5 border border-transparent hover:border-[#bce8f7] hover:bg-[#e8f6fd] rounded-sm transition-colors">Organize</span>
        <span className="hover:text-blue-600 cursor-pointer px-2 py-0.5 border border-transparent hover:border-[#bce8f7] hover:bg-[#e8f6fd] rounded-sm transition-colors">Include in library</span>
        <span className="hover:text-blue-600 cursor-pointer px-2 py-0.5 border border-transparent hover:border-[#bce8f7] hover:bg-[#e8f6fd] rounded-sm transition-colors">Share with</span>
        <span className="hover:text-blue-600 cursor-pointer px-2 py-0.5 border border-transparent hover:border-[#bce8f7] hover:bg-[#e8f6fd] rounded-sm transition-colors">Burn</span>
        <span className="hover:text-blue-600 cursor-pointer px-2 py-0.5 border border-transparent hover:border-[#bce8f7] hover:bg-[#e8f6fd] rounded-sm transition-colors">New folder</span>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 bg-[#f1f5fb] border-r border-[#d9d9d9] p-2 pt-4 overflow-y-auto hidden sm:block">
           <div className="space-y-4 text-xs text-slate-700">
              <div>
                  <div className="flex items-center gap-1 font-semibold text-slate-500 mb-1 hover:bg-[#e5f3fb] px-1 py-0.5 rounded cursor-pointer transition-colors group">
                     <Star size={10} className="group-hover:text-yellow-500 text-slate-400" />
                     <span>Favorites</span>
                  </div>
                  <div className="pl-4 space-y-1">
                      <div className="flex items-center gap-2 hover:bg-[#e5f3fb] px-1 py-0.5 rounded cursor-pointer transition-colors border border-transparent hover:border-[#bce8f7]">
                         <div className="w-3 flex justify-center"><Monitor size={12} className="text-blue-500" /></div>
                         <span>Desktop</span>
                      </div>
                      <div className="flex items-center gap-2 hover:bg-[#e5f3fb] px-1 py-0.5 rounded cursor-pointer transition-colors border border-transparent hover:border-[#bce8f7]">
                         <div className="w-3 flex justify-center"><Download size={12} className="text-blue-500" /></div>
                         <span>Downloads</span>
                      </div>
                  </div>
              </div>

               <div>
                  <div className="flex items-center gap-1 font-semibold text-slate-500 mb-1 hover:bg-[#e5f3fb] px-1 py-0.5 rounded cursor-pointer transition-colors">
                     <ChevronDown size={10} className="text-slate-400" />
                     <Monitor size={12} />
                     <span>Computer</span>
                  </div>
                  <div className="pl-4 space-y-1">
                      <div className="flex items-center gap-1 hover:bg-[#e5f3fb] px-1 py-0.5 rounded cursor-pointer transition-colors border border-transparent hover:border-[#bce8f7]">
                         <ChevronDown size={10} className="text-slate-400" />
                         <HardDrive size={12} className="text-slate-600" />
                         <span>Local Disk (C:)</span>
                      </div>
                      <div className="pl-6 flex items-center gap-2 bg-[#e5f3fb] border border-[#bce8f7] px-1 py-0.5 rounded cursor-pointer transition-colors">
                          <Folder size={12} className="text-yellow-500 fill-yellow-500" />
                          <span>GitHub_Repos</span>
                      </div>
                  </div>
              </div>
           </div>
        </div>

        {/* Main Grid View */}
        <div className="flex-1 bg-white p-4 overflow-y-auto" onClick={() => setSelectedId(null)}>
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {filteredProjects.map((project) => (
                  <div 
                    key={project.id}
                    onClick={(e) => { e.stopPropagation(); setSelectedId(project.id); }}
                    onDoubleClick={(e) => { e.stopPropagation(); handleDoubleClick(project); }}
                    className={`
                        group flex flex-col items-center p-2 rounded-sm cursor-default text-center gap-1.5 transition-all duration-75 min-h-[100px] border
                        ${selectedId === project.id 
                            ? 'bg-[#cce8ff] border-[#99d1ff] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.3)]' 
                            : 'bg-transparent border-transparent hover:bg-[#e8f6fd] hover:border-[#bce8f7]'
                        }
                    `}
                    title={project.desc}
                  >
                     <div className="w-12 h-12 flex items-center justify-center relative">
                        <project.icon 
                            size={40} 
                            strokeWidth={1.5} 
                            className={`
                                drop-shadow-md z-10
                                ${project.colorClass}
                            `} 
                        />
                     </div>
                     <div className="flex flex-col items-center w-full">
                        <span className={`text-xs w-full break-words leading-tight px-1 line-clamp-2 ${selectedId === project.id ? 'text-slate-900' : 'text-slate-700'}`}>
                            {project.name}
                        </span>
                        <span className="text-[10px] text-slate-400 hidden group-hover:block mt-0.5 truncate w-full px-1">{project.category}</span>
                     </div>
                  </div>
              ))}
              {filteredProjects.length === 0 && (
                  <div className="col-span-full flex flex-col items-center justify-center text-slate-400 py-10">
                      <Search size={24} className="mb-2 opacity-50" />
                      <span>No items match your search.</span>
                  </div>
              )}
           </div>
        </div>
      </div>

      {/* Footer / Status Bar */}
      <div className="h-8 bg-[#f0f2f5] border-t border-[#d9d9d9] flex items-center px-4 gap-4 text-xs text-slate-600 shadow-[inset_0_1px_0_white] flex-shrink-0">
          <div className="flex items-center gap-2 border-r border-slate-300 pr-4 min-w-[80px]">
             <span className="text-slate-800 font-medium">{filteredProjects.length} items</span>
          </div>
          
          {selectedProject ? (
              <div className="flex items-center gap-4 animate-in fade-in duration-200 whitespace-nowrap overflow-hidden text-ellipsis">
                  <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                    <selectedProject.icon size={14} className={selectedProject.colorClass} />
                  </div>
                  <span className="font-semibold text-slate-800">{selectedProject.name}</span>
                  <span className="text-slate-500 border-l border-slate-300 pl-4 italic overflow-hidden text-ellipsis max-w-[400px]">{selectedProject.desc}</span>
              </div>
          ) : (
              <span className="text-slate-400 italic">Select an item to view details</span>
          )}
      </div>

      {/* Project Details Modal */}
      {modalProject && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[1px]" onClick={closeModal}>
          <div 
            className="w-[420px] bg-[#f0f0f0] border border-[#707070] rounded-lg shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
            style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.7)' }}
          >
            {/* Modal Title Bar */}
            <div className="h-8 bg-gradient-to-b from-white to-[#d6dbe9] border-b border-[#9caab8] flex items-center justify-between px-3 select-none">
               <span className="font-semibold text-xs text-slate-800 drop-shadow-sm flex items-center gap-2">
                 <div className="w-3.5 h-3.5 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-sm border border-yellow-600 shadow-sm"></div>
                 {modalProject.name} Properties
               </span>
               <button onClick={closeModal} className="hover:bg-[#e81123] hover:text-white hover:border-[#b00b1a] rounded-sm p-0.5 border border-transparent transition-all shadow-sm">
                  <X size={14} />
               </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 bg-white flex gap-5 min-h-[160px]">
                <div className="flex flex-col items-center pt-2 min-w-[64px]">
                    <modalProject.icon size={56} className={`${modalProject.colorClass} drop-shadow-md`} strokeWidth={1.5} />
                    <span className="text-[10px] text-slate-400 mt-2 font-semibold tracking-wide uppercase">{modalProject.category}</span>
                </div>
                <div className="flex-1 pt-1">
                    <h3 className="font-bold text-slate-800 text-base mb-1">{modalProject.name}</h3>
                    <div className="w-full h-px bg-slate-200 mb-3"></div>
                    <div className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Description:</div>
                    <p className="text-sm text-slate-700 mb-4 leading-relaxed bg-slate-50 p-2 rounded border border-slate-100 shadow-inner">
                        {modalProject.desc}
                    </p>
                    
                    {modalProject.url ? (
                        <div className="flex items-center gap-1.5 text-xs text-blue-600">
                           <Globe size={12} />
                           <span className="truncate max-w-[220px]">{modalProject.url}</span>
                        </div>
                    ) : (
                         <div className="flex items-center gap-1.5 text-xs text-slate-400 italic">
                           <ShieldAlert size={12} />
                           <span>Internal Project - No public link available</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-[#f0f0f0] p-3 border-t border-[#dfdfdf] flex justify-end gap-2">
                {modalProject.url && (
                    <button
                        onClick={openProjectUrl}
                        className="px-5 py-1.5 min-w-[80px] text-xs border border-[#3c7fb1] bg-gradient-to-b from-[#f2f2f2] to-[#cfcfcf] hover:from-[#e6e6e6] hover:to-[#b8b8b8] active:from-[#b8b8b8] active:to-[#cfcfcf] rounded-[2px] shadow-sm active:translate-y-[1px] font-medium transition-all"
                        style={{ boxShadow: 'inset 0 1px 0 white, 0 1px 2px rgba(0,0,0,0.1)' }}
                    >
                        Visit Project
                    </button>
                )}
                <button
                    onClick={closeModal}
                     className="px-5 py-1.5 min-w-[80px] text-xs border border-[#adadad] bg-gradient-to-b from-[#f2f2f2] to-[#cfcfcf] hover:from-[#e6e6e6] hover:to-[#b8b8b8] active:from-[#b8b8b8] active:to-[#cfcfcf] rounded-[2px] shadow-sm active:translate-y-[1px] transition-all"
                     style={{ boxShadow: 'inset 0 1px 0 white, 0 1px 2px rgba(0,0,0,0.1)' }}
                >
                    Close
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};