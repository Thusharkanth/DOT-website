import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RefreshCw, Volume2, ShieldCheck, Sun, HardDrive, Battery, Radio, MessageSquare, Bell } from 'lucide-react';

export default function SoftwareSim() {
  const [batteryLevel, setBatteryLevel] = useState(88);
  const [volume, setVolume] = useState(70);
  const [glyphLumen, setGlyphLumen] = useState(60);
  const [selectedSound, setSelectedSound] = useState('clinical-pulse');
  const [isPlaying, setIsPlaying] = useState(false);
  const [ledGrid, setLedGrid] = useState<boolean[]>([true, true, false, true, false, true, true, false]);
  const [logs, setLogs] = useState<string[]>([
    'SYSTEM ENGINE BOOT OK // RT-CORE v3',
    'DOT-OS 3.0 // STABLE BUILD DISPATCHED',
    'SIGNAL LINKED // 5G CALIBRATION STABLE'
  ]);
  const [activeTab, setActiveTab] = useState<'home' | 'glyph' | 'audio'>('home');
  const [systemUptime, setSystemUptime] = useState('00:00:00');
  
  // Equalizer visualizer bars helper
  const [eqWaves, setEqWaves] = useState<number[]>([30, 50, 70, 85, 45, 60, 40, 75, 90, 55, 30, 45]);
  const animationRef = useRef<number | null>(null);

  // System Uptime counter
  useEffect(() => {
    let secs = 0;
    const interval = setInterval(() => {
      secs++;
      const hrs = Math.floor(secs / 3600).toString().padStart(2, '0');
      const mins = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
      const scs = (secs % 60).toString().padStart(2, '0');
      setSystemUptime(`${hrs}:${mins}:${scs}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Equalizer wave animation
  useEffect(() => {
    if (isPlaying) {
      const animate = () => {
        setEqWaves(prev => prev.map(val => {
          const change = (Math.random() - 0.5) * 40;
          return Math.max(10, Math.min(100, val + change));
        }));
        animationRef.current = requestAnimationFrame(animate);
      };
      animate();
    } else {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      setEqWaves([20, 25, 20, 30, 20, 25, 20, 30, 20, 25, 20, 20]);
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying]);

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [`[${time}] ${msg}`, ...prev.slice(0, 8)]);
  };

  const toggleLedGrid = (idx: number) => {
    const newLeds = [...ledGrid];
    newLeds[idx] = !newLeds[idx];
    setLedGrid(newLeds);
    addLog(`GLYPH SECTOR ${idx + 1} STATE -> ${newLeds[idx] ? 'ON' : 'OFF'}`);
  };

  const handleSoundChange = (sound: string) => {
    setSelectedSound(sound);
    addLog(`LOAD AUDIO BUFFER -> ${sound.toUpperCase()}`);
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-12 py-12" id="software-simulator">
      <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
        
        {/* Left column: Narrative explaining DOT-OS */}
        <div className="w-full lg:w-5/12 space-y-6 lg:pr-8">
          <div className="flex items-center gap-2">
            <span className="text-signal-red font-mono text-xs">// PLATFORM SOFTWARE</span>
            <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-[9px] font-mono text-zinc-300 uppercase">SYS_3.0_STABLE</span>
          </div>
          <h2 className="font-headline text-5xl font-bold uppercase tracking-tighter leading-none text-white">
            DOT-OS.<br/>
            MINIMALIST<br/>
            COMPUTING.
          </h2>
          <p className="font-body-lg text-on-surface-variant leading-relaxed">
            By purging visual bloat, we return computation back to its functional origin. DOT-OS strips away heavy gradients, notifications badges, and attention-seeking models, opting instead for a unified monochromatic typography grid tuned for zero distraction.
          </p>

          <div className="space-y-4 pt-4 border-t border-white/10">
            <h4 className="font-headline text-xs text-signal-red uppercase font-bold">// KEY ARCHITECTURAL FEATURES</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-950/40 border border-white/5 rounded-lg space-y-1">
                <span className="font-mono text-[10px] text-white uppercase block">Monochrome Grid</span>
                <span className="text-xs text-metal-grey block">12-column dot layout maintaining rigorous horizontal reading limits.</span>
              </div>
              <div className="p-4 bg-zinc-950/40 border border-white/5 rounded-lg space-y-1">
                <span className="font-mono text-[10px] text-white uppercase block">Haptic Syncing</span>
                <span className="text-xs text-metal-grey block">Microsecond coordinated pulses matching the mechanical rhythm of notifications.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Interactive phone frame simulator */}
        <div className="w-full lg:w-7/12 flex justify-center">
          <div className="w-full max-w-sm h-[720px] bg-black border-[6px] border-zinc-800 rounded-[40px] shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative flex flex-col overflow-hidden select-none">
            
            {/* Speaker housing / Notch / Camera overlay */}
            <div className="absolute top-0 inset-x-0 h-6 flex justify-center items-center z-30">
              <div className="w-24 h-4 bg-zinc-900 rounded-b-xl border border-zinc-950 flex items-center justify-between px-3">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-950 border border-zinc-800" />
                <div className="w-10 h-1 bg-black rounded-full" />
                <div className="w-2 h-2 rounded-full bg-blue-950 border border-zinc-800" />
              </div>
            </div>

            {/* Simulated Glass glare reflection over the display */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/[0.02] via-transparent to-white/[0.02] z-20" />

            {/* Interactive Phone Content Area */}
            <div className="flex-grow flex flex-col justify-between p-6 pt-10 pb-6 relative z-10 font-mono text-xs text-zinc-300">
              
              {/* StatusBar */}
              <div className="flex justify-between items-center text-[10px] font-mono text-metal-grey border-b border-white/5 pb-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>DOT_NET // 5G</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>UP: {systemUptime}</span>
                  <div className="flex items-center gap-1">
                    <Battery size={10} />
                    <span>{batteryLevel}%</span>
                  </div>
                </div>
              </div>

              {/* OS Tab Navigation */}
              <div className="grid grid-cols-3 gap-1.5 bg-zinc-950 p-1 border border-white/5 rounded-lg my-3 text-center text-[10px] uppercase font-mono">
                <button
                  onClick={() => setActiveTab('home')}
                  className={`py-1.5 rounded transition-all ${activeTab === 'home' ? 'bg-white/10 text-white font-bold' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  SYSTEM
                </button>
                <button
                  onClick={() => setActiveTab('glyph')}
                  className={`py-1.5 rounded transition-all ${activeTab === 'glyph' ? 'bg-white/10 text-white font-bold' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  GLYPH
                </button>
                <button
                  onClick={() => setActiveTab('audio')}
                  className={`py-1.5 rounded transition-all ${activeTab === 'audio' ? 'bg-white/10 text-white font-bold' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  OS_WAVE
                </button>
              </div>

              {/* Screen viewport */}
              <div className="flex-grow overflow-y-auto pr-0.5 space-y-4">
                
                {activeTab === 'home' && (
                  <div className="space-y-4 animate-fade-in">
                    
                    {/* Widget 1: System Storage */}
                    <div className="p-3 bg-zinc-950/80 border border-white/5 rounded-lg space-y-2">
                      <div className="flex justify-between text-[10px] text-metal-grey">
                        <span>STORAGE ( CORE )</span>
                        <span>STABLE</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <HardDrive size={16} className="text-zinc-400" />
                        <div className="flex-grow">
                          <div className="flex justify-between font-bold text-xs">
                            <span>118 GB // 256 GB</span>
                            <span>46%</span>
                          </div>
                          <div className="w-full h-1 bg-zinc-900 rounded-full mt-1.5 overflow-hidden">
                            <div className="h-full bg-white rounded-full" style={{ width: '46%' }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Widget 2: Energy Monitor */}
                    <div className="p-3 bg-zinc-950/80 border border-white/5 rounded-lg space-y-2">
                      <div className="flex justify-between text-[10px] text-metal-grey">
                        <span>ENERGY PROJECTION</span>
                        <span>0.42V DROP</span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded bg-zinc-900 flex items-center justify-center">
                            <Radio size={14} className="text-signal-red" />
                          </div>
                          <div>
                            <span className="text-[11px] font-bold block text-white uppercase">ENERGY OPTIMIZER</span>
                            <span className="text-[9px] text-zinc-500 block">Thermal dampener operational</span>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded bg-black border-zinc-800 text-signal-red focus:ring-0 focus:ring-offset-0"
                          onChange={(e) => {
                            addLog(`ENERGY OPTIMIZER MODE -> ${e.target.checked ? 'ACTIVATE' : 'SUSPEND'}`);
                          }}
                        />
                      </div>
                    </div>

                    {/* Quick Notifications panel simulation */}
                    <div className="p-3 bg-zinc-950/80 border border-white/5 rounded-lg space-y-2">
                      <span className="text-[10px] text-metal-grey block">// UNRESOLVED SYMMETRY LOGS ({ledGrid.filter(Boolean).length})</span>
                      <div className="space-y-1.5 text-[10px]">
                        <div className="flex items-center justify-between p-1.5 bg-zinc-900/60 rounded">
                          <span className="font-bold whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px] text-zinc-200">GLYPH SEQUENCING</span>
                          <span className="text-[9px] text-signal-red">RHYTHMIC ACTIVE</span>
                        </div>
                        <div className="flex items-center justify-between p-1.5 bg-zinc-900/60 rounded">
                          <span className="font-bold whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px] text-zinc-200">KEF ACOUSTIC SYST</span>
                          <span className="text-[9px] text-zinc-400">TUNED SUITE</span>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {activeTab === 'glyph' && (
                  <div className="space-y-4 animate-fade-in">
                    
                    {/* Glyph Matrix Editor */}
                    <div className="p-3 bg-zinc-950/80 border border-white/5 rounded-lg text-center space-y-3">
                      <div className="flex justify-between text-[10px] text-metal-grey text-left">
                        <span>GLYPH LED HARDWARE SCHEMATIC</span>
                        <span>INTERACTIVE</span>
                      </div>

                      {/* Display the active Glyph lights mimicking the casing patterns */}
                      <div className="relative w-44 h-44 mx-auto border-2 border-zinc-900 rounded-full flex items-center justify-center p-3">
                        {/* Circular ring of LEDs */}
                        <div className="absolute inset-2 border border-zinc-900/50 rounded-full" />
                        
                        {/* Interactive LED sectors */}
                        <div className="grid grid-cols-4 gap-3 w-full">
                          {ledGrid.map((isOn, idx) => (
                            <button
                              key={idx}
                              onClick={() => toggleLedGrid(idx)}
                              className={`aspect-square rounded border font-mono text-[9px] font-bold flex flex-col items-center justify-center transition-all ${
                                isOn 
                                  ? 'bg-signal-red/20 border-signal-red text-signal-red shadow-[0_0_8px_rgba(255,49,0,0.3)]' 
                                  : 'bg-zinc-950 border-white/5 text-zinc-600 hover:border-white/10'
                              }`}
                            >
                              <span>{idx + 1}</span>
                              <span className="text-[7px] block uppercase mt-0.5">{isOn ? 'LED' : 'OFF'}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-center bg-black/60 p-2 border border-white/5 rounded text-[10px] font-mono">
                        <span className="text-zinc-400 uppercase">GLYPH LUMEN LIMIT</span>
                        <span className="text-white font-bold">{glyphLumen}%</span>
                      </div>
                      
                      <input 
                        type="range" min="10" max="100" 
                        value={glyphLumen} 
                        onChange={(e) => {
                          setGlyphLumen(Number(e.target.value));
                          addLog(`UPDATED GLYPH LUMEN -> ${e.target.value}%`);
                        }}
                        className="w-full accent-signal-red bg-zinc-800 h-1 rounded"
                      />
                    </div>

                  </div>
                )}

                {activeTab === 'audio' && (
                  <div className="space-y-4 animate-fade-in">
                    
                    {/* Equalizer view */}
                    <div className="p-3 bg-zinc-950/80 border border-white/5 rounded-lg space-y-3">
                      <div className="flex justify-between text-[10px] text-metal-grey">
                        <span>DSP ANALOG FREQUENCY GRAPH</span>
                        <span>REAL-TIME</span>
                      </div>

                      {/* Sine wave equalizer layout */}
                      <div className="h-20 flex gap-1 items-end justify-between bg-black/60 p-2.5 rounded border border-white/5 pt-6">
                        {eqWaves.map((h, i) => (
                          <div 
                            key={i} 
                            style={{ height: `${h}%` }} 
                            className={`w-1.5 rounded-t transition-all duration-150 ${isPlaying ? 'bg-signal-red shadow-[0_0_6px_rgba(255,49,0,0.2)]' : 'bg-zinc-800'}`} 
                          />
                        ))}
                      </div>

                      <div className="flex items-center justify-between border-t border-white/5 pt-2">
                        <span className="text-[10px] font-bold text-white uppercase truncate max-w-[140px]">
                          {selectedSound.replace('-', ' ').toUpperCase()}
                        </span>
                        
                        <button
                          onClick={() => {
                            setIsPlaying(!isPlaying);
                            addLog(`SOUND MATRIX DRIVER -> ${!isPlaying ? 'PLAY' : 'PAUSE'}`);
                          }}
                          className={`p-2 rounded font-mono text-[9px] font-bold border transition-colors ${
                            isPlaying 
                              ? 'bg-signal-red/10 border-signal-red text-signal-red' 
                              : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                          }`}
                        >
                          {isPlaying ? <Pause size={10} className="inline mr-1" /> : <Play size={10} className="inline mr-1" />}
                          {isPlaying ? 'SUSPEND' : 'ACQUIRE'}
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5 pt-1">
                        {[
                          { id: 'clinical-pulse', label: 'Clinical Pulse' },
                          { id: 'london-rhythm', label: 'London Syncop' },
                          { id: 'analog-static', label: 'White Static' },
                          { id: 'sine-sweep', label: 'Sine Sweep' }
                        ].map(snd => (
                          <button
                            key={snd.id}
                            onClick={() => handleSoundChange(snd.id)}
                            className={`px-2 py-1.5 border rounded text-[9px] text-left transition-colors font-mono ${
                              selectedSound === snd.id 
                                ? 'bg-white/10 border-white text-white' 
                                : 'bg-transparent border-white/5 text-zinc-500 hover:text-zinc-300 hover:border-white/10'
                            }`}
                          >
                            // {snd.label.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Master sound volume slider */}
                    <div className="p-3 bg-zinc-950/80 border border-white/5 rounded-lg space-y-1.5">
                      <div className="flex justify-between text-[10px] text-metal-grey">
                        <span>MASTER GAIN VOLUME</span>
                        <span>{volume}%</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Volume2 size={12} className="text-zinc-400" />
                        <input 
                          type="range" min="0" max="100" 
                          value={volume} 
                          onChange={(e) => {
                            setVolume(Number(e.target.value));
                            addLog(`VOLUME REGISTER ADJUSTED -> ${e.target.value}%`);
                          }}
                          className="w-full accent-white bg-zinc-800 h-1 rounded"
                        />
                      </div>
                    </div>

                  </div>
                )}

              </div>

              {/* Terminal Logs in the background */}
              <div className="mt-4 pt-3 border-t border-white/5">
                <span className="text-[8px] text-zinc-600 block uppercase mb-1">// OS EVENT DISPATCHER LOGS</span>
                <div className="bg-black/80 font-mono text-[8px] text-zinc-400 p-2.5 rounded border border-zinc-950 space-y-1 h-20 overflow-y-auto scrollbar-none leading-relaxed select-text select-all">
                  {logs.map((log, i) => (
                    <div key={i} className="truncate">
                      <span className="text-signal-red font-bold">&gt;</span> {log}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
