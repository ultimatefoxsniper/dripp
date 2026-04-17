'use client';

import React, { useState } from 'react';
import { Sparkles, Shirt, Plus, Camera, X, Zap } from 'lucide-react';

export default function DrippApp() {
  const [activeTab, setActiveTab] = useState('generate');
  const [loading, setLoading] = useState(false);
  const [outfit, setOutfit] = useState(null);

  // This is your "Offline AI" - 100% Free
  const styles = [
    { name: "Y2K Archive", top: "Boxy Graphic Zip-up", bottom: "Baggy Embroidered Denim", shoes: "Platform Sneakers", palette: "Silver & Navy" },
    { name: "Modern Minimal", top: "Heavyweight White Tee", bottom: "Black Pleated Trousers", shoes: "Leather Loafers", palette: "Monochrome" },
    { name: "Street Utility", top: "Cropped Work Jacket", bottom: "Double-Knee Cargoes", shoes: "Technical Boots", palette: "Earth Tones" },
    { name: "Night Out", top: "Vintage Band Tee", bottom: "Leather Flared Pants", shoes: "Distressed Sneakers", palette: "Black & Red" }
  ];

  const generateOutfit = () => {
    setLoading(true);
    // Simulate a quick "thinking" delay
    setTimeout(() => {
      const randomFit = styles[Math.floor(Math.random() * styles.length)];
      setOutfit(randomFit);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1A1A1A] font-sans">
      <header className="p-8 max-w-4xl mx-auto">
        <h1 className="text-6xl font-black italic tracking-tighter">DRIPP</h1>
        <p className="text-stone-400 font-medium">Style Archive v1.0</p>
      </header>

      <main className="max-w-4xl mx-auto p-8 pb-32">
        {activeTab === 'generate' && (
          <div className="space-y-8">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-stone-100">
              <div className="flex items-center gap-2 mb-6 text-orange-500">
                <Zap size={18} fill="currentColor"/>
                <span className="font-bold uppercase tracking-widest text-xs">Instant Mode</span>
              </div>
              <h2 className="text-3xl font-bold mb-8">Ready to elevate?</h2>
              <button 
                onClick={generateOutfit}
                disabled={loading}
                className="w-full py-6 bg-stone-900 text-white rounded-2xl font-black text-xl hover:scale-[1.01] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {loading ? "ARCHIVING..." : "GENERATE FIT"}
              </button>
            </div>

            {outfit && (
              <div className="bg-stone-900 text-white p-10 rounded-[2.5rem] shadow-2xl animate-in fade-in slide-in-from-bottom-4">
                <h3 className="text-stone-500 font-bold uppercase tracking-widest text-xs mb-4">Recommended Look</h3>
                <h4 className="text-4xl font-bold mb-8 italic">{outfit.name}</h4>
                <div className="grid grid-cols-2 gap-6 opacity-90">
                  <div>
                    <p className="text-stone-500 text-xs uppercase font-bold mb-1">Top</p>
                    <p className="font-medium">{outfit.top}</p>
                  </div>
                  <div>
                    <p className="text-stone-500 text-xs uppercase font-bold mb-1">Bottom</p>
                    <p className="font-medium">{outfit.bottom}</p>
                  </div>
                  <div>
                    <p className="text-stone-500 text-xs uppercase font-bold mb-1">Shoes</p>
                    <p className="font-medium">{outfit.shoes}</p>
                  </div>
                  <div>
                    <p className="text-stone-500 text-xs uppercase font-bold mb-1">Palette</p>
                    <p className="font-medium">{outfit.palette}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xl border border-stone-200 rounded-full px-8 py-4 flex gap-12 shadow-2xl z-50">
        <button onClick={() => setActiveTab('generate')} className={activeTab === 'generate' ? 'text-stone-900' : 'text-stone-300'}><Sparkles size={28}/></button>
        <button onClick={() => setActiveTab('closet')} className={activeTab === 'closet' ? 'text-stone-900' : 'text-stone-300'}><Shirt size={28}/></button>
      </nav>
    </div>
  );
}
