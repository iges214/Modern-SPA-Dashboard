import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import './StatCard.css';

export default function StatCard({ 
  title, 
  value, 
  change, 
  isPositive, 
  subtext, 
  icon: Icon, 
  color = 'indigo', 
  trend = [] 
}) {
  // Generate SVG path for sparkline
  const minVal = Math.min(...trend, 0);
  const maxVal = Math.max(...trend, 1);
  const range = maxVal - minVal || 1;
  const width = 120;
  const height = 36;
  
  const points = trend.map((v, i) => {
    const x = (i / (trend.length - 1 || 1)) * width;
    const y = height - ((v - minVal) / range) * (height - 8) - 4;
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = points ? `0,${height} ${points} ${width},${height}` : '';

  return (
    <div className={`stat-card glass-panel glass-panel-interactive border-${color}`}>
      <div className="stat-card-header">
        <span className="stat-card-title">{title}</span>
        <div className={`stat-icon-wrapper bg-${color}`}>
          <Icon size={18} />
        </div>
      </div>

      <div className="stat-card-body">
        <div className="stat-val-row">
          <span className="stat-value">{value}</span>
          <span className={`stat-change-pill ${isPositive ? 'pill-positive' : 'pill-negative'}`}>
            {isPositive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
            <span>{change}</span>
          </span>
        </div>
        
        <div className="stat-card-footer">
          <span className="stat-subtext">{subtext}</span>
          
          {trend.length > 0 && (
            <div className="sparkline-wrapper">
              <svg 
                viewBox={`0 0 ${width} ${height}`} 
                className="sparkline-svg"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={`var(--accent-${color === 'indigo' ? 'violet' : color})`} stopOpacity="0.45" />
                    <stop offset="100%" stopColor={`var(--accent-${color === 'indigo' ? 'violet' : color})`} stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <polygon 
                  points={areaPoints} 
                  fill={`url(#grad-${color})`} 
                />
                <polyline 
                  points={points} 
                  fill="none" 
                  stroke={`var(--accent-${color === 'indigo' ? 'violet' : color})`} 
                  strokeWidth="2.2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
