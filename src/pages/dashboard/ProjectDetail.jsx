import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTasks } from '../../hooks/useTasks';
import { updateTask } from '../../api/taskApi';
import TaskCard from '../../components/TaskCard';
import CreateTaskModal from '../../components/CreateTaskModal';

function ProjectDetail() {
    const { id } = useParams();           // gets projectId from URL
    const navigate = useNavigate();
    const { tasks, loading, error, refetch } = useTasks(id);
    const [showModal, setShowModal] = useState(false);

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await updateTask(taskId, { status: newStatus });
            refetch();
        } catch (err) {
            console.error('Failed to update task status', err);
        }
    };

    const groupedTasks = {
        TODO: tasks.filter((t) => t.status === 'TODO'),
        IN_PROGRESS: tasks.filter((t) => t.status === 'IN_PROGRESS'),
        DONE: tasks.filter((t) => t.status === 'DONE'),
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button style={styles.backBtn} onClick={() => navigate('/dashboard')}>
                    ← Back to Projects
                </button>
                <button style={styles.newTaskBtn} onClick={() => setShowModal(true)}>
                    + New Task
                </button>
            </div>

            {loading && <p style={styles.stateText}>Loading tasks...</p>}
            {error && <p style={styles.errorText}>{error}</p>}

            {!loading && !error && (
                <div style={styles.board}>
                    {Object.entries(groupedTasks).map(([status, statusTasks]) => (
                        <div key={status} style={styles.column}>
                            <h3 style={styles.columnTitle}>
                                {status.replace('_', ' ')} ({statusTasks.length})
                            </h3>
                            {statusTasks.length === 0 && (
                                <p style={styles.emptyColumn}>No tasks</p>
                            )}
                            {statusTasks.map((task) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    onStatusChange={handleStatusChange}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <CreateTaskModal
                    projectId={id}
                    onClose={() => setShowModal(false)}
                    onCreated={refetch}
                />
            )}
        </div>
    );
}

const styles = {
    container: { padding: '32px', maxWidth: '1200px', margin: '0 auto' },
    header: {
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: '24px',
    },
    backBtn: {
        background: 'none', border: 'none', color: '#2563eb',
        cursor: 'pointer', fontSize: '14px', padding: 0,
    },
    newTaskBtn: {
        padding: '10px 20px', backgroundColor: '#2563eb', color: 'white',
        border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px',
    },
    board: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
    },
    column: {
        backgroundColor: '#f3f4f6',
        borderRadius: '8px',
        padding: '16px',
    },
    columnTitle: {
        margin: '0 0 16px', fontSize: '14px',
        color: '#374151', textTransform: 'uppercase',
    },
    emptyColumn: { color: '#9ca3af', fontSize: '13px', textAlign: 'center', padding: '20px' },
    stateText: { color: '#6b7280', textAlign: 'center', padding: '40px' },
    errorText: { color: '#dc2626', textAlign: 'center', padding: '40px' },
};

export default ProjectDetail;