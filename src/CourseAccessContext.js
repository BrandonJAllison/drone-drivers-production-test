import React, { createContext, useState, useEffect, useContext } from 'react';

// Context
const CourseAccessContext = createContext();

// Provider
export const CourseAccessProvider = ({ user, children }) => {
    const [hasPaid, setHasPaid] = useState(false);

    useEffect(() => {
        // Placeholder for the actual user ID retrieval logic
        const userId = 'currentUserId';

        const fetchUserPaymentStatus = async () => {
            try {
                const response = await fetch(`https://plankton-app-3pnzq.ondigitalocean.app/api/user/${user.username}/hasPaid`);
                const data = await response.json();
                console.log(data)
                setHasPaid(data.hasPaid);
            } catch (error) {
                console.error("Error fetching user payment status:", error);
            }
        };

        fetchUserPaymentStatus();
    }, []);

    return (
        <CourseAccessContext.Provider value={{ hasPaid }}>
            {children}
        </CourseAccessContext.Provider>
    );
};

// Custom hook for consuming context
export const useCourseAccess = () => useContext(CourseAccessContext);