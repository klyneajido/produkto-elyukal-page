
import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface AnimatedGradientBackgroundProps {
    className?: string;
    children?: React.ReactNode;
    intensity?: "subtle" | "medium" | "strong";
    colorMode?: "default" | "custom";
    customColors?: string[];
    bgColor?: string;
}

interface Beam {
    x: number;
    y: number;
    width: number;
    length: number;
    angle: number;
    speed: number;
    opacity: number;
    hue: number;
    pulse: number;
    pulseSpeed: number;
}

// Helper function to convert hex to HSL hue
function hexToHue(hex: string): number {
    // Remove the # if present
    hex = hex.replace(/^#/, '');
    
    // Parse the hex values
    let r = parseInt(hex.substring(0, 2), 16) / 255;
    let g = parseInt(hex.substring(2, 4), 16) / 255;
    let b = parseInt(hex.substring(4, 6), 16) / 255;
    
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    
    let h = 0;
    
    if (max === min) {
        h = 0; // achromatic
    } else {
        let d = max - min;
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h *= 60;
    }
    
    return h;
}

function createBeam(width: number, height: number, colorMode: string, customColors?: string[]): Beam {
    const angle = -35 + Math.random() * 10;
    
    let hue = 190 + Math.random() * 70; // Default hue
    
    // If using custom colors, pick one randomly
    if (colorMode === "custom" && customColors && customColors.length > 0) {
        const randomColor = customColors[Math.floor(Math.random() * customColors.length)];
        hue = hexToHue(randomColor);
    }
    
    return {
        x: Math.random() * width * 1.5 - width * 0.25,
        y: Math.random() * height * 1.5 - height * 0.25,
        width: 40 + Math.random() * 80, // Wider beams
        length: height * 2.5,
        angle: angle,
        speed: 0.6 + Math.random() * 1.2,
        opacity: 0.4 + Math.random() * 0.3, // Significantly increased opacity
        hue: hue,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
    };
}

export function BeamsBackground({
    className,
    intensity = "strong", // Change default to strong for better visibility
    colorMode = "custom",
    customColors = ["#ffffff", "#9058ff", "#FFF2AF"],
    bgColor = "bg-white",
}: AnimatedGradientBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const beamsRef = useRef<Beam[]>([]);
    const animationFrameRef = useRef<number>(0);
    const MINIMUM_BEAMS = 20; // Increase number of beams

    // Increase opacity values for all intensity levels
    const opacityMap: Record<string, number> = {
        subtle: 0.8, 
        medium: 0.10,  
        strong: 1.0,  
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const updateCanvasSize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(dpr, dpr);

            const totalBeams = MINIMUM_BEAMS * 1.5;
            beamsRef.current = Array.from({ length: totalBeams }, () =>
                createBeam(canvas.width, canvas.height, colorMode, customColors)
            );
        };

        updateCanvasSize();
        window.addEventListener("resize", updateCanvasSize);

        function resetBeam(beam: Beam, index: number, totalBeams: number) {
            if (!canvas) return beam;
            
            const column = index % 3;
            const spacing = canvas.width / 3;

            beam.y = canvas.height + 100;
            beam.x =
                column * spacing +
                spacing / 2 +
                (Math.random() - 0.5) * spacing * 0.5;
            beam.width = 100 + Math.random() * 100;
            beam.speed = 0.5 + Math.random() * 0.4;
            
            // Use custom colors if specified
            if (colorMode === "custom" && customColors && customColors.length > 0) {
                // Distribute colors evenly or pick randomly
                const colorIndex = index % customColors.length;
                beam.hue = hexToHue(customColors[colorIndex]);
            } else {
                beam.hue = 190 + (index * 70) / totalBeams;
            }
            
            beam.opacity = 0.5 + Math.random() * 0.3; // Significantly increased opacity
            return beam;
        }

        function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
            ctx.save();
            ctx.translate(beam.x, beam.y);
            ctx.rotate((beam.angle * Math.PI) / 180);

            // Calculate pulsing opacity with higher base value
            const pulsingOpacity =
                beam.opacity *
                (0.9 + Math.sin(beam.pulse) * 0.3) * // Increased pulsing effect
                opacityMap[intensity];

            const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);

            if (colorMode === "custom" && customColors && customColors.length > 0) {
                const colorIndex = Math.floor(beam.hue / 360 * customColors.length) % customColors.length;
                const color = customColors[colorIndex];
                
                // Enhanced visibility for all colors on white background
                let beamColor = color;
                
                // Special handling for white beams
                if (color.toLowerCase() === "#ffffff" || color.toLowerCase() === "#fff") {
                    beamColor = "#c8c8ff"; // More blue-tinted white for much better visibility
                }
                
                // Enhance purple and yellow colors too
                if (color.toLowerCase() === "#9058ff") {
                    beamColor = "#7030ff"; // Slightly darker purple for better contrast
                }
                
                if (color.toLowerCase() === "#F4F8D3") {
                    beamColor = "#FFF2AF"; 
                }
                
                gradient.addColorStop(0, `${beamColor}00`);
                gradient.addColorStop(0.1, `${beamColor}${Math.round(pulsingOpacity * 200).toString(16).padStart(2, '0')}`);
                gradient.addColorStop(0.4, `${beamColor}${Math.round(pulsingOpacity * 255).toString(16).padStart(2, '0')}`);
                gradient.addColorStop(0.6, `${beamColor}${Math.round(pulsingOpacity * 255).toString(16).padStart(2, '0')}`);
                gradient.addColorStop(0.9, `${beamColor}${Math.round(pulsingOpacity * 200).toString(16).padStart(2, '0')}`);
                gradient.addColorStop(1, `${beamColor}00`);
            } else {
                // Original HSL gradient with increased saturation and darkness
                gradient.addColorStop(0, `hsla(${beam.hue}, 100%, 45%, 0)`);
                gradient.addColorStop(0.1, `hsla(${beam.hue}, 100%, 45%, ${pulsingOpacity * 0.8})`);
                gradient.addColorStop(0.4, `hsla(${beam.hue}, 100%, 45%, ${pulsingOpacity * 1.5})`);
                gradient.addColorStop(0.6, `hsla(${beam.hue}, 100%, 45%, ${pulsingOpacity * 1.5})`);
                gradient.addColorStop(0.9, `hsla(${beam.hue}, 100%, 45%, ${pulsingOpacity * 0.8})`);
                gradient.addColorStop(1, `hsla(${beam.hue}, 100%, 45%, 0)`);
            }

            ctx.fillStyle = gradient;
            ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
            ctx.restore();
        }

        function animate() {
            if (!canvas || !ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.filter = "blur(30px)"; // Reduced blur for sharper beams

            const totalBeams = beamsRef.current.length;
            beamsRef.current.forEach((beam, index) => {
                beam.y -= beam.speed;
                beam.pulse += beam.pulseSpeed;

                // Reset beam when it goes off screen
                if (beam.y + beam.length < -100) {
                    resetBeam(beam, index, totalBeams);
                }

                drawBeam(ctx, beam);
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        }

        animate();

        return () => {
            window.removeEventListener("resize", updateCanvasSize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [intensity, colorMode, customColors]);

    return (
        <div
            className={cn(
                `relative min-h-screen w-full overflow-hidden ${bgColor}`,
                className
            )}
        >
            <canvas
                ref={canvasRef}
                className="absolute inset-0"
                style={{ filter: "blur(15px)" }}
            />

            <motion.div
                className="absolute inset-0 bg-white/5"
                animate={{
                    opacity: [0.05, 0.15, 0.05],
                }}
                transition={{
                    duration: 10,
                    ease: "easeInOut",
                    repeat: Number.POSITIVE_INFINITY,
                }}
                style={{
                    backdropFilter: "blur(50px)",
                }}
            />

            <div className="relative z-10 flex h-screen w-full items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-6 px-4 text-center">
                    <motion.h1
                        className="text-6xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tighter"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                       
                    </motion.h1>
                    <motion.p
                        className="text-lg md:text-2xl lg:text-3xl text-white/70 tracking-tighter"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                      
                    </motion.p>
                </div>
            </div>
        </div>
    );
}





