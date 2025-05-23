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
     
      {/* Background */}
      <BeamsBackground className="absolute inset-0 z-0 pointer-events-none" />

      {/* Foreground */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white">Welcome to Produkto Elyukal</h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-xl">
          High quality natural products designed to make your life better.
        </p>
        <a
          href="#"
          className="mt-6 inline-block bg-white text-black font-medium px-6 py-3 rounded-full hover:bg-gray-200 transition"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}
