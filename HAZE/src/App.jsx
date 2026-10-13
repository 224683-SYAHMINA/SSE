
import { useState } from "react";
import "./App.css";

const Icon = ({ name, size = 24, className = "" }) => {
  const paths = {
    Wind: <><path d="M3 8h12a3 3 0 1 0-3-3" /><path d="M2 12h17a3 3 0 1 1-3 3" /><path d="M4 16h6" /></>,
    Flame: <path d="M12 22c5 0 8-4 8-9 0-3-2-6-5-9 0 4-2 5-3 6-1-4-3-6-5-8 0 5-3 8-3 12 0 5 3 8 8 8Z" />,
    ShieldCheck: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>,
    ArrowDown: <><path d="M12 5v14" /><path d="m5 12 7 7 7-7" /></>,
    ArrowUpRight: <><path d="M7 17 17 7" /><path d="M7 7h10v10" /></>,
    ArrowRight: <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
    GlassWater: <><path d="M8 3h8l-1 18H9L8 3Z" /><path d="M9 12h6" /></>,
    House: <><path d="m3 10 9-7 9 7" /><path d="M5 9v12h14V9" /></>,
    Activity: <path d="M2 12h5l3-7 4 14 3-7h5" />,
    HeartPulse: <><path d="M20 5c-3-3-6-1-8 1-2-2-5-4-8-1-5 5 2 12 8 16 6-4 13-11 8-16Z" /><path d="M5 12h4l2-3 3 6 2-3h3" /></>,
    Shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />,
    Menu: <><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></>,
    X: <><path d="M5 5 19 19" /><path d="M19 5 5 19" /></>,
    CloudFog: <><path d="M5 15a4 4 0 0 1 0-8 7 7 0 0 1 14 1 4 4 0 0 1 0 7" /><path d="M4 19h16" /><path d="M7 22h10" /></>,
    ExternalLink: <><path d="M13 5h6v6" /><path d="m19 5-9 9" /><path d="M19 13v6H5V5h6" /></>,
    Newspaper: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 7h8M8 11h8M8 15h5" /></>,
    MapPin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2" /></>,
    CalendarDays: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4M17 3v4M3 10h18" /></>,
    AlertTriangle: <><path d="m12 3 10 18H2L12 3Z" /><path d="M12 9v5M12 18h.01" /></>,
    Eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
};

const iconNames = [
  "Wind", "Flame", "ShieldCheck", "ArrowDown", "ArrowUpRight",
  "GlassWater", "House", "Activity", "HeartPulse", "Shield",
  "Menu", "X", "CloudFog", "ExternalLink", "Newspaper",
  "MapPin", "CalendarDays", "ArrowRight", "AlertTriangle", "Eye"
];

const icons = Object.fromEntries(
  iconNames.map((name) => [
    name,
    (props) => <Icon name={name} {...props} />
  ])
);

const {
  Wind, Flame, ShieldCheck, ArrowDown, ArrowUpRight,
  GlassWater, House, Activity, HeartPulse, Shield,
  Menu, X, CloudFog, ExternalLink, Newspaper, MapPin,
  CalendarDays, ArrowRight, AlertTriangle, Eye
} = icons;
import "./App.css";

const klImage =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Kuala_Lumpur_hazy_skyline_2019.jpg";

const tips = [
  {
    icon: Shield,
    title: "Wear a Proper Mask",
    text: "Use a well-fitting N95 or KN95 respirator when outdoor exposure is unavoidable.",
  },
  {
    icon: GlassWater,
    title: "Drink Enough Water",
    text: "Stay hydrated throughout the day. Water supports your health but cannot remove inhaled pollutants.",
  },
  {
    icon: House,
    title: "Stay Indoors",
    text: "Keep windows closed during severe haze and use a HEPA air purifier if available.",
  },
  {
    icon: Activity,
    title: "Reduce Outdoor Activities",
    text: "Avoid strenuous exercise outdoors when air pollution reaches unhealthy levels.",
  },
  {
    icon: Wind,
    title: "Monitor Air Quality",
    text: "Check Malaysia's official Air Pollution Index before planning outdoor activities.",
  },
  {
    icon: HeartPulse,
    title: "Protect Your Health",
    text: "Take extra care of children, older adults and those with heart or lung conditions.",
  },
];

const news = [
  {
    date: "09 OCT 2026",
    source: "Reuters",
    category: "Education",
    title: "Malaysia closes schools in several states due to haze",
    description:
      "School closures were announced as deteriorating air quality affected several states and federal territories, including Kuala Lumpur.",
    url: "https://www.reuters.com/business/environment/malaysia-closes-schools-several-states-territories-due-haze-2026-10-09/",
    featured: true,
  },
  {
    date: "08 OCT 2026",
    source: "Bernama",
    category: "Air Quality",
    title: "Unhealthy air quality recorded in 38 areas",
    description:
      "The Department of Environment reported unhealthy API readings in 38 locations across Peninsular Malaysia amid cross-border haze.",
    url: "https://bernama.com/en/news.php?id=2617216",
  },
  {
    date: "01 OCT 2026",
    source: "The Star",
    category: "Kuala Lumpur",
    title: "Haze eases in some areas, but KL remains affected",
    description:
      "Although readings improved nationwide, Batu Muda and Cheras in Kuala Lumpur recorded unhealthy API levels.",
    url: "https://www.thestar.com.my/news/nation/2026/10/01/haze-situation-improves-for-some",
  },
  {
    date: "16 SEP 2026",
    source: "Bernama",
    category: "Enforcement",
    title: "DOE carries out 1,418 actions during haze period",
    description:
      "Monitoring and enforcement actions targeted open burning and other potential sources of air pollution.",
    url: "https://www.bernama.com/en/general/news.php?id=2608116",
  },
  {
    date: "04 SEP 2026",
    source: "Bernama",
    category: "Environment",
    title: "Wildfire emissions spread across Malaysia and Indonesia",
    description:
      "A wildfire analysis highlighted severe smoke pollution affecting Sarawak, including hazardous air quality in Serian.",
    url: "https://garasi.bernama.com/explainers/wildfire-emissions-across-malaysia-and-indonesia",
  },
  {
    date: "12 AUG 2026",
    source: "Bernama",
    category: "Air Quality",
    title: "Cheras and Putrajaya among areas with unhealthy air",
    description:
      "Unhealthy API readings were reported in Kuala Lumpur, Putrajaya, Selangor and multiple locations in Sarawak.",
    url: "https://bernama.com/en/general/news.php?id=2593651",
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAllNews, setShowAllNews] = useState(false);

  const visibleNews = showAllNews ? news : news.slice(0, 3);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="haze-page" data-theme="night">
      {/* Navigation */}
      <header className="haze-navbar">
        <div className="haze-container nav-content">
          <a href="#home" className="brand" onClick={closeMenu}>
            <span className="brand-icon">
              <CloudFog size={22} />
            </span>
            <span>
              HAZE<span className="orange-text">WATCH.</span>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#home">Home</a>
            <a href="#about">The Crisis</a>
            <a href="#malaysia">Kuala Lumpur</a>
            <a href="#protect">Health Tips</a>
            <a href="#news">News 2026</a>
          </nav>

          <div className="nav-actions">
            <a
              className="btn btn-warning nav-api-btn"
              href="https://apims.doe.gov.my/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Check Air Quality
              <ArrowUpRight size={16} />
            </a>

            <button
              className="btn btn-ghost mobile-menu-btn"
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <a href="#home" onClick={closeMenu}>Home</a>
            <a href="#about" onClick={closeMenu}>The Crisis</a>
            <a href="#malaysia" onClick={closeMenu}>Kuala Lumpur</a>
            <a href="#protect" onClick={closeMenu}>Health Tips</a>
            <a href="#news" onClick={closeMenu}>News 2026</a>
            <a
              href="https://apims.doe.gov.my/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
            >
              Check Air Quality
            </a>
          </nav>
        )}
      </header>

      <main>
        {/* Hero with burning forest */}
        <section id="home" className="hero-section">
          <div className="haze-container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="status-dot" />
                MALAYSIA HAZE AWARENESS 2026
              </div>

              <h1 className="hero-title">
                WHEN THE
                <br />
                AIR TURNS
                <br />
                <span className="orange-text">TOXIC.</span>
              </h1>

              <p className="hero-description">
                From burning forests to the skyline of Kuala Lumpur,
                haze travels beyond borders. Understand the crisis
                and learn how to protect yourself and your loved ones.
              </p>

              <div className="hero-buttons">
                <a href="#protect" className="btn btn-warning main-btn">
                  Stay Protected
                  <ArrowUpRight size={18} />
                </a>
                <a href="#about" className="btn outline-btn">
                  Explore the Crisis
                  <ArrowDown size={18} />
                </a>
              </div>

              <div className="hero-bottom-note">
                <Flame size={26} className="orange-text shrink-0" />
                <div>
                  <strong>One region. Shared air.</strong>
                  <p>
                    Forest and peatland fires can produce smoke
                    that reaches communities far from the flames.
                  </p>
                </div>
              </div>
            </div>

            {/* Kuala Lumpur photo */}
            <div className="hero-visual">
              <div className="kl-photo-card">
                <img
                  src={klImage}
                  alt="Kuala Lumpur skyline obscured by haze"
                />
                <div className="photo-shade" />
                <div className="photo-top-tag">
                  <MapPin size={14} />
                  KUALA LUMPUR, MALAYSIA
                </div>
                <div className="photo-caption">
                  <p>THE CITY UNDER HAZE</p>
                  <h2>A familiar skyline.<br />An invisible threat.</h2>
                  <small>
                    Archival Kuala Lumpur haze photograph, 2019.
                    Not a live image.
                  </small>
                </div>
              </div>

              <div className="visual-side-label">
                FOREST FIRES / AIR POLLUTION / PUBLIC HEALTH
              </div>
            </div>
          </div>
        </section>

        {/* Awareness strip */}
        <section className="awareness-strip">
          <div className="haze-container awareness-inner">
            <div>
              <Wind size={24} />
              <span>TRANSBOUNDARY HAZE</span>
            </div>
            <div>
              <Flame size={24} />
              <span>FOREST & PEATLAND FIRES</span>
            </div>
            <div>
              <ShieldCheck size={24} />
              <span>HEALTH FIRST</span>
            </div>
          </div>
        </section>

        {/* About section */}
        <section id="about" className="content-section">
          <div className="haze-container about-grid">
            <div>
              <p className="section-label">01 / UNDERSTAND THE CRISIS</p>
              <h2 className="section-title">
                WHERE DOES
                <br />
                <span className="orange-text">HAZE COME FROM?</span>
              </h2>

              <p className="section-description">
                Haze is caused by fine particles and gases from
                forest fires, peatland fires, open burning,
                vehicle emissions and industrial activities.
                During dry weather, smoke can accumulate in the air
                and spread over large distances.
              </p>

              <p className="section-description">
                In 2026, forest and peatland fires in Sumatra
                and Kalimantan, combined with dry conditions
                and seasonal winds, contributed to transboundary
                haze affecting Malaysia.
              </p>

              <div className="haze-alert">
                <AlertTriangle size={26} className="orange-text shrink-0" />
                <div>
                  <strong>WHY IS HAZE DANGEROUS?</strong>
                  <p>
                    Fine particulate matter (PM2.5) can penetrate
                    deep into the lungs and aggravate breathing
                    difficulties and cardiovascular conditions.
                  </p>
                </div>
              </div>
            </div>

            <div className="about-image-wrapper">
              <div className="about-fire-image">
                <div className="about-photo-label">
                  <span>THE SOURCE OF THE SMOKE</span>
                  <h3>It starts with a fire.<br />It affects millions.</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Kuala Lumpur situation */}
        <section id="malaysia" className="malaysia-section">
          <div className="haze-container malaysia-grid">
            <div className="malaysia-image">
              <img
                src={klImage}
                alt="Historical haze blanketing buildings in Kuala Lumpur"
                loading="lazy"
              />
              <div className="malaysia-image-caption">
                <MapPin size={17} />
                Kuala Lumpur skyline during a past haze event
              </div>
            </div>

            <div className="malaysia-copy">
              <p className="section-label">02 / THE MALAYSIAN PERSPECTIVE</p>
              <h2 className="section-title">
                HAZE OVER
                <br />
                <span className="orange-text">KUALA LUMPUR.</span>
              </h2>

              <p className="section-description">
                Malaysia faced multiple haze episodes in 2026.
                In August, Cheras in Kuala Lumpur recorded
                unhealthy air quality, while Sarawak experienced
                particularly severe pollution.
              </p>

              <p className="section-description">
                October brought further deterioration across
                Peninsular Malaysia. The resulting health concerns
                and disruptions highlighted the importance of
                monitoring daily air conditions.
              </p>

              <div className="kl-info-grid">
                <div className="kl-info-card">
                  <Eye size={24} className="orange-text" />
                  <strong>Reduced Visibility</strong>
                  <p>Smoke can obscure roads, landmarks and buildings.</p>
                </div>
                <div className="kl-info-card">
                  <HeartPulse size={24} className="orange-text" />
                  <strong>Health Concerns</strong>
                  <p>People with respiratory conditions face higher risks.</p>
                </div>
              </div>

              <a
                href="https://apims.doe.gov.my/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                View Malaysia's current API readings
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* Protection tips */}
        <section id="protect" className="tips-section">
          <div className="haze-container">
            <div className="section-heading-row">
              <div>
                <p className="section-label">03 / STAY SAFE</p>
                <h2 className="section-title">
                  BREATHE SAFER.
                  <br />
                  <span className="orange-text">LIVE BETTER.</span>
                </h2>
              </div>

              <p className="section-intro">
                Protect your lungs and reduce your exposure.
                These simple habits can make a difference
                during haze episodes.
              </p>
            </div>

            <div className="tips-grid">
              {tips.map((tip, index) => {
                const Icon = tip.icon;
                return (
                  <article className="haze-card" key={tip.title}>
                    <div className="tip-card-top">
                      <div className="tip-icon">
                        <Icon size={28} strokeWidth={1.8} />
                      </div>
                      <span className="tip-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3>{tip.title}</h3>
                    <p>{tip.text}</p>
                  </article>
                );
              })}
            </div>

            <div className="api-banner">
              <div className="api-banner-copy">
                <ShieldCheck size={40} className="orange-text shrink-0" />
                <div>
                  <h3>Know your air before you go.</h3>
                  <p>
                    Get the latest Air Pollution Index from
                    Malaysia's Department of Environment.
                  </p>
                </div>
              </div>

              <a
                href="https://apims.doe.gov.my/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-warning main-btn"
              >
                Check Live API
                <ExternalLink size={17} />
              </a>
            </div>
          </div>
        </section>

        {/* 2026 news compilation */}
        <section id="news" className="news-section">
          <div className="haze-container">
            <div className="section-heading-row">
              <div>
                <p className="section-label">
                  04 / MALAYSIA HAZE NEWS COMPILATION
                </p>
                <h2 className="section-title">
                  HAZE IN
                  <br />
                  <span className="orange-text">THE HEADLINES.</span>
                </h2>
              </div>

              <p className="section-intro">
                Selected verified reports from 2026 documenting
                haze developments, environmental concerns and
                their effects on communities in Malaysia.
              </p>
            </div>

            <div className="news-featured">
              <div className="news-featured-visual">
                <img
                  src={klImage}
                  alt="Archival image of a hazy Kuala Lumpur skyline"
                  loading="lazy"
                />
                <span className="news-image-label">
                  MALAYSIA / HAZE 2026
                </span>
              </div>

              <div className="news-featured-body">
                <div className="news-meta">
                  <span><CalendarDays size={15} /> {news[0].date}</span>
                  <span>{news[0].source}</span>
                </div>

                <span className="news-category">FEATURED REPORT</span>
                <h3>{news[0].title}</h3>
                <p>{news[0].description}</p>

                <a
                  href={news[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="news-link"
                >
                  Read full report
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </div>

            <div className="news-grid">
              {visibleNews.slice(1).map((article) => (
                <article className="news-card" key={article.url}>
                  <div className="news-card-top">
                    <span className="news-category">
                      {article.category}
                    </span>
                    <Newspaper size={20} className="orange-text" />
                  </div>

                  <div className="news-meta">
                    <span>{article.date}</span>
                    <span>{article.source}</span>
                  </div>

                  <h3>{article.title}</h3>
                  <p>{article.description}</p>

                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="news-link"
                  >
                    Read Article <ArrowUpRight size={17} />
                  </a>
                </article>
              ))}
            </div>

            <div className="news-footer-action">
              <button
                type="button"
                className="btn outline-btn"
                onClick={() => setShowAllNews(!showAllNews)}
              >
                {showAllNews ? "Show Fewer Articles" : "View More 2026 News"}
                <ArrowRight size={17} />
              </button>
            </div>

            <p className="news-disclaimer">
              News compilation current to 13 October 2026.
              Headlines are summarised and linked to their
              original publishers. Photographs are illustrative
              and may show previous haze events. This is not a
              live news feed.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="haze-footer">
        <div className="haze-container footer-content">
          <div>
            <div className="brand footer-brand">
              <CloudFog size={23} className="orange-text" />
              <span>
                HAZE<span className="orange-text">WATCH.</span>
              </span>
            </div>
            <p>Awareness today. Cleaner air tomorrow.</p>
          </div>

          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#about">About Haze</a>
            <a href="#protect">Stay Safe</a>
            <a href="#news">News</a>
          </div>

          <div className="footer-bottom">
            © 2026 HazeWatch. Educational awareness project.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
