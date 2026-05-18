'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // We use { alpha: false } to significantly boost rendering performance for opaque JPG sequences
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const frameCount = 49;
    const images: HTMLImageElement[] = [];
    let imagesLoaded = 0;
    
    // Create an object to hold the tweenable frame index
    const playhead = { frame: 0 };

    const currentFrame = (index: number) => `/Untitled_design_frames/parallax animation    (${index}).jpg`;

    function drawImageProp(ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number = 0, y: number = 0, w: number = ctx.canvas.width, h: number = ctx.canvas.height) {
      if (!img || !img.width) return;

      const imgRatio = img.width / img.height;
      const canvasRatio = w / h;
      let drawWidth = w;
      let drawHeight = h;

      if (imgRatio > canvasRatio) {
        drawHeight = w / imgRatio;
      } else {
        drawWidth = h * imgRatio;
      }

      const drawX = (w - drawWidth) / 2;
      const drawY = (h - drawHeight) / 2;

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    }

    let currentImageIndex = 0;

    function renderCanvas() {
      if (images[currentImageIndex]) {
        drawImageProp(ctx!, images[currentImageIndex]);
      }
    }

    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;

      ctx!.imageSmoothingEnabled = true;
      ctx!.imageSmoothingQuality = 'medium';

      renderCanvas();
    }

    window.addEventListener('resize', resizeCanvas);

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = async () => {
        try {
          await img.decode();
        } catch (e) {
           // fallback if decode fails
        }
        imagesLoaded++;
      };
      images.push(img);
    }

    function setupScrollTrigger() {
      // Create a smooth scrub sequence for the 600vh spacer.
      // preloading is fixed, preventing the "stuck" behavior. 
      // To satisfy "once scrolled no need to scroll again", we could use a GSAP snap or keep scrub: 1 for smoothness.
      
      gsap.to(playhead, {
        frame: frameCount - 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1, // Smooth scrub across the 600vh height
          onUpdate: () => {
            const frameIndex = Math.floor(playhead.frame);

            if (frameIndex !== currentImageIndex) {
              currentImageIndex = frameIndex;
              renderCanvas();
            }

            // Show tagline and nav near the end of the timeline
            if (playhead.frame > frameCount * 0.85) {
              taglineRef.current?.classList.add('show');
              canvas?.classList.add('blur');
              document.querySelector('nav')?.classList.add('nav-visible');
            } else {
              taglineRef.current?.classList.remove('show');
              canvas?.classList.remove('blur');
              document.querySelector('nav')?.classList.remove('nav-visible');
            }
          }
        }
      });
    }

    let preloadChecker = setInterval(() => {
        if (imagesLoaded >= 1) {
            resizeCanvas(); // Show at least the first frame immediately
        }
        if (imagesLoaded === frameCount) {
            clearInterval(preloadChecker);
            setupScrollTrigger();
        }
    }, 100);

    // Fallback if some frames fail to load
    setTimeout(() => {
        clearInterval(preloadChecker);
        if (!ScrollTrigger.getAll().length) {
            setupScrollTrigger();
        }
    }, 3000);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(preloadChecker);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section className="hero" id="home" ref={containerRef}>
      <div className="hero-sticky">
        <canvas id="hero-canvas" ref={canvasRef}></canvas>
        <div className="hero-overlay"></div>
        <h1 className="hero-tagline" id="hero-tagline" ref={taglineRef}>
          Growth in a <em>blink</em>
        </h1>
      </div>
    </section>
  );
}