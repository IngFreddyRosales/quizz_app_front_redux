import { useParams } from 'react-router-dom';
import useQuiz from '../hooks/useQuiz';
import QuizHeader from '../components/quiz/QuizHeader';
import QuizTimer from '../components/quiz/QuizTimer';
import QuizQuestion from '../components/quiz/QuizQuestion';
import QuizFeedback from '../components/quiz/QuizFeedback';
import QuizResult from '../components/quiz/QuizResult';
import AbandonModal from '../components/quiz/AbandonModal';
import '../styles/QuizzPage.css';

const QuizzPage = () => {
    const { categoryId } = useParams();
    const quiz = useQuiz(categoryId);

    // Loading state
    if (quiz.status === 'loading' && !quiz.currentQuestion) {
        return (
            <div className="qz-page">
                <div className="qz-state">
                    <div className="qz-spinner" />
                    <p>Preparando tu quiz...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (quiz.status === 'failed' && !quiz.result && !quiz.currentQuestion) {
        return (
            <div className="qz-page">
                <div className="qz-state qz-state--error">
                    <p>{quiz.error || 'Ocurrió un error inesperado'}</p>
                    <button onClick={quiz.handleRetry}>Reintentar</button>
                    <button onClick={quiz.handleGoHome}>Volver al inicio</button>
                </div>
            </div>
        );
    }

    // Results screen
    if (quiz.result) {
        return (
            <div className="qz-page">
                <QuizResult
                    result={quiz.result}
                    onRetry={quiz.handleRetry}
                    onGoHome={quiz.handleGoHome}
                />
            </div>
        );
    }

    // No question loaded
    if (!quiz.currentQuestion) return null;

    return (
        <div className="qz-page">
            <div className="qz-wrapper">
                <QuizHeader
                    currentIndex={quiz.currentQuestionIndex}
                    totalQuestions={quiz.questions.length}
                    progressPercent={quiz.progressPercent}
                    totalScore={quiz.totalScore}
                    onAbandon={quiz.handleAbandon}
                />

                <QuizTimer
                    timeLeft={quiz.timeLeft}
                    timerPercent={quiz.timerPercent}
                    timerStatus={quiz.timerStatus}
                />

                <QuizQuestion
                    question={quiz.currentQuestion}
                    currentIndex={quiz.currentQuestionIndex}
                    totalQuestions={quiz.questions.length}
                    answerFeedback={quiz.answerFeedback}
                    isSubmitting={quiz.status === 'submitting'}
                    timeLeft={quiz.timeLeft}
                    onSelectOption={quiz.handleSelectOption}
                />

                {quiz.answerFeedback && (
                    <QuizFeedback
                        feedback={quiz.answerFeedback}
                        isLastQuestion={quiz.isLastQuestion}
                        onNext={quiz.handleNextQuestion}
                        onFinish={quiz.handleFinish}
                    />
                )}

                <AbandonModal
                    isOpen={quiz.showAbandonModal}
                    onConfirm={quiz.confirmAbandon}
                    onCancel={quiz.cancelAbandon}
                />
            </div>
        </div>
    );
};

export default QuizzPage;
