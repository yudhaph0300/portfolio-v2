import styles from "./PillNav.module.css";

const defaultItems = [
   { label: "Home", href: "/", icon: "home" },
   { label: "Projects", href: "/project", icon: "projects" },
   { label: "Contact", href: "/contact", icon: "contact" },
];

function NavIcon({ name }) {
   if (name === "home") {
      return <path d="m4 10 8-6 8 6v9a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-9Z" />;
   }

   if (name === "projects") {
      return (
         <>
            <rect x="4" y="4" width="6" height="6" rx="1" />
            <rect x="14" y="4" width="6" height="6" rx="1" />
            <rect x="4" y="14" width="6" height="6" rx="1" />
            <rect x="14" y="14" width="6" height="6" rx="1" />
         </>
      );
   }

   return <path d="M20 11.5a7.5 7.5 0 0 1-11.1 6.57L4 20l1.93-4.62A7.5 7.5 0 1 1 20 11.5Z" />;
}

export default function PillNav({ items = defaultItems, activeHref = "/" }) {
   return (
      <header className={styles.header}>
         <nav className={styles.nav} aria-label="Main navigation">
            {items.map((item) => (
               <a
                  className={`${styles.pill} ${item.href === activeHref ? styles.active : ""}`}
                  href={item.href}
                  aria-current={item.href === activeHref ? "page" : undefined}
                  aria-label={item.label}
                  title={item.label}
                  key={item.href}
               >
                  <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
                     <NavIcon name={item.icon} />
                  </svg>
               </a>
            ))}
         </nav>
      </header>
   );
}
