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

const EMPTY = {
  data: { page: { sections: [] } },
  query: "",
  variables: {},
};

function SectionRenderer({ section, ...extra }: any) {
  switch (section._template) {
    case "hero":
      return <HeroSection section={section} />;
    case "about":
      return <AboutSection section={section} />;
    case "services":
      return <ServicesSection section={section} />;
    case "team":
      return <TeamSection section={section} team={extra.team} />;
    case "testimonials":
      return (
        <TestimonialsSection
          section={section}
          testimonials={extra.testimonials}
        />
      );
    case "contact":
      return <ContactSection section={section} settings={extra.settings} />;
    case "cta":
      return <CTASection section={section} />;
    default:
      return null;
  }
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [pageRes, setPageRes] = useState<any>(EMPTY);
  const [team, setTeam] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const [p, tm, tst, s] = await Promise.all([
        client.queries.page({ relativePath: "home.mdx" }),
        client.queries.teamConnection(),
        client.queries.testimonialConnection(),
        client.queries.settings({ relativePath: "global.json" }),
      ]);
      setPageRes(p);
      setTeam(
        tm.data.teamConnection?.edges?.map((e: any) => e.node) ?? []
      );
      setTestimonials(
        tst.data.testimonialConnection?.edges?.map((e: any) => e.node) ?? []
      );
      setSettings(s.data.settings);
      setLoaded(true);
    }
    load();
  }, []);

  const { data } = useTina(pageRes);

  if (!loaded) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
      </div>
    );
  }

  const sections = data.page.sections ?? [];

  return (
    <>
      <Navbar settings={settings} />
      <main>
        {sections.map((section: any, i: number) => (
          <SectionRenderer
            key={i}
            section={section}
            team={team}
            testimonials={testimonials}
            settings={settings}
          />
        ))}
      </main>
      <Footer settings={settings} />
    </>
  );
}
