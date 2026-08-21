import styles from "./PagePlaceholder.module.css";

export default function PagePlaceholder({ eyebrow, title, description }) {
   return (
      <main className={styles.page}>
         <div className={styles.content}>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h1>{title}</h1>
            <p className={styles.description}>{description}</p>
         </div>
      </main>
   );
}
