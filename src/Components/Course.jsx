import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import courseData from './courseData.json';
import './Course.css';

const Course = () => {
    
  const [currentChapter, setCurrentChapter] = useState(0);
  const [currentSubChapter, setCurrentSubChapter] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [result, setResult] = useState(null);
  const [isCourseLocked, setIsCourseLocked] = useState(true);



    const currentCourse = courseData.chapters[currentChapter];
    const currentSubCourse = currentCourse.subChapters[currentSubChapter];
  
    const totalSubChapters = courseData.chapters.reduce((sum, chapter) => sum + chapter.subChapters.length, 0);
    const progress = ((courseData.chapters.slice(0, currentChapter).reduce((sum, chapter) => sum + chapter.subChapters.length, 0)) + currentSubChapter) / totalSubChapters * 100;
  
    const handleQuizSubmit = () => {
      if (selectedAnswer === currentCourse.quiz[0].answer) {
        setResult('Correct!');
      } else {
        setResult('Incorrect. Try again!');
      }
    };

    const handleChapterSelection = (chapterIndex, subChapterIndex) => {
        setCurrentChapter(chapterIndex);
        setCurrentSubChapter(subChapterIndex);
        setShowQuiz(false);
        setResult(null);
        setSelectedAnswer(null);
      };
    
      const handleVideoEnd = () => {
        if (currentSubChapter + 1 < currentCourse.subChapters.length) {
          setCurrentSubChapter(currentSubChapter + 1);
        } else if (currentChapter + 1 < courseData.chapters.length) {
          setCurrentChapter(currentChapter + 1);
          setCurrentSubChapter(0);
        }
        setShowQuiz(false);
        setResult(null);
        setSelectedAnswer(null);
      };

      return (
        <>
          {isCourseLocked ? (
            <div className="lockedView">
              <h1>This course is locked. Please purchase to unlock it.</h1>
            </div>
          ) : (
            <div className="container">
              <div className="sidebar">
                <h3>FAA Part 107</h3>
                <ul>
                  {courseData.chapters.map((chapter, chapterIndex) => (
                    <React.Fragment key={chapterIndex}>
                      <li className={`chapterTitle sidebarItem`}>{chapter.title}</li>
                      {chapter.subChapters.map((subChapter, subChapterIndex) => (
                        <li
                          key={subChapterIndex}
                          className={"sidebarItem"}
                          onClick={() => handleChapterSelection(chapterIndex, subChapterIndex)}
                        >
                          {subChapter.title}
                        </li>
                      ))}
                    </React.Fragment>
                  ))}
                </ul>
              </div>
              <div className="content">
              <div className="playerWrapper">
                <ReactPlayer
                  className={"ReactPlayer"}
                  url={currentSubCourse.videoUrl}
                  controls
                  autoPlay
                  onEnded={handleVideoEnd}
                />
              </div>
              <div className="description">{currentSubCourse.description}</div>
              {/* <div className="courseWrapper">
                {showQuiz ? (
                  <div className="quizContainer">
                    <h3>{currentCourse.quiz[0].question}</h3>
                    {currentCourse.quiz[0].options.map((option, index) => (
                      <div key={index}>
                        <input
                          type="radio"
                          name="quiz"
                          value={index}
                          onChange={() => setSelectedAnswer(index)}
                        />
                        <label>{option}</label>
                      </div>
                    ))}
                    <button className="quizButton" onClick={handleQuizSubmit}>
                      Submit
                    </button>
                    {result && <p>{result}</p>}
                  </div>
                ) : (
                  <div className="buttonContainer">
                    <button className="quizButton" onClick={() => setShowQuiz(true)}>
                      Take Quiz
                    </button>
                  </div>
                )}
              </div> */}
            </div>
          </div>
        )}
      </>
    );
  };

  export default Course;

    
    
  
