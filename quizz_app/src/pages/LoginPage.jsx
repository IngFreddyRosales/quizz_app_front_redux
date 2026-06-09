import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../store/thunks/authThunks';
import '../styles/login.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status, error } = useSelector((state) => state.auth);

    useEffect(() => {
        if (status === 'succeeded') {
            navigate('/home');
        }
    }, [status, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Iniciar Sesión</h2>

                {status === 'failed' && error && (
                    <div className="login-error">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="login-form">
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
                        className="login-button"
                        disabled={status === 'loading'}
                    >
                        {status === 'loading' ? 'Cargando...' : 'Entrar'}
                    </button>
                </form>

                <p className="login-footer">
                    ¿No tienes cuenta? <Link to="/register" className="login-link">Regístrate</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;