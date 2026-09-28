import React, { useState } from 'react';
import { 
  FolderKanban, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  MoreVertical, 
  Trash2, 
  Check, 
  Filter,
  ArrowUpDown,
  Search
} from 'lucide-react';
import './ProjectTable.css';

export default function ProjectTable({ 
  projects, 
  onToggleStatus, 
  onDeleteProject,
  searchQuery,
  onOpenNewProject
}) {
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name'); // 'name' | 'progress' | 'dueDate'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' | 'desc'
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Filter projects
  const filteredProjects = projects.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (statusFilter === 'All') return matchesSearch;
    return matchesSearch && p.status === statusFilter;
  });

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    let comparison = 0;
    if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === 'progress') {
      comparison = a.progress - b.progress;
    } else if (sortBy === 'dueDate') {
      comparison = a.dueDate.localeCompare(b.dueDate);
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return <span className="badge badge-emerald"><CheckCircle size={12} /> Completed</span>;
      case 'In Progress':
        return <span className="badge badge-indigo"><Clock size={12} /> In Progress</span>;
      case 'In Review':
        return <span className="badge badge-amber"><AlertCircle size={12} /> In Review</span>;
      case 'Planning':
        return <span className="badge badge-cyan"><Clock size={12} /> Planning</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return <span className="priority-dot priority-high">High</span>;
      case 'Medium':
        return <span className="priority-dot priority-medium">Med</span>;
      case 'Low':
        return <span className="priority-dot priority-low">Low</span>;
      default:
        return <span>{priority}</span>;
    }
  };

  return (
    <div className="project-table-card glass-panel">
      <div className="table-top-bar">
        <div className="table-title-group">
          <div className="table-icon-wrap">
            <FolderKanban size={18} />
          </div>
          <div>
            <h3 className="table-heading">Active Initiatives & Workstreams</h3>
            <p className="table-subheading">Track delivery pipelines, budget consumption, and engineering velocity</p>
          </div>
        </div>

        <div className="table-filter-chips">
          {['All', 'In Progress', 'In Review', 'Completed', 'Planning'].map((filter) => (
            <button
              key={filter}
              className={`filter-chip ${statusFilter === filter ? 'filter-chip-active' : ''}`}
              onClick={() => setStatusFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="table-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              <th onClick={() => toggleSort('name')} className="cursor-pointer">
                <div className="th-content">
                  <span>Project & Workstream</span>
                  <ArrowUpDown size={13} className="sort-icon" />
                </div>
              </th>
              <th>Status</th>
              <th>Priority</th>
              <th onClick={() => toggleSort('progress')} className="cursor-pointer">
                <div className="th-content">
                  <span>Progress</span>
                  <ArrowUpDown size={13} className="sort-icon" />
                </div>
              </th>
              <th>Budget Spent</th>
              <th>Delivery Date</th>
              <th>Team</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedProjects.length === 0 ? (
              <tr>
                <td colSpan={8} className="empty-state-cell">
                  <div className="empty-state-content">
                    <Search size={32} className="empty-search-icon" />
                    <h4>No initiatives found</h4>
                    <p>Try refining your search keyword or adjust the status filter.</p>
                    <button className="btn btn-primary" onClick={onOpenNewProject}>
                      Create Initiative
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              sortedProjects.map((p) => (
                <tr key={p.id} className="table-row">
                  <td>
                    <div className="project-meta-cell">
                      <span className="project-id">{p.id}</span>
                      <span className="project-title">{p.name}</span>
                      <span className="project-client">{p.client}</span>
                    </div>
                  </td>
                  <td>{getStatusBadge(p.status)}</td>
                  <td>{getPriorityBadge(p.priority)}</td>
                  <td>
                    <div className="progress-cell">
                      <div className="progress-bar-bg">
                        <div 
                          className={`progress-bar-fill ${p.progress === 100 ? 'fill-emerald' : 'fill-primary'}`} 
                          style={{ width: `${p.progress}%` }}
                        />
                      </div>
                      <span className="progress-text">{p.progress}%</span>
                    </div>
                  </td>
                  <td>
                    <div className="budget-cell">
                      <span className="budget-spent font-mono">{p.spent}</span>
                      <span className="budget-total font-mono">/ {p.budget}</span>
                    </div>
                  </td>
                  <td>
                    <span className="due-date-text">{p.dueDate}</span>
                  </td>
                  <td>
                    <div className="assignees-overlap">
                      {p.assignees.map((assignee, idx) => (
                        <img 
                          key={idx} 
                          src={assignee.avatar} 
                          alt={assignee.name} 
                          title={assignee.name}
                          className="assignee-img" 
                        />
                      ))}
                    </div>
                  </td>
                  <td className="text-right">
                    <div className="table-actions-group">
                      <button 
                        className={`action-btn-status ${p.status === 'Completed' ? 'is-completed' : ''}`}
                        title={p.status === 'Completed' ? 'Mark In Progress' : 'Mark Completed'}
                        onClick={() => onToggleStatus(p.id)}
                      >
                        <Check size={14} />
                      </button>
                      <button 
                        className="action-btn-delete"
                        title="Delete project"
                        onClick={() => onDeleteProject(p.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
