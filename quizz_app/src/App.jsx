import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './components/PrivateRoute';
import AppLayout from './components/AppLayout';
import HomePage from './pages/HomePage';
import QuizzPage from './pages/QuizzPage';
import ProfilePage from './pages/ProfilePage';

function App() {
    const token = useSelector((state) => state.auth.token);

    return (
        <BrowserRouter>
            <Routes>
                {/* Rutas Públicas */}
                <Route path="/login"    element={!token ? <LoginPage />    : <Navigate to="/home" />} />
                <Route path="/register" element={!token ? <RegisterPage /> : <Navigate to="/home" />} />

                {/* Rutas protegidas CON sidebar (AppLayout) */}
                <Route element={<PrivateRoute />}>
                    <Route element={<AppLayout />}>
                        <Route path="/home"        element={<HomePage />} />
                        <Route path="/profile"     element={<ProfilePage />} />
                        {/* Aquí irán: /leaderboard, etc. */}
                    </Route>
                </Route>

                {/* Rutas protegidas SIN sidebar (pantalla completa) */}
                <Route element={<PrivateRoute />}>
                    <Route path="/quiz/:categoryId" element={<QuizzPage />} />
                </Route>

                {/* Ruta por defecto y comodín (404) */}
                <Route path="/"  element={<Navigate to={token ? '/home' : '/login'} />} />
                <Route path="*"  element={<Navigate to={token ? '/home' : '/login'} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;