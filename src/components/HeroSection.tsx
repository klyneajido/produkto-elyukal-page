"use client";
import { useEffect, useState, useRef } from "react";
import { BeamsBackground } from "./ui/beams-background";
import dynamic from 'next/dynamic';
import Spline from "@splinetool/react-spline";

export function HeroSection() {
  const [randomValue, setRandomValue] = useState(0);
  const splineContainerRef = useRef<HTMLDivElement>(null);
  
  // Handle Spline load event
  const onSplineLoad = (spline: any) => {
    // Access the Spline runtime
    if (spline) {
      // Try to access the background and make it transparent
      try {
        const scene = spline.findObjectByName('Scene');
        if (scene) {
          // Set background to transparent
          scene.background = null;
        }
      } catch (error) {
        console.log('Could not modify Spline background:', error);
      }
    }
  };

  useEffect(() => {
    setRandomValue(Math.random());
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <BeamsBackground
        className="absolute inset-0 z-0 pointer-events-none"
        colorMode="custom"
        customColors={["#ffffff", "#9058ff", "#F4F8D3"]}
        intensity="strong"
        bgColor="bg-gray-100"
      />

      {/* Foreground content with flex layout */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full px-4 md:px-12 max-w-7xl mx-auto">
        {/* Left side text content */}
        <div className="md:w-1/2 text-left md:pr-8 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">Welcome to Produkto Elyukal</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-800 max-w-xl">
            An Augmented Reality Application for Local Products of La Union
          </p>
          <a
            href="#"
            className="mt-6 inline-block bg-purple-600 text-white font-medium px-6 py-3 rounded-full hover:bg-purple-700 transition"
          >
            Get Started
          </a>
        </div>
        
        {/* Right side Spline container with transparent background */}
        <div 
          ref={splineContainerRef}
          className="md:w-1/2 h-[400px] md:h-[500px] w-full max-w-xl"
        >
          <Spline 
            scene="https://prod.spline.design/hjwEldBLKOygQJkU/scene.splinecode"
          
          />

          
        </div>
      </div>
    </section>
  );
}
