import React, { useState, useEffect } from 'react';

const TaskForm = ({ initialData, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setDueDate(initialData.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : '');
      setStatus(initialData.status || 'pending');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ 
      title, 
      description, 
      dueDate: dueDate || undefined, // send undefined if empty so backend doesn't parse empty string as invalid date
      status 
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Task Title</label>
        <input 
          type="text" 
          className="form-control" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          required 
          autoFocus
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Description (optional)</label>
        <textarea 
          className="form-control" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          placeholder="Add more details..."
        ></textarea>
      </div>

      <div className="flex gap-4">
        <div className="form-group" style={{ flex: 1 }}>
          <label className="form-label">Due Date (optional)</label>
          <input 
            type="date" 
            className="form-control" 
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        
        {initialData && (
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">Status</label>
            <select 
              className="form-control" 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-4" style={{ justifyContent: 'flex-end' }}>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Update Task' : 'Save Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
