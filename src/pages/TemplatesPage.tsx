import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { mockTemplates } from '../data/mockData';
import { ArrowRight, Search, Star, Network } from 'lucide-react';
import clsx from 'clsx';

export default function TemplatesPage() {
  const { darkMode, setCurrentPage, loadTemplate } = useAppStore();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const textMuted = darkMode ? 'text-white/50' : 'text-gray-500';

  const filtered = mockTemplates.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="h-full overflow-y-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold mb-1">Decision Templates</h2>
        <p className={clsx('text-sm', textMuted)}>Start with a proven framework. Click any template to open it in the workspace.</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md mb-6">
        <Search className={clsx('absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4', textMuted)} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search templates…"
          className={clsx('w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-all', darkMode ? 'bg-white/6 border-white/10 text-white placeholder-white/30 focus:border-indigo-500/60' : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400 focus:border-indigo-400')}
        />
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((template, i) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setSelected(template.id);
              loadTemplate(template.id);
              setCurrentPage('workspace');
            }}
            className={clsx(
              'rounded-2xl border p-5 cursor-pointer transition-all duration-200 group relative overflow-hidden',
              selected === template.id
                ? 'border-indigo-500/60 ring-2 ring-indigo-500/20'
                : darkMode
                  ? 'bg-[#12122a] border-white/8 hover:border-white/20'
                  : 'bg-white border-gray-200 hover:border-indigo-300 shadow-sm',
              'card-shadow'
            )}
          >
            {/* Gradient accent */}
            <div
              className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
              style={{ background: `linear-gradient(90deg, ${template.color}, ${template.color}88)` }}
            />

            {/* Icon */}
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-lg"
              style={{ background: `${template.color}20`, border: `1px solid ${template.color}40` }}
            >
              {template.icon}
            </div>

            <h3 className="font-bold text-base mb-2">{template.title}</h3>
            <p className={clsx('text-xs leading-relaxed mb-4', textMuted)}>{template.description}</p>

            {/* Stats */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <Network className={clsx('w-3.5 h-3.5', textMuted)} />
                <span className={clsx('text-xs', textMuted)}>{template.decisions} decisions</span>
              </div>
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {template.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                  style={{ background: `${template.color}15`, color: template.color, border: `1px solid ${template.color}30` }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div
              className="flex items-center gap-2 text-xs font-semibold group-hover:gap-3 transition-all"
              style={{ color: template.color }}
            >
              Use Template
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
