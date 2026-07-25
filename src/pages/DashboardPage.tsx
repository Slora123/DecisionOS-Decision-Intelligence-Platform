import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { activityFeed } from '../data/mockData';
import { Target, CheckCircle, Clock, ArrowRight, Star, Zap, Network } from 'lucide-react';
import clsx from 'clsx';

function StatCard({ label, value, delta, color, icon: Icon }: any) {
  const { darkMode } = useAppStore();
  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    indigo: { bg: 'bg-indigo-500/15', text: 'text-indigo-400', border: 'border-indigo-500/30' },
    purple: { bg: 'bg-purple-500/15', text: 'text-purple-400', border: 'border-purple-500/30' },
    emerald: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30' },
    amber: { bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/30' },
  };
  const c = colorMap[color];
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={clsx('rounded-2xl border p-5 transition-all', darkMode ? 'bg-[#12122a] border-white/8' : 'bg-white border-gray-200 shadow-sm')}
    >
      <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center mb-3 border', c.bg, c.border)}>
        <Icon className={clsx('w-5 h-5', c.text)} />
      </div>
      <div className="text-3xl font-extrabold mb-1">{value}</div>
      <div className={clsx('text-sm mb-1', darkMode ? 'text-white/60' : 'text-gray-500')}>{label}</div>
      <div className={clsx('text-xs font-semibold', c.text)}>{delta} from last month</div>
    </motion.div>
  );
}

export default function DashboardPage() {
  const { darkMode, setCurrentPage, decisions } = useAppStore();
  const textMuted = darkMode ? 'text-white/50' : 'text-gray-500';
  const cardBg = darkMode ? 'bg-[#12122a] border-white/8' : 'bg-white border-gray-200 shadow-sm';
  const favorites = decisions.filter((d) => d.favorite);

  const actTypeColor: Record<string, string> = {
    update: 'bg-indigo-500',
    connect: 'bg-purple-500',
    create: 'bg-emerald-500',
    decide: 'bg-amber-500',
    comment: 'bg-cyan-500',
  };

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      {/* Welcome banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl overflow-hidden p-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 shadow-xl shadow-indigo-500/20"
      >
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="text-white/70 text-sm mb-1">Good afternoon,</div>
            <h2 className="text-2xl font-extrabold text-white mb-1">Slora Bar</h2>
            <p className="text-white/70 text-sm">You have 4 decisions awaiting review and 2 AI recommendations ready.</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage('workspace')}
            className="flex items-center gap-2 px-5 py-2.5 bg-white/20 rounded-xl text-white font-semibold text-sm border border-white/30 hover:bg-white/30 transition-all backdrop-blur-sm"
          >
            Open Canvas <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Decisions" value="117" delta="+12%" color="indigo" icon={Network} />
        <StatCard label="Avg Confidence" value="82%" delta="+5pts" color="purple" icon={Target} />
        <StatCard label="Success Rate" value="87%" delta="+3%" color="emerald" icon={CheckCircle} />
        <StatCard label="Avg Time" value="4.2d" delta="-0.8d" color="amber" icon={Clock} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Decisions */}
        <div className={clsx('lg:col-span-2 rounded-2xl border p-5', cardBg)}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Recent Decisions</h3>
            <button onClick={() => setCurrentPage('workspace')} className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {decisions.slice(0, 4).map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setCurrentPage('workspace')}
                className={clsx('flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all', darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50')}
              >
                <div className={clsx('w-2 h-2 rounded-full shrink-0', d.risk === 'Low' ? 'bg-emerald-400' : d.risk === 'Medium' ? 'bg-amber-400' : 'bg-red-400')} />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">{d.title}</div>
                  <div className={clsx('text-xs', textMuted)}>{d.owner} · {d.status}</div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {d.favorite && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                  <span className="text-xs font-bold text-indigo-400">{d.confidence}%</span>
                  <span className={clsx('text-xs px-2 py-0.5 rounded-full font-medium', d.risk === 'Low' ? 'bg-emerald-500/20 text-emerald-400' : d.risk === 'Medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400')}>
                    {d.risk}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className={clsx('rounded-2xl border p-5', cardBg)}>
          <h3 className="font-bold mb-4">Activity Feed</h3>
          <div className="space-y-3">
            {activityFeed.slice(0, 5).map((act, i) => (
              <motion.div
                key={act.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-3"
              >
                <div className="relative">
                  <div className={clsx('w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0', actTypeColor[act.type] || 'bg-indigo-500')}>
                    {act.avatar}
                  </div>
                  {i < 4 && <div className={clsx('absolute left-3.5 top-7 w-px h-3', darkMode ? 'bg-white/10' : 'bg-gray-200')} />}
                </div>
                <div className="flex-1 min-w-0 pb-3">
                  <p className={clsx('text-xs leading-relaxed', darkMode ? 'text-white/70' : 'text-gray-600')}>
                    <span className="font-semibold">{act.user}</span> {act.action}
                  </p>
                  <span className={clsx('text-[10px]', textMuted)}>{act.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Favorites + Quick AI */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Favorites */}
        <div className={clsx('rounded-2xl border p-5', cardBg)}>
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <h3 className="font-bold">Favorites</h3>
          </div>
          {favorites.length === 0 ? (
            <p className={clsx('text-sm', textMuted)}>No favorites yet. Star decisions to pin them here.</p>
          ) : (
            <div className="space-y-2">
              {favorites.map((d) => (
                <div key={d.id} onClick={() => setCurrentPage('workspace')} className={clsx('flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all', darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50')}>
                  <div>
                    <div className="font-semibold text-sm">{d.title}</div>
                    <div className={clsx('text-xs', textMuted)}>{d.status} · {d.priority} Priority</div>
                  </div>
                  <span className="text-sm font-bold text-indigo-400">{d.confidence}%</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick AI panel */}
        <div className={clsx('rounded-2xl border p-5', cardBg)}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <h3 className="font-bold">AI Quick Insights</h3>
          </div>
          <div className="space-y-3">
            {decisions.slice(0, 3).map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className={clsx('p-3 rounded-xl border', darkMode ? 'bg-indigo-500/8 border-indigo-500/20' : 'bg-indigo-50 border-indigo-200')}
              >
                <div className="font-semibold text-xs mb-1">{d.title}</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-emerald-400 font-medium">→ {d.aiRecommendation}</span>
                  <span className="text-xs font-bold text-indigo-400">{d.aiConfidence}% AI conf.</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
