export default function AboutSection({
   aboutSectionTransform,
   aboutReveal,
   aboutContentOpacity,
   aboutContentTransform,
   styles,
}) {
   return (
      <section
         id="about"
         className={styles.aboutSection}
         style={{ transform: aboutSectionTransform, opacity: Math.max(aboutReveal, 0.001) }}
      >
         <div className={styles.aboutContent} style={{ opacity: aboutContentOpacity, transform: aboutContentTransform }}>
            <p className={styles.aboutEyebrow}>About</p>
            <h2>I am a web developer focused on interactive and expressive interfaces.</h2>
            <p>
               I build digital products with attention to motion, pacing, and clarity. My goal is to
               make each experience feel intentional while staying fast and accessible.
            </p>
         </div>
      </section>
   );
}
