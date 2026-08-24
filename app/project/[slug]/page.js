import Link from "next/link";
import FooterSection from "../../../components/reusable/FooterSection/FooterSection";
import { notFound } from "next/navigation";
import ParallaxImage from "../../../components/reusable/ParallaxImage/ParallaxImage";
import PillNav from "../../../components/reusable/PillNav/PillNav";
import styles from "./page.module.css";

const projects = {
   "koperasi-simpan-pinjam": {
      number: "01",
      title: "Koperasi Simpan Pinjam",
      type: "Personal Project",
      year: "2026",
      overview: [
         "KSP Sinergi Finansial is a cooperative savings and loan management application that integrates savings and lending services into one platform. Members can manage their profiles, apply for savings and loans, upload payment receipts, monitor installments, view transaction history, and receive application status notifications. Administrators can manage members, savings and loan products, verify transactions, approve applications, monitor payments, and review system activity through audit logs.",
         "This project was built with Next.js 16, React 19, and the App Router as the application foundation. Supabase is used for authentication, database management, file storage, and data handling through the Supabase JavaScript Client. The backend uses Next.js API Routes and a service layer to manage the cooperative’s business processes, while the user interface is developed with Bootstrap 5, Bootstrap Icons, CSS Modules, and JavaScript/JSX."
      ],
      website: "https://ksp-sf-v1.vercel.app/",
      role: "Fullstack Developer",
      stack: ["Next.js", "Supabase", "Bootstrap"],
      image: "/assets/projects/ksp-sf.jpg",
      accent: "coral",
   },
   arjuna: {
      number: "02",
      title: "Arjuna",
      type: "Freelance work at PT Planet Indonesia Berkarya",
      year: "2025",
      overview: [
         "ARJUNA is a web-based national journal accreditation platform designed to support journal management, submission workflows, evaluation, publication administration, and performance monitoring. As a Frontend Developer, I contributed to building responsive, role-based interfaces for administrators, distributors, evaluators, reviewers, and journal submitters, focusing on usability, clear workflows, data visualization, and consistent user experiences across dashboards and management pages.",
         "The project was developed using Next.js 15 and React 19 with the App Router architecture. I worked with Bootstrap 5, CSS Modules, and Bootstrap Icons to create the UI, while React Select, React Data Table Component, React Toastify, and SweetAlert2 supported interactive forms, data tables, notifications, and user feedback. The application also integrates NextAuth for authentication and session management, ApexCharts and Chart.js for analytics dashboards, Tiptap for rich-text editing, and jsPDF with SVG-to-PDF support for document generation."
      ],
      website: "https://staging-arjuna.et.r.appspot.com",
      role: "Frontend Developer",
      stack: ["Next.js", "API Integration", "Bootstrap"],
      image: "/assets/projects/arjuna.jpg",
      accent: "lime",
   },
   rancamaya: {
      number: "03",
      title: "Rancamaya",
      type: "Freelance work at PT Planet Indonesia Berkarya",
      year: "2025",
      overview: [
         "Rancamaya Hotel is a multilingual hospitality website designed to showcase the hotel’s accommodations, dining venues, experiences, golf facilities, events, offers, gallery, and booking services. As a Frontend Developer, I contributed to building responsive and user-friendly interfaces using Next.js and React, with the App Router supporting localized English and Indonesian pages. The project focuses on delivering an immersive hotel experience through structured content sections, responsive layouts, interactive navigation, and seamless booking flows across desktop and mobile devices.",
         "The technology stack includes Next.js 15, React 19, JavaScript, Bootstrap 5, and custom CSS for layout and styling. I implemented dynamic content integration through REST APIs, interactive image sliders with Swiper and Splide, animated page elements with AOS, image galleries with a lightbox component, date selection with React Datepicker, and smooth scrolling with Lenis. Additional integrations include Font Awesome, Bootstrap Icons, React Icons, date-fns, WhatsApp contact functionality, UTM tracking, and external hotel booking services."
      ],
      website: "https://rhotel.rancamaya.com/",
      role: "Frontend Developer",
      stack: ["Next.js", "API Integration", "Bootstrap"],
      image: "/assets/projects/rancamaya.jpg",
      accent: "blue",
   },
};

export function generateStaticParams() {
   return Object.keys(projects).map((slug) => ({ slug }));
}

export default async function ProjectDetailPage({ params }) {
   const { slug } = await params;
   const project = projects[slug];

   if (!project) {
      notFound();
   }

   return (
      <main className={`${styles.page} ${styles[project.accent]}`}>
         <PillNav activeHref="/project" />
         <section className={styles.hero}>
            <div className={styles.heroTopline}>
               <Link href="/project">Back to projects</Link>
               <span>{project.number} / 03</span>
            </div>
            <div className={styles.heroCopy}>
               <p>{project.type}</p>
               <h1>{project.title}</h1>
            </div>
            <div className={styles.heroImage}>
               <ParallaxImage
                  src={project.image}
                  alt={`${project.title} project preview`}
                  priority
                  sizes="(max-width: 760px) 100vw, 86vw"
                  className={styles.parallaxImage}
               />
            </div>
         </section>
         <section className={styles.info}>
            <div className={styles.infoIntro}>
               <p className={styles.kicker}>Project overview</p>
               <div className={styles.description}>
                  {project.overview.map((paragraph) => (
                     <p key={paragraph}>{paragraph}</p>
                  ))}
               </div>
               {project.website && (
                  <a className={styles.visitWebsite} href={project.website} target="_blank" rel="noreferrer">
                     Visit website <span aria-hidden="true">↗</span>
                  </a>
               )}
            </div>
            <dl className={styles.meta}>
               <div>
                  <dt>Role</dt>
                  <dd>{project.role}</dd>
               </div>
               <div>
                  <dt>Year</dt>
                  <dd>{project.year}</dd>
               </div>
               <div>
                  <dt>Stack</dt>
                  <dd>{project.stack.join(" / ")}</dd>
               </div>
            </dl>
         </section>
         <FooterSection />
      </main>
   );
}
