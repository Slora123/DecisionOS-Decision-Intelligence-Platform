import { useRef, useState, useCallback, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { AnimatePresence } from 'framer-motion';
import DecisionCardComponent from '../components/DecisionCardComponent';
import InspectorPanel from '../components/InspectorPanel';
import { 
  Plus, Minus, Maximize2, Sparkles, LayoutGrid, Filter, Focus, 
  Undo, Redo, Map, Download, MousePointer2, Type, Pen, MessageSquare 
} from 'lucide-react';
import clsx from 'clsx';


export default function WorkspacePage() {
  const { decisions, connections, selectedCardId, setSelectedCardId, updateDecision, darkMode, canvasTransform, setCanvasTransform } = useAppStore();
  const { x: panX, y: panY, scale } = canvasTransform;

  const canvasRef = useRef<HTMLDivElement>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });

  const selectedDecision = decisions.find((d) => d.id === selectedCardId) || null;

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    if (e.ctrlKey || e.metaKey) {
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      setCanvasTransform({ x: panX, y: panY, scale: Math.min(2, Math.max(0.3, scale * delta)) });
    } else {
      setCanvasTransform({ x: panX - e.deltaX, y: panY - e.deltaY, scale });
    }
  }, [panX, panY, scale, setCanvasTransform]);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.decision-card-wrapper')) return;
    setIsPanning(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    setCanvasTransform({ x: panX + (e.clientX - lastMouse.x), y: panY + (e.clientY - lastMouse.y), scale });
    setLastMouse({ x: e.clientX, y: e.clientY });
  };
  const handleMouseUp = () => setIsPanning(false);

  const zoomIn = () => setCanvasTransform({ x: panX, y: panY, scale: Math.min(2, scale * 1.2) });
  const zoomOut = () => setCanvasTransform({ x: panX, y: panY, scale: Math.max(0.3, scale / 1.2) });
  const resetView = () => setCanvasTransform({ x: 0, y: 0, scale: 1 });

  const getCardCenter = (id: string) => {
    const d = decisions.find((d) => d.id === id);
    if (!d) return { x: 0, y: 0 };
    return { x: d.x + 144, y: d.y + 80 };
  };

  const canvasBg = darkMode ? 'canvas-bg-dark' : 'canvas-bg-light';

  return (
    <div className="flex h-full overflow-hidden">
      {/* Canvas Area */}
      <div
        ref={canvasRef}
        className={clsx('flex-1 relative overflow-hidden cursor-grab', isPanning && 'cursor-grabbing', canvasBg)}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={() => setSelectedCardId(null)}
      >
        {/* Canvas transform layer */}
        <div
          style={{ transform: `translate(${panX}px, ${panY}px) scale(${scale})`, transformOrigin: '0 0' }}
          className="absolute inset-0 transition-transform duration-75"
        >
          {/* SVG connections */}
          <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
            <defs>
              <marker id="arrowDark" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="rgba(99,102,241,0.7)" />
              </marker>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            {connections.map((conn) => {
              const from = getCardCenter(conn.from);
              const to = getCardCenter(conn.to);
              const cx1 = from.x + (to.x - from.x) * 0.5;
              const cy1 = from.y;
              const cx2 = to.x - (to.x - from.x) * 0.5;
              const cy2 = to.y;
              const d = `M${from.x},${from.y} C${cx1},${cy1} ${cx2},${cy2} ${to.x},${to.y}`;
              return (
                <g key={conn.id}>
                  <path d={d} fill="none" stroke="rgba(99,102,241,0.15)" strokeWidth="8" />
                  <path
                    d={d}
                    fill="none"
                    stroke="rgba(99,102,241,0.6)"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    markerEnd="url(#arrowDark)"
                    className="animate-dash"
                    filter="url(#glow)"
                  />
                  {conn.label && (() => {
                    const mx = (from.x + to.x) / 2;
                    const my = (from.y + to.y) / 2;
                    return (
                      <text x={mx} y={my - 8} textAnchor="middle" fontSize="10" fill="rgba(99,102,241,0.8)" fontFamily="Inter">
                        {conn.label}
                      </text>
                    );
                  })()}
                </g>
              );
            })}
          </svg>

          {/* Decision Cards */}
          {decisions.map((decision) => (
            <div
              key={decision.id}
              className="decision-card-wrapper absolute"
              style={{ left: decision.x, top: decision.y }}
            >
              {/* Pulse ring for selected */}
              {selectedCardId === decision.id && (
                <div className="absolute -inset-3 rounded-3xl border-2 border-indigo-500/40 animate-pulse pointer-events-none" />
              )}
              <DecisionCardComponent
                decision={decision}
                isSelected={selectedCardId === decision.id}
                onClick={() => setSelectedCardId(decision.id === selectedCardId ? null : decision.id)}
                onDragEnd={(dx, dy) => {
                  updateDecision(decision.id, {
                    x: decision.x + dx / scale,
                    y: decision.y + dy / scale,
                  });
                }}
              />
            </div>
          ))}
        </div>

        {/* Top Floating Toolbar (Canva-style) */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2 py-1.5 rounded-full z-10" style={{ background: '#18182b', boxShadow: '0 4px 20px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/20 hover:scale-105 transition-transform" title="Add Decision or Connection">
            <Plus className="w-5 h-5" />
          </button>
          <div className="w-px h-6 bg-white/10 mx-1" />
          <button className="p-2.5 text-white/60 hover:text-white transition-colors rounded-xl hover:bg-white/5"><Sparkles className="w-4 h-4" /></button>
          <button className="p-2.5 text-white/60 hover:text-white transition-colors rounded-xl hover:bg-white/5"><LayoutGrid className="w-4 h-4" /></button>
          <button className="p-2.5 text-white/60 hover:text-white transition-colors rounded-xl hover:bg-white/5"><Filter className="w-4 h-4" /></button>
          <button className="p-2.5 text-white/60 hover:text-white transition-colors rounded-xl hover:bg-white/5"><Focus className="w-4 h-4" /></button>
          <div className="w-px h-6 bg-white/10 mx-1" />
          <button className="p-2.5 text-white/60 hover:text-white transition-colors rounded-xl hover:bg-white/5"><Undo className="w-4 h-4" /></button>
          <button className="p-2.5 text-white/60 hover:text-white transition-colors rounded-xl hover:bg-white/5"><Redo className="w-4 h-4" /></button>
          <div className="w-px h-6 bg-white/10 mx-1" />
          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-[#2d2b52] text-white hover:bg-[#383562] transition-colors">
            <Map className="w-4 h-4" />
          </button>
          <button className="p-2.5 text-white/60 hover:text-white transition-colors rounded-xl hover:bg-white/5 mr-1"><Download className="w-4 h-4" /></button>
        </div>

        {/* Bottom Left Zoom Controls */}
        <div className="absolute bottom-6 left-6 flex flex-col items-center rounded-2xl z-10 overflow-hidden shadow-xl" style={{ background: '#18182b', border: '1px solid rgba(255,255,255,0.05)' }}>
          <button onClick={zoomIn} className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5">
            <Plus className="w-4 h-4" />
          </button>
          <button onClick={zoomOut} className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5">
            <Minus className="w-4 h-4" />
          </button>
          <button onClick={resetView} className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-colors">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Center Tool Palette */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-2 rounded-full z-10 shadow-xl" style={{ background: '#18182b', border: '1px solid rgba(255,255,255,0.05)' }}>
          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 text-white transition-colors">
            <MousePointer2 className="w-4 h-4" />
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-colors">
            <Type className="w-4 h-4" />
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-colors">
            <Pen className="w-4 h-4" />
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-colors">
            <MessageSquare className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Inspector Panel */}
      <AnimatePresence>
        {selectedDecision && (
          <InspectorPanel decision={selectedDecision} onClose={() => setSelectedCardId(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
