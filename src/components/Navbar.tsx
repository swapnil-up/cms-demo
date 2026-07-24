import { tinaField } from "tinacms/dist/react";
import type { SettingsPartsFragment } from "../../tina/__generated__/types";
import styles from "./Navbar.module.css";

export default function Navbar({ settings }: { settings: SettingsPartsFragment }) {
  const navLinks = settings?.navLinks || [];
  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <a href="/" className={styles.brand} data-tina-field={tinaField(settings, "siteName")}>
          {settings?.siteName}
        </a>
        <div className={styles.links}>
          {navLinks.map((link, i) => (
            <a key={i} href={link?.url || "#"} data-tina-field={tinaField(settings, "navLinks", i)}>{link?.label}</a>
          ))}
        </div>
      </div>
    </nav>
  );
}
