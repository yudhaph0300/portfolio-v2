"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

const projects = [
   {
      number: "01",
      title: "Koperasi Simpan Pinjam",
      description: "A web-based system for centrally managing members, savings, loans, and payments, featuring an informative dashboard.",
      tags: ["NextJS", "Supabase", "Fullstack"],
      image: "/assets/projects/ksp-sf.jpg",
      accent: "coral",
   },
   {
      number: "02",
      title: "Arjuna",
      description: "A digital platform for the submission and management of scientific journal accreditation.",
      tags: ["NextJS", "API Integration", "Frontend"],
      image: "/assets/projects/arjuna.jpg",
      accent: "lime",
   },
   {
      number: "03",
      title: "Rancamaya",
      description: "A hotel website showcasing rooms, facilities, dining options, promotions, and various guest experiences at R Hotel Rancamaya.",
      tags: ["NextJS", "API Integration", "Frontend"],
      image: "/assets/projects/rancamaya.jpg",
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
         href={`/project/${project.title.toLowerCase().replaceAll(" ", "-")}`}
      >
         <div className={styles.projectCardImageWrap}>
            <motion.div className={styles.projectCardImageParallax} style={{ y: imageY }}>
               <Image
                  src={project.image}
                  alt={`${project.title} project preview`}
                  fill
                  sizes="(max-width: 700px) 100vw, 1300px"
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