import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import AnalyticsChart from './components/AnalyticsChart';
import ProjectTable from './components/ProjectTable';
import ActivityFeed from './components/ActivityFeed';
import NewProjectModal from './components/NewProjectModal';
import Toast from './components/Toast';

import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Activity, 
  Sparkles, 
  Download, 
  Share2, 
  RefreshCw,
  Server,
  ShieldCheck,
  Cpu,
  Layers,
  CheckCircle2,
  HardDrive
} from 'lucide-react';

import { 
  initialMetrics, 
  chartSeriesData, 
  initialProjects, 
  initialActivities, 
  initialNotifications 
} from './data/mockData';

import './App.css';

export default function App() {
  // Theme state with localStorage persistence
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('pulsecraft_theme') || 'dark';
  });

  // Navigation & View State
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [timeframe, setTimeframe] = useState('7d');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);

  // Stateful Data
  const [projects, setProjects] = useState(initialProjects);
  const [activities, setActivities] = useState(initialActivities);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [toast, setToast] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Sync theme attribute with DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('pulsecraft_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // State mutation: Toggle project status
  const handleToggleProjectStatus = (id) => {
    setProjects(prev => prev.map(p => {
      if (p.id === id) {
        const nextStatus = p.status === 'Completed' ? 'In Progress' : 'Completed';
        const nextProgress = nextStatus === 'Completed' ? 100 : 75;
        showToast(`Status of ${p.name} updated to "${nextStatus}"`);
        return { ...p, status: nextStatus, progress: nextProgress };
      }
      return p;
    }));
  };

  // State mutation: Delete project
  const handleDeleteProject = (id) => {
    const target = projects.find(p => p.id === id);
    setProjects(prev => prev.filter(p => p.id !== id));
    showToast(`Initiative ${target ? target.name : id} archived`, 'info');
  };

  // State mutation: Create new project
  const handleCreateProject = (newProject) => {
    setProjects(prev => [newProject, ...prev]);
    showToast(`New Initiative "${newProject.name}" initiated successfully!`);
    
    // Add to activity stream
    setActivities(prev => [
      {
        id: `act-${Date.now()}`,
        type: 'milestone',
        title: `Workstream initiated: ${newProject.name}`,
        description: `Allocated ${newProject.budget} to ${newProject.client}`,
        time: 'Just now',
        author: 'Sandra Ighoyivwi',
        iconColor: '#10b981'
      },
      ...prev
    ]);
  };

  // State mutation: Simulate real-time telemetry event
  const handleSimulateEvent = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const mockEvents = [
        {
          type: 'alert',
          title: 'Automated Canary Health Probe Succeeded',
          description: 'Regional latency dropped below 38ms threshold across all zones.',
          author: 'Telemetry Agent',
          iconColor: '#06b6d4'
        },
        {
          type: 'deploy',
          title: 'Hotfix patch deployed to Gateway Mesh',
          description: 'Mitigated cache invalidation surge with zero packet loss.',
          author: 'Devon Vance',
          iconColor: '#8b5cf6'
        },
        {
          type: 'payment',
          title: 'New API Tier Invoiced',
          description: 'HyperLogistics increased monthly compute quota to 12,000 req/s.',
          author: 'Stripe Webhook',
          iconColor: '#10b981'
        }
      ];

      const randomEvent = mockEvents[Math.floor(Math.random() * mockEvents.length)];
      const newAct = {
        id: `act-${Date.now()}`,
        ...randomEvent,
        time: 'Just now'
      };

      setActivities(prev => [newAct, ...prev.slice(0, 7)]);
      setIsSimulating(false);
      showToast('Live event received & processed in telemetry log');
    }, 700);
  };

  // Notifications handlers
  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read');
  };

  const handleDismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    showToast('Notification dismissed', 'info');
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
    showToast('All notifications cleared', 'info');
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const currentMetrics = initialMetrics[timeframe];
  const currentChartData = chartSeriesData[timeframe];

  return (
    <div className="app-shell">
      {/* Top Navbar */}
      <Navbar 
        theme={theme}
        toggleTheme={toggleTheme}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenNewProject={() => setIsNewProjectOpen(true)}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        notifications={notifications}
        onMarkAllNotificationsRead={handleMarkAllRead}
        onDismissNotification={handleDismissNotification}
        onClearAllNotifications={handleClearAllNotifications}
        unreadCount={unreadCount}
      />

      {/* Main Layout Body */}
      <div className="app-body">
        {/* Navigation Sidebar */}
        <Sidebar 
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          projectsCount={projects.length}
        />

        {/* Dynamic Main View Area */}
        <main className="main-content-view animate-fade-in" key={currentTab}>
          {currentTab === 'dashboard' && (
            <div className="dashboard-layout">
              {/* Header Hero Banner */}
              <div className="view-hero-banner glass-panel">
                <div className="hero-text-wrap">
                  <div className="hero-badge">
                    <Sparkles size={13} className="text-violet" />
                    <span>Intelligent Command Surface</span>
                  </div>
                  <h1 className="hero-title">Welcome back, Sandra</h1>
                  <p className="hero-description">
                    All distributed systems operational. Production cluster throughput increased by{' '}
                    <strong className="text-emerald">+14.2%</strong> over the selected window.
                  </p>
                </div>

                <div className="hero-actions-wrap">
                  <div className="timeframe-switch-pill">
                    {['7d', '30d', '90d'].map((tf) => (
                      <button
                        key={tf}
                        className={`tf-pill-btn ${timeframe === tf ? 'tf-pill-active' : ''}`}
                        onClick={() => setTimeframe(tf)}
                      >
                        {tf.toUpperCase()}
                      </button>
                    ))}
                  </div>

                  <button 
                    className="btn btn-secondary" 
                    onClick={() => showToast('Telemetry report exported to CSV')}
                  >
                    <Download size={15} />
                    <span>Export</span>
                  </button>
                </div>
              </div>

              {/* Dynamic 4-Stat Metric Cards */}
              <div className="stat-cards-grid">
                <StatCard 
                  title="Total Gross Revenue"
                  value={currentMetrics.revenue.value}
                  change={currentMetrics.revenue.change}
                  isPositive={currentMetrics.revenue.isPositive}
                  subtext="vs. previous cycle"
                  icon={DollarSign}
                  color="indigo"
                  trend={currentMetrics.revenue.trend}
                />

                <StatCard 
                  title="Active Cloud Nodes"
                  value={currentMetrics.users.value}
                  change={currentMetrics.users.change}
                  isPositive={currentMetrics.users.isPositive}
                  subtext="active compute pods"
                  icon={Users}
                  color="cyan"
                  trend={currentMetrics.users.trend}
                />

                <StatCard 
                  title="Conversion Rate"
                  value={currentMetrics.conversion.value}
                  change={currentMetrics.conversion.change}
                  isPositive={currentMetrics.conversion.isPositive}
                  subtext="pipeline completion"
                  icon={TrendingUp}
                  color="emerald"
                  trend={currentMetrics.conversion.trend}
                />

                <StatCard 
                  title="Edge Ingress Latency"
                  value={currentMetrics.avgLatency.value}
                  change={currentMetrics.avgLatency.change}
                  isPositive={currentMetrics.avgLatency.isPositive}
                  subtext="global mean p95"
                  icon={Activity}
                  color="amber"
                  trend={currentMetrics.avgLatency.trend}
                />
              </div>

              {/* Two Column Layout: Chart & Activity Feed */}
              <div className="dashboard-split-grid">
                <div className="split-left">
                  <AnalyticsChart 
                    data={currentChartData}
                    timeframe={timeframe}
                    setTimeframe={setTimeframe}
                  />
                </div>
                <div className="split-right">
                  <ActivityFeed 
                    activities={activities}
                    onSimulateEvent={handleSimulateEvent}
                    isSimulating={isSimulating}
                  />
                </div>
              </div>

              {/* Initiatives & Workstreams Table */}
              <div className="dashboard-full-width">
                <ProjectTable 
                  projects={projects}
                  onToggleStatus={handleToggleProjectStatus}
                  onDeleteProject={handleDeleteProject}
                  searchQuery={searchQuery}
                  onOpenNewProject={() => setIsNewProjectOpen(true)}
                />
              </div>
            </div>
          )}

          {/* Alternative Tab: Live Analytics */}
          {currentTab === 'analytics' && (
            <div className="analytics-view-layout">
              <div className="view-hero-banner glass-panel">
                <div>
                  <h1 className="hero-title">Live Pipeline Analytics</h1>
                  <p className="hero-description">Deep-dive system profiling, traffic distribution, and resource consumption</p>
                </div>
                <button className="btn btn-primary" onClick={handleSimulateEvent}>
                  <RefreshCw size={15} />
                  <span>Refresh Telemetry</span>
                </button>
              </div>

              <AnalyticsChart 
                data={currentChartData}
                timeframe={timeframe}
                setTimeframe={setTimeframe}
              />

              <div className="regional-distribution-grid">
                <div className="glass-panel regional-card">
                  <h3 className="section-title">Regional Ingress Breakdown</h3>
                  <div className="distribution-list">
                    <div className="distribution-item">
                      <div className="dist-label"><span>us-east-1 (N. Virginia)</span><span className="font-mono">48.2%</span></div>
                      <div className="dist-bar"><div className="dist-fill bg-indigo" style={{ width: '48.2%' }}></div></div>
                    </div>
                    <div className="distribution-item">
                      <div className="dist-label"><span>eu-central-1 (Frankfurt)</span><span className="font-mono">29.4%</span></div>
                      <div className="dist-bar"><div className="dist-fill bg-cyan" style={{ width: '29.4%' }}></div></div>
                    </div>
                    <div className="distribution-item">
                      <div className="dist-label"><span>ap-southeast-1 (Singapore)</span><span className="font-mono">16.1%</span></div>
                      <div className="dist-bar"><div className="dist-fill bg-violet" style={{ width: '16.1%' }}></div></div>
                    </div>
                    <div className="distribution-item">
                      <div className="dist-label"><span>sa-east-1 (São Paulo)</span><span className="font-mono">6.3%</span></div>
                      <div className="dist-bar"><div className="dist-fill bg-amber" style={{ width: '6.3%' }}></div></div>
                    </div>
                  </div>
                </div>

                <div className="glass-panel regional-card">
                  <h3 className="section-title">Cache Hit Ratios</h3>
                  <div className="stat-val-big font-mono text-emerald">99.42%</div>
                  <p className="hero-description">Edge workers serving 94.6M static & compute cached responses daily.</p>
                  <div className="mini-badge-row">
                    <span className="badge badge-emerald">0.02% TTFB Variance</span>
                    <span className="badge badge-cyan">Brotli 11 Active</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Alternative Tab: Projects & Workstreams */}
          {currentTab === 'projects' && (
            <div className="projects-view-layout">
              <div className="view-hero-banner glass-panel">
                <div>
                  <h1 className="hero-title">Initiatives & Projects</h1>
                  <p className="hero-description">Manage teams, sprint allocations, and production releases</p>
                </div>
                <button className="btn btn-primary" onClick={() => setIsNewProjectOpen(true)}>
                  <span>+ New Initiative</span>
                </button>
              </div>

              <ProjectTable 
                projects={projects}
                onToggleStatus={handleToggleProjectStatus}
                onDeleteProject={handleDeleteProject}
                searchQuery={searchQuery}
                onOpenNewProject={() => setIsNewProjectOpen(true)}
              />
            </div>
          )}

          {/* Alternative Tab: System Health & Telemetry */}
          {currentTab === 'telemetry' && (
            <div className="telemetry-view-layout">
              <div className="view-hero-banner glass-panel">
                <div>
                  <h1 className="hero-title">System Health & Telemetry</h1>
                  <p className="hero-description">Real-time health probes, packet inspection, and error budgets</p>
                </div>
                <div className="system-status-chip">
                  <span className="live-indicator"></span>
                  <span>Mesh Healthy</span>
                </div>
              </div>

              <div className="stat-cards-grid">
                <div className="glass-panel stat-card">
                  <span className="stat-card-title">Memory Allocation</span>
                  <span className="stat-value font-mono">34.2 GB / 64 GB</span>
                  <div className="infra-bar"><div className="infra-bar-fill" style={{ width: '53.4%' }}></div></div>
                </div>
                <div className="glass-panel stat-card">
                  <span className="stat-card-title">CPU Compute Saturation</span>
                  <span className="stat-value font-mono text-emerald">28.4%</span>
                  <div className="infra-bar"><div className="infra-bar-fill" style={{ width: '28.4%' }}></div></div>
                </div>
                <div className="glass-panel stat-card">
                  <span className="stat-card-title">TLS Handshake Time</span>
                  <span className="stat-value font-mono text-cyan">4.2ms</span>
                  <div className="infra-bar"><div className="infra-bar-fill" style={{ width: '12%' }}></div></div>
                </div>
                <div className="glass-panel stat-card">
                  <span className="stat-card-title">Error Budget Consumed</span>
                  <span className="stat-value font-mono text-amber">1.12%</span>
                  <div className="infra-bar"><div className="infra-bar-fill" style={{ width: '11.2%' }}></div></div>
                </div>
              </div>

              <ActivityFeed 
                activities={activities}
                onSimulateEvent={handleSimulateEvent}
                isSimulating={isSimulating}
              />
            </div>
          )}

          {/* Alternative Tab: Team */}
          {currentTab === 'team' && (
            <div className="team-view-layout">
              <div className="view-hero-banner glass-panel">
                <div>
                  <h1 className="hero-title">Engineering Squad</h1>
                  <p className="hero-description">Core infrastructure engineers, architects, and collaborators</p>
                </div>
              </div>

              <div className="team-cards-grid">
                {[
                
                  { name: 'Sandra Ighoyivwi', role: 'Software Engineering', status: 'Online', avatar: '/images/profileImg.jpg', commits: 142 },
                  { name: 'Elena Rostova', role: 'Staff SRE Engineer', status: 'In Review', avatar: '/images/lady.jfif', commits: 98 },
                  { name: 'Marcus Chen', role: 'Distributed Systems Lead', status: 'Online', avatar: '/images/man1.jfif', commits: 184 },
                  { name: 'Devon Vance', role: 'Security Architect', status: 'In Standup', avatar: '/images/man2.jfif', commits: 76 }
                ].map((member, i) => (
                  <div key={i} className="glass-panel team-member-card">
                    <img src={member.avatar} alt={member.name} className="team-member-avatar" />
                    <h3 className="team-member-name">{member.name}</h3>
                    <p className="team-member-role">{member.role}</p>
                    <div className="team-member-badge-row">
                      <span className="badge badge-emerald">{member.status}</span>
                      <span className="badge badge-indigo">{member.commits} PRs merged</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Alternative Tab: Settings */}
          {currentTab === 'settings' && (
            <div className="settings-view-layout">
              <div className="view-hero-banner glass-panel">
                <div>
                  <h1 className="hero-title">Platform Preferences</h1>
                  <p className="hero-description">Configure interface themes, webhooks, and telemetry intervals</p>
                </div>
              </div>

              <div className="glass-panel settings-section-card">
                <h3 className="section-title">Appearance & Theme</h3>
                <p className="section-desc">Choose your preferred visual mode for PulseCraft.</p>
                <div className="theme-toggle-options">
                  <button 
                    className={`theme-option-box ${theme === 'dark' ? 'active-theme-box' : ''}`}
                    onClick={() => setTheme('dark')}
                  >
                    <strong>Obsidian Dark</strong>
                    <span>Deep OLED contrast with glowing neon accents</span>
                  </button>
                  <button 
                    className={`theme-option-box ${theme === 'light' ? 'active-theme-box' : ''}`}
                    onClick={() => setTheme('light')}
                  >
                    <strong>Porcelain Light</strong>
                    <span>Crisp, high-readability daylight workspace</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* New Project Modal */}
      <NewProjectModal 
        isOpen={isNewProjectOpen}
        onClose={() => setIsNewProjectOpen(false)}
        onCreateProject={handleCreateProject}
      />

      {/* Floating Toast Notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
}
