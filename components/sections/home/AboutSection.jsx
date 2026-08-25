import Lanyard from "../../reusable/Lanyard/Lanyard";

export default function AboutSection({
   styles,
}) {
   return (
      <section
         id="about"
         className={styles.aboutSection}
      >
         <div className={styles.aboutGrid}>
            <div className={styles.aboutLanyard} aria-hidden="true">
               <Lanyard />
            </div>

            <div className={styles.aboutContent}>
               <p className={styles.aboutEyebrow}>About</p>
               <h2>I Build Ideas Into Digital Experiences.</h2>
               <p>
                  I’m a Front-end Web Developer focused on building modern, responsive, and functional web experiences with React and Next.js. I enjoy turning ideas and designs into clean, intuitive interfaces while continuously improving my skills and exploring better ways to build for the web.
               </p>
            </div>
         </div>
      </section>
   );
}
