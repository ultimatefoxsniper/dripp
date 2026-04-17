'use client';

import React, { useState } from 'react';
import { Sparkles, Shirt, Bookmark, Plus, Trash2, Camera, X } from 'lucide-react';

export default function DrippApp() {
  const [activeTab, setActiveTab] = useState('generate');
  const [loading, setLoading] = useState(false);
  const [outfit, setOutfit] = useState(null);
  const [closet, setCloset] = useState([
    { id: 1, type: 'Baggy Tee', color: 'White', category: 'Top' },
    { id: 2, type: 'Cargo Pants', color: 'Black', category: 'Bottom' }
  ]);

  const generateOutfit = () => {
    setLoading(true);
    setTimeout(() => {
      setOutfit({
        name: "Streetwear Essential",
        top: "Oversized Graphic Hoodie",
        bottom: "Wide-Leg Denim",
        shoes: "Retro Sneakers",
        palette: "Cream & Indigo"
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1A1A1A] p-6">
      <header className="mb-12 max-w-4xl mx-auto">
        <h1 className="text-5xl font-black italic tracking-tighter">DRIPP</h1>
      </header>

      <main className="max-w-4xl mx-auto pb-24">
        {activeTab === 'generate' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
              <h2 className="text-xl font-bold mb-6">Today's Vibe</h2>
              <button 
                onClick={generateOutfit}
                disabled={loading}
                className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold hover:scale-[1.02] transition-transform disabled:opacity-50"
              >
                {loading ? "Styling..." : "Generate Outfit"}
              </button>
            </div>

            <div className="bg-stone-900 text-white p-8 rounded-3xl shadow-xl min-h-[250px] flex flex-col justify-center">
              {outfit ? (
                <div>
                  <h3 className="text-2xl font-bold mb-4">{outfit.name}</h3>
                  <div className="space-y-2 opacity-80 text-sm">
                    <p>Top: {outfit.top}</p>
                    <p>Bottom: {outfit.bottom}</p>
                    <p>Shoes: {outfit.shoes}</p>
                  </div>
                </div>
              ) : (
                <p className="text-stone-500 text-center italic text-sm">Tap generate to see a fit.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'closet' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Closet</h2>
              <button className="bg-stone-900 text-white p-2 rounded-full"><Plus size={20}/></button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {closet.map(item => (
                <div key={item.id} className="bg-white p-4 rounded-2xl border border-stone-100">
                  <div className="aspect-square bg-stone-50 rounded-xl mb-3 flex items-center justify-center text-stone-200"><Camera size={24}/></div>
                  <p className="font-bold text-sm">{item.type}</p>
                  <p className="text-xs text-stone-400">{item.color}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-lg border border-stone-200 rounded-full px-6 py-3 flex gap-8 shadow-2xl">
        <button onClick={() => setActiveTab('generate')} className={activeTab === 'generate' ? 'text-stone-900' : 'text-stone-300'}><Sparkles size={24}/></button>
        <button onClick={() => setActiveTab('closet')} className={activeTab === 'closet' ? 'text-stone-900' : 'text-stone-300'}><Shirt size={24}/></button>
      </nav>
    </div>
  );
}
