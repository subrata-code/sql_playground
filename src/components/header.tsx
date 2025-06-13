'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const handleAuth = () => {
    if (!isAuthenticated) {
      router.push('/signin');
    } else {
      setIsAuthenticated(false);
      // Add sign out logic here
    }
  };

  const handleHome = () => {
    router.push('/');
  };

  return (
    <header className="flex items-center justify-between bg-blue-600 text-white px-6 py-4 shadow-md rounded-md mb-8">
      <div className="text-2xl font-bold cursor-pointer" onClick={handleHome}>
        SQL Playground
      </div>
      <nav className="flex gap-4">
        <button
          onClick={handleHome}
          className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition"
        >
          Home
        </button>
        <button
          onClick={handleAuth}
          className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition"
        >
          {isAuthenticated ? 'Sign Out' : 'Sign In'}
        </button>
      </nav>
    </header>
  );
}