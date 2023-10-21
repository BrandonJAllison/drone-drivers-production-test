import React, { useState } from 'react';
import './Quiz.css';

const Quiz = ({ quizData, onCompletion }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const handleAnswerSelect = (index) => {
        setSelectedAnswer(index);
    };

    const handleSubmit = () => {
        if (selectedAnswer === quizData[currentQuestionIndex].answer) {
            setCorrectAnswersCount(prevCount => prevCount + 1);
        }
        if (currentQuestionIndex + 1 < quizData.length) {
            setSelectedAnswer(null);  // Reset selected answer for the next question.
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        } else {
            setShowResults(true);
            onCompletion && onCompletion();
        }
    };

    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setCorrectAnswersCount(0);
        setShowResults(false);
    };

    if (showResults) {
        return (
            <div className="quizResults">
                <h3>You answered {correctAnswersCount} out of {quizData.length} questions correctly!</h3>
                <button onClick={resetQuiz}>Try Again</button>
            </div>
        );
    }

    return (
        <div className="quizContainer">
            <h3 className="questionTitle">{quizData[currentQuestionIndex].question}</h3>
            <div>
                {quizData[currentQuestionIndex].options.map((option, index) => (
                    <div key={index} className="radioOption">
                        <input
                            type="radio"
                            id={`option${index}`}
                            value={index}
                            checked={selectedAnswer === index}
                            onChange={() => handleAnswerSelect(index)}
                        />
                        <label style={{marginTop:'10px'}} htmlFor={`option${index}`}>{option}</label>
                    </div>
                ))}
            </div>
            <button onClick={handleSubmit}>Next</button>
        </div>
    );
};

export default Quiz;