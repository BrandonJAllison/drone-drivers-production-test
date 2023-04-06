import React, { useState, useEffect } from "react";
import questionsData from "./testquestions.json";
import "./TestComponent.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const generatePDF = async () => {
  const resultDiv = document.getElementById("result-container");

  const canvas = await html2canvas(resultDiv);
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  
  // Open PDF in a new tab
  const pdfBlob = pdf.output("blob");
  const pdfURL = URL.createObjectURL(pdfBlob);
  window.open(pdfURL, "_blank");
};

const TestComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array(60).fill(""));
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [showResults, setShowResults] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timer, setTimer] = useState(2 * 60 * 60); // 2 hours in seconds

  useEffect(() => {
    const shuffledQuestions = [...questionsData];
    shuffleArray(shuffledQuestions);
    setQuestions(shuffledQuestions.slice(0, 7));
    setSelectedOptions(new Array(7).fill(""));
    setStartTime(new Date());
  }, []);

  useEffect(() => {
    if (timer > 0 && !showResults) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0) {
      handleSubmit();
    }
  }, [timer, showResults]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Other helper functions (handleOptionChange, handleNext, handleBack, handleQuestionClick, handleSubmit)

  const question = questions[currentQuestion];

  const handleOptionChange = (event) => {
    const target = event.target;
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentQuestion] = target.value;
    setSelectedOptions(updatedOptions);
  
    const question = questions[currentQuestion];
    const parentElement = target.closest(".options-container");
    const optionElements = parentElement.querySelectorAll(".option");
  
    optionElements.forEach((option, index) => {
      if (option.contains(target)) {
        option.classList.remove("unanswered");
        option.classList.add("answered");
      } else {
        option.classList.remove("answered");
      }
    });
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
    // Save results
    const correct = questions.reduce(
      (total, question, index) =>
        question.answers[selectedOptions[index]] ===
        question.answers[question.correctAnswerIndex]
          ? total + 1
          : total,
      0
    );
    setScore({ correct, incorrect: questions.length - correct });
    setShowResults(true);
    setEndTime(new Date());
  
    // Generate the PDF
    generatePDF(questions, selectedOptions).then((pdf) => {
      const pdfDataUrl = pdf.output("datauristring");
      window.open(pdfDataUrl, "_blank");
    });
  };

  if (showResults) {
    const timeTaken = Math.round((endTime - startTime) / 1000);
  
    return (
      <div className="quiz-container">
        <div className="result-container">
          <h2>Results</h2>
          <p>Correct: {score.correct}</p>
          <p>Incorrect: {score.incorrect}</p>
          <p>Time taken: {timeTaken} seconds</p>
          <div>
            {questions.map((q, index) => (
              <div key={index} className="result-question">
                <p>
                  {index + 1}. {q.question}
                </p>
                <div className="result-options">
                  {q.answers.map((answer, i) => {
                    let optionStyle = "";
                    if (answer === q.answers[q.correctAnswerIndex]) {
                      optionStyle = "correct-answer";
                    } else if (
                      answer === selectedOptions[index] &&
                      answer !== q.answers[q.correctAnswerIndex]
                    ) {
                      optionStyle = "wrong-answer";
                    }
                    return (
                      <div key={i} className={`option ${optionStyle}`}>
                        <span className="option-text">{answer}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (questions.length === 0) {
    return <p>Loading...</p>;
  }
  
return (
  <div className="quiz-container">
    <div className="timer-container">
      <p>Time remaining: {formatTime(timer)}</p>
    </div>
    <div className="question-list">
        {questions.map((_, index) => (
          <button
            key={index}
            className={`question-number ${
              currentQuestion === index ? "current-question" : ""
            } ${selectedOptions[index] ? "answered-question" : ""}`}
            onClick={() => handleQuestionClick(index)}
          >
            {index + 1}
          </button>
        ))}
    </div>
    <div className="question-container">
      <h2>{question.question}</h2>
      {question.link && (
        <p>
          <a href={question.link} target="_blank" rel="noreferrer">
            Open link
          </a>
        </p>
      )}
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
        }
export default TestComponent;
