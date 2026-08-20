"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

if (typeof window !== "undefined") {
   gsap.registerPlugin(ScrollTrigger);
}

export function useHomeSectionsSequence() {
   const canvasRef = useRef(null);
   const sectionRef = useRef(null);
   const viewportRef = useRef(null);
   const imagesRef = useRef([]);
   const activeFrameRef = useRef(0);

   const [frameUrls, setFrameUrls] = useState([]);
   const [images, setImages] = useState([]);
   const [scrollProgress, setScrollProgress] = useState(0);
   const [ready, setReady] = useState(false);
   const [loadedCount, setLoadedCount] = useState(0);

   const frameTotal = frameUrls.length;

   useEffect(() => {
      let cancelled = false;

      const fetchFrames = async () => {
         try {
            const response = await fetch("/api/frames", { cache: "no-store" });

            if (!response.ok) {
               throw new Error("Could not load frame manifest");
            }

            const data = await response.json();

            if (!cancelled && Array.isArray(data.frames)) {
               setLoadedCount(0);
               setFrameUrls(data.frames);

               if (data.frames.length === 0) {
                  setReady(true);
               }
            }
         } catch {
            if (!cancelled) {
               setFrameUrls([]);
               setReady(true);
            }
         }
      };

      fetchFrames();

      return () => {
         cancelled = true;
      };
   }, []);

   useEffect(() => {
      let cancelled = false;

      if (frameTotal === 0) {
         return () => {
            cancelled = true;
         };
      }

      const preload = async () => {
         const loadedImages = [];
         let resolvedCount = 0;

         const tasks = frameUrls.map((src, index) => {
            return new Promise((resolve) => {
               const image = new window.Image();

               image.onload = () => {
                  loadedImages[index] = image;
                  resolvedCount += 1;

                  if (!cancelled) {
                     setLoadedCount(resolvedCount);
                  }

                  if (!cancelled && resolvedCount === frameUrls.length) {
                     setImages(loadedImages);
                     imagesRef.current = loadedImages;
                     setReady(true);
                  }

                  resolve(image);
               };

               image.onerror = () => {
                  resolvedCount += 1;

                  if (!cancelled) {
                     setLoadedCount(resolvedCount);
                  }

                  if (!cancelled && resolvedCount === frameUrls.length) {
                     setImages(loadedImages);
                     imagesRef.current = loadedImages;
                     setReady(true);
                  }

                  resolve(null);
               };
               image.src = src;
            });
         });

         await Promise.all(tasks);
      };

      preload();

      return () => {
         cancelled = true;
      };
   }, [frameTotal, frameUrls]);

   const drawFrame = (frame) => {
      const canvas = canvasRef.current;
      const loadedImages = imagesRef.current;

      if (!canvas || !loadedImages.length) {
         return;
      }

      const context = canvas.getContext("2d");
      const currentFrame = Math.max(0, Math.min(loadedImages.length - 1, Math.round(frame)));
      const image = loadedImages[currentFrame];

      if (!image) {
         return;
      }

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const targetWidth = rect.width;
      const targetHeight = rect.height;

      const canvasWidth = Math.round(targetWidth * dpr);
      const canvasHeight = Math.round(targetHeight * dpr);

      if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
         canvas.width = canvasWidth;
         canvas.height = canvasHeight;
      }

      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(dpr, dpr);
      context.clearRect(0, 0, targetWidth, targetHeight);
      context.imageSmoothingEnabled = true;

      const imageRatio = image.width / image.height;
      const targetRatio = targetWidth / targetHeight;

      let drawWidth = targetWidth;
      let drawHeight = targetHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (imageRatio > targetRatio) {
         drawHeight = targetHeight;
         drawWidth = drawHeight * imageRatio;
         offsetX = (targetWidth - drawWidth) / 2;
      } else {
         drawWidth = targetWidth;
         drawHeight = drawWidth / imageRatio;
         offsetY = (targetHeight - drawHeight) / 2;
      }

      context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
   };

   useEffect(() => {
      if (typeof window === "undefined" || !ready || frameTotal < 2) {
         return undefined;
      }

      const lenis = new Lenis({
         duration: 1.2,
         easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
         smoothWheel: true,
      });

      const onTick = (time) => {
         lenis.raf(time * 1000);
      };

      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);
      lenis.on("scroll", ScrollTrigger.update);

      if (!sectionRef.current || !viewportRef.current || !canvasRef.current) {
         return () => {
            gsap.ticker.remove(onTick);
            lenis.destroy();
         };
      }

      const playhead = { frame: 0 };

      const context = gsap.context(() => {
         gsap.to(playhead, {
            frame: frameTotal - 1,
            ease: "none",
            onUpdate: () => {
               const clampedFrame = Math.max(0, Math.min(frameTotal - 1, playhead.frame));
               activeFrameRef.current = clampedFrame;
               drawFrame(clampedFrame);
            },
            scrollTrigger: {
               trigger: sectionRef.current,
               start: "top top",
               end: "+=460%",
               scrub: 1,
               pin: viewportRef.current,
               anticipatePin: 1,
               onUpdate: (self) => {
                  setScrollProgress(self.progress);
               },
            },
         });

         ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: "+=460%",
            onRefresh: () => {
               drawFrame(activeFrameRef.current);
            },
         });
      }, sectionRef);

      const onResize = () => {
         drawFrame(activeFrameRef.current);
         ScrollTrigger.refresh();
      };

      window.addEventListener("resize", onResize);

      return () => {
         context.revert();
         window.removeEventListener("resize", onResize);
         gsap.ticker.remove(onTick);
         lenis.destroy();
      };
   }, [frameTotal, ready]);

   useEffect(() => {
      if (!ready || images.length === 0) {
         return;
      }

      activeFrameRef.current = 0;
      drawFrame(0);
   }, [images, ready]);

   const lastFrame = Math.max(0, frameTotal - 1);
   const currentFrame = Math.round(scrollProgress * lastFrame);
   const aboutStartFrame = Math.round(lastFrame * 0.47);
   const aboutEndFrame = Math.min(lastFrame, aboutStartFrame + 32);
   const aboutFrameSpan = Math.max(1, aboutEndFrame - aboutStartFrame);
   const aboutReveal = Math.min(1, Math.max(0, (currentFrame - aboutStartFrame) / aboutFrameSpan));

   const clamp01 = (value) => Math.min(1, Math.max(0, value));
   const progressBetween = (value, start, end) => {
      if (end <= start) {
         return value >= end ? 1 : 0;
      }

      return clamp01((value - start) / (end - start));
   };

   const mediaParallaxTransform = `translate3d(0, ${-58 * scrollProgress}px, 0) scale(${1 + scrollProgress * 0.08})`;
   const overlayParallaxTransform = "translate3d(0, 0, 0)";

   // aboutReveal saturates almost instantly (narrow frame window), so text timing
   // is scheduled against scrollProgress directly, fitting entirely before About starts.
   const aboutStartProgress = lastFrame > 0 ? aboutStartFrame / lastFrame : 0;

   const firstOutProgress = progressBetween(scrollProgress, aboutStartProgress * 0.22, aboutStartProgress * 0.34);
   const firstTextOpacity = 1 - firstOutProgress;
   const firstTextTransform = `translate3d(0, ${14 - firstOutProgress * 26}px, 0)`;

   const secondInProgress = progressBetween(scrollProgress, aboutStartProgress * 0.4, aboutStartProgress * 0.5);
   const secondOutProgress = progressBetween(scrollProgress, aboutStartProgress * 0.9, aboutStartProgress);
   const secondTextOpacity = secondInProgress * (1 - secondOutProgress);
   const secondTextTransform = `translate3d(0, ${18 - secondInProgress * 18 - secondOutProgress * 20}px, 0)`;

   const heroOpacity = 1 - progressBetween(scrollProgress, aboutStartProgress * 0.88, aboutStartProgress);

   const aboutSectionTransform = `translate3d(0, ${(1 - aboutReveal) * 100}%, 0)`;
   const aboutContentOpacity = Math.min(1, Math.max(0, (aboutReveal - 0.08) / 0.92));
   const aboutContentTransform = `translate3d(0, ${Math.max(0, 26 - aboutReveal * 26)}px, 0)`;

   return {
      refs: {
         canvasRef,
         sectionRef,
         viewportRef,
      },
      hero: {
         heroOpacity,
         mediaParallaxTransform,
         overlayParallaxTransform,
         firstTextOpacity,
         firstTextTransform,
         secondTextOpacity,
         secondTextTransform,
      },
      about: {
         aboutSectionTransform,
         aboutReveal,
         aboutContentOpacity,
         aboutContentTransform,
      },
      metrics: {
         frameTotal,
         currentFrame,
         ready,
         loadedCount,
      },
   };
}
