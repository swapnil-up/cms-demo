import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { useTina } from "tinacms/dist/react";
import client from "../tina/__generated__/client";

import type {
  PageQuery,
  PageQueryVariables,
  SettingsQuery,
  SettingsQueryVariables,
  SettingsPartsFragment,
} from "../tina/__generated__/types";

type PageSectionData = NonNullable<NonNullable<PageQuery["page"]["sections"]>[number]>;

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

const BASE = import.meta.env.VITE_BASE_PATH || "";

function getPageSlug(pathname: string): string {
  const p = pathname.replace(new RegExp(`^${BASE}`), "").replace(/\/+$/, "") || "/";
  const segments = p.split("/").filter(Boolean);
  return segments.length === 0 ? "home" : segments[segments.length - 1] || "home";
}

interface NavigateContextValue {
  navigate: (to: string) => void;
}

const NavigateContext = createContext<NavigateContextValue>({ navigate: () => {} });

export const useNavigate = () => useContext(NavigateContext);

function SectionRenderer({
  section,
  settings,
}: {
  section: PageSectionData;
  settings: SettingsPartsFragment;
}) {
  switch (section.__typename) {
    case "PageSectionsHero":
      return <HeroSection section={section} />;
    case "PageSectionsAbout":
      return <AboutSection section={section} />;
    case "PageSectionsServices":
      return <ServicesSection section={section} />;
    case "PageSectionsTeam":
      return <TeamSection section={section} />;
    case "PageSectionsTestimonials":
      return <TestimonialsSection section={section} />;
    case "PageSectionsContact":
      return <ContactSection section={section} settings={settings} />;
    case "PageSectionsCta":
      return <CTASection section={section} />;
    default:
      return null;
  }
}

interface PageQueryResponse {
  data: PageQuery;
  query: string;
  variables: PageQueryVariables;
}

interface SettingsQueryResponse {
  data: SettingsQuery;
  query: string;
  variables: SettingsQueryVariables;
}

function LoadedApp({
  pageRes,
  settingsRes,
}: {
  pageRes: PageQueryResponse;
  settingsRes: SettingsQueryResponse;
}) {
  const { data: pageData } = useTina({
    query: pageRes.query,
    variables: pageRes.variables,
    data: pageRes.data,
    experimental___selectFormByFormId() {
      return `content/page/${pageRes.variables.relativePath}`;
    },
  });

  const { data: settingsData } = useTina({
    query: settingsRes.query,
    variables: settingsRes.variables,
    data: settingsRes.data,
  });

  const settings = settingsData.settings;
  const sections = (pageData.page.sections || []).filter((s): s is PageSectionData => s != null);

  return (
    <>
      <Navbar settings={settings} />
      <main>
          {sections.map((section, i) => (
            <SectionRenderer
              key={`${section.__typename}-${i}`}
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
  const [slug, setSlug] = useState(() => getPageSlug(window.location.pathname));
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pageRes, setPageRes] = useState<PageQueryResponse | null>(null);
  const [settingsRes, setSettingsRes] = useState<SettingsQueryResponse | null>(null);

  const navigate = useCallback((to: string) => {
    window.history.pushState({}, "", to);
    setSlug(getPageSlug(to));
  }, []);

  useEffect(() => {
    const handler = () => setSlug(getPageSlug(window.location.pathname));
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  useEffect(() => {
    async function load() {
      setLoaded(false);
      setError(null);
      try {
        const [p, s] = await Promise.all([
          client.queries.page({ relativePath: `${slug}.mdx` }),
          client.queries.settings({ relativePath: "global.json" }),
        ]);
        setPageRes(p as PageQueryResponse);
        setSettingsRes(s as SettingsQueryResponse);
        setLoaded(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load page data");
      }
    }
    load();
  }, [slug]);

  if (error) {
    return (
      <div className="loading-screen">
        <div className="error-message">
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!loaded) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
      </div>
    );
  }

  return (
    <NavigateContext.Provider value={{ navigate }}>
      <LoadedApp pageRes={pageRes!} settingsRes={settingsRes!} />
    </NavigateContext.Provider>
  );
}
