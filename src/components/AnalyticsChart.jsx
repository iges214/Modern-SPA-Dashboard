import React, { useState } from 'react';
import { TrendingUp, BarChart2, Calendar, ArrowUpRight } from 'lucide-react';
import './AnalyticsChart.css';

export default function AnalyticsChart({ 
  data = [], 
  timeframe = '7d', 
  setTimeframe 
}) {
  const [activeMetric, setActiveMetric] = useState('revenue'); // 'revenue' | 'users'
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // SVG Chart Geometry
  const chartWidth = 700;
  const chartHeight = 240;
  const paddingX = 40;
  const paddingY = 30;

  const currentValues = data.map(item => item[activeMetric]);
  const maxValue = Math.max(...currentValues, 100);
  const minValue = Math.min(...currentValues, 0) * 0.85;

  const getX = (index) => {
    return paddingX + (index / (data.length - 1 || 1)) * (chartWidth - paddingX * 2);
  };

  const getY = (value) => {
    const range = maxValue - minValue || 1;
    return chartHeight - paddingY - ((value - minValue) / range) * (chartHeight - paddingY * 2);
  };

  // Generate cubic bezier curve path
  const generatePath = () => {
    if (data.length === 0) return '';
    return data.reduce((path, item, i) => {
      const x = getX(i);
      const y = getY(item[activeMetric]);
      if (i === 0) return `M ${x} ${y}`;
      const prevX = getX(i - 1);
      const prevY = getY(data[i - 1][activeMetric]);
      const controlX1 = prevX + (x - prevX) / 2;
      const controlX2 = controlX1;
      return `${path} C ${controlX1} ${prevY}, ${controlX2} ${y}, ${x} ${y}`;
    }, '');
  };

  // Generate target dashed curve
  const generateTargetPath = () => {
    if (data.length === 0) return '';
    return data.reduce((path, item, i) => {
      const x = getX(i);
      const targetVal = activeMetric === 'revenue' ? item.target : item.users * 0.9;
      const y = getY(targetVal);
      if (i === 0) return `M ${x} ${y}`;
      return `${path} L ${x} ${y}`;
    }, '');
  };

  const linePath = generatePath();
  const areaPath = linePath 
    ? `${linePath} L ${getX(data.length - 1)} ${chartHeight - paddingY} L ${getX(0)} ${chartHeight - paddingY} Z` 
    : '';

  const hoveredItem = hoveredIndex !== null ? data[hoveredIndex] : null;

  return (
    <div className="analytics-chart-card glass-panel">
      <div className="chart-header-row">
        <div className="chart-title-wrap">
          <div className="chart-icon-box">
            <BarChart2 size={18} />
          </div>
          <div>
            <h3 className="chart-heading">Performance Velocity</h3>
            <p className="chart-subheading">Real-time revenue telemetry and user acquisition throughput</p>
          </div>
        </div>

        <div className="chart-controls">
          {/* Metric Selector (Revenue / Users) */}
          <div className="chart-pill-selector">
            <button
              className={`pill-btn ${activeMetric === 'revenue' ? 'pill-btn-active' : ''}`}
              onClick={() => setActiveMetric('revenue')}
            >
              Revenue
            </button>
            <button
              className={`pill-btn ${activeMetric === 'users' ? 'pill-btn-active' : ''}`}
              onClick={() => setActiveMetric('users')}
            >
              Active Nodes
            </button>
          </div>

          {/* Timeframe Selector */}
          <div className="chart-timeframe-selector">
            {['7d', '30d', '90d'].map((tf) => (
              <button
                key={tf}
                className={`timeframe-btn ${timeframe === tf ? 'timeframe-btn-active' : ''}`}
                onClick={() => setTimeframe(tf)}
              >
                {tf.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main SVG Chart Container */}
      <div className="chart-svg-container">
        <svg 
          viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
          className="main-chart-svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary-500)" stopOpacity="0.45" />
              <stop offset="60%" stopColor="var(--accent-cyan)" stopOpacity="0.1" />
              <stop offset="100%" stopColor="var(--primary-500)" stopOpacity="0.0" />
            </linearGradient>

            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="var(--primary-500)" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Background Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
            const y = paddingY + pct * (chartHeight - paddingY * 2);
            return (
              <g key={idx}>
                <line 
                  x1={paddingX} 
                  y1={y} 
                  x2={chartWidth - paddingX} 
                  y2={y} 
                  stroke="var(--border-subtle)" 
                  strokeDasharray="4 4"
                />
              </g>
            );
          })}

          {/* Area Fill */}
          <path 
            d={areaPath} 
            fill="url(#chartGradient)" 
          />

          {/* Target Baseline (Dashed) */}
          <path 
            d={generateTargetPath()} 
            fill="none" 
            stroke="var(--text-muted)" 
            strokeWidth="1.5" 
            strokeDasharray="5 5"
            opacity="0.6"
          />

          {/* Primary Trend Line */}
          <path 
            d={linePath} 
            fill="none" 
            stroke="var(--primary-400)" 
            strokeWidth="3.2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter="url(#glow)"
          />

          {/* Interactive Data Points & Hover Area */}
          {data.map((item, index) => {
            const cx = getX(index);
            const cy = getY(item[activeMetric]);
            const isHovered = hoveredIndex === index;

            return (
              <g key={index} className="chart-node-group">
                {/* Invisible larger hover hit area */}
                <circle 
                  cx={cx} 
                  cy={cy} 
                  r="18" 
                  fill="transparent" 
                  className="hover-hitbox"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
                
                {/* Visible node circle */}
                <circle 
                  cx={cx} 
                  cy={cy} 
                  r={isHovered ? 6 : 4} 
                  className={`chart-point ${isHovered ? 'chart-point-active' : ''}`}
                />

                {isHovered && (
                  <line 
                    x1={cx} 
                    y1={paddingY} 
                    x2={cx} 
                    y2={chartHeight - paddingY} 
                    stroke="var(--primary-400)" 
                    strokeWidth="1" 
                    strokeDasharray="3 3"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip */}
        {hoveredItem && (
          <div 
            className="chart-tooltip glass-panel animate-fade-in"
            style={{ 
              left: `${(getX(hoveredIndex) / chartWidth) * 100}%`,
              top: `${(getY(hoveredItem[activeMetric]) / chartHeight) * 100}%`
            }}
          >
            <div className="tooltip-period">{hoveredItem.label}</div>
            <div className="tooltip-value">
              {activeMetric === 'revenue' ? `$${hoveredItem.revenue.toLocaleString()}` : `${hoveredItem.users.toLocaleString()} Nodes`}
            </div>
            <div className="tooltip-sub">
              Target: {activeMetric === 'revenue' ? `$${hoveredItem.target?.toLocaleString()}` : `${Math.round(hoveredItem.users * 0.9).toLocaleString()} Nodes`}
            </div>
          </div>
        )}
      </div>

      {/* Chart Footer with Key Insight Cards */}
      <div className="chart-insights-footer">
        <div className="insight-stat">
          <span className="insight-label">Baseline Target</span>
          <span className="insight-val font-mono">
            {activeMetric === 'revenue' ? '$185,000' : '40,000 Nodes'}
          </span>
        </div>
        <div className="insight-stat">
          <span className="insight-label">Velocity Margin</span>
          <span className="insight-val text-emerald font-mono">+16.4%</span>
        </div>
        <div className="insight-stat">
          <span className="insight-label">Ingress Reliability</span>
          <span className="insight-val text-cyan font-mono">99.98%</span>
        </div>
        <div className="insight-stat">
          <span className="insight-label">Run-rate Efficiency</span>
          <span className="insight-val text-violet font-mono">1.48x</span>
        </div>
      </div>
    </div>
  );
}
