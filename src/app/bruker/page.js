'use client'
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../config/firebaseConfig';
import { useRouter } from 'next/navigation';

export default function Bruker() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // User is signed in
        setUser(currentUser);
        setLoading(false);
      } else {
        // No user is signed in
        router.push('/');
      }
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []); // Empty dependency array means this effect only runs once on mount

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <>
        <h1>My User</h1>
        <p>Name: {user?.displayName || 'Name not available'}</p>
        <p>Email: {user?.email || 'Email not available'}</p>
      </>
  );
}
