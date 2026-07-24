import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { PageSectionsAbout } from "../../tina/__generated__/types";
import styles from "./AboutSection.module.css";

export default function AboutSection({ section }: { section: PageSectionsAbout }) {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.text}>
            <h2 className="section-title" data-tina-field="title">{section.title}</h2>
            {section.content && (
              <div className="rich-text" data-tina-field="content">
                <TinaMarkdown content={section.content} />
              </div>
            )}
          </div>
          {section.image && (
            <div className={styles.image}>
              <img src={section.image} alt={section.title || "About"} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
