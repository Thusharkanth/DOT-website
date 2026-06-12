import React from 'react';
import { ShieldCheck, Zap, Volume2, Compass, Box, Layers, Landmark } from 'lucide-react';

export default function AboutView() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-12 py-16 text-white space-y-24" id="about-philosophy">
      
      {/* Editorial Headline */}
      <div className="max-w-4xl space-y-6">
        <span className="text-signal-red font-mono text-xs block tracking-widest">// THE MANIFESTO</span>
        <h2 className="font-headline text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none">
          CLINICAL.<br />
          PRECISE.<br />
          COMPLETELY HONEST.
        </h2>
        <div className="h-0.5 bg-signal-red w-24 my-6" />
        <p className="font-body-lg text-xl text-on-surface-variant max-w-2xl leading-relaxed">
          We reject the modern consumer standard of rounded, high-gloss plastic, forced subscriptions, and virtual assist frameworks. At DOT, hardware is sacred. We believe in raw aluminum, structural glass, tactile faders, and clinical, lab-grade performance.
        </p>
      </div>

      {/* Grid containing specifications and philosophy details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Core Block 1: Bead-Blasting */}
        <div className="glass-panel p-8 rounded-xl space-y-4">
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-signal-red bg-white/[0.02]">
            <Layers size={18} />
          </div>
          <span className="text-[10px] font-mono text-metal-grey block">// DESIGN_RULE_01</span>
          <h3 className="font-headline text-lg font-bold uppercase tracking-tight">TRANSLUCENT SHELLS</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            By exposing copper induction coils and internal chassis ribs under high-silica aluminosilicate glass, we replace branding with mechanical truth. Every component is positioned under rigorous geometric boundaries.
          </p>
        </div>

        {/* Core Block 2: KEF Labs Collaboration */}
        <div className="glass-panel p-8 rounded-xl space-y-4">
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-signal-red bg-white/[0.02]">
            <Volume2 size={18} />
          </div>
          <span className="text-[10px] font-mono text-metal-grey block">// DESIGN_RULE_02</span>
          <h3 className="font-headline text-lg font-bold uppercase tracking-tight">KEF LABS CO-OP</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Acoustics is physics. We teamed up with KEF sound engineers to calibrate continuous polar pressure curves, implementing vapor-deposition diamond coatings over bio-cellulose transducers to deliver zero linear distortion.
          </p>
        </div>

        {/* Core Block 3: Architectural Layout */}
        <div className="glass-panel p-8 rounded-xl space-y-4">
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-signal-red bg-white/[0.02]">
            <Box size={18} />
          </div>
          <span className="text-[10px] font-mono text-metal-grey block">// DESIGN_RULE_03</span>
          <h3 className="font-headline text-lg font-bold uppercase tracking-tight">TACTILITY FIRST</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Physical knobs and passivated limits feel better than voice triggers. We utilize knurled anodized rotary encoders and dual-resonant linear haptic engines to recreate the physical sensation of high-end clinical apparatus.
          </p>
        </div>

      </div>

      {/* Corporate blueprint details */}
      <div className="border border-white/10 bg-white/[0.01] p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none font-mono text-[90px] select-none text-right font-bold leading-none">
          M_04_SYS
        </div>

        <div className="space-y-6 md:w-3/5">
          <span className="text-xs text-signal-red font-mono">// LABORATORY STANDARD</span>
          <h4 className="font-headline text-2xl font-bold uppercase tracking-tight text-white">CONCEIVED IN SHOREDITCH // ENGINEERED IN TOKYO</h4>
          <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
            Our principal team conducts mechanical research and continuous industrial engineering routines across dual facilities. By fusing European design aesthetics with East-Asian high-precision semiconductor quality control, we produce hardware capable of infinite service.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs font-mono text-metal-grey">
              <ShieldCheck className="text-signal-red" size={14} />
              ISO 9001 ACCREDITED
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-metal-grey">
              <Landmark className="text-signal-red" size={14} />
              ARCHITECTURAL INTEGRITY CODES
            </div>
          </div>
        </div>

        <div className="md:w-2/5 flex justify-center items-center relative h-56 w-full border border-zinc-800 bg-black/40 rounded p-6">
          {/* Simulated blueprint vector wireframe */}
          <div className="absolute inset-0 opacity-15 border-[1px] border-dashed border-zinc-700 m-4 rounded" />
          <div className="relative font-mono text-[10px] text-zinc-500 space-y-2 select-none w-full text-left">
            <div className="flex justify-between border-b border-zinc-900 pb-1.5">
              <span>MODEL_ID</span>
              <span className="text-white">SYS_04_SPEC_GRID</span>
            </div>
            <div className="flex justify-between border-b border-zinc-900 pb-1.5">
              <span>MILLING_TOLERANCE</span>
              <span className="text-white">&lt;0.005mm MICRONS</span>
            </div>
            <div className="flex justify-between border-b border-zinc-900 pb-1.5">
              <span>COIL_INDUCTION_WINDING</span>
              <span className="text-white">0.08mm CO-PASS</span>
            </div>
            <div className="flex justify-between border-b border-zinc-900 pb-1.5">
              <span>PASSIVATION_COATING</span>
              <span className="text-white">NANO-ZINC COAT</span>
            </div>
            <div className="flex justify-between">
              <span>STATUS</span>
              <span className="text-signal-red animate-pulse">VERIFIED_LOG_039_STND</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
