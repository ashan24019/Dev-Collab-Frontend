import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>DevCollab</h1>
                <div style={styles.userInfo}>
                    <span style={styles.userName}>
                        {user?.name} ({user?.role})
                    </span>
                    <button style={styles.logoutBtn} onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

            <div style={styles.content}>
                <h2>Welcome back, {user?.name}!</h2>
                <p style={{ color: '#666' }}>Your projects will appear here.</p>
            </div>
        </div>
    );
}

const styles = {
    container: { minHeight: '100vh', backgroundColor: '#f5f5f5' },
    header: {
        backgroundColor: 'white',
        padding: '16px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    title: { margin: 0, color: '#2563eb' },
    userInfo: { display: 'flex', alignItems: 'center', gap: '16px' },
    userName: { fontSize: '14px', color: '#666' },
    logoutBtn: {
        padding: '8px 16px',
        backgroundColor: '#ef4444',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    content: {
        padding: '32px',
        maxWidth: '1200px',
        margin: '0 auto',
    },
};

export default Dashboard;