import React, { useState } from 'react';
import { Mail, Linkedin, Github, Link as LinkIcon, Send, User, MessageSquare, AtSign, CheckCircle, Loader2 } from 'lucide-react';

export const ContactApp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Create the mailto link with encoded parameters
    const { name, subject, message } = formData;
    const body = `Name: ${name}\n\nMessage:\n${message}`;
    const mailtoLink = `mailto:gehlotkeshav.kg@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Small delay to show "Sending..." state before opening client
    setTimeout(() => {
        const link = document.createElement('a');
        link.href = mailtoLink;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setStatus('sent');
        setFormData({ name: '', subject: '', message: '' });

        // Reset back to idle after showing success
        setTimeout(() => setStatus('idle'), 5000);
    }, 1000);
  };

  const socialLinks = [
    { icon: Mail, label: 'gehlotkeshav.kg@gmail.com', href: 'mailto:gehlotkeshav.kg@gmail.com', color: 'text-blue-600' },
    { icon: Linkedin, label: 'linkedin.com/in/keshav-gehlot', href: 'https://linkedin.com/in/keshav-gehlot', color: 'text-[#0077b5]' },
    { icon: Github, label: 'github.com/keshavgehlot', href: 'https://github.com/keshavgehlot', color: 'text-slate-800' },
    { icon: LinkIcon, label: 'beacons.ai/keshavgehlot', href: 'https://beacons.ai/keshavgehlot', color: 'text-pink-600' },
  ];

  return (
    <div className="h-full w-full bg-[#f0f0f0] flex flex-col font-[Segoe UI,sans-serif] select-text relative">
      {/* Header gradient overlay for subtle 3D feel */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/50 to-transparent pointer-events-none"></div>

      <div className="flex flex-col md:flex-row h-full p-6 gap-6">
        
        {/* Left Section: Contact Details */}
        <div className="w-full md:w-5/12 flex flex-col gap-4 border-b md:border-b-0 md:border-r border-[#d9d9d9] pb-4 md:pb-0 md:pr-4">
          <div className="flex items-center gap-3 mb-2">
             <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center border border-blue-200 shadow-inner">
                <User size={24} className="text-[#1e395b]" />
             </div>
             <div>
                <h2 className="text-xl font-bold text-[#1e395b] tracking-tight">Contact Me</h2>
                <p className="text-xs text-slate-500">Let's connect and build something.</p>
             </div>
          </div>
          
          <div className="flex flex-col gap-1">
             <div className="text-sm font-bold text-[#1e395b] mb-2 border-b border-[#d9d9d9] pb-1">Social Profiles</div>
             <div className="flex flex-col gap-3 mt-1">
               {socialLinks.map((link, idx) => (
                 <a 
                   key={idx}
                   href={link.href}
                   target="_blank"
                   rel="noreferrer"
                   className="flex items-center gap-2 group p-1.5 -ml-1.5 rounded hover:bg-gradient-to-r hover:from-white/80 hover:to-transparent hover:shadow-sm transition-all border border-transparent hover:border-slate-200"
                 >
                   <link.icon size={18} className={`${link.color} drop-shadow-sm`} />
                   <span className="text-sm text-[#1e395b] group-hover:underline truncate">{link.label}</span>
                 </a>
               ))}
             </div>
          </div>

          <div className="mt-auto bg-[#ffffe1] border border-[#e2c779] p-3 text-xs text-[#555] rounded-sm shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
             <div className="font-bold flex items-center gap-1 mb-1 text-[#805b00]">
                <MessageSquare size={12} />
                <span>Note</span>
             </div>
             I am currently open to freelance projects and cybersecurity roles. Feel free to reach out!
          </div>
        </div>

        {/* Right Section: Form */}
        <div className="flex-1 flex flex-col relative">
          <h2 className="text-lg font-bold text-[#1e395b] mb-4">Send a Message</h2>
          
          {status === 'sent' ? (
              <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-white to-[#f0f0f0] border border-[#d9d9d9] rounded shadow-sm animate-in fade-in duration-300">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-3 border border-green-100 shadow-sm">
                      <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-[#1e395b] font-bold text-lg">Email Client Opened</h3>
                  <p className="text-slate-600 text-xs text-center px-8 mt-2">
                      Please check your email application to review and send the drafted message.
                  </p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="mt-6 px-4 py-1.5 bg-gradient-to-b from-[#fcfcfc] to-[#e6e6e6] hover:from-[#f0f9ff] hover:to-[#dceefb] border border-[#707070] hover:border-[#3c7fb1] rounded-[3px] text-slate-800 text-xs shadow-[inset_0_1px_0_rgba(255,255,255,1)] transition-all active:translate-y-px"
                  >
                      Write Another
                  </button>
              </div>
          ) : (
            <form onSubmit={handleSubmit} className={`flex flex-col gap-3 flex-1 transition-opacity duration-200 ${status === 'sending' ? 'opacity-60 pointer-events-none' : ''}`}>
               <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#1e395b] font-semibold" htmlFor="name">Your Name:</label>
                  <div className="relative group">
                      <div className="absolute left-0 top-0 bottom-0 w-8 bg-[#f1f1f1] border-r border-[#d9d9d9] rounded-l-[2px] flex items-center justify-center">
                        <User size={14} className="text-slate-400" />
                      </div>
                      <input 
                        id="name"
                        name="name"
                        type="text" 
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-2 py-1.5 text-sm border border-[#abadb3] shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] rounded-[2px] focus:border-[#3c7fb1] focus:shadow-[inset_0_0_0_1px_#3c7fb1] outline-none bg-white text-slate-800 transition-colors"
                        placeholder="John Doe"
                        disabled={status === 'sending'}
                      />
                  </div>
               </div>

               <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#1e395b] font-semibold" htmlFor="subject">Subject:</label>
                  <div className="relative group">
                      <div className="absolute left-0 top-0 bottom-0 w-8 bg-[#f1f1f1] border-r border-[#d9d9d9] rounded-l-[2px] flex items-center justify-center">
                        <AtSign size={14} className="text-slate-400" />
                      </div>
                      <input 
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full pl-10 pr-2 py-1.5 text-sm border border-[#abadb3] shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] rounded-[2px] focus:border-[#3c7fb1] focus:shadow-[inset_0_0_0_1px_#3c7fb1] outline-none bg-white text-slate-800 transition-colors"
                        placeholder="Project Inquiry"
                        disabled={status === 'sending'}
                      />
                  </div>
               </div>

               <div className="flex flex-col gap-1 flex-1 min-h-[100px]">
                  <label className="text-xs text-[#1e395b] font-semibold" htmlFor="message">Message:</label>
                  <textarea 
                     id="message"
                     name="message"
                     required
                     value={formData.message}
                     onChange={handleChange}
                     className="flex-1 w-full p-2 text-sm border border-[#abadb3] shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] rounded-[2px] focus:border-[#3c7fb1] focus:shadow-[inset_0_0_0_1px_#3c7fb1] outline-none resize-none bg-white font-sans text-slate-800 transition-colors"
                     placeholder="Type your message here..."
                     disabled={status === 'sending'}
                  />
               </div>

               <div className="flex justify-end pt-3 border-t border-[#d9d9d9] mt-1 relative">
                  {status === 'sending' && (
                     <div className="absolute left-0 top-4 flex items-center gap-2 text-xs text-blue-600">
                         <Loader2 size={14} className="animate-spin" />
                         <span className="font-semibold">Preparing email...</span>
                     </div>
                  )}
                  <button 
                    type="submit"
                    disabled={status === 'sending'}
                    className="px-6 py-1.5 flex items-center gap-2 bg-gradient-to-b from-[#fcfcfc] to-[#e6e6e6] hover:from-[#f0f9ff] hover:to-[#dceefb] border border-[#707070] hover:border-[#3c7fb1] rounded-[3px] shadow-[inset_0_1px_0_rgba(255,255,255,1),0_1px_2px_rgba(0,0,0,0.05)] text-sm text-slate-800 active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] active:translate-y-px transition-all font-sans disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                      <Send size={14} className={status === 'sending' ? 'opacity-50' : ''} />
                      <span>{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
                  </button>
               </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};