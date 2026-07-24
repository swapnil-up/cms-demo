export default function ContactSection({
  section,
  settings,
}: {
  section: any;
  settings: any;
}) {
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{section.title}</h2>
          {section.subtitle && (
            <p className="section-subtitle">{section.subtitle}</p>
          )}
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            {settings?.contactEmail && (
              <div className="contact-item">
                <svg
                  className="contact-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 4L12 13 2 4" />
                </svg>
                <div>
                  <p className="contact-label">Email</p>
                  <a href={`mailto:${settings.contactEmail}`}>
                    {settings.contactEmail}
                  </a>
                </div>
              </div>
            )}
            {settings?.contactPhone && (
              <div className="contact-item">
                <svg
                  className="contact-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                <div>
                  <p className="contact-label">Phone</p>
                  <a href={`tel:${settings.contactPhone}`}>
                    {settings.contactPhone}
                  </a>
                </div>
              </div>
            )}
            {settings?.address && (
              <div className="contact-item">
                <svg
                  className="contact-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div>
                  <p className="contact-label">Address</p>
                  <p>{settings.address}</p>
                </div>
              </div>
            )}
          </div>
          <div className="contact-form">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="form"
            >
              <input
                type="text"
                placeholder="Your Name"
                className="form-input"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="form-input"
                required
              />
              <textarea
                placeholder="Your Message"
                className="form-input form-textarea"
                rows={4}
                required
              />
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
