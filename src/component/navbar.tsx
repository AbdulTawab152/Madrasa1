'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { navigation, appConfig } from '../lib/config';

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      backgroundColor: 'white',
      borderBottom: '1px solid #e5e7eb',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '70px'
        }}>
          {/* Logo and Brand */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#10b981',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
              }}>
                <span style={{ 
                  color: 'white', 
                  fontSize: '18px', 
                  fontWeight: 'bold'
                }}>م</span>
              </div>
              
              <div>
                <h1 style={{ 
                  fontSize: '20px', 
                  fontWeight: 'bold', 
                  color: '#111827',
                  margin: 0
                }}>
                  {appConfig.name}
                </h1>
                <p style={{ 
                  fontSize: '12px', 
                  color: '#6b7280',
                  margin: 0
                }}>
                  Islamic Learning
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {navigation.main.slice(0, 6).map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    padding: '8px 16px',
                    fontSize: '14px',
                    fontWeight: 500,
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: isActive ? '#10b981' : '#374151',
                    backgroundColor: isActive ? '#f0fdf4' : 'transparent',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Side - Mobile Menu Button and Support Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{
                padding: '8px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#374151',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div style={{
                width: '20px',
                height: '20px',
                position: 'relative'
              }}>
                <span style={{
                  position: 'absolute',
                  height: '2px',
                  width: '20px',
                  backgroundColor: 'currentColor',
                  transition: 'all 0.2s ease',
                  transform: isOpen ? 'rotate(45deg)' : 'translateY(-4px)'
                }}></span>
                <span style={{
                  position: 'absolute',
                  height: '2px',
                  width: '20px',
                  backgroundColor: 'currentColor',
                  transition: 'all 0.2s ease',
                  opacity: isOpen ? 0 : 1
                }}></span>
                <span style={{
                  position: 'absolute',
                  height: '2px',
                  width: '20px',
                  backgroundColor: 'currentColor',
                  transition: 'all 0.2s ease',
                  transform: isOpen ? 'rotate(-45deg)' : 'translateY(4px)'
                }}></span>
              </div>
            </button>

            {/* Support Button */}
            <Link
              href="/donation"
              style={{
                padding: '8px 20px',
                fontSize: '14px',
                fontWeight: 600,
                backgroundColor: '#10b981',
                color: 'white',
                borderRadius: '20px',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
            >
              Support Us
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div style={{
          maxHeight: isOpen ? '400px' : '0',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          backgroundColor: '#f9fafb',
          borderRadius: '8px',
          margin: '8px 0'
        }}>
          <div style={{ 
            padding: '16px',
            display: 'flex', 
            flexDirection: 'column', 
            gap: '8px' 
          }}>
            {navigation.main.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    padding: '10px 16px',
                    fontSize: '14px',
                    fontWeight: 500,
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: isActive ? '#10b981' : '#374151',
                    backgroundColor: isActive ? '#f0fdf4' : 'transparent'
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
            <div style={{ 
              paddingTop: '12px', 
              borderTop: '1px solid #e5e7eb',
              marginTop: '8px'
            }}>
              <Link
                href="/donation"
                style={{
                  display: 'block',
                  padding: '10px 16px',
                  fontSize: '14px',
                  fontWeight: 600,
                  textAlign: 'center',
                  backgroundColor: '#10b981',
                  color: 'white',
                  borderRadius: '8px',
                  textDecoration: 'none'
                }}
                onClick={() => setIsOpen(false)}
              >
                Support Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
 