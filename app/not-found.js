import Link from "next/link";
import PillNav from "../components/reusable/PillNav/PillNav";
import styles from "./not-found.module.css";

export default function NotFound() {
   return (
      <main className={styles.page}>
         <PillNav />
         <section className={styles.content}>
            <div className={styles.topline}>
               <span>Error / 404</span>
               <span>Page not found</span>
            </div>
            <div className={styles.message}>
               <p className={styles.code}>404</p>
               <h1>Looks like this page took a wrong turn.</h1>
               <p className={styles.description}>
                  The page you&apos;re looking for doesn&apos;t exist or may have moved somewhere else.
               </p>
               <Link className={styles.homeLink} href="/">
                  <span aria-hidden="true">↙</span>
                  Back to Home
               </Link>
            </div>
         </section>
      </main>
   );
}
