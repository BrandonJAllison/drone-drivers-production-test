import React, { useState, useEffect } from "react";
import questionsData from "./testquestions.json";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const TestComponent = () => {

    const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array(60).fill(""));
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [showResults, setShowResults] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    const shuffledQuestions = [...questionsData];
    shuffleArray(shuffledQuestions);
    setQuestions(shuffledQuestions.slice(0, 7));
    setSelectedOptions(new Array(7).fill(""));
    setStartTime(new Date());
  }, []);

  const question = questions[currentQuestion];

  const handleOptionChange = (event) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentQuestion] = event.target.value;
    setSelectedOptions(updatedOptions);
  };

  const handleNext = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleBack = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestion(index);
  };

  const handleSubmit = () => {
    let correct = 0;
    let incorrect = 0;
  
    selectedOptions.forEach((option, index) => {
      if (option === questions[index].answers[questions[index].correctAnswerIndex]) {
        correct++;
      } else {
        incorrect++;
      }
    });
  
    setScore({ correct, incorrect });
    setShowResults(true);
    setEndTime(new Date()); // Move this line from useEffect to here
  };

  if (showResults) {
    const timeTaken = Math.round((endTime - startTime) / 1000);
  
    const chartData = [
      { name: "Correct", value: score.correct },
      { name: "Incorrect", value: score.incorrect },
    ];
  
    const COLORS = ["#0088FE", "#FF8042"];
  
    return (
      <div className="quiz-container">
        <div className="result-container">
        <h2>Results</h2>
        <p>Correct: {score.correct}</p>
        <p>Incorrect: {score.incorrect}</p>
        <p>Time taken: {timeTaken} seconds</p>
        <ResponsiveContainer width="100%" height={300} debounce={1}>
            <PieChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                >
                {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
            </PieChart>
            </ResponsiveContainer>
      </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="quiz-container">
      <div className="question-list">
        {questions.map((_, index) => (
          <button
            key={index}
            className={`question-number ${
              currentQuestion === index ? "active-question" : ""
            }`}
            onClick={() => handleQuestionClick(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className="question-container">
        <h2>{question.question}</h2>
        <div className="options-container">
          {question.answers.map((answer, index) => (
            <div key={index} className="option">
              <label>
                <input
                  type="radio"
                  value={answer}
                  checked={selectedOptions[currentQuestion] === answer}
                  onChange={handleOptionChange}
                />
                <span className="option-text">{answer}</span>
              </label>
            </div>
          ))}
        </div>
        <div className="button-container">
          {currentQuestion > 0 && (
            <button className="nav-button" onClick={handleBack}>
              Back
            </button>
          )}
          {currentQuestion < questions.length - 1 ? (
            <button className="nav-button" onClick={handleNext}>
              Next
            </button> 
          ) : (
            <button className="nav-button" onClick={handleSubmit}>
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestComponent;