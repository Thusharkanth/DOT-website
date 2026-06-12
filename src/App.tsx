import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, ArrowRight, CornerDownRight, Play, Pause, Send, Check, Sparkles, AlertCircle, HelpCircle, RefreshCw } from 'lucide-react';
import { PRODUCTS, TECH_SPECS } from './data';
import { Product, CartItem, TechSpec } from './types';
import SpecDetailsDrawer from './components/SpecDetailsDrawer';
import ProductCustomizer from './components/ProductCustomizer';
import CartDrawer from './components/CartDrawer';
import SoftwareSim from './components/SoftwareSim';
import AboutView from './components/AboutView';

export default function App() {
  const [activeTab, setActiveTab] = useState<'hardware' | 'software' | 'about'>('hardware');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Customizer / Details States
  const [customizerProduct, setCustomizerProduct] = useState<Product | null>(null);
  const [activeSpec, setActiveSpec] = useState<TechSpec | null>(null);
  const [activeProductSpecs, setActiveProductSpecs] = useState<Product | null>(null);

  // Parallax state for main hero image
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  // Newsletter simulator state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStep, setNewsletterStep] = useState<'idle' | 'loading' | 'completed'>('idle');
  const [systemId, setSystemId] = useState('');

  // Audio player on Headphone (A) card state
  const [isHeadphoneAPlaying, setIsHeadphoneAPlaying] = useState(false);
  const [headphoneAEqLevel, setHeadphoneAEqLevel] = useState<number[]>([30, 45, 20, 60, 25]);

  // Handle Parallax shift
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const moveX = (clientX - window.innerWidth / 2) * 0.015;
    const moveY = (clientY - window.innerHeight / 2) * 0.015;
    setParallaxOffset({ x: moveX, y: moveY });
  };

  const handleMouseLeave = () => {
    setParallaxOffset({ x: 0, y: 0 });
  };

  // Sound bars animation on Headphone (A)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHeadphoneAPlaying) {
      interval = setInterval(() => {
        setHeadphoneAEqLevel(prev => prev.map(() => Math.floor(Math.random() * 80) + 10));
      }, 150);
    } else {
      setHeadphoneAEqLevel([15, 15, 15, 15, 15]);
    }
    return () => clearInterval(interval);
  }, [isHeadphoneAPlaying]);

  // Cart operations
  const handleAddToCart = (customization: {
    product: Product;
    quantity: number;
    color: string;
    engraving: string;
    eqPreset?: string;
  }) => {
    const uniqueId = `${customization.product.id}-${customization.color}-${customization.engraving || 'none'}-${customization.eqPreset || 'none'}`;
    
    setCart(prevCart => {
      const existingIdx = prevCart.findIndex(item => item.id === uniqueId);
      if (existingIdx > -1) {
        const nextCart = [...prevCart];
        nextCart[existingIdx].quantity += customization.quantity;
        return nextCart;
      } else {
        return [
          ...prevCart,
          {
            id: uniqueId,
            product: customization.product,
            quantity: customization.quantity,
            selectedColor: customization.color,
            engraving: customization.engraving,
            eqPreset: customization.eqPreset
          }
        ];
      }
    });

    // Automatically trigger cart slider to expose transaction queue allocation
    setTimeout(() => {
      setIsCartOpen(true);
    }, 100);
  };

  const handleUpdateQuantity = (id: string, amount: number) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id) {
          const nextQty = item.quantity + amount;
          return nextQty > 0 ? { ...item, quantity: nextQty } : item;
        }
        return item;
      });
    });
  };

  const handleRemoveItem = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Subscription pipeline simulation
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    setNewsletterStep('loading');
    
    setTimeout(() => {
      // Create bespoke system code
      const randHex = Math.floor(Math.random() * 65535).toString(16).toUpperCase().padStart(4, '0');
      setSystemId(`SYS_USR_${randHex}_LN`);
      setNewsletterStep('completed');
    }, 1800);
  };

  // Filter products when search typed
  const filteredProducts = PRODUCTS.filter(prod => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return prod.name.toLowerCase().includes(query) || 
           prod.tagline.toLowerCase().includes(query) ||
           prod.description.toLowerCase().includes(query);
  });

  return (
    <div className="min-h-screen bg-[#131313] text-[#e2e2e2] flex flex-col relative antialiased selection:bg-signal-red selection:text-white pb-0">
      <div className="noise-overlay pointer-events-none" />
      <div className="absolute inset-0 scanline pointer-events-none z-0" />

      {/* Floating Header Navbar */}
      <nav className="fixed top-0 w-full z-40 flex justify-between items-center px-6 md:px-16 h-20 bg-glass-dark/80 backdrop-blur-3xl border-b border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
        {/* Brand Logo */}
        <button 
          onClick={() => { setActiveTab('hardware'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="font-headline text-[32px] font-bold text-primary tracking-tight uppercase hover:text-signal-red transition-colors focus:outline-none"
        >
          DOT
        </button>

        {/* Tab Links */}
        <div className="hidden md:flex items-center gap-10">
          <button
            onClick={() => setActiveTab('hardware')}
            className={`font-mono text-xs uppercase tracking-widest pb-1 transition-all ${
              activeTab === 'hardware' 
                ? 'text-primary font-bold border-b-2 border-signal-red' 
                : 'text-metal-grey hover:text-primary'
            }`}
          >
            HARDWARE
          </button>
          <button
            onClick={() => setActiveTab('software')}
            className={`font-mono text-xs uppercase tracking-widest pb-1 transition-all ${
              activeTab === 'software' 
                ? 'text-primary font-bold border-b-2 border-signal-red' 
                : 'text-metal-grey hover:text-primary'
            }`}
          >
            SOFTWARE
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`font-mono text-xs uppercase tracking-widest pb-1 transition-all ${
              activeTab === 'about' 
                ? 'text-primary font-bold border-b-2 border-signal-red' 
                : 'text-metal-grey hover:text-primary'
            }`}
          >
            ABOUT
          </button>
        </div>

        {/* Action Widgets */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="relative hidden sm:block">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'hardware') setActiveTab('hardware');
              }}
              placeholder="SEARCH PRODUCTS..."
              className="bg-glass-white/5 border border-white/10 focus:border-white/30 text-[10px] font-mono text-primary placeholder:text-metal-grey py-2 px-4 focus:ring-1 focus:ring-white/10 w-44 uppercase rounded"
            />
            <Search size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-metal-grey pointer-events-none" />
          </div>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="text-primary hover:text-signal-red transition-colors flex items-center gap-2 relative bg-white/5 border border-white/10 py-2 px-4 rounded font-mono text-xs cursor-pointer"
          >
            <ShoppingCart size={14} />
            <span className="hidden sm:inline font-mono">CART</span>
            {cart.length > 0 && (
              <span className="bg-signal-red text-black font-bold font-mono text-[9px] px-1.5 py-0.5 rounded-full shrink-0">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Main Orchestrated Contents */}
      <main className="flex-grow pt-20 relative z-10">
        
        {/* TAB 1: HARDWARE (The core mock-reconstructed Landing page with deep interactivity) */}
        {activeTab === 'hardware' && (
          <div className="space-y-0" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            
            {/* Search query layout override details */}
            {searchQuery && (
              <div className="max-w-6xl mx-auto px-6 pt-12">
                <span className="text-[10px] font-mono text-signal-red uppercase">// DISPATCH QUERY ACTIVE</span>
                <h3 className="font-headline text-xl text-white uppercase mt-1">SEARCH RESULTS FOR: "{searchQuery}"</h3>
                <button onClick={() => setSearchQuery('')} className="text-xs text-metal-grey hover:text-white font-mono mt-1 underline">
                  RESET FILTER // SHOW ALL GEAR
                </button>
              </div>
            )}

            {/* Render normal Landing page when search is empty OR render filtered grid */}
            {!searchQuery ? (
              <>
                {/* HERO BLOCK: PHONE ( 3 ) */}
                <header className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-4 md:px-16 overflow-hidden">
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <h1 className="font-headline text-[70px] sm:text-[100px] md:text-[120px] font-bold text-white mb-10 tracking-tighter uppercase leading-none select-none">
                      DOT SYSTEMS.
                    </h1>
                    
                    {/* Floating Phone (3) detailed card with mouse parallax */}
                    <div className="glass-panel p-4 md:p-8 rounded-xl max-w-5xl w-full flex flex-col md:flex-row items-center gap-8 md:gap-12 group">
                      <div className="w-full md:w-1/2 overflow-hidden rounded-lg pedestal p-6 aspect-square flex items-center justify-center">
                        <img 
                          alt="Phone (3) White" 
                          src="https://lh3.googleusercontent.com/aida/AP1WRLslbbcswicFkTN1V3-MbCBURBRNS4m1F5bSKrIbujN638gCk1IjKDdUMmcYJeVF-jjy4c7UzRiurc8_6xD4udl1cm0DEM0ds6wOVGfg70DYqg8kKg984YOx4qd9jtPElkKON72pHdIADnGQWcQgNblIrg2XtHwNxiUxv4gXVtonHKdKFEvlZGGaiSSNqOvdDQns7vpZl2RAe2uE_JYNZKgCXb6TDFrsX9IjFTIshwOiUeN2Siju2jjjzUQ"
                          className="w-5/6 h-5/6 object-contain transition-transform duration-700 ease-out"
                          style={{
                            transform: `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px) scale(1.05)`
                          }}
                        />
                      </div>
                      
                      {/* Product Content Right Column */}
                      <div className="w-full md:w-1/2 text-left space-y-4 md:space-y-6 px-4">
                        <div className="flex items-center gap-4">
                          <span className="bg-signal-red text-black font-mono text-[9px] px-2.5 py-0.5 rounded-full font-bold">NEW</span>
                          <span className="text-[11px] font-mono text-metal-grey uppercase">SERIES-04 / 2024</span>
                        </div>
                        <h2 className="font-headline text-3xl md:text-5xl font-bold uppercase text-white tracking-tight">PHONE ( 3 )</h2>
                        <p className="font-sans text-base md:text-lg text-on-surface-variant max-w-md leading-relaxed">
                          Take your best photos with four 50 MP cameras. Engineering for humans, by machines. Custom transparent backing exposing physical circuit components.
                        </p>
                        
                        <div className="flex flex-wrap gap-4 pt-4 md:pt-6">
                          <button 
                            onClick={() => setCustomizerProduct(PRODUCTS.find(p => p.id === 'phone-3') || null)}
                            className="tactile-button bg-signal-red text-black font-mono text-xs px-10 py-4 hover:brightness-115 transition-all uppercase font-bold cursor-pointer"
                          >
                            Discover
                          </button>
                          <button 
                            onClick={() => setActiveProductSpecs(PRODUCTS.find(p => p.id === 'phone-3') || null)}
                            className="tactile-button bg-glass-white text-primary border border-white/10 font-mono text-xs px-8 py-4 hover:bg-glass-white/20 transition-all uppercase font-bold cursor-pointer"
                          >
                            Technical Specs
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </header>

                {/* PRODUCT BENTO GRID: COLLECTION_01 */}
                <section className="py-24 px-4 md:px-16 bg-[#0e0e0e]" id="featured-gear">
                  <div className="max-w-[1440px] mx-auto">
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 md:mb-16 gap-4">
                      <div>
                        <span className="text-signal-red font-mono text-xs font-bold block mb-2">// COLLECTION_01</span>
                        <h2 className="font-headline text-3xl md:text-5xl font-bold uppercase tracking-tight text-white">FEATURED GEAR</h2>
                      </div>
                      <a 
                        href="#all-products" 
                        onClick={(e) => { e.preventDefault(); setSearchQuery(' '); }}
                        className="text-on-surface-variant hover:text-primary font-mono text-xs uppercase flex items-center gap-2 group transition-all"
                      >
                        VIEW ALL <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                      
                      {/* BENTO 1: HEADPHONE ( 1 ) Large Card */}
                      <div className="md:col-span-8 glass-panel p-8 md:p-12 rounded-xl group relative overflow-hidden h-[500px] md:h-[600px] flex flex-col justify-end">
                        <div className="absolute top-0 right-0 p-6 md:p-8">
                          <span className="text-metal-grey font-mono text-[10px]">REF_ID: HP_A1</span>
                        </div>
                        
                        {/* Interactive floating image */}
                        <img 
                          alt="Headphone (1)" 
                          src="https://lh3.googleusercontent.com/aida/AP1WRLtvt8opIhKHTSdLwfC53U-g8p8rbatFLWhjP12kUWxPZvAgabcnCTU_qDgfxOzI2VK4e8fgGEZfyVG3RuuKixGKeBl5l6gUc-cyLeRmxMaQaujBwje0zeY0QzQBtaT7uIQ-GWRpfaHtMa3Nm7FMkDLCm8q5T3DdRShQlqN4cCPhtJsdSAX1rfDKYG-CHPV6czGSSZXZeBtIgzdQZ6bawl54aROs_9QTFrFZCN27hWteNxXtZIHEXqjxrEk"
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3 w-3/4 max-w-[320px] md:max-w-[420px] object-contain transition-transform duration-700 ease-out group-hover:scale-108 group-hover:rotate-1"
                        />
                        
                        <div className="relative z-10">
                          <h3 className="font-headline text-2xl md:text-4xl font-bold uppercase text-white mb-2">HEADPHONE ( 1 )</h3>
                          <p className="font-sans text-sm text-on-surface-variant max-w-sm mb-6 leading-relaxed">
                            Custom sound with tuning by KEF. Spatial audio calibrated for architectural listening. Dual-resonant physical chambers.
                          </p>
                          <button 
                            onClick={() => setCustomizerProduct(PRODUCTS.find(p => p.id === 'headphone-1') || null)}
                            className="tactile-button bg-white text-black font-mono text-xs px-10 py-3 uppercase font-bold hover:bg-neutral-200 cursor-pointer"
                          >
                            Configure
                          </button>
                        </div>
                      </div>

                      {/* BENTO 2: PHONE ( 4A ) Tall Card */}
                      <div className="md:col-span-4 glass-panel p-8 rounded-xl group flex flex-col items-center justify-center text-center">
                        <img 
                          alt="Phone 4a White" 
                          src="https://lh3.googleusercontent.com/aida/AP1WRLvNnWsT4AHnK1OZeCuFGAzDdc2Lh6avXLYL_y9DHt1cefATTlhtEb6rKtTWegbS1VJQiEq4Ot97I4xQNSnTNJwF8N4nEJPP4Rn0LaEvn8yEltoMMOk7SwPWTVQ7ku_OLLeqcrv7njOPoY4VjcHm5oL2Vp4RuY_65QyJU3pKzIKhwZTBovZ5UF36NcGglN4bfbmb3erHJQNeXTRYgS06zIkN8PzTvZEAm0UCwprzsOmKmmnFfAgw13T3UQo"
                          className="w-full max-w-[180px] md:max-w-[220px] object-contain mb-8 transition-transform duration-700 group-hover:rotate-6 group-hover:scale-105"
                        />
                        <h3 className="font-headline text-xl md:text-2xl font-bold uppercase text-white mb-1">PHONE ( 4A )</h3>
                        <p className="text-metal-grey font-mono text-[10px] uppercase tracking-wider mb-6">ESSENTIAL NOTIFICATIONS</p>
                        
                        <button 
                          onClick={() => {
                            setActiveTab('software');
                            // Let it automatically scroll to visual simulator
                            const el = document.getElementById('software-simulator');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="tactile-button border border-white/20 hover:border-white px-8 py-3 font-mono text-xs uppercase font-bold text-white hover:bg-white hover:text-black transition-all cursor-pointer"
                        >
                          Explore
                        </button>
                      </div>

                      {/* BENTO 3: EAR ( 3 ) Bottom Small card */}
                      <div className="md:col-span-4 glass-panel p-6 md:p-8 rounded-xl group flex items-center gap-4">
                        <div className="w-1/3 aspect-square pedestal p-2 rounded-lg shrink-0 flex items-center justify-center">
                          <img 
                            alt="Ear (3)" 
                            src="https://lh3.googleusercontent.com/aida/AP1WRLtqzLHl_wnhsYby2zE41_uTU9IOAt6zviwqHyzvbwEwnkJ3DZ0avOX-YjNoHTyaNcnMgfi_JjOEpo6pu6OwO-6Q4grAMa1wnW3zf0MiL305MzH85FqbVA5rpbTzyC3tl9dhVhpuD-KQmjrefatvc-epP3DjwxRwzCp3OJdUhz502CY-aY0Fp22vVK6KSKI_w3rnl6lP1ws05R6rxEMPEwejJYQ28L_1b9iDQxWjmtygPB41T7KsGR0l1p4o"
                            className="w-full h-full object-contain filter group-hover:brightness-110"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-headline text-lg md:text-xl font-bold text-white truncate">EAR ( 3 )</h4>
                          <p className="text-zinc-500 font-mono text-[9px] mb-3 uppercase tracking-wider">SUPER MIC TECHNOLOGY</p>
                          <button 
                            onClick={() => setActiveProductSpecs(PRODUCTS.find(p => p.id === 'ear-3') || null)}
                            className="text-signal-red font-mono text-[10px] uppercase font-bold tracking-wider hover:underline flex items-center gap-1 border border-signal-red/20 hover:border-signal-red/50 bg-signal-red/5 px-2.5 py-1 rounded"
                          >
                            Details
                          </button>
                        </div>
                      </div>

                      {/* BENTO 4: HEADPHONE ( A ) Bottom Medium Card with simulated player */}
                      <div className="md:col-span-8 glass-panel p-6 md:p-8 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6 group bg-gradient-to-r from-[#1b1b1b] to-[#252525] hover:border-zinc-700 transition-all">
                        <div className="space-y-3 max-w-sm text-left">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">// INTEGRATED SPEAKER PREVIEW</span>
                          <h4 className="font-headline text-xl md:text-2xl font-bold text-white uppercase">HEADPHONE ( A )</h4>
                          <p className="text-zinc-400 font-sans text-xs md:text-sm">
                            Five days of back-to-back tracks. High fidelity in lightweight form. Press below to trigger simulated acoustic test signal.
                          </p>
                          
                          {/* Tactile Mini-Player Controls */}
                          <div className="flex gap-4 items-center bg-black/40 p-2 border border-zinc-800 rounded-lg max-w-xs mt-3 select-none">
                            <button
                              onClick={() => setIsHeadphoneAPlaying(!isHeadphoneAPlaying)}
                              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                                isHeadphoneAPlaying ? 'bg-signal-red text-black' : 'bg-white/10 text-white hover:bg-white/20'
                              }`}
                            >
                              {isHeadphoneAPlaying ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" className="ml-0.5" />}
                            </button>
                            <div className="flex-grow">
                              <span className="text-[9px] font-mono text-zinc-400 uppercase block">
                                {isHeadphoneAPlaying ? 'DRIVING: PRO_TEST_TONE' : 'DRIVER STANDBY'}
                              </span>
                              
                              {/* Small simulated graphic EQ */}
                              <div className="flex gap-1 items-end h-4 mt-1">
                                {headphoneAEqLevel.map((lvl, i) => (
                                  <div 
                                    key={i} 
                                    style={{ height: `${lvl}%` }} 
                                    className={`w-1 rounded-t bg-signal-red transition-all duration-150`} 
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        <img 
                          alt="Headphone (a)" 
                          src="https://lh3.googleusercontent.com/aida/AP1WRLs6rNo6kcitYqRBSfkRt8XUHItE2XBIYLqdwnN5cdRhHJiypFiVFdXhn5w1nNkziyn8WtpbSstrAALLg8gHNlmqDxoMHNaGK1BuJKblwP4KgpFX33mdeknMdyXhuBbFIZDV9vWXNRAqQX13aNUR63Y9C-0bn_WPL9HIDkuAXl3ldpqY6plRwOWUkVsarE-ayhBQ31A-qGypAW5A-apxvPQB7QTyfeweLwVJvRGJYdsuu3h6cGd2cAoqp_Ix"
                          className="h-32 md:h-40 object-contain transition-transform duration-700 group-hover:-translate-x-4 group-hover:scale-105"
                        />
                      </div>

                    </div>
                  </div>
                </section>
              </>
            ) : (
              /* SEARCH GRID OVERRIDE */
              <section className="py-12 max-w-6xl mx-auto px-6" id="all-products">
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-20 bg-zinc-900/30 border border-white/5 rounded-xl">
                    <AlertCircle className="mx-auto mb-4 text-metal-grey" size={40} />
                    <p className="font-mono text-sm text-metal-grey uppercase tracking-wide">
                      NO SYSTEMS MATCH YOUR ACQUISITION PARAMS.
                    </p>
                    <button onClick={() => setSearchQuery('')} className="text-signal-red hover:underline font-mono text-xs uppercase mt-3">
                      RESET STAT_CHECK PROTOCOL
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(prod => (
                      <div key={prod.id} className="glass-panel p-6 rounded-xl flex flex-col justify-between align-middle bg-[#101010]/95 hover:border-zinc-600 transition-all">
                        <div className="pedestal p-6 h-48 rounded-lg flex items-center justify-center relative overflow-hidden">
                          <img src={prod.image} alt={prod.name} className="max-h-full max-w-full object-contain filter" />
                          <span className="absolute top-3 right-3 text-[9px] font-mono text-zinc-500 uppercase">{prod.refId || 'SYS_REF'}</span>
                        </div>
                        <div className="mt-4 flex-grow space-y-2">
                          <div className="flex justify-between items-center">
                            <h4 className="font-headline text-lg font-bold uppercase text-white">{prod.name}</h4>
                            <span className="font-mono text-xs text-signal-red">${prod.price}</span>
                          </div>
                          <p className="text-xs text-zinc-400 font-sans leading-relaxed">{prod.tagline}</p>
                        </div>
                        <div className="mt-6 grid grid-cols-2 gap-3 pb-2">
                          <button
                            onClick={() => setCustomizerProduct(prod)}
                            className="bg-signal-red text-black font-mono text-[10px] font-bold py-2.5 rounded hover:brightness-110 uppercase transition-all"
                          >
                            CUSTOMIZE
                          </button>
                          <button
                            onClick={() => setActiveProductSpecs(prod)}
                            className="bg-white/5 font-mono text-[10px] font-bold py-2.5 rounded text-white border border-white/10 hover:bg-white/10 uppercase transition-all"
                          >
                            SPECS
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* TECHNICAL SPECS / MARQUEE */}
            <section className="py-28 overflow-hidden bg-[#131313] border-t border-b border-white/5 select-none relative">
              <div className="flex whitespace-nowrap gap-12 opacity-10 font-bold select-none text-[80px] md:text-[140px] uppercase font-headline tracking-tighter leading-none pointer-events-none">
                <span>AESTHETICS // CLINICAL // PRECISE // DOT Systems // </span>
                <span className="text-signal-red font-bold">AESTHETICS // CLINICAL // Precise // </span>
              </div>

              <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mt-16 text-left">
                {TECH_SPECS.map(spec => (
                  <div 
                    key={spec.id} 
                    onClick={() => setActiveSpec(spec)}
                    className="space-y-4 group cursor-pointer p-4 rounded-lg bg-white/[0.01] hover:bg-white/[0.03] border border-transparent hover:border-white/5 transition-all"
                  >
                    <span className="font-mono text-xs text-signal-red font-bold block">{spec.code} // DETAILS</span>
                    <h4 className="font-headline text-2xl md:text-3xl font-bold border-b border-white/10 pb-3 uppercase text-white flex justify-between items-center">
                      {spec.title}
                      <ArrowRight size={16} className="-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all text-signal-red" />
                    </h4>
                    <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                      {spec.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* NEWSLETTER: JOIN THE SYSTEM */}
            <section className="py-24 px-4 md:px-8">
              <div className="max-w-4xl mx-auto glass-panel p-8 md:p-16 rounded-xl text-center relative overflow-hidden">
                <div className="relative z-10 space-y-6 md:space-y-8">
                  <h2 className="font-headline text-5xl md:text-7xl font-bold leading-none uppercase text-white tracking-tighter">
                    JOIN THE<br/>SYSTEM.
                  </h2>
                  <p className="font-sans text-base md:text-lg text-on-surface-variant max-w-lg mx-auto">
                    Subscribe for early access to product drops and technical briefings from our design studio.
                  </p>

                  <div className="max-w-xl mx-auto min-h-[90px]">
                    {newsletterStep === 'completed' ? (
                      /* Display visual access card */
                      <div className="bg-[#0c0c0c] border border-green-800 p-6 rounded-lg text-left font-mono text-xs space-y-3 relative overflow-hidden">
                        <div className="absolute right-4 top-4 text-green-500 animate-pulse text-[10px] font-mono">// ACCESS_OK</div>
                        <div className="flex items-center gap-3 border-b border-zinc-800 pb-3 mb-2">
                          <Check className="text-green-500 shrink-0" size={16} />
                          <div>
                            <span className="text-[10px] text-zinc-500 block uppercase">REGISTRATION PROTOCOL</span>
                            <span className="text-white font-bold block uppercase">{newsletterEmail}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-[10px] text-zinc-400">
                          <div>
                            <span className="block text-zinc-500 font-bold uppercase">IDENTIFIER_ID</span>
                            <span className="text-white font-bold">{systemId}</span>
                          </div>
                          <div>
                            <span className="block text-zinc-500 font-bold uppercase">CLASS_TYPE</span>
                            <span className="text-white font-bold">VIP // CORE_RECRUIT</span>
                          </div>
                        </div>
                      </div>
                    ) : newsletterStep === 'loading' ? (
                      /* Loading screen spinner */
                      <div className="flex flex-col items-center justify-center py-6 space-y-3 font-mono text-xs text-metal-grey animate-pulse">
                        <RefreshCw size={24} className="animate-spin text-signal-red" />
                        <span>SYNCHRONIZING SECURE NODE REGISTER... STANDBY</span>
                      </div>
                    ) : (
                      /* Subscription form input fields */
                      <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-4">
                        <input 
                          required
                          type="email" 
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          placeholder="EMAIL@DOT.TECH"
                          className="flex-grow bg-white/5 border-b-2 border-white/20 border-t-0 border-l-0 border-r-0 focus:border-signal-red focus:ring-0 font-mono text-xs tracking-wider text-primary py-4 px-6 uppercase focus:outline-none"
                        />
                        <button 
                          type="submit"
                          className="tactile-button bg-signal-red text-black font-mono text-xs px-10 py-4 uppercase font-bold tracking-widest cursor-pointer hover:brightness-110 active:scale-95"
                        >
                          Initialize
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: INTERACTIVE SOFTWARE SIMULATION */}
        {activeTab === 'software' && (
          <div className="animate-fade-in">
            <SoftwareSim />
          </div>
        )}

        {/* TAB 3: ABOUT PHILOSOPHY AND ARCHITECTURE */}
        {activeTab === 'about' && (
          <div className="animate-fade-in">
            <AboutView />
          </div>
        )}

      </main>

      {/* Primary Footer */}
      <footer className="w-full py-20 px-6 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 bg-[#0e0e0e] border-t border-white/5 relative z-10 self-end">
        <div className="md:col-span-4 space-y-6 text-left">
          <div className="font-headline text-3xl font-bold text-signal-red">DOT</div>
          <p className="font-mono text-metal-grey text-[10px] leading-relaxed max-w-xs uppercase">
            © 2026 DOT TECHNICAL SYSTEMS. ALL RIGHTS RESERVED.<br/>
            CONCEIVED IN LONDON. SHOREDITCH DESIGN LAB. ENGINEERED FOR HUMANITY.
          </p>
        </div>

        <div className="md:col-span-2 space-y-4 text-left">
          <h5 className="font-mono text-primary text-[10px] font-bold tracking-widest border-b border-white/5 pb-2 uppercase">// PRODUCTS</h5>
          <ul className="space-y-3 font-mono text-[11px] text-metal-grey">
            <li>
              <button onClick={() => { setActiveTab('hardware'); setSearchQuery('phone'); }} className="hover:text-signal-red uppercase transition-colors">
                PHONES
              </button>
            </li>
            <li>
              <button onClick={() => { setActiveTab('hardware'); setSearchQuery('audio'); }} className="hover:text-signal-red uppercase transition-colors">
                AUDIO
              </button>
            </li>
            <li>
              <button onClick={() => { setActiveTab('hardware'); setSearchQuery(' '); }} className="hover:text-signal-red uppercase transition-colors">
                ACCESSORIES
              </button>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2 space-y-4 text-left">
          <h5 className="font-mono text-primary text-[10px] font-bold tracking-widest border-b border-white/5 pb-2 uppercase">// COMPANY</h5>
          <ul className="space-y-3 font-mono text-[11px] text-metal-grey">
            <li>
              <button onClick={() => setActiveTab('about')} className="hover:text-signal-red uppercase transition-colors text-left">
                ABOUT MANIFESTO
              </button>
            </li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); alert("System hiring suspended - hardware queues active."); }} className="hover:text-signal-red uppercase transition-colors">
                CAREERS
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); alert("Direct diagnostics linked. Contact techsupport@dot.tech."); }} className="hover:text-signal-red uppercase transition-colors">
                SUPPORT DESK
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2 space-y-4 text-left">
          <h5 className="font-mono text-primary text-[10px] font-bold tracking-widest border-b border-white/5 pb-2 uppercase">// LEGAL RULES</h5>
          <ul className="space-y-3 font-mono text-[11px] text-metal-grey">
            <li>
              <span className="block uppercase cursor-help hover:text-white transition-colors" title="Privacy rules locked on RT-M2">
                PRIVACY POLICY
              </span>
            </li>
            <li>
              <span className="block uppercase cursor-help hover:text-white transition-colors" title="Terms strictly comply with hardware transit rules">
                TERMS OF DISPATCH
              </span>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2 space-y-4 text-left">
          <h5 className="font-mono text-primary text-[10px] font-bold tracking-widest border-b border-white/5 pb-2 uppercase">// SOCIAL CORES</h5>
          <div className="flex gap-4 items-center">
            <span className="text-zinc-500 font-mono text-[10px] uppercase">W_M25 / UK</span>
            <div className="w-1.5 h-1.5 bg-signal-red rounded-full animate-ping" />
          </div>
          <p className="text-[10px] font-mono text-metal-grey leading-tight uppercase">
            ACTIVE PORT: 3000 // ROUTED ONLINE BACKBONE
          </p>
        </div>
      </footer>

      {/* DRAWERS AND MODALS INJECTIONS */}

      {/* 1. Spec Detail Sheet Drawer */}
      <SpecDetailsDrawer 
        isOpen={activeSpec !== null || activeProductSpecs !== null}
        onClose={() => { setActiveSpec(null); setActiveProductSpecs(null); }}
        spec={activeSpec || undefined}
        product={activeProductSpecs || undefined}
      />

      {/* 2. Interactive Product Customizer Dialog */}
      {customizerProduct && (
        <ProductCustomizer 
          isOpen={true}
          product={customizerProduct}
          onClose={() => setCustomizerProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* 3. Shopping Cart Drawer slider */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
