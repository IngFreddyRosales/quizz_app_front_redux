const QuizTimer = ({ timeLeft, timerPercent, timerStatus }) => {
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="qz-timer-wrap">
            <div className="qz-timer-bar">
                <div
                    className={`qz-timer-fill ${timerStatus}`}
                    style={{ width: `${timerPercent}%` }}
                />
            </div>
            <span className="qz-timer-time">{formatTime(timeLeft)}</span>
        </div>
    );
};

export default QuizTimer;
