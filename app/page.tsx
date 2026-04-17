'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Plus, Sparkles, Shirt, Bookmark, User, Trash2, Camera, LogOut, LayoutGrid, X, Check } from 'lucide-react';

export default function DrippPlatform() {
  // --- APP STATE ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('generate'); 
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // --- DATA STATE ---
  const [closet, setCloset] = useState([
    { id: 1, category: 'Top', type: 'Baggy Tee', color: 'White', material: 'Cotton', aesthetic: 'Streetwear' },
    { id: 2, category: 'Bottom', type: 'Baggy Denim', color: 'Vintage Blue', material: 'Denim', aesthetic: 'Y2K' }
  ]);
  const [outfit, setOutfit] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  // --- FORM STATE ---
  const [newItem, setNewItem] = useState({ category: 'Top', type: '', color: '', material: '', aesthetic: 'Minimal' });

  // --- LOGIC ---
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const addItem = () => {
    if (!newItem.type) return;
    setCloset([...closet, { ...newItem, id: Date.now() }]);
    setNewItem({ category: 'Top', type: '', color: '', material: '', aesthetic: 'Minimal' });
    setShowAddModal(false);
  };

  const deleteItem = (id) => setCloset(closet.filter(item => item.id !== id));

  const generateOutfit = () => {
    setLoading(true);
    setTimeout(() => {
      // Logic picks from your actual closet categories
      const top = closet.find(i => i.category === 'Top')?.type || "White Tee";
      const bottom = closet.find(i => i.category === 'Bottom')?.type || "Cargo Pants";
      
      setOutfit({
        name: "Cloudy Day Streetwear",
        items: { top, bottom, shoes: "Retro Runners" },
        palette: "Muted Earth Tones"
      });
      setLoading(false);
    }, 1500);
  };

  // --- AUTH SCREEN ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-stone-100 w-full max-w-md text-center">
          <h1 className="text-5xl font-black italic tracking-tighter mb-2">DRIPP</h1>
          <p className="text-stone-400 uppercase tracking-widest text-[10px] font-bold mb-8">Elevate your closet</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="email" placeholder="Email" className="w-full p-4 rounded-2xl bg-stone-50 border-none ring-1 ring-stone-200 outline-none focus:ring-2 focus:ring-stone-900" required />
            <input type="password" placeholder="Password" className="w-full p-4 rounded-2xl bg-stone-50 border-none ring-1 ring-stone-200 outline-none focus:ring-2 focus:ring-stone-900" required />
            <button type="submit" className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold hover:bg-black transition-all">Enter Studio</button>
          </form>
        </div>
      </div>
    );
  }

  // --- MAIN APP ---
  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1C1C1C]">
      {/* Sidebar Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-stone-200 px-8 py-4 flex justify-around md:top-0 md:bottom-auto md:flex-col md:w-24 md:h-full md:border-r md:border-t-0 z-50">
        <div className="hidden md:flex flex-col items-center mb-12">
          <span className="font-black italic text-xl">D.</span>
        </div>
        <button onClick={() => setActiveTab('generate')} className={`p-3 rounded-2xl transition-all ${activeTab === 'generate' ? 'bg-stone-900 text-white shadow-lg' : 'text-stone-400 hover:bg-stone-100'}`}><Sparkles size={24} /></button>
        <button onClick={() => setActiveTab('closet')} className={`p-3 rounded-2xl transition-all ${activeTab === 'closet' ? 'bg-stone-900 text-white shadow-lg' : 'text-stone-400 hover:bg-stone-100'}`}><Shirt size={24} /></button>
        <button onClick={() => setActiveTab('wishlist')} className={`p-3 rounded-2xl transition-all ${activeTab === 'wishlist' ? 'bg-stone-900 text-white shadow-lg' : 'text-stone-400 hover:bg-stone-100'}`}><Bookmark size={24} /></button>
        <div className="md:mt-auto">
          <button onClick={() => setIsLoggedIn(false)} className="p-3 text-stone-300 hover:text-red-500 transition-all"><LogOut size={24} /></button>
        </div>
      </nav>

      {/* Content Container */}
      <main className="pb-24 md:pb-12 md:pl-32 pt-12 px-6 max-w-6xl mx-auto">
        
        {/* TAB 1: GENERATOR */}
        {activeTab === 'generate' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
            <header className="mb-12">
              <h2 className="text-4xl font-black tracking-tight mb-2">Morning, Stylist.</h2>
              <p className="text-stone-400 font-medium">Generate a fit from your digital archive.</p>
            </header>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm space-y-6">
                <h3 className="font-bold text-stone-900 flex items-center gap-2"><LayoutGrid size={18}/> Configuration</h3>
                <div className="space-y-4">
                  <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest">Aesthetic</label>
                  <select className="w-full p-4 rounded-xl bg-stone-50 border-none ring-1 ring-stone-200 focus:ring-2 focus:ring-stone-900">
                    <option>Streetwear</option><option>Y2K</option><option>Minimal</option><option>Clean Girl</option>
                  </select>
                  <button onClick={generateOutfit} disabled={loading} className="w-full py-5 bg-stone-900 text-white rounded-2xl font-bold text-lg hover:shadow-xl active:scale-95 transition-all">
                    {loading ? "Selecting threads..." : "Generate Outfit"}
                  </button>
                </div>
              </div>

              <div className="bg-stone-900 text-white p-10 rounded-[2rem] shadow-2xl flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10"><Sparkles size={120} /></div>
                {outfit ? (
                  <div className="relative z-10 animate-in zoom-in-95">
                    <span className="text-stone-500 uppercase tracking-tighter text-[10px] font-bold block mb-2 border-b border-white/10 pb-2">{outfit.palette}</span>
                    <h4 className="text-3xl font-bold mb-8">{outfit.name}</h4>
                    <div className="space-y-4 text-stone-300">
                      <p className="flex justify-between border-b border-white/5 pb-2"><span>Top</span> <span className="text-white font-bold">{outfit.items.top}</span></p>
                      <p className="flex justify-between border-b border-white/5 pb-2"><span>Bottom</span> <span className="text-white font-bold">{outfit.items.bottom}</span></p>
                      <p className="flex justify-between border-b border-white/5 pb-2"><span>Shoes</span> <span className="text-white font-bold">{outfit.items.shoes}</span></p>
                    </div>
                  </div>
                ) : (
                  <p className="text-stone-500 italic text-center">Choose your parameters to see the results.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CLOSET */}
        {activeTab === 'closet' && (
          <div className="animate-in fade-in duration-500">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-4xl font-black tracking-tight mb-2">Digital Closet</h2>
                <p className="text-stone-400 font-medium">{closet.length} items archived</p>
              </div>
              <button onClick={() => setShowAddModal(true)} className="bg-stone-900 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:shadow-lg transition-all"><Plus size={20}/> New Item</button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {closet.map(item => (
                <div key={item.id} className="bg-white p-4 rounded-[1.5rem] border border-stone-100 group hover:shadow-md transition-all relative">
                  <div className="aspect-[3/4] bg-stone-50 rounded-xl mb-4 flex items-center justify-center text-stone-200">
                    <Camera size={40} />
                  </div>
                  <h5 className="font-bold text-stone-800">{item.type}</h5>
                  <p className="text-stone-400 text-xs uppercase font-bold tracking-widest">{item.color}</p>
                  <button onClick={() => deleteItem(item.id)} className="absolute top-6 right-6 p-2 bg-white/80 rounded-full text-stone-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16}/></button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ADD MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 relative animate-in zoom-in-95">
            <button onClick={() => setShowAddModal(false)} className="absolute top-8 right-8 text-stone-300 hover:text-stone-900"><X size={24}/></button>
            <h3 className="text-2xl font-bold mb-8">Add to Archive</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <select className="p-4 rounded-xl bg-stone-50 border-none ring-1 ring-stone-200" value={newItem.category} onChange={(e) => setNewItem({...newItem, category: e.target.value})}><option>Top</option><option>Bottom</option><option>Shoes</option><option>Accessories</option></select>
                <input type="text" placeholder="Item Type (e.g. Baggy Tee)" className="p-4 rounded-xl bg-stone-50 border-none ring-1 ring-stone-200" value={newItem.type} onChange={(e) => setNewItem({...newItem, type: e.target.value})} />
              </div>
              <input type="text" placeholder="Color" className="w-full p-4 rounded-xl bg-stone-50 border-none ring-1 ring-stone-200" value={newItem.color} onChange={(e) => setNewItem({...newItem, color: e.target.value})} />
              <button onClick={addItem} className="w-full py-4 bg-stone-900 text-white rounded-xl font-bold mt-4">Save Item</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
