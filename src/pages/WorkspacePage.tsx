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
  const { decisions, connections, selectedCardId, setSelectedCardId, addDecision, updateDecision, darkMode, canvasTransform, setCanvasTransform, setCurrentPage, past, future, undo, redo, setGlobalToastMsg } = useAppStore();
  const { x: panX, y: panY, scale } = canvasTransform;

  const canvasRef = useRef<HTMLDivElement>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });
  const [activeTool, setActiveTool] = useState<'select' | 'text' | 'draw' | 'comment'>('select');
  const [showMinimap, setShowMinimap] = useState(true);
  const [filterHighRisk, setFilterHighRisk] = useState(false);
  const showToast = (msg: string) => {
    setGlobalToastMsg(msg);
  };

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          if (future.length > 0) {
            redo();
            showToast('↪ Redone last action');
          }
        } else {
          e.preventDefault();
          if (past.length > 0) {
            undo();
            showToast('↩ Undone last action');
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [past, future, undo, redo]);

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

  // Touch handlers for mobile panning
  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('.decision-card-wrapper')) return;
    setIsPanning(true);
    setLastMouse({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isPanning) return;
    setCanvasTransform({ x: panX + (e.touches[0].clientX - lastMouse.x), y: panY + (e.touches[0].clientY - lastMouse.y), scale });
    setLastMouse({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const zoomIn = () => setCanvasTransform({ x: panX, y: panY, scale: Math.min(2, scale * 1.2) });
  const zoomOut = () => setCanvasTransform({ x: panX, y: panY, scale: Math.max(0.3, scale / 1.2) });
  const resetView = () => setCanvasTransform({ x: 0, y: 0, scale: 1 });

  // Handle Add Decision
  const handleAddDecision = () => {
    const id = `decision-${Date.now()}`;
    const newCard = {
      id,
      title: 'New Decision Node',
      description: 'Custom decision node added from workspace tools.',
      pros: ['Increases flexibility', 'Faster iteration'],
      cons: ['Requires upfront evaluation'],
      risk: 'Medium' as const,
      cost: '$10,000',
      costRaw: 10000,
      dependencies: [],
      confidence: 75,
      tags: ['Custom', 'Strategy'],
      owner: 'Team Lead',
      ownerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      dueDate: '2026-08-30',
      priority: 'High' as const,
      status: 'In Review' as const,
      x: 300 + Math.random() * 100 - panX / scale,
      y: 200 + Math.random() * 100 - panY / scale,
      aiRecommendation: 'Recommended: Proceed with pilot testing.',
      aiAlternative: 'Consider phasing out legacy dependencies.',
      aiConfidence: 80,
      favorite: false,
      comments: [],
      createdAt: '2026-07-25',
    };
    addDecision(newCard);
    setSelectedCardId(id);
    showToast('✨ Created new Decision Card!');
  };

  // Handle Auto Layout Grid
  const handleOrganizeGrid = () => {
    const cols = 3;
    decisions.forEach((d, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      updateDecision(d.id, { x: 100 + col * 360, y: 100 + row * 260 });
    });
    showToast('📐 Organized cards into clean Grid layout!');
  };

  // Handle Export / Download JSON
  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({ decisions, connections }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `decisionos-workspace-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('📥 Downloaded workspace canvas data!');
  };

  const getCardCenter = (id: string) => {
    const d = decisions.find((d) => d.id === id);
    if (!d) return { x: 0, y: 0 };
    return { x: d.x + 144, y: d.y + 80 };
  };

  const canvasBg = darkMode ? 'canvas-bg-dark' : 'canvas-bg-light';
  const displayedDecisions = filterHighRisk ? decisions.filter((d) => d.risk === 'High' || d.risk === 'Critical') : decisions;

  return (
    <div className="flex h-full overflow-hidden relative">
      {/* Canvas Area */}
      <div
        ref={canvasRef}
        className={clsx('flex-1 relative overflow-hidden cursor-grab touch-none', isPanning && 'cursor-grabbing', canvasBg)}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        onTouchCancel={handleMouseUp}
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
          {displayedDecisions.map((decision) => (
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
          <button 
            onClick={handleAddDecision}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/20 hover:scale-105 transition-transform" 
            title="Add Decision Node (+)"
          >
            <Plus className="w-5 h-5" />
          </button>

          <div className="w-px h-6 bg-white/10 mx-1" />

          <button 
            onClick={() => setCurrentPage('insights')}
            className="p-2.5 text-white/60 hover:text-white transition-colors rounded-xl hover:bg-white/5" 
            title="AI Insights & Suggestions"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          <button 
            onClick={handleOrganizeGrid}
            className="p-2.5 text-white/60 hover:text-white transition-colors rounded-xl hover:bg-white/5" 
            title="Auto-Organize Grid Layout"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>

          <button 
            onClick={() => {
              setFilterHighRisk(!filterHighRisk);
              showToast(filterHighRisk ? 'Showing All Decisions' : 'Filtering High-Risk Decisions only');
            }}
            className={clsx("p-2.5 transition-colors rounded-xl hover:bg-white/5", filterHighRisk ? "text-amber-400 bg-amber-400/10" : "text-white/60 hover:text-white")} 
            title={filterHighRisk ? "Clear High Risk Filter" : "Filter High Risk Decisions"}
          >
            <Filter className="w-4 h-4" />
          </button>

          <button 
            onClick={() => { resetView(); showToast('Recentered Canvas View'); }}
            className="p-2.5 text-white/60 hover:text-white transition-colors rounded-xl hover:bg-white/5" 
            title="Fit / Center View"
          >
            <Focus className="w-4 h-4" />
          </button>

          <div className="w-px h-6 bg-white/10 mx-1" />

          <button 
            onClick={() => { undo(); showToast('↩ Undone last action'); }}
            disabled={past.length === 0}
            className={clsx(
              "p-2.5 transition-colors rounded-xl", 
              past.length > 0 ? "text-white/60 hover:text-white hover:bg-white/5" : "text-white/20 cursor-not-allowed"
            )} 
            title="Undo (⌘Z)"
          >
            <Undo className="w-4 h-4" />
          </button>

          <button 
            onClick={() => { redo(); showToast('↪ Redone last action'); }}
            disabled={future.length === 0}
            className={clsx(
              "p-2.5 transition-colors rounded-xl", 
              future.length > 0 ? "text-white/60 hover:text-white hover:bg-white/5" : "text-white/20 cursor-not-allowed"
            )} 
            title="Redo (⌘⇧Z)"
          >
            <Redo className="w-4 h-4" />
          </button>

          <div className="w-px h-6 bg-white/10 mx-1" />

          <button 
            onClick={() => {
              setShowMinimap(!showMinimap);
              showToast(showMinimap ? 'Hidden Mini-map' : 'Shown Mini-map');
            }}
            className={clsx("w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors", showMinimap ? "bg-[#2d2b52]" : "bg-white/5 hover:bg-white/10")}
            title="Toggle Mini-Map"
          >
            <Map className="w-4 h-4" />
          </button>

          <button 
            onClick={handleExportData}
            className="p-2.5 text-white/60 hover:text-white transition-colors rounded-xl hover:bg-white/5 mr-1" 
            title="Download Canvas Data (JSON)"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>

        {/* Mini-map Overlay */}
        <AnimatePresence>
          {showMinimap && (
            <div className={clsx('hidden md:block absolute bottom-6 right-6 w-44 h-28 rounded-2xl border overflow-hidden shadow-2xl z-10', darkMode ? 'bg-[#0a0a1a]/90 border-white/10 backdrop-blur-md' : 'bg-white/90 border-gray-200')}>
              <div className={clsx('text-[9px] font-semibold px-2.5 py-1 border-b flex items-center justify-between', darkMode ? 'text-white/40 border-white/8' : 'text-gray-400 border-gray-100')}>
                <span>MINIMAP</span>
                <span>{decisions.length} Nodes</span>
              </div>
              <div className="relative w-full h-full p-2">
                {decisions.map((d) => (
                  <div
                    key={d.id}
                    style={{ left: `${Math.min(85, Math.max(5, (d.x / 1200) * 100))}%`, top: `${Math.min(75, Math.max(5, (d.y / 800) * 85))}%`, width: 10, height: 7 }}
                    className={clsx('absolute rounded-sm transition-all', d.id === selectedCardId ? 'bg-indigo-400 ring-2 ring-indigo-400/50' : (darkMode ? 'bg-white/30' : 'bg-gray-400'))}
                  />
                ))}
              </div>
            </div>
          )}
        </AnimatePresence>

        {/* Bottom Left Zoom Controls */}
        <div className="absolute bottom-24 md:bottom-6 left-4 md:left-6 flex flex-col items-center rounded-2xl z-10 overflow-hidden shadow-xl" style={{ background: '#18182b', border: '1px solid rgba(255,255,255,0.05)' }}>
          <button onClick={zoomIn} className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5" title="Zoom In (+)">
            <Plus className="w-4 h-4" />
          </button>
          <button onClick={zoomOut} className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5" title="Zoom Out (-)">
            <Minus className="w-4 h-4" />
          </button>
          <button onClick={resetView} className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-colors" title="Reset Zoom (100%)">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Center Tool Palette */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-2 rounded-full z-10 shadow-xl" style={{ background: '#18182b', border: '1px solid rgba(255,255,255,0.05)' }}>
          <button 
            onClick={() => { setActiveTool('select'); showToast('Selection Tool Active'); }}
            className={clsx("w-10 h-10 rounded-full flex items-center justify-center transition-colors", activeTool === 'select' ? "bg-white/20 text-white shadow-inner" : "text-white/60 hover:text-white hover:bg-white/5")}
            title="Select & Move Pointer Tool"
          >
            <MousePointer2 className="w-4 h-4" />
          </button>

          <button 
            onClick={() => { setActiveTool('text'); handleAddDecision(); }}
            className={clsx("w-10 h-10 rounded-full flex items-center justify-center transition-colors", activeTool === 'text' ? "bg-white/20 text-white shadow-inner" : "text-white/60 hover:text-white hover:bg-white/5")}
            title="Add Text Note Card"
          >
            <Type className="w-4 h-4" />
          </button>

          <button 
            onClick={() => { setActiveTool('draw'); showToast('Drawing & Annotation Mode Enabled'); }}
            className={clsx("w-10 h-10 rounded-full flex items-center justify-center transition-colors", activeTool === 'draw' ? "bg-white/20 text-white shadow-inner" : "text-white/60 hover:text-white hover:bg-white/5")}
            title="Draw & Annotate Tool"
          >
            <Pen className="w-4 h-4" />
          </button>

          <button 
            onClick={() => { setActiveTool('comment'); showToast('Click any card to add a Comment'); }}
            className={clsx("w-10 h-10 rounded-full flex items-center justify-center transition-colors", activeTool === 'comment' ? "bg-white/20 text-white shadow-inner" : "text-white/60 hover:text-white hover:bg-white/5")}
            title="Add Comment Tool"
          >
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
