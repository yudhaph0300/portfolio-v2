"use client";

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
   } = useHomeSectionsSequence();

   return (
      <>
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
