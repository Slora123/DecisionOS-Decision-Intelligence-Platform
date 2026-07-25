import { useAppStore } from './store/useAppStore';
import LandingPage from './pages/LandingPage';
import WorkspacePage from './pages/WorkspacePage';
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import TemplatesPage from './pages/TemplatesPage';
import TeamPage from './pages/TeamPage';
import SettingsPage from './pages/SettingsPage';
import AIInsightsPage from './pages/AIInsightsPage';
import MainLayout from './layouts/MainLayout';
import KeyboardShortcutsModal from './components/KeyboardShortcutsModal';
import { useState } from 'react';

export default function App() {
  const { currentPage, darkMode } = useAppStore();
  const [showShortcuts, setShowShortcuts] = useState(false);

  if (currentPage === 'landing') {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <LandingPage />
      </div>
    );
  }

  const pageMap: Record<string, React.ReactNode> = {
    dashboard: <DashboardPage />,
    workspace: <WorkspacePage />,
    templates: <TemplatesPage />,
    analytics: <AnalyticsPage />,
    insights: <AIInsightsPage />,
    team: <TeamPage />,
    settings: <SettingsPage />,
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <MainLayout onShowShortcuts={() => setShowShortcuts(true)}>
        {pageMap[currentPage] || <DashboardPage />}
      </MainLayout>
      {showShortcuts && <KeyboardShortcutsModal onClose={() => setShowShortcuts(false)} />}
    </div>
  );
}
