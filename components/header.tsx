


"use client"
import React from 'react';

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { LayoutDashboard, PenBox, Menu, X } from 'lucide-react';
import { useState } from 'react';
import {checkUser} from '@/lib/checkUser';
const Header = () => {
// await checkUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-lg z-50 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Image
              src="/192.png"
              alt="Welth Logo"
              width={100}
              height={48}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <SignedOut>
              <Link href="#features" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">
                Features
              </Link>
              <Link href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">
                Testimonials
              </Link>
              <Link href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">
                Pricing
              </Link>
            </SignedOut>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <SignedIn>
              <Link href="/dashboard">
                <Button variant="outline" className="gap-2 px-4 hover:bg-gray-50 transition-all">
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </Button>
              </Link>
              <Link href="/transaction/create">
                <Button className="gap-2 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all shadow-sm">
                  <PenBox size={18} />
                  <span>Add Transaction</span>
                </Button>
             </Link>
            </SignedIn>
            <SignedOut>
              <SignInButton >
            
                <Button variant="outline" className="px-6">
                  Login
                </Button>
                   
              </SignInButton>
              <SignUpButton >
               
                <Button className="px-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-sm">
                  Sign Up
                </Button>
                
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9 border border-gray-200",
                    userButtonPopoverCard: "shadow-lg rounded-xl",
                  },
                }}
              />
            </SignedIn>
          </div>

        
           <div className="md:hidden flex items-center">
            <Button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
              variant={'outline'}
            >
              {mobileMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </Button>
          </div> 
        </nav>
      </div>

      {/* Mobile Menu */}
        {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-4">
            <SignedOut>
              <Link 
                href="#features" 
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="#testimonials" 
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link 
                href="#pricing" 
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
            </SignedOut>

            <div className="pt-4 border-t border-gray-200">
              <SignedIn>
                <Link 
                  href="/dashboard"
                  className="block w-full px-3 py-2 mb-2 rounded-md bg-gray-50 text-gray-700 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/transaction/create"
                  className="block w-full px-3 py-2 mb-2 rounded-md bg-blue-600 text-white font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Add Transaction
                </Link>
                <div className="flex justify-center pt-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
              <SignedOut>
                <SignInButton forceRedirectUrl="/dashboard">
                  <Button 
                    variant="outline" 
                    className="w-full mb-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Button>
                </SignInButton>
                <SignUpButton forceRedirectUrl="/dashboard">
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Button>
                </SignUpButton>
              </SignedOut>
            </div> 
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;