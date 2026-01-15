import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  // --- Decorative Shared Styles ---
  const navContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 8%',
    background: 'rgba(15, 23, 42, 0.9)', // Deep Navy Glass
    backdropFilter: 'blur(10px)',
    borderBottom: '2px solid #38bdf8', // Blue bottom accent
    position: 'sticky',
    top: 0,
    zIndex: 1000
  };

  const logoTextStyle = {
    fontSize: '2rem',
    fontWeight: '900',
    letterSpacing: '-1px',
    margin: 0,
    color: '#ffffff',
    textShadow: '0 0 10px rgba(56, 189, 248, 0.5)', // Blue glow
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none'
  };

  const getButtonStyle = (path) => ({
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: '700',
    padding: '10px 25px',
    borderRadius: '12px', // Modern squircle shape
    transition: '0.3s all ease',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    // Logic: Active is Solid Red, Inactive is White Text with Blue Border
    background: location.pathname === path ? '#ef4444' : 'transparent',
    color: location.pathname === path ? '#ffffff' : '#f8fafc',
    border: location.pathname === path ? '2px solid #ef4444' : '2px solid #38bdf8',
    boxShadow: location.pathname === path ? '0 0 15px rgba(239, 68, 68, 0.5)' : 'none',
  });

  return (
    <nav style={navContainerStyle}>
      {/* Logo with Red/White/Blue Decor */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h2 style={logoTextStyle}>
          <span style={{ filter: 'drop-shadow(0 0 5px white)' }}>🎬</span>
          <span style={{ color: '#ef4444' }}>MOVIE</span>
          <span style={{ color: '#ffffff', fontWeight: '400' }}>EXPLORER</span>
        </h2>
      </Link>

      {/* Button Group */}
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" style={getButtonStyle('/')}>
          Home
        </Link>
        
        <Link to="/add" style={getButtonStyle('/add')}>
          Add Movie
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;