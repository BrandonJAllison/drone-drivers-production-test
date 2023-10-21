import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import courseData from './courseData.json';
import './Course.css';
import Quiz from './Quiz';

const Course = () => {
    const [currentChapter, setCurrentChapter] = useState(0);
    const [currentSubChapter, setCurrentSubChapter] = useState(0);
    const [showQuiz, setShowQuiz] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [result, setResult] = useState(null);
    const [isCourseLocked, setIsCourseLocked] = useState(false);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const currentCourse = courseData.chapters[currentChapter];
    const currentSubCourse = currentCourse.subChapters[currentSubChapter];

    const handleOpenQuiz = () => {
        setShowQuiz(true);
    }

    const handleCloseQuiz = () => {
        setShowQuiz(false);
        setSelectedAnswer(null);
        setResult(null);
    }

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
    };

    return (
        <>
            <button className="toggleButton" onClick={() => setIsSidebarVisible(!isSidebarVisible)}>Lessons</button>
            {isCourseLocked ? (
                <div className="lockedView">
                    <h1>This course is locked. Please purchase to unlock it.</h1>
                </div>
            ) : (
                <div className="container">
                    <div className={isSidebarVisible ? "sidebar showSidebar" : "sidebar"}>
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
                        {!showQuiz ?
                            <button className="quizButton" onClick={handleOpenQuiz}>Open Quiz</button>
                            :
                            <>
                                <button className="quizButton closeQuizButton" onClick={handleCloseQuiz}>Close Quiz</button>
                                <Quiz quizData={currentCourse.quiz} />
                            </>
                        }
                    </div>
                </div>
            )}
        </>
    );
};

export default Course;