import React, { useState } from "react";

/* =========================================================
   mPilot — single-file App.jsx
   ========================================================= */

const Icon = ({ name, size = 21, strokeWidth = 1.8 }) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  switch (name) {
    case "menu":
      return (
        <svg {...common}>
          <path d="M4 6h16" />
          <path d="M4 12h16" />
          <path d="M4 18h16" />
        </svg>
      );

    case "more":
      return (
        <svg {...common}>
          <circle cx="5" cy="12" r="1" fill="currentColor" />
          <circle cx="12" cy="12" r="1" fill="currentColor" />
          <circle cx="19" cy="12" r="1" fill="currentColor" />
        </svg>
      );

    case "pin":
      return (
        <svg {...common}>
          <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
          <circle cx="12" cy="10" r="2.2" />
        </svg>
      );

    case "route":
      return (
        <svg {...common}>
          <circle cx="6" cy="18" r="2.3" />
          <circle cx="18" cy="6" r="2.3" />
          <path d="M7.7 16.3 16.3 7.7" />
          <path d="M9.5 14.5 14.5 9.5" />
        </svg>
      );

    case "document":
      return (
        <svg {...common}>
          <path d="M6 3h9l3 3v15H6z" />
          <path d="M15 3v4h4" />
          <path d="M9 12h6" />
          <path d="M9 16h5" />
        </svg>
      );

    case "notes":
      return (
        <svg {...common}>
          <path d="M5 4h14v16H5z" />
          <path d="M8 8h8" />
          <path d="M8 12h8" />
          <path d="M8 16h5" />
        </svg>
      );

    case "plus":
      return (
        <svg {...common}>
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
      );

    case "search":
      return (
        <svg {...common}>
          <circle cx="10.8" cy="10.8" r="6.8" />
          <path d="m16 16 4.2 4.2" />
        </svg>
      );

    case "layers":
      return (
        <svg {...common}>
          <path d="m12 3 9 5-9 5-9-5 9-5Z" />
          <path d="m3 12 9 5 9-5" />
          <path d="m3 16 9 5 9-5" />
        </svg>
      );

    case "target":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="7" />
          <circle cx="12" cy="12" r="2.5" />
          <path d="M12 2v3" />
          <path d="M12 19v3" />
          <path d="M2 12h3" />
          <path d="M19 12h3" />
        </svg>
      );

    case "pencil":
      return (
        <svg {...common}>
          <path d="m4 20 4.2-1 9.7-9.7a2.1 2.1 0 0 0-3-3L5.2 16 4 20Z" />
          <path d="m13.8 7.2 3 3" />
        </svg>
      );

    case "calendar":
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="15" rx="1.5" />
          <path d="M8 3v4" />
          <path d="M16 3v4" />
          <path d="M4 9h16" />
        </svg>
      );

    case "help":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.7 9a2.5 2.5 0 1 1 4.1 1.9c-1.2 1-1.8 1.3-1.8 2.6" />
          <circle cx="12" cy="16.8" r=".7" fill="currentColor" />
        </svg>
      );

    case "sun":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3.8" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.9 4.9 1.4 1.4" />
          <path d="m17.7 17.7 1.4 1.4" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m4.9 19.1 1.4-1.4" />
          <path d="m17.7 6.3 1.4-1.4" />
        </svg>
      );

    case "moon":
      return (
        <svg {...common}>
          <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" />
        </svg>
      );

    case "settings":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21h-2.5v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H4v-2.5h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1L7.1 7l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V5h2.5v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.1v2.5h-.1a1.7 1.7 0 0 0-1.6 1Z" />
        </svg>
      );

    case "plane":
      return (
        <svg {...common}>
          <path d="M2 12h20" />
          <path d="m13 12 5.5 7H15l-3-5-3 5H5.5L11 12" />
          <path d="m11 12-3-7h3l1 4 1-4h3l-3 7" />
        </svg>
      );

    case "share":
      return (
        <svg {...common}>
          <circle cx="18" cy="5" r="2.2" />
          <circle cx="6" cy="12" r="2.2" />
          <circle cx="18" cy="19" r="2.2" />
          <path d="m8 11 7.8-4.5" />
          <path d="m8 13 7.8 4.5" />
        </svg>
      );

    case "save":
      return (
        <svg {...common}>
          <path d="M5 4h12l2 2v14H5z" />
          <path d="M8 4v5h8V4" />
          <circle cx="12" cy="16" r="2.5" />
        </svg>
      );

    case "trash":
      return (
        <svg {...common}>
          <path d="M5 7h14" />
          <path d="M9 7V4h6v3" />
          <path d="m7 7 1 13h8l1-13" />
          <path d="M10 11v5" />
          <path d="M14 11v5" />
        </svg>
      );

    case "back":
      return (
        <svg {...common}>
          <path d="m15 18-6-6 6-6" />
        </svg>
      );

    case "airport":
      return (
        <svg {...common}>
          <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
          <path d="m12 7 2.5 5.2L19 14l-7 1.2L5 14l4.5-1.8L12 7Z" />
        </svg>
      );

    case "weather":
      return (
        <svg {...common}>
          <path d="M7 18h10a4 4 0 0 0 .4-8 5.5 5.5 0 0 0-10.7 1A3.5 3.5 0 0 0 7 18Z" />
        </svg>
      );

    case "warning":
      return (
        <svg {...common}>
          <path d="m12 3 9 17H3L12 3Z" />
          <path d="M12 9v5" />
          <circle cx="12" cy="17" r=".7" fill="currentColor" />
        </svg>
      );

    case "briefing":
      return (
        <svg {...common}>
          <rect x="5" y="4" width="14" height="17" rx="1.5" />
          <path d="M9 4V2h6v2" />
          <path d="M8 9h8" />
          <path d="M8 13h8" />
          <path d="M8 17h5" />
        </svg>
      );

    case "scratch":
      return (
        <svg {...common}>
          <path d="m5 19 1-4 10-10 3 3L9 18l-4 1Z" />
          <path d="m14 6 3 3" />
        </svg>
      );

    default:
      return null;
  }
};

