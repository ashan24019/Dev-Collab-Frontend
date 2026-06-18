import { useState, useEffect } from 'react';
import { getTasksByProject } from '../api/taskApi';

export function useTasks(projectId) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (projectId) {
            fetchTasks();
        }
    }, [projectId]);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const data = await getTasksByProject(projectId);
            setTasks(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load tasks');
        } finally {
            setLoading(false);
        }
    };

    return { tasks, loading, error, refetch: fetchTasks };
}