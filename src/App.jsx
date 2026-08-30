import React, { useState } from "react";

const Icon = ({ type, size = 18 }) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  const paths = {
    menu: (
      <>
        <path d="M4 6h16" />
        <path d="M4 12h16" />
        <path d="M4 18h16" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21h-2.5v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H4v-2.5h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1L7.1 7l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V5h2.5v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.1v2.5h-.1a1.7 1.7 0 0 0-1.6 1Z" />
      </>
    ),
    plane: (
      <>
        <path d="M2 12h20" />
        <path d="m13 12 5.5 7H15l-3-5-3 5H5.5L11 12" />
        <path d="m11 12-3-7h3l1 4 1-4h3l-3 7" />
      </>
    ),
    document: (
      <>
        <path d="M6 3h9l3 3v15H6z" />
        <path d="M15 3v4h4" />
        <path d="M9 12h6" />
        <path d="M9 16h6" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="m3 12 9 5 9-5" />
        <path d="m3 16 9 5 9-5" />
      </>
    ),
    note: (
      <>
        <path d="M5 4h14v16H5z" />
        <path d="M8 8h8" />
        <path d="M8 12h8" />
        <path d="M8 16h5" />
      </>
    ),
    route: (
      <>
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="6" r="2" />
        <path d="M7.5 16.5 16.5 7.5" />
      </>
    ),
    moon: (
      <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" />
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m4.93 19.07 1.41-1.41" />
        <path d="m17.66 6.34 1.41-1.41" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </>
    ),
    more: (
      <>
        <circle cx="5" cy="12" r="1" fill="currentColor" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
        <circle cx="19" cy="12" r="1" fill="currentColor" />
      </>
    ),
    back: <path d="m15 18-6-6 6-6" />,
  };

  return <svg {...common}>{paths[type]}</svg>;
};

function MapView({ dark }) {
  return (
    <div className={`map ${dark ? "map-dark" : "map-light"}`}>
      <div className="map-grid" />

      <div className="country germany">GERMANY</div>
      <div className="country france">FRANCE</div>
      <div className="country switzerland">SWITZERLAND</div>
      <div className="country austria">AUSTRIA</div>
      <div className="country italy">ITALY</div>
      <div className="country czech">CZECHIA</div>

      <svg className="route-svg" viewBox="0 0 1200 800">
        <path
          d="M170 210 C270 220 350 275 430 330 C510 385 590 395 660 430 C750 475 825 520 900 580"
          className="route-shadow"
        />
        <path
          d="M170 210 C270 220 350 275 430 330 C510 385 590 395 660 430 C750 475 825 520 900 580"
          className="route-line"
        />

        <circle cx="170" cy="210" r="7" className="route-point" />
        <circle cx="430" cy="330" r="5" className="waypoint" />
        <circle cx="660" cy="430" r="5" className="waypoint" />
        <circle cx="900" cy="580" r="7" className="route-point" />

        <text x="185" y="198">EDDL</text>
        <text x="445" y="320">NORKU</text>
        <text x="675" y="420">BADLI</text>
        <text x="915" y="570">LSZH</text>
      </svg>

      <div className="map-label london">LONDON</div>
      <div className="map-label paris">PARIS</div>
      <div className="map-label berlin">BERLIN</div>
      <div className="map-label munich">MÜNCHEN</div>
      <div className="map-label zurich">ZÜRICH</div>

      <div className="navaid n1">● VIL</div>
      <div className="navaid n2">● COL</div>
      <div className="navaid n3">● LUMEN</div>
      <div className="navaid n4">● KPT</div>

      <div className="map-airport departure">
        <span className="airport-dot" />
        <b>EDDL</b>
        <small>Düsseldorf</small>
      </div>

      <div className="map-airport destination">
        <span className="airport-dot" />
        <b>LSZH</b>
        <small>Zurich</small>
      </div>

      <div className="map-controls">
        <button>
          <Icon type="search" />
        </button>
        <button>
          <Icon type="layers" />
        </button>
        <button>
          <Icon type="pin" />
        </button>
        <button>
          <Icon type="settings" />
        </button>
      </div>

      <div className="map-bottom">
        <button className="active-map">LOW</button>
        <button>HIGH</button>
      </div>
    </div>
  );
}

