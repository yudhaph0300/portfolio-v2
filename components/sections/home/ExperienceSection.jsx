import TiltedCard from "../../reusable/TiltedCard/TiltedCard";

const experiences = [
   {
      logo: "/assets/logo/planet.png",
      title: "Freelance — PT Planet Indonesia Berkarya",
      description: "Handled Figma designs and front-end development.",
      date: "2025 – Present",
      link: "https://planetindonesia.id/",
   },
   {
      logo: "/assets/logo/illiyin-logo.png",
      title: "Internship at Illiyin Studio",
      description: "Focused on API integration and data fetching using ReactJS.",
      date: "August 2023 – January 2024",
      link: "https://illiyin.studio/",
   },
   {
      logo: "/assets/logo/alterra.png",
      title: "Alterra Academy Internship",
      description:
         "Focused on learning Vue.js fundamentals and applying them through hands-on projects.",
      date: "February 2022 – July 2022",
      link: "https://www.instagram.com/alterra.academy/",
   },
];

export default function ExperienceSection({ styles }) {
   return (
      <section id="experience" className={styles.experienceSection}>
         <div className={styles.experienceContent}>
            <div className={styles.experienceHeading}>
               <div>
                  <p className={styles.experienceEyebrow}>Experience</p>
                  <h2>Places That Shaped My Practice.</h2>
               </div>
               <p className={styles.experienceIntro}>
                  A short record of the teams, products, and projects that have shaped how I build for the web.
               </p>
            </div>
            <div className={styles.experienceCards}>
               {experiences.map((experience, index) => (
                  <TiltedCard
                     key={experience.title}
                     number={`0${index + 1}`}
                     logo={experience.logo}
                     title={experience.title}
                     description={experience.description}
                     date={experience.date}
                     link={experience.link}
                  />
               ))}
            </div>
         </div>
      </section>
   );
}
