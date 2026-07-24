import { useState, useEffect } from "react";
import { useTina } from "tinacms/dist/react";
import client from "../tina/__generated__/client";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import TeamSection from "./components/TeamSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactSection from "./components/ContactSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

import "./styles.css";

function SectionRenderer({ section, ...extra }: any) {
  const tpl = section.__typename
    ?.replace(/^PageSections/, "")
    ?.toLowerCase();
  switch (tpl) {
    case "hero":
      return <HeroSection section={section} />;
    case "about":
      return <AboutSection section={section} />;
    case "services":
      return <ServicesSection section={section} />;
    case "team":
      return <TeamSection section={section} />;
    case "testimonials":
      return <TestimonialsSection section={section} />;
    case "contact":
      return <ContactSection section={section} settings={extra.settings} />;
    case "cta":
      return <CTASection section={section} />;
    default:
      return null;
  }
}

function LoadedApp({
  pageRes,
  settings,
}: {
  pageRes: any;
  settings: any;
}) {
  const { data } = useTina(pageRes);
  const sections = data.page.sections ?? [];

  return (
    <>
      <Navbar settings={settings} />
      <main>
        {sections.map((section: any, i: number) => (
          <SectionRenderer
            key={i}
            section={section}
            settings={settings}
          />
        ))}
      </main>
      <Footer settings={settings} />
    </>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [pageRes, setPageRes] = useState<any>(null);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const [p, s] = await Promise.all([
        client.queries.page({ relativePath: "home.mdx" }),
        client.queries.settings({ relativePath: "global.json" }),
      ]);
      setPageRes(p);
      setSettings(s.data.settings);
      setLoaded(true);
    }
    load();
  }, []);

  if (!loaded) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
      </div>
    );
  }

  return <LoadedApp pageRes={pageRes} settings={settings} />;
}