function ChartView({ dark }) {
  return (
    <div className={`chart ${dark ? "chart-dark" : ""}`}>
      <div className="chart-header">
        <div>
          <strong>EDDL</strong>
          <span>Düsseldorf · Ground Charts</span>
        </div>
        <span>AD 2 EDDL</span>
      </div>

      <div className="chart-paper">
        <div className="chart-title">DÜSSELDORF</div>
        <div className="chart-subtitle">GROUND MOVEMENT CHART</div>

        <div className="runway runway-main">
          <span>05R / 23L</span>
        </div>

        <div className="runway runway-small">
          <span>05L / 23R</span>
        </div>

        <div className="taxiway t1">A</div>
        <div className="taxiway t2">B</div>
        <div className="taxiway t3">C</div>
        <div className="taxiway t4">D</div>
        <div className="taxiway t5">E</div>

        {[
          [18, 24, "A1"],
          [30, 68, "A4"],
          [46, 32, "B2"],
          [58, 76, "B7"],
          [73, 42, "C3"],
          [82, 70, "C8"],
          [36, 50, "D4"],
          [66, 58, "E2"],
        ].map(([top, left, label]) => (
          <div
            key={label}
            className="stand"
            style={{ top: `${top}%`, left: `${left}%` }}
          >
            {label}
          </div>
        ))}

        <div className="chart-route">
          <span />
          <span />
          <span />
        </div>

        <div className="chart-info">
          <b>EDDL / DUS</b>
          <br />
          ICAO AD 2
          <br />
          AIRAC 2608
        </div>

        <div className="north">N ↑</div>
      </div>
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useState(true);
  const [view, setView] = useState("route");
  const [sidebar, setSidebar] = useState(true);
  const [flight, setFlight] = useState(false);
  const [activeSection, setActiveSection] = useState("route");

  const sections = [
    { id: "departure", icon: "pin", title: "Departure", sub: "EDDL · Düsseldorf" },
    { id: "destination", icon: "pin", title: "Destination", sub: "LSZH · Zürich" },
    { id: "alternate", icon: "pin", title: "Alternate", sub: "Add Alternate" },
  ];

  return (
    <div className={`app ${dark ? "dark" : "light"}`}>
      <header className="topbar">
        <button className="menu-button" onClick={() => setSidebar(!sidebar)}>
          <Icon type="menu" />
        </button>

        <div className="cycle">
          <span>Cycle 1807</span>
          <i />
          <span className="muted">Route not saved</span>
        </div>

        <div className="top-center">
          <span className="clock">◷</span>
          <b>00:00</b>
        </div>

        <div className="top-actions">
          <button>
            <Icon type="note" />
          </button>

          <button onClick={() => setDark(!dark)}>
            <Icon type={dark ? "sun" : "moon"} />
          </button>

          <div className="profile">
            <span>default</span>
            <i />
          </div>
        </div>
      </header>

      <main>
        {sidebar && (
          <aside className="sidebar">
            <div className="sidebar-title">
              <span>Flight Folder</span>
              <button>
                <Icon type="more" />
              </button>
            </div>

            <button
              className="new-flight"
              onClick={() => setFlight(true)}
            >
              <Icon type="plus" />
              <span>New Flight</span>
            </button>

            {sections.map((item) => (
              <button
                key={item.id}
                className={`side-row ${
                  activeSection === item.id ? "selected" : ""
                }`}
                onClick={() => setActiveSection(item.id)}
              >
                <Icon type={item.icon} size={17} />
                <div>
                  <strong>{item.title}</strong>
                  <small>{item.sub}</small>
                </div>
                <span className="arrow">›</span>
              </button>
            ))}

            <div className="separator" />

            <button
              className={`side-row ${
                activeSection === "documents" ? "selected" : ""
              }`}
              onClick={() => setActiveSection("documents")}
            >
              <Icon type="document" size={17} />
              <div>
                <strong>Documents</strong>
                <small>Charts & Documents</small>
              </div>
              <span className="arrow">›</span>
            </button>

            <button
              className={`side-row ${
                activeSection === "notes" ? "selected" : ""
              }`}
              onClick={() => setActiveSection("notes")}
            >
              <Icon type="note" size={17} />
              <div>
                <strong>Route Notes</strong>
                <small>Waypoint notes</small>
              </div>
              <span className="arrow">›</span>
            </button>

            <div className="sidebar-spacer" />

            <div className="validity">
              <span>Validity</span>
              <b>Up to date</b>
            </div>
          </aside>
        )}

        <section className="workspace">
          {view === "route" ? (
            <MapView dark={dark} />
          ) : (
            <ChartView dark={dark} />
          )}

          <div className="workspace-header">
            <div className="route-title">
              <b>{flight ? "EDDL → LSZH" : "Route"}</b>
              <span>{flight ? "Düsseldorf · Zürich" : "No flight loaded"}</span>
            </div>

            <div className="view-switch">
              <button
                className={view === "route" ? "active" : ""}
                onClick={() => setView("route")}
              >
                <Icon type="route" />
                Route
              </button>

              <button
                className={view === "chart" ? "active" : ""}
                onClick={() => setView("chart")}
              >
                <Icon type="document" />
                Charts
              </button>
            </div>
          </div>

          {view === "route" && (
            <div className="route-card">
              <div className="route-card-head">
                <div>
                  <span>ROUTE</span>
                  <strong>EDDL DCT NORKU DCT BADLI LSZH</strong>
                </div>
                <button>
                  <Icon type="more" />
                </button>
              </div>

              <div className="route-stats">
                <div>
                  <small>Distance</small>
                  <b>303 NM</b>
                </div>
                <div>
                  <small>Flight Level</small>
                  <b>FL240</b>
                </div>
                <div>
                  <small>Waypoints</small>
                  <b>4</b>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="bottom-bar">
        <div className="status">
          <span className="status-dot" />
          Ready
        </div>

        <div className="bottom-center">
          <span>No flight loaded</span>
        </div>

        <div className="bottom-tools">
          <button>
            <Icon type="document" />
          </button>
          <button className="active">
            <Icon type="pin" />
          </button>
          <button>
            <Icon type="settings" />
          </button>
        </div>
      </footer>

      {flight && (
        <div className="flight-modal-backdrop" onClick={() => setFlight(false)}>
          <div
            className="flight-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <span>NEW FLIGHT</span>
                <h2>Create Flight</h2>
              </div>
              <button onClick={() => setFlight(false)}>×</button>
            </div>

            <div className="airport-inputs">
              <div>
                <label>Departure</label>
                <input value="EDDL" readOnly />
                <small>Düsseldorf</small>
              </div>

              <div className="flight-arrow">→</div>

              <div>
                <label>Destination</label>
                <input value="LSZH" readOnly />
                <small>Zürich</small>
              </div>
            </div>

            <button
              className="create-button"
              onClick={() => setFlight(false)}
            >
              Load Flight
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = `
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
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

button {
  font: inherit;
}

.app {
  --bg: #1f2529;
  --panel: #252c31;
  --panel2: #20262a;
  --border: #394147;
  --text: #edf2f4;
  --muted: #8d989f;
  --accent: #2da8e6;
  --accent2: #42b8ec;
  width: 100%;
  height: 100%;
  background: var(--bg);
  color: var(--text);
}

.app.light {
  --bg: #e9ecee;
  --panel: #f7f8f8;
  --panel2: #eef1f2;
  --border: #ccd2d5;
  --text: #20272b;
  --muted: #6d777d;
  --accent: #2198d1;
  --accent2: #2198d1;
}

.topbar {
  height: 45px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  position: relative;
  z-index: 20;
}

.menu-button,
.top-actions button,
.sidebar-title button,
.route-card-head button {
  border: 0;
  background: transparent;
  color: var(--text);
  cursor: pointer;
}

.menu-button {
  width: 45px;
  height: 45px;
  display: grid;
  place-items: center;
}

.cycle {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  margin-left: 4px;
}

.cycle i {
  width: 1px;
  height: 14px;
  background: var(--border);
}

.muted {
  color: var(--muted);
}

.top-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
}

.clock {
  font-size: 18px;
  color: var(--muted);
}

.top-actions {
  margin-left: auto;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-right: 14px;
}

.top-actions button {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
}

.profile {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;
  font-size: 11px;
  color: var(--muted);
}

.profile i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #43bd76;
}

main {
  height: calc(100% - 78px);
  display: flex;
}

.sidebar {
  width: 270px;
  flex-shrink: 0;
  background: var(--panel);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
}

.sidebar-title {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 13px 0 5px;
  border-bottom: 1px solid var(--border);
  font-size: 13px;
  font-weight: 600;
}

.sidebar-title button {
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
}

.new-flight {
  margin: 16px 4px 12px;
  height: 40px;
  border: 0;
  border-radius: 3px;
  background: var(--accent);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  cursor: pointer;
  font-weight: 600;
  font-size: 13px;
}

.new-flight:hover {
  background: var(--accent2);
}

.side-row {
  width: 100%;
  min-height: 60px;
  border: 0;
  border-bottom: 1px solid var(--border);
  background: transparent;
  color: var(--text);
  display: grid;
  grid-template-columns: 23px 1fr 20px;
  gap: 7px;
  align-items: center;
  padding: 8px 12px 8px 8px;
  text-align: left;
  cursor: pointer;
}

.side-row:hover,
.side-row.selected {
  background: rgba(45, 168, 230, 0.08);
}

.side-row > svg {
  color: var(--muted);
}

.side-row strong {
  display: block;
  font-size: 12px;
  margin-bottom: 3px;
}

.side-row small {
  display: block;
  color: var(--muted);
  font-size: 10px;
}

.arrow {
  color: var(--muted);
  font-size: 21px;
  text-align: center;
}

.separator {
  height: 12px;
  border-bottom: 1px solid var(--border);
  background: var(--panel2);
}

.sidebar-spacer {
  flex: 1;
}

.validity {
  height: 45px;
  padding: 0 7px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 10px;
  color: var(--muted);
}

.validity b {
  color: #4fc17d;
  font-weight: 500;
}

.workspace {
  position: relative;
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.map {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.map-dark {
  background:
    radial-gradient(circle at 55% 45%, rgba(53, 73, 82, .35), transparent 45%),
    #20272b;
}

.map-light {
  background:
    radial-gradient(circle at 55% 45%, rgba(255,255,255,.8), transparent 45%),
    #dce4e5;
}

.map-grid {
  position: absolute;
  inset: 0;
  opacity: .3;
  background-image:
    linear-gradient(rgba(130,145,150,.22) 1px, transparent 1px),
    linear-gradient(90deg, rgba(130,145,150,.22) 1px, transparent 1px);
  background-size: 70px 70px;
}

.map-dark .map-grid {
  opacity: .55;
}

.country {
  position: absolute;
  border: 1px solid rgba(116, 164, 133, .38);
  color: rgba(118, 159, 133, .55);
  font-size: 10px;
  letter-spacing: 1px;
  padding: 20px 45px;
  transform: rotate(-8deg);
}

.germany {
  left: 55%;
  top: 29%;
}

.france {
  left: 30%;
  top: 50%;
  transform: rotate(7deg);
}

.switzerland {
  left: 55%;
  top: 67%;
}

.austria {
  left: 70%;
  top: 63%;
}

.italy {
  left: 62%;
  top: 78%;
}

.czech {
  left: 67%;
  top: 35%;
}

.route-svg {
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  overflow: visible;
}

.route-svg text {
  fill: var(--text);
  font-size: 11px;
  font-weight: 600;
}

.route-shadow {
  fill: none;
  stroke: rgba(0,0,0,.35);
  stroke-width: 7;
}

.route-line {
  fill: none;
  stroke: #36aeea;
  stroke-width: 3;
}

.route-point {
  fill: var(--bg);
  stroke: #36aeea;
  stroke-width: 3;
}

.waypoint {
  fill: #f0ad35;
  stroke: var(--bg);
  stroke-width: 3;
}

.map-label {
  position: absolute;
  color: var(--muted);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .6px;
  opacity: .7;
}

.london { left: 29%; top: 30%; }
.paris { left: 39%; top: 55%; }
.berlin { left: 68%; top: 32%; }
.munich { left: 75%; top: 63%; }
.zurich { left: 57%; top: 70%; }

.navaid {
  position: absolute;
  color: #78988a;
  font-size: 9px;
  opacity: .75;
}

.n1 { left: 40%; top: 35%; }
.n2 { left: 51%; top: 43%; }
.n3 { left: 65%; top: 52%; }
.n4 { left: 74%; top: 44%; }

.map-airport {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 11px;
}

.map-airport small {
  color: var(--muted);
  font-size: 9px;
}

.departure {
  left: 13%;
  top: 24%;
}

.destination {
  right: 14%;
  bottom: 25%;
}

.airport-dot {
  width: 10px;
  height: 10px;
  border: 2px solid #e9f3f7;
  border-radius: 50%;
  margin-bottom: 2px;
}

.map-controls {
  position: absolute;
  top: 14px;
  right: 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.map-controls button {
  width: 37px;
  height: 37px;
  background: rgba(31,38,42,.92);
  border: 1px solid #4a545a;
  border-radius: 3px;
  color: var(--text);
  display: grid;
  place-items: center;
  cursor: pointer;
}

.map-bottom {
  position: absolute;
  left: 14px;
  bottom: 14px;
  display: flex;
}

.map-bottom button {
  border: 0;
  background: rgba(31,38,42,.94);
  color: var(--muted);
  height: 32px;
  padding: 0 17px;
  font-size: 10px;
  font-weight: 700;
}

.map-bottom .active-map {
  color: white;
  background: var(--accent);
}

.workspace-header {
  position: absolute;
  left: 18px;
  right: 18px;
  top: 14px;
  height: 54px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
}

.route-title {
  background: rgba(31,38,42,.9);
  border: 1px solid rgba(90,103,110,.8);
  padding: 9px 14px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  pointer-events: auto;
}

.route-title b {
  font-size: 12px;
}

.route-title span {
  color: var(--muted);
  font-size: 9px;
}

.view-switch {
  display: flex;
  pointer-events: auto;
  background: rgba(31,38,42,.92);
  border: 1px solid #4a545a;
  border-radius: 3px;
  overflow: hidden;
}

.view-switch button {
  height: 36px;
  border: 0;
  background: transparent;
  color: var(--muted);
  padding: 0 13px;
  display: flex;
  align-items: center;
  gap: 7px;
  cursor: pointer;
  font-size: 10px;
}

.view-switch button.active {
  background: var(--accent);
  color: white;
}

.route-card {
  position: absolute;
  left: 18px;
  bottom: 18px;
  width: min(500px, calc(100% - 36px));
  background: rgba(31,38,42,.94);
  border: 1px solid #485259;
  border-radius: 3px;
  box-shadow: 0 10px 35px rgba(0,0,0,.25);
}

.route-card-head {
  padding: 12px 14px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #3d464c;
}

.route-card-head span {
  display: block;
  color: var(--muted);
  font-size: 8px;
  margin-bottom: 5px;
}

.route-card-head strong {
  font-size: 11px;
  letter-spacing: .3px;
}

.route-card-head button {
  color: var(--muted);
}

.route-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.route-stats div {
  padding: 11px 14px;
  border-right: 1px solid #3d464c;
}

.route-stats div:last-child {
  border-right: 0;
}

.route-stats small {
  display: block;
  color: var(--muted);
  font-size: 8px;
  margin-bottom: 4px;
}

.route-stats b {
  font-size: 12px;
}

.chart {
  position: absolute;
  inset: 0;
  background: #20262b;
  padding: 70px 35px 30px;
}

.chart-header {
  position: absolute;
  top: 15px;
  left: 18px;
  right: 18px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--text);
}

.chart-header div {
  display: flex;
  flex-direction: column;
}

.chart-header strong {
  font-size: 13px;
}

.chart-header span {
  color: var(--muted);
  font-size: 9px;
}

.chart-paper {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  background:
    linear-gradient(rgba(20,30,25,.08), rgba(20,30,25,.08)),
    #d9ddd9;
  color: #253329;
  border: 1px solid #818c85;
}

.chart-title {
  position: absolute;
  top: 18px;
  left: 25px;
  font-weight: 800;
  font-size: 17px;
}

.chart-subtitle {
  position: absolute;
  top: 40px;
  left: 25px;
  font-size: 9px;
}

.runway {
  position: absolute;
  background: #454d49;
  transform: rotate(-8deg);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
}

.runway-main {
  width: 72%;
  height: 38px;
  left: 15%;
  top: 45%;
}

.runway-small {
  width: 56%;
  height: 24px;
  left: 22%;
  top: 67%;
  transform: rotate(9deg);
}

.taxiway {
  position: absolute;
  background: #899c8e;
  color: #20362a;
  font-weight: 800;
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 4px;
}

.t1 { left: 20%; top: 29%; transform: rotate(8deg); }
.t2 { left: 50%; top: 31%; transform: rotate(-8deg); }
.t3 { left: 71%; top: 43%; transform: rotate(10deg); }
.t4 { left: 27%; top: 57%; transform: rotate(-5deg); }
.t5 { left: 60%; top: 74%; transform: rotate(5deg); }

.stand {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 1px solid #304b39;
  background: rgba(150,180,157,.45);
  font-size: 6px;
  display: grid;
  place-items: center;
}

.chart-route {
  position: absolute;
  width: 50%;
  height: 3px;
  left: 22%;
  top: 55%;
  background: #e7a92e;
  transform: rotate(-13deg);
  box-shadow: 0 0 0 2px rgba(231,169,46,.2);
}

.chart-route span {
  position: absolute;
  width: 7px;
  height: 7px;
  background: #e7a92e;
  border-radius: 50%;
  top: -2px;
}

.chart-route span:nth-child(1) { left: 0; }
.chart-route span:nth-child(2) { left: 50%; }
.chart-route span:nth-child(3) { right: 0; }

.chart-info {
  position: absolute;
  right: 18px;
  bottom: 18px;
  font-size: 8px;
  line-height: 1.5;
  border: 1px solid #59675d;
  padding: 8px;
}

.north {
  position: absolute;
  right: 20px;
  top: 20px;
  font-weight: 800;
}

.bottom-bar {
  height: 33px;
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  font-size: 9px;
  color: var(--muted);
}

.status {
  width: 270px;
  padding-left: 5px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid #43bd76;
  background: rgba(67,189,118,.2);
}

.bottom-center {
  flex: 1;
  text-align: center;
}

.bottom-tools {
  display: flex;
  height: 100%;
}

.bottom-tools button {
  width: 42px;
  border: 0;
  border-left: 1px solid var(--border);
  background: transparent;
  color: var(--muted);
  display: grid;
  place-items: center;
}

.bottom-tools button.active {
  color: white;
  background: var(--accent);
}

.flight-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(0,0,0,.55);
  display: grid;
  place-items: center;
}

.flight-modal {
  width: 430px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 4px;
  box-shadow: 0 20px 80px rgba(0,0,0,.45);
}

.modal-header {
  padding: 18px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--border);
}

.modal-header span {
  color: var(--muted);
  font-size: 9px;
}

.modal-header h2 {
  margin: 4px 0 0;
  font-size: 18px;
}

.modal-header button {
  border: 0;
  background: transparent;
  color: var(--muted);
  font-size: 26px;
  cursor: pointer;
}

.airport-inputs {
  display: grid;
  grid-template-columns: 1fr 30px 1fr;
  gap: 10px;
  align-items: center;
  padding: 25px 20px;
}

.airport-inputs label {
  display: block;
  color: var(--muted);
  font-size: 9px;
  margin-bottom: 5px;
}

.airport-inputs input {
  width: 100%;
  height: 42px;
  border: 1px solid var(--border);
  background: var(--panel2);
  color: var(--text);
  padding: 0 10px;
  font-size: 14px;
  font-weight: 700;
}

.airport-inputs small {
  color: var(--muted);
  font-size: 8px;
}

.flight-arrow {
  color: var(--accent);
  text-align: center;
}

.create-button {
  margin: 0 20px 20px;
  width: calc(100% - 40px);
  height: 40px;
  border: 0;
  background: var(--accent);
  color: white;
  font-weight: 700;
  cursor: pointer;
}

@media (max-width: 800px) {
  .sidebar {
    width: 235px;
  }

  .status {
    width: 235px;
  }

  .cycle .muted {
    display: none;
  }

  .route-card {
    width: calc(100% - 36px);
  }
}
`;

if (typeof document !== "undefined" && !document.getElementById("mpilot-styles")) {
  const style = document.createElement("style");
  style.id = "mpilot-styles";
  style.textContent = styles;
  document.head.appendChild(style);
}
