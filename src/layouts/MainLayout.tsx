
import { useAppStore } from '../store/useAppStore';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import NewDecisionModal from '../components/NewDecisionModal';
import { motion, AnimatePresence } from 'framer-motion';

interface MainLayoutProps {
  children: React.ReactNode;
  onShowShortcuts: () => void;
}

export default function MainLayout({ children, onShowShortcuts }: MainLayoutProps) {
  const { darkMode, currentPage, globalToastMsg } = useAppStore();
  const bg = darkMode ? 'bg-[#0d1117]' : 'bg-[#f0f2ff]';
  const textBase = darkMode ? 'text-white' : 'text-gray-900';

  return (
    <div className={`flex h-screen w-full overflow-hidden ${bg} ${textBase} transition-colors duration-300`}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onShowShortcuts={onShowShortcuts} />
        <main className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <NewDecisionModal />
      <AnimatePresence>
        {globalToastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/30"
          >
            {globalToastMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
