
import { useState } from "react";
import "./App.css";

const tips = [
  {
    icon: "😷",
    title: "Wear a Mask",
    text: "Use a well-fitting N95 or KN95 mask when you must spend time outdoors in heavy haze.",
  },
  {
    icon: "💧",
    title: "Stay Hydrated",
    text: "Drink enough water throughout the day, especially during hot and dry weather.",
  },
  {
    icon: "🏠",
    title: "Stay Indoors",
    text: "Limit outdoor activities and keep windows closed when air quality is poor.",
  },
  {
    icon: "🌬️",
    title: "Keep Air Clean",
    text: "Use an air purifier with a HEPA filter if available. Avoid smoking or burning indoors.",
  },
  {
    icon: "📊",
    title: "Monitor Air Quality",
    text: "Check your local Air Pollution Index (API) before planning outdoor activities.",
  },
  {
    icon: "🩺",
    title: "Watch Your Health",
    text: "Seek medical advice if you develop breathing difficulties or worsening symptoms.",
  },
];

function App() {
  const [showMore, setShowMore] = useState(false);

  return (
    <main className="haze-page" data-theme="dark">
      {/* Navigation */}
      <nav className="navbar max-w-7xl mx-auto px-6 lg:px-10 pt-5 relative z-20">
        <div className="navbar-start">
          <a href="#home" className="text-xl font-black tracking-tight">
            <span className="text-orange-400">HAZE</span> AWARENESS
          </a>
        </div>

        <div className="navbar-end gap-3">
          <a
            href="#about"
            className="btn btn-ghost btn-sm hidden sm:inline-flex"
          >
            About
          </a>
          <a
            href="#tips"
            className="btn btn-warning btn-sm rounded-full px-5 font-bold"
          >
            Safety Tips ↗
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section
        id="home"
        className="hero-section max-w-7xl mx-auto px-6 lg:px-10"
      >
        <div className="max-w-3xl">
          <div className="badge badge-outline border-orange-400/50 text-orange-300 mb-7 px-4 py-3 text-xs font-semibold tracking-widest">
            🌍 ENVIRONMENTAL AWARENESS
          </div>

          <h1 className="hero-title font-black tracking-tight">
            WHEN THE
            <br />
            SKY TURNS
            <br />
            <span className="text-orange-400">GREY.</span>
          </h1>

          <p className="text-base md:text-lg text-gray-200 leading-relaxed mt-7 max-w-xl">
            Haze is more than just smoky skies. It's a serious threat
            to our environment, our health, and the air we breathe.
          </p>

          <div className="flex flex-wrap gap-3 mt-9">
            <a
              href="#tips"
              className="btn btn-warning rounded-full px-8 font-bold"
            >
              Protect Yourself <span aria-hidden="true">↗</span>
            </a>
            <a
              href="#about"
              className="btn btn-outline border-white/40 text-white rounded-full px-7 hover:bg-white hover:text-black"
            >
              Learn More ↓
            </a>
          </div>

          <div className="mt-12 flex items-center gap-3 text-sm text-gray-300">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            Awareness today. Cleaner air tomorrow.
          </div>
        </div>
      </section>

      {/* Explanation */}
      <section id="about" className="content-section">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-9 md:gap-16 items-center">
            <div>
              <div className="section-label">01 / UNDERSTANDING HAZE</div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-4 leading-tight">
                Where does the
                <br />
                <span className="text-orange-400">haze come from?</span>
              </h2>
            </div>

            <div>
              <p className="text-gray-300 leading-8">
                In 2026, severe forest and peatland fires in Indonesia
                have contributed to transboundary haze across Southeast
                Asia, including Malaysia. Dry conditions associated
                with El Niño and winds carrying smoke across borders
                have worsened the situation.
              </p>

              {showMore && (
                <p className="text-gray-300 leading-8 mt-4">
                  Tiny particles in the smoke can enter our lungs,
                  irritate our eyes and throat, and worsen existing
                  heart or respiratory conditions. Reducing exposure
                  is especially important for vulnerable individuals.
                </p>
              )}

              <button
                className="btn btn-link text-orange-400 p-0 mt-3 no-underline hover:text-orange-300"
                onClick={() => setShowMore(!showMore)}
                aria-expanded={showMore}
              >
                {showMore ? "Show less ↑" : "Read more →"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Safety tips */}
      <section id="tips" className="tips-section">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <div className="section-label">02 / STAY PROTECTED</div>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-4">
              Small Steps. <span className="text-orange-400">Safer You.</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">
              Simple daily precautions can help reduce your exposure
              to harmful haze particles.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tips.map((tip) => (
              <div
                className="card haze-card shadow-xl"
                key={tip.title}
              >
                <div className="card-body p-7">
                  <div className="tip-icon" aria-hidden="true">
                    {tip.icon}
                  </div>
                  <h3 className="card-title text-white mt-4 text-lg">
                    {tip.title}
                  </h3>
                  <p className="text-sm leading-7 text-gray-400 mt-1">
                    {tip.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-6xl mx-auto px-6 lg:px-10 py-16">
        <div className="alert haze-alert rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-5 p-7">
          <div className="text-3xl" aria-hidden="true">⚠️</div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-white">
              Check the air before heading out.
            </h3>
            <p className="text-sm text-gray-300 mt-1">
              Stay informed with official air quality readings and
              follow local health advisories.
            </p>
          </div>
          <a
            href="https://apims.doe.gov.my/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-warning rounded-full px-6"
          >
            Check Malaysia API ↗
          </a>
        </div>
      </section>

      <footer className="footer footer-center border-t border-white/10 p-8 text-gray-500 text-xs">
        <p>
          © 2026 Haze Awareness — Breathe Better. Live Better.
        </p>
        <p>
          Information based on ASEAN haze updates and WHO health guidance.
        </p>
      </footer>
    </main>
  );
}

export default App;
