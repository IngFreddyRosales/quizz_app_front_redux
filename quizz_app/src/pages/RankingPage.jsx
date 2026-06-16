import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentLeaderBoardThunk } from '../store/thunks/seasonThunks';
import '../styles/RankingPage.css';

const RANK_MEDALS = { 1: '🥇', 2: '🥈', 3: '🥉' };

const formatDate = (isoString) => {
    if (!isoString) return '—';
    return new Date(isoString).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

const getInitials = (username = '') =>
    username.slice(0, 2).toUpperCase();


const RankRow = ({ entry }) => {
    const { rank_position, username, total_score, games_played, correct_answers } = entry;
    const medal = RANK_MEDALS[rank_position];
    const rowClass = `rk-row rk-row--${rank_position <= 3 ? rank_position : ''}`.trim();

    return (
        <div className={rowClass}>
            {/* Rank */}
            <span className={`rk-rank rk-rank--${rank_position <= 3 ? rank_position : ''}`}>
                {medal ?? `#${rank_position}`}
            </span>

            {/* User */}
            <div className="rk-user">
                <div className="rk-avatar">{getInitials(username)}</div>
                <div>
                    <div className="rk-username">{username}</div>
                    <div className="rk-sub">
                        {games_played} {games_played === 1 ? 'partida' : 'partidas'} · {correct_answers} correctas
                    </div>
                </div>
            </div>

            {/* Score */}
            <div className="rk-score">
                <span className="rk-score-val">{total_score.toLocaleString()}</span>
                <span className="rk-score-lbl">pts</span>
            </div>
        </div>
    );
};


const RankingPage = () => {
    const dispatch = useDispatch();
    const { leaderBoard, currentSeason, status, error } = useSelector(
        (state) => state.seasons
    );

    useEffect(() => {
        dispatch(getCurrentLeaderBoardThunk());
    }, [dispatch]);

    // ── Loading
    if (status === 'loading') {
        return (
            <div className="rk-page">
                <div className="rk-state">
                    <div className="rk-spinner" />
                    <p>Cargando ranking…</p>
                </div>
            </div>
        );
    }

    // ── Error
    if (status === 'failed') {
        return (
            <div className="rk-page">
                <div className="rk-state rk-state--error">
                    <p>{error || 'No se pudo cargar el ranking.'}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="rk-page">
            <div className="rk-wrapper">

                {/* Header */}
                <div className="rk-header">
                    <h1>Ranking</h1>
                    <p>Clasificación de jugadores en la temporada actual</p>
                </div>

                {/* Season badge */}
                {currentSeason && (
                    <div className="rk-season-badge">
                        <span>📅 {currentSeason.name}</span>
                        <span className="rk-season-dates">
                            {formatDate(currentSeason.start_date)} – {formatDate(currentSeason.end_date)}
                        </span>
                    </div>
                )}

                {/* Leaderboard */}
                <div className="rk-card">
                    <p className="rk-section-title">Tabla de clasificación</p>

                    {!leaderBoard || leaderBoard.length === 0 ? (
                        <div className="rk-empty">
                            <p>Aún no hay jugadores en el ranking.</p>
                        </div>
                    ) : (
                        <div className="rk-list">
                            {leaderBoard.map((entry) => (
                                <RankRow key={entry.user_id} entry={entry} />
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default RankingPage;
