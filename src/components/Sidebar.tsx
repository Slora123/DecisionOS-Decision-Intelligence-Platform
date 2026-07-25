import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import {
  LayoutDashboard, Network, FileText, Brain, BarChart3, Users, Settings,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import clsx from 'clsx';
import logoSrc from '../logo.png';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'workspace', label: 'Workspace', icon: Network },
  { id: 'templates', label: 'Templates', icon: FileText },
  { id: 'insights', label: 'AI Insights', icon: Brain },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const { currentPage, setCurrentPage, sidebarCollapsed, toggleSidebar, darkMode, mobileMenuOpen, setMobileMenuOpen } = useAppStore();

  const bg = darkMode
    ? 'bg-[#0a0a1a] border-white/8'
    : 'bg-white border-gray-200';
  const textMuted = darkMode ? 'text-white/40' : 'text-gray-400';
  const activeClass = darkMode
    ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
    : 'bg-indigo-50 text-indigo-600 border-indigo-200';
  const inactiveClass = darkMode
    ? 'text-white/50 hover:text-white hover:bg-white/6'
    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50';

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        animate={{ width: sidebarCollapsed ? 64 : 220 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={clsx(
          'flex flex-col border-r shrink-0 relative overflow-visible transition-colors duration-300 z-50 h-full',
          'fixed md:relative top-0 left-0 transition-transform duration-300',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          bg
        )}
      >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-current/8">
        <img
          src={logoSrc}
          alt="logo"
          className="w-8 h-8 object-contain shrink-0"
          style={{ filter: 'invert(1) hue-rotate(180deg) brightness(1.5) drop-shadow(0 0 6px rgba(99,102,241,0.7))', mixBlendMode: 'screen' }}
        />
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="font-bold text-base tracking-tight whitespace-nowrap font-['Plus_Jakarta_Sans']"
            >
              Slora Bar
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto overflow-x-hidden">
        {!sidebarCollapsed && (
          <div className={clsx('text-xs font-semibold uppercase tracking-widest px-3 mb-3', textMuted)}>
            Navigation
          </div>
        )}
        {NAV_ITEMS.map((item) => {
          const active = currentPage === item.id;
          return (
            <motion.button
              key={item.id}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setCurrentPage(item.id)}
              title={sidebarCollapsed ? item.label : undefined}
              className={clsx(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 sidebar-item',
                active ? activeClass : `${inactiveClass} border-transparent`
              )}
            >
              <item.icon className={clsx('w-4 h-4 shrink-0', active ? 'text-indigo-400' : '')} />
              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {active && !sidebarCollapsed && (
                <motion.div
                  layoutId="activeIndicator"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400"
                />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* User */}
      {!sidebarCollapsed && (
        <div className={clsx('p-4 border-t border-current/8')}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              SB
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate">Slora Bar</div>
              <div className={clsx('text-xs truncate', textMuted)}>CEO · Pro Plan</div>
            </div>
          </div>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={toggleSidebar}
        className={clsx(
          'absolute top-5 -right-3 w-6 h-6 rounded-full flex items-center justify-center border z-10 shadow-md transition-colors',
          darkMode ? 'bg-[#1a1a3e] border-white/20 text-white/60 hover:text-white' : 'bg-white border-gray-200 text-gray-400 hover:text-gray-700'
        )}
      >
        {sidebarCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </motion.aside>
    </>
  );
}
