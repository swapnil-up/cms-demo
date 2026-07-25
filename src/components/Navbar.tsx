import { tinaField } from "tinacms/dist/react";
import type { SettingsPartsFragment } from "../../tina/__generated__/types";
import { useNavigate } from "../App";
import styles from "./Navbar.module.css";

export default function Navbar({ settings }: { settings: SettingsPartsFragment }) {
  const { navigate } = useNavigate();
  const navLinks = settings?.navLinks || [];

  function handleClick(e: React.MouseEvent, url: string) {
    if (url.startsWith("#")) return;
    e.preventDefault();
    navigate(url);
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <a
          href="/"
          className={styles.brand}
          data-tina-field={tinaField(settings, "siteName")}
          onClick={(e) => handleClick(e, "/")}
        >
          {settings?.siteName}
        </a>
        <div className={styles.links}>
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link?.url || "#"}
              data-tina-field={tinaField(settings, "navLinks", i)}
              onClick={(e) => handleClick(e, link?.url || "#")}
            >
              {link?.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
