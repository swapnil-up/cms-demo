export default function TeamSection({
  section,
  team,
}: {
  section: any;
  team: any[];
}) {
  return (
    <section id="team" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{section.title}</h2>
          {section.subtitle && (
            <p className="section-subtitle">{section.subtitle}</p>
          )}
        </div>
        <div className="team-grid">
          {team.map((member: any, i: number) => (
            <div key={i} className="team-card">
              <div className="team-avatar">
                {member.photo ? (
                  <img src={member.photo} alt={member.name} />
                ) : (
                  <span className="team-initials">
                    {member.name
                      ?.split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </span>
                )}
              </div>
              <h3 className="team-name">{member.name}</h3>
              {member.role && <p className="team-role">{member.role}</p>}
              {member.bio && <p className="team-bio">{member.bio}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
