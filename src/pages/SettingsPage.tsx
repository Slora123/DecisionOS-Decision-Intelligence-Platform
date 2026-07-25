import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { Moon, Sun, Bell, Shield, Palette, Database, Download, ChevronRight, Check } from 'lucide-react';
import clsx from 'clsx';

function SettingRow({ icon: Icon, label, desc, children }: { icon: any; label: string; desc: string; children: React.ReactNode }) {
  const { darkMode } = useAppStore();
  return (
    <div className={clsx('flex items-center justify-between py-4 border-b', darkMode ? 'border-white/8' : 'border-gray-100')}>
      <div className="flex items-center gap-3">
        <div className={clsx('w-9 h-9 rounded-xl flex items-center justify-center', darkMode ? 'bg-white/6' : 'bg-gray-100')}>
          <Icon className="w-4 h-4 text-indigo-400" />
        </div>
        <div>
          <div className="font-semibold text-sm">{label}</div>
          <div className={clsx('text-xs', darkMode ? 'text-white/40' : 'text-gray-400')}>{desc}</div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className={clsx('relative w-10 h-5.5 rounded-full transition-colors', value ? 'bg-indigo-500' : 'bg-gray-500/30')}>
      <motion.div
        animate={{ x: value ? 20 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white shadow-md"
        style={{ width: 16, height: 16, top: 2 }}
      />
    </button>
  );
}

export default function SettingsPage() {
  const { darkMode, toggleDarkMode } = useAppStore();
  const [notifications, setNotifications] = useState(true);
  const [aiRec, setAiRec] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState('Main');

  const cardBg = darkMode ? 'bg-[#12122a] border-white/8' : 'bg-white border-gray-200 shadow-sm';
  const textMuted = darkMode ? 'text-white/50' : 'text-gray-500';

  const workspaces = ['Main', 'Q1 Planning', 'Product Roadmap', 'Personal'];

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6 max-w-3xl mx-auto">
      <div className="mb-2">
        <h2 className="text-2xl font-extrabold mb-1">Settings</h2>
        <p className={clsx('text-sm', textMuted)}>Customize your DecisionOS experience.</p>
      </div>

      {/* Appearance */}
      <div className={clsx('rounded-2xl border p-5', cardBg)}>
        <h3 className="font-bold mb-1">Appearance</h3>
        <p className={clsx('text-xs mb-4', textMuted)}>Personalize how DecisionOS looks and feels.</p>

        <SettingRow icon={darkMode ? Moon : Sun} label="Dark Mode" desc="Toggle between light and dark theme">
          <Toggle value={darkMode} onChange={toggleDarkMode} />
        </SettingRow>
        <SettingRow icon={Palette} label="Compact Mode" desc="Reduce padding and card sizes">
          <Toggle value={compactMode} onChange={() => setCompactMode(!compactMode)} />
        </SettingRow>
      </div>

      {/* Workspace */}
      <div className={clsx('rounded-2xl border p-5', cardBg)}>
        <h3 className="font-bold mb-1">Workspace</h3>
        <p className={clsx('text-xs mb-4', textMuted)}>Switch between your decision workspaces.</p>
        <div className="space-y-2">
          {workspaces.map((ws) => (
            <motion.button
              key={ws}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedWorkspace(ws)}
              className={clsx(
                'w-full flex items-center justify-between p-3 rounded-xl border text-sm font-medium transition-all',
                selectedWorkspace === ws
                  ? darkMode ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300' : 'bg-indigo-50 border-indigo-300 text-indigo-700'
                  : darkMode ? 'border-white/8 hover:bg-white/5' : 'border-gray-100 hover:bg-gray-50'
              )}
            >
              <span>{ws}</span>
              {selectedWorkspace === ws && <Check className="w-4 h-4 text-indigo-400" />}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className={clsx('rounded-2xl border p-5', cardBg)}>
        <h3 className="font-bold mb-1">Notifications</h3>
        <p className={clsx('text-xs mb-4', textMuted)}>Manage how and when you get notified.</p>
        <SettingRow icon={Bell} label="Push Notifications" desc="Get notified about decisions and comments">
          <Toggle value={notifications} onChange={() => setNotifications(!notifications)} />
        </SettingRow>
        <SettingRow icon={Shield} label="AI Recommendations" desc="Receive AI-powered decision suggestions">
          <Toggle value={aiRec} onChange={() => setAiRec(!aiRec)} />
        </SettingRow>
        <SettingRow icon={Database} label="Auto-Save" desc="Automatically save changes to the canvas">
          <Toggle value={autoSave} onChange={() => setAutoSave(!autoSave)} />
        </SettingRow>
      </div>

      {/* Account */}
      <div className={clsx('rounded-2xl border p-5', cardBg)}>
        <h3 className="font-bold mb-4">Account</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-xl shadow-indigo-500/30">
            SB
          </div>
          <div>
            <div className="font-bold">Slora Bar</div>
            <div className={clsx('text-sm', textMuted)}>slora@decisionos.ai</div>
            <div className="mt-1 text-xs font-semibold text-indigo-400 bg-indigo-500/15 px-2 py-0.5 rounded-full inline-block">Pro Plan</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {['Edit Profile', 'Change Password', 'Export Data', 'Delete Account'].map((action) => (
            <motion.button
              key={action}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={clsx(
                'px-4 py-2 rounded-xl text-sm font-medium border transition-all',
                action === 'Delete Account'
                  ? 'border-red-500/30 text-red-400 hover:bg-red-500/10'
                  : darkMode ? 'border-white/10 hover:bg-white/8' : 'border-gray-200 hover:bg-gray-50'
              )}
            >
              {action === 'Export Data' && <Download className="w-3.5 h-3.5 inline mr-1" />}
              {action}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Keyboard shortcuts */}
      <div className={clsx('rounded-2xl border p-5', cardBg)}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold mb-1">Keyboard Shortcuts</h3>
            <p className={clsx('text-xs', textMuted)}>View all available shortcuts for power users.</p>
          </div>
          <ChevronRight className={clsx('w-5 h-5', textMuted)} />
        </div>
      </div>
    </div>
  );
}
