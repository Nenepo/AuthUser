import React, { useState, useEffect } from 'react';
import { auth, db } from '../services/config';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import Header from '../components/Header';

// Asynchronous function to fetch user data
export const fetchUserData = async (uid) => {
  try {
    const userRef = ref(db, `users/${uid}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val(); // returns user data
    } else {
      console.log('No user data found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    return null;
  }
};

function WelcomePage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const data = await fetchUserData(uid); // Wait for the data to be fetched
        setUserData(data); // Set the user data once it is fetched
      }
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, []);

  if (!userData) {
    return <div>Loading user data...</div>;
  }

  return (
    <>
      <Header />
      <div className='bg-bgLightBlue h-[90vh] mx-auto w-full mt-24 text-[6rem] lg:text-[8rem] font-semibold text-center '>Welcome {userData.username}</div>
      </>

  );
}

export default WelcomePage;
