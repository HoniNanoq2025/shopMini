import "@fortawesome/fontawesome-free/css/all.min.css";
import styles from "./Header.module.css";
import NavigationBar from "../NavigationBar/NavigationBar";

export default function Header() {
  return (
    <header className={styles.menuHeader}>
      <NavigationBar />
    </header>
  );
}
