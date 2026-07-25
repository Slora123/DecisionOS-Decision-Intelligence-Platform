import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { analyticsData } from '../data/mockData';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { TrendingUp, Target, Zap, Clock, LayoutDashboard, CheckCircle } from 'lucide-react';
import clsx from 'clsx';

const KPI_CARDS = [
  { label: 'Total Decisions', value: '117', icon: LayoutDashboard, delta: '+12%', color: 'indigo' },
  { label: 'Avg Confidence', value: '82%', icon: Target, delta: '+5%', color: 'purple' },
  { label: 'This Month', value: '21', icon: TrendingUp, delta: '+10%', color: 'emerald' },
  { label: 'Success Rate', value: '87%', icon: CheckCircle, delta: '+3%', color: 'amber' },
  { label: 'Avg Time', value: '4.2d', icon: Clock, delta: '-0.8d', color: 'cyan' },
  { label: 'Workspaces', value: '8', icon: Zap, delta: '+2', color: 'rose' },
];

const colorMap: Record<string, { bg: string; text: string; border: string; fill: string }> = {
  indigo: { bg: 'bg-indigo-500/15', text: 'text-indigo-400', border: 'border-indigo-500/30', fill: '#6366F1' },
  purple: { bg: 'bg-purple-500/15', text: 'text-purple-400', border: 'border-purple-500/30', fill: '#8B5CF6' },
  emerald: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30', fill: '#10B981' },
  amber: { bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/30', fill: '#F59E0B' },
  cyan: { bg: 'bg-cyan-500/15', text: 'text-cyan-400', border: 'border-cyan-500/30', fill: '#06B6D4' },
  rose: { bg: 'bg-rose-500/15', text: 'text-rose-400', border: 'border-rose-500/30', fill: '#F43F5E' },
};

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { darkMode } = useAppStore();
  return (
    <div className={clsx('rounded-2xl border p-5 transition-colors', darkMode ? 'bg-[#12122a] border-white/8' : 'bg-white border-gray-200 shadow-sm', className)}>
      {children}
    </div>
  );
}

const tooltipStyle = (darkMode: boolean) => ({
  contentStyle: {
    background: darkMode ? '#1a1a3e' : '#fff',
    border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e2e8f0',
    borderRadius: '12px',
    color: darkMode ? '#fff' : '#1a1a3e',
    fontSize: 12,
  },
  cursor: { fill: 'rgba(99,102,241,0.08)' },
});

export default function AnalyticsPage() {
  const { darkMode } = useAppStore();
  const textMuted = darkMode ? 'text-white/50' : 'text-gray-500';
  const axisColor = darkMode ? 'rgba(255,255,255,0.25)' : '#94a3b8';

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {KPI_CARDS.map((kpi, i) => {
          const c = colorMap[kpi.color];
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -3, scale: 1.02 }}
              className={clsx('rounded-2xl border p-4 transition-all cursor-default', c.bg, c.border, darkMode ? '' : 'bg-opacity-50')}
            >
              <div className={clsx('w-8 h-8 rounded-xl flex items-center justify-center mb-3', c.bg, 'border', c.border)}>
                <kpi.icon className={clsx('w-4 h-4', c.text)} />
              </div>
              <div className="text-2xl font-extrabold mb-0.5">{kpi.value}</div>
              <div className={clsx('text-xs', textMuted)}>{kpi.label}</div>
              <div className={clsx('text-xs font-semibold mt-1', c.text)}>{kpi.delta} vs last month</div>
            </motion.div>
          );
        })}
      </div>

      {/* Row 1 charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <h3 className="font-bold text-sm mb-4">Success Rate Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={analyticsData.successRate}>
              <defs>
                <linearGradient id="successGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.05)' : '#f1f5f9'} />
              <XAxis dataKey="month" tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} domain={[60, 100]} />
              <Tooltip {...tooltipStyle(darkMode)} />
              <Area type="monotone" dataKey="rate" stroke="#6366F1" strokeWidth={2.5} fill="url(#successGrad)" dot={{ fill: '#6366F1', r: 4 }} activeDot={{ r: 6 }} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="font-bold text-sm mb-4">Decision Distribution</h3>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie data={analyticsData.decisionDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                  {analyticsData.decisionDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip {...tooltipStyle(darkMode)} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {analyticsData.decisionDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                    <span className={clsx('text-xs', textMuted)}>{item.name}</span>
                  </div>
                  <span className="text-xs font-bold">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Row 2 charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <h3 className="font-bold text-sm mb-4">Risk Analysis by Month</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={analyticsData.riskAnalysis} barSize={14} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.05)' : '#f1f5f9'} />
              <XAxis dataKey="month" tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyle(darkMode)} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="low" fill="#10B981" radius={[4, 4, 0, 0]} name="Low" />
              <Bar dataKey="medium" fill="#F59E0B" radius={[4, 4, 0, 0]} name="Medium" />
              <Bar dataKey="high" fill="#EF4444" radius={[4, 4, 0, 0]} name="High" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="font-bold text-sm mb-4">Monthly Decisions</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={analyticsData.monthlyDecisions} barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.05)' : '#f1f5f9'} />
              <XAxis dataKey="month" tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyle(darkMode)} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} name="Decisions">
                {analyticsData.monthlyDecisions.map((_, i) => (
                  <Cell key={i} fill={`hsl(${240 + i * 10}, 70%, ${60 + i * 3}%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Confidence trend */}
      <Card>
        <h3 className="font-bold text-sm mb-4">Confidence Trend Over Time</h3>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={analyticsData.confidenceTrend}>
            <defs>
              <linearGradient id="confGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.05)' : '#f1f5f9'} />
            <XAxis dataKey="month" tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} domain={[60, 100]} />
            <Tooltip {...tooltipStyle(darkMode)} />
            <Line type="monotone" dataKey="confidence" stroke="url(#confGrad)" strokeWidth={3} dot={{ fill: '#8B5CF6', r: 5, strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 7 }} name="Confidence %" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
