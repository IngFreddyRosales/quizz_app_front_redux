import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import '../styles/SideNavbar.css';

const BASE_LINKS = [
    { to: '/home', label: 'Inicio' },
    { to: '/profile', label: 'Perfil' },
    { to: '/leaderboard', label: 'Ranking' },
];

const ADMIN_LINKS = [
    { to: '/admin', label: 'Admin' },
];

const SideNavbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const initials = user?.username
        ? user.username.slice(0, 2).toUpperCase()
        : '??';

    const isAdmin = user?.is_admin === true;
    const navLinks = isAdmin ? [...BASE_LINKS, ...ADMIN_LINKS] : BASE_LINKS;

    return (
        <aside className="sidenav">
            {/* Brand */}
            <div className="sidenav__brand">
                <span className="sidenav__brand-name">QuizzApp</span>
            </div>

            {/* Navigation links */}
            <nav className="sidenav__nav">
                {navLinks.map(({ to, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `sidenav__link${isActive ? ' sidenav__link--active' : ''}`
                        }
                    >
                        <span className="sidenav__link-label">{label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Spacer */}
            <div className="sidenav__spacer" />

            {/* User footer */}
            <div className="sidenav__footer">
                <div className="sidenav__user">
                    <div className="sidenav__avatar">{initials}</div>
                    <div className="sidenav__user-info">
                        <span className="sidenav__user-name">{user?.username ?? 'Usuario'}</span>
                        <span className="sidenav__user-role">
                            {isAdmin ? 'Administrador' : (user?.role ?? 'jugador')}
                        </span>
                        {isAdmin && <span className="sidenav__admin-badge">Admin</span>}
                    </div>
                </div>
                <button className="sidenav__logout" onClick={handleLogout} title="Cerrar sesión">
                    <span className="sidenav__link-label">Salir</span>
                </button>
            </div>
        </aside>
    );
};

export default SideNavbar;
