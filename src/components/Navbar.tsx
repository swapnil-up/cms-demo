import type { SettingsPartsFragment } from "../../tina/__generated__/types";
import styles from "./Navbar.module.css";

export default function Navbar({ settings }: { settings: SettingsPartsFragment }) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <a href="/" className={styles.brand} data-tina-field="siteName">
          {settings?.siteName}
        </a>
        <div className={styles.links}>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#team">Team</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </nav>
  );
}
