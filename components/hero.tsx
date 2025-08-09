
"use client"

import Link from 'next/link';
import React, { useRef,useState } from 'react';
import { Button } from './ui/button';
import Image from 'next/image';

const HeroSection = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (x - 0.5) * 100, // ±10deg tilt
      y: (0.5 - y) * 100
    });
  };

  return (
    <section className="relative pt-28 pb-20 px-4 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute top-0 right-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-10 left-1/2 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
            Manage Your Finances
          </span>{' '}
          <br className="hidden sm:block" />
          <span className="text-gray-800">with Intelligence</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          An AI-powered financial management platform that helps you track,
          analyze, and optimize your spending with real-time insights.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <Link href="/dashboard">
            <Button size="lg" className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 shadow-lg transition-all transform hover:scale-105">
              Get Started - It&apos;s Free
            </Button>
          </Link>
          <Link href="https://www.youtube.com/roadsidecoder">
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-2 border-gray-300 hover:border-blue-400 shadow-sm hover:shadow-md transition-all">
              <span className="mr-2">▶</span> Watch Demo
            </Button>
          </Link>
        </div>
        
        <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-gray-100 transform hover:scale-[1.01] transition-transform duration-300 ">
          
          <Image
            src="/ll.avif"
            width={1280}
            height={720}
            alt="Dashboard Preview"
            className="w-full h-auto transition-transform duration-300"
             style={{
        transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            priority
          />
          {/* Mock browser chrome */}
          <div className="absolute top-0 left-0 w-full h-8 bg-gray-100 flex items-center px-4 hidden sm:flex">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="container mx-auto mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="text-2xl md:text-3xl font-bold text-blue-600">10K+</div>
          <div className="text-gray-500">Active Users</div>
        </div>
        <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="text-2xl md:text-3xl font-bold text-teal-600">$50M+</div>
          <div className="text-gray-500">Managed</div>
        </div>
        <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="text-2xl md:text-3xl font-bold text-purple-600">24/7</div>
          <div className="text-gray-500">Support</div>
        </div>
        <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="text-2xl md:text-3xl font-bold text-indigo-600">99.9%</div>
          <div className="text-gray-500">Uptime</div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;