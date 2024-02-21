import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Profile.css";
import CheckoutButton from '../checkoutbutton.jsx';

const Profile = ({ user, signout }) => {
    console.log('REACT_APP_TEST_VARIABLE', process.env.REACT_APP_TEST_VARIABLE);
    const navigate = useNavigate();

    const hasPaid = user?.hasPaidForFAAPart107;

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
        const response = await fetch('https://plankton-app-3pnzq.ondigitalocean.app/api/stripe/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // Add any necessary body content your API expects
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json(); // Assuming this returns { url: "stripe_checkout_url" }
    }

    return (
        <div className="profile-container">
            {user && (
                <>
                    <div className="section info-card">
                        <h1>User Information</h1>
                        <ul>
                            <li><span className="info-label">Name:  </span>{user.attributes.name}</li>
                            <li><span className="info-label">Username:</span> {user.attributes.preferred_username}</li>
                            <li><span className="info-label">Email:</span> {user.attributes.email}</li>
                        </ul>
                    </div>

                    <div className="section">
                        <h1>Courses</h1>
                        <div className="course">
                            <img 
                                src="https://dronedriver.com/wp-content/uploads/2023/11/part-107-card.png"
                                alt="FAA Part 107 Training Course"
                                className={`course-image ${!hasPaid ? 'locked-image' : ''}`}
                            />
                            {!hasPaid && (
                                <div className="locked-course">
                                    <span className="lock-icon">🔒</span>
                                    <CheckoutButton onClick={handlePurchaseClick} />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="section">
                        <h1>Test Scores</h1>
                        <div className="scores">
                            <h4>You Have No Test Scores To Display</h4>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Profile;