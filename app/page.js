import HomeSections from "../components/sections/home/HomeSections";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <HomeSections />
    </main>
  );
}
