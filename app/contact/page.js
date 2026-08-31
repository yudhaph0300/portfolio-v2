import Image from "next/image";
import PillNav from "../../components/reusable/PillNav/PillNav";
import FooterSection from "../../components/reusable/FooterSection/FooterSection";
import styles from "./page.module.css";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6283833735915";
const whatsappMessage = encodeURIComponent(
   "Hi, I found your portfolio and would like to talk about a project."
);

export default function ContactPage() {
   return (
      <main className={styles.page}>
         <PillNav activeHref="/contact" />

         <section className={styles.contactSection}>
            <div className={styles.introTopline}>
               <span>Get in touch</span>
               <span>Contact</span>
            </div>
            <div className={styles.intro}>
               <div className={styles.introBody}>
                  <h1>Let&apos;s make something <em>matter.</em></h1>
                  <p className={styles.description}>
                     Have a product, story, or strange little idea in mind? Send it my way.
                     I&apos;m open to thoughtful collaborations and selected freelance work.
                  </p>
               </div>
            </div>

            <div className={styles.actions}>
               <a
                  className={`${styles.action} ${styles.primaryAction}`}
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
               >
                  <span className={styles.actionIcon} aria-hidden="true">↗</span>
                  <span>
                     <small>Start a conversation</small>
                     Let&apos;s talk
                  </span>
               </a>
               <a className={styles.action} href="/assets/cv.pdf" download>
                  <span className={styles.actionIcon} aria-hidden="true">↓</span>
                  <span>
                     <small>Background &amp; experience</small>
                     Download CV
                  </span>
               </a>
            </div>

            <div className={styles.contactLinks} aria-label="Additional contact links">
               <a href="https://github.com/yudhaph0300" target="_blank" rel="noreferrer">
                  <Image className={styles.contactIcon} src="/icon/github.svg" alt="" width={16} height={16} aria-hidden="true" />
                  <span>GitHub</span>
               </a>
               <a href="https://www.linkedin.com/in/m-yudha-pamungkas/" target="_blank" rel="noreferrer">
                  <svg className={styles.contactIcon} viewBox="0 0 24 24" aria-hidden="true">
                     <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.469v6.766z" fill="currentColor" />
                  </svg>
                  <span>LinkedIn</span>
               </a>
               <a href="mailto:yudhapamungkas0300@gmail.com">
                  <svg className={styles.contactIcon} viewBox="0 0 24 24" aria-hidden="true">
                     <path d="M3 5h18v14H3z" fill="none" stroke="currentColor" strokeWidth="1.7" />
                     <path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.7" />
                  </svg>
                  <span>Email</span>
               </a>
            </div>

            <FooterSection className={styles.contactFooter} />
         </section>
      </main>
   );
}
