import React, { useState } from 'react';
import { AlertTriangle, XCircle } from 'lucide-react';
import { soundService } from '../../services/soundService';

const FALLBACK_NOS = [
  "This feels like something Future Me would yell at Present Me for agreeing to.",
  "I'm currently booked for the next decade in pretending to be productive.",
  "Accepting that offer would cause a glitch in the Matrix.",
  "My future self wrote me a note: 'Please don't do this again.'",
  "I'd rather say no with honesty than yes with resentment.",
  "I have zero interest in doing that, but I support you doing it somewhere else.",
  "I’m going to have to go with a hard no on this one.",
  "My schedule is currently full of 'not doing that'."
];

export const NoApp: React.FC = () => {
  const [request, setRequest] = useState('');
  const [status, setStatus] = useState<'idle' | 'processing' | 'rejected'>('idle');
  const [rejectionReason, setRejectionReason] = useState('');
  const [progress, setProgress] = useState(0);

  const handleSubmit = async () => {
    if (!request.trim()) return;

    setStatus('processing');
    setProgress(0);

    // Simulate progress bar
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 10;
      });
    }, 100);

    try {
        // Attempt to fetch from No as a Service API
        // Using a controller to timeout if it takes too long
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1200);
        
        // We fetch the message. Note: the URL in prompt is specific, we'll try to use it or fallback
        // Since CORS might be an issue with some public APIs in browser, we prepare to catch.
        const res = await fetch('https://no-api.netlify.app/api/v1/no', { 
            signal: controller.signal,
            headers: { 'Accept': 'application/json' }
        });
        clearTimeout(timeoutId);
        
        let reason = "";
        if (res.ok) {
            const data = await res.json();
            // The API usually returns { "no": "..." } or similar structure
            reason = data.message || data.no || data.quote || FALLBACK_NOS[Math.floor(Math.random() * FALLBACK_NOS.length)];
        } else {
            throw new Error('API failed');
        }
        
        // Ensure we have a string
        setRejectionReason(String(reason));

    } catch (e) {
        setRejectionReason(FALLBACK_NOS[Math.floor(Math.random() * FALLBACK_NOS.length)]);
    }

    // Wait for the "processing" visual to finish (1.5s total)
    setTimeout(() => {
        clearInterval(interval);
        setProgress(100);
        
        setTimeout(() => {
            setStatus('rejected');
            soundService.play('error');
        }, 200); 
    }, 1500);
  };

  const handleReset = () => {
    setStatus('idle');
    setRequest('');
    setRejectionReason('');
    setProgress(0);
  };

  return (
    <div className="h-full w-full bg-[#f0f0f0] flex flex-col font-[Segoe UI,sans-serif] p-4 select-none text-slate-800">
       
       {/* Header Section */}
       <div className="flex items-start gap-4 mb-6">
          <div className="mt-1">
             <AlertTriangle size={32} className="text-yellow-500 drop-shadow-sm" />
          </div>
          <div className="flex-1">
             <h2 className="text-[#003399] text-base font-normal mb-1">Submit a request to the Administrator</h2>
             <p className="text-xs text-slate-600 leading-relaxed">
                Submit a request to the Administrator. High priority requests may be processed faster.
             </p>
          </div>
       </div>

       {/* Form Section */}
       <div className="flex-1 flex flex-col gap-2">
          <label className="text-xs text-slate-700 font-semibold">Reason for Request:</label>
          <textarea 
            className="w-full h-24 border border-[#8e98a1] p-2 text-sm focus:border-[#0066cc] outline-none resize-none font-sans shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] bg-white rounded-sm disabled:bg-slate-100 disabled:text-slate-500"
            placeholder="e.g. I need admin access to install a new theme..."
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            disabled={status !== 'idle'}
            autoFocus
          />
       </div>

       {/* Status / Output Section */}
       <div className="mt-4 mb-4 min-h-[80px] border border-[#d9d9d9] bg-white p-3 rounded-sm relative overflow-hidden">
          {status === 'idle' && (
              <div className="text-xs text-slate-400 italic text-center mt-4">
                  Ready to process request...
              </div>
          )}

          {status === 'processing' && (
              <div className="flex flex-col items-center justify-center h-full gap-2">
                  <div className="text-xs text-slate-600">Contacting System Administrator...</div>
                  <div className="w-full h-4 bg-[#e6e6e6] border border-[#bcbcbc] rounded-sm relative overflow-hidden p-[1px]">
                      <div 
                        className="h-full bg-gradient-to-b from-[#00d42a] to-[#00aa22] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] transition-all duration-100 ease-out"
                        style={{ width: `${progress}%` }}
                      ></div>
                      {/* Gloss effect on bar */}
                      <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/20"></div>
                  </div>
              </div>
          )}

          {status === 'rejected' && (
              <div className="flex items-start gap-3 animate-in zoom-in-95 duration-200">
                  <XCircle size={24} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-red-700">Request Denied</span>
                      <p className="text-sm text-slate-800 leading-snug">
                          {rejectionReason}
                      </p>
                  </div>
              </div>
          )}
       </div>

       {/* Footer Buttons */}
       <div className="flex justify-end gap-2 pt-3 border-t border-[#dfdfdf]">
          {status === 'idle' ? (
              <button 
                onClick={handleSubmit}
                disabled={!request.trim()}
                className="min-w-[80px] px-3 py-1 border border-[#3c7fb1] bg-gradient-to-b from-[#f2f2f2] to-[#cfcfcf] hover:from-[#e6e6e6] hover:to-[#b8b8b8] rounded-[2px] text-xs font-semibold text-slate-800 shadow-[inset_0_1px_0_white,0_1px_2px_rgba(0,0,0,0.1)] active:translate-y-px disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                 Submit Request
              </button>
          ) : status === 'rejected' ? (
              <button 
                onClick={handleReset}
                className="min-w-[80px] px-3 py-1 border border-[#adadad] bg-gradient-to-b from-[#f2f2f2] to-[#cfcfcf] hover:from-[#e6e6e6] hover:to-[#b8b8b8] rounded-[2px] text-xs font-semibold text-slate-800 shadow-[inset_0_1px_0_white,0_1px_2px_rgba(0,0,0,0.1)] active:translate-y-px transition-all"
              >
                 Close
              </button>
          ) : (
              <button 
                disabled
                className="min-w-[80px] px-3 py-1 border border-[#adadad] bg-slate-100 text-slate-400 rounded-[2px] text-xs font-semibold cursor-wait"
              >
                 Processing...
              </button>
          )}
       </div>
    </div>
  );
};