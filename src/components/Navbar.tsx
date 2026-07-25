import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sun, Moon, Bell, Keyboard, Plus, X, Menu } from 'lucide-react';
import clsx from 'clsx';

interface NavbarProps {
  onShowShortcuts: () => void;
}

export default function Navbar({ onShowShortcuts }: NavbarProps) {
  const { darkMode, toggleDarkMode, searchQuery, setSearchQuery, notifications, clearNotifications, currentPage, setCurrentPage, toggleMobileMenu } = useAppStore();
  const [showNotif, setShowNotif] = useState(false);

  const unread = notifications.filter((n) => !n.read).length;
  const border = darkMode ? 'border-white/8' : 'border-gray-200';
  const bg = darkMode ? 'bg-[#0a0a1a]' : 'bg-white';
  const inputBg = darkMode ? 'bg-white/6 border-white/10 text-white placeholder-white/30 focus:border-indigo-500/60' : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-indigo-400';
  const notifBg = darkMode ? 'bg-[#1a1a3e] border-white/10' : 'bg-white border-gray-200';

  const titles: Record<string, string> = {
    dashboard: 'Dashboard', workspace: 'Workspace', templates: 'Templates',
    analytics: 'Analytics', insights: 'AI Insights', team: 'Team', settings: 'Settings',
  };

  const typeColor = { info: 'bg-indigo-500', success: 'bg-emerald-500', warning: 'bg-amber-500' };

  return (
    <header className={clsx('flex items-center gap-2 md:gap-4 px-4 md:px-6 py-3 border-b shrink-0 transition-colors duration-300 z-20', bg, border)}>
      <button 
        onClick={toggleMobileMenu}
        className={clsx('md:hidden p-2 -ml-2 rounded-xl transition-colors', darkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-100 text-gray-800')}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Page title */}
      <div className="mr-2 hidden sm:block">
        <h1 className="text-base font-bold tracking-tight">{titles[currentPage] || 'DecisionOS'}</h1>
        <p className={clsx('text-xs', darkMode ? 'text-white/40' : 'text-gray-400')}>
          {currentPage === 'workspace' ? '6 active decisions' : 'Decision Intelligence Platform'}
        </p>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <Search className={clsx('absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4', darkMode ? 'text-white/30' : 'text-gray-400')} />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search decisions, templates…  ⌘K"
          className={clsx('w-full pl-10 pr-4 py-2 rounded-xl border text-sm outline-none transition-all', inputBg)}
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* New decision */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setCurrentPage('workspace');
            useAppStore.getState().setDecisionModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Decision</span>
        </motion.button>

        {/* Keyboard shortcuts */}
        <button
          onClick={onShowShortcuts}
          title="Keyboard Shortcuts"
          className={clsx('w-9 h-9 rounded-xl hidden sm:flex items-center justify-center border transition-all', darkMode ? 'border-white/10 text-white/50 hover:text-white hover:bg-white/8' : 'border-gray-200 text-gray-400 hover:text-gray-700 hover:bg-gray-50')}
        >
          <Keyboard className="w-4 h-4" />
        </button>

        {/* Dark mode toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleDarkMode}
          className={clsx('w-9 h-9 rounded-xl flex items-center justify-center border transition-all', darkMode ? 'border-white/10 text-amber-400 hover:bg-white/8' : 'border-gray-200 text-indigo-600 hover:bg-gray-50')}
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </motion.button>

        {/* Notifications */}
        <div className="relative">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowNotif(!showNotif)}
            className={clsx('w-9 h-9 rounded-xl flex items-center justify-center border transition-all relative', darkMode ? 'border-white/10 text-white/50 hover:text-white hover:bg-white/8' : 'border-gray-200 text-gray-400 hover:text-gray-700 hover:bg-gray-50')}
          >
            <Bell className="w-4 h-4" />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unread}
              </span>
            )}
          </motion.button>

          <AnimatePresence>
            {showNotif && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={clsx('absolute right-0 top-12 w-80 rounded-2xl border shadow-2xl z-50 overflow-hidden', notifBg)}
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-current/10">
                  <span className="font-semibold text-sm">Notifications</span>
                  <div className="flex gap-2">
                    <button onClick={clearNotifications} className="text-xs text-indigo-400 hover:text-indigo-300">Mark all read</button>
                    <button onClick={() => setShowNotif(false)}><X className="w-4 h-4 opacity-50" /></button>
                  </div>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className={clsx('flex gap-3 px-4 py-3 border-b border-current/5 transition-colors hover:bg-white/5', !n.read && (darkMode ? 'bg-indigo-500/8' : 'bg-indigo-50/80'))}>
                      <div className={clsx('w-2 h-2 rounded-full mt-1.5 shrink-0', typeColor[n.type])} />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">{n.title}</div>
                        <div className={clsx('text-xs mt-0.5', darkMode ? 'text-white/50' : 'text-gray-500')}>{n.message}</div>
                        <div className={clsx('text-xs mt-1', darkMode ? 'text-white/30' : 'text-gray-400')}>{n.time}</div>
                      </div>
                      {!n.read && <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0" />}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer ml-1 ring-2 ring-indigo-500/30">
          SB
        </div>
      </div>
    </header>
  );
}
