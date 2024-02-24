import React, { useState } from 'react';
import { Typography, Radio, RadioGroup, FormControlLabel, Button, Box, Paper } from '@mui/material';

const Quiz = ({ quizData, onCompletion }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const handleAnswerChange = (event) => {
        setSelectedAnswer(event.target.value);
    };

    const handleSubmit = () => {
        if (parseInt(selectedAnswer, 10) === quizData[currentQuestionIndex].answer) {
            setCorrectAnswersCount(prevCount => prevCount + 1);
        }
        if (currentQuestionIndex + 1 < quizData.length) {
            setSelectedAnswer(''); // Reset selected answer for the next question
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        } else {
            setShowResults(true);
            if(onCompletion) onCompletion(correctAnswersCount, quizData.length);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer('');
        setCorrectAnswersCount(0);
        setShowResults(false);
    };

    if (showResults) {
        return (
            <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h5" gutterBottom>
                    You answered {correctAnswersCount} out of {quizData.length} questions correctly!
                </Typography>
                <Button variant="contained" color="primary" onClick={resetQuiz}>
                    Try Again
                </Button>
            </Paper>
        );
    }

    return (
        <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
                {quizData[currentQuestionIndex].question}
            </Typography>
            <RadioGroup name="quiz-options" value={selectedAnswer} onChange={handleAnswerChange}>
                {quizData[currentQuestionIndex].options.map((option, index) => (
                    <FormControlLabel key={index} value={index.toString()} control={<Radio />} label={option} />
                ))}
            </RadioGroup>
            <Box sx={{ mt: 2 }}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Next
                </Button>
            </Box>
        </Paper>
    );
};

export default Quiz;