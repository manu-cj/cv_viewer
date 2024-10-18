import React from 'react';
/* eslint-disable react/no-unescaped-entities */
const Footer = () => {
  return (
    <footer className="bg-[var(--background)] p-6 text-[var(--foreground)] shadow-md">
      <div className="max-w-screen-lg mx-auto flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm">© 2024 cv viewer. Tous droits réservés.</p>
        <ul className="flex space-x-4 mt-2 sm:mt-0">
          <li>
            <a href="/terms" className="hover:text-teal-400 transition-colors duration-300 ease-in-out">
              Conditions d'utilisation
            </a>
          </li>
          <li>
            <a href="/privacy" className="hover:text-teal-400 transition-colors duration-300 ease-in-out">
              Politique de confidentialité
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:text-teal-400 transition-colors duration-300 ease-in-out">
              Contactez-nous
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
