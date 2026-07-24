export default function AboutSection({ section }: { section: any }) {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="about-grid">
          <div className="about-text">
            <h2 className="section-title">{section.title}</h2>
            {section.content && (
              <div className="rich-text">
                {section.content.split("\n\n").map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}
          </div>
          {section.image && (
            <div className="about-image">
              <img src={section.image} alt={section.title || "About"} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
