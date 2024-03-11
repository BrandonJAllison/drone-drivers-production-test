import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, CardMedia, Grid, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import CheckoutButton from '../checkoutbutton.jsx';
import { useCourseAccess } from '../CourseAccessContext.js';

const Profile = ({ user, signout }) => {
    const { hasPaid } = useCourseAccess();
    const [isLoading, setIsLoading] = useState(true); // Initialize loading state to true
    const navigate = useNavigate();
    
    useEffect(() => {
        if (user && user.attributes && user.attributes.sub) {
            setIsLoading(false); // Set loading to false once user data is confirmed to be loaded
        }
    }, [user]); // Depend on user to re-check when it changes

    const handlePurchaseClick = async () => {
        if (!user || !user.attributes.sub) {
            console.error('UserID is not available.');
            return;
        }
        const userID = user.attributes.sub;
        console.log('Attempting to initiate checkout for:', userID);
    
        try {
            const response = await initiateCheckout(userID);
            if (response.url) {
                window.location.href = response.url;
            } else {
                console.error('Failed to initiate checkout. No URL returned.');
            }
        } catch (error) {
            console.error('Error initiating checkout:', error);
        }
    };

    async function initiateCheckout(userID) {
        console.log('Initiating checkout for:', userID);
        const response = await fetch('https://plankton-app-3pnzq.ondigitalocean.app/api/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userID })
        });
    
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    
        return await response.json();
    }

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={2}>
                {/* User Information */}
                <Grid item xs={12}>
                    <Card raised>
                        <CardContent>
                            <Typography variant="h5" component="div">User Information</Typography>
                            <List dense>
                                <ListItem><ListItemText primary="Name" secondary={user.attributes.name} /></ListItem>
                                <ListItem><ListItemText primary="Username" secondary={user.attributes.preferred_username} /></ListItem>
                                <ListItem><ListItemText primary="Email" secondary={user.attributes.email} /></ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Courses */}
                <Grid item xs={12}>
                    <Card raised>
                        <CardContent>
                            <Typography variant="h5" component="div">Courses</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 2 }}>
                                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 151, filter: !hasPaid ? 'grayscale(100%)' : 'none' }}
                                        image="https://dronedriver.com/wp-content/uploads/2023/11/part-107-card.png"
                                        alt="FAA Part 107 Training Course"
                                    />
                                    {!hasPaid && (
                                        <LockIcon 
                                            color="error" 
                                            sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} 
                                        />
                                    )}
                                </Box>
                                {!hasPaid && (
                                    <Box sx={{ mt: 1 }}>
                                        <CheckoutButton onClick={handlePurchaseClick} />
                                    </Box>
                                )}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Test Scores */}
                <Grid item xs={12}>
                            <Card raised>
                                <CardContent>
                                    <Typography variant="h5" component="div">Test Scores</Typography>
                                    <Typography variant="body2">You Have No Test Scores To Display</Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Invoices */}
                        <Grid item xs={12}>
                            <Card raised sx={{ mb: 2 }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">Invoices</Typography>
                                    {hasPaid ? (
                                        <Typography variant="body1" component="p">You do not have any outstanding invoices.</Typography>
                                    ) : (
                                        <Box sx={{ mt: 2 }}>
                                            <Typography variant="body2" component="p" color="textSecondary">You have no invoices.</Typography>
                                        </Box>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
            </Grid>
        </Box>
    );
};

export default Profile;