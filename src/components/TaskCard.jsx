function TaskCard({ task, onStatusChange }) {
    const priorityColors = {
        LOW: { bg: '#dcfce7', text: '#16a34a' },
        MEDIUM: { bg: '#fef3c7', text: '#d97706' },
        HIGH: { bg: '#fee2e2', text: '#dc2626' },
    };

    const priorityStyle = priorityColors[task.priority] || priorityColors.LOW;

    const statusOptions = ['TODO', 'IN_PROGRESS', 'DONE'];

    return (
        <div style={styles.card}>
            <div style={styles.cardTop}>
                <h4 style={styles.taskTitle}>{task.title}</h4>
                <span style={{
                    ...styles.priorityBadge,
                    backgroundColor: priorityStyle.bg,
                    color: priorityStyle.text,
                }}>
                    {task.priority}
                </span>
            </div>

            {task.description && (
                <p style={styles.description}>{task.description}</p>
            )}

            <div style={styles.cardBottom}>
                <select
                    style={styles.statusSelect}
                    value={task.status}
                    onChange={(e) => onStatusChange(task.id, e.target.value)}
                >
                    {statusOptions.map((status) => (
                        <option key={status} value={status}>
                            {status.replace('_', ' ')}
                        </option>
                    ))}
                </select>

                {task.dueDate && (
                    <span style={styles.dueDate}>
                        Due {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                )}
            </div>
        </div>
    );
}

const styles = {
    card: {
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '16px',
        border: '1px solid #e5e7eb',
        marginBottom: '12px',
    },
    cardTop: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '8px',
    },
    taskTitle: { margin: 0, fontSize: '15px', fontWeight: '600' },
    priorityBadge: {
        padding: '2px 10px',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: '600',
    },
    description: {
        color: '#6b7280',
        fontSize: '13px',
        margin: '0 0 12px',
    },
    cardBottom: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statusSelect: {
        padding: '6px 10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '13px',
        cursor: 'pointer',
    },
    dueDate: { fontSize: '12px', color: '#9ca3af' },
};

export default TaskCard;