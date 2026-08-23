export default function FooterSection({ styles }) {
   return (
      <footer className={styles.footerSection}>
         <p className={styles.footerCopyright}>© 2026 Yudha Pamungkas</p>
         <div className={styles.footerContactButtons} aria-label="Contact links">
            <a
               className={`${styles.footerContactButton} ${styles.footerTalkButton}`}
               href="https://wa.me/6283833735915"
               target="_blank"
               rel="noreferrer"
               aria-label="Start a conversation on WhatsApp"
            >
               <svg className={styles.footerWhatsAppIcon} viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.05 4.93A9.82 9.82 0 0 0 12.06 2C6.62 2 2.2 6.42 2.2 11.86c0 1.74.46 3.44 1.34 4.94L2.11 22l5.32-1.4a9.86 9.86 0 0 0 4.63 1.16h.01c5.43 0 9.85-4.42 9.85-9.86a9.82 9.82 0 0 0-2.87-6.97Zm-6.99 15.1h-.01a8.19 8.19 0 0 1-4.17-1.14l-.3-.18-3.16.83.84-3.08-.2-.32a8.19 8.19 0 0 1-1.26-4.28c0-4.52 3.68-8.2 8.21-8.2a8.15 8.15 0 0 1 5.8 2.4 8.17 8.17 0 0 1 2.4 5.81c0 4.52-3.68 8.2-8.2 8.2Zm4.5-6.14c-.25-.12-1.47-.73-1.7-.81-.23-.08-.4-.12-.57.12-.17.25-.65.81-.8.98-.15.17-.3.19-.55.06-.25-.12-1.06-.39-2.02-1.25-.75-.67-1.25-1.5-1.4-1.75-.15-.25-.02-.38.11-.5.11-.11.25-.3.37-.45.12-.15.16-.25.25-.42.08-.17.04-.32-.02-.45-.06-.12-.57-1.37-.78-1.88-.2-.49-.41-.42-.57-.43h-.49c-.17 0-.45.06-.69.32-.24.25-.9.88-.9 2.14s.92 2.48 1.05 2.65c.12.17 1.81 2.76 4.38 3.87.61.26 1.09.42 1.46.54.61.19 1.16.16 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.29Z" />
               </svg>
               Let&apos;s talk
            </a>
            {/* <a className={styles.footerContactButton} href="mailto:yudhapamungkas0300@gmail.com" aria-label="Send an email" title="Email">
               @
            </a>
            <a className={styles.footerContactButton} href="/contact" aria-label="Open contact page" title="Contact page">
               ↗
            </a> */}
         </div>
      </footer>
   );
}