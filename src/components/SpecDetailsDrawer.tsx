import React from 'react';
import { X, Cpu, Beaker, Volume2, ShieldCheck, Zap } from 'lucide-react';
import { TechSpec, Product } from '../types';

interface SpecDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  spec?: TechSpec;
  product?: Product;
}

export default function SpecDetailsDrawer({ isOpen, onClose, spec, product }: SpecDetailsDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="spec-details-drawer">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg glass-panel text-white relative">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div>
              <span className="text-signal-red font-mono text-[10px] tracking-widest block mb-1">
                {spec ? spec.code : (product?.series || 'SPEC_SHEET_REF')}
              </span>
              <h3 className="font-headline text-2xl font-bold uppercase tracking-tight">
                {spec ? spec.title : (product?.name ? `${product.name} SPECS` : 'SYSTEM SPECS')}
              </h3>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-full transition-colors text-metal-grey hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto h-[calc(100vh-110px)] space-y-8">
            {spec ? (
              <div className="space-y-6">
                <p className="text-on-surface-variant font-sans text-base leading-relaxed">
                  {spec.description}
                </p>

                <div className="border border-white/10 bg-white/[0.02] p-4 rounded-lg">
                  <span className="font-mono text-xs text-signal-red uppercase block mb-4">// CRITICAL PARAMETERS</span>
                  <div className="space-y-4">
                    {spec.details.map((detail, idx) => {
                      const [title, desc] = detail.split(': ');
                      return (
                        <div key={idx} className="border-b border-white/5 pb-3 last:border-0 last:pb-0">
                          <h4 className="font-headline text-sm font-semibold uppercase text-primary mb-1 flex items-center gap-2">
                            <span className="w-1 h-1 bg-signal-red rounded-full" />
                            {title}
                          </h4>
                          <p className="text-on-surface-variant text-sm pl-3">
                            {desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-white/[0.01] border border-white/5 rounded">
                    <ShieldCheck className="text-signal-red mt-0.5 shrink-0" size={16} />
                    <div className="text-xs text-metal-grey">
                      <span className="text-primary font-bold block mb-1">QUALITY OF MANUFACTURE</span>
                      Subjected to rigorous mechanical wear and acoustic chamber verification at our laboratory.
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white/[0.01] border border-white/5 rounded">
                    <Zap className="text-signal-red mt-0.5 shrink-0" size={16} />
                    <div className="text-xs text-metal-grey">
                      <span className="text-primary font-bold block mb-1">INTERFACIAL CALIBRATION</span>
                      Calibrated for zero-delay tactile response pipelines with standard latency metrics less than 3ms.
                    </div>
                  </div>
                </div>
              </div>
            ) : product ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-lg border border-white/10">
                  <img src={product.image} alt={product.name} className="w-20 h-20 object-contain" />
                  <div>
                    <h4 className="font-headline text-lg font-bold">{product.name}</h4>
                    <p className="text-xs text-metal-grey font-mono">{product.refId}</p>
                    <p className="text-xs text-signal-red font-mono mt-1">${product.price}.00 USD</p>
                  </div>
                </div>

                <p className="text-on-surface-variant font-sans text-sm leading-relaxed">
                  {product.description}
                </p>

                {product.specs && (
                  <div className="space-y-4">
                    <span className="font-mono text-xs text-signal-red uppercase block">// TECHNICAL SPECIFICATIONS</span>
                    <div className="grid grid-cols-1 gap-3">
                      {Object.entries(product.specs).map(([key, value]) => (
                        <div key={key} className="p-3 bg-white/[0.02] border border-white/5 rounded-lg flex flex-col justify-between">
                          <span className="font-mono text-[10px] text-metal-grey block mb-1 uppercase">{key}</span>
                          <span className="text-sm text-primary font-sans leading-relaxed">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-metal-grey font-mono">No specifications loaded.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
