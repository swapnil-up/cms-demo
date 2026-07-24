import styles from "./TeamSection.module.css";

interface TeamMemberData {
  name: string;
  role?: string | null;
  photo?: string | null;
  bio?: string | null;
}

export default function TeamSection({ section }: { section: { title: string; subtitle?: string | null; members?: Array<{ member?: TeamMemberData | null } | null> | null } }) {
  const members = (section.members || [])
    .map((m) => m?.member)
    .filter((x): x is TeamMemberData => x != null);

  return (
    <section id="team" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title" data-tina-field="title">{section.title}</h2>
          {section.subtitle && (
            <p className="section-subtitle" data-tina-field="subtitle">{section.subtitle}</p>
          )}
        </div>
        <div className={styles.grid}>
          {members.map((member, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.avatar}>
                {member.photo ? (
                  <img src={member.photo} alt={member.name} />
                ) : (
                  <span className={styles.initials}>
                    {member.name
                      ?.split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </span>
                )}
              </div>
              <h3 className={styles.name} data-tina-field="name">{member.name}</h3>
              {member.role && <p className={styles.role} data-tina-field="role">{member.role}</p>}
              {member.bio && <p className={styles.bio} data-tina-field="bio">{member.bio}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
