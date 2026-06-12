import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, CreditCard, ShieldCheck, HelpCircle } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, amount: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [checkoutLogs, setCheckoutLogs] = useState<string[]>([]);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  const startSimulatedCheckout = () => {
    setIsCheckingOut(true);
    setCheckoutStep(1);
    setCheckoutLogs(['// INITIALIZING SECURE TRANSACTIONS ENGINE']);

    const logs = [
      '// GENERATING ASYMMETRIC METRIC SIGNATURES ...',
      '// TRANSACTION SHA-256 KEY: SHA_78F3B9CCEA9011_E2_DOT',
      '// CONNECTING LONDON ASSEMBLY HUB ASSEMBLY_01_UK ... CONNECTED',
      '// ALLOCATING RAW SILICON MATRIX CHUTES ... OK',
      '// ENGRAVING WORKSTATIONS READY ... ACTIVE',
      '// GENERATING TAXONOMY CODES ... COMPLETE',
      '// ESTABLISHING CONTAINER LOGISTICS ... COURIER_AIR_04',
      '// PROTOCOL 303 COMMITTED.',
      '// SYSTEM DESPATCH AUTHORIZED. THE SYSTEM COMMENCES.'
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setCheckoutLogs(prev => [...prev, log]);
        if (index === logs.length - 1) {
          setCheckoutStep(2);
        }
      }, (index + 1) * 600);
    });
  };

  const handleReset = () => {
    onClearCart();
    setIsCheckingOut(false);
    setCheckoutStep(0);
    setCheckoutLogs([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md glass-panel text-white relative flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-signal-red rounded-full animate-pulse" />
              <h3 className="font-headline text-lg font-bold uppercase tracking-tight">SYSTEM CART REGISTER</h3>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 hover:bg-white/5 rounded-full transition-colors text-metal-grey hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Core body */}
          <div className="flex-grow p-6 overflow-y-auto space-y-6">
            {isCheckingOut ? (
              /* Simulated receipt / checkout console */
              <div className="space-y-6 h-full flex flex-col justify-between">
                <div>
                  <span className="text-signal-red font-mono text-[9px] tracking-widest block uppercase mb-2">// LOGISTICS TERMINAL ACTIVE</span>
                  <div className="w-full bg-black/90 p-4 border border-zinc-800 rounded font-mono text-[10px] space-y-2 h-[350px] overflow-y-auto scrollbar-none antialiased">
                    {checkoutLogs.map((log, i) => (
                      <p key={i} className={i === checkoutLogs.length - 1 ? "text-signal-red animate-pulse" : "text-zinc-300"}>
                        {log}
                      </p>
                    ))}
                  </div>
                </div>

                {checkoutStep === 2 ? (
                  <div className="space-y-4">
                    <div className="border border-green-800 bg-green-950/20 p-4 rounded-lg text-center space-y-2">
                      <span className="inline-block px-2 py-0.5 bg-green-800 text-white rounded text-[10px] font-mono mb-1 uppercase">TRANSMISSION OK</span>
                      <h4 className="font-headline text-sm font-bold uppercase tracking-tight">DISPATCH PROTOCOL INITIATED</h4>
                      <p className="text-xs text-zinc-400">
                        Thank you. Your bespoke hardware queue assignment has been committed. Check local logs.
                      </p>
                    </div>
                    <button
                      onClick={handleReset}
                      className="w-full bg-white text-black py-4 font-mono text-xs uppercase tracking-widest font-bold tactile-button text-center"
                    >
                      CLEAR STATION LOGS
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <span className="text-metal-grey font-mono text-xs animate-pulse block">// WAITING FOR PIPELINES COMMITMENT</span>
                  </div>
                )}
              </div>
            ) : cartItems.length === 0 ? (
              /* Empty state */
              <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-metal-grey">
                  <span>Ø</span>
                </div>
                <div>
                  <h4 className="font-headline text-sm font-bold uppercase text-white tracking-wider">// SYSTEM EMPTY</h4>
                  <p className="text-[11px] font-mono text-metal-grey mt-1">
                    STANDBY FOR USER ACQUISITIONS CONFIGURATIONS.
                  </p>
                </div>
              </div>
            ) : (
              /* Items List */
              <div className="space-y-4">
                <span className="text-[10px] text-zinc-500 font-mono uppercase block">// ACTIVE ALLOCATIONS ({cartItems.length})</span>
                {cartItems.map((item) => (
                  <div key={item.id} className="p-4 bg-zinc-950/50 border border-white/5 rounded-lg space-y-3 relative overflow-hidden">
                    <div className="flex gap-4 items-start">
                      <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-contain aspect-square bg-[#101010] p-1 border border-white/5 rounded" />
                      <div className="flex-grow space-y-0.5 min-w-0">
                        <span className="text-[9px] text-metal-grey font-mono uppercase block">// {item.product.refId || 'HARDWARE_REF'}</span>
                        <h4 className="font-headline text-sm font-bold truncate text-white">{item.product.name}</h4>
                        
                        {/* Custom configuration details */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {item.selectedColor && (
                            <span className="px-1.5 py-0.5 bg-white/5 text-[9px] font-mono text-zinc-300 rounded border border-white/5">
                              {item.selectedColor}
                            </span>
                          )}
                          {item.eqPreset && (
                            <span className="px-1.5 py-0.5 bg-white/5 text-[9px] font-mono text-signal-red rounded border border-white/5">
                              EQ: {item.eqPreset.split(' ')[0]}
                            </span>
                          )}
                          {item.engraving && (
                            <span className="px-1.5 py-0.5 bg-signal-red/10 text-[9px] font-mono text-signal-red rounded border border-signal-red/10 overflow-hidden text-ellipsis whitespace-nowrap max-w-[120px]">
                              ID: {item.engraving}
                            </span>
                          )}
                        </div>
                      </div>

                      <button 
                        onClick={() => onRemoveItem(item.id)}
                        className="text-metal-grey hover:text-signal-red p-1 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="flex justify-between items-center border-t border-white/5 pt-2 mt-1">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 hover:bg-white/5 rounded border border-white/10 text-metal-grey hover:text-white"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="text-xs font-mono w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 hover:bg-white/5 rounded border border-white/10 text-metal-grey hover:text-white"
                        >
                          <Plus size={10} />
                        </button>
                      </div>

                      <span className="font-mono text-xs text-white font-bold">
                        ${item.product.price * item.quantity}.00
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pricing Summary and CTA */}
          {!isCheckingOut && cartItems.length > 0 && (
            <div className="p-6 border-t border-white/10 space-y-4 bg-zinc-950/85">
              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between text-metal-grey">
                  <span>SUBTOTAL REGISTERED</span>
                  <span className="text-white">${subtotal}.00</span>
                </div>
                <div className="flex justify-between text-metal-grey">
                  <span>DISPATCH LOGISTICS</span>
                  <span className="text-white">{shipping === 0 ? 'FREE // WAIVED' : `$${shipping}.00`}</span>
                </div>
                <div className="flex justify-between text-metal-grey">
                  <span>EST TAX VAL (8%)</span>
                  <span className="text-white">${tax}.00</span>
                </div>
                <div className="border-t border-white/5 my-2 pt-2 flex justify-between font-bold text-sm tracking-tight text-white">
                  <span>TOTAL ESTIMATION</span>
                  <span className="text-signal-red">${total}.00</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={startSimulatedCheckout}
                  className="w-full bg-signal-red text-black font-mono text-xs py-4 px-6 uppercase font-bold tracking-widest tactile-button flex items-center justify-center gap-2 hover:brightness-110"
                >
                  <CreditCard size={14} />
                  INITIALIZE SYSTEM TRANSIT
                </button>
              </div>

              <p className="text-[9px] font-mono text-metal-grey text-center leading-relaxed">
                By executing transit, hardware items are scheduled directly onto the London-M25 courier delivery loop. Pre-loaded specs are non-refundable.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
