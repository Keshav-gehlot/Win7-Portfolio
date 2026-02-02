import React, { useState } from 'react';
import { User, ArrowRight } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = (e?: React.FormEvent) => {
    e?.preventDefault();
    setIsLoggingIn(true);
    // Simulate loading/authenticating delay typical of Windows
    setTimeout(() => {
        onLogin();
    }, 1200);
  };

  return (
    <div 
        className="fixed inset-0 z-[100] w-full h-full bg-cover bg-center font-[Segoe UI,sans-serif] flex flex-col items-center justify-center select-none"
        style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
            boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5)'
        }}
    > 
      {/* Background Overlay for tint */}
      <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-[2px]"></div>

      <div className="relative z-10 flex flex-col items-center">
         {/* User Picture Frame */}
         <div 
            className="w-48 h-48 mb-8 relative group cursor-pointer transition-transform active:scale-95" 
            onClick={() => !isLoggingIn && handleLogin()}
         >
             <div className="absolute inset-0 bg-gradient-to-br from-[#f0f0f0] to-[#c0c0c0] rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.5)] p-1.5 border border-[#808080]">
                <div className="w-full h-full bg-[#dcebfd] rounded border border-[#a0a0a0] flex items-center justify-center overflow-hidden shadow-inner relative">
                    <User size={110} className="text-[#566f8e] drop-shadow-sm" strokeWidth={1} />
                    {/* Gloss Shine on User Image */}
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent"></div>
                </div>
             </div>
         </div>

         {/* User Name */}
         <div className="text-white text-4xl font-normal mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-wide">
             Keshav
         </div>

         {/* Login Controls */}
         <div className="h-16 flex flex-col items-center justify-center">
            {isLoggingIn ? (
                <div className="flex items-center gap-3 animate-in fade-in duration-300">
                    <div className="w-6 h-6 border-[3px] border-t-transparent border-white rounded-full animate-spin shadow-md"></div>
                    <span className="text-white text-lg font-medium drop-shadow-md">Welcome</span>
                </div>
            ) : (
                <form onSubmit={handleLogin} className="flex gap-2 items-center animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <input 
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-3 py-1.5 rounded-[3px] border border-[#5d6c7a] bg-white/90 focus:bg-white outline-none w-56 text-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] placeholder-slate-500 text-slate-800"
                        autoFocus
                    />
                    <button 
                        type="submit"
                        className="bg-gradient-to-b from-[#4d90cd] to-[#255888] p-1.5 rounded-[3px] border border-[#1c4268] hover:brightness-110 shadow-[0_1px_3px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.3)] active:translate-y-[1px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!password && false} // Allow empty password for demo
                    >
                        <ArrowRight size={18} className="text-white drop-shadow-sm" />
                    </button>
                </form>
            )}
         </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-12 w-full text-center z-10">
          <div className="text-white/80 text-lg font-medium drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] flex items-center justify-center gap-2">
            <span className="text-2xl">Windows 7</span>
            <span className="text-sm self-end mb-1 opacity-90">Ultimate</span>
          </div>
      </div>
      
      {/* Power Button (Decorative) */}
      <div className="absolute bottom-8 right-8 z-10">
          <button className="bg-gradient-to-b from-[#d64545] to-[#a81616] p-2 rounded shadow-[0_1px_3px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] border border-[#800000] hover:brightness-110 active:translate-y-px">
            <div className="w-4 h-4 rounded-full border-2 border-white/80 border-t-transparent mx-auto relative top-px"></div>
            <div className="w-0.5 h-2.5 bg-white/80 absolute top-2.5 left-1/2 -translate-x-1/2"></div>
          </button>
      </div>
    </div>
  );
}