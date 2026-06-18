import { useState, useEffect } from 'react';
import { addMemberToProject, getAllUsers } from '../api/projectApi';

function AddMemberModal({ projectId, currentMemberIds, onClose, onAdded }) {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getAllUsers();
            // exclude users already in the project
            const available = data.filter((u) => !currentMemberIds.includes(u.id));
            setUsers(available);
        } catch (err) {
            setError('Could not load users');
        }
    };

    const handleAdd = async () => {
        if (!selectedUserId) return;
        setLoading(true);
        setError('');

        try {
            await addMemberToProject(projectId, selectedUserId);
            onAdded();
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add member');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.modalHeader}>
                    <h2 style={styles.modalTitle}>Add Member</h2>
                    <button style={styles.closeBtn} onClick={onClose}>✕</button>
                </div>

                {error && <div style={styles.error}>{error}</div>}

                {users.length === 0 ? (
                    <p style={styles.noUsers}>No available users to add</p>
                ) : (
                    <>
                        <select
                            style={styles.select}
                            value={selectedUserId}
                            onChange={(e) => setSelectedUserId(e.target.value)}
                        >
                            <option value="">Select a user...</option>
                            {users.map((u) => (
                                <option key={u.id} value={u.id}>
                                    {u.name} ({u.email})
                                </option>
                            ))}
                        </select>

                        <div style={styles.actions}>
                            <button style={styles.cancelBtn} onClick={onClose}>
                                Cancel
                            </button>
                            <button
                                style={loading ? styles.addBtnDisabled : styles.addBtn}
                                onClick={handleAdd}
                                disabled={loading || !selectedUserId}
                            >
                                {loading ? 'Adding...' : 'Add Member'}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

const styles = {
    overlay: {
        position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50,
    },
    modal: {
        backgroundColor: 'white', borderRadius: '8px', padding: '24px',
        width: '100%', maxWidth: '420px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    },
    modalHeader: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px',
    },
    modalTitle: { margin: 0, fontSize: '20px' },
    closeBtn: { background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#6b7280' },
    error: {
        backgroundColor: '#fee', color: '#c00', padding: '10px',
        borderRadius: '4px', marginBottom: '16px', fontSize: '14px',
    },
    select: {
        width: '100%', padding: '10px', border: '1px solid #ddd',
        borderRadius: '4px', fontSize: '14px', marginBottom: '16px',
    },
    noUsers: { color: '#6b7280', textAlign: 'center', padding: '20px 0' },
    actions: { display: 'flex', justifyContent: 'flex-end', gap: '12px' },
    cancelBtn: {
        padding: '10px 20px', border: '1px solid #ddd', borderRadius: '4px',
        cursor: 'pointer', backgroundColor: 'white',
    },
    addBtn: {
        padding: '10px 20px', backgroundColor: '#2563eb', color: 'white',
        border: 'none', borderRadius: '4px', cursor: 'pointer',
    },
    addBtnDisabled: {
        padding: '10px 20px', backgroundColor: '#93c5fd', color: 'white',
        border: 'none', borderRadius: '4px', cursor: 'not-allowed',
    },
};

export default AddMemberModal;