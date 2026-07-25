import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import type { DecisionCard } from '../types';
import { CheckCircle2, XCircle, AlertTriangle, Star, Trash2 } from 'lucide-react';
import clsx from 'clsx';

interface DecisionCardProps {
  decision: DecisionCard;
  isSelected: boolean;
  onClick: (e?: React.MouseEvent) => void;
  style?: React.CSSProperties;
  onDragEnd?: (x: number, y: number) => void;
}

// Vivid colour palettes — each card gets one based on a hash of its id
const CARD_PALETTES = [
  {
    gradient: 'from-violet-600 to-indigo-500',
    glow: 'rgba(139,92,246,0.45)',
    accent: '#8b5cf6',
    badge: 'bg-violet-500/20 text-violet-200 border-violet-400/30',
    bar: 'from-violet-400 to-indigo-400',
    title: 'text-white',
    muted: 'text-white/60',
    bg: 'bg-gradient-to-br from-violet-900/80 to-indigo-900/80',
    border: 'border-violet-500/40',
    borderSel: 'border-violet-300',
  },
  {
    gradient: 'from-cyan-500 to-blue-600',
    glow: 'rgba(6,182,212,0.45)',
    accent: '#06b6d4',
    badge: 'bg-cyan-500/20 text-cyan-200 border-cyan-400/30',
    bar: 'from-cyan-400 to-blue-400',
    title: 'text-white',
    muted: 'text-white/60',
    bg: 'bg-gradient-to-br from-cyan-900/80 to-blue-900/80',
    border: 'border-cyan-500/40',
    borderSel: 'border-cyan-300',
  },
  {
    gradient: 'from-rose-500 to-pink-600',
    glow: 'rgba(244,63,94,0.45)',
    accent: '#f43f5e',
    badge: 'bg-rose-500/20 text-rose-200 border-rose-400/30',
    bar: 'from-rose-400 to-pink-400',
    title: 'text-white',
    muted: 'text-white/60',
    bg: 'bg-gradient-to-br from-rose-900/80 to-pink-900/80',
    border: 'border-rose-500/40',
    borderSel: 'border-rose-300',
  },
  {
    gradient: 'from-amber-500 to-orange-500',
    glow: 'rgba(245,158,11,0.45)',
    accent: '#f59e0b',
    badge: 'bg-amber-500/20 text-amber-200 border-amber-400/30',
    bar: 'from-amber-400 to-orange-400',
    title: 'text-white',
    muted: 'text-white/60',
    bg: 'bg-gradient-to-br from-amber-900/80 to-orange-900/80',
    border: 'border-amber-500/40',
    borderSel: 'border-amber-300',
  },
  {
    gradient: 'from-emerald-500 to-teal-500',
    glow: 'rgba(16,185,129,0.45)',
    accent: '#10b981',
    badge: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30',
    bar: 'from-emerald-400 to-teal-400',
    title: 'text-white',
    muted: 'text-white/60',
    bg: 'bg-gradient-to-br from-emerald-900/80 to-teal-900/80',
    border: 'border-emerald-500/40',
    borderSel: 'border-emerald-300',
  },
  {
    gradient: 'from-blue-500 to-indigo-600',
    glow: 'rgba(59,130,246,0.45)',
    accent: '#3b82f6',
    badge: 'bg-blue-500/20 text-blue-200 border-blue-400/30',
    bar: 'from-blue-400 to-indigo-400',
    title: 'text-white',
    muted: 'text-white/60',
    bg: 'bg-gradient-to-br from-blue-900/80 to-indigo-900/80',
    border: 'border-blue-500/40',
    borderSel: 'border-blue-300',
  },
  {
    gradient: 'from-fuchsia-500 to-purple-600',
    glow: 'rgba(217,70,239,0.45)',
    accent: '#d946ef',
    badge: 'bg-fuchsia-500/20 text-fuchsia-200 border-fuchsia-400/30',
    bar: 'from-fuchsia-400 to-purple-400',
    title: 'text-white',
    muted: 'text-white/60',
    bg: 'bg-gradient-to-br from-fuchsia-900/80 to-purple-900/80',
    border: 'border-fuchsia-500/40',
    borderSel: 'border-fuchsia-300',
  },
];

function hashId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return Math.abs(h);
}

const riskColor: Record<string, string> = {
  Low: 'text-emerald-300 bg-emerald-500/15 border-emerald-500/30',
  Medium: 'text-amber-300 bg-amber-500/15 border-amber-500/30',
  High: 'text-orange-300 bg-orange-500/15 border-orange-500/30',
  Critical: 'text-red-300 bg-red-500/15 border-red-500/30',
};

