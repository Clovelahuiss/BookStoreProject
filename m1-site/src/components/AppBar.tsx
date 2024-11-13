'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

const pages = [
  { name: 'Livres', path: '/books' },
  { name: 'Auteurs', path: '/authors' }
];

const ResponsiveAppBar: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleToggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo and title */}
        <div className="flex items-center">
          <Link href="/" passHref>
            <button className="flex items-center space-x-2" onClick={() => window.location.href = '/'}>
              <img src="/logo_library.png" alt="Logo" className="w-10 h-10" />
              <span className="text-2xl font-semibold hidden md:block">BookApp</span>
            </button>
          </Link>
        </div>
        
        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-4">
          {pages.map((page) => (
            <Link key={page.name} href={page.path}>
              <button className="hover:bg-blue-700 px-3 py-2 rounded transition">{page.name}</button>
            </Link>
          ))}
        </div>

        {/* Mobile menu toggle button */}
        <button onClick={handleToggleNav} className="md:hidden">
          {isNavOpen ? (
            <XIcon className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Links */}
      {isNavOpen && (
        <div className="md:hidden bg-blue-700 space-y-1 pb-3">
          {pages.map((page) => (
            <Link key={page.name} href={page.path}>
              <button
                className="block w-full text-left px-4 py-2 text-white hover:bg-blue-800 transition"
                onClick={() => {
                  setIsNavOpen(false);
                  window.location.href = page.path;
                }}
              >
                {page.name}
              </button>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default ResponsiveAppBar;
