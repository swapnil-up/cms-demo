import type { SettingsPartsFragment } from "../../tina/__generated__/types";
import styles from "./Footer.module.css";

export default function Footer({ settings }: { settings: SettingsPartsFragment }) {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <h3 data-tina-field="siteName">{settings?.siteName}</h3>
            {settings?.tagline && <p data-tina-field="tagline">{settings.tagline}</p>}
          </div>
          <div className={styles.links}>
            <h4>Quick Links</h4>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#team">Team</a>
            <a href="#contact">Contact</a>
          </div>
          <div className={styles.social}>
            <h4>Connect</h4>
            {settings?.facebookUrl && (
              <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            )}
            {settings?.instagramUrl && (
              <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            )}
          </div>
        </div>
        <div className={styles.bottom}>
          <p data-tina-field="footerText">{settings?.footerText}</p>
          <p className={styles.credit}>
            Powered by TinaCMS &middot; Built with React
          </p>
        </div>
      </div>
    </footer>
  );
}
