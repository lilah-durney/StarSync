import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase'; 
import { onAuthStateChanged } from 'firebase/auth'; 
import { db } from '../../firebase'; 
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function UserHome() {
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState('');

    const fetchUserData = async (userId) => {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);

        try {
            if (docSnap.exists()) {
                console.log("User's data:", docSnap.data());
                const userData = docSnap.data();
                setUserProfile({
                    name: userData.name,
                    birthCity: userData.birthCity,
                    birthState: userData.birthState,
                    birthDate: userData.birthDate,
                    birthTime: userData.birthTime,
                });
            } else {
                console.log("No such document, user's data doesn't exist");
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                navigate("/login");
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    useEffect(() => {
        if (isAuthenticated && userId) {
            fetchUserData(userId);
        }
    }, [isAuthenticated, userId]);

    // Conditional rendering to avoid accessing userProfile before it's set
    if (!userProfile) {
        return <p>Loading...</p>;
    }

    return (
        <div className="user-welcome">
            <h1>Hello, {userProfile.name}.</h1>
            <h3>
                {userProfile.birthCity}, {userProfile.birthState}
            </h3>
            <h3>{userProfile.birthDate}, {userProfile.birthTime}</h3>
        </div>
    );
}

export default UserHome;
