const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const QuizQuestion = ({ question, currentIndex, totalQuestions, answerFeedback, isSubmitting, onSelectOption }) => {
    const options = question.QuestionOptions || [];
    const disabled = !!answerFeedback || isSubmitting;

    const getOptionClass = (option) => {
        const classes = ['qz-option'];

        if (disabled) classes.push('qz-option--disabled');

        if (answerFeedback) {
            // Mostrar la opción correcta
            if (option.id === answerFeedback.correct_option?.id) {
                classes.push('qz-option--correct');
            }
            // Si el usuario eligió una incorrecta, marcarla
            if (
                option.id === answerFeedback.selected_option_id &&
                !answerFeedback.is_correct
            ) {
                classes.push('qz-option--wrong');
            }
        }

        return classes.join(' ');
    };

    return (
        <div className="qz-question-card">
            <div className="qz-question-num">
                Pregunta {currentIndex + 1} de {totalQuestions}
            </div>
            <p className="qz-question-text">{question.question_text}</p>

            <div className="qz-options">
                {options.map((option, idx) => (
                    <button
                        key={option.id}
                        className={getOptionClass(option)}
                        onClick={() => !disabled && onSelectOption(option.id)}
                        disabled={disabled}
                    >
                        <span className="qz-option-letter">{LETTERS[idx]}</span>
                        <span>{option.option_text}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuizQuestion;
