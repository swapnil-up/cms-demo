export default function Footer({ settings }: { settings: any }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>{settings?.siteName}</h3>
            {settings?.tagline && <p>{settings.tagline}</p>}
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#team">Team</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-social">
            <h4>Connect</h4>
            {settings?.facebookUrl && (
              <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            )}
            {settings?.instagramUrl && (
              <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            )}
          </div>
        </div>
        <div className="footer-bottom">
          <p>{settings?.footerText}</p>
          <p className="footer-credit">
            Powered by TinaCMS &middot; Built with React
          </p>
        </div>
      </div>
    </footer>
  );
}
