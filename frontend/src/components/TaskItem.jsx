import React from 'react';
import { Pencil, Trash2, Calendar, CheckCircle2, Circle } from 'lucide-react';

export default function TaskItem({ task, onEdit, onDelete, onToggleStatus }) {
  const isCompleted = task.status === 'completed';

  return (
    <div className={`task-item ${isCompleted ? 'task-completed' : ''}`}>
      <button className="btn-icon status-btn" onClick={onToggleStatus}>
        {isCompleted ? <CheckCircle2 size={24} /> : <Circle size={24} />}
      </button>

      <div className="task-content">
        <h4 className="task-title" style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>
          {task.title}
        </h4>
        
        {task.description && <p className="task-desc">{task.description}</p>}
        
        {task.dueDate && (
          <div className="task-meta">
            <Calendar size={14} /> 
            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      <div className="task-actions">
        <button className="btn-icon edit-btn" onClick={onEdit}>
          <Pencil size={18} />
        </button>
        <button className="btn-icon delete-btn" onClick={onDelete}>
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
