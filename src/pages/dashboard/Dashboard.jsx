import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProjects } from '../../hooks/useProjects';
import ProjectCard from '../../components/ProjectCard';
import CreateProjectModal from '../../components/CreateProjectModal';

function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { projects, loading, error, refetch } = useProjects();
    const [showModal, setShowModal] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleProjectClick = (project) => {
        navigate(`/projects/${project.id}`);
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <h1 style={styles.logo}>DevCollab</h1>
                <div style={styles.headerRight}>
                    <span style={styles.userName}>
                        {user?.name} · {user?.role}
                    </span>
                    <button style={styles.logoutBtn} onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div style={styles.content}>
                <div style={styles.pageHeader}>
                    <div>
                        <h2 style={styles.pageTitle}>Projects</h2>
                        <p style={styles.pageSubtitle}>
                            {projects.length} project{projects.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                    <button
                        style={styles.newProjectBtn}
                        onClick={() => setShowModal(true)}
                    >
                        + New Project
                    </button>
                </div>

                {/* States */}
                {loading && <p style={styles.stateText}>Loading projects...</p>}
                {error && <p style={styles.errorText}>{error}</p>}

                {!loading && !error && projects.length === 0 && (
                    <div style={styles.emptyState}>
                        <p>No projects yet.</p>
                        <button
                            style={styles.newProjectBtn}
                            onClick={() => setShowModal(true)}
                        >
                            Create your first project
                        </button>
                    </div>
                )}

                {/* Project grid */}
                {!loading && projects.length > 0 && (
                    <div style={styles.grid}>
                        {projects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onClick={handleProjectClick}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <CreateProjectModal
                    onClose={() => setShowModal(false)}
                    onCreated={refetch}
                />
            )}
        </div>
    );
}

const styles = {
    container: { minHeight: '100vh', backgroundColor: '#f9fafb' },
    header: {
        backgroundColor: 'white',
        padding: '16px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
    },
    logo: { margin: 0, color: '#2563eb', fontSize: '22px' },
    headerRight: { display: 'flex', alignItems: 'center', gap: '16px' },
    userName: { fontSize: '14px', color: '#6b7280' },
    logoutBtn: {
        padding: '8px 16px',
        backgroundColor: '#ef4444',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
    },
    content: { padding: '32px', maxWidth: '1200px', margin: '0 auto' },
    pageHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
    },
    pageTitle: { margin: '0 0 4px', fontSize: '24px' },
    pageSubtitle: { margin: 0, color: '#6b7280', fontSize: '14px' },
    newProjectBtn: {
        padding: '10px 20px',
        backgroundColor: '#2563eb',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
    },
    stateText: { color: '#6b7280', textAlign: 'center', padding: '40px' },
    errorText: { color: '#dc2626', textAlign: 'center', padding: '40px' },
    emptyState: { textAlign: 'center', padding: '60px', color: '#6b7280' },
};

export default Dashboard;