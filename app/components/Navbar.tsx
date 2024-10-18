"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch('/api/check-auth', { method: 'GET' });
      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, );
  return (
    <nav className="bg-[var(--background)] p-4 shadow-md fixed top-0 left-0 w-full z-50">
  <ul className="flex space-x-4">
    <li>
      {isAuthenticated ? (
        <Link href="/logout" className="text-[var(--foreground)] hover:text-teal-300 transition duration-300 ease-in-out">
          Déconnexion
        </Link>
      ) : (
        <Link href="/login" className="text-[var(--foreground)] hover:text-teal-300 transition duration-300 ease-in-out">
          Connexion
        </Link>
      )}
    </li>
    <li>
      <Link href="/dashboard" className="text-[var(--foreground)] hover:text-teal-300 transition duration-300 ease-in-out">
        Tableau de bord
      </Link>
    </li>
  </ul>
</nav>
  );
};

export default Navbar;
