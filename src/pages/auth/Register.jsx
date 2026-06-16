import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await registerUser(formData);
      login(
        {
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role,
        },
        data.token
      );
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Create Account</h2>
                <p style={styles.subtitle}>Join DevCollab today</p>

                {error && <div style={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={styles.field}>
                        <label style={styles.label}>Name</label>
                        <input
                            style={styles.input}
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            required
                        />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Email</label>
                        <input
                            style={styles.input}
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Password</label>
                        <input
                            style={styles.input}
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Min 6 characters"
                            required
                        />
                    </div>

                    <button
                        style={loading ? styles.buttonDisabled : styles.button}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Creating account...' : 'Register'}
                    </button>
                </form>

                <p style={styles.link}>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
  )
}

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
    },
    card: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
    },
    title: { margin: '0 0 8px', fontSize: '24px' },
    subtitle: { margin: '0 0 24px', color: '#666' },
    error: {
        backgroundColor: '#fee',
        color: '#c00',
        padding: '10px',
        borderRadius: '4px',
        marginBottom: '16px',
        fontSize: '14px',
    },
    field: { marginBottom: '16px' },
    label: { display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '14px',
        boxSizing: 'border-box',
    },
    button: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#2563eb',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '8px',
    },
    buttonDisabled: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#93c5fd',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'not-allowed',
        marginTop: '8px',
    },
    link: { textAlign: 'center', marginTop: '16px', fontSize: '14px' },
};

export default Register;

