export default function Navbar({ settings }: { settings: any }) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <a href="/" className="navbar-brand">
          {settings?.siteName}
        </a>
        <div className="navbar-links">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#team">Team</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </nav>
  );
}
