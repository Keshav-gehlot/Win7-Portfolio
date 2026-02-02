import React, { useState, useEffect } from 'react';
import { Image, Download, Loader2, AlertTriangle, Key } from 'lucide-react';
import { ImageResolution } from '../../types';
import { generateImage, checkApiKeySelection, promptApiKeySelection } from '../../services/geminiService';

export const GeminiImageApp: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [resolution, setResolution] = useState<ImageResolution>(ImageResolution.ONE_K);
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasKey, setHasKey] = useState<boolean>(false);

  useEffect(() => {
    checkApiKeySelection().then(setHasKey);
  }, []);

  const handleSelectKey = async () => {
    try {
      await promptApiKeySelection();
      // Assume success if no error thrown, recheck
      const selected = await checkApiKeySelection();
      setHasKey(selected);
    } catch (e) {
      console.error(e);
      setError("Failed to select API key. Please try again.");
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    if (!hasKey) {
        await handleSelectKey();
        if (!hasKey) return; // Still no key
    }

    setLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await generateImage(prompt, resolution);
      if (result) {
        setGeneratedImage(result);
      } else {
        setError("No image data returned. Please try a different prompt.");
      }
    } catch (err: any) {
        if (err.message && err.message.includes("Requested entity was not found")) {
             setHasKey(false);
             setError("API Key session expired or invalid. Please select key again.");
        } else {
             setError("Failed to generate image. " + (err.message || "Unknown error"));
        }
    } finally {
      setLoading(false);
    }
  };

  if (!hasKey) {
      return (
          <div className="h-full w-full flex flex-col items-center justify-center p-8 bg-slate-100 text-center">
              <div className="bg-white p-6 rounded-lg shadow border border-slate-200 max-w-sm">
                  <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Key size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">API Key Required</h3>
                  <p className="text-sm text-slate-600 mb-6">
                      To use the high-quality <b>Nano Banana Pro</b> model, you must connect your Google Cloud Project with a valid billing account.
                  </p>
                  <button 
                    onClick={handleSelectKey}
                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium shadow-sm transition-colors flex items-center justify-center gap-2"
                  >
                      Select API Key
                  </button>
                  <div className="mt-4 text-xs text-slate-500">
                      <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="underline hover:text-blue-600">
                          Read Billing Documentation
                      </a>
                  </div>
              </div>
          </div>
      )
  }

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="p-4 bg-white border-b border-slate-200">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Prompt
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to create..."
          className="w-full h-20 p-3 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none resize-none mb-4"
        />
        
        <div className="flex items-end justify-between gap-4">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Resolution
            </label>
            <div className="flex bg-slate-100 p-1 rounded border border-slate-200">
              {Object.values(ImageResolution).map((res) => (
                <button
                  key={res}
                  onClick={() => setResolution(res)}
                  className={`flex-1 text-xs py-1.5 rounded font-medium transition-all ${
                    resolution === res
                      ? 'bg-white text-blue-600 shadow-sm border border-slate-200'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {res}
                </button>
              ))}
            </div>
          </div>
          
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt}
            className={`px-6 py-2.5 rounded shadow-sm text-sm font-semibold text-white flex items-center gap-2 transition-all ${
              loading || !prompt
                ? 'bg-slate-300 cursor-not-allowed'
                : 'bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 border border-blue-700'
            }`}
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Image size={16} />}
            Generate
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto flex items-center justify-center bg-slate-100/50">
        {error ? (
          <div className="flex flex-col items-center text-red-500 max-w-xs text-center">
            <AlertTriangle size={32} className="mb-2" />
            <p className="text-sm">{error}</p>
          </div>
        ) : generatedImage ? (
          <div className="relative group max-w-full max-h-full shadow-lg rounded-lg overflow-hidden border border-slate-200">
            <img 
                src={generatedImage} 
                alt="Generated result" 
                className="max-w-full max-h-[400px] object-contain"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <a 
                    href={generatedImage} 
                    download={`gemini-${Date.now()}.png`}
                    className="p-3 bg-white/90 rounded-full text-slate-800 hover:bg-white transition-transform hover:scale-110"
                >
                    <Download size={24} />
                </a>
            </div>
          </div>
        ) : (
          <div className="text-center text-slate-400">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <Image size={32} className="opacity-50" />
            </div>
            <p className="text-sm">Enter a prompt to start creating.</p>
          </div>
        )}
      </div>
    </div>
  );
};
