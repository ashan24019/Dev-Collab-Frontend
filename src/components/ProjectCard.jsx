function ProjectCard({ project, onClick }) {
    const statusColors = {
        ACTIVE: { bg: '#dcfce7', text: '#16a34a' },
        COMPLETED: { bg: '#dbeafe', text: '#2563eb' },
        ARCHIVED: { bg: '#f3f4f6', text: '#6b7280' },
    };

    const statusStyle = statusColors[project.status] || statusColors.ACTIVE;

    return (
        <div style={styles.card} onClick={() => onClick(project)}>
            <div style={styles.cardHeader}>
                <h3 style={styles.projectName}>{project.name}</h3>
                <span style={{
                    ...styles.statusBadge,
                    backgroundColor: statusStyle.bg,
                    color: statusStyle.text,
                }}>
                    {project.status}
                </span>
            </div>

            <p style={styles.description}>
                {project.description || 'No description provided'}
            </p>

            <div style={styles.cardFooter}>
                <span style={styles.memberCount}>
                    👥 {project.memberIds?.length || 0} members
                </span>
                <span style={styles.date}>
                    {new Date(project.createdAt).toLocaleDateString()}
                </span>
            </div>
        </div>
    );
}

const styles = {
    card: {
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        transition: 'box-shadow 0.2s',
        border: '1px solid #e5e7eb',
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '8px',
    },
    projectName: { margin: 0, fontSize: '16px', fontWeight: '600' },
    statusBadge: {
        padding: '2px 10px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '500',
    },
    description: {
        color: '#6b7280',
        fontSize: '14px',
        margin: '0 0 16px',
        lineHeight: '1.5',
    },
    cardFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '13px',
        color: '#9ca3af',
    },
    memberCount: {},
    date: {},
};

export default ProjectCard;