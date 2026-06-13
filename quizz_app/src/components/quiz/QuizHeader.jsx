const QuizHeader = ({ currentIndex, totalQuestions, progressPercent, totalScore, onAbandon }) => {
    return (
        <div className="qz-topbar">
            <button className="qz-btn-abandon" onClick={onAbandon}>
                <span>✕</span> Salir
            </button>

            <div className="qz-progress-wrap">
                <div className="qz-progress-label">
                    <span>Pregunta {currentIndex + 1} de {totalQuestions}</span>
                    <span>{progressPercent}%</span>
                </div>
                <div className="qz-progress-bar">
                    <div
                        className="qz-progress-fill"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
            </div>

            <div className="qz-score-badge">
                <span className="qz-score-val">{totalScore}</span>
                <span className="qz-score-lbl">Puntos</span>
            </div>
        </div>
    );
};

export default QuizHeader;
