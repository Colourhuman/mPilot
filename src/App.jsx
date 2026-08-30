import React, { useEffect, useState } from "react";

/*
  mPilot - reference shell
  Single-file App.jsx as requested.
  The visual language follows the supplied screenshots:
  compact EFB chrome, Flight Folder, chart/map workspace,
  blue route accents, white/black day-night themes.
*/

const AirportIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 6.6 13.8 11l4.1 1.5-4.1 1.1L12 18l-1.8-4.4-4.1-1.1 4.1-1.5L12 6.6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const RouteIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="5.5" cy="18" r="2.3" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="18.5" cy="6" r="2.3" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="1.8" fill="currentColor" />
    <path d="M7.5 16.2 10.3 13.5M13.7 10.7l3.1-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const DocumentIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 3.5h9l3 3v14H6z" stroke="currentColor" strokeWidth="1.7" />
    <path d="M15 3.5v4h4M9 11h6M9 15h6M9 18h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const NotesIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 4.5h14v15H5z" stroke="currentColor" strokeWidth="1.7" />
    <path d="M8.5 9h7M8.5 12.5h7M8.5 16h4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SearchIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.8" />
    <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const LayersIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="m12 3 9 5-9 5-9-5 9-5Z" stroke="currentColor" strokeWidth="1.7" />
    <path d="m3 12 9 5 9-5M3 16l9 5 9-5" stroke="currentColor" strokeWidth="1.7" />
  </svg>
);

const TargetIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.7" />
    <circle cx="12" cy="12" r="2.8" stroke="currentColor" strokeWidth="1.7" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const PencilIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="m4 20 1.1-4 9.9-9.9 2.9 2.9-9.9 9.9L4 20Z" stroke="currentColor" strokeWidth="1.7" />
    <path d="m14.8 7.2 2.9 2.9M18.3 4.7a2 2 0 0 1 2.8 2.8l-1.5 1.5-2.8-2.8 1.5-1.5Z" stroke="currentColor" strokeWidth="1.7" />
  </svg>
);

const MoreIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="5" cy="12" r="1.2" fill="currentColor" />
    <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    <circle cx="19" cy="12" r="1.2" fill="currentColor" />
  </svg>
);

const MenuIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const MoonIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M19.8 14.8A8.4 8.4 0 0 1 9.2 4.2 8.5 8.5 0 1 0 19.8 14.8Z" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const SunIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

function TopBar({ dark, setDark, onMenu }) {
  return (
    <header className="mp-topbar">
      <div className="mp-top-left">
        <button className="mp-icon-btn" onClick={onMenu} aria-label="Flight Folder">
          <MenuIcon />
        </button>
        <div className="mp-cycle">
          <div>Cycle: 2208: 11 Aug - 7 Sep</div>
          <span>Route not saved</span>
        </div>
      </div>

      <div className="mp-top-center">
        <span className="mp-top-symbol">◷</span>
        <span>00:00</span>
      </div>

      <div className="mp-top-right">
        <button className="mp-icon-btn" aria-label="Time">
          <span className="tiny-sun">◉</span>
        </button>
        <button className="mp-icon-btn" aria-label="Help">
          <span className="help-symbol">?</span>
        </button>
        <button className="mp-icon-btn" onClick={() => setDark((v) => !v)} aria-label="Day night">
          {dark ? <SunIcon /> : <MoonIcon />}
        </button>
        <span className="mp-default">default</span>
        <span className="mp-status-dot" />
      </div>
    </header>
  );
}