/* =========================================================
   MAP
   ========================================================= */

function MapView({ dark }) {
  const cities = [
    ["LONDON", "12%", "27%"],
    ["PARIS", "35%", "54%"],
    ["BERLIN", "74%", "28%"],
    ["MÜNCHEN", "79%", "67%"],
    ["ZÜRICH", "56%", "76%"],
  ];

  return (
    <div className={`map ${dark ? "map-dark" : "map-light"}`}>
      <div className="map-grid" />

      <div className="fir fir-one">LANGEN FIR<br />EDGG</div>
      <div className="fir fir-two">BREMEN FIR<br />EDWW</div>
      <div className="fir fir-three">KARLSRUHE FIR<br />EDUU</div>
      <div className="fir fir-four">REIMS FIR<br />LFFF</div>
      <div className="fir fir-five">MÜNCHEN FIR<br />EDMM</div>

      {cities.map(([name, left, top]) => (
        <div
          key={name}
          className="city"
          style={{ left, top }}
        >
          {name}
        </div>
      ))}

      <svg
        className="route-map"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
      >
        <path
          className="fir-line"
          d="M80 120 L340 85 L520 170 L720 130 L1010 260 L1120 470"
        />

        <path
          className="route-shadow"
          d="M205 180 L375 295 L505 400 L635 510 L770 630 L890 700"
        />

        <path
          className="route-path"
          d="M205 180 L375 295 L505 400 L635 510 L770 630 L890 700"
        />

        <circle className="route-node airport-node" cx="205" cy="180" r="13" />
        <circle className="route-node" cx="375" cy="295" r="6" />
        <circle className="route-node" cx="505" cy="400" r="6" />
        <circle className="route-node" cx="635" cy="510" r="6" />
        <circle className="route-node" cx="770" cy="630" r="6" />
        <circle className="route-node airport-node" cx="890" cy="700" r="13" />
      </svg>

      <div className="map-airport-label eddl-label">
        <strong>EDDL</strong>
      </div>

      <div className="map-airport-label lszh-label">
        <strong>LSZH</strong>
      </div>

      <div className="waypoint-label norku">NORKU</div>
      <div className="waypoint-label badli">BADLI</div>
      <div className="waypoint-label pesux">PESUX</div>
      <div className="waypoint-label sulus">SULUS</div>
      <div className="waypoint-label rilax">RILAX</div>

      <div className="map-controls">
        <button>
          <Icon name="search" size={21} />
        </button>
        <button>
          <Icon name="target" size={21} />
        </button>
        <button>
          <Icon name="layers" size={21} />
        </button>
        <button>
          <Icon name="pin" size={21} />
        </button>
        <button>
          <Icon name="pencil" size={21} />
        </button>
      </div>

      <div className="map-scale">
        <span>0</span>
        <div className="scale-line">
          <i />
          <i />
          <i />
        </div>
        <span>50</span>
        <span>100 NM</span>
      </div>

      <div className="low-high">
        <button className="active">LOW</button>
        <button>HIGH</button>
      </div>
    </div>
  );
}

