import { useState } from "react";
import {
  Menu,
  Plus,
  ChevronRight,
  FileText,
  MapPin,
  Settings,
  Search,
  HelpCircle,
  Sun,
  Moon,
  CheckCircle2,
  MoreHorizontal,
  Clock3,
  Plane,
  X,
} from "lucide-react";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activePanel, setActivePanel] = useState(null);

  const [flight, setFlight] = useState({
    departure: "",
    destination: "",
    alternate: "",
  });

  const [tempAirport, setTempAirport] = useState("");

  const openAirportPanel = (type) => {
    setTempAirport(flight[type]);
    setActivePanel(type);
  };

  const saveAirport = () => {
    if (!tempAirport.trim()) return;

    setFlight((current) => ({
      ...current,
      [activePanel]: tempAirport.trim().toUpperCase(),
    }));

    setActivePanel(null);
    setTempAirport("");
  };

  const airportTitle = {
    departure: "Add Departure",
    destination: "Add Destination",
    alternate: "Add Alternate",
  };

  const airportLabel = {
    departure: "Departure",
    destination: "Destination",
    alternate: "Alternate",
  };

  return (
    <div className={`mpilot-app ${darkMode ? "dark" : "light"}`}>
      {/* TOP BAR */}
      <header className="topbar">
        <div className="topbar-left">
          <button className="icon-button">
            <Menu size={22} />
          </button>

          <span className="cycle">Cycle 1807</span>

          <span className="flight-status">
            {flight.departure && flight.destination
              ? `${flight.departure} → ${flight.destination}`
              : "Route not saved"}
          </span>
        </div>

        <div className="topbar-center">
          <Clock3 size={17} />
          <span>00:00</span>
        </div>

        <div className="topbar-right">
          <button className="icon-button">
            <HelpCircle size={19} />
          </button>

          <button
            className="icon-button"
            onClick={() => setDarkMode(!darkMode)}
            title="Day / Night"
          >
            {darkMode ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          <span className="default-label">default</span>
          <span className="status-dot" />
        </div>
      </header>

      {/* MAIN AREA */}
      <main className="main-layout">
        {/* LEFT FLIGHT FOLDER */}
        <aside className="flight-folder">
          <div className="folder-header">
            <span>Flight Folder</span>
            <MoreHorizontal size={19} />
          </div>

          <button
            className="new-flight"
            onClick={() =>
              setFlight({
                departure: "",
                destination: "",
                alternate: "",
              })
            }
          >
            <Plus size={19} />
            <span>New Flight</span>
          </button>

          <div className="folder-section">
            {/* DEPARTURE */}
            <button
              className="folder-item"
              onClick={() => openAirportPanel("departure")}
            >
              <MapPin size={18} />

              <div>
                <strong>Departure</strong>
                <small>
                  {flight.departure || "Add Departure"}
                </small>
              </div>

              <ChevronRight size={17} />
            </button>

            {/* DESTINATION */}
            <button
              className="folder-item"
              onClick={() => openAirportPanel("destination")}
            >
              <MapPin size={18} />

              <div>
                <strong>Destination</strong>
                <small>
                  {flight.destination || "Add Destination"}
                </small>
              </div>

              <ChevronRight size={17} />
            </button>

            {/* ALTERNATE */}
            <button
              className="folder-item"
              onClick={() => openAirportPanel("alternate")}
            >
              <MapPin size={18} />

              <div>
                <strong>Alternate</strong>
                <small>
                  {flight.alternate || "Add Alternate"}
                </small>
              </div>

              <ChevronRight size={17} />
            </button>
          </div>

          <div className="folder-divider" />

          <button
            className="folder-link"
            onClick={() => setActivePanel("documents")}
          >
            <FileText size={18} />
            <span>Documents</span>
            <ChevronRight size={17} />
          </button>

          <button
            className="folder-link"
            onClick={() => setActivePanel("routeNotes")}
          >
            <MapPin size={18} />
            <span>Route Notes</span>
            <ChevronRight size={17} />
          </button>

          <div className="folder-spacer" />

          <div className="folder-footer">
            <span>Validity</span>
            <strong>Up to date</strong>
          </div>
        </aside>

        {/* MAP AREA */}
        <section className="map-container">
          <div className="map-toolbar">
            <button>
              <Search size={17} />
            </button>

            <button>
              <Settings size={17} />
            </button>

            <button>
              <Plane size={17} />
            </button>
          </div>

          <div className="map-placeholder">
            <div className="map-grid" />

            <div className="map-label label-london">LONDON</div>
            <div className="map-label label-paris">PARIS</div>
            <div className="map-label label-berlin">BERLIN</div>
            <div className="map-label label-munich">MÜNCHEN</div>
            <div className="map-label label-zurich">ZÜRICH</div>

            <div className="map-route">
              <span className="route-line route-one" />
              <span className="route-line route-two" />
            </div>

            <div className="airport-marker departure">
              <span>{flight.departure || "EDDL"}</span>
            </div>

            <div className="airport-marker destination">
              <span>{flight.destination || "LEPA"}</span>
            </div>

            <div className="map-watermark">mPilot</div>
          </div>

          {/* BOTTOM MAP BAR */}
          <div className="map-bottom">
            <div className="map-level">
              <span className="active">LOW</span>
              <span>HIGH</span>
            </div>

            <div className="map-tools">
              <button>
                <FileText size={19} />
              </button>

              <button className="active">
                <MapPin size={19} />
              </button>

              <button>
                <Settings size={19} />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* STATUS BAR */}
      <footer className="statusbar">
        <div className="status-left">
          <CheckCircle2 size={17} />
          <span>Ready</span>
        </div>

        <div className="status-center">
          {flight.departure && flight.destination
            ? `${flight.departure} → ${flight.destination}`
            : "No flight loaded"}
        </div>

        <div className="status-right">
          <span>mPilot</span>
        </div>
      </footer>

      {/* AIRPORT INPUT PANEL */}
      {activePanel === "departure" ||
      activePanel === "destination" ||
      activePanel === "alternate" ? (
        <div className="modal-backdrop">
          <div className="airport-dialog">
            <div className="airport-dialog-header">
              <strong>{airportTitle[activePanel]}</strong>

              <button
                className="icon-button"
                onClick={() => setActivePanel(null)}
              >
                <X size={19} />
              </button>
            </div>

            <div className="airport-dialog-content">
              <label>{airportLabel[activePanel]} ICAO</label>

              <input
                autoFocus
                value={tempAirport}
                onChange={(event) => setTempAirport(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") saveAirport();
                }}
                placeholder="e.g. EDDL"
                maxLength={4}
              />

              <button
                className="airport-confirm"
                onClick={saveAirport}
              >
                Add Airport
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* DOCUMENTS / ROUTE NOTES PLACEHOLDER */}
      {activePanel === "documents" ||
      activePanel === "routeNotes" ? (
        <div className="modal-backdrop">
          <div className="airport-dialog">
            <div className="airport-dialog-header">
              <strong>
                {activePanel === "documents"
                  ? "Documents"
                  : "Route Notes"}
              </strong>

              <button
                className="icon-button"
                onClick={() => setActivePanel(null)}
              >
                <X size={19} />
              </button>
            </div>

            <div className="airport-dialog-content">
              <p
                style={{
                  margin: 0,
                  color: "var(--muted)",
                  fontSize: "13px",
                }}
              >
                This section will be built in the next step.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;