function FlightFolder({ active, setActive, menuOpen, setMenuOpen }) {
  return (
    <aside className="mp-folder">
      <div className="mp-folder-head">
        <span>Flight Folder</span>
        <button className="mp-more-btn" onClick={() => setMenuOpen((v) => !v)}>
          <MoreIcon />
        </button>

        {menuOpen && (
          <div className="mp-folder-menu">
            <button><span className="menu-glyph">↗</span><span>Share</span></button>
            <button><span className="menu-glyph">▣</span><span>Save</span></button>
            <button><span className="menu-glyph">⌫</span><span>Delete</span></button>
            <button><span className="menu-glyph">＋</span><span>New Flight</span></button>
          </div>
        )}
      </div>

      <button className="mp-edit-flight">Edit Flight</button>

      <button
        className={`mp-flight-row ${active === "departure" ? "selected" : ""}`}
        onClick={() => setActive("departure")}
      >
        <div className="mp-row-icon"><AirportIcon /></div>
        <div className="mp-row-content">
          <strong>EDDL</strong>
          <span>Düsseldorf · DUS</span>
        </div>
        <span className="mp-chevron">›</span>
      </button>

      <button
        className={`mp-flight-row ${active === "route" ? "selected" : ""}`}
        onClick={() => setActive("route")}
      >
        <div className="mp-row-icon route-color"><RouteIcon /></div>
        <div className="mp-row-content">
          <strong>Route</strong>
          <span>659 NM</span>
        </div>
        <span className="mp-chevron">›</span>
      </button>

      <button
        className={`mp-flight-row ${active === "destination" ? "selected" : ""}`}
        onClick={() => setActive("destination")}
      >
        <div className="mp-row-icon"><AirportIcon /></div>
        <div className="mp-row-content">
          <strong>LSZH</strong>
          <span>Zürich · ZRH</span>
        </div>
        <span className="mp-chevron">›</span>
      </button>

      <button className="mp-alternate-btn">Add Alternate</button>

      <div className="mp-section-separator" />

      <button
        className={`mp-content-row ${active === "documents" ? "selected" : ""}`}
        onClick={() => setActive("documents")}
      >
        <DocumentIcon />
        <span>Documents</span>
        <span className="mp-chevron">›</span>
      </button>

      <button
        className={`mp-content-row ${active === "notes" ? "selected" : ""}`}
        onClick={() => setActive("notes")}
      >
        <NotesIcon />
        <span>Route Notes</span>
        <span className="mp-chevron">›</span>
      </button>

      <div className="mp-folder-spacer" />

      <div className="mp-low-high">
        <button className="active">Low</button>
        <button>High</button>
      </div>
    </aside>
  );
}

function RouteMap({ dark }) {
  return (
    <section className={`mp-map ${dark ? "dark" : "light"}`}>
      <div className="mp-map-land land-a" />
      <div className="mp-map-land land-b" />
      <div className="mp-map-land land-c" />
      <div className="mp-map-water water-a" />
      <div className="mp-map-water water-b" />

      <svg className="mp-map-svg" viewBox="0 0 1400 900" preserveAspectRatio="none">
        <path className="airspace airspace-a" d="M50 170 C220 90 360 130 490 60 C690 -20 840 80 1030 110 C1190 140 1320 250 1390 350" />
        <path className="airspace airspace-b" d="M0 610 C170 560 260 610 410 560 C590 500 680 575 820 540 C1030 480 1170 560 1400 500" />
        <path className="airspace airspace-c" d="M180 860 C330 740 430 765 545 710 C690 640 810 720 960 690 C1110 660 1280 700 1410 640" />

        <path className="route-shadow" d="M210 210 C335 245 450 315 545 380 C655 454 735 555 830 645 C905 715 980 755 1065 790" />
        <path className="route-main" d="M210 210 C335 245 450 315 545 380 C655 454 735 555 830 645 C905 715 980 755 1065 790" />

        <circle className="route-node airport" cx="210" cy="210" r="10" />
        <circle className="route-node" cx="335" cy="245" r="5.5" />
        <circle className="route-node" cx="450" cy="315" r="5.5" />
        <circle className="route-node" cx="545" cy="380" r="5.5" />
        <circle className="route-node" cx="655" cy="454" r="5.5" />
        <circle className="route-node" cx="735" cy="555" r="5.5" />
        <circle className="route-node" cx="830" cy="645" r="5.5" />
        <circle className="route-node" cx="905" cy="715" r="5.5" />
        <circle className="route-node airport" cx="1065" cy="790" r="10" />
      </svg>

      <div className="mp-fir fir-1">LANGEN FIR<br /><span>EDGG</span></div>
      <div className="mp-fir fir-2">BREMEN FIR<br /><span>EDWW</span></div>
      <div className="mp-fir fir-3">REIMS FIR<br /><span>LFFF</span></div>
      <div className="mp-fir fir-4">MÜNCHEN FIR<br /><span>EDMM</span></div>

      <div className="mp-city city-a">Düsseldorf</div>
      <div className="mp-city city-b">Frankfurt</div>
      <div className="mp-city city-c">Stuttgart</div>
      <div className="mp-city city-d">München</div>
      <div className="mp-city city-e">Zürich</div>
      <div className="mp-city city-f">Bern</div>

      <div className="mp-airport-tag departure-tag">
        <AirportIcon size={25} />
        <div><strong>EDDL</strong><span>Düsseldorf · DUS</span></div>
      </div>

      <div className="mp-airport-tag arrival-tag">
        <AirportIcon size={25} />
        <div><strong>LSZH</strong><span>Zürich · ZRH</span></div>
      </div>

      <div className="mp-wpt wpt-a">NORKU</div>
      <div className="mp-wpt wpt-b">BADLI</div>
      <div className="mp-wpt wpt-c">PESUX</div>
      <div className="mp-wpt wpt-d">SULUS</div>
      <div className="mp-wpt wpt-e">RILAX</div>
      <div className="mp-wpt wpt-f">METAL</div>

      <div className="mp-map-controls">
        <button><SearchIcon /></button>
        <button><TargetIcon /></button>
        <button><LayersIcon /></button>
        <button><AirportIcon /></button>
        <button><PencilIcon /></button>
      </div>

      <div className="mp-map-scale">
        <span>0</span>
        <div><i /><i /></div>
        <span>50</span>
        <span>100 NM</span>
      </div>
    </section>
  );
}

