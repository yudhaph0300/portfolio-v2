import Image from "next/image";
import Link from "next/link";
import PillNav from "../../reusable/PillNav/PillNav";
import ParallaxImage from "../../reusable/ParallaxImage/ParallaxImage";
import styles from "./ProjectsPage.module.css";

const projects = [
   {
      number: "01",
      slug: "koperasi-simpan-pinjam",
      title: "Koperasi Simpan Pinjam",
      type: "Personal Project",
      description: "A centralized workspace for managing members, savings, loans, and payments through a clear operational dashboard.",
      tags: ["Next.js", "Supabase", "Fullstack"],
      image: "/assets/projects/ksp-sf.jpg",
      accent: "coral",
   },
   {
      number: "02",
      slug: "arjuna",
      title: "Arjuna",
      type: "Freelance work at PT Planet",
      description: "A focused digital platform for submitting and managing scientific journal accreditation workflows.",
      tags: ["Next.js", "API Integration", "Frontend"],
      image: "/assets/projects/arjuna.jpg",
      accent: "lime",
   },
   {
      number: "03",
      slug: "rancamaya",
      title: "Rancamaya",
      type: "Freelance work at PT Planet",
      description: "A refined hotel experience that brings rooms, dining, facilities, promotions, and guest experiences together.",
      tags: ["Next.js", "API Integration", "Frontend"],
      image: "/assets/projects/rancamaya.jpg",
      accent: "blue",
   },
];

function ProjectCard({ project }) {
   return (
      <Link href={`/project/${project.slug}`} className={`${styles.projectCard} ${styles[project.accent]}`}>
         <div className={styles.imageWrap}>
            <ParallaxImage
               src={project.image}
               alt={`${project.title} project preview`}
               sizes="(max-width: 760px) 100vw, 50vw"
               className={styles.image}
               imageClassName={styles.imageContent}
            />
         </div>
         <div className={styles.cardOverlay} />
         <div className={styles.cardContent}>
            <div className={styles.cardTopline}>
               <span>{project.number}</span>
               <span className={styles.cardType}>{project.type}</span>
            </div>
            <div className={styles.cardDetails}>
               <h2>{project.title}</h2>
               <p>{project.description}</p>
               <ul className={styles.tags} aria-label={`${project.title} technologies`}>
                  {project.tags.map((tag) => (
                     <li key={tag}>{tag}</li>
                  ))}
               </ul>
            </div>
         </div>
      </Link>
   );
}

export default function ProjectsPage() {
   return (
      <main className={styles.page}>
         <PillNav activeHref="/project" />
         <section className={styles.intro}>
            <div className={styles.introTopline}>
               <span>Selected work</span>
               <span>2022 — 2026</span>
            </div>
            <div className={styles.introBody}>
               <h1>Turning Ideas <br />Into Functional & Engaging <br />Web Experiences</h1>
               <p>
                  A collection of digital products built with thoughtful interfaces, purposeful motion, and practical systems behind them.
               </p>
            </div>
         </section>
         <section className={styles.projects} aria-label="Selected projects">
            <div className={styles.sectionHeading}>
               <span>03 projects</span>
               <span>Web Development</span>
            </div>
            <div className={styles.grid}>
               {projects.map((project) => (
                  <ProjectCard key={project.title} project={project} />
               ))}
            </div>
         </section>
         <footer className={styles.footer}>
            <span>Have a project in mind?</span>
            <a href="https://wa.me/6283833735915" target="_blank" rel="noreferrer">
               Let&apos;s talk <span aria-hidden="true">↗</span>
            </a>
         </footer>
      </main>
   );
}
