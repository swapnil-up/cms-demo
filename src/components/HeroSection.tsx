import type { PageSectionsHero } from "../../tina/__generated__/types";
import styles from "./HeroSection.module.css";

export default function HeroSection({ section }: { section: PageSectionsHero }) {
  const bg = section.backgroundImage
    ? `url(${section.backgroundImage})`
    : undefined;

  return (
    <section
      id="hero"
      className={styles.hero}
      style={bg ? { backgroundImage: bg } : undefined}
    >
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.headline} data-tina-field="headline">{section.headline}</h1>
        {section.subtext && <p className={styles.subtext} data-tina-field="subtext">{section.subtext}</p>}
        {section.ctaText && (
          <a href={section.ctaLink || "#"} className="btn btn-primary" data-tina-field="ctaText">
            {section.ctaText}
          </a>
        )}
      </div>
    </section>
  );
}
