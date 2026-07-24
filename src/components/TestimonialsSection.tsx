export default function TestimonialsSection({ section }: { section: any }) {
  const testimonials = (section.items || [])
    .map((i: any) => i?.item)
    .filter(Boolean);

  return (
    <section id="testimonials" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{section.title}</h2>
          {section.subtitle && (
            <p className="section-subtitle">{section.subtitle}</p>
          )}
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t: any, i: number) => (
            <div key={i} className="testimonial-card">
              <blockquote className="testimonial-quote">"{t.quote}"</blockquote>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  {t.photo ? (
                    <img src={t.photo} alt={t.author} />
                  ) : (
                    <span className="team-initials">
                      {t.author
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </span>
                  )}
                </div>
                <div>
                  <p className="testimonial-name">{t.author}</p>
                  {(t.role || t.organization) && (
                    <p className="testimonial-meta">
                      {t.role}
                      {t.role && t.organization ? ", " : ""}
                      {t.organization}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
