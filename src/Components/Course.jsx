import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import courseData from './courseData.json';
import Quiz from './Quiz';
import { Button, Drawer, List, ListItem, ListItemText, Typography, Box, IconButton, Collapse, useTheme, useMediaQuery } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const Course = () => {
    const [currentChapter, setCurrentChapter] = useState(0);
    const [currentSubChapter, setCurrentSubChapter] = useState(0);
    const [showQuiz, setShowQuiz] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [openChapters, setOpenChapters] = useState(Array(courseData.chapters.length).fill(false));
    
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickDrawerButton = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleChapterClick = (index) => {
        const updatedOpenChapters = [...openChapters];
        updatedOpenChapters[index] = !updatedOpenChapters[index];
        setOpenChapters(updatedOpenChapters);
    };

    const handleChapterSelection = (chapterIndex, subChapterIndex) => {
        setCurrentChapter(chapterIndex);
        setCurrentSubChapter(subChapterIndex);
        setShowQuiz(false);
        setIsDrawerOpen(false); // Close the drawer when a chapter is selected
    };

    return (
        <>
            <Box sx={{ position: 'fixed', top: '75px', left: '20px', zIndex: 1000 }}> {/* Changed to fixed positioning */}
                <Button onClick={handleClickDrawerButton} color="inherit" variant="outlined" startIcon={<ArrowForwardIosIcon />}>
                    <Typography variant="body1">Chapters</Typography>
                </Button>
            </Box>
            <Drawer anchor="left" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                <List>
                    {courseData.chapters.map((chapter, chapterIndex) => (
                        <React.Fragment key={chapterIndex}>
                            <ListItem button onClick={() => handleChapterClick(chapterIndex)}>
                                <ListItemText primary={<Typography variant="body1" style={{ fontWeight: 'bold' }}>{chapter.title}</Typography>} />
                                {openChapters[chapterIndex] ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={openChapters[chapterIndex]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {chapter.subChapters.map((subChapter, subChapterIndex) => (
                                        <ListItem button key={subChapterIndex} onClick={() => handleChapterSelection(chapterIndex, subChapterIndex)} sx={{ pl: 4 }}>
                                            <ListItemText primary={subChapter.title} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        </React.Fragment>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, pt: isMobile ? '100px' : '24px' }}>
                <Box sx={{ maxWidth: '80%', margin: 'auto' }}>
                    <ReactPlayer
                        url={courseData.chapters[currentChapter].subChapters[currentSubChapter].videoUrl}
                        controls
                        width="100%"
                        height="100%"
                        style={{ aspectRatio: '16/9' }}
                    />
                </Box>
                <Typography variant="h6" sx={{ mt: 2, textAlign: 'center', fontWeight: 'bold' }}>
                    {courseData.chapters[currentChapter].subChapters[currentSubChapter].title}
                </Typography>
                <Button variant="contained" onClick={() => setShowQuiz(!showQuiz)} sx={{ display: 'block', margin: '20px auto' }}>
                    {showQuiz ? 'Close Quiz' : 'Open Quiz'}
                </Button>
                {showQuiz && <Quiz quizData={courseData.chapters[currentChapter].quiz} />}
            </Box>
        </>
    );
};

export default Course;