/* =========================================================
   FLIGHT FOLDER
   ========================================================= */

function FlightFolder({
  dark,
  setDark,
  menuOpen,
  setMenuOpen,
  activeSection,
  setActiveSection,
}) {
  const sections = [
    {
      id: "departure",
      icon: "pin",
      title: "EDDL",
      subtitle: "Düsseldorf · DUS",
    },
    {
      id: "route",
      icon: "route",
      title: "Route",
      subtitle: "659 NM",
    },
    {
      id: "destination",
      icon: "pin",
      title: "LSZH",
      subtitle: "Zürich · ZRH",
    },
  ];

  return (
    <aside className="flight-folder">
      <div className="folder-header">
        <span>Flight Folder</span>

        <button
          className="folder-more"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name="more" size={19} />
        </button>

        {menuOpen && (
          <div className="folder-menu">
            <button>
              <Icon name="share" size={18} />
              <span>Share</span>
            </button>

            <button>
              <Icon name="save" size={18} />
              <span>Save</span>
            </button>

            <button>
              <Icon name="trash" size={18} />
              <span>Delete</span>
            </button>

            <button>
              <Icon name="plus" size={18} />
              <span>New Flight</span>
            </button>
          </div>
        )}
      </div>

      <button className="new-flight-button">
        <Icon name="plus" size={18} />
        <span>New Flight</span>
      </button>

      {sections.map((section) => (
        <button
          key={section.id}
          className={`flight-row ${
            activeSection === section.id ? "active" : ""
          }`}
          onClick={() => setActiveSection(section.id)}
        >
          <div className="flight-row-icon">
            <Icon name={section.icon} size={21} />
          </div>

          <div className="flight-row-text">
            <strong>{section.title}</strong>
            <small>{section.subtitle}</small>
          </div>

          <span className="row-arrow">›</span>
        </button>
      ))}

      <button
        className={`flight-row ${
          activeSection === "alternate" ? "active" : ""
        }`}
        onClick={() => setActiveSection("alternate")}
      >
        <div className="flight-row-icon">
          <Icon name="pin" size={20} />
        </div>

        <div className="flight-row-text">
          <strong>Add Alternate</strong>
        </div>

        <span className="row-arrow">›</span>
      </button>

      <div className="folder-divider" />

      <button
        className={`flight-row ${
          activeSection === "documents" ? "active" : ""
        }`}
        onClick={() => setActiveSection("documents")}
      >
        <div className="flight-row-icon">
          <Icon name="document" size={20} />
        </div>

        <div className="flight-row-text">
          <strong>Documents</strong>
        </div>

        <span className="row-arrow">›</span>
      </button>

      <button
        className={`flight-row ${
          activeSection === "notes" ? "active" : ""
        }`}
        onClick={() => setActiveSection("notes")}
      >
        <div className="flight-row-icon">
          <Icon name="pin" size={20} />
        </div>

        <div className="flight-row-text">
          <strong>Route Notes</strong>
        </div>

        <span className="row-arrow">›</span>
      </button>

      <div className="folder-spacer" />

      <div className="folder-validity">
        <span>Validity</span>
        <strong>Up to date</strong>
      </div>

      <div className="folder-ready">
        <span className="ready-dot" />
        <span>Ready</span>
      </div>
    </aside>
  );
}

