export const initialMetrics = {
  '7d': {
    revenue: { value: '$34,920', change: '+12.4%', isPositive: true, trend: [28, 31, 29, 34, 32, 38, 42] },
    users: { value: '8,420', change: '+9.1%', isPositive: true, trend: [1200, 1150, 1340, 1420, 1380, 1510, 1620] },
    conversion: { value: '4.18%', change: '+0.8%', isPositive: true, trend: [3.8, 3.9, 3.85, 4.0, 4.05, 4.1, 4.18] },
    avgLatency: { value: '42ms', change: '-14.3%', isPositive: true, trend: [58, 54, 49, 46, 44, 43, 42] }
  },
  '30d': {
    revenue: { value: '$148,650', change: '+18.2%', isPositive: true, trend: [110, 118, 125, 132, 139, 142, 148] },
    users: { value: '32,490', change: '+14.6%', isPositive: true, trend: [24, 26, 27, 29, 30, 31, 32.5] },
    conversion: { value: '3.94%', change: '+1.4%', isPositive: true, trend: [3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.94] },
    avgLatency: { value: '45ms', change: '-8.5%', isPositive: true, trend: [55, 52, 50, 48, 47, 46, 45] }
  },
  '90d': {
    revenue: { value: '$462,800', change: '+24.5%', isPositive: true, trend: [320, 345, 370, 400, 420, 445, 462] },
    users: { value: '98,200', change: '+28.3%', isPositive: true, trend: [68, 72, 78, 83, 89, 93, 98] },
    conversion: { value: '3.75%', change: '-0.3%', isPositive: false, trend: [3.9, 3.85, 3.8, 3.78, 3.76, 3.75, 3.75] },
    avgLatency: { value: '48ms', change: '-5.2%', isPositive: true, trend: [56, 54, 52, 51, 50, 49, 48] }
  }
};

export const chartSeriesData = {
  '7d': [
    { label: 'Mon', revenue: 4200, users: 1200, target: 3800 },
    { label: 'Tue', revenue: 4800, users: 1350, target: 4000 },
    { label: 'Wed', revenue: 4500, users: 1290, target: 4100 },
    { label: 'Thu', revenue: 5600, users: 1580, target: 4300 },
    { label: 'Fri', revenue: 5900, users: 1720, target: 4500 },
    { label: 'Sat', revenue: 6400, users: 1910, target: 4600 },
    { label: 'Sun', revenue: 7100, users: 2150, target: 4800 }
  ],
  '30d': [
    { label: 'Week 1', revenue: 31000, users: 7200, target: 28000 },
    { label: 'Week 2', revenue: 36500, users: 8100, target: 30000 },
    { label: 'Week 3', revenue: 39200, users: 8900, target: 32000 },
    { label: 'Week 4', revenue: 42800, users: 9600, target: 34000 }
  ],
  '90d': [
    { label: 'Month 1', revenue: 132000, users: 29000, target: 120000 },
    { label: 'Month 2', revenue: 154000, users: 33500, target: 135000 },
    { label: 'Month 3', revenue: 176800, users: 37200, target: 150000 }
  ]
};

export const initialProjects = [
  {
    id: 'PRJ-101',
    name: 'Neural Engine Migration v3',
    client: 'CloudScale AI',
    status: 'In Progress',
    priority: 'High',
    progress: 74,
    budget: '$45,000',
    spent: '$33,300',
    dueDate: 'Oct 12, 2026',
    assignees: [
      { name: 'Elena Rostova', avatar: '/images/lady.jfif' },
      { name: 'Marcus Chen', avatar: '/images/man1.jfif' }
    ]
  },
  {
    id: 'PRJ-102',
    name: 'Global Edge CDN Rollout',
    client: 'FinTech Nexus',
    status: 'Completed',
    priority: 'Medium',
    progress: 100,
    budget: '$62,500',
    spent: '$59,100',
    dueDate: 'Sep 24, 2026',
    assignees: [
      { name: 'Sarah Jenkins', avatar: '/images/profileImg.jpg' }
    ]
  },
  {
    id: 'PRJ-103',
    name: 'Zero-Trust Security Mesh',
    client: 'AeroDynamics Lab',
    status: 'In Review',
    priority: 'High',
    progress: 92,
    budget: '$88,000',
    spent: '$76,400',
    dueDate: 'Oct 05, 2026',
    assignees: [
      { name: 'Devon Vance', avatar: '/images/man2.jfif' },
      { name: 'Aisha Patel', avatar: '/images/man1.jfif' }
    ]
  },
  {
    id: 'PRJ-104',
    name: 'Micro-Frontend Component Hub',
    client: 'Internal Core',
    status: 'In Progress',
    priority: 'Medium',
    progress: 48,
    budget: '$28,000',
    spent: '$14,200',
    dueDate: 'Nov 18, 2026',
    assignees: [
      { name: 'Liam Davies', avatar: '/images/lady2.jfif' }
    ]
  },
  {
    id: 'PRJ-105',
    name: 'Real-Time Telemetry Pipeline',
    client: 'HyperLogistics',
    status: 'Planning',
    priority: 'Low',
    progress: 18,
    budget: '$52,000',
    spent: '$9,800',
    dueDate: 'Dec 02, 2026',
    assignees: [
      { name: 'Elena Rostova', avatar: '/images/lady.jfif' },
      { name: 'Devon Vance', avatar: '/images/lady2.jfif' }
    ]
  }
];

export const initialActivities = [
  {
    id: 'act-1',
    type: 'deploy',
    title: 'Cluster v2.8 deployed to us-east-1',
    description: 'Auto-scaled 14 replica nodes with zero downtime',
    time: '8 minutes ago',
    author: 'Elena Rostova',
    iconColor: '#10b981'
  },
  {
    id: 'act-2',
    type: 'alert',
    title: 'Peak throughput reached',
    description: 'Ingress traffic surged to 42,000 req/sec (+35%)',
    time: '24 minutes ago',
    author: 'System Monitor',
    iconColor: '#06b6d4'
  },
  {
    id: 'act-3',
    type: 'milestone',
    title: 'Security Audit passed',
    description: 'SOC2 Type II compliance check verified',
    time: '1 hour ago',
    author: 'Devon Vance',
    iconColor: '#8b5cf6'
  },
  {
    id: 'act-4',
    type: 'payment',
    title: 'Enterprise subscription renewed',
    description: 'CloudScale AI upgraded to Tier-4 Annual plan',
    time: '3 hours ago',
    author: 'Billing Bot',
    iconColor: '#f59e0b'
  }
];

export const initialNotifications = [
  {
    id: 'notif-1',
    title: 'Kubernetes Cluster Healthy',
    message: 'All 12 microservices passed automated health probes.',
    time: '4m ago',
    read: false,
    type: 'success'
  },
  {
    id: 'notif-2',
    title: 'New Collaboration Invite',
    message: 'Aisha Patel invited you to review Zero-Trust Mesh PR #412.',
    time: '28m ago',
    read: false,
    type: 'info'
  },
  {
    id: 'notif-3',
    title: 'Database Backup Completed',
    message: 'Encrypted snapshot saved to cold storage vault.',
    time: '2h ago',
    read: true,
    type: 'system'
  }
];
