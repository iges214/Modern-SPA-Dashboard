import React from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  FolderKanban, 
  Activity, 
  Users, 
  Settings, 
  ShieldCheck, 
  HelpCircle, 
  X,
  Server,
  Zap,
  HardDrive
} from 'lucide-react';
import './Sidebar.css';

export default function Sidebar({ 
  currentTab, 
  setCurrentTab, 
  isOpen, 
  onClose,
  projectsCount 
}) {
  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard, badge: null },
    { id: 'analytics', label: 'Live Analytics', icon: BarChart3, badge: 'Live' },
    { id: 'projects', label: 'Projects & Tasks', icon: FolderKanban, badge: projectsCount },
    { id: 'telemetry', label: 'System Health', icon: Activity, badge: null },
    { id: 'team', label: 'Engineering Team', icon: Users, badge: null },
    { id: 'settings', label: 'Settings', icon: Settings, badge: null }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="sidebar-backdrop" 
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar-container ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-mobile-header">
          <div className="sidebar-mobile-title">Menu Navigation</div>
          <button 
            className="btn-icon sidebar-close-btn" 
            onClick={onClose}
            aria-label="Close Sidebar"
          >
            <X size={18} />
          </button>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-section-title">CORE PLATFORM</div>
          <nav className="sidebar-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                  onClick={() => {
                    setCurrentTab(item.id);
                    if (window.innerWidth <= 768) {
                      onClose();
                    }
                  }}
                >
                  <div className="nav-link-icon-wrap">
                    <Icon size={19} className="nav-icon" />
                  </div>
                  <span className="nav-link-text">{item.label}</span>
                  {item.badge && (
                    <span className={`nav-badge ${item.badge === 'Live' ? 'nav-badge-live' : ''}`}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && <span className="nav-active-pill" />}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-section-title">INFRASTRUCTURE</div>
          <div className="infra-status-card glass-panel">
            <div className="infra-row">
              <div className="infra-label">
                <Server size={14} className="text-cyan" />
                <span>Edge Nodes</span>
              </div>
              <span className="infra-val text-emerald">18 / 18</span>
            </div>
            
            <div className="infra-row">
              <div className="infra-label">
                <HardDrive size={14} className="text-violet" />
                <span>Memory Pool</span>
              </div>
              <span className="infra-val">68.4%</span>
            </div>
            <div className="infra-bar">
              <div className="infra-bar-fill" style={{ width: '68.4%' }}></div>
            </div>

            <div className="infra-row">
              <div className="infra-label">
                <Zap size={14} className="text-amber" />
                <span>Network Ingress</span>
              </div>
              <span className="infra-val">1.4 GB/s</span>
            </div>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="help-widget">
            <div className="help-icon-wrap">
              <ShieldCheck size={20} />
            </div>
            <div className="help-text-wrap">
              <p className="help-title">Zero-Trust Active</p>
              <p className="help-desc">TLS 1.3 encrypted mesh</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
