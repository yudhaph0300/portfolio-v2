import styles from "./PillNav.module.css";

const defaultItems = [
   { label: "Home", href: "/" },
   { label: "About", href: "/about" },
   { label: "Projects", href: "/project" },
   { label: "Contact", href: "/contact" },
];

export default function PillNav({ items = defaultItems, activeHref = "/" }) {
   return (
      <header className={styles.header}>
         <nav className={styles.nav} aria-label="Main navigation">
            {items.map((item) => (
               <a
                  className={`${styles.pill} ${item.href === activeHref ? styles.active : ""}`}
                  href={item.href}
                  aria-current={item.href === activeHref ? "page" : undefined}
                  key={item.href}
               >
                  {item.label}
               </a>
            ))}
         </nav>
      </header>
   );
}
