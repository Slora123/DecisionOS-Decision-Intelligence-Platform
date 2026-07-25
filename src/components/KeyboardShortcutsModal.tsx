import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { X, Command } from 'lucide-react';
import clsx from 'clsx';

const SHORTCUTS = [
  {
    section: 'Navigation',
    items: [
      { keys: ['⌘', 'K'], label: 'Open global search' },
      { keys: ['⌘', 'D'], label: 'Go to Dashboard' },
      { keys: ['⌘', 'W'], label: 'Go to Workspace' },
      { keys: ['⌘', '\\'], label: 'Toggle sidebar' },
    ],
  },
  {
    section: 'Canvas',
    items: [
      { keys: ['Space', '+', 'Drag'], label: 'Pan canvas' },
      { keys: ['⌘', '+'], label: 'Zoom in' },
      { keys: ['⌘', '-'], label: 'Zoom out' },
      { keys: ['⌘', '0'], label: 'Reset zoom' },
      { keys: ['⌘', 'Z'], label: 'Undo' },
      { keys: ['⌘', 'Shift', 'Z'], label: 'Redo' },
    ],
  },
  {
    section: 'Decisions',
    items: [
      { keys: ['⌘', 'N'], label: 'New decision card' },
      { keys: ['Del'], label: 'Delete selected card' },
      { keys: ['Esc'], label: 'Deselect / close panel' },
      { keys: ['⌘', 'E'], label: 'Export as PDF' },
    ],
  },
];

interface Props {
  onClose: () => void;
}

export default function KeyboardShortcutsModal({ onClose }: Props) {
  const { darkMode } = useAppStore();
  const overlayBg = 'bg-black/70 backdrop-blur-md';
  const modalBg = darkMode
    ? 'bg-[#12122a] border-indigo-500/30 text-white'
    : 'bg-white border-gray-200 text-gray-900';
  const sectionBg = darkMode
    ? 'bg-indigo-950/30 border border-indigo-500/15'
    : 'bg-gray-50 border border-gray-200';
  const keyBg = darkMode
    ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300 shadow-sm'
    : 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={clsx('fixed inset-0 z-50 flex items-center justify-center p-4', overlayBg)}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 10, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className={clsx('w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[85vh]', modalBg)}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={clsx('flex items-center justify-between px-6 py-5 border-b shrink-0', darkMode ? 'border-indigo-500/20 bg-gradient-to-r from-indigo-950/40 to-purple-950/40' : 'border-gray-100 bg-gray-50')}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Command className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-extrabold text-lg leading-tight tracking-tight">Keyboard Shortcuts</h2>
                <p className={clsx('text-xs font-medium mt-0.5', darkMode ? 'text-indigo-300' : 'text-indigo-600')}>Power user commands</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={clsx('p-2 rounded-xl transition-colors', darkMode ? 'hover:bg-white/10 text-white/60 hover:text-white' : 'hover:bg-gray-200 text-gray-500')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Shortcuts List */}
          <div className="overflow-y-auto p-6 space-y-4 flex-1">
            {SHORTCUTS.map((section) => (
              <div key={section.section} className={clsx('rounded-2xl p-4', sectionBg)}>
                <div className={clsx('text-xs font-bold uppercase tracking-widest mb-3', darkMode ? 'text-indigo-400' : 'text-indigo-600')}>
                  {section.section}
                </div>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className={clsx('text-sm font-medium', darkMode ? 'text-white/90' : 'text-gray-700')}>
                        {item.label}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {item.keys.map((key, i) => (
                          <span key={i} className={clsx('text-xs px-2.5 py-1 rounded-lg border font-mono font-bold', keyBg)}>
                            {key}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