function ChartView({ dark }) {
  return (
    <section className={`mp-chart-view ${dark ? "dark" : "light"}`}>
      <div className="mp-chart-sidebar">
        <div className="mp-chart-airport">
          <div className="small-title">EDDF</div>
          <div className="small-sub">Frankfurt · FRA</div>
        </div>

        <div className="mp-filter-row">
          <button className="active">APT info</button>
          <button>APT WX</button>
        </div>
        <div className="mp-filter-row second">
          <button>Clipboard</button>
          <button>All Charts</button>
        </div>

        <button className="show-filters">Show Filters</button>

        <div className="chart-side-title">General</div>
        <div className="chart-side-title ground">Ground Charts</div>

        {[
          ["EDDF Taxi", false],
          ["EDDF AOC", false],
          ["Taxiway Information", true],
          ["Stand Coordinates", false],
        ].map(([text, selected]) => (
          <button key={text} className={`chart-side-item ${selected ? "selected" : ""}`}>
            <span>{text}</span>
            <span className="chart-bookmark">{selected ? "▮" : ""}</span>
          </button>
        ))}
      </div>

      <div className="mp-chart-main">
        <div className="mp-chart-paper">
          <div className="chart-heading">FRANKFURT / MAIN — EDDF</div>
          <div className="chart-edition">AD 2 EDDF · GROUND MOVEMENT CHART</div>

          <div className="runway-diagonal r1"><span>07C / 25C</span></div>
          <div className="runway-diagonal r2"><span>07R / 25L</span></div>
          <div className="runway-horizontal"><span>07L / 25R</span></div>

          {[
            [18, 18, "A1"], [24, 70, "A6"], [31, 42, "B3"], [41, 78, "C2"],
            [52, 28, "D1"], [61, 58, "E4"], [68, 82, "F5"], [75, 40, "G2"],
          ].map(([top, left, label]) => (
            <div className="stand-box" style={{ top: `${top}%`, left: `${left}%` }} key={label}>{label}</div>
          ))}

          <div className="chart-note n-a">ACFT STANDS</div>
          <div className="chart-note n-b">TWY A</div>
          <div className="chart-note n-c">TWY B</div>
          <div className="chart-note n-d">APRON</div>

          <div className="chart-north">N</div>
          <div className="chart-footer">© aeronautical chart representation · training/demo</div>
        </div>
      </div>
    </section>
  );
}

