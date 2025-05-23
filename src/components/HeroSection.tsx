"use client";
import { useEffect, useState } from "react";

import { BeamsBackground } from "./ui/beams-background";


export function HeroSection() {
  const [randomValue, setRandomValue] = useState(0);
  
  useEffect(() => {
    // Generate random values only on the client
    setRandomValue(Math.random());
  }, []);
  
  return (
    <section className="relative w-full h-screen overflow-hidden">
     
      {/* Background with light gray instead of pure white */}
      <BeamsBackground 
        className="absolute inset-0 z-0 pointer-events-none" 
        colorMode="custom"
        customColors={["#ffffff", "#9058ff", "#F4F8D3"]}
        intensity="strong"
        bgColor="bg-gray-100" 
      />

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
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
    </section>
  );
}
