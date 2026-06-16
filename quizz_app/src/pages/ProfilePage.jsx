import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserStatsThunk } from '../store/thunks/userStatsThunks';
import { getUserAchievementsThunk } from '../store/thunks/achievementsThunks';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
    const dispatch = useDispatch();

    const user = useSelector((s) => s.auth.user);
    const { stats, isLoading: statsLoading, error: statsError } = useSelector((s) => s.userStats);
    const { list: achievements, loading: achLoading, error: achError } = useSelector((s) => s.userAchievements);

    useEffect(() => {
        dispatch(getUserStatsThunk());
        dispatch(getUserAchievementsThunk());
    }, [dispatch]);

    const isLoading = statsLoading || achLoading;

    // ── Derived ────────────────────────────────────
    const initials = user?.username ? user.username.slice(0, 2).toUpperCase() : '??';
    const totalXp = stats?.total_xp ?? 0;
    const level = stats?.level ?? 1;
    const xpForNext = level * 100;
    const xpProgress = Math.min(Math.round((totalXp % 100) / 100 * 100), 100);

    // ── Loading ────────────────────────────────────
    if (isLoading && !stats) {
        return (
            <div className="pf-page">
                <div className="pf-state">
                    <div className="pf-spinner" />
                    <p>Cargando perfil...</p>
                </div>
            </div>
        );
    }

    // ── Error ──────────────────────────────────────
    if (statsError) {
        return (
            <div className="pf-page">
                <div className="pf-state pf-state--error">
                    <p>{statsError}</p>
                    <button onClick={() => dispatch(getUserStatsThunk())}>Reintentar</button>
                </div>
            </div>
        );
    }

    return (
        <div className="pf-page">
            <div className="pf-wrapper">

                {/* ── Sección: info personal ────────────────── */}
                <section className="pf-card pf-hero">
                    <div className="pf-avatar">{initials}</div>
                    <div className="pf-hero-info">
                        <h1 className="pf-username">{user?.username ?? '—'}</h1>
                        <span className="pf-role-badge">{user?.role ?? 'jugador'}</span>
                        {user?.email && <p className="pf-email">{user.email}</p>}
                    </div>
                    {/* Nivel + barra XP */}
                    <div className="pf-level-wrap">
                        <div className="pf-level-header">
                            <span className="pf-level-label">Nivel {level}</span>
                            <span className="pf-xp-label">{totalXp} / {xpForNext} XP</span>
                        </div>
                        <div className="pf-xp-bar">
                            <div className="pf-xp-fill" style={{ width: `${xpProgress}%` }} />
                        </div>
                    </div>
                </section>

                {/* ── Sección: estadísticas ─────────────────── */}
                {stats && (
                    <section className="pf-card">
                        <h2 className="pf-section-title">Estadísticas</h2>
                        <div className="pf-stats-grid">
                            <div className="pf-stat-card">
                                <span className="pf-stat-val">{totalXp}</span>
                                <span className="pf-stat-lbl">XP Total</span>
                            </div>
                            <div className="pf-stat-card">
                                <span className="pf-stat-val">{level}</span>
                                <span className="pf-stat-lbl">Nivel</span>
                            </div>
                            <div className="pf-stat-card">
                                <span className="pf-stat-val">{stats.correct_answers ?? 0}</span>
                                <span className="pf-stat-lbl">Respuestas correctas</span>
                            </div>
                            <div className="pf-stat-card">
                                <span className="pf-stat-val">{stats.wrong_answers ?? 0}</span>
                                <span className="pf-stat-lbl">Respuestas incorrectas</span>
                            </div>
                            <div className="pf-stat-card">
                                <span className="pf-stat-val">{stats.games_played ?? 0}</span>
                                <span className="pf-stat-lbl">Quizzes jugados</span>
                            </div>
                            <div className="pf-stat-card">
                                <span className="pf-stat-val">{stats.best_score ?? 0}</span>
                                <span className="pf-stat-lbl">Mejor puntaje</span>
                            </div>
                        </div>
                    </section>
                )}

                {/* ── Sección: logros ───────────────────────── */}
                <section className="pf-card">
                    <h2 className="pf-section-title">
                        Logros
                        {achievements.length > 0 && (
                            <span className="pf-badge-count">{achievements.length}</span>
                        )}
                    </h2>

                    {achLoading && <p className="pf-loading-text">Cargando logros...</p>}
                    {achError && <p className="pf-error-text">{achError}</p>}

                    {!achLoading && achievements.length === 0 && (
                        <div className="pf-empty">
                            <p>Aún no tienes logros desbloqueados.</p>
                            <p className="pf-empty-hint">¡Completa quizzes para ganarlos!</p>
                        </div>
                    )}

                    {achievements.length > 0 && (
                        <div className="pf-achievements-grid">
                            {achievements.map((ach, idx) => (
                                <div key={ach.id ?? idx} className="pf-ach-card">
                                    <div className="pf-ach-icon">🏅</div>
                                    <div className="pf-ach-info">
                                        <span className="pf-ach-name">
                                            {ach.Achievement?.name ?? 'Logro'}
                                        </span>
                                        {ach.Achievement?.description && (
                                            <span className="pf-ach-desc">{ach.Achievement.description}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

            </div>
        </div>
    );
};

export default ProfilePage;
