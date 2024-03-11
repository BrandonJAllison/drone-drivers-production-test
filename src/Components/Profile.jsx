import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, CardMedia, Grid, List, ListItem, ListItemText } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import CheckoutButton from '../checkoutbutton.jsx';
import { useCourseAccess } from '../CourseAccessContext.js';

const Profile = ({ user, signout }) => {
    const { hasPaid } = useCourseAccess();
    console.log('userId', user.username);
    const navigate = useNavigate();
    


    // Function to handle the click on the purchase button
    const handlePurchaseClick = async () => {
        try {
            // Directly initiate checkout without JWT
            const response = await initiateCheckout();
            if (response.url) {
                // Assuming response has a URL to redirect for Stripe Checkout
                window.location.href = response.url;
            } else {
                console.error('Failed to initiate checkout.');
            }
        } catch (error) {
            console.error('Error initiating checkout:', error);
        }
    };

    // Function to initiate checkout directly with your backend for Stripe Checkout
    async function initiateCheckout() {
        const userID = user.username; 
        const userEmail = user.email; 
        console.log(userID, userEmail)
    
        const response = await fetch('https://plankton-app-3pnzq.ondigitalocean.app/api/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userID: userID,
                userEmail: userEmail,
            })
        });
    
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    
        return await response.json(); // Assuming this returns { id: "stripe_session_id", url: "stripe_checkout_url" }
    }

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            {user && (
                <>
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
                                    <Typography variant="h5" component="div">
                                        Courses
                                    </Typography>
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
                </>
            )}
        </Box>
    );
}

export default Profile;