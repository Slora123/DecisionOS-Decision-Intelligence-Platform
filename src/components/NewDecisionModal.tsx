import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lightbulb, TrendingUp, Rocket, Briefcase, Settings, Check } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import clsx from 'clsx';
import type { Risk, Priority, DecisionCard, Connection } from '../types';

const PRESET_COLORS = ['#6366F1', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#06B6D4', '#F43F5E', '#8B5CF6'];
const PRESET_ICONS = [
  { id: 'lightbulb', icon: Lightbulb },
  { id: 'trending', icon: TrendingUp },
  { id: 'rocket', icon: Rocket },
  { id: 'briefcase', icon: Briefcase },
  { id: 'settings', icon: Settings }
];

export default function NewDecisionModal() {
  const { isNewDecisionModalOpen, setDecisionModalOpen, addDecision, addConnection, decisions, setGlobalToastMsg, darkMode, setSelectedCardId, canvasTransform } = useAppStore();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Business');
  const [priority, setPriority] = useState<Priority>('High');
  const [risk, setRisk] = useState<Risk>('Medium');
  const [costRaw, setCostRaw] = useState(50000);
  const [confidence, setConfidence] = useState(85);
  const [owner, setOwner] = useState('John Smith');
  const [dueDate, setDueDate] = useState('2026-08-15');
  const [selectedDeps, setSelectedDeps] = useState<string[]>([]);
  
  const [color, setColor] = useState(PRESET_COLORS[0]);
  const [iconId, setIconId] = useState(PRESET_ICONS[0].id);

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isNewDecisionModalOpen) {
      setTimeout(() => titleRef.current?.focus(), 100);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setDecisionModalOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isNewDecisionModalOpen, setDecisionModalOpen]);

  if (!isNewDecisionModalOpen) return null;

  const bg = darkMode ? 'bg-[#0d1117] border-white/10' : 'bg-white border-gray-200';
  const inputBg = darkMode ? 'bg-white/5 border-white/10 focus:border-indigo-500 text-white' : 'bg-gray-50 border-gray-200 focus:border-indigo-500 text-gray-900';
  const labelColor = darkMode ? 'text-white/70' : 'text-gray-700';

  const handleCreate = () => {
    if (!title.trim()) {
      setGlobalToastMsg('❌ Title is required.');
      return;
    }

    const id = `decision-${Date.now()}`;
    const formattedCost = `₹${costRaw.toLocaleString('en-IN')}`;
    const tags = [category];

    const newCard: DecisionCard = {
      id,
      title,
      description,
      pros: [],
      cons: [],
      risk,
      cost: formattedCost,
      costRaw,
      dependencies: selectedDeps,
      confidence,
      tags,
      owner,
      ownerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
      dueDate,
      priority,
      status: 'Draft',
      color,
      icon: iconId,
      x: -canvasTransform.x / canvasTransform.scale + window.innerWidth / (2 * canvasTransform.scale) - 150,
      y: -canvasTransform.y / canvasTransform.scale + window.innerHeight / (2 * canvasTransform.scale) - 100,
      aiRecommendation: 'Awaiting AI Analysis...',
      aiAlternative: '',
      aiConfidence: 0,
      favorite: false,
      comments: [],
      createdAt: new Date().toISOString().split('T')[0]
    };

    addDecision(newCard);
    
    // Auto draw lines for dependencies
    selectedDeps.forEach(depId => {
      const conn: Connection = {
        id: `conn-${depId}-${id}`,
        from: depId,
        to: id
      };
      addConnection(conn);
    });
    
    setSelectedCardId(id);
    setDecisionModalOpen(false);
    setGlobalToastMsg('✅ Decision created successfully.');

    // Reset state
    setTitle('');
    setDescription('');
    setCategory('Business');
    setPriority('High');
    setRisk('Medium');
    setCostRaw(50000);
    setConfidence(85);
    setOwner('John Smith');
    setDueDate('2026-08-15');
    setSelectedDeps([]);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={() => setDecisionModalOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className={clsx('relative w-full max-w-2xl rounded-2xl shadow-2xl border flex flex-col max-h-[90vh]', bg)}
      >
        <div className="flex items-center justify-between p-5 border-b border-current/10 shrink-0">
          <h2 className="text-xl font-bold">New Decision</h2>
          <button onClick={() => setDecisionModalOpen(false)} className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label className={clsx('block text-xs font-bold mb-1.5', labelColor)}>Decision Title *</label>
              <input
                ref={titleRef}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Launch AI Chatbot"
                className={clsx('w-full px-4 py-2.5 rounded-xl border outline-none transition-colors font-medium', inputBg)}
              />
            </div>
            <div>
              <label className={clsx('block text-xs font-bold mb-1.5', labelColor)}>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={clsx('w-full px-4 py-2.5 rounded-xl border outline-none transition-colors appearance-none cursor-pointer', inputBg)}
              >
                <option value="Business">Business</option>
                <option value="Finance">Finance</option>
                <option value="HR">HR</option>
                <option value="Technology">Technology</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className={clsx('text-xs font-bold', labelColor)}>Description</label>
              <span className={clsx('text-xs', description.length > 500 ? 'text-red-400' : 'text-gray-400')}>
                {description.length} / 500
              </span>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, 500))}
              placeholder="Brief explanation of the decision..."
              rows={3}
              className={clsx('w-full px-4 py-3 rounded-xl border outline-none transition-colors resize-none', inputBg)}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className={clsx('block text-xs font-bold mb-2', labelColor)}>Accent Color</label>
              <div className="flex items-center gap-2">
                {PRESET_COLORS.map(c => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className="w-6 h-6 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                    style={{ backgroundColor: c }}
                  >
                    {color === c && <Check className="w-3 h-3 text-white" />}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={clsx('block text-xs font-bold mb-2', labelColor)}>Node Icon</label>
              <div className="flex items-center gap-2">
                {PRESET_ICONS.map(pi => (
                  <button
                    key={pi.id}
                    onClick={() => setIconId(pi.id)}
                    className={clsx(
                      'w-8 h-8 rounded-lg flex items-center justify-center transition-all border',
                      iconId === pi.id ? 'bg-indigo-500 text-white border-indigo-500' : darkMode ? 'border-white/10 hover:bg-white/5' : 'border-gray-200 hover:bg-gray-100'
                    )}
                  >
                    <pi.icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={clsx('block text-xs font-bold mb-1.5', labelColor)}>Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className={clsx('w-full px-3 py-2 rounded-xl border outline-none appearance-none', inputBg)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Critical/Urgent</option>
              </select>
            </div>
            <div>
              <label className={clsx('block text-xs font-bold mb-1.5', labelColor)}>Risk Level</label>
              <select
                value={risk}
                onChange={(e) => setRisk(e.target.value as Risk)}
                className={clsx('w-full px-3 py-2 rounded-xl border outline-none appearance-none', inputBg)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <div>
              <label className={clsx('block text-xs font-bold mb-1.5', labelColor)}>Est. Cost (₹)</label>
              <input
                type="number"
                value={costRaw}
                onChange={(e) => setCostRaw(Number(e.target.value))}
                className={clsx('w-full px-3 py-2 rounded-xl border outline-none', inputBg)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className={clsx('text-xs font-bold', labelColor)}>Confidence Level</label>
              <span className="text-xs font-bold text-indigo-500">{confidence}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={confidence}
              onChange={(e) => setConfidence(Number(e.target.value))}
              className="w-full accent-indigo-500 h-2 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={clsx('block text-xs font-bold mb-1.5', labelColor)}>Owner</label>
              <input
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                className={clsx('w-full px-3 py-2 rounded-xl border outline-none', inputBg)}
              />
            </div>
            <div>
              <label className={clsx('block text-xs font-bold mb-1.5', labelColor)}>Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className={clsx('w-full px-3 py-2 rounded-xl border outline-none', inputBg)}
              />
            </div>
          </div>

          <div>
            <label className={clsx('block text-xs font-bold mb-1.5', labelColor)}>Dependencies (Optional)</label>
            <div className={clsx('w-full p-2 rounded-xl border max-h-32 overflow-y-auto space-y-1', inputBg)}>
              {decisions.length === 0 && <div className="text-xs text-gray-500 p-1">No existing decisions.</div>}
              {decisions.map(d => (
                <label key={d.id} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedDeps.includes(d.id)}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedDeps([...selectedDeps, d.id]);
                      else setSelectedDeps(selectedDeps.filter(id => id !== d.id));
                    }}
                    className="rounded border-gray-300 text-indigo-500 focus:ring-indigo-500 bg-transparent"
                  />
                  <span className="text-sm truncate font-medium">{d.title}</span>
                </label>
              ))}
            </div>
          </div>

        </div>

        <div className="flex items-center justify-end gap-3 p-5 border-t border-current/10 shrink-0">
          <button
            onClick={() => setDecisionModalOpen(false)}
            className={clsx('px-5 py-2.5 rounded-xl text-sm font-bold border transition-colors', darkMode ? 'border-white/10 hover:bg-white/5' : 'border-gray-200 hover:bg-gray-50')}
          >
            ❌ Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!title.trim()}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-bold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
          >
            ✅ Create Decision
          </button>
        </div>
      </motion.div>
    </div>
  );
}
