import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../store/thunks/authThunks';
import '../styles/register.css';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status, error } = useSelector((state) => state.auth);

    useEffect(() => {
        if (status === 'succeeded') {
            navigate('/login');
        }
    }, [status, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register({ username, email, password }));
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-title">Registrarse</h2>

                {status === 'failed' && error && (
                    <div className="register-error">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="register-form">
                    <div className="input-group">
                        <label className="input-label">Nombre de usuario</label>
                        <input
                            type="text"
                            className="input-field"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Email</label>
                        <input
                            type="email"
                            className="input-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Contraseña</label>
                        <input
                            type="password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="register-button"
                        disabled={status === 'loading'}
                    >
                        {status === 'loading' ? 'Cargando...' : 'Registrarse'}
                    </button>
                </form>

                <p className="register-footer">
                    ¿Ya tienes cuenta? <Link to="/login" className="register-link">Inicia Sesión</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;