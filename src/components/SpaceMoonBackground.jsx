import React, { useEffect, useRef } from 'react';

export default function SpaceMoonBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let animationFrameId;
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        // Mouse tracking for 360 perspective rotation
        let targetRotX = 0;
        let targetRotY = 0;
        let currentRotX = 0;
        let currentRotY = 0;

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            targetRotY = ((clientX / width) - 0.5) * 0.8; // Horizontal 360 camera feel
            targetRotX = ((clientY / height) - 0.5) * 0.5; // Vertical tilt
        };

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        // Generate 3D Starfield
        const STAR_COUNT = 600;
        const stars = Array.from({ length: STAR_COUNT }, () => ({
            x: (Math.random() - 0.5) * 2000,
            y: (Math.random() - 0.5) * 2000,
            z: Math.random() * 2000,
            size: Math.random() * 1.5 + 0.5,
            alpha: Math.random() * 0.8 + 0.2,
            twinkleSpeed: Math.random() * 0.02 + 0.005,
        }));

        // Generate Moon Craters Procedurally
        const craterCount = 35;
        const craters = Array.from({ length: craterCount }, () => {
            const phi = Math.acos(2 * Math.random() - 1);
            const theta = 2 * Math.PI * Math.random();
            return {
                cx: Math.sin(phi) * Math.cos(theta),
                cy: Math.sin(phi) * Math.sin(theta),
                cz: Math.cos(phi),
                radius: Math.random() * 0.18 + 0.04,
                depth: Math.random() * 0.4 + 0.6,
            };
        });

        let moonRotationAngle = 0;

        const render = () => {
            // Smooth camera interpolation
            currentRotX += (targetRotX - currentRotX) * 0.05;
            currentRotY += (targetRotY - currentRotY) * 0.05;

            // Dark Space Void Background
            ctx.fillStyle = '#020208';
            ctx.fillRect(0, 0, width, height);

            // Deep Cosmic Nebula Glows
            const nebula1 = ctx.createRadialGradient(
                width * 0.2 + currentRotY * 100, height * 0.3 + currentRotX * 100, 50,
                width * 0.2, height * 0.3, 600
            );
            nebula1.addColorStop(0, 'rgba(30, 58, 138, 0.15)');
            nebula1.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = nebula1;
            ctx.fillRect(0, 0, width, height);

            const nebula2 = ctx.createRadialGradient(
                width * 0.8 - currentRotY * 150, height * 0.7 - currentRotX * 150, 80,
                width * 0.8, height * 0.7, 700
            );
            nebula2.addColorStop(0, 'rgba(88, 28, 135, 0.12)');
            nebula2.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = nebula2;
            ctx.fillRect(0, 0, width, height);

            // Render 3D Stars with Perspective
            const fov = 400;
            const cx = width / 2;
            const cy = height / 2;

            stars.forEach((star) => {
                star.z -= 0.2; // Slow forward movement in space
                if (star.z <= 0) star.z = 2000;

                // Apply 360 parallax camera rotation
                const cosY = Math.cos(currentRotY);
                const sinY = Math.sin(currentRotY);
                const cosX = Math.cos(currentRotX);
                const sinX = Math.sin(currentRotX);

                let rx = star.x * cosY - star.z * sinY;
                let rz = star.x * sinY + star.z * cosY;
                let ry = star.y * cosX - rz * sinX;
                rz = star.y * sinX + rz * cosX;

                if (rz > 0) {
                    const k = fov / rz;
                    const px = rx * k + cx;
                    const py = ry * k + cy;

                    if (px >= 0 && px <= width && py >= 0 && py <= height) {
                        star.alpha += Math.sin(Date.now() * star.twinkleSpeed) * 0.01;
                        const finalAlpha = Math.max(0.1, Math.min(1, star.alpha));

                        ctx.fillStyle = `rgba(255, 255, 255, ${finalAlpha})`;
                        ctx.beginPath();
                        ctx.arc(px, py, star.size * (fov / rz), 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            });

            // RENDER THE 3D MOON
            moonRotationAngle += 0.001; // Slow axis spin
            const moonBaseX = width * 0.5 + currentRotY * 180;
            const moonBaseY = height * 0.45 + currentRotX * 120;
            const moonRadius = Math.min(width, height) * 0.22;

            // 1. Moon Outer Atmosphere / Sunlight Glow
            const moonGlow = ctx.createRadialGradient(
                moonBaseX, moonBaseY, moonRadius * 0.9,
                moonBaseX, moonBaseY, moonRadius * 1.6
            );
            moonGlow.addColorStop(0, 'rgba(210, 225, 255, 0.25)');
            moonGlow.addColorStop(0.5, 'rgba(120, 160, 255, 0.08)');
            moonGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = moonGlow;
            ctx.beginPath();
            ctx.arc(moonBaseX, moonBaseY, moonRadius * 1.6, 0, Math.PI * 2);
            ctx.fill();

            // 2. Base Moon Surface
            const moonSurfaceGrad = ctx.createRadialGradient(
                moonBaseX - moonRadius * 0.4, moonBaseY - moonRadius * 0.4, moonRadius * 0.1,
                moonBaseX, moonBaseY, moonRadius
            );
            moonSurfaceGrad.addColorStop(0, '#e2e8f0');
            moonSurfaceGrad.addColorStop(0.5, '#94a3b8');
            moonSurfaceGrad.addColorStop(0.85, '#475569');
            moonSurfaceGrad.addColorStop(1, '#0f172a');

            ctx.save();
            ctx.beginPath();
            ctx.arc(moonBaseX, moonBaseY, moonRadius, 0, Math.PI * 2);
            ctx.fillStyle = moonSurfaceGrad;
            ctx.fill();
            ctx.clip(); // Clip craters to sphere boundary

            // 3. Render 3D Moon Craters
            craters.forEach((crater) => {
                // Rotate craters around Y axis
                const rotCos = Math.cos(moonRotationAngle);
                const rotSin = Math.sin(moonRotationAngle);

                const rx = crater.cx * rotCos - crater.cz * rotSin;
                const rz = crater.cx * rotSin + crater.cz * rotCos;
                const ry = crater.cy;

                // Only draw craters on the visible front hemisphere
                if (rz > 0) {
                    const craterX = moonBaseX + rx * moonRadius;
                    const craterY = moonBaseY + ry * moonRadius;
                    const craterR = crater.radius * moonRadius * (0.6 + rz * 0.4);

                    // Crater shadow
                    const craterGrad = ctx.createLinearGradient(
                        craterX - craterR, craterY - craterR,
                        craterX + craterR, craterY + craterR
                    );
                    craterGrad.addColorStop(0, 'rgba(15, 23, 42, 0.65)');
                    craterGrad.addColorStop(0.7, 'rgba(51, 65, 85, 0.35)');
                    craterGrad.addColorStop(1, 'rgba(241, 245, 249, 0.4)');

                    ctx.fillStyle = craterGrad;
                    ctx.beginPath();
                    ctx.arc(craterX, craterY, craterR, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            // 4. Realistic Spherical Shadow Overlay (Phase / Terminator line)
            const shadowGrad = ctx.createRadialGradient(
                moonBaseX - moonRadius * 0.5, moonBaseY - moonRadius * 0.5, moonRadius * 0.2,
                moonBaseX + moonRadius * 0.3, moonBaseY + moonRadius * 0.3, moonRadius * 1.1
            );
            shadowGrad.addColorStop(0, 'rgba(0,0,0,0)');
            shadowGrad.addColorStop(0.6, 'rgba(2, 6, 23, 0.4)');
            shadowGrad.addColorStop(0.95, 'rgba(2, 6, 23, 0.95)');
            shadowGrad.addColorStop(1, 'rgba(0,0,0,1)');

            ctx.fillStyle = shadowGrad;
            ctx.beginPath();
            ctx.arc(moonBaseX, moonBaseY, moonRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-0"
        />
    );
}
