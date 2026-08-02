"use client";

import { useEffect, useMemo, useState } from "react";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ComingSoonSection from "./ComingSoonSection";
import styles from "./HomeSections.module.css";
import { useHomeSectionsSequence } from "../../../lib/sections/home/useHomeSectionsSequence";

export default function HomeSections() {
   const {
      refs: { sectionRef, viewportRef, canvasRef },
      hero: {
         heroOpacity,
         mediaParallaxTransform,
         overlayParallaxTransform,
         firstTextOpacity,
         firstTextTransform,
         secondTextOpacity,
         secondTextTransform,
      },
      about: { aboutSectionTransform, aboutReveal, aboutContentOpacity, aboutContentTransform },
      metrics: { ready, frameTotal, loadedCount },
   } = useHomeSectionsSequence();

   const [windowLoaded, setWindowLoaded] = useState(() => {
      if (typeof document === "undefined") {
         return false;
      }

      return document.readyState === "complete";
   });
   const [hideLoader, setHideLoader] = useState(false);

   const allAssetsReady = ready && windowLoaded;
   const shouldExitLoader = allAssetsReady && !hideLoader;
   const loaderProgress = useMemo(() => {
      if (frameTotal < 1) {
         return 0;
      }

      return Math.min(100, Math.round((loadedCount / frameTotal) * 100));
   }, [frameTotal, loadedCount]);

   useEffect(() => {
      if (typeof window === "undefined") {
         return;
      }

      if (document.readyState === "complete") {
         const timer = window.setTimeout(() => {
            setWindowLoaded(true);
         }, 0);

         return () => {
            window.clearTimeout(timer);
         };
      }

      const handleWindowLoaded = () => {
         setWindowLoaded(true);
      };

      window.addEventListener("load", handleWindowLoaded, { once: true });

      return () => {
         window.removeEventListener("load", handleWindowLoaded);
      };
   }, []);

   useEffect(() => {
      if (hideLoader || typeof document === "undefined") {
         return;
      }

      const previousHtmlOverflow = document.documentElement.style.overflow;
      const previousBodyOverflow = document.body.style.overflow;

      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      return () => {
         document.documentElement.style.overflow = previousHtmlOverflow;
         document.body.style.overflow = previousBodyOverflow;
      };
   }, [hideLoader]);

   return (
      <>
         {!hideLoader && (
            <div
               className={`${styles.fullscreenLoader} ${shouldExitLoader ? styles.fullscreenLoaderExit : ""}`}
               aria-live="polite"
               aria-label="Loading portfolio assets"
               onAnimationEnd={() => {
                  if (shouldExitLoader) {
                     setHideLoader(true);
                  }
               }}
            >
               <div className={styles.loaderInner}>
                  <p className={styles.loaderLabel}>Preparing Experience</p>
                  <p className={styles.loaderProgress}>{loaderProgress}%</p>
               </div>
            </div>
         )}

         <HeroSection
            sectionRef={sectionRef}
            viewportRef={viewportRef}
            canvasRef={canvasRef}
            heroOpacity={heroOpacity}
            mediaParallaxTransform={mediaParallaxTransform}
            overlayParallaxTransform={overlayParallaxTransform}
            firstTextOpacity={firstTextOpacity}
            firstTextTransform={firstTextTransform}
            secondTextOpacity={secondTextOpacity}
            secondTextTransform={secondTextTransform}
            styles={styles}
         />

         <AboutSection
            aboutSectionTransform={aboutSectionTransform}
            aboutReveal={aboutReveal}
            aboutContentOpacity={aboutContentOpacity}
            aboutContentTransform={aboutContentTransform}
            styles={styles}
         />

         <ComingSoonSection styles={styles} />
      </>
   );
}