export default function DecisionCardComponent({ decision, isSelected, onClick, style, onDragEnd }: DecisionCardProps) {
  const { updateDecision, deleteDecision } = useAppStore();
  const p = CARD_PALETTES[hashId(decision.id) % CARD_PALETTES.length];

  const confidenceGradient = decision.confidence >= 80
    ? 'from-emerald-400 to-teal-300'
    : decision.confidence >= 60
      ? 'from-amber-400 to-yellow-300'
      : 'from-red-400 to-orange-300';

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragEnd={(_, info) => {
        if (onDragEnd) onDragEnd(info.offset.x, info.offset.y);
      }}
      initial={{ opacity: 0, scale: 0.88, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      onClick={(e) => onClick(e)}
      style={{
        ...style,
        boxShadow: isSelected
          ? `0 0 0 2px ${p.accent}, 0 20px 60px ${p.glow}, 0 8px 24px rgba(0,0,0,0.4)`
          : `0 8px 32px ${p.glow.replace('0.45', '0.25')}, 0 2px 8px rgba(0,0,0,0.3)`,
      }}
      className={clsx(
        'absolute w-72 rounded-2xl border cursor-pointer select-none transition-all duration-200 backdrop-blur-xl',
        p.bg,
        isSelected ? p.borderSel : p.border,
      )}
    >
      {/* Top gradient bar */}
      <div className={clsx('h-1.5 rounded-t-2xl bg-gradient-to-r', p.gradient)} />

      {/* Subtle inner glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top left, ${p.glow.replace('0.45', '0.08')}, transparent 60%)` }}
      />

      <div className="relative p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className={clsx('text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wide', p.badge)}>
                {decision.priority}
              </span>
              {decision.favorite && <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />}
            </div>
            <h3 className={clsx('font-bold text-sm leading-snug', p.title)}>{decision.title}</h3>
          </div>
          <div className="flex gap-1 shrink-0">
            <button
              onClick={(e) => { e.stopPropagation(); updateDecision(decision.id, { favorite: !decision.favorite }); }}
              className="p-1 rounded-lg opacity-50 hover:opacity-100 transition-opacity"
            >
              <Star className={clsx('w-3.5 h-3.5', decision.favorite ? 'text-amber-300 fill-amber-300' : 'text-white/40')} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); deleteDecision(decision.id); }}
              className="p-1 rounded-lg opacity-30 hover:opacity-80 hover:text-red-300 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Confidence bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className={clsx('text-xs font-medium', p.muted)}>Confidence</span>
            <span className={clsx('text-sm font-bold', p.title)} style={{ color: p.accent }}>{decision.confidence}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${decision.confidence}%` }}
              transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
              className={clsx('h-full rounded-full bg-gradient-to-r', confidenceGradient)}
            />
          </div>
        </div>

        {/* Pros & Cons */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <div className="flex items-center gap-1 mb-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400">Pros</span>
            </div>
            <div className="space-y-0.5">
              {decision.pros.slice(0, 2).map((pr, i) => (
                <div key={i} className={clsx('text-xs leading-tight', p.muted)} title={pr}>
                  · {pr.length > 18 ? pr.slice(0, 18) + '…' : pr}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1 mb-1">
              <XCircle className="w-3 h-3 text-red-400" />
              <span className="text-xs font-semibold text-red-400">Cons</span>
            </div>
            <div className="space-y-0.5">
              {decision.cons.slice(0, 2).map((c, i) => (
                <div key={i} className={clsx('text-xs leading-tight', p.muted)} title={c}>
                  · {c.length > 18 ? c.slice(0, 18) + '…' : c}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <span className={clsx('text-xs font-semibold px-2 py-0.5 rounded-full border', riskColor[decision.risk])}>
            <AlertTriangle className="w-2.5 h-2.5 inline mr-1" />
            {decision.risk} Risk
          </span>
          <span className="text-xs font-bold text-white/70">{decision.cost}</span>
        </div>

        {/* Owner + tags */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1.5">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0"
              style={{ background: `linear-gradient(135deg, ${p.accent}, ${p.accent}88)` }}
            >
              {decision.ownerAvatar}
            </div>
            <span className={clsx('text-xs', p.muted)}>{decision.owner.split(' ')[0]}</span>
          </div>
          <div className="flex gap-1">
            {decision.tags.slice(0, 2).map((tag) => (
              <span key={tag} className={clsx('text-[10px] px-1.5 py-0.5 rounded-md font-medium', p.badge)}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
