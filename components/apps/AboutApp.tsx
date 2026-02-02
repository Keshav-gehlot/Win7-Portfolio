import React, { useState, useRef, useEffect } from 'react';
import { 
  Clipboard, Bold, Italic, Underline, 
  AlignLeft, AlignCenter, AlignRight, List, Image as ImageIcon,
  Minus, Plus
} from 'lucide-react';

const DEFAULT_RESUME_HTML = `
<div class="mb-6 border-b-2 border-slate-800 pb-4">
    <h1 class="text-4xl font-bold text-[#2c3e50] mb-2 tracking-tight">Keshav Gehlot</h1>
    <div class="flex flex-wrap items-center gap-3 text-sm text-slate-600">
        <span class="font-medium">gehlotkeshav.kg@gmail.com</span>
        <span class="text-slate-300">|</span>
        <span>(91) 9829445825</span>
        <span class="text-slate-300">|</span>
        <span>Jodhpur, Rajasthan</span>
    </div>
    <div class="flex flex-wrap gap-4 text-sm text-[#1979ca] mt-2 font-semibold">
        <a href="https://linkedin.com/in/keshav-gehlot" contenteditable="false" target="_blank" rel="noreferrer" class="hover:underline flex items-center gap-1 cursor-pointer">linkedin.com/in/keshav-gehlot</a>
        <a href="https://github.com/keshavgehlot" contenteditable="false" target="_blank" rel="noreferrer" class="hover:underline flex items-center gap-1 cursor-pointer">github.com/keshavgehlot</a>
    </div>
</div>

<section class="mb-7">
    <h2 class="text-sm font-bold text-[#1f4e79] uppercase tracking-wider border-b border-slate-300 mb-3 pb-0.5">Professional Summary</h2>
    <p class="text-justify leading-relaxed text-slate-800">
        I am a Computer Science student specializing in Cybersecurity and currently pursuing my Certified Ethical Hacker (CEH) certification. My internships with DRDO and Palo Alto Networks have given me hands-on experience in cloud security, penetration testing, and automating security tools. As an Associate Lead for the Microsoft Learn Student Ambassadors, I enjoy leading technical workshops and building community. My projects focus on creating practical solutions for network monitoring, security assessments, and AI-based prediction. I am looking for a challenging role where I can apply my skills in building and securing software.
    </p>
</section>

<section class="mb-7">
    <h2 class="text-sm font-bold text-[#1f4e79] uppercase tracking-wider border-b border-slate-300 mb-4 pb-0.5">Education</h2>
    
    <div class="mb-3">
        <div class="flex justify-between items-baseline mb-0.5">
            <span class="font-bold text-base">M.Tech (Integrated) CSE</span>
            <span class="text-sm font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-700 border border-slate-200">7.55 CGPA</span>
        </div>
        <div class="flex justify-between text-slate-700 text-sm">
            <span class="italic">SRM Institute of Science and Technology</span>
        </div>
    </div>

    <div class="mb-3">
        <div class="flex justify-between items-baseline mb-0.5">
            <span class="font-bold text-base">Cambridge AS & A Levels</span>
            <span class="text-sm font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-700 border border-slate-200">61.5 %</span>
        </div>
        <div class="text-slate-700 italic text-sm">Lucky International School</div>
    </div>

    <div class="mb-1">
        <div class="flex justify-between items-baseline mb-0.5">
            <span class="font-bold text-base">Cambridge IGCSE</span>
            <span class="text-sm font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-700 border border-slate-200">75 %</span>
        </div>
        <div class="text-slate-700 italic text-sm">Lucky International School</div>
    </div>
</section>

<section class="mb-7">
    <h2 class="text-sm font-bold text-[#1f4e79] uppercase tracking-wider border-b border-slate-300 mb-4 pb-0.5">Work Experience</h2>

    <div class="mb-5">
        <div class="flex justify-between items-start">
            <div>
                <span class="font-bold text-[#2c3e50] text-base block">State Forensic Science Laboratory</span>
                <span class="italic text-slate-600 text-sm">Cybersecurity Intern</span>
            </div>
            <span class="text-sm text-slate-600 font-semibold whitespace-nowrap bg-slate-50 px-2 py-0.5 rounded">July 2025 – Present</span>
        </div>
        <ul class="list-disc ml-5 mt-2 space-y-1 text-[13.5px] text-slate-800">
            <li>Analyzing digital evidence involved in cybercrime investigations, focusing on mobile and disk forensics.</li>
            <li>Assisting senior experts in recovering deleted data and maintaining the chain of custody for legal proceedings.</li>
            <li>Generating detailed technical reports on findings for law enforcement agencies.</li>
        </ul>
    </div>

    <div class="mb-5">
        <div class="flex justify-between items-start">
            <div>
                <span class="font-bold text-[#2c3e50] text-base block">Defence Research and Development Organisation (DRDO)</span>
                <span class="italic text-slate-600 text-sm">Cybersecurity Intern</span>
            </div>
            <span class="text-sm text-slate-600 font-semibold whitespace-nowrap bg-slate-50 px-2 py-0.5 rounded">June 2025 – July 2025</span>
        </div>
        <ul class="list-disc ml-5 mt-2 space-y-1 text-[13.5px] text-slate-800">
            <li>Built and tested custom security tools to identify system vulnerabilities within a high-security government lab.</li>
            <li>Developed <b>"Kraken,"</b> a Python-based password cracker to analyze brute-force defenses and evaluate internal security protocols.</li>
            <li>Contributed to R&D projects focused on secure computing and defense-grade cybersecurity measures.</li>
        </ul>
    </div>

    <div class="mb-5">
        <div class="flex justify-between items-start">
             <div>
                <span class="font-bold text-[#2c3e50] text-base block">Palo Alto Networks</span>
                <span class="italic text-slate-600 text-sm">Virtual Cybersecurity Intern</span>
            </div>
            <span class="text-sm text-slate-600 font-semibold whitespace-nowrap bg-slate-50 px-2 py-0.5 rounded">April 2025 – June 2025</span>
        </div>
        <ul class="list-disc ml-5 mt-2 space-y-1 text-[13.5px] text-slate-800">
            <li>Completed an intensive virtual program focused on enterprise-level security.</li>
            <li>Built foundational skills in network security, threat analysis, and firewall configuration through hands-on modules based on real-world scenarios.</li>
        </ul>
    </div>

    <div class="mb-5">
        <div class="flex justify-between items-start">
            <div>
                <span class="font-bold text-[#2c3e50] text-base block">ShadowFox</span>
                <span class="italic text-slate-600 text-sm">Cybersecurity & UI/UX Design Intern</span>
            </div>
            <span class="text-sm text-slate-600 font-semibold whitespace-nowrap bg-slate-50 px-2 py-0.5 rounded">April 2025 – April 30, 2025</span>
        </div>
        <ul class="list-disc ml-5 mt-2 space-y-1 text-[13.5px] text-slate-800">
            <li>Tackled concurrent projects in both cybersecurity and UI/UX.</li>
            <li>Conducted malware analysis and web application penetration tests while designing a responsive website prototype in Figma.</li>
        </ul>
    </div>

    <div class="mb-1">
        <div class="flex justify-between items-start">
            <div>
                <span class="font-bold text-[#2c3e50] text-base block">MyCaptain</span>
                <span class="italic text-slate-600 text-sm">Campus Ambassador</span>
            </div>
            <span class="text-sm text-slate-600 font-semibold whitespace-nowrap bg-slate-50 px-2 py-0.5 rounded">June 2024 – October 2024</span>
        </div>
        <ul class="list-disc ml-5 mt-2 space-y-1 text-[13.5px] text-slate-800">
            <li>Drove campus-wide program growth by designing and running peer-to-peer marketing campaigns on WhatsApp, enrolling 40 new students.</li>
        </ul>
    </div>
</section>

<section class="mb-7">
    <h2 class="text-sm font-bold text-[#1f4e79] uppercase tracking-wider border-b border-slate-300 mb-4 pb-0.5">Projects</h2>
    
    <div class="grid grid-cols-1 gap-4">
        <div class="p-3 bg-slate-50 rounded border border-slate-100">
            <div class="font-bold text-[#2c3e50] text-sm mb-1">CropSenz (AI Crop Doctor)</div>
            <p class="text-[13px] text-slate-700">An AI-powered application to diagnose plant diseases from leaf images. Developed and trained a CNN to classify crop diseases, providing instant diagnostics.</p>
        </div>

        <div class="p-3 bg-slate-50 rounded border border-slate-100">
            <div class="font-bold text-[#2c3e50] text-sm mb-1">Net-Watch (Network Monitoring Tool)</div>
            <p class="text-[13px] text-slate-700">Real-time network monitor built in Python using Scapy. Identifies active devices and reports on bandwidth usage for threat detection.</p>
        </div>

        <div class="p-3 bg-slate-50 rounded border border-slate-100">
            <div class="font-bold text-[#2c3e50] text-sm mb-1">Kraken (Password Cracker)</div>
            <p class="text-[13px] text-slate-700">Multithreaded Python tool for automating security assessments against hashed passwords using dictionary and brute-force methods.</p>
        </div>

         <div class="p-3 bg-slate-50 rounded border border-slate-100">
            <div class="font-bold text-[#2c3e50] text-sm mb-1">AI Stock Predictor</div>
            <p class="text-[13px] text-slate-700">LSTM neural network model designed to forecast stock price movements based on historical time-series data.</p>
        </div>
    </div>
</section>

<section class="mb-7">
    <h2 class="text-sm font-bold text-[#1f4e79] uppercase tracking-wider border-b border-slate-300 mb-4 pb-0.5">Skills Summary</h2>
    <div class="grid grid-cols-1 gap-2 text-sm bg-slate-50 p-4 rounded border border-slate-100">
        <div class="flex gap-2"><span class="font-bold min-w-[100px]">Languages:</span> <span class="text-slate-700">Python, Java, C++, JavaScript, SQL</span></div>
        <div class="flex gap-2"><span class="font-bold min-w-[100px]">Frameworks:</span> <span class="text-slate-700">TensorFlow, Keras, scikit-learn, Pandas, Scapy</span></div>
        <div class="flex gap-2"><span class="font-bold min-w-[100px]">Cybersecurity:</span> <span class="text-slate-700">Network Traffic Analysis, Penetration Testing, Malware Analysis, Vulnerability Scanning</span></div>
        <div class="flex gap-2"><span class="font-bold min-w-[100px]">Cloud:</span> <span class="text-slate-700">GCP, AWS (Foundational)</span></div>
        <div class="flex gap-2"><span class="font-bold min-w-[100px]">Design:</span> <span class="text-slate-700">Figma, Photoshop, HTML, CSS</span></div>
        <div class="flex gap-2"><span class="font-bold min-w-[100px]">OS:</span> <span class="text-slate-700">Windows, Kali Linux</span></div>
    </div>
</section>

<section>
    <h2 class="text-sm font-bold text-[#1f4e79] uppercase tracking-wider border-b border-slate-300 mb-4 pb-0.5">Certifications & Awards</h2>
    <ul class="list-disc ml-5 space-y-1.5 text-[13.5px] text-slate-800">
        <li>Smart India Hackathon (SIH) 2025 Finalist (Institutional Round)</li>
        <li>Certified Ethical Hacker (CEH) - In Progress</li>
        <li>Google Cloud Engineering Certificate - In Progress</li>
        <li>Top 25 Finalist, OSSOME HACKS 2.0 Hackathon (March 2025)</li>
        <li>Complete Ethical Hacking Bootcamp (April 2025)</li>
        <li>Google Cloud Skill Badge: Implement Load Balancing</li>
    </ul>
</section>
`;

