import React, { useState } from 'react';
import { X, Check, ShoppingCart, Sliders, Hash, Compass, Cpu, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onAddToCart: (customizedItem: {
    product: Product;
    quantity: number;
    color: string;
    engraving: string;
    eqPreset?: string;
  }) => void;
}

const ACCENT_COLORS = [
  { id: 'bead-blasted-silver', name: 'Matte Aluminum', hex: '#d4d4d8', desc: 'Bead-blasted aerospace-grade 6000 series' },
  { id: 'anodized-charcoal', name: 'Charcoal Cyber', hex: '#27272a', desc: 'Chemical-passivated anodized dark chassis' },
  { id: 'signal-neon', name: 'Signal Crimson', hex: '#FF3100', desc: 'Limited edition high-vibrancy power accent' }
];

const BACK_GLASS_OPTIONS = [
  { id: 'crystalline', name: 'Ultra-Clear Acrylic', desc: '100% visible circuit topology and copper induction coils' },
  { id: 'frosted-diffuse', name: 'Frosted Silica', desc: 'Acid-etched translucent glass diffusing interior LED matrices' }
];

const AUDIO_PRESETS = [
  { id: 'kef-signature', name: 'KEF Labs Signature', desc: 'Calibrated polar response with neutral clinical precision' },
  { id: 'raw-studio', name: 'Studio Flat Matrix', desc: 'Zero EQ bias for pure monitoring of raw wave source' },
  { id: 'sub-harmonic', name: 'Sub-Harmonic Drive', desc: 'Enhanced 5Hz sub-bass pressure equalization curves' }
];

