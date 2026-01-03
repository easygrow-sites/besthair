"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary-600">BestHair</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 font-medium">Home</Link>
            <Link href="/services" className="text-gray-700 hover:text-primary-600 font-medium">Services</Link>
            <Link href="/locations" className="text-gray-700 hover:text-primary-600 font-medium">Locations</Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600 font-medium">About</Link>
            <Link href="/blog" className="text-gray-700 hover:text-primary-600 font-medium">Blog</Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-600 font-medium">Contact</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <a href="tel:1300BESTHAIR" className="hidden sm:block bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition">
              Call Now
            </a>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2 border-t border-gray-200 pt-4">
            <Link href="/" className="block text-gray-700 hover:text-primary-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="/services" className="block text-gray-700 hover:text-primary-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Services</Link>
            <Link href="/locations" className="block text-gray-700 hover:text-primary-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Locations</Link>
            <Link href="/about" className="block text-gray-700 hover:text-primary-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link href="/blog" className="block text-gray-700 hover:text-primary-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Blog</Link>
            <Link href="/contact" className="block text-gray-700 hover:text-primary-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            <a href="tel:1300BESTHAIR" className="block bg-primary-600 text-white px-4 py-3 rounded-lg font-semibold text-center mt-4">
              Call Now
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
