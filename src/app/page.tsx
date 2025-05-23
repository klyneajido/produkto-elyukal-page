
"use client"
import { Suspense } from "react";
import { HeroSection } from "@/components/HeroSection";

export default function Home() {
  return (
    <main className="h-screen">
      <Suspense fallback={<div className="h-screen bg-neutral-950"></div>}>
        <HeroSection />
      </Suspense>
    </main>
  );
}
