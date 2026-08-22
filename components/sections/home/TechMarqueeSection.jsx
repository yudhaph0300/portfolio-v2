import Image from "next/image";

const technologies = [
   { name: "Next.js", icon: "/icon/next-js.png" },
   { name: "Supabase", icon: "/icon/supabase.png" },
   { name: "GitHub", icon: "/icon/github.png" },
   { name: "Figma", icon: "/icon/figma.png" },
   { name: "Bootstrap", icon: "/icon/bootstrap.png" },
];

function TechnologySet({ styles }) {
   return (
      <div className={styles.marqueeSet} aria-hidden="true">
         {technologies.map((technology) => (
            <div className={styles.marqueeItem} key={technology.name}>
               <Image src={technology.icon} alt="" width={56} height={56} />
               <span>{technology.name}</span>
            </div>
         ))}
      </div>
   );
}

export default function TechMarqueeSection({ styles }) {
   return (
      <section className={styles.marqueeSection} aria-label="Technologies">
         <div className={styles.marqueeViewport}>
            <div className={styles.marqueeTrack}>
               <TechnologySet styles={styles} />
               <TechnologySet styles={styles} />
            </div>
         </div>
      </section>
   );
}
