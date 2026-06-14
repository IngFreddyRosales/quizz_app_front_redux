const QuizResult = ({ result, onRetry, onGoHome }) => {
    if (!result) return null;

    const { session, stats, season_stats, unlocked_achievements } = result;

    const correctCount = session?.correct_count ?? 0;
    const totalQ = session?.total_questions ?? 0;
    const percentage = totalQ > 0 ? Math.round((correctCount / totalQ) * 100) : 0;
    const totalPoints = session?.score ?? 0;
    const bestStreak = session?.best_streak ?? 0;
    const totalTimeMs = (session?.started_at && session?.finished_at)
        ? (new Date(session.finished_at) - new Date(session.started_at))
        : null;
    const totalTime = totalTimeMs ? `${(totalTimeMs / 1000).toFixed(1)}s` : '—';
    const avgTime = session?.avg_response_time_ms ? `${(session.avg_response_time_ms / 1000).toFixed(1)}s` : '—';



    const getResultMessage = () => {
        if (percentage >= 90) return '¡Excelente!';
        if (percentage >= 70) return '¡Muy bien!';
        if (percentage >= 50) return '¡Buen trabajo!';
        return '¡Sigue practicando!';
    };

    return (
        <div className="qz-result">
            <div className="qz-result-hero">
                <h2>{getResultMessage()}</h2>
                <p>Obtuviste {correctCount} de {totalQ} correctas ({percentage}%)</p>
            </div>

            <div className="qz-result-stats">
                <div className="qz-stat-card">
                    <span className="qz-stat-val">{totalPoints}</span>
                    <span className="qz-stat-lbl">Puntos</span>
                </div>
                <div className="qz-stat-card">
                    <span className="qz-stat-val">{correctCount}/{totalQ}</span>
                    <span className="qz-stat-lbl">Correctas</span>
                </div>
                <div className="qz-stat-card">
                    <span className="qz-stat-val">{totalTime}</span>
                    <span className="qz-stat-lbl">Tiempo total</span>
                </div>
                <div className="qz-stat-card">
                    <span className="qz-stat-val">{avgTime}</span>
                    <span className="qz-stat-lbl">Tiempo prom.</span>
                </div>
            </div>

            {season_stats && (
                <div className="qz-result-stats">
                    <div className="qz-stat-card">
                        <span className="qz-stat-val">{season_stats.total_points ?? 0}</span>
                        <span className="qz-stat-lbl">Puntos temporada</span>
                    </div>
                </div>
            )}

            {unlocked_achievements && unlocked_achievements.length > 0 && (
                <div className="qz-achievements">
                    <h3>Logros desbloqueados</h3>
                    <div className="qz-achievement-list">
                        {unlocked_achievements.map((ach, idx) => (
                            <span
                                key={ach.id || idx}
                                className="qz-achievement-chip"
                                style={{ animationDelay: `${idx * 0.15}s` }}
                            >
                                {ach.name || ach.title}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <div className="qz-result-actions">
                <button className="qz-btn-primary" onClick={onRetry}>
                    Jugar otra vez
                </button>
                <button className="qz-btn-secondary" onClick={onGoHome}>
                    Volver al inicio
                </button>
            </div>
        </div>
    );
};

export default QuizResult;