function NotesView({ dark }) {
  const notes = [
    ["N49 7.59 E4 39.92", ""],
    ["N61 15.22 W44 18.73", ""],
    ["N42 43.47 W71 19.51", "Listen to KJFK ATIS: 114.5"],
  ];

  return (
    <section className={`mp-notes-view ${dark ? "dark" : "light"}`}>
      <div className="mp-notes-sidebar">
        <div className="notes-top">
          <button className="back-link">‹ BACK</button>
          <strong>Notes</strong>
        </div>
        {notes.map(([title, sub], idx) => (
          <div className="note-entry" key={title}>
            <span className="note-pin">◆</span>
            <div>
              <strong>{title}</strong>
              {sub ? <small>{sub}</small> : null}
            </div>
          </div>
        ))}
      </div>

      <RouteMap dark={dark} />

      <div className="note-popup">
        <div className="popup-title">N42 43.47 W71 19.51</div>
        <div className="popup-body">
          <strong>Listen to KJFK ATIS:</strong><br />
          Freq. 114.5
        </div>
        <button>DELETE</button>
      </div>
    </section>
  );
}

function BottomNav({ active, setActive }) {
  const items = [
    ["route", "Route", RouteIcon],
    ["airports", "Airports", AirportIcon],
    ["charts", "Charts", DocumentIcon],
    ["notams", "NOTAMs", ({ size }) => <span style={{ fontSize: size }}>⚠</span>],
    ["weather", "Weather", ({ size }) => <span style={{ fontSize: size }}>☁</span>],
    ["briefing", "Briefing", DocumentIcon],
    ["scratchpads", "Scratchpads", NotesIcon],
    ["settings", "Settings", ({ size }) => <span style={{ fontSize: size }}>⚙</span>],
    ["more", "More", MoreIcon],
  ];

  return (
    <nav className="mp-bottom">
      <button className="mp-bottom-back">‹</button>
      <div className="mp-bottom-location">EDDL</div>
      <div className="mp-bottom-items">
        {items.map(([id, label, Comp]) => (
          <button key={id} className={active === id ? "active" : ""} onClick={() => setActive(id)}>
            <Comp size={20} />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

export default function App() {
  const [dark, setDark] = useState(true);
  const [folderOpen, setFolderOpen] = useState(true);
  const [folderMenu, setFolderMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("route");
  const [activeNav, setActiveNav] = useState("route");
  const [screen, setScreen] = useState("route");

  useEffect(() => {
    if (activeNav === "charts") setScreen("charts");
    else if (activeNav === "route" || activeNav === "airports") setScreen("route");
    else if (activeNav === "scratchpads") setScreen("notes");
  }, [activeNav]);

  useEffect(() => {
    if (activeSection === "documents") {
      setScreen("charts");
      setActiveNav("charts");
    } else if (activeSection === "notes") {
      setScreen("notes");
      setActiveNav("scratchpads");
    } else if (activeSection === "route") {
      setScreen("route");
      setActiveNav("route");
    }
  }, [activeSection]);

  return (
    <div className={`mpilot-app ${dark ? "theme-dark" : "theme-light"}`}>
      <style>{styles}</style>

      <TopBar
        dark={dark}
        setDark={setDark}
        onMenu={() => setFolderOpen((v) => !v)}
      />

      <div className="mp-body">
        {folderOpen && (
          <FlightFolder
            active={activeSection}
            setActive={setActiveSection}
            menuOpen={folderMenu}
            setMenuOpen={setFolderMenu}
          />
        )}

        <div className="mp-content">
          {screen === "charts" ? <ChartView dark={dark} /> : null}
          {screen === "notes" ? <NotesView dark={dark} /> : null}
          {screen === "route" ? <RouteMap dark={dark} /> : null}
        </div>
      </div>

      <BottomNav active={activeNav} setActive={setActiveNav} />
    </div>
  );
}

const styles = `
* { box-sizing: border-box; }
html, body, #root { width:100%; height:100%; margin:0; overflow:hidden; }
body { font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif; }
button { font:inherit; }

.mpilot-app {
  width:100%; height:100%; display:flex; flex-direction:column; overflow:hidden;
  --bg:#f3f3f2; --panel:#f8f8f7; --panel2:#ececea; --border:#d0d0cc;
  --text:#1d2225; --muted:#777c7e; --route:#38a4df; --green:#5ba27b;
  background:var(--bg); color:var(--text);
}
.theme-dark {
  --bg:#101417; --panel:#171d22; --panel2:#1d2429; --border:#343c42;
  --text:#eceff1; --muted:#929ba1; --route:#45abe8; --green:#61ad82;
}

.mp-topbar {
  height:52px; flex:0 0 52px; display:flex; align-items:center; position:relative;
  background:var(--panel); border-bottom:1px solid var(--border); z-index:100;
}
.mp-top-left { display:flex; align-items:center; height:100%; }
.mp-icon-btn,.mp-more-btn,.top-right button { border:0; background:transparent; color:var(--text); cursor:pointer; }
.mp-icon-btn { width:45px; height:45px; display:grid; place-items:center; }
.mp-cycle { display:flex; flex-direction:column; justify-content:center; gap:2px; font-size:11px; line-height:1.15; }
.mp-cycle strong { font-weight:600; }
.mp-cycle span { color:var(--muted); }
.mp-top-center { position:absolute; left:50%; transform:translateX(-50%); display:flex; gap:7px; align-items:center; font-size:11px; font-weight:600; }
.mp-top-symbol { color:var(--muted); font-size:17px; }
.mp-top-right { margin-left:auto; display:flex; align-items:center; gap:4px; padding-right:10px; }
.mp-top-right > button { width:34px; height:34px; display:grid; place-items:center; }
.tiny-sun { color:var(--muted); font-size:15px; }
.help-symbol { width:17px; height:17px; border:1px solid var(--muted); border-radius:50%; display:grid; place-items:center; font-size:11px; color:var(--muted); }
.mp-default { font-size:10px; color:var(--muted); margin-left:4px; }
.mp-status-dot { width:7px; height:7px; border-radius:50%; background:#48b77c; margin-left:2px; }

.mp-body { min-height:0; flex:1; display:flex; }

.mp-folder { width:390px; min-width:390px; height:100%; background:var(--panel); border-right:1px solid var(--border); display:flex; flex-direction:column; position:relative; z-index:80; }
.mp-folder-head { height:58px; display:flex; align-items:center; justify-content:center; position:relative; border-bottom:1px solid var(--border); font-size:14px; font-weight:600; }
.mp-more-btn { position:absolute; right:12px; width:34px; height:34px; display:grid; place-items:center; color:var(--muted); }
.mp-folder-menu { position:absolute; top:49px; right:-145px; width:165px; background:var(--panel); border:1px solid var(--border); box-shadow:0 8px 25px rgba(0,0,0,.27); }
.mp-folder-menu button { width:100%; height:43px; border:0; border-bottom:1px solid var(--border); background:transparent; color:var(--text); display:flex; align-items:center; gap:12px; padding:0 13px; cursor:pointer; }
.mp-folder-menu button:hover { background:var(--panel2); }
.menu-glyph { width:18px; color:var(--muted); text-align:center; }
.mp-edit-flight { height:42px; margin:14px 20px; border:1px solid var(--border); background:var(--panel2); color:var(--text); font-size:12px; cursor:pointer; }
.mp-edit-flight:hover { border-color:var(--route); }
.mp-flight-row { width:100%; min-height:92px; display:grid; grid-template-columns:42px 1fr 25px; align-items:center; gap:11px; padding:10px 21px; border:0; border-top:1px solid var(--border); background:transparent; color:var(--text); text-align:left; cursor:pointer; }
.mp-flight-row:hover,.mp-flight-row.selected { background:var(--panel2); }
.mp-row-icon { color:var(--muted); display:grid; place-items:center; }
.route-color { color:var(--route); }
.mp-row-content strong { display:block; font-size:16px; line-height:1.1; margin-bottom:6px; }
.mp-row-content span { display:block; color:var(--muted); font-size:11px; }
.mp-chevron { color:var(--muted); font-size:25px; line-height:1; }
.mp-alternate-btn { margin:14px 20px; height:39px; border:1px solid var(--border); background:var(--panel2); color:var(--muted); cursor:pointer; font-size:11px; }
.mp-alternate-btn:hover { color:var(--text); border-color:var(--route); }
.mp-section-separator { height:12px; background:var(--panel2); border-top:1px solid var(--border); border-bottom:1px solid var(--border); }
.mp-content-row { width:100%; min-height:60px; display:grid; grid-template-columns:31px 1fr 25px; align-items:center; gap:9px; padding:0 20px; border:0; border-top:1px solid var(--border); background:transparent; color:var(--text); cursor:pointer; text-align:left; }
.mp-content-row:hover,.mp-content-row.selected { background:var(--panel2); }
.mp-content-row svg { color:var(--muted); }
.mp-content-row span { font-size:13px; font-weight:600; }
.mp-folder-spacer { flex:1; }
.mp-low-high { height:46px; display:flex; gap:2px; padding:6px 10px; }
.mp-low-high button { width:54px; border:1px solid var(--border); background:var(--panel2); color:var(--muted); cursor:pointer; font-size:10px; }
.mp-low-high .active { color:var(--text); border-color:var(--route); }

.mp-content { flex:1; min-width:0; min-height:0; position:relative; overflow:hidden; }

.mp-map { position:absolute; inset:0; overflow:hidden; background:#e3e8e8; color:var(--text); }
.mp-map.dark { background:linear-gradient(180deg,#182025,#1f292d); }
.mp-map.light { background:linear-gradient(180deg,#f0f3f2,#dce4e4); }
.mp-map::after { content:""; position:absolute; inset:0; background-image:linear-gradient(rgba(70,90,95,.13) 1px,transparent 1px),linear-gradient(90deg,rgba(70,90,95,.13) 1px,transparent 1px); background-size:75px 75px; pointer-events:none; }
.mp-map.dark::after { background-image:linear-gradient(rgba(190,215,215,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(190,215,215,.045) 1px,transparent 1px); }
.mp-map-land { position:absolute; border:1px solid rgba(90,135,105,.22); background:rgba(120,145,132,.035); }
.land-a { width:46%; height:34%; left:-8%; top:8%; border-radius:50%; transform:rotate(-8deg); }
.land-b { width:52%; height:45%; left:35%; top:-9%; border-radius:46% 54% 38% 62%; transform:rotate(14deg); }
.land-c { width:41%; height:46%; right:-6%; bottom:-8%; border-radius:50%; transform:rotate(-16deg); }
.mp-map-water { position:absolute; background:rgba(55,110,145,.16); }
.water-a { width:16%; height:62%; left:43%; top:25%; border-radius:50%; transform:rotate(9deg); }
.water-b { width:10%; height:35%; right:11%; bottom:18%; border-radius:50%; }
.mp-map-svg { position:absolute; inset:0; width:100%; height:100%; }
.airspace { fill:none; stroke:rgba(90,151,111,.45); stroke-width:1.5; stroke-dasharray:10 6; }
.route-shadow { fill:none; stroke:rgba(0,0,0,.35); stroke-width:8; stroke-linecap:round; stroke-linejoin:round; }
.route-main { fill:none; stroke:#2ca6e6; stroke-width:3.5; stroke-linecap:round; stroke-linejoin:round; }
.route-node { fill:var(--panel); stroke:#e8f0f3; stroke-width:2.2; }
.route-node.airport { fill:#3ca9e8; stroke:#fff; stroke-width:3; }
.mp-fir { position:absolute; color:rgba(92,151,111,.7); font-size:12px; line-height:1.45; letter-spacing:.3px; pointer-events:none; }
.mp-fir span { font-style:italic; }
.fir-1 { top:10%; left:44%; }
.fir-2 { top:16%; right:19%; }
.fir-3 { bottom:31%; left:18%; }
.fir-4 { bottom:15%; right:13%; }
.mp-city { position:absolute; color:var(--muted); font-size:11px; }
.city-a { top:27%; left:22%; }.city-b { top:42%; left:48%; }.city-c { top:56%; left:57%; }.city-d { top:70%; right:17%; }.city-e { bottom:17%; left:54%; }.city-f { bottom:23%; left:46%; }
.mp-airport-tag { position:absolute; display:flex; align-items:center; gap:8px; padding:6px 8px; background:color-mix(in srgb,var(--panel) 90%, transparent); border:1px solid var(--border); box-shadow:0 2px 5px rgba(0,0,0,.13); z-index:12; }
.mp-airport-tag svg { color:var(--route); flex:none; }
.mp-airport-tag strong { display:block; font-size:13px; }.mp-airport-tag span { display:block; color:var(--muted); font-size:9px; margin-top:2px; }
.departure-tag { left:15%; top:19%; }.arrival-tag { left:70%; bottom:15%; }
.mp-wpt { position:absolute; background:color-mix(in srgb,var(--panel) 88%, transparent); color:var(--text); border:1px solid rgba(63,150,202,.55); padding:4px 7px; font-size:10px; font-weight:700; box-shadow:0 1px 4px rgba(0,0,0,.12); }
.wpt-a { left:31%; top:29%; }.wpt-b { left:42%; top:39%; }.wpt-c { left:51%; top:49%; }.wpt-d { left:61%; top:59%; }.wpt-e { left:67%; top:68%; }.wpt-f { left:73%; top:76%; }
.mp-map-controls { position:absolute; top:16px; right:16px; display:flex; flex-direction:column; gap:6px; z-index:30; }
.mp-map-controls button { width:43px; height:43px; border:1px solid var(--border); background:color-mix(in srgb,var(--panel) 92%, transparent); color:var(--text); display:grid; place-items:center; cursor:pointer; box-shadow:0 1px 4px rgba(0,0,0,.14); }
.mp-map-scale { position:absolute; bottom:15px; right:22px; display:flex; align-items:flex-end; gap:7px; color:var(--text); font-size:10px; z-index:20; }
.mp-map-scale div { display:flex; width:105px; height:9px; border-bottom:3px solid var(--text); }.mp-map-scale i { flex:1; border-left:1px solid var(--text); }.mp-map-scale i:last-child { border-right:1px solid var(--text); }

.mp-bottom { height:78px; flex:0 0 78px; display:flex; align-items:stretch; background:var(--panel); border-top:1px solid var(--border); color:var(--text); z-index:90; }
.mp-bottom-back { width:62px; border:0; border-right:1px solid var(--border); background:transparent; color:var(--text); font-size:32px; cursor:pointer; }
.mp-bottom-location { width:78px; display:grid; place-items:center; color:var(--route); font-size:13px; font-weight:700; border-right:1px solid var(--border); }
.mp-bottom-items { flex:1; display:flex; align-items:stretch; justify-content:space-evenly; }
.mp-bottom-items button { min-width:70px; flex:1; max-width:125px; border:0; background:transparent; color:var(--muted); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:5px; cursor:pointer; font-size:10px; }
.mp-bottom-items button.active { color:var(--text); }.mp-bottom-items button.active svg { color:var(--route); }

.mp-chart-view,.mp-notes-view { position:absolute; inset:0; display:flex; overflow:hidden; background:var(--bg); }
.mp-chart-sidebar { width:285px; background:var(--panel); border-right:1px solid var(--border); padding:12px 0; display:flex; flex-direction:column; }
.mp-chart-airport { padding:3px 14px 12px; border-bottom:1px solid var(--border); }.small-title { font-size:15px; font-weight:750; }.small-sub { color:var(--muted); font-size:9px; margin-top:2px; }
.mp-filter-row { display:grid; grid-template-columns:1fr 1fr; gap:4px; padding:11px 12px 4px; }.mp-filter-row.second { padding-top:4px; }
.mp-filter-row button,.show-filters { height:33px; border:1px solid var(--border); background:var(--panel2); color:var(--muted); font-size:9px; cursor:pointer; }.mp-filter-row button.active { color:var(--text); border-color:var(--route); }
.show-filters { margin:5px 12px 13px; width:calc(100% - 24px); }
.chart-side-title { padding:8px 14px; color:var(--muted); font-size:10px; font-weight:700; text-transform:uppercase; border-top:1px solid var(--border); }.chart-side-title.ground { border-top:0; padding-top:14px; }
.chart-side-item { height:46px; border:0; border-bottom:1px solid var(--border); background:transparent; color:var(--text); display:flex; align-items:center; justify-content:space-between; padding:0 14px; font-size:10px; cursor:pointer; text-align:left; }.chart-side-item.selected { background:rgba(58,166,224,.12); border-left:3px solid var(--route); padding-left:11px; }
.chart-bookmark { color:var(--route); }
.mp-chart-main { flex:1; padding:24px; min-width:0; }.mp-chart-paper { position:relative; height:100%; border:1px solid #727d77; background:#ecefea; overflow:hidden; color:#213229; }
.chart-heading { position:absolute; top:18px; left:20px; font-weight:800; font-size:15px; }.chart-edition { position:absolute; top:39px; left:20px; font-size:8px; }
.runway-diagonal,.runway-horizontal { position:absolute; background:#515954; color:#fff; display:flex; align-items:center; justify-content:center; font-size:9px; font-weight:700; }.runway-diagonal { height:31px; width:69%; left:16%; }.r1 { top:35%; transform:rotate(-12deg); }.r2 { top:58%; transform:rotate(8deg); }.runway-horizontal { width:53%; height:22px; top:75%; left:27%; }
.stand-box { position:absolute; width:25px; height:19px; border:1px solid #3b5746; background:#b7c5b9; display:grid; place-items:center; font-size:6px; }.chart-note { position:absolute; color:#48634f; font-size:8px; font-weight:700; }.n-a { right:7%; top:26%; }.n-b { left:30%; top:31%; }.n-c { left:42%; top:67%; }.n-d { right:20%; bottom:15%; }.chart-north { position:absolute; right:20px; top:20px; font-size:14px; font-weight:800; }.chart-footer { position:absolute; left:15px; bottom:10px; font-size:7px; color:#6b756e; }

.mp-notes-sidebar { width:285px; border-right:1px solid var(--border); background:var(--panel); }.notes-top { height:50px; display:flex; align-items:center; gap:25px; padding:0 10px; border-bottom:1px solid var(--border); font-size:12px; }.back-link { border:0; background:transparent; color:var(--text); cursor:pointer; font-size:11px; }.note-entry { min-height:59px; border-bottom:1px solid var(--border); display:flex; gap:10px; align-items:flex-start; padding:12px 12px; }.note-pin { color:var(--muted); font-size:10px; margin-top:2px; }.note-entry strong { display:block; font-size:11px; }.note-entry small { display:block; color:var(--muted); font-size:9px; margin-top:4px; }
.note-popup { position:absolute; left:380px; top:145px; width:290px; background:#fff; color:#16232b; border-radius:8px; overflow:hidden; box-shadow:0 12px 35px rgba(0,0,0,.25); z-index:50; }.note-popup .popup-title { background:#1027a1; color:#fff; padding:10px 18px; font-weight:700; font-size:12px; }.note-popup .popup-body { padding:18px; font-size:11px; min-height:105px; }.note-popup button { width:100%; height:39px; border:0; background:#1027a1; color:#fff; font-weight:700; }

@media (max-width: 1100px) { .mp-folder { width:320px; min-width:320px; } .mp-bottom-items button { min-width:50px; } }
@media (max-width: 780px) { .mp-folder { position:absolute; left:0; top:0; bottom:0; width:305px; min-width:305px; box-shadow:9px 0 25px rgba(0,0,0,.25); } .mp-bottom-location { width:58px; }.mp-bottom-items button:nth-child(n+7) { display:none; } }
`;
