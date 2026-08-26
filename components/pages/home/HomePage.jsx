"use client";

import AboutSection from "../../sections/home/AboutSection";
import TechMarqueeSection from "../../sections/home/TechMarqueeSection";
import ExperienceSection from "../../sections/home/ExperienceSection";
import FeaturedProjectsSection from "../../sections/home/FeaturedProjectsSection";
import FooterSection from "../../reusable/FooterSection/FooterSection";
import PillNav from "../../reusable/PillNav/PillNav";
import styles from "./HomePage.module.css";
import HeroSection from "@/components/sections/home/HeroSection";

export default function HomePage() {
   return (
      <>
         <PillNav />
         <HeroSection />
         <AboutSection styles={styles} />

         <TechMarqueeSection styles={styles} />
         <ExperienceSection styles={styles} />
         <FeaturedProjectsSection styles={styles} />
         <FooterSection />
      </>
   );
}
