'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        // Parsing response error to get more detail
        const errorData = await response.json();
        setError(errorData.message || 'Invalid credentials');
        return; // Stop execution if login fails
      }

      const { token } = await response.json();

      if (!token) {
        setError('Token not received');
        return;
      }

      // Store the JWT in cookies with HttpOnly flag for security
      document.cookie = `authToken=${token}; path=/; secure; HttpOnly; samesite=lax;`;

      // Decode JWT to get the user role and redirect accordingly
      const decoded = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      const role = decoded.role;

      // Route based on role
      if (role === 'admin') {
        router.push('/dashboard');
      } else if (role === 'user') {
        router.push('/user');
      } else {
        setError('Invalid user role');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="w-full max-w-sm bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input type="text" className="w-full px-3 py-2 border rounded" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Password</label>
          <input type="password" className="w-full px-3 py-2 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
}
