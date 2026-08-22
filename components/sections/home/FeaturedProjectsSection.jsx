"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

const projects = [
   {
      number: "01",
      title: "Planet Indonesia",
      description: "A focused digital experience shaped through Figma and front-end development.",
      tags: ["Figma", "React", "UI Design"],
      image: "/frames/city bg_020.jpg",
      accent: "coral",
   },
   {
      number: "02",
      title: "Illiyin Studio",
      description: "A responsive interface built around clear data flows and reliable API integration.",
      tags: ["React", "API", "JavaScript"],
      image: "/frames/city bg_110.jpg",
      accent: "lime",
   },
   {
      number: "03",
      title: "Portfolio v2",
      description: "An interactive portfolio exploring motion, 3D details, and scroll-driven storytelling.",
      tags: ["Next.js", "GSAP", "WebGL"],
      image: "/frames/city bg_220.jpg",
      accent: "blue",
   },
];

function FeaturedProjectCard({ project, styles }) {
   const cardRef = useRef(null);
   const { scrollYProgress } = useScroll({
      target: cardRef,
      offset: ["start end", "end start"],
   });
   const imageY = useTransform(scrollYProgress, [0, 1], [-72, 72]);

   return (
      <a
         ref={cardRef}
         className={`${styles.projectCard} ${styles[`projectCard${project.accent}`]}`}
         href="/project"
      >
         <div className={styles.projectCardImageWrap}>
            <motion.div className={styles.projectCardImageParallax} style={{ y: imageY }}>
               <Image
                  src={project.image}
                  alt={`${project.title} project preview`}
                  fill
                  sizes="(max-width: 700px) 100vw, 1180px"
                  className={styles.projectCardImage}
               />
            </motion.div>
         </div>
         <div className={styles.projectCardInfo}>
            <div className={styles.projectCardTopline}>
               <span>{project.number}</span>
               <span className={styles.projectCardArrow} aria-hidden="true">
                  ↗
               </span>
            </div>
            <div className={styles.projectCardBody}>
               <h3>{project.title}</h3>
               <p>{project.description}</p>
            </div>
            <div className={styles.projectCardTags}>
               {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
               ))}
            </div>
         </div>
      </a>
   );
}

export default function FeaturedProjectsSection({ styles }) {
   return (
      <section id="featured-projects" className={styles.featuredProjectsSection}>
         <div className={styles.featuredProjectsContent}>
            <div className={styles.featuredProjectsHeading}>
               <div>
                  <h2>Featured Projects</h2>
               </div>
               <p className={styles.featuredProjectsIntro}>
                  A small collection of work where thoughtful design meets useful interaction.
               </p>
            </div>

            <div className={styles.featuredProjectsGrid}>
               {projects.map((project) => (
                  <FeaturedProjectCard key={project.title} project={project} styles={styles} />
               ))}
            </div>
         </div>
      </section>
   );
}