export const AboutApp: React.FC = () => {
  // Load initial state from localStorage or defaults
  const [zoom, setZoom] = useState(() => {
    const saved = localStorage.getItem('win7_about_zoom');
    return saved ? parseInt(saved, 10) : 100;
  });
  
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('win7_about_fontsize') || "3";
  });

  const [fontName, setFontName] = useState(() => {
    return localStorage.getItem('win7_about_fontname') || "Calibri";
  });

  const editorRef = useRef<HTMLDivElement>(null);
  const savedRange = useRef<Range | null>(null);

  // Initialize content content only once on mount to avoid cursor jumps
  useEffect(() => {
    if (editorRef.current) {
        const savedContent = localStorage.getItem('win7_about_content');
        editorRef.current.innerHTML = savedContent || DEFAULT_RESUME_HTML;
    }
  }, []);

  // Save state changes to localStorage
  useEffect(() => localStorage.setItem('win7_about_zoom', zoom.toString()), [zoom]);
  useEffect(() => localStorage.setItem('win7_about_fontsize', fontSize), [fontSize]);
  useEffect(() => localStorage.setItem('win7_about_fontname', fontName), [fontName]);

  const saveContent = () => {
    if (editorRef.current) {
        localStorage.setItem('win7_about_content', editorRef.current.innerHTML);
    }
  };

  const updateSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && editorRef.current?.contains(sel.anchorNode)) {
        savedRange.current = sel.getRangeAt(0);
    }
  };

  const restoreSelection = () => {
    const sel = window.getSelection();
    if (sel && savedRange.current) {
        sel.removeAllRanges();
        sel.addRange(savedRange.current);
    }
  };

  const formatDoc = (cmd: string, value?: string) => {
    restoreSelection();
    document.execCommand(cmd, false, value);
    editorRef.current?.focus();
    updateSelection();
    saveContent();
  };

  const handleZoom = (delta: number) => {
    setZoom(prev => Math.min(Math.max(prev + delta, 50), 200));
  };
  
  return (
    <div className="flex flex-col h-full w-full bg-[#f0f2f5] select-none text-slate-800">
      {/* Internal Styles to restore browser defaults for the editor since Tailwind resets them */}
      <style>{`
        .editor-content b, .editor-content strong { font-weight: bold; }
        .editor-content i, .editor-content em { font-style: italic; }
        .editor-content u { text-decoration: underline; }
        .editor-content ul { list-style-type: disc; margin-left: 1.5em; }
        .editor-content ol { list-style-type: decimal; margin-left: 1.5em; }
        .editor-content h1 { font-size: 2.25em; font-weight: bold; }
        .editor-content h2 { font-size: 1.5em; font-weight: bold; }
        .editor-content a { color: blue; text-decoration: underline; }
      `}</style>

      {/* WordPad Menu Bar */}
      <div className="flex items-center px-1 pt-1 bg-gradient-to-b from-white to-[#e6eaee] border-b border-[#bdc3c7]">
         <div className="flex items-center">
            {/* File Menu - Blue glossy style */}
            <div className="px-4 py-1.5 bg-gradient-to-b from-[#1979ca] to-[#0f62a8] text-white text-xs rounded-t-sm mx-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] border-t border-l border-r border-[#1979ca] cursor-pointer hover:from-[#2e8ddc] hover:to-[#126ab0] transition-all">
                File
            </div>
            {/* Home Tab - Active white style */}
            <div className="px-4 py-1.5 bg-white text-slate-800 text-xs rounded-t-sm mx-1 shadow-[0_-1px_3px_rgba(0,0,0,0.1)] border-t border-l border-r border-[#bdc3c7] z-10 -mb-[1px] relative top-[1px] font-medium cursor-default">
                Home
            </div>
            {/* View Tab - Inactive with hover glass effect */}
            <div className="px-4 py-1.5 text-slate-800 text-xs rounded-t-sm mx-1 border-t border-l border-r border-transparent cursor-pointer hover:bg-gradient-to-b hover:from-[#ffffff] hover:to-[#e5f0fa] hover:border-[#bdc3c7] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all">
                View
            </div>
         </div>
      </div>

      {/* WordPad Ribbon */}
      <div className="h-24 bg-[#f3f6fa] border-b border-[#d1d5db] flex items-stretch px-2 py-1 gap-2 shadow-[inset_0_1px_0_white] overflow-x-auto">
        {/* Clipboard Group */}
        <div className="flex flex-col items-center justify-between px-2 border-r border-[#d1d5db] pr-3">
             <div 
                className="flex flex-col items-center gap-1 cursor-pointer active:scale-95 transition-transform"
                onClick={() => {
                   navigator.clipboard.readText().then(text => {
                       formatDoc('insertText', text);
                       saveContent();
                   }).catch(() => alert('Please use Ctrl+V to paste'));
                }}
             >
                 <div className="bg-white border border-[#d1d5db] p-1 rounded shadow-sm hover:bg-blue-50 hover:border-blue-200">
                    <Clipboard size={24} className="text-slate-600" />
                 </div>
                 <span className="text-[10px] text-slate-600">Paste</span>
             </div>
             <span className="text-[10px] text-slate-500 text-center mt-auto mb-1">Clipboard</span>
        </div>

        {/* Font Group */}
        <div className="flex flex-col px-2 border-r border-[#d1d5db] pr-3 gap-1">
             <div className="flex items-center gap-2 mt-1">
                 <select 
                    onChange={(e) => {
                        setFontName(e.target.value);
                        formatDoc('fontName', e.target.value);
                    }}
                    value={fontName}
                    className="bg-white border border-[#d1d5db] h-6 text-xs w-32 px-1 text-slate-700 shadow-sm focus:outline-none focus:border-blue-300"
                 >
                     <option value="Calibri">Calibri</option>
                     <option value="Arial">Arial</option>
                     <option value="Times New Roman">Times New Roman</option>
                     <option value="Courier New">Courier New</option>
                     <option value="Segoe UI">Segoe UI</option>
                     <option value="Verdana">Verdana</option>
                 </select>
                 
                 {/* Font Size Dropdown */}
                 <select
                    value={fontSize}
                    onChange={(e) => {
                        setFontSize(e.target.value);
                        formatDoc('fontSize', e.target.value);
                    }}
                    className="bg-white border border-[#d1d5db] h-6 text-xs w-12 px-1 text-slate-700 shadow-sm focus:outline-none focus:border-blue-300"
                    title="Font Size"
                 >
                     <option value="1">8</option>
                     <option value="2">10</option>
                     <option value="3">12</option>
                     <option value="4">14</option>
                     <option value="5">18</option>
                     <option value="6">24</option>
                     <option value="7">36</option>
                 </select>
             </div>
             <div className="flex items-center gap-1 mt-1">
                 <button onMouseDown={(e) => e.preventDefault()} onClick={() => formatDoc('bold')} className="p-1 hover:bg-[#ffe8a6] hover:border hover:border-[#e5c365] border border-transparent rounded-sm cursor-pointer active:bg-[#ffbf00]">
                    <Bold size={14} className="text-slate-800" />
                 </button>
                 <button onMouseDown={(e) => e.preventDefault()} onClick={() => formatDoc('italic')} className="p-1 hover:bg-[#ffe8a6] hover:border hover:border-[#e5c365] border border-transparent rounded-sm cursor-pointer active:bg-[#ffbf00]">
                    <Italic size={14} className="text-slate-800" />
                 </button>
                 <button onMouseDown={(e) => e.preventDefault()} onClick={() => formatDoc('underline')} className="p-1 hover:bg-[#ffe8a6] hover:border hover:border-[#e5c365] border border-transparent rounded-sm cursor-pointer active:bg-[#ffbf00]">
                    <Underline size={14} className="text-slate-800" />
                 </button>
             </div>
             <span className="text-[10px] text-slate-500 text-center mt-auto mb-1">Font</span>
        </div>

         {/* Paragraph Group */}
         <div className="flex flex-col px-2 border-r border-[#d1d5db] pr-3 gap-1">
             <div className="flex items-center gap-1 mt-1">
                  <button onMouseDown={(e) => e.preventDefault()} onClick={() => formatDoc('insertUnorderedList')} className="p-1 hover:bg-[#ffe8a6] hover:border hover:border-[#e5c365] border border-transparent rounded-sm cursor-pointer active:bg-[#ffbf00]">
                    <List size={14} className="text-slate-700" />
                  </button>
                  <div className="h-4 w-px bg-slate-300 mx-1"></div>
                  <button onMouseDown={(e) => e.preventDefault()} onClick={() => formatDoc('justifyLeft')} className="text-slate-700 p-0.5 hover:bg-[#ffe8a6] rounded-sm active:bg-[#ffbf00]">
                     <AlignLeft size={14} />
                  </button>
                  <button onMouseDown={(e) => e.preventDefault()} onClick={() => formatDoc('justifyCenter')} className="text-slate-700 p-0.5 hover:bg-[#ffe8a6] rounded-sm active:bg-[#ffbf00]">
                     <AlignCenter size={14} />
                  </button>
                  <button onMouseDown={(e) => e.preventDefault()} onClick={() => formatDoc('justifyRight')} className="text-slate-700 p-0.5 hover:bg-[#ffe8a6] rounded-sm active:bg-[#ffbf00]">
                     <AlignRight size={14} />
                  </button>
             </div>
             <span className="text-[10px] text-slate-500 text-center mt-auto mb-1">Paragraph</span>
        </div>
        
        {/* Insert Group */}
        <div className="flex flex-col items-center px-2 pr-3">
             <div 
                className="flex flex-col items-center gap-1 cursor-pointer hover:bg-[#eef3fa] p-1 rounded-sm mt-1 active:scale-95"
                onClick={() => alert('Image insertion not supported in demo mode.')}
             >
                 <div className="p-1">
                    <ImageIcon size={24} className="text-slate-600" />
                 </div>
                 <span className="text-[10px] text-slate-600">Picture</span>
             </div>
             <span className="text-[10px] text-slate-500 text-center mt-auto mb-1">Insert</span>
        </div>
      </div>

      {/* Ruler */}
      <div className="h-6 bg-[#f0f2f5] border-b border-[#9caab8] flex items-center px-8 relative overflow-hidden flex-shrink-0">
          <div className="h-full w-full bg-white border-x border-[#d1d5db] relative">
              {[...Array(40)].map((_, i) => (
                  <div key={i} className={`absolute bottom-0 w-px bg-slate-400 ${i % 5 === 0 ? 'h-2' : 'h-1'}`} style={{ left: `${(i+1) * 2.5}%` }}></div>
              ))}
              <div className="absolute -top-1 left-0 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-[#9098a3] drop-shadow-sm"></div>
              <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#9098a3] drop-shadow-sm"></div>
              <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#9098a3] drop-shadow-sm"></div>
          </div>
      </div>

      {/* Document Area */}
      <div className="flex-1 overflow-y-auto bg-[#c6d0da] p-8 cursor-text shadow-inner relative" onClick={() => editorRef.current?.focus()}>
         <div 
            className="editor-content mx-auto bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] text-slate-900 font-[Calibri,Arial,sans-serif] text-[11pt] leading-normal selection:bg-[#3399ff] selection:text-white outline-none"
            style={{
                width: '800px',
                minHeight: '1000px',
                padding: '48px',
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'top center',
                transition: 'transform 0.2s ease-out'
            }}
            contentEditable
            suppressContentEditableWarning
            onInput={saveContent}
            onKeyUp={updateSelection}
            onMouseUp={updateSelection}
            ref={editorRef}
         >
            {/* Content is managed via innerHTML in useEffect */}
         </div>
      </div>
      
      {/* WordPad Status Bar */}
      <div className="h-6 bg-[#f0f2f5] border-t border-[#d1d5db] flex items-center justify-end px-4 text-xs text-slate-500 select-none shadow-[inset_0_1px_0_white]">
          <div className="mr-6">Page 1 of 1</div>
          <div className="mr-6">Words: 642</div>
          <div className="flex items-center gap-2">
            <span>{zoom}%</span>
            <button onClick={() => handleZoom(-10)} className="hover:text-slate-800"><Minus size={10} /></button>
            <div className="w-20 h-1 bg-white border border-slate-300 rounded-full overflow-hidden relative">
                <div 
                    className="h-full bg-[#3399ff] absolute top-0 left-0" 
                    style={{ width: `${(zoom / 200) * 100}%` }}
                ></div>
            </div>
            <button onClick={() => handleZoom(10)} className="hover:text-slate-800"><Plus size={10} /></button>
          </div>
      </div>
    </div>
  );
};