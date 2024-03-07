import React, { createContext, useState, useEffect, useContext } from 'react';

// Context
const CourseAccessContext = createContext();

// Provider
export const CourseAccessProvider = ({ user, children }) => {
    const [hasPaid, setHasPaid] = useState(false);

    useEffect(() => {
        const fetchUserPaymentStatus = async () => {
            try {
                const response = await fetch(`https://plankton-app-3pnzq.ondigitalocean.app/api/user/${user.username}`);
                const { data } = await response.json();
    
                // Check if data is an array and has at least one item
                if (Array.isArray(data) && data.length > 0) {
                    console.log('has paid', data[0].has_paid);
                    setHasPaid(data[0].has_paid);
                } else {
                    // Handle case where data is empty or not an array
                    console.log('No payment data found or unexpected data structure:', data);
                    setHasPaid(false); // Assuming default to false if no data found
                }
            } catch (error) {
                console.error("Error fetching user payment status:", error);
            }
        };
    
        if (user.username) {
            fetchUserPaymentStatus();
        }
    }, [user.username]);

    return (
        <CourseAccessContext.Provider value={{ hasPaid }}>
            {children}
        </CourseAccessContext.Provider>
    );
};

// Custom hook for consuming context
export const useCourseAccess = () => useContext(CourseAccessContext);