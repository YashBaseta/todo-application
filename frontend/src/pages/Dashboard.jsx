import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';
import { useAuth } from '../context/AuthContext';
import { Plus } from 'lucide-react';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      const res = await api.post('/tasks', taskData);
      setTasks([res.data, ...tasks]);
      setIsFormOpen(false);
    } catch (err) {
      alert(err.response?.data?.errors?.[0]?.message || 'Failed to add task');
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const res = await api.put(`/tasks/${id}`, taskData);
      setTasks(tasks.map(t => t._id === id ? res.data : t));
      setEditingTask(null);
      setIsFormOpen(false);
    } catch (err) {
      alert('Failed to update task');
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      alert('Failed to delete task');
    }
  };

  const handleToggleStatus = async (task) => {
    const newStatus = task.status === 'pending' ? 'completed' : 'pending';
    try {
      const res = await api.put(`/tasks/${task._id}`, { status: newStatus });
      setTasks(tasks.map(t => t._id === task._id ? res.data : t));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  if (loading) return <div className="container text-center mt-4">Loading tasks...</div>;

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2>My Tasks</h2>
          <p className="text-muted">Manage your daily checklist</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setEditingTask(null);
            setIsFormOpen(!isFormOpen);
          }}
        >
          <Plus size={18} /> {isFormOpen && !editingTask ? 'Cancel' : 'New Task'}
        </button>
      </div>

      {error && <div className="text-danger mb-4">{error}</div>}

      {isFormOpen && (
        <div className="card mb-4">
          <h3 className="mb-2">{editingTask ? 'Edit Task' : 'Create Task'}</h3>
          <TaskForm 
            initialData={editingTask} 
            onSubmit={editingTask ? (data) => updateTask(editingTask._id, data) : addTask} 
            onCancel={() => {
              setIsFormOpen(false);
              setEditingTask(null);
            }} 
          />
        </div>
      )}

      {tasks.length === 0 && !isFormOpen ? (
        <div className="card text-center" style={{ padding: '4rem 2rem' }}>
          <p className="text-muted mb-4">You have no tasks yet.</p>
          <button className="btn btn-primary" onClick={() => setIsFormOpen(true)}>
            Create your first task
          </button>
        </div>
      ) : (
        <div>
          {tasks.map(task => (
            <TaskItem 
              key={task._id} 
              task={task} 
              onEdit={() => handleEdit(task)}
              onDelete={() => handleDelete(task._id)}
              onToggleStatus={() => handleToggleStatus(task)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
