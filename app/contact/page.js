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

            <FooterSection className={styles.contactFooter} />
         </section>
      </main>
   );
}
