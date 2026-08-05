import { useState, useEffect } from 'react';
import { searchTask } from '../api/taskApi';

export function useTasks(projectId) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        if (projectId) {
            fetchTasks();
        }
    }, [projectId, status, priority, page]);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const data = await searchTask(projectId, status, priority, page, 10);
            setTasks(data.content);
            setTotalPages(data.totalPages);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load tasks');
        } finally {
            setLoading(false);
        }
    };

    const setStatusFilter = (value) => {
        setStatus(value)
        setPage(0)
    }

    const setPriorityFilter = (value) => {
        setPriority(value)
        setPage(0)
    }

    return { 
        tasks, 
        loading, 
        error, 
        refetch: fetchTasks,
        page,
        totalPages,
        status,
        priority,
        setPriorityFilter,
        setStatusFilter,
        goToPage: (newPage) => {
            if (newPage >= 0 && newPage < totalPages) setPage(newPage)
        }
    };
}