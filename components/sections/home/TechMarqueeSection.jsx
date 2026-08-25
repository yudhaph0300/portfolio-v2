import Image from "next/image";

const technologies = [
   { name: "NextJS", icon: "/icon/nextjs.svg" },
   { name: "ReactJS", icon: "/icon/react.svg" },
   { name: "JavaScript", icon: "/icon/javascript.svg" },
   { name: "Bootstrap", icon: "/icon/bootstrap.svg" },
   { name: "Swiper", icon: "/icon/swiper.svg" },
   { name: "React Bits", icon: "/icon/reactbits.svg" },
   { name: "Node.js", icon: "/icon/nodejs.svg" },
   { name: "Supabase", icon: "/icon/supabase.svg" },
   { name: "Vercel", icon: "/icon/vercel.svg" },
   { name: "GitHub", icon: "/icon/github.svg" },
   { name: "TypeScript", icon: "/icon/typescript.svg" },
   { name: "Tailwind CSS", icon: "/icon/tailwindcss.svg" },
   { name: "Framer Motion", icon: "/icon/framer.svg" },
   { name: "GSAP", icon: "/icon/gsap.svg" },
   { name: "Three.js", icon: "/icon/threedotjs.svg" },
   { name: "PostgreSQL", icon: "/icon/postgresql.svg" },
   { name: "Prisma", icon: "/icon/prisma.svg" },
   { name: "Git", icon: "/icon/git.svg" },
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
