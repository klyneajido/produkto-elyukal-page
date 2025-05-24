"use client";
import dynamic from 'next/dynamic';

import Spline from '@splinetool/react-spline';
 
export function SplineTest() {
  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Spline Test Component</h2>
      <div className="w-full max-w-4xl h-[600px] border-2 border-blue-500 rounded-lg overflow-hidden">
         <Spline
        scene="https://prod.spline.design/hjwEldBLKOygQJkU/scene.splinecode" 
      />  
      </div>
    </div>
  );
}