/* =========================================================
   TOP BAR
   ========================================================= */

function TopBar({ dark, setDark, setFolderOpen }) {
  return (
    <header className="top-bar">
      <button
        className="top-menu"
        onClick={() => setFolderOpen((value) => !value)}
      >
        <Icon name="menu" size={22} />
      </button>

      <div className="cycle-info">
        <strong>Cycle 1807</strong>
        <span />
        <span>Route not saved</span>
      </div>

      <div className="top-center">
        <Icon name="calendar" size={18} />
        <strong>00:00</strong>
      </div>

      <div className="top-right">
        <button>
          <Icon name="help" size={20} />
        </button>

        <button onClick={() => setDark(!dark)}>
          <Icon name={dark ? "sun" : "moon"} size={20} />
        </button>

        <div className="profile">
          <span>default</span>
          <i />
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   BOTTOM NAVIGATION
   ========================================================= */

function BottomNavigation({ activeNav, setActiveNav }) {
  const nav = [
    ["route", "Route"],
    ["airport", "Airports"],
    ["document", "Charts"],
    ["warning", "NOTAMs"],
    ["weather", "Weather"],
    ["briefing", "Briefing"],
    ["scratch", "Scratchpads"],
    ["settings", "Settings"],
    ["more", "More"],
  ];

  return (
    <div className="bottom-navigation">
      <button className="bottom-back">
        <Icon name="back" size={25} />
      </button>

      <div className="bottom-location">
        <strong>EDDL</strong>
      </div>

      <div className="bottom-nav-items">
        {nav.map(([icon, label]) => (
          <button
            key={label}
            className={activeNav === label ? "selected" : ""}
            onClick={() => setActiveNav(label)}
          >
            <Icon name={icon} size={21} />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   MAIN APP
   ========================================================= */

export default function App() {
  const [dark, setDark] = useState(true);
  const [folderOpen, setFolderOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("route");
  const [activeNav, setActiveNav] = useState("Route");

  return (
    <div className={`mpilot ${dark ? "theme-dark" : "theme-light"}`}>
      <TopBar
        dark={dark}
        setDark={setDark}
        setFolderOpen={setFolderOpen}
      />

      <div className="main-area">
        {folderOpen && (
          <FlightFolder
            dark={dark}
            setDark={setDark}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        )}

        <main className="map-area">
          <MapView dark={dark} />

          <div className="route-status">
            <span className="status-document">
              <Icon name="document" size={17} />
            </span>
            <span>No flight loaded</span>
          </div>
        </main>
      </div>

      <BottomNavigation
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      />
    </div>
  );
}

/* =========================================================
   STYLES
   ========================================================= */

const style = document.createElement("style");

style.textContent = `
* {
  box-sizing: border-box;
}

html,
body,
#root {
  margin: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Arial,
    sans-serif;
}

button {
  font-family: inherit;
}

button:focus {
  outline: none;
}

.mpilot {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* =========================================================
   THEMES
   ========================================================= */

.theme-dark {
  --background: #111518;
  --panel: #151b20;
  --panel-2: #1a2025;
  --panel-3: #20272c;
  --border: #30383e;
  --text: #f2f4f5;
  --muted: #9ba4aa;
  --soft: #727d84;
  --route: #3aa9ed;
  --route-light: #72c6f5;
  --map-grid: rgba(255,255,255,.065);
  --map-country: rgba(113, 171, 133, .35);
  --bottom: #101418;
}

.theme-light {
  --background: #e7e7e5;
  --panel: #f8f8f7;
  --panel-2: #eeeeec;
  --panel-3: #e4e4e1;
  --border: #d1d1ce;
  --text: #181a1c;
  --muted: #707477;
  --soft: #929598;
  --route: #2d9ddd;
  --route-light: #58b7e8;
  --map-grid: rgba(0,0,0,.08);
  --map-country: rgba(57, 119, 78, .42);
  --bottom: #fafafa;
}

/* =========================================================
   TOP
   ========================================================= */

.top-bar {
  height: 48px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  background: var(--panel);
  color: var(--text);
  border-bottom: 1px solid var(--border);
  position: relative;
  z-index: 50;
}

.top-menu {
  width: 48px;
  height: 48px;
  border: 0;
  background: transparent;
  color: var(--text);
  display: grid;
  place-items: center;
  cursor: pointer;
}

.cycle-info {
  height: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
}

.cycle-info strong {
  font-weight: 500;
}

.cycle-info span:first-of-type {
  width: 1px;
  height: 16px;
  background: var(--border);
}

.cycle-info span:last-of-type {
  color: var(--muted);
}

.top-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 7px;
  color: var(--text);
  font-size: 12px;
}

.top-center svg {
  color: var(--muted);
}

.top-right {
  margin-left: auto;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 7px;
  padding-right: 12px;
}

.top-right > button {
  width: 34px;
  height: 34px;
  border: 0;
  background: transparent;
  color: var(--text);
  display: grid;
  place-items: center;
  cursor: pointer;
}

.profile {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 5px;
  color: var(--muted);
  font-size: 11px;
}

.profile i {
  width: 7px;
  height: 7px;
  background: #42bb73;
  border-radius: 50%;
}

/* =========================================================
   MAIN
   ========================================================= */

.main-area {
  flex: 1;
  min-height: 0;
  display: flex;
  position: relative;
}

/* =========================================================
   FLIGHT FOLDER
   ========================================================= */

.flight-folder {
  width: 270px;
  min-width: 270px;
  height: 100%;
  background: var(--panel);
  color: var(--text);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 40;
}

.folder-header {
  height: 48px;
  padding: 0 9px 0 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border);
  font-size: 13px;
  font-weight: 600;
  position: relative;
}

.folder-more {
  width: 30px;
  height: 30px;
  border: 0;
  background: transparent;
  color: var(--text);
  display: grid;
  place-items: center;
  cursor: pointer;
}

.folder-menu {
  position: absolute;
  top: 40px;
  right: -115px;
  width: 160px;
  background: var(--panel);
  border: 1px solid var(--border);
  box-shadow: 0 8px 25px rgba(0,0,0,.25);
  z-index: 100;
}

.folder-menu button {
  width: 100%;
  height: 43px;
  border: 0;
  border-bottom: 1px solid var(--border);
  background: transparent;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 14px;
  cursor: pointer;
  text-align: left;
}

.folder-menu button:hover {
  background: var(--panel-2);
}

.folder-menu button:last-child {
  border-bottom: 0;
}

.new-flight-button {
  margin: 16px 4px 11px;
  height: 40px;
  border: 0;
  border-radius: 3px;
  background: #35a7df;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 9px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
}

.new-flight-button:hover {
  background: #49b3e8;
}

.flight-row {
  width: 100%;
  min-height: 72px;
  border: 0;
  border-bottom: 1px solid var(--border);
  background: transparent;
  color: var(--text);
  display: grid;
  grid-template-columns: 30px 1fr 20px;
  align-items: center;
  gap: 7px;
  padding: 8px 10px 8px 10px;
  text-align: left;
  cursor: pointer;
}

.flight-row:hover {
  background: var(--panel-2);
}

.flight-row.active {
  background: var(--panel-2);
}

.flight-row-icon {
  display: grid;
  place-items: center;
  color: var(--muted);
}

.flight-row.active .flight-row-icon {
  color: var(--text);
}

.flight-row-text strong {
  display: block;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 4px;
}

.flight-row-text small {
  display: block;
  color: var(--muted);
  font-size: 11px;
}

.row-arrow {
  color: var(--muted);
  font-size: 24px;
  line-height: 1;
  text-align: center;
}

.folder-divider {
  height: 12px;
  flex-shrink: 0;
  border-bottom: 1px solid var(--border);
  background: var(--panel-2);
}

.folder-spacer {
  flex: 1;
}

.folder-validity {
  height: 32px;
  padding: 0 7px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
  color: var(--muted);
}

.folder-validity strong {
  color: #49ba78;
  font-weight: 500;
}

.folder-ready {
  height: 25px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding-left: 6px;
  color: var(--muted);
  font-size: 10px;
}

.ready-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 1px solid #3db876;
  position: relative;
}

.ready-dot::after {
  content: "";
  position: absolute;
  inset: 2px;
  background: #3db876;
  border-radius: 50%;
}

/* =========================================================
   MAP
   ========================================================= */

.map-area {
  flex: 1;
  min-width: 0;
  min-height: 0;
  position: relative;
  overflow: hidden;
}

.map {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.map-dark {
  background:
    radial-gradient(circle at 50% 45%, rgba(53,75,84,.18), transparent 42%),
    #20272b;
}

.map-light {
  background:
    radial-gradient(circle at 50% 45%, rgba(255,255,255,.7), transparent 42%),
    #e6e6e2;
}

.map-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--map-grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--map-grid) 1px, transparent 1px);
  background-size: 90px 90px;
}

.fir {
  position: absolute;
  color: var(--map-country);
  font-size: 11px;
  line-height: 1.5;
  letter-spacing: .4px;
  pointer-events: none;
}

.fir-one {
  top: 10%;
  left: 43%;
}

.fir-two {
  top: 13%;
  right: 19%;
}

.fir-three {
  top: 42%;
  right: 18%;
}

.fir-four {
  bottom: 30%;
  left: 19%;
}

.fir-five {
  bottom: 18%;
  right: 11%;
}

.city {
  position: absolute;
  transform: translate(-50%, -50%);
  color: var(--muted);
  font-size: 11px;
  letter-spacing: .5px;
  opacity: .8;
}

.route-map {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.fir-line {
  fill: none;
  stroke: var(--map-country);
  stroke-width: 1;
  stroke-dasharray: 8 5;
}

.route-shadow {
  fill: none;
  stroke: rgba(0,0,0,.38);
  stroke-width: 7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.route-path {
  fill: none;
  stroke: var(--route);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.route-node {
  fill: var(--panel);
  stroke: #e7edf0;
  stroke-width: 2.5;
}

.airport-node {
  fill: var(--route);
  stroke: white;
  stroke-width: 4;
}

.map-airport-label {
  position: absolute;
  padding: 5px 8px;
  background: rgba(23,31,35,.92);
  color: white;
  border: 1px solid rgba(76,166,219,.7);
  border-radius: 3px;
  font-size: 12px;
  letter-spacing: .3px;
}

.theme-light .map-airport-label {
  background: rgba(255,255,255,.94);
  color: #1d2529;
  border-color: rgba(48,139,188,.7);
}

.eddl-label {
  left: 20%;
  top: 19%;
}

.lszh-label {
  left: 73%;
  top: 78%;
}

.waypoint-label {
  position: absolute;
  padding: 4px 7px;
  background: rgba(28,36,40,.9);
  color: white;
  border: 1px solid rgba(83,168,215,.6);
  border-radius: 3px;
  font-size: 11px;
}

.theme-light .waypoint-label {
  background: rgba(255,255,255,.95);
  color: #20272a;
}

.norku {
  left: 34%;
  top: 34%;
}

.badli {
  left: 45%;
  top: 47%;
}

.pesux {
  left: 54%;
  top: 58%;
}

.sulus {
  left: 63%;
  top: 68%;
}

.rilax {
  left: 70%;
  top: 75%;
}

.map-controls {
  position: absolute;
  right: 13px;
  top: 14px;
  width: 38px;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.map-controls button {
  width: 38px;
  height: 38px;
  border: 1px solid var(--border);
  background: rgba(25,31,35,.9);
  color: var(--text);
  display: grid;
  place-items: center;
  cursor: pointer;
}

.theme-light .map-controls button {
  background: rgba(247,247,245,.94);
  color: #23282b;
}

.map-controls button:hover {
  background: var(--panel-2);
}

.map-scale {
  position: absolute;
  right: 24px;
  bottom: 14px;
  display: flex;
  align-items: flex-end;
  gap: 7px;
  color: var(--text);
  font-size: 10px;
}

.scale-line {
  width: 110px;
  height: 10px;
  display: flex;
  border-bottom: 3px solid var(--text);
}

.scale-line i {
  flex: 1;
  border-left: 1px solid var(--text);
}

.scale-line i:last-child {
  border-right: 1px solid var(--text);
}

.low-high {
  position: absolute;
  left: 13px;
  bottom: 13px;
  display: flex;
  gap: 1px;
}

.low-high button {
  height: 36px;
  padding: 0 18px;
  border: 1px solid var(--border);
  background: var(--panel);
  color: var(--muted);
  cursor: pointer;
  font-size: 11px;
  font-weight: 600;
}

.low-high button.active {
  background: var(--panel-3);
  color: var(--text);
  border-color: var(--route);
}

.route-status {
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  height: 25px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--muted);
  font-size: 10px;
  pointer-events: none;
}

.status-document {
  display: grid;
  place-items: center;
}

/* =========================================================
   BOTTOM NAV
   ========================================================= */

.bottom-navigation {
  height: 76px;
  flex-shrink: 0;
  background: var(--bottom);
  color: var(--text);
  border-top: 1px solid var(--border);
  display: flex;
  align-items: stretch;
  position: relative;
  z-index: 50;
}

.bottom-back {
  width: 60px;
  flex-shrink: 0;
  border: 0;
  border-right: 1px solid var(--border);
  background: transparent;
  color: var(--text);
  display: grid;
  place-items: center;
  cursor: pointer;
}

.bottom-location {
  width: 65px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--route);
  font-size: 13px;
  border-right: 1px solid var(--border);
}

.bottom-nav-items {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: stretch;
  justify-content: space-evenly;
}

.bottom-nav-items button {
  min-width: 72px;
  flex: 1;
  max-width: 125px;
  border: 0;
  background: transparent;
  color: var(--muted);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: pointer;
  font-size: 10px;
}

.bottom-nav-items button:hover {
  color: var(--text);
}

.bottom-nav-items button.selected {
  color: var(--text);
}

.bottom-nav-items button.selected svg {
  color: var(--route);
}

/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 900px) {
  .flight-folder {
    width: 235px;
    min-width: 235px;
  }

  .bottom-nav-items button {
    min-width: 50px;
    font-size: 9px;
  }

  .bottom-nav-items button:nth-child(n+7) {
    display: none;
  }
}

@media (max-width: 650px) {
  .flight-folder {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    box-shadow: 8px 0 30px rgba(0,0,0,.3);
  }

  .cycle-info span:last-of-type {
    display: none;
  }

  .top-center {
    display: none;
  }

  .bottom-location {
    display: none;
  }

  .bottom-navigation {
    height: 65px;
  }

  .bottom-nav-items button {
    min-width: 45px;
  }

  .bottom-nav-items button span {
    display: none;
  }

  .bottom-nav-items button:nth-child(n+7) {
    display: none;
  }

  .map-controls {
    right: 8px;
  }

  .map-scale {
    display: none;
  }
}
`;

document.head.appendChild(style);
