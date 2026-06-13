const QuizFeedback = ({ feedback, isLastQuestion, onNext, onFinish }) => {
    if (!feedback) return null;

    const isCorrect = feedback.is_correct;

    return (
        <>
            <div className={`qz-feedback ${isCorrect ? 'qz-feedback--correct' : 'qz-feedback--wrong'}`}>
                <span className="qz-feedback-icon">{isCorrect ? '✅' : '❌'}</span>
                <div className="qz-feedback-body">
                    <span className="qz-feedback-title">
                        {isCorrect ? '¡Correcto!' : 'Incorrecto'}
                    </span>
                    <span className="qz-feedback-sub">
                        {isCorrect
                            ? '¡Gran trabajo! Sigue así.'
                            : `La respuesta correcta era: ${feedback.correct_option?.option_text || '—'}`
                        }
                    </span>
                </div>
                {feedback.earned_points > 0 && (
                    <span className="qz-feedback-pts">+{feedback.earned_points}</span>
                )}
            </div>

            <div className="qz-actions">
                {isLastQuestion ? (
                    <button className="qz-btn-next" onClick={onFinish}>
                        Finalizar 🏁
                    </button>
                ) : (
                    <button className="qz-btn-next" onClick={onNext}>
                        Siguiente →
                    </button>
                )}
            </div>
        </>
    );
};

export default QuizFeedback;
