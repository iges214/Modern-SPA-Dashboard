import React from 'react';
import { 
  Radio, 
  Terminal, 
  Server, 
  AlertTriangle, 
  CheckCircle2, 
  DollarSign, 
  RefreshCw,
  GitCommit,
  ArrowRight
} from 'lucide-react';
import './ActivityFeed.css';

export default function ActivityFeed({ activities, onSimulateEvent, isSimulating }) {
  const getEventIcon = (type) => {
    switch (type) {
      case 'deploy':
        return <GitCommit size={15} />;
      case 'alert':
        return <AlertTriangle size={15} />;
      case 'milestone':
        return <CheckCircle2 size={15} />;
      case 'payment':
        return <DollarSign size={15} />;
      default:
        return <Radio size={15} />;
    }
  };

  return (
    <div className="activity-card glass-panel">
      <div className="activity-header">
        <div className="activity-title-group">
          <div className="activity-icon-wrap">
            <Radio size={18} className="live-pulse-icon" />
          </div>
          <div>
            <h3 className="activity-heading">Live Telemetry & Logs</h3>
            <p className="activity-subheading">Event streams & automated microservice deployment audit</p>
          </div>
        </div>

        <button 
          className={`btn btn-secondary simulate-btn ${isSimulating ? 'simulating' : ''}`}
          onClick={onSimulateEvent}
          title="Emit simulated real-time event"
        >
          <RefreshCw size={14} className={isSimulating ? 'spinning' : ''} />
          <span>Simulate Ingress</span>
        </button>
      </div>

      <div className="timeline-container">
        {activities.map((item, index) => (
          <div key={item.id} className="timeline-item animate-fade-in" style={{ animationDelay: `${index * 60}ms` }}>
            <div className="timeline-node">
              <div 
                className="timeline-icon-box"
                style={{ 
                  color: item.iconColor, 
                  backgroundColor: `${item.iconColor}20`,
                  borderColor: `${item.iconColor}40`
                }}
              >
                {getEventIcon(item.type)}
              </div>
              {index < activities.length - 1 && <div className="timeline-line"></div>}
            </div>

            <div className="timeline-body">
              <div className="timeline-row-title">
                <span className="timeline-title">{item.title}</span>
                <span className="timeline-time">{item.time}</span>
              </div>
              <p className="timeline-desc">{item.description}</p>
              <div className="timeline-meta">
                <span className="timeline-author font-mono">{item.author}</span>
                <span className="timeline-dot">•</span>
                <span className="timeline-verified">Verified Signature</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="activity-footer">
        <div className="telemetry-bar-item">
          <div className="telemetry-label-row">
            <span>Cluster Core Load</span>
            <span className="font-mono text-emerald">41.8%</span>
          </div>
          <div className="telemetry-progress-bg">
            <div className="telemetry-progress-fill bg-emerald" style={{ width: '41.8%' }}></div>
          </div>
        </div>

        <div className="telemetry-bar-item">
          <div className="telemetry-label-row">
            <span>HTTP Ingress Success</span>
            <span className="font-mono text-cyan">99.98%</span>
          </div>
          <div className="telemetry-progress-bg">
            <div className="telemetry-progress-fill bg-cyan" style={{ width: '99.98%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
