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

// const applyStylesToResultContent = () => {
//   const resultDiv = document.getElementById("result-container");
  
//   // Add padding and background color
//   resultDiv.style.padding = "20px";
//   resultDiv.style.backgroundColor = "#ffffff";
  
//   // Style the individual question containers
//   const questionContainers = resultDiv.querySelectorAll(".result-question");
//   questionContainers.forEach((questionContainer) => {
//     questionContainer.style.padding = "10px";
//     questionContainer.style.marginBottom = "20px";
//     questionContainer.style.border = "1px solid #cccccc";
//     questionContainer.style.borderRadius = "5px";
//   });

//   // Add any other desired styles here
// };

const generatePDF = async () => {
  const resultDiv = document.querySelector(".result-container");

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
    setQuestions(shuffledQuestions.slice(0, 30));
    setSelectedOptions(new Array(30).fill(""));
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

  useEffect(() => {
    if (showResults) {
      generatePDF();
    }
  }, [showResults]);

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
    const selectedIndex = parseInt(target.value);
    updatedOptions[currentQuestion] = selectedIndex;
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
      parseInt(selectedOptions[index]) === question.correctAnswerIndex
          ? total + 1
          : total,
      0
    );
    setScore({ correct, incorrect: questions.length - correct });
    setShowResults(true);
    setEndTime(new Date());
 
  };

  if (showResults) {
    const timeTaken = Math.round((endTime - startTime) / 1000);
  
    return (
      <div className="quiz-container">
        <div className="result-container" id="result-container">
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
                      answer === q.answers[selectedOptions[index]] &&
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
        selectedOptions[index] !== "" ? "answered" : ""
      } ${
        currentQuestion === index ? "current-question" : ""
      }`}
      onClick={() => handleQuestionClick(index)}
    >
      <span
        className={`question-number-text ${
          selectedOptions[index] !== "" ? "answered" : ""
        }`}
      >
        {index + 1}
      </span>
    </button>
  ))}
</div>
    <div className="question-container">
      <h2>{question.question}</h2>
      {question.link && (
        <p>
          <a href={question.link} target="_blank" rel="noreferrer" className="open_link">
            Open Chart 
          </a>
        </p>
      )}
      <div className="options-container">
      {question.answers.map((answer, index) => (
  <div key={index} className="option">
    <label>
      <input
        type="radio"
        value={index}
        checked={selectedOptions[currentQuestion] === index}
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
