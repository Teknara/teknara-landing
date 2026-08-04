import React, { useEffect, useRef } from 'react';

export default function AsteroidBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let animationFrameId;
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        // Handle Window Resizing
        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        // Particle Setup
        const PARTICLE_COUNT = 350;
        const particles = [];

        class Particle {
            constructor() {
                this.reset(true);
            }

            reset(initial = false) {
                // Spread particles across 3D space
                this.x = (Math.random() - 0.5) * width * 2.5;
                this.y = (Math.random() - 0.5) * height * 2.5;
                this.z = initial ? Math.random() * width : width;
                this.size = Math.random() * 1.5 + 0.5;
                this.baseAlpha = Math.random() * 0.7 + 0.3;
                this.alpha = this.baseAlpha;
                this.twinkleSpeed = Math.random() * 0.03 + 0.01;
                this.speedZ = Math.random() * 0.8 + 0.3;
            }

            update() {
                // Move particle forward through 3D depth
                this.z -= this.speedZ;
                if (this.z <= 0) {
                    this.reset(false);
                }

                // Pulse / Twinkle opacity over time
                this.alpha += Math.sin(Date.now() * 0.002 * this.twinkleSpeed) * 0.01;
                this.alpha = Math.max(0.1, Math.min(1, this.alpha));
            }

            draw() {
                // 3D Perspective Projection formula
                const fov = 350;
                const scale = fov / (fov + this.z);
                const px = this.x * scale + width / 2;
                const py = this.y * scale + height / 2;

                // Skip particles outside viewport
                if (px < -10 || px > width + 10 || py < -10 || py > height + 10) return;

                const renderSize = Math.max(0.4, this.size * scale * 2);
                const depthAlpha = Math.min(1, (1 - this.z / width) * 1.2) * this.alpha;

                ctx.save();
                ctx.beginPath();
                ctx.arc(px, py, renderSize, 0, Math.PI * 2);

                // Add ambient glow to larger/closer particles
                if (renderSize > 1.6) {
                    ctx.shadowBlur = 12;
                    ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
                }

                ctx.fillStyle = `rgba(255, 255, 255, ${depthAlpha})`;
                ctx.fill();
                ctx.restore();
            }
        }

        // Initialize Particles
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Particle());
        }

        // Main Render Loop
        const render = () => {
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, width, height);

            particles.forEach((particle) => {
                particle.update();
                particle.draw();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />
    );
}