export default function ProductCustomizer({ isOpen, onClose, product, onAddToCart }: ProductCustomizerProps) {
  const [selectedColor, setSelectedColor] = useState(ACCENT_COLORS[0]);
  const [backGlass, setBackGlass] = useState(BACK_GLASS_OPTIONS[0]);
  const [eqPreset, setEqPreset] = useState(AUDIO_PRESETS[0]);
  const [engraving, setEngraving] = useState('');
  const [glyphPattern, setGlyphPattern] = useState('breathe');
  const [faderValue1, setFaderValue1] = useState(70);
  const [faderValue2, setFaderValue2] = useState(45);
  const [faderValue3, setFaderValue3] = useState(85);
  const [faderValue4, setFaderValue4] = useState(60);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const isAudioProduct = product.category === 'audio';

  const handleCreateAndAdd = () => {
    onAddToCart({
      product: {
        ...product,
        // Boost price slightly if exclusive premium color selected
        price: selectedColor.id === 'signal-neon' ? product.price + 75 : product.price
      },
      quantity: 1,
      color: selectedColor.name,
      engraving: engraving.trim() ? engraving.toUpperCase() : undefined,
      eqPreset: isAudioProduct ? eqPreset.name : undefined
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="customizer-modal">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-lg transition-opacity"
        onClick={onClose}
      />

      {/* Main Container */}
      <div className="relative w-full max-w-5xl h-[90vh] md:h-[80vh] bg-[#0d0d0d] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row z-10 text-white">
        
        {/* Left Side: Product Rendering & Live Customizer Preview */}
        <div className="w-full md:w-1/2 bg-gradient-to-b from-white/[0.05] to-transparent p-6 flex flex-col justify-between items-center relative border-b md:border-b-0 md:border-r border-white/10">
          
          {/* Floating Metadata */}
          <div className="w-full flex justify-between items-start">
            <div>
              <span className="text-signal-red font-mono text-[9px] tracking-widest uppercase block">// INITIALIZING DESPATCHER</span>
              <h4 className="font-headline text-lg font-bold tracking-tight text-white uppercase">{product.name}</h4>
              <p className="text-xs text-metal-grey font-mono">{product.series}</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-metal-grey font-mono uppercase block">// EST_RETAIL</span>
              <span className="text-2xl font-bold text-white font-mono">
                ${selectedColor.id === 'signal-neon' ? product.price + 75 : product.price}.00
              </span>
            </div>
          </div>

          {/* Core Interactive Product Hologram */}
          <div className="relative my-8 group flex items-center justify-center h-64 md:h-80 w-full">
            <div className="absolute inset-0 bg-radial-gradient from-white/[0.03] via-transparent to-transparent pointer-events-none rounded-full blur-2xl" />
            
            {/* Visual feedback of glass overlay */}
            <div className={`pedestal w-56 h-56 md:w-64 md:h-64 rounded-full flex items-center justify-center p-6 transition-all duration-500 scale-100`}>
              <img 
                src={product.image} 
                alt={product.name} 
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Simulated LEDs representing the selected Accent Color */}
            <div className="absolute bottom-4 flex gap-2 items-center justify-center bg-black/40 border border-white/5 backdrop-blur px-3 py-1.5 rounded-full">
              <div 
                className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                style={{ backgroundColor: selectedColor.id === 'signal-neon' ? '#FF3100' : selectedColor.id === 'anodized-charcoal' ? '#555' : '#ccc' }}
              />
              <span className="text-[10px] font-mono text-metal-grey uppercase tracking-wide">
                SYS: {selectedColor.name} // {backGlass.name.split(' ')[0]}
              </span>
            </div>

            {/* Engraving watermarked on screen */}
            {engraving.trim() && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none border border-white/20 bg-black/60 py-1 px-3 rounded text-[11px] font-mono text-signal-red uppercase tracking-widest max-w-[150px] truncate">
                {engraving}
              </div>
            )}
          </div>

          {/* Device Telemetry */}
          <div className="w-full grid grid-cols-2 gap-4 border-t border-white/5 pt-4 text-[10px] font-mono text-metal-grey">
            <div>
              <span className="text-white block">// MATERIAL_CHASSIS</span>
              {selectedColor.desc}
            </div>
            <div>
              <span className="text-white block">// TRANSLUCENCY_INDEX</span>
              {backGlass.desc}
            </div>
          </div>
        </div>

        {/* Right Side: Scrollable Customizer Control Elements */}
        <div className="w-full md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between h-[50vh] md:h-auto">
          
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <span className="font-mono text-xs text-signal-red uppercase font-semibold flex items-center gap-2">
                <Sliders size={12} />
                // CALIBRATION CONTROLS
              </span>
              <button 
                onClick={onClose}
                className="p-1.5 hover:bg-white/5 rounded-full transition-colors text-metal-grey hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* Option 1: Accent Frame color */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono text-metal-grey uppercase tracking-widest block font-bold">// FRAME ANODIZATION Accent</label>
              <div className="grid grid-cols-3 gap-2">
                {ACCENT_COLORS.map(color => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color)}
                    className={`p-3 text-left border rounded transition-all duration-200 relative overflow-hidden ${
                      selectedColor.id === color.id
                        ? 'border-signal-red bg-white/[0.04]'
                        : 'border-white/10 hover:border-white/30 bg-transparent'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <div className="w-3 h-3 rounded-full border border-white/15" style={{ backgroundColor: color.hex }} />
                      {selectedColor.id === color.id && <Check size={10} className="text-signal-red" />}
                    </div>
                    <span className="text-[11px] font-mono block text-white truncate font-medium">{color.name}</span>
                    <span className="text-[9px] font-mono block text-metal-grey">
                      {color.id === 'signal-neon' ? '+$75' : 'Stnd'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Option 2: Glass shell */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono text-metal-grey uppercase tracking-widest block font-bold">// CASING BACKGLASS TRANSMISSION</label>
              <div className="space-y-2">
                {BACK_GLASS_OPTIONS.map(option => (
                  <button
                    key={option.id}
                    onClick={() => setBackGlass(option)}
                    className={`w-full p-3 text-left border rounded flex items-center justify-between transition-all duration-200 ${
                      backGlass.id === option.id
                        ? 'border-signal-red bg-white/[0.03]'
                        : 'border-white/10 hover:border-white/20 bg-transparent'
                    }`}
                  >
                    <div className="pr-4">
                      <span className="text-xs font-headline text-white font-semibold block">{option.name}</span>
                      <span className="text-[10px] font-sans text-metal-grey leading-tight block">{option.desc}</span>
                    </div>
                    {backGlass.id === option.id && (
                      <div className="w-4 h-4 rounded-full border border-signal-red flex items-center justify-center shrink-0">
                        <div className="w-2 h-2 rounded-full bg-signal-red" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Option 3: Acoustic Tuning or Glyph Mode */}
            {isAudioProduct ? (
              <div className="space-y-3">
                <label className="text-[11px] font-mono text-metal-grey uppercase tracking-widest block font-bold">// ACOUSTIC PRESET MATRIX</label>
                <div className="space-y-2">
                  {AUDIO_PRESETS.map(preset => (
                    <button
                      key={preset.id}
                      onClick={() => setEqPreset(preset)}
                      className={`w-full p-3 text-left border rounded flex items-center justify-between transition-all duration-200 ${
                        eqPreset.id === preset.id
                          ? 'border-signal-red bg-white/[0.03]'
                          : 'border-white/10 hover:border-white/20 bg-transparent'
                      }`}
                    >
                      <div className="pr-4">
                        <span className="text-xs font-headline text-white font-semibold block">{preset.name}</span>
                        <span className="text-[10px] font-sans text-metal-grey ledger-tight block">{preset.desc}</span>
                      </div>
                      {eqPreset.id === preset.id && (
                        <div className="w-4 h-4 rounded-full border border-signal-red flex items-center justify-center shrink-0">
                          <div className="w-2 h-2 rounded-full bg-signal-red" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Simulated Sound Desk Faders */}
                <div className="bg-black/50 border border-white/5 p-4 rounded-lg space-y-4">
                  <span className="text-[9px] font-mono text-signal-red block mb-2">// ACTIVE CO-PROCESSOR ANALOG PREVIEW</span>
                  
                  <div className="grid grid-cols-4 gap-4 h-24 pt-2">
                    {/* Fader 1 */}
                    <div className="flex flex-col items-center justify-between">
                      <div className="h-16 w-1 hover:w-1.5 focus-within:w-1.5 bg-zinc-800 rounded relative">
                        <input 
                          type="range" min="0" max="100" 
                          value={faderValue1} 
                          onChange={(e) => setFaderValue1(Number(e.target.value))}
                          className="absolute inset-0 cursor-row-resize opacity-0 -rotate-90 origin-center"
                          style={{ width: '64px', left: '-30px', top: '16px' }}
                        />
                        <div 
                          className="absolute left-1/2 -translate-x-1/2 w-4 h-2 bg-white rounded border border-black cursor-row-resize transition-all"
                          style={{ bottom: `${faderValue1}%` }}
                        />
                      </div>
                      <span className="text-[8px] font-mono text-metal-grey uppercase mt-1">32Hz</span>
                    </div>

                    {/* Fader 2 */}
                    <div className="flex flex-col items-center justify-between">
                      <div className="h-16 w-1 hover:w-1.5 bg-zinc-800 rounded relative">
                        <input 
                          type="range" min="0" max="100" 
                          value={faderValue2} 
                          onChange={(e) => setFaderValue2(Number(e.target.value))}
                          className="absolute inset-0 cursor-row-resize opacity-0 -rotate-90 origin-center"
                          style={{ width: '64px', left: '-30px', top: '16px' }}
                        />
                        <div 
                          className="absolute left-1/2 -translate-x-1/2 w-4 h-2 bg-white rounded border border-black cursor-row-resize transition-all"
                          style={{ bottom: `${faderValue2}%` }}
                        />
                      </div>
                      <span className="text-[8px] font-mono text-metal-grey uppercase mt-1">250Hz</span>
                    </div>

                    {/* Fader 3 */}
                    <div className="flex flex-col items-center justify-between">
                      <div className="h-16 w-1 hover:w-1.5 bg-zinc-800 rounded relative">
                        <input 
                          type="range" min="0" max="100" 
                          value={faderValue3} 
                          onChange={(e) => setFaderValue3(Number(e.target.value))}
                          className="absolute inset-0 cursor-row-resize opacity-0 -rotate-90 origin-center"
                          style={{ width: '64px', left: '-30px', top: '16px' }}
                        />
                        <div 
                          className="absolute left-1/2 -translate-x-1/2 w-4 h-2 bg-white rounded border border-black cursor-row-resize transition-all"
                          style={{ bottom: `${faderValue3}%` }}
                        />
                      </div>
                      <span className="text-[8px] font-mono text-metal-grey uppercase mt-1">4kHz</span>
                    </div>

                    {/* Fader 4 */}
                    <div className="flex flex-col items-center justify-between">
                      <div className="h-16 w-1 bg-zinc-800 rounded relative">
                        <input 
                          type="range" min="0" max="100" 
                          value={faderValue4} 
                          onChange={(e) => setFaderValue4(Number(e.target.value))}
                          className="absolute inset-0 cursor-row-resize opacity-0 -rotate-90 origin-center"
                          style={{ width: '64px', left: '-30px', top: '16px' }}
                        />
                        <div 
                          className="absolute left-1/2 -translate-x-1/2 w-4 h-2 bg-white rounded border border-black cursor-row-resize' transition-all"
                          style={{ bottom: `${faderValue4}%` }}
                        />
                      </div>
                      <span className="text-[8px] font-mono text-metal-grey uppercase mt-1">16kHz</span>
                    </div>

                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <label className="text-[11px] font-mono text-metal-grey uppercase tracking-widest block font-bold">// GLYPH ILLUMINATION SEQUENCE</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'breathe', label: 'Breathe', desc: '4-second sine sweep' },
                    { id: 'static', label: 'Continuous', desc: '100% stable lumen' },
                    { id: 'pulse', label: 'Rhythm Sync', desc: 'Acoustic wave mapping' }
                  ].map(p => (
                    <button
                      key={p.id}
                      onClick={() => setGlyphPattern(p.id)}
                      className={`p-2.5 text-left border rounded transition-all duration-200 ${
                        glyphPattern === p.id
                          ? 'border-signal-red bg-white/[0.04]'
                          : 'border-white/10 hover:border-white/20 bg-transparent'
                      }`}
                    >
                      <span className="text-xs font-mono font-bold block text-white uppercase">{p.label}</span>
                      <span className="text-[9px] font-mono block text-metal-grey mt-1">{p.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Option 4: Custom Laser Engraving */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-mono text-metal-grey uppercase tracking-widest block font-bold">// CUSTOM IDENTIFIER ENGRAVING</label>
                <span className="text-[9px] font-mono text-metal-grey uppercase">{engraving.length}/18 CHARS</span>
              </div>
              <input
                type="text"
                maxLength={18}
                value={engraving}
                onChange={(e) => setEngraving(e.target.value.replace(/[^a-zA-Z0-9\s-//_]/g, ''))}
                placeholder="EMAIL@DOT.TECH or USER_NAME"
                className="w-full bg-white/5 border border-white/10 font-mono text-sm tracking-widest py-3 px-4 rounded text-white placeholder:text-zinc-600 focus:outline-none focus:border-signal-red focus:ring-1 focus:ring-signal-red uppercase"
              />
              <span className="text-[9px] font-mono text-metal-grey block">
                *Micro-melt high-frequency laser etched on aluminum bezel casing. Alphanumerics, spaces and dash only.
              </span>
            </div>
          </div>

          {/* Checkout block with beautiful micro-animation */}
          <div className="border-t border-white/10 pt-6 mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="text-left w-full sm:w-auto">
              <span className="text-[10px] font-mono text-metal-grey block uppercase">// CALIBRATION_READY</span>
              <span className="text-xs text-on-surface-variant max-w-sm block">
                Confirming builds parameters allocates real hardware assembly queues in real-time.
              </span>
            </div>

            <button
              onClick={handleCreateAndAdd}
              disabled={isSuccess}
              className={`w-full sm:w-auto tactile-button uppercase font-mono text-xs px-10 py-4 font-bold tracking-wider flex items-center justify-center gap-2 relative overflow-hidden shrink-0 ${
                isSuccess 
                  ? 'bg-green-600 text-white' 
                  : 'bg-signal-red text-black hover:brightness-110'
              }`}
            >
              {isSuccess ? (
                <>
                  <Check size={16} />
                  SYSTEM INITIALIZED
                </>
              ) : (
                <>
                  <ShoppingCart size={16} />
                  COMMIT ACCRETION
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
