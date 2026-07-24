export default function CTASection({ section }: { section: any }) {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-text">{section.text}</h2>
          {section.buttonText && (
            <a href={section.buttonLink || "#"} className="btn btn-accent">
              {section.buttonText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
