import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`nav-bar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <BrainCircuit size={32} color="#38bdf8" />
          <span>AI Career</span>
        </Link>

        <div className="nav-links desktop">
          <Link to="/">Home</Link>
          <Link to="/jobs">Find Jobs</Link>
          <Link to="/skills">Skills</Link>
          <Link to="/about">About</Link>
        </div>

        <div className="nav-actions">
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="theme-toggle">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link to="/login" className="btn-secondary">Login</Link>
          <Link to="/signup" className="btn-primary">Get Started</Link>
          <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/jobs" onClick={() => setIsMobileMenuOpen(false)}>Find Jobs</Link>
          <Link to="/skills" onClick={() => setIsMobileMenuOpen(false)}>Skills</Link>
          <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
          <Link to="/signup" className="btn-primary" onClick={() => setIsMobileMenuOpen(false)}>Get Started</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
