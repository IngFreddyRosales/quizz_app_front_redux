import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/HomePage';
// import HomePage from './pages/HomePage';

function App() {
    const token = useSelector((state) => state.auth.token);

    return (
        <BrowserRouter>
            <Routes>
                {/* Rutas Públicas */}
                <Route path="/login" element={!token ? <LoginPage /> : <Navigate to="/home" />} />
                <Route path="/register" element={!token ? <RegisterPage /> : <Navigate to="/home" />} />
                
                {/* Rutas Protegidas (Envueltas en PrivateRoute) */}
                <Route element={<PrivateRoute />}>
                    <Route path="/home" element={<HomePage />} />
                    {/* Aquí irán las demás: /quiz, /profile, /leaderboard */}
                </Route>

                {/* Ruta por defecto y comodín (404) */}
                <Route path="/" element={<Navigate to={token ? "/home" : "/login"} />} />
                <Route path="*" element={<Navigate to={token ? "/home" : "/login"} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;