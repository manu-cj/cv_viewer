// app/login/page.tsx
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Note : utilises le chemin correct

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      setMessage('Connexion réussie !');
      router.push('/dashboard'); // Redirection après la connexion réussie
    } else {
      const errorData = await res.json();
      setMessage(`Erreur : ${errorData.error}`);
    }
  };

  return (
    <div className="mx-auto mt-10 p-6 bg-gray-800 shadow-lg rounded-lg py-12 px-16 w-2/5 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold text-center mb-6">Connexion</h1>
      <form onSubmit={handleSubmit} className="space-y-4 text-black w-full flex flex-col justify-center items-center py-8">
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          className="w-4/5 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
          required 
        />
        <input 
          type="password" 
          placeholder="Mot de passe" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="w-4/5 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required 
        />
        <button 
        type="submit"
        className="w-4/5 bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Se connecter
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginPage;
