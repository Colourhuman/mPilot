import React, { useState } from "react";
import {
  Menu,
  Plus,
  Search,
  Settings,
  HelpCircle,
  Moon,
  Sun,
  ChevronRight,
  ChevronDown,
  FileText,
  Map,
  Route,
  BookOpen,
  StickyNote,
  Plane,
  Cloud,
  Layers,
  Crosshair,
  Maximize2,
  Minus,
  Navigation,
  MoreHorizontal,
  X,
  Clock3,
} from "lucide-react";

const C = {
  bg: "#e8ecef",
  panel: "#f7f8f9",
  panel2: "#edf0f2",
  border: "#cbd1d5",
  borderDark: "#aeb6bc",
  text: "#20272c",
  muted: "#68737b",
  blue: "#087fbd",
  blue2: "#dceef8",
  green: "#3e9861",
  map: "#dfe5e8",
};

function App() {
  const [dark, setDark] = useState(false);
  const [active, setActive] = useState("folder");
  const [folderOpen, setFolderOpen] = useState(true);
  const [selectedAirport, setSelectedAirport] = useState(null);
  const [flight, setFlight] = useState({
    departure: "",
    destination: "",
    alternate: "",
  });

  const [airportInput, setAirportInput] = useState("");

  const theme = dark
    ? {
        bg: "#20262a",
        panel: "#282f34",
        panel2: "#30383e",
        border: "#444d54",
        borderDark: "#59636a",
        text: "#edf1f3",
        muted: "#9ca7ae",
        blue: "#42a9df",
        blue2: "#183e52",
        map: "#252c31",
      }
    : C;

  const openAirport = (type) => {
    setSelectedAirport(type);
    setAirportInput(flight[type]);
  };

  const saveAirport = () => {
    if (!airportInput.trim()) return;

    setFlight((old) => ({
      ...old,
      [selectedAirport]: airportInput.trim().toUpperCase(),
    }));

    setSelectedAirport(null);
    setAirportInput("");
  };

  const airportName = {
    departure: "Departure",
    destination: "Destination",
    alternate: "Alternate",
  };

  const css = `
    * {
      box-sizing: border-box;
    }

    html, body, #root {
      margin: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    body {
      font-family:
        Inter,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        sans-serif;
      background: ${theme.bg};
      color: ${theme.text};
    }

    button {
      font-family: inherit;
    }

    .mpilot {
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      background: ${theme.bg};
      color: ${theme.text};
      overflow: hidden;
    }

    /* TOP BAR */

    .topbar {
      height: 54px;
      min-height: 54px;
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      padding: 0 15px;
      background: ${theme.panel};
      border-bottom: 1px solid ${theme.border};
      z-index: 100;
    }

    .top-left,
    .top-center,
    .top-right {
      display: flex;
      align-items: center;
    }

    .top-left {
      gap: 14px;
    }

    .top-center {
      gap: 7px;
      font-size: 12px;
      font-weight: 600;
    }

    .top-right {
      justify-content: flex-end;
      gap: 12px;
    }

    .top-icon {
      border: 0;
      background: transparent;
      color: ${theme.text};
      width: 34px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 4px;
    }

    .top-icon:hover {
      background: ${theme.panel2};
    }

    .cycle {
      font-size: 10px;
      color: ${theme.muted};
      border-right: 1px solid ${theme.border};
      padding-right: 15px;
    }

    .flight-status {
      font-size: 11px;
      color: ${theme.muted};
    }

    .profile {
      font-size: 10px;
      color: ${theme.muted};
    }

    .online {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: ${theme.green};
    }

    /* MAIN */

    .workspace {
      flex: 1;
      min-height: 0;
      display: grid;
      grid-template-columns: 310px minmax(0, 1fr);
    }

    /* FLIGHT FOLDER */

    .sidebar {
      min-width: 0;
      display: flex;
      flex-direction: column;
      background: ${theme.panel};
      border-right: 1px solid ${theme.border};
      z-index: 20;
    }

    .sidebar-title {
      height: 48px;
      min-height: 48px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      border-bottom: 1px solid ${theme.border};
      font-size: 13px;
      font-weight: 650;
    }

    .sidebar-title-left {
      display: flex;
      align-items: center;
      gap: 9px;
    }

    .new-flight {
      margin: 14px 14px 11px;
      height: 39px;
      border: 1px solid ${theme.blue};
      background: ${theme.blue};
      color: white;
      border-radius: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 11px;
      font-weight: 650;
      cursor: pointer;
    }

    .new-flight:hover {
      filter: brightness(1.06);
    }

    .folder-label {
      height: 31px;
      padding: 0 15px;
      display: flex;
      align-items: center;
      color: ${theme.muted};
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .08em;
    }

    .folder-row {
      min-height: 57px;
      display: grid;
      grid-template-columns: 27px minmax(0, 1fr) 18px;
      align-items: center;
      gap: 7px;
      padding: 7px 15px;
      border-bottom: 1px solid ${theme.border};
      background: transparent;
      color: ${theme.text};
      cursor: pointer;
      text-align: left;
    }

    .folder-row:hover {
      background: ${theme.panel2};
    }

    .folder-row svg:first-child {
      color: ${theme.muted};
    }

    .row-content {
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .row-title {
      font-size: 11px;
      font-weight: 650;
    }

    .row-value {
      color: ${theme.muted};
      font-size: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .folder-divider {
      height: 9px;
      background: ${theme.panel2};
      border-bottom: 1px solid ${theme.border};
    }

    .simple-row {
      min-height: 49px;
      display: grid;
      grid-template-columns: 27px 1fr 18px;
      align-items: center;
      padding: 0 15px;
      gap: 7px;
      border-bottom: 1px solid ${theme.border};
      background: transparent;
      color: ${theme.text};
      cursor: pointer;
      text-align: left;
    }

    .simple-row:hover {
      background: ${theme.panel2};
    }

    .simple-row span {
      font-size: 11px;
      font-weight: 600;
    }

    .sidebar-bottom {
      margin-top: auto;
      border-top: 1px solid ${theme.border};
    }

    .validity {
      height: 42px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 15px;
      font-size: 9px;
      color: ${theme.muted};
    }

    .valid {
      color: ${theme.green};
      font-weight: 650;
    }

    /* MAP */

    .map {
      min-width: 0;
      min-height: 0;
      position: relative;
      overflow: hidden;
      background: ${theme.map};
    }

    .map-background {
      position: absolute;
      inset: 0;
      overflow: hidden;
      background:
        radial-gradient(
          ellipse at 25% 20%,
          rgba(255,255,255,.55),
          transparent 35%
        ),
        radial-gradient(
          ellipse at 75% 75%,
          rgba(255,255,255,.45),
          transparent 35%
        ),
        ${theme.map};
    }

    .dark-map {
      background:
        radial-gradient(
          ellipse at 25% 20%,
          rgba(255,255,255,.035),
          transparent 35%
        ),
        radial-gradient(
          ellipse at 75% 75%,
          rgba(255,255,255,.025),
          transparent 35%
        ),
        ${theme.map};
    }

    /* decorative geographical shapes */

    .land {
      position: absolute;
      opacity: .38;
      filter: blur(.2px);
    }

    .land-1 {
      width: 520px;
      height: 350px;
      left: 6%;
      top: 7%;
      border-radius: 48% 52% 41% 59%;
      background: rgba(255,255,255,.33);
      transform: rotate(-11deg);
    }

    .land-2 {
      width: 400px;
      height: 280px;
      right: 5%;
      bottom: 8%;
      border-radius: 52% 48% 61% 39%;
      background: rgba(255,255,255,.25);
      transform: rotate(17deg);
    }

    .grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(
          rgba(75,88,96,.15) 1px,
          transparent 1px
        ),
        linear-gradient(
          90deg,
          rgba(75,88,96,.15) 1px,
          transparent 1px
        );
      background-size: 95px 95px;
      pointer-events: none;
    }

    .dark-map .grid {
      background-image:
        linear-gradient(
          rgba(220,230,235,.07) 1px,
          transparent 1px
        ),
        linear-gradient(
          90deg,
          rgba(220,230,235,.07) 1px,
          transparent 1px
        );
    }

    .coordinate {
      position: absolute;
      color: ${theme.muted};
      opacity: .6;
      font-size: 8px;
      font-family: monospace;
    }

    .coord-1 { left: 12%; top: 19%; }
    .coord-2 { left: 47%; top: 22%; }
    .coord-3 { left: 75%; top: 17%; }
    .coord-4 { left: 20%; top: 65%; }
    .coord-5 { left: 60%; top: 71%; }

    .city {
      position: absolute;
      color: ${theme.text};
      opacity: .65;
      font-size: 9px;
      font-weight: 650;
      letter-spacing: .04em;
    }

    .city-1 { left: 18%; top: 28%; }
    .city-2 { left: 42%; top: 48%; }
    .city-3 { left: 70%; top: 29%; }
    .city-4 { left: 76%; top: 60%; }

    /* ROUTE */

    .route {
      position: absolute;
      left: 22%;
      top: 35%;
      width: 56%;
      height: 32%;
      pointer-events: none;
    }

    .route-segment {
      position: absolute;
      height: 2px;
      background: ${theme.text};
      transform-origin: left center;
      box-shadow: 0 0 1px rgba(0,0,0,.5);
    }

    .segment-a {
      width: 35%;
      left: 0;
      top: 25%;
      transform: rotate(18deg);
    }

    .segment-b {
      width: 37%;
      left: 32%;
      top: 47%;
      transform: rotate(26deg);
    }

    .segment-c {
      width: 32%;
      left: 67%;
      top: 72%;
      transform: rotate(12deg);
    }

    .route-point {
      position: absolute;
      width: 8px;
      height: 8px;
      border: 2px solid ${theme.text};
      background: ${theme.panel};
      transform: translate(-50%, -50%);
    }

    .point-a { left: 0; top: 25%; }
    .point-b { left: 32%; top: 47%; }
    .point-c { left: 67%; top: 72%; }
    .point-d { left: 99%; top: 78%; }

    .route-label {
      position: absolute;
      transform: translate(-50%, -50%);
      font-size: 8px;
      font-weight: 700;
      color: ${theme.text};
      background: rgba(235,240,242,.7);
      padding: 2px 3px;
    }

    .dark-map .route-label {
      background: rgba(30,36,40,.72);
    }

    .route-label-a { left: 0; top: 17%; }
    .route-label-b { left: 32%; top: 39%; }
    .route-label-c { left: 67%; top: 64%; }
    .route-label-d { left: 99%; top: 70%; }

    /* AIRPORT MARKERS */

    .airport {
      position: absolute;
      z-index: 12;
      transform: translate(-50%, -50%);
    }

    .airport-symbol {
      width: 22px;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 11px;
      font-weight: 800;
      background: ${theme.blue};
      clip-path: polygon(
        50% 0%,
        61% 35%,
        100% 43%,
        100% 58%,
        61% 55%,
        57% 100%,
        43% 100%,
        39% 55%,
        0% 58%,
        0% 43%,
        39% 35%
      );
    }

    .airport-code {
      position: absolute;
      left: 27px;
      top: 4px;
      font-size: 10px;
      font-weight: 750;
      white-space: nowrap;
      color: ${theme.text};
    }

    .departure-marker {
      left: 20%;
      top: 31%;
    }

    .destination-marker {
      left: 80%;
      top: 72%;
    }

    /* MAP CONTROLS */

    .map-tools {
      position: absolute;
      right: 15px;
      top: 15px;
      z-index: 30;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .map-tool {
      width: 36px;
      height: 36px;
      border: 1px solid ${theme.border};
      background: ${theme.panel};
      color: ${theme.text};
      border-radius: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 1px 3px rgba(0,0,0,.12);
    }

    .map-tool:hover {
      background: ${theme.panel2};
    }

    .map-info {
      position: absolute;
      left: 15px;
      top: 15px;
      z-index: 30;
      background: ${theme.panel};
      border: 1px solid ${theme.border};
      padding: 9px 11px;
      min-width: 160px;
      box-shadow: 0 2px 5px rgba(0,0,0,.1);
    }

    .map-info-title {
      font-size: 10px;
      font-weight: 700;
    }

    .map-info-sub {
      color: ${theme.muted};
      font-size: 9px;
      margin-top: 3px;
    }

    /* BOTTOM MAP BAR */

    .map-bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 50px;
      background: ${theme.panel};
      border-top: 1px solid ${theme.border};
      z-index: 40;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 13px;
    }

    .level-control {
      display: flex;
      gap: 3px;
    }

    .level {
      height: 29px;
      min-width: 52px;
      border: 1px solid transparent;
      background: transparent;
      color: ${theme.muted};
      font-size: 9px;
      font-weight: 750;
      cursor: pointer;
    }

    .level.active {
      color: ${theme.blue};
      border-color: ${theme.blue};
      background: ${theme.blue2};
    }

    .bottom-actions {
      display: flex;
      gap: 5px;
    }

    .bottom-action {
      width: 34px;
      height: 31px;
      border: 1px solid transparent;
      background: transparent;
      color: ${theme.muted};
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .bottom-action.active {
      color: ${theme.blue};
      border-color: ${theme.blue};
      background: ${theme.blue2};
    }

    /* FOOTER */

    .footer {
      height: 30px;
      min-height: 30px;
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      padding: 0 14px;
      background: ${theme.panel};
      border-top: 1px solid ${theme.border};
      color: ${theme.muted};
      font-size: 9px;
    }

    .footer-left,
    .footer-right {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .footer-right {
      justify-content: flex-end;
    }

    .ready {
      color: ${theme.green};
    }

    /* MODAL */

    .overlay {
      position: fixed;
      inset: 0;
      z-index: 500;
      background: rgba(0,0,0,.32);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .dialog {
      width: min(400px, calc(100vw - 30px));
      background: ${theme.panel};
      border: 1px solid ${theme.border};
      box-shadow: 0 10px 35px rgba(0,0,0,.2);
    }

    .dialog-head {
      height: 47px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 15px;
      border-bottom: 1px solid ${theme.border};
    }

    .dialog-head strong {
      font-size: 12px;
    }

    .dialog-body {
      padding: 18px;
    }

    .dialog-label {
      display: block;
      color: ${theme.muted};
      font-size: 9px;
      font-weight: 700;
      margin-bottom: 7px;
      text-transform: uppercase;
    }

    .airport-input {
      width: 100%;
      height: 39px;
      border: 1px solid ${theme.borderDark};
      background: ${theme.bg};
      color: ${theme.text};
      outline: none;
      padding: 0 11px;
      font-size: 12px;
      font-weight: 650;
      text-transform: uppercase;
    }

    .airport-input:focus {
      border-color: ${theme.blue};
    }

    .dialog-button {
      margin-top: 13px;
      width: 100%;
      height: 39px;
      border: 0;
      background: ${theme.blue};
      color: white;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
    }

    /* TABLET */

    @media (max-width: 850px) {
      .workspace {
        grid-template-columns: 270px minmax(0, 1fr);
      }

      .flight-status,
      .profile {
        display: none;
      }

      .cycle {
        border: 0;
      }
    }

    @media (max-width: 650px) {
      .workspace {
        grid-template-columns: 1fr;
      }

      .sidebar {
        display: none;
      }

      .topbar {
        grid-template-columns: auto 1fr auto;
      }

      .top-center {
        justify-content: center;
      }
    }
  `;

  return (
    <>
      <style>{css}</style>

      <div className="mpilot">
        {/* TOP BAR */}
        <header className="topbar">
          <div className="top-left">
            <button className="top-icon">
              <Menu size={20} />
            </button>

            <span className="cycle">AIRAC 1807</span>

            <span className="flight-status">
              {flight.departure && flight.destination
                ? `${flight.departure} → ${flight.destination}`
                : "No flight loaded"}
            </span>
          </div>

          <div className="top-center">
            <Clock3 size={15} />
            <span>00:00 UTC</span>
          </div>

          <div className="top-right">
            <button className="top-icon">
              <HelpCircle size={18} />
            </button>

            <button
              className="top-icon"
              onClick={() => setDark(!dark)}
              title="Day / Night"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <span className="profile">DEFAULT</span>
            <span className="online" />
          </div>
        </header>

        {/* WORKSPACE */}
        <div className="workspace">
          {/* FLIGHT FOLDER */}
          <aside className="sidebar">
            <div className="sidebar-title">
              <div className="sidebar-title-left">
                <BookOpen size={16} />
                <span>Flight Folder</span>
              </div>

              <button className="top-icon">
                <MoreHorizontal size={18} />
              </button>
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
              <Plus size={16} />
              NEW FLIGHT
            </button>

            <div className="folder-label">
              Flight Data
            </div>

            {/* Departure */}
            <button
              className="folder-row"
              onClick={() => openAirport("departure")}
            >
              <MapPinIcon />

              <div className="row-content">
                <span className="row-title">Departure</span>
                <span className="row-value">
                  {flight.departure || "Add Departure"}
                </span>
              </div>

              <ChevronRight size={15} />
            </button>

            {/* Destination */}
            <button
              className="folder-row"
              onClick={() => openAirport("destination")}
            >
              <MapPinIcon />

              <div className="row-content">
                <span className="row-title">Destination</span>
                <span className="row-value">
                  {flight.destination || "Add Destination"}
                </span>
              </div>

              <ChevronRight size={15} />
            </button>

            {/* Alternate */}
            <button
              className="folder-row"
              onClick={() => openAirport("alternate")}
            >
              <MapPinIcon />

              <div className="row-content">
                <span className="row-title">Alternate</span>
                <span className="row-value">
                  {flight.alternate || "Add Alternate"}
                </span>
              </div>

              <ChevronRight size={15} />
            </button>

            <div className="folder-divider" />

            <div className="folder-label">
              Flight Content
            </div>

            <button
              className="simple-row"
              onClick={() => setActive("documents")}
            >
              <FileText size={16} />
              <span>Documents</span>
              <ChevronRight size={15} />
            </button>

            <button
              className="simple-row"
              onClick={() => setActive("route")}
            >
              <Route size={16} />
              <span>Route</span>
              <ChevronRight size={15} />
            </button>

            <button
              className="simple-row"
              onClick={() => setActive("notes")}
            >
              <StickyNote size={16} />
              <span>Route Notes</span>
              <ChevronRight size={15} />
            </button>

            <div className="folder-divider" />

            <button
              className="simple-row"
              onClick={() => setActive("weather")}
            >
              <Cloud size={16} />
              <span>Weather</span>
              <ChevronRight size={15} />
            </button>

            <button
              className="simple-row"
              onClick={() => setActive("map")}
            >
              <Layers size={16} />
              <span>Map Layers</span>
              <ChevronRight size={15} />
            </button>

            <div className="sidebar-bottom">
              <div className="validity">
                <span>Database</span>
                <span className="valid">UP TO DATE</span>
              </div>
            </div>
          </aside>

          {/* MAP */}
          <section className="map">
            <div className={`map-background ${dark ? "dark-map" : ""}`}>
              <div className="land land-1" />
              <div className="land land-2" />

              <div className="grid" />

              <span className="coordinate coord-1">
                52°N 004°E
              </span>
              <span className="coordinate coord-2">
                51°N 010°E
              </span>
              <span className="coordinate coord-3">
                52°N 016°E
              </span>
              <span className="coordinate coord-4">
                48°N 006°E
              </span>
              <span className="coordinate coord-5">
                47°N 013°E
              </span>

              <span className="city city-1">AMSTERDAM</span>
              <span className="city city-2">FRANKFURT</span>
              <span className="city city-3">BERLIN</span>
              <span className="city city-4">MUNICH</span>

              {/* Route */}
              <div className="route">
                <span className="route-segment segment-a" />
                <span className="route-segment segment-b" />
                <span className="route-segment segment-c" />

                <span className="route-point point-a" />
                <span className="route-point point-b" />
                <span className="route-point point-c" />
                <span className="route-point point-d" />

                <span className="route-label route-label-a">
                  {flight.departure || "EDDL"}
                </span>

                <span className="route-label route-label-b">
                  DODEN
                </span>

                <span className="route-label route-label-c">
                  RUDNO
                </span>

                <span className="route-label route-label-d">
                  {flight.destination || "LEPA"}
                </span>
              </div>

              {/* Airport markers */}
              <div className="airport departure-marker">
                <div className="airport-symbol">
                  <Plane size={14} />
                </div>
                <span className="airport-code">
                  {flight.departure || "EDDL"}
                </span>
              </div>

              <div className="airport destination-marker">
                <div className="airport-symbol">
                  <Plane size={14} />
                </div>
                <span className="airport-code">
                  {flight.destination || "LEPA"}
                </span>
              </div>
            </div>

            {/* MAP INFO */}
            <div className="map-info">
              <div className="map-info-title">
                mPilot Navigation
              </div>
              <div className="map-info-sub">
                {flight.departure && flight.destination
                  ? `${flight.departure} — ${flight.destination}`
                  : "No flight selected"}
              </div>
            </div>

            {/* MAP TOOLS */}
            <div className="map-tools">
              <button className="map-tool">
                <Search size={17} />
              </button>

              <button className="map-tool">
                <Crosshair size={17} />
              </button>

              <button className="map-tool">
                <Plus size={17} />
              </button>

              <button className="map-tool">
                <Minus size={17} />
              </button>

              <button className="map-tool">
                <Maximize2 size={17} />
              </button>

              <button className="map-tool">
                <Settings size={17} />
              </button>
            </div>

            {/* MAP BOTTOM */}
            <div className="map-bottom">
              <div className="level-control">
                <button className="level active">
                  LOW
                </button>

                <button className="level">
                  HIGH
                </button>
              </div>

              <div className="bottom-actions">
                <button className="bottom-action active">
                  <Map size={17} />
                </button>

                <button className="bottom-action">
                  <Route size={17} />
                </button>

                <button className="bottom-action">
                  <Cloud size={17} />
                </button>

                <button className="bottom-action">
                  <Layers size={17} />
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-left">
            <span className="ready">●</span>
            <span>Ready</span>
          </div>

          <span>
            {flight.departure && flight.destination
              ? `${flight.departure} → ${flight.destination}`
              : "No flight loaded"}
          </span>

          <div className="footer-right">
            <span>mPilot</span>
          </div>
        </footer>

        {/* AIRPORT DIALOG */}
        {selectedAirport && (
          <div className="overlay">
            <div className="dialog">
              <div className="dialog-head">
                <strong>
                  Add {airportName[selectedAirport]}
                </strong>

                <button
                  className="top-icon"
                  onClick={() => setSelectedAirport(null)}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="dialog-body">
                <label className="dialog-label">
                  ICAO Airport Code
                </label>

                <input
                  className="airport-input"
                  value={airportInput}
                  onChange={(e) =>
                    setAirportInput(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveAirport();
                  }}
                  placeholder="EDDL"
                  maxLength={4}
                  autoFocus
                />

                <button
                  className="dialog-button"
                  onClick={saveAirport}
                >
                  ADD {airportName[selectedAirport].toUpperCase()}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function MapPinIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export default App;
