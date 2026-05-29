import React, { useState, useEffect } from 'react';
import { Volume2, Volume1, Volume, VolumeX } from 'lucide-react';
import { soundService } from '../../services/soundService';

export const VolumeWidget: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [volume, setVolume] = useState(() => {
     return 100;
  });
  const [speakerName, setSpeakerName] = useState("Speakers");

  useEffect(() => {
    const getDevices = async () => {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return;
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioOutputs = devices.filter(d => d.kind === 'audiooutput');
        if (audioOutputs.length > 0 && audioOutputs[0].label) {
           setSpeakerName(audioOutputs[0].label);
        } else {
           setSpeakerName("Speakers / Headphones");
        }
      } catch (err) {
        console.warn("Could not enumerate audio devices");
      }
    };
    if (isOpen) getDevices();
  }, [isOpen]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = parseInt(e.target.value, 10);
      setVolume(val);
      soundService.setVolume(val / 100);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div 
        className="absolute bottom-12 right-20 z-50 w-36 bg-[#f0f0f0] border border-slate-300 rounded shadow-lg overflow-hidden font-[Segoe UI,sans-serif]"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-3 pb-6 flex flex-col items-center bg-white border-b border-slate-200">
           <div className="text-[11px] text-slate-600 mb-4 font-semibold text-center w-full px-2 truncate leading-tight" title={speakerName}>{speakerName}</div>
           <div className="h-32 flex items-center justify-center relative w-12 mb-4 mx-auto">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={volume} 
                onChange={handleVolumeChange}
                className="absolute w-[120px] h-2 -rotate-90 accent-[#1c669e] cursor-pointer"
              />
           </div>
           
           <div className="mt-2 text-slate-800">
             {volume === 0 ? <VolumeX size={20} /> : volume < 33 ? <Volume size={20} /> : volume < 66 ? <Volume1 size={20} /> : <Volume2 size={20} />}
           </div>
        </div>
        <div className="p-1 px-2 bg-[#f5f6f7] text-[10px] sm:text-xs text-center text-slate-500">
            {volume}%
        </div>
      </div>
    </>
  );
};
