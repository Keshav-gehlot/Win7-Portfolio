import React, { useState } from 'react';
import { User, ArrowRight } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = (e?: React.FormEvent | React.MouseEvent) => {
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
            className="w-32 h-32 sm:w-48 sm:h-48 mb-6 sm:mb-8 relative group cursor-pointer transition-transform duration-300" 
            onClick={() => !isLoggingIn && handleLogin()}
         >
             <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-xl shadow-[0_15px_35px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] p-[3px] border border-white/20 transition-transform group-hover:scale-105 group-active:scale-95 duration-300">
                <div className="w-full h-full bg-gradient-to-br from-[#dcebfd] to-[#abc8e9] rounded-[9px] border px-1 border-white/30 flex items-center justify-center overflow-hidden shadow-inner relative">
                    <User className="text-[#6581a0] drop-shadow-md translate-y-2 opacity-90 w-24 h-24 sm:w-[130px] sm:h-[130px]" strokeWidth={1} />
                    {/* Gloss Shine on User Image */}
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/60 to-transparent pointer-events-none"></div>
                </div>
             </div>
         </div>

         {/* User Name */}
         <div className="text-white text-3xl sm:text-5xl font-light mb-6 drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)] tracking-wide font-[Segoe UI,sans-serif]">
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
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <button 
                        onClick={handleLogin}
                        className="bg-gradient-to-b from-[#4d90cd] to-[#255888] p-2 rounded-[3px] border border-[#1c4268] hover:brightness-110 shadow-[0_1px_3px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.3)] active:translate-y-[1px] active:shadow-none transition-all"
                        aria-label="Login"
                    >
                        <ArrowRight size={20} className="text-white drop-shadow-sm" />
                    </button>
                </div>
            )}
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