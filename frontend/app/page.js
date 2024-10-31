"use client"
import { useEffect } from 'react';
import axios from 'axios';

export default function Login() {
  const handleGoogleLogin = () => {
    // Redirect to backend route for Google OAuth
    window.location.href = 'http://localhost:8000/auth/google'; // Adjust the port and path as per your backend configuration
  };

  useEffect(() => {
    // After redirect from backend, check for tokens in URL and store them in local storage
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');

    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
      window.location.href = '/products'; // Redirect to products page after successful login
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Login</h1>
      <button
        onClick={handleGoogleLogin}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Login with Google
      </button>
    </div>
  );
}
