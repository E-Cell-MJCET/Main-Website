// profile/page.tsx
"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const router = useRouter();
  const user = getCurrentUser(); // Replace with your user authentication logic

  useEffect(() => {
    if (user) {
      // Redirect authenticated user to their profile page based on their userId
      router.push(`/profile/${user.id}`);
    } else {
      // Optionally, handle case where user is not authenticated (e.g., redirect to login page)
      router.push('/login');
    }
  }, [user, router]);

  return <div>Redirecting...</div>;
};

// Dummy function for getting the current authenticated user
function getCurrentUser() {
  // In real scenarios, replace this with actual authentication logic (e.g., checking a cookie, JWT token, etc.)
  return { id: '123', name: 'John Doe' }; // Example user
}

export default ProfilePage;
