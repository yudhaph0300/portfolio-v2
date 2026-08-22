export default function FooterSection({ styles }) {
   return (
      <footer className={styles.footerSection}>
         <p className={styles.footerCopyright}>© 2026 Yudha Pamungkas</p>
         <div className={styles.footerContactButtons} aria-label="Contact links">
            <a className={styles.footerContactButton} href="mailto:yudha@example.com" aria-label="Send an email" title="Email">
               @
            </a>
            <a className={styles.footerContactButton} href="/contact" aria-label="Open contact page" title="Contact page">
               ↗
            </a>
         </div>
      </footer>
   );
}