import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { Brain, TrendingUp, AlertTriangle, CheckCircle2, Zap, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

export default function AIInsightsPage() {
  const { darkMode } = useAppStore();
  const textMuted = darkMode ? 'text-white/50' : 'text-gray-500';
  const cardBg = darkMode ? 'bg-[#12122a] border-white/8' : 'bg-white border-gray-200 shadow-sm';
  const aiBg = darkMode ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-indigo-50 border-indigo-200';

  const insights = [
    {
      type: 'recommendation',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/15',
      border: 'border-emerald-500/30',
      title: 'Proceed with Product Launch',
      desc: 'Based on 87% confidence, market analysis, and team readiness — DecisionOS recommends proceeding with the v2 launch within Q1.',
      decision: 'Launch Product v2',
      confidence: 92,
    },
    {
      type: 'risk',
      icon: AlertTriangle,
      color: 'text-amber-400',
      bg: 'bg-amber-500/15',
      border: 'border-amber-500/30',
      title: 'APAC Expansion Carries Elevated Risk',
      desc: 'Regulatory complexity in Indonesia and currency volatility in the region suggest a phased entry. Consider Singapore-first strategy.',
      decision: 'Market Expansion – APAC',
      confidence: 78,
    },
    {
      type: 'opportunity',
      icon: TrendingUp,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/15',
      border: 'border-indigo-500/30',
      title: 'Series B Timing is Optimal',
      desc: 'Current market conditions, investor appetite for AI-first products, and your ARR growth make now the ideal window for a Series B raise.',
      decision: 'Series B Fundraise',
      confidence: 84,
    },
    {
      type: 'recommendation',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/15',
      border: 'border-emerald-500/30',
      title: 'Hire VP Engineering Immediately',
      desc: 'Leadership gap is becoming a bottleneck. 91% confidence that hiring a VP Engineering now will unlock 2x velocity on your roadmap.',
      decision: 'Key Engineering Hire',
      confidence: 95,
    },
    {
      type: 'cost',
      icon: Zap,
      color: 'text-purple-400',
      bg: 'bg-purple-500/15',
      border: 'border-purple-500/30',
      title: 'Buy Data Pipeline (Fivetran)',
      desc: 'Build vs buy analysis shows Fivetran saves 6 months of dev time and reduces maintenance overhead by 80%. ROI positive in 3 months.',
      decision: 'Buy vs Build: Data Pipeline',
      confidence: 89,
    },
  ];

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      {/* AI Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={clsx('relative rounded-2xl overflow-hidden p-6 border', aiBg)}
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full -translate-y-12 translate-x-12 blur-3xl" />
        <div className="relative flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-500/30">
            <Brain className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold mb-1">AI Decision Intelligence</h2>
            <p className={clsx('text-sm', textMuted)}>Real-time recommendations powered by pattern analysis across all your decisions.</p>
          </div>
          <div className="ml-auto text-right">
            <div className="text-3xl font-extrabold text-indigo-400">5</div>
            <div className={clsx('text-xs', textMuted)}>Active insights</div>
          </div>
        </div>
      </motion.div>

      {/* Insights List */}
      <div className="space-y-4">
        {insights.map((ins, i) => (
          <motion.div
            key={ins.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ x: 4 }}
            className={clsx('rounded-2xl border p-5 flex gap-4 cursor-pointer transition-all', cardBg)}
          >
            <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border', ins.bg, ins.border)}>
              <ins.icon className={clsx('w-5 h-5', ins.color)} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-1">
                <h3 className="font-bold text-sm">{ins.title}</h3>
                <span className={clsx('text-xs font-bold shrink-0', ins.color)}>{ins.confidence}% conf.</span>
              </div>
              <p className={clsx('text-xs leading-relaxed mb-2', textMuted)}>{ins.desc}</p>
              <div className="flex items-center gap-2">
                <span className={clsx('text-xs px-2 py-0.5 rounded-full font-medium border', ins.bg, ins.border, ins.color)}>
                  {ins.decision}
                </span>
                <button className={clsx('text-xs flex items-center gap-1 font-medium', ins.color)}>
                  Explore <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pattern Summary */}
      <div className={clsx('rounded-2xl border p-5', cardBg)}>
        <h3 className="font-bold mb-4">Decision Patterns Detected</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'High-Impact Clusters', value: '3 clusters', desc: 'Launch, Finance & Hiring are interconnected', color: 'indigo' },
            { label: 'Risk Concentration', value: 'Medium-High', desc: 'APAC & Series B carry compounded risk', color: 'amber' },
            { label: 'Decision Velocity', value: '↑ 23%', desc: 'Team is deciding 23% faster than last quarter', color: 'emerald' },
          ].map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className={clsx('rounded-xl p-4 border', darkMode ? 'bg-white/4 border-white/8' : 'bg-gray-50 border-gray-100')}
            >
              <div className="text-lg font-extrabold text-indigo-400 mb-1">{p.value}</div>
              <div className="font-semibold text-xs mb-1">{p.label}</div>
              <div className={clsx('text-xs', textMuted)}>{p.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
