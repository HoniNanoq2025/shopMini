import React, { useState } from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import styles from "./NavigationBar.module.css";
import logo from "../../assets/honi-comb-bear-04-green.svg";

export default function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navBar}>
      <div className={styles.brandSection}>
        <Link to="/" className={styles.brandLink}>
          <img src={logo} alt="Site logo" className={styles.logo} />
        </Link>
      </div>
      <button
        className={styles.menuBtn}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
      >
        <i className="fa-solid fa-bars"></i>
      </button>
      <ul className={`${styles.navList} ${isOpen ? styles.navOpen : ""}`}>
        <li className={styles.navItem}>
          <Link to="/" className={styles.navLink}>
            <i className="fa-solid fa-house"></i> HOME
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/about" className={styles.navLink}>
            <i className="fa-solid fa-circle-info"></i> ABOUT
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/products" className={styles.navLink}>
            <i className="fa-regular fa-images"></i> PRODUCTS
          </Link>
        </li>
      </ul>
    </nav>
  );
}
