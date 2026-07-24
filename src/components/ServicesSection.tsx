export default function ServicesSection({ section }: { section: any }) {
  const services = section.services || [];
  return (
    <section id="services" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{section.title}</h2>
          {section.subtitle && <p className="section-subtitle">{section.subtitle}</p>}
        </div>
        <div className="services-grid">
          {services.map((service: any, i: number) => (
            <div key={i} className="service-card">
              <div className="service-icon">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="service-title">{service.title}</h3>
              {service.description && (
                <p className="service-desc">{service.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
