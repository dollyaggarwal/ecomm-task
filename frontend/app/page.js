// pages/login.js
"use client"
import { useEffect } from 'react';
import api from '../lib/axiosConfig';

export default function Login() {
  const handleGoogleLogin = async () => {
    try {
     
      const response = await api.get('/auth/google');
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };

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
