import { motion } from 'framer-motion';
import type { DecisionCard } from '../types';
import { useAppStore } from '../store/useAppStore';
import { X, Brain, CheckCircle2, XCircle, AlertTriangle, Users, Calendar, Tag, MessageSquare, DollarSign, TrendingUp } from 'lucide-react';
import clsx from 'clsx';

interface InspectorPanelProps {
  decision: DecisionCard;
  onClose: () => void;
}

export default function InspectorPanel({ decision, onClose }: InspectorPanelProps) {
  const { darkMode } = useAppStore();

  const panelBg = darkMode ? 'bg-[#0e0e28] border-white/10' : 'bg-white border-gray-200';
  const textMuted = darkMode ? 'text-white/50' : 'text-gray-500';
  const sectionBg = darkMode ? 'bg-white/4 border-white/8' : 'bg-gray-50 border-gray-100';
  const aiBg = darkMode ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-indigo-50 border-indigo-200';

  const confidenceGradient = decision.confidence >= 80
    ? 'from-emerald-500 to-teal-400'
    : decision.confidence >= 60 ? 'from-amber-500 to-yellow-400' : 'from-red-500 to-orange-400';

  return (
    <motion.aside
      initial={{ x: 320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 320, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={clsx('w-80 border-l flex flex-col overflow-hidden shrink-0', panelBg)}
    >
      {/* Header */}
      <div className={clsx('flex items-center justify-between px-4 py-4 border-b', darkMode ? 'border-white/8' : 'border-gray-100')}>
        <div>
          <div className={clsx('text-xs font-semibold uppercase tracking-widest mb-1', textMuted)}>Inspector</div>
          <h2 className="font-bold text-sm leading-tight">{decision.title}</h2>
        </div>
        <button onClick={onClose} className={clsx('p-1.5 rounded-lg transition-colors', darkMode ? 'hover:bg-white/8 text-white/40' : 'hover:bg-gray-100 text-gray-400')}>
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* AI Recommendation */}
        <div className={clsx('rounded-xl p-4 border', aiBg)}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Brain className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-bold text-indigo-400">AI Recommendation</span>
          </div>
          <div className="mb-2">
            <div className={clsx('text-xs font-medium mb-1', textMuted)}>Recommended Action</div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-emerald-400">{decision.aiRecommendation}</span>
              <span className="text-xs font-bold text-indigo-400">{decision.aiConfidence}%</span>
            </div>
            <div className="mt-1 h-1 rounded-full bg-indigo-500/20 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${decision.aiConfidence}%` }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
              />
            </div>
          </div>
          <div className={clsx('text-xs mt-2 pt-2 border-t', darkMode ? 'border-indigo-500/20' : 'border-indigo-200')}>
            <span className={textMuted}>Alternative: </span>
            <span className="text-amber-400 font-medium">{decision.aiAlternative}</span>
          </div>
        </div>

        {/* Confidence */}
        <div className={clsx('rounded-xl p-4 border', sectionBg)}>
          <div className="flex items-center justify-between mb-2">
            <span className={clsx('text-xs font-semibold uppercase tracking-wider', textMuted)}>Confidence Score</span>
            <span className="font-bold text-lg text-indigo-400">{decision.confidence}%</span>
          </div>
          <div className={clsx('h-2 rounded-full overflow-hidden', darkMode ? 'bg-white/10' : 'bg-gray-200')}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${decision.confidence}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={clsx('h-full rounded-full bg-gradient-to-r', confidenceGradient)}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: AlertTriangle, label: 'Risk', value: decision.risk, color: decision.risk === 'Low' ? 'text-emerald-400' : decision.risk === 'Medium' ? 'text-amber-400' : 'text-red-400' },
            { icon: DollarSign, label: 'Cost', value: decision.cost, color: 'text-indigo-400' },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className={clsx('rounded-xl p-3 border', sectionBg)}>
              <div className="flex items-center gap-1.5 mb-1">
                <Icon className={clsx('w-3.5 h-3.5', color)} />
                <span className={clsx('text-xs', textMuted)}>{label}</span>
              </div>
              <div className={clsx('font-bold text-sm', color)}>{value}</div>
            </div>
          ))}
        </div>

        {/* Pros */}
        <div className={clsx('rounded-xl p-4 border', sectionBg)}>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Pros</span>
          </div>
          <div className="space-y-1.5">
            {decision.pros.map((p, i) => (
              <div key={i} className={clsx('text-xs flex items-start gap-2', darkMode ? 'text-white/70' : 'text-gray-600')}>
                <span className="text-emerald-400 mt-0.5">✓</span>
                {p}
              </div>
            ))}
          </div>
        </div>

        {/* Cons */}
        <div className={clsx('rounded-xl p-4 border', sectionBg)}>
          <div className="flex items-center gap-2 mb-3">
            <XCircle className="w-4 h-4 text-red-400" />
            <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">Cons</span>
          </div>
          <div className="space-y-1.5">
            {decision.cons.map((c, i) => (
              <div key={i} className={clsx('text-xs flex items-start gap-2', darkMode ? 'text-white/70' : 'text-gray-600')}>
                <span className="text-red-400 mt-0.5">✕</span>
                {c}
              </div>
            ))}
          </div>
        </div>

        {/* Dependencies */}
        <div className={clsx('rounded-xl p-4 border', sectionBg)}>
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Dependencies</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {decision.dependencies.map((dep) => (
              <span key={dep} className={clsx('text-xs px-2 py-1 rounded-lg font-medium', darkMode ? 'bg-purple-500/15 text-purple-300 border border-purple-500/20' : 'bg-purple-50 text-purple-700 border border-purple-200')}>
                {dep}
              </span>
            ))}
          </div>
        </div>

        {/* Meta */}
        <div className={clsx('rounded-xl p-4 border space-y-2', sectionBg)}>
          <div className="flex items-center justify-between text-xs">
            <span className={textMuted}><Calendar className="w-3 h-3 inline mr-1" />Due</span>
            <span className="font-medium">{decision.dueDate}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className={textMuted}><Users className="w-3 h-3 inline mr-1" />Owner</span>
            <span className="font-medium">{decision.owner}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className={textMuted}><TrendingUp className="w-3 h-3 inline mr-1" />Status</span>
            <span className={clsx('px-2 py-0.5 rounded-full text-xs font-semibold', decision.status === 'Decided' ? 'bg-emerald-500/20 text-emerald-400' : decision.status === 'In Review' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-gray-500/20 text-gray-400')}>
              {decision.status}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {decision.tags.map((tag) => (
            <span key={tag} className={clsx('text-xs px-2.5 py-1 rounded-full font-medium', darkMode ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/20' : 'bg-indigo-50 text-indigo-700 border border-indigo-200')}>
              <Tag className="w-2.5 h-2.5 inline mr-1" />
              {tag}
            </span>
          ))}
        </div>

        {/* Comments */}
        {decision.comments.length > 0 && (
          <div className={clsx('rounded-xl p-4 border', sectionBg)}>
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Comments ({decision.comments.length})</span>
            </div>
            <div className="space-y-3">
              {decision.comments.map((c) => (
                <div key={c.id} className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-[8px] font-bold shrink-0">
                    {c.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold">{c.author}</span>
                      <span className={clsx('text-[10px]', textMuted)}>{c.time}</span>
                    </div>
                    <p className={clsx('text-xs mt-0.5 leading-relaxed', darkMode ? 'text-white/60' : 'text-gray-600')}>{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.aside>
  );
}
