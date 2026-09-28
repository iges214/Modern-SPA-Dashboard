import React, { useState } from 'react';
import { X, Sparkles, FolderPlus } from 'lucide-react';
import './NewProjectModal.css';

export default function NewProjectModal({ isOpen, onClose, onCreateProject }) {
  const [name, setName] = useState('');
  const [client, setClient] = useState('');
  const [priority, setPriority] = useState('High');
  const [status, setStatus] = useState('In Progress');
  const [budget, setBudget] = useState('$50,000');
  const [dueDate, setDueDate] = useState('Nov 15, 2026');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide a project title');
      return;
    }
    if (!client.trim()) {
      setError('Please provide a client or organization name');
      return;
    }

    const newProject = {
      id: `PRJ-${Math.floor(100 + Math.random() * 900)}`,
      name: name.trim(),
      client: client.trim(),
      status,
      priority,
      progress: status === 'Planning' ? 10 : 25,
      budget,
      spent: '$0',
      dueDate,
      assignees: [
        { name: 'Sandra Ighoyivwi', avatar: '/images/profileImg.jfif' }
      ]
    };

    onCreateProject(newProject);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content glass-panel animate-fade-in" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-icon-wrap">
              <FolderPlus size={20} />
            </div>
            <div>
              <h3 className="modal-title">Initiate New Workstream</h3>
              <p className="modal-subtitle">Provision services and assign engineering pipelines</p>
            </div>
          </div>
          <button className="btn-icon modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {error && <div className="modal-error-alert">{error}</div>}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Project / Workstream Title *</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Distributed Vector Store Sharding"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              autoFocus
            />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Client or Squad *</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Quantum Analytics Lab"
                value={client}
                onChange={(e) => { setClient(e.target.value); setError(''); }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Allocated Budget</label>
              <input 
                type="text" 
                className="form-input font-mono" 
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Priority Level</label>
              <select 
                className="form-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Lifecycle Stage</label>
              <select 
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Planning">Planning</option>
                <option value="In Progress">In Progress</option>
                <option value="In Review">In Review</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Target Delivery Date</label>
            <input 
              type="text" 
              className="form-input font-mono" 
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Sparkles size={16} />
              <span>Launch Initiative</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
