import React, { useState } from 'react';
import Link from 'next/link';

// Define the structure for our navigation items
interface NavItem {
  label: string;
  href: string;
  hasSubmenu?: boolean;
}


export default function HamburgerMenu() {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  // Menu items matched directly to the layout
  const mainNavItems: NavItem[] = [
    { label: 'Templates', href: '/templates', hasSubmenu: true },
    { label: 'Venues', href: '/venue', hasSubmenu: true },
    { label: 'Journal', href: '/journal', hasSubmenu: true },
    { label: 'FAQ', href: '/faq', hasSubmenu: true },
    { label: 'Contact Us', href: '/contact-us', hasSubmenu: true }
  ];


  return (
    <nav className="relativebg-white px-2 py-2 flex items-center justify-between z-50 font-sans">
      
      <div className="flex items-center space-x-3">
        <button
          onClick={toggleMenu}
          className="flex flex-col justify-center items-center w-6 h-6 space-y-1.5 focus:outline-none z-50"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            // Close (X) Icon
            <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger Menu Icon
            <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Slide-out Sidebar Drawer Overlay */}
      <div
        className={`fixed top-[53px] left-0 bottom-0 w-full sm:w-[380px] bg-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out border-r border-gray-200 z-40 overflow-y-auto`}
      >
        <div className="py-4">
          {/* Header Title inside Drawer */}
          <div className="px-5 py-2 text-xl font-extrabold text-gray-900 tracking-tight">
            Main menu
          </div>
          
          <hr className="border-gray-200 my-2" />

          {/* Navigation Links List */}
          <ul className="flex flex-col">
            {mainNavItems.map((item, index) => (
                      
              <li key={index} className="border-b border-gray-100 last:border-none">
                <Link
                  href={item.href}
                  onClick={toggleMenu}
                  className="flex items-center justify-between px-5 py-4 text-[16px] font-semibold text-gray-900 hover:bg-gray-50 transition"
                >
                  <span>{item.label}</span>
                  {item.hasSubmenu && (
                    // Right arrow Chevron indicator
                    <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </Link>
              </li>
            ))}
            
            {/* Account Management Actions */}
            <li className="px-5 pt-6 pb-2">
              <Link href="#login" className="text-[#ff2395] font-bold hover:underline block text-[16px]">
                Log in
              </Link>
            </li>
            <li className="px-5 py-2">
              <Link href="#signup" className="text-[#ff2395] font-bold hover:underline block text-[16px]">
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Optional: Dark backdrop overlay behind the sidebar when open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 transition-opacity"
          onClick={toggleMenu}
        />
      )}
    </nav>
  );
}
