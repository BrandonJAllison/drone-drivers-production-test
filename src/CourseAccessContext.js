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
            const data = await response.json();
            console.log('has paid', data[0].has_paid); // Access has_paid from the first item in the data array
            setHasPaid(data[0].has_paid);
        } catch (error) {
            console.error("Error fetching user payment status at this time :", error);
        }
    };

    if (user.username) { // Also make sure this condition is correct for fetching
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