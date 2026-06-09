import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
// import HomePage from './pages/HomePage';

function App() {
    const token = useSelector((state) => state.auth.token);

    return (
        <BrowserRouter>
            <Routes>
                {/* Rutas Públicas */}
                <Route path="/login" element={!token ? <LoginPage /> : <Navigate to="/" />} />
                
                {/* Rutas Protegidas (Envueltas en PrivateRoute) */}
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<div>Bienvenido al Home. Solo ves esto si tu token funciona en la DB.</div>} />
                    {/* Aquí irán las demás: /quiz, /profile, /leaderboard */}
                </Route>

                {/* Ruta comodín (404) */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;