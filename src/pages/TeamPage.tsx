import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { teamMembers, activityFeed } from '../data/mockData';
import { Users, MessageSquare, Network } from 'lucide-react';
import clsx from 'clsx';

export default function TeamPage() {
  const { darkMode } = useAppStore();
  const textMuted = darkMode ? 'text-white/50' : 'text-gray-500';
  const cardBg = darkMode ? 'bg-[#12122a] border-white/8' : 'bg-white border-gray-200 shadow-sm';

  const actTypeColor: Record<string, string> = {
    update: 'bg-indigo-500', connect: 'bg-purple-500',
    create: 'bg-emerald-500', decide: 'bg-amber-500', comment: 'bg-cyan-500',
  };

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      <div className="mb-2">
        <h2 className="text-2xl font-extrabold mb-1">Team Collaboration</h2>
        <p className={clsx('text-sm', textMuted)}>Your team, their decisions, and real-time activity.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Members */}
        <div className="lg:col-span-2">
          <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-400" /> Members ({teamMembers.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {teamMembers.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -3, scale: 1.02 }}
                className={clsx('rounded-2xl border p-4 flex items-center gap-4 cursor-pointer transition-all', cardBg)}
              >
                <div className="relative">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${m.color}, ${m.color}aa)` }}
                  >
                    {m.avatar}
                  </div>
                  <div className={clsx('absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-current', m.online ? 'bg-emerald-400' : 'bg-gray-500', darkMode ? 'border-[#12122a]' : 'border-white')} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm">{m.name}</div>
                  <div className={clsx('text-xs', textMuted)}>{m.role}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Network className="w-3 h-3 text-indigo-400" />
                    <span className="text-xs text-indigo-400 font-medium">{m.decisions} decisions</span>
                    {m.online ? (
                      <span className="text-xs text-emerald-400 font-medium">● Online</span>
                    ) : (
                      <span className={clsx('text-xs', textMuted)}>○ Offline</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div>
          <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-indigo-400" /> Activity
          </h3>
          <div className={clsx('rounded-2xl border p-4', cardBg)}>
            <div className="space-y-4">
              {activityFeed.map((act, i) => (
                <motion.div
                  key={act.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-3"
                >
                  <div className="relative shrink-0">
                    <div
                      className={clsx('w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold', actTypeColor[act.type] || 'bg-indigo-500')}
                    >
                      {act.avatar}
                    </div>
                    {i < activityFeed.length - 1 && (
                      <div className={clsx('absolute left-4 top-8 w-px h-4', darkMode ? 'bg-white/10' : 'bg-gray-200')} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 pb-4">
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
      </div>

      {/* Collaboration avatars cluster */}
      <div className={clsx('rounded-2xl border p-5', cardBg)}>
        <h3 className="font-bold mb-4">Currently Active</h3>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {teamMembers.filter((m) => m.online).map((m) => (
              <motion.div
                key={m.id}
                whileHover={{ zIndex: 10, scale: 1.15, y: -4 }}
                title={`${m.name} (${m.role})`}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 cursor-pointer shadow-lg relative"
                style={{ background: `linear-gradient(135deg, ${m.color}, ${m.color}99)`, borderColor: darkMode ? '#12122a' : '#fff' }}
              >
                {m.avatar}
              </motion.div>
            ))}
          </div>
          <div>
            <div className="font-semibold text-sm">{teamMembers.filter((m) => m.online).length} members online</div>
            <div className={clsx('text-xs', textMuted)}>Collaborating in real-time on the workspace</div>
          </div>
          <div className="ml-auto flex items-center gap-2 text-emerald-400 text-sm font-medium">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </div>
        </div>
      </div>
    </div>
  );
}
