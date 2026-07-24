export default function HeroSection({ section }: { section: any }) {
  const bg = section.backgroundImage
    ? `url(${section.backgroundImage})`
    : undefined;

  return (
    <section
      id="hero"
      className="hero"
      style={bg ? { backgroundImage: bg } : undefined}
    >
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1 className="hero-headline">{section.headline}</h1>
        {section.subtext && <p className="hero-subtext">{section.subtext}</p>}
        {section.ctaText && (
          <a href={section.ctaLink || "#"} className="btn btn-primary">
            {section.ctaText}
          </a>
        )}
      </div>
    </section>
  );
}
