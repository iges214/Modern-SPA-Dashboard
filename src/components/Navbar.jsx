import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  Plus, 
  Menu, 
  X, 
  CheckCircle2, 
  Cpu, 
  ChevronDown,
  Layers,
  Sparkles,
  Trash2,
  CheckCheck
} from 'lucide-react';
import './Navbar.css';

export default function Navbar({ 
  theme, 
  toggleTheme, 
  searchQuery, 
  setSearchQuery, 
  onOpenNewProject,
  onToggleSidebar,
  notifications = [],
  onMarkAllNotificationsRead,
  onDismissNotification,
  onClearAllNotifications,
  unreadCount = 0
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close menus when clicking anywhere outside on the dashboard
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedOutsideNotif = notifRef.current && !notifRef.current.contains(event.target);
      const clickedOutsideProfile = profileRef.current && !profileRef.current.contains(event.target);

      if (clickedOutsideNotif && clickedOutsideProfile) {
        setShowNotifications(false);
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Mutually exclusive toggle handlers
  const handleToggleNotifications = () => {
    setShowNotifications((prev) => {
      const next = !prev;
      if (next) setShowProfileMenu(false);
      return next;
    });
  };

  const handleToggleProfileMenu = () => {
    setShowProfileMenu((prev) => {
      const next = !prev;
      if (next) setShowNotifications(false);
      return next;
    });
  };

  const handleDismissItem = (id, e) => {
    e.stopPropagation();
    if (onDismissNotification) {
      onDismissNotification(id);
    }
  };

  return (
    <header className="navbar-container">
      <div className="navbar-left">
        <button 
          className="btn-icon mobile-toggle-btn" 
          onClick={onToggleSidebar}
          aria-label="Toggle Navigation Menu"
        >
          <Menu size={20} />
        </button>

        <div className="navbar-brand">
          <div className="brand-logo-glow">
            <Layers className="brand-icon" size={24} />
          </div>
          <div className="brand-text-wrap">
            <span className="brand-title">PulseCraft</span>
            <span className="brand-tag">PRO</span>
          </div>
        </div>

        <div className="system-status-chip">
          <span className="live-indicator"></span>
          <span className="system-status-text">Production Mesh Active</span>
          <span className="system-status-ping">18ms</span>
        </div>
      </div>

      <div className="navbar-center">
        <div className="search-bar-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search projects, services, metrics..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <kbd className="search-shortcut">/</kbd>
        </div>
      </div>

      <div className="navbar-right">
        <button 
          className="btn btn-primary new-project-btn" 
          onClick={onOpenNewProject}
        >
          <Plus size={16} />
          <span>New Project</span>
        </button>

        {/* Theme Toggle Button */}
        <button 
          className="btn-icon theme-toggle-btn" 
          onClick={toggleTheme}
          aria-label="Toggle Color Theme"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun size={19} className="theme-icon-sun" /> : <Moon size={19} className="theme-icon-moon" />}
        </button>

        {/* Notifications Popover Trigger */}
        <div className="relative-wrapper" ref={notifRef}>
          <button 
            className={`btn-icon notif-bell-btn ${showNotifications ? 'btn-icon-active' : ''}`}
            onClick={handleToggleNotifications}
            aria-label="View notifications"
          >
            <Bell size={19} />
            {unreadCount > 0 && (
              <span className="notif-badge">{unreadCount}</span>
            )}
          </button>

          {showNotifications && (
            <div className="dropdown-menu notif-dropdown animate-fade-in">
              <div className="notif-header">
                <div className="notif-header-title-group">
                  {/* <h4 className="notif-title">Notifications</h4> */}
                  {unreadCount > 0 ? (
                    <span className="badge badge-indigo notif-count-badge">{unreadCount} new</span>
                  ) : (
                    <span className="badge badge-emerald notif-count-badge">Caught up</span>
                  )}
                </div>

                <div className="notif-header-actions">
                  {unreadCount > 0 && onMarkAllNotificationsRead && (
                    <button 
                      className="notif-action-btn"
                      onClick={onMarkAllNotificationsRead}
                      title="Mark all as read"
                    >
                      <CheckCheck size={14} />
                      <span>Mark read</span>
                    </button>
                  )}
                  {notifications.length > 0 && onClearAllNotifications && (
                    <button 
                      className="notif-action-btn notif-action-clear"
                      onClick={onClearAllNotifications}
                      title="Clear all notifications"
                    >
                      <Trash2 size={13} />
                      <span>Clear</span>
                    </button>
                  )}
                  <button 
                    className="notif-close-x"
                    onClick={() => setShowNotifications(false)}
                    aria-label="Close notification menu"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              <div className="notif-list">
                {notifications.length === 0 ? (
                  <div className="notif-empty-state">
                    <CheckCircle2 size={32} className="text-emerald" />
                    <p className="notif-empty-title">All caught up!</p>
                    <span className="notif-empty-sub">No unread alerts or notifications at this time.</span>
                  </div>
                ) : (
                  notifications.map((item) => (
                    <div key={item.id} className={`notif-item ${!item.read ? 'notif-item-unread' : ''}`}>
                      <div className="notif-item-content">
                        <div className="notif-item-title-row">
                          <span className="notif-item-title">{item.title}</span>
                          <span className="notif-item-time">{item.time}</span>
                        </div>
                        <p className="notif-item-desc">{item.message}</p>
                      </div>
                      <button 
                        className="notif-item-dismiss-btn"
                        onClick={(e) => handleDismissItem(item.id, e)}
                        title="Dismiss notification"
                        aria-label="Dismiss notification"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill */}
        <div className="relative-wrapper" ref={profileRef}>
          <button 
            className={`user-profile-btn ${showProfileMenu ? 'user-profile-active' : ''}`}
            onClick={handleToggleProfileMenu}
          >
            <div className="user-avatar-wrap">
              <img 
                src="/images/profileImg.jpg" 
                alt="Sandra Ighoyivwi" 
                className="user-avatar"
              />
              <span className="user-online-dot"></span>
            </div>
            <div className="user-meta">
              <span className="user-name">Sandra Ighoyivwi</span>
              <span className="user-role">Software Engineering</span>
            </div>
            <ChevronDown size={14} className={`user-chevron ${showProfileMenu ? 'chevron-rotated' : ''}`} />
          </button>

          {showProfileMenu && (
            <div className="dropdown-menu profile-dropdown animate-fade-in">
              <div className="profile-dropdown-header">
                <div className="profile-dropdown-user">
                  <p className="profile-name">Sandra Ighoyivwi</p>
                  <p className="profile-email">[EMAIL_ADDRESS]</p>
                </div>
                <button 
                  className="notif-close-x"
                  onClick={() => setShowProfileMenu(false)}
                  aria-label="Close profile menu"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="profile-divider"></div>

              <div className="profile-plan-box">
                <div className="profile-plan-header">
                  <Sparkles size={14} className="sparkle-icon" />
                  <span>Enterprise Plan</span>
                </div>
                <div className="profile-plan-bar">
                  <div className="profile-plan-fill" style={{ width: '82%' }}></div>
                </div>
                <p className="profile-plan-detail">8.2k / 10k compute credits used</p>
              </div>

              <div className="profile-divider"></div>
              <button className="dropdown-action" onClick={() => setShowProfileMenu(false)}>Account Settings</button>
              <button className="dropdown-action" onClick={() => setShowProfileMenu(false)}>API & Webhooks</button>
              <button className="dropdown-action text-rose" onClick={() => setShowProfileMenu(false)}>Sign Out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
