import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, FormControlLabel, Radio, RadioGroup, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Container, Chip, Link } from '@mui/material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import questionsData from './testquestions.json'; // Ensure this path is correct

const TestComponent = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [timer, setTimer] = useState(2 * 60 * 60); // 2 hours in seconds
  const [showNumbers, setShowNumbers] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    if (timer === 0) {
      clearInterval(interval);
      handleCalculateScore();
    }

    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = () => {
    const hours = Math.floor(timer / 3600);
    const minutes = Math.floor((timer % 3600) / 60);
    const seconds = timer % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleOptionChange = (event) => {
    setSelectedOptions({ ...selectedOptions, [currentQuestion]: event.target.value });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < 59) { // Ensure it doesn't go beyond 60 questions
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleCalculateScore = () => {
    let correctCount = Object.keys(selectedOptions).reduce((acc, key) => {
      const questionIndex = parseInt(key, 10);
      const isCorrect = questionsData[questionIndex].correct_answer === selectedOptions[key];
      return acc + (isCorrect ? 1 : 0);
    }, 0);

    setScore({
      correct: correctCount,
      incorrect: 60 - correctCount // Assuming always 60 questions, adjust based on actual count
    });

    setShowResults(true);
  };

  const generatePDF = async () => {
    const element = document.getElementById('result-container');
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 0, 0);
    pdf.save('quiz-results.pdf');
  };

  if (showResults) {
    return (
      <Dialog open={showResults} onClose={() => setShowResults(false)}>
        <DialogTitle>Quiz Results</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You scored {score.correct} out of 60.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowResults(false)}>Close</Button>
          <Button onClick={generatePDF}>Download Results</Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Quiz Time
      </Typography>
      <Typography variant="h6">
        Time Remaining: {formatTime()}
      </Typography>
      <Box sx={{ my: 2 }}>
        <Button variant="contained" onClick={() => setShowNumbers(!showNumbers)}>
          {showNumbers ? 'Hide Question Numbers' : 'Show Question Numbers'}
        </Button>
      </Box>
      {showNumbers && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, my: 2 }}>
          {questionsData.slice(0, 60).map((_, index) => (
            <Chip
              label={index + 1}
              color={selectedOptions[index] ? 'primary' : 'default'}
              onClick={() => setCurrentQuestion(index)}
              key={index}
            />
          ))}
        </Box>
      )}
      <Box sx={{ my: 4 }}>
        <Typography variant="h5">{questionsData[currentQuestion].question}</Typography>
        {questionsData[currentQuestion].question_link && (
          <Typography sx={{ mt: 2 }}>
            <Link href={questionsData[currentQuestion].question_link} target="_blank" rel="noopener noreferrer">
              View Chart
            </Link>
          </Typography>
        )}
        <RadioGroup value={selectedOptions[currentQuestion] || ''} onChange={handleOptionChange}>
          {questionsData[currentQuestion].answers.map((answer, index) => (
            <FormControlLabel key={index} value={answer} control={<Radio />} label={answer} />
          ))}
        </RadioGroup>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
            Previous
          </Button>
          <Button onClick={handleNextQuestion} disabled={currentQuestion === 59}>
            Next
          </Button>
        </Box>
        {currentQuestion === 59 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleCalculateScore}>
              Submit
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default TestComponent;