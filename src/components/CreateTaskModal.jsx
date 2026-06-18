import { useState } from 'react';
import { createTask } from '../api/taskApi';

function CreateTaskModal({ projectId, onClose, onCreated }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'MEDIUM',
        dueDate: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await createTask({
                ...formData,
                projectId,
                dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
            });
            onCreated();
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create task');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.modalHeader}>
                    <h2 style={styles.modalTitle}>New Task</h2>
                    <button style={styles.closeBtn} onClick={onClose}>✕</button>
                </div>

                {error && <div style={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={styles.field}>
                        <label style={styles.label}>Task Title</label>
                        <input
                            style={styles.input}
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="What needs to be done?"
                            required
                        />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Description</label>
                        <textarea
                            style={styles.textarea}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Add details..."
                            rows={3}
                        />
                    </div>

                    <div style={styles.row}>
                        <div style={styles.field}>
                            <label style={styles.label}>Priority</label>
                            <select
                                style={styles.input}
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                            >
                                <option value="LOW">Low</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HIGH">High</option>
                            </select>
                        </div>

                        <div style={styles.field}>
                            <label style={styles.label}>Due Date</label>
                            <input
                                style={styles.input}
                                type="date"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div style={styles.actions}>
                        <button type="button" style={styles.cancelBtn} onClick={onClose}>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={loading ? styles.submitBtnDisabled : styles.submitBtn}
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Create Task'}
                        </button>
                    </div>
                </form>
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
        width: '100%', maxWidth: '480px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
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
    field: { marginBottom: '16px', flex: 1 },
    row: { display: 'flex', gap: '16px' },
    label: { display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' },
    input: {
        width: '100%', padding: '10px', border: '1px solid #ddd',
        borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box',
    },
    textarea: {
        width: '100%', padding: '10px', border: '1px solid #ddd',
        borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', resize: 'vertical',
    },
    actions: { display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' },
    cancelBtn: {
        padding: '10px 20px', border: '1px solid #ddd', borderRadius: '4px',
        cursor: 'pointer', backgroundColor: 'white',
    },
    submitBtn: {
        padding: '10px 20px', backgroundColor: '#2563eb', color: 'white',
        border: 'none', borderRadius: '4px', cursor: 'pointer',
    },
    submitBtnDisabled: {
        padding: '10px 20px', backgroundColor: '#93c5fd', color: 'white',
        border: 'none', borderRadius: '4px', cursor: 'not-allowed',
    },
};

export default CreateTaskModal;