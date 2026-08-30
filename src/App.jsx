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
  FileText,
  Route,
  BookOpen,
  StickyNote,
  Cloud,
  Layers,
  Crosshair,
  Maximize2,
  Navigation,
  MoreHorizontal,
  X,
  Clock3,
  MapPinned,
  Plane,
  LocateFixed,
} from "lucide-react";

function App() {
  const [dark, setDark] = useState(true);
  const [selectedAirport, setSelectedAirport] = useState(null);
  const [airportInput, setAirportInput] = useState("");
  const [activeLevel, setActiveLevel] = useState("LOW");
  const [mapMode, setMapMode] = useState("route");

  const [flight, setFlight] = useState({
    departure: "EDDF",
    destination: "LEPA",
    alternate: "",
  });

  const theme = dark
    ? {
        bg: "#15191d",
        panel: "#20262b",
        panel2: "#272e34",
        border: "#394148",
        borderLight: "#4b555d",
        text: "#edf1f3",
        muted: "#8b969e",
        blue: "#39a9e1",
        blueDark: "#126f9d",
        green: "#54a96f",
        map: "#20272b",
        map2: "#263035",
        route: "#38a9e4",
      }
    : {
        bg: "#eef1f3",
        panel: "#f8f9fa",
        panel2: "#e7ebee",
        border: "#ccd2d6",
        borderLight: "#aeb8bf",
        text: "#20272c",
        muted: "#69757d",
        blue: "#087fbd",
        blueDark: "#086b9c",
        green: "#3e9861",
        map: "#dce3e6",
        map2: "#d4dde1",
        route: "#1389c7",
      };

  const openAirport = (type) => {
    setSelectedAirport(type);
    setAirportInput(flight[type] || "");
  };

  const saveAirport = () => {
    if (!airportInput.trim() || !selectedAirport) return;

    setFlight((current) => ({
      ...current,
      [selectedAirport]: airportInput.trim().toUpperCase(),
    }));

    setSelectedAirport(null);
    setAirportInput("");
  };

  const airportTitle = {
    departure: "Departure",
    destination: "Destination",
    alternate: "Alternate",
  };

  const css = `
    * {
      box-sizing: border-box;
    }

    html,
    body,
    #root {
      width: 100%;
      height: 100%;
      margin: 0;
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
      overflow: hidden;
      background: ${theme.bg};
      color: ${theme.text};
    }

    /* =========================
       TOP BAR
    ========================= */

    .topbar {
      height: 46px;
      min-height: 46px;
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      padding: 0 10px;
      background: ${theme.bg};
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
      gap: 12px;
    }

    .top-center {
      gap: 7px;
      font-size: 11px;
      font-weight: 700;
    }

    .top-right {
      justify-content: flex-end;
      gap: 10px;
    }

    .top-icon {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0;
      border-radius: 4px;
      background: transparent;
      color: ${theme.text};
      cursor: pointer;
    }

    .top-icon:hover {
      background: ${theme.panel2};
    }

    .cycle {
      padding-right: 12px;
      border-right: 1px solid ${theme.border};
      color: ${theme.muted};
      font-size: 10px;
      white-space: nowrap;
    }

    .flight-status {
      color: ${theme.muted};
      font-size: 10px;
      white-space: nowrap;
    }

    .profile {
      color: ${theme.muted};
      font-size: 9px;
      text-transform: lowercase;
    }

    .online {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: ${theme.green};
    }

    /* =========================
       MAIN
    ========================= */

    .workspace {
      flex: 1;
      min-height: 0;
      display: grid;
      grid-template-columns: 270px minmax(0, 1fr);
    }

    /* =========================
       SIDEBAR
    ========================= */

    .sidebar {
      min-width: 0;
      display: flex;
      flex-direction: column;
      background: ${theme.panel};
      border-right: 1px solid ${theme.border};
      z-index: 30;
    }

    .sidebar-header {
      height: 48px;
      min-height: 48px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 8px;
      border-bottom: 1px solid ${theme.border};
    }

    .sidebar-title {
      font-size: 13px;
      font-weight: 700;
    }

    .sidebar-menu {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0;
      background: transparent;
      color: ${theme.muted};
      cursor: pointer;
    }

    .new-flight {
      height: 40px;
      margin: 15px 8px 11px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      border: 0;
      border-radius: 3px;
      background: ${theme.blue};
      color: white;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
    }

    .new-flight:hover {
      filter: brightness(1.08);
    }

    .folder-row {
      min-height: 60px;
      display: grid;
      grid-template-columns: 24px minmax(0, 1fr) 18px;
      align-items: center;
      gap: 7px;
      padding: 7px 10px;
      border-top: 1px solid ${theme.border};
      background: transparent;
      color: ${theme.text};
      text-align: left;
      cursor: pointer;
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
      font-weight: 700;
    }

    .row-value {
      color: ${theme.muted};
      font-size: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .simple-row {
      min-height: 52px;
      display: grid;
      grid-template-columns: 24px minmax(0, 1fr) 18px;
      align-items: center;
      gap: 7px;
      padding: 0 10px;
      border-top: 1px solid ${theme.border};
      background: transparent;
      color: ${theme.text};
      text-align: left;
      cursor: pointer;
    }

    .simple-row:hover {
      background: ${theme.panel2};
    }

    .simple-row span {
      font-size: 11px;
      font-weight: 650;
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
      padding: 0 9px;
      color: ${theme.muted};
      font-size: 9px;
    }

    .valid {
      color: ${theme.green};
      font-weight: 700;
    }

    .ready {
      height: 30px;
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 0 9px;
      border-top: 1px solid ${theme.border};
      color: ${theme.green};
      font-size: 9px;
    }

    /* =========================
       MAP
    ========================= */

    .map {
      position: relative;
      min-width: 0;
      min-height: 0;
      overflow: hidden;
      background: ${theme.map};
    }

    .map-background {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(
          ellipse at 25% 20%,
          rgba(80, 110, 120, .17),
          transparent 36%
        ),
        radial-gradient(
          ellipse at 75% 75%,
          rgba(70, 100, 110, .13),
          transparent 38%
        ),
        ${theme.map};
    }

    /* grid */

    .map-grid {
      position: absolute;
      inset: 0;
      opacity: ${dark ? ".48" : ".65"};
      background-image:
        linear-gradient(
          rgba(125, 145, 153, .16) 1px,
          transparent 1px
        ),
        linear-gradient(
          90deg,
          rgba(125, 145, 153, .16) 1px,
          transparent 1px
        );
      background-size: 86px 86px;
      pointer-events: none;
    }

    /* simplified chart geography */

    .region {
      position: absolute;
      border: 1px solid rgba(106, 144, 127, .42);
      background: rgba(100, 130, 120, .025);
      pointer-events: none;
    }

    .region-1 {
      width: 35%;
      height: 48%;
      left: -4%;
      top: 8%;
      border-radius: 50% 35% 60% 30%;
      transform: rotate(-8deg);
    }

    .region-2 {
      width: 32%;
      height: 55%;
      left: 25%;
      top: -13%;
      border-radius: 30% 60% 40% 55%;
      transform: rotate(13deg);
    }

    .region-3 {
      width: 35%;
      height: 50%;
      right: -8%;
      top: 20%;
      border-radius: 60% 30% 50% 35%;
      transform: rotate(-12deg);
    }

    .region-4 {
      width: 38%;
      height: 45%;
      right: 12%;
      bottom: -16%;
      border-radius: 40% 60% 35% 55%;
      transform: rotate(11deg);
    }

    /* chart boundaries */

    .fir-line {
      position: absolute;
      height: 1px;
      background: rgba(90, 135, 105, .48);
      transform-origin: left center;
      pointer-events: none;
    }

    .fir-1 {
      width: 45%;
      left: 8%;
      top: 29%;
      transform: rotate(8deg);
    }

    .fir-2 {
      width: 50%;
      left: 35%;
      top: 62%;
      transform: rotate(-13deg);
    }

    .fir-3 {
      width: 42%;
      left: 52%;
      top: 25%;
      transform: rotate(22deg);
    }

    .fir-label {
      position: absolute;
      color: rgba(85, 120, 100, .68);
      font-size: 8px;
      letter-spacing: .04em;
      text-transform: uppercase;
      pointer-events: none;
    }

    .fir-label-1 {
      left: 19%;
      top: 31%;
    }

    .fir-label-2 {
      left: 54%;
      top: 60%;
    }

    .fir-label-3 {
      right: 15%;
      top: 29%;
    }

    /* cities */

    .city {
      position: absolute;
      color: ${theme.muted};
      opacity: .72;
      font-size: 9px;
      font-weight: 650;
      letter-spacing: .04em;
      pointer-events: none;
    }

    .city-1 {
      left: 22%;
      top: 28%;
    }

    .city-2 {
      left: 48%;
      top: 45%;
    }

    .city-3 {
      right: 22%;
      top: 31%;
    }

    .city-4 {
      right: 18%;
      bottom: 29%;
    }

    /* =========================
       ROUTE
    ========================= */

    .route-layer {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 8;
    }

    .route-line {
      position: absolute;
      height: 3px;
      background: ${theme.route};
      transform-origin: left center;
      box-shadow: 0 0 4px rgba(20, 145, 205, .3);
    }

    .route-a {
      width: 38%;
      left: 20%;
      top: 31%;
      transform: rotate(26deg);
    }

    .route-b {
      width: 35%;
      left: 47%;
      top: 48%;
      transform: rotate(39deg);
    }

    .route-c {
      width: 17%;
      left: 70%;
      top: 70%;
      transform: rotate(7deg);
    }

    .route-point {
      position: absolute;
      width: 8px;
      height: 8px;
      border: 2px solid ${theme.route};
      border-radius: 50%;
      background: ${theme.map};
      transform: translate(-50%, -50%);
    }

    .route-point-1 {
      left: 20%;
      top: 31%;
    }

    .route-point-2 {
      left: 47%;
      top: 48%;
    }

    .route-point-3 {
      left: 70%;
      top: 70%;
    }

    .route-point-4 {
      left: 87%;
      top: 72%;
    }

    .waypoint {
      position: absolute;
      color: ${theme.text};
      font-size: 8px;
      font-weight: 700;
      background: ${dark ? "rgba(31,39,43,.8)" : "rgba(230,237,239,.85)"};
      padding: 2px 4px;
      border-radius: 2px;
      z-index: 10;
    }

    .waypoint-1 {
      left: 34%;
      top: 38%;
    }

    .waypoint-2 {
      left: 52%;
      top: 51%;
    }

    .waypoint-3 {
      left: 69%;
      top: 64%;
    }

    /* =========================
       PIN MARKERS
    ========================= */

    .airport-marker {
      position: absolute;
      z-index: 25;
      transform: translate(-50%, -100%);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .pin {
      position: relative;
      width: 18px;
      height: 18px;
      flex: 0 0 18px;
      border-radius: 50% 50% 50% 0;
      background: ${theme.blue};
      transform: rotate(-45deg);
      box-shadow:
        0 2px 5px rgba(0, 0, 0, .35),
        0 0 0 1px rgba(255,255,255,.08);
    }

    .pin::after {
      content: "";
      position: absolute;
      width: 6px;
      height: 6px;
      left: 6px;
      top: 6px;
      border-radius: 50%;
      background: white;
    }

    .pin-label {
      padding: 2px 4px;
      border-radius: 2px;
      background: ${
        dark ? "rgba(24, 30, 34, .88)" : "rgba(245,248,249,.9)"
      };
      color: ${theme.text};
      font-size: 10px;
      font-weight: 800;
      white-space: nowrap;
      box-shadow: 0 1px 3px rgba(0,0,0,.18);
    }

    .departure-marker {
      left: 20%;
      top: 31%;
    }

    .destination-marker {
      left: 87%;
      top: 72%;
    }

    /* =========================
       MAP CONTROLS
    ========================= */

    .map-tools {
      position: absolute;
      right: 12px;
      top: 12px;
      z-index: 50;
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .map-tool {
      width: 38px;
      height: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid ${theme.border};
      border-radius: 3px;
      background: ${theme.panel};
      color: ${theme.text};
      cursor: pointer;
      box-shadow: 0 2px 5px rgba(0,0,0,.16);
    }

    .map-tool:hover {
      background: ${theme.panel2};
    }

    .map-info {
      position: absolute;
      left: 13px;
      top: 13px;
      z-index: 45;
      min-width: 150px;
      padding: 8px 10px;
      border: 1px solid ${theme.border};
      border-radius: 3px;
      background: ${
        dark ? "rgba(29,36,40,.9)" : "rgba(248,250,251,.9)"
      };
      box-shadow: 0 2px 7px rgba(0,0,0,.14);
    }

    .map-info-title {
      font-size: 10px;
      font-weight: 750;
    }

    .map-info-sub {
      margin-top: 3px;
      color: ${theme.muted};
      font-size: 8px;
    }

    /* =========================
       BOTTOM MAP BAR
    ========================= */

    .map-bottom {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      background: ${theme.panel};
      border-top: 1px solid ${theme.border};
      z-index: 60;
    }

    .level-control {
      display: flex;
      gap: 2px;
    }

    .level {
      min-width: 48px;
      height: 28px;
      border: 1px solid transparent;
      background: transparent;
      color: ${theme.muted};
      font-size: 9px;
      font-weight: 800;
      cursor: pointer;
    }

    .level.active {
      border-color: ${theme.blue};
      background: ${
        dark ? "rgba(38,139,187,.18)" : "rgba(8,127,189,.1)"
      };
      color: ${theme.blue};
    }

    .bottom-actions {
      display: flex;
      gap: 4px;
    }

    .bottom-action {
      width: 34px;
      height: 31px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid transparent;
      background: transparent;
      color: ${theme.muted};
      cursor: pointer;
    }

    .bottom-action:hover,
    .bottom-action.active {
      color: ${theme.blue};
      border-color: ${theme.blue};
      background: ${
        dark ? "rgba(38,139,187,.16)" : "rgba(8,127,189,.08)"
      };
    }

    /* =========================
       MODAL
    ========================= */

    .overlay {
      position: fixed;
      inset: 0;
      z-index: 500;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0,0,0,.45);
    }

    .dialog {
      width: min(390px, calc(100vw - 30px));
      background: ${theme.panel};
      border: 1px solid ${theme.border};
      border-radius: 3px;
      box-shadow: 0 15px 45px rgba(0,0,0,.35);
    }

    .dialog-head {
      height: 46px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 13px;
      border-bottom: 1px solid ${theme.border};
    }

    .dialog-head strong {
      font-size: 12px;
    }

    .dialog-close {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0;
      background: transparent;
      color: ${theme.muted};
      cursor: pointer;
    }

    .dialog-body {
      padding: 17px;
    }

    .dialog-label {
      display: block;
      margin-bottom: 7px;
      color: ${theme.muted};
      font-size: 9px;
      font-weight: 750;
      text-transform: uppercase;
      letter-spacing: .05em;
    }

    .airport-input {
      width: 100%;
      height: 40px;
      padding: 0 10px;
      outline: none;
      border: 1px solid ${theme.borderLight};
      border-radius: 2px;
      background: ${theme.bg};
      color: ${theme.text};
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
    }

    .airport-input:focus {
      border-color: ${theme.blue};
    }

    .dialog-button {
      width: 100%;
      height: 40px;
      margin-top: 13px;
      border: 0;
      border-radius: 2px;
      background: ${theme.blue};
      color: white;
      font-size: 11px;
      font-weight: 750;
      cursor: pointer;
    }

    /* =========================
       RESPONSIVE
    ========================= */

    @media (max-width: 850px) {
      .workspace {
        grid-template-columns: 245px minmax(0, 1fr);
      }

      .flight-status,
      .profile {
        display: none;
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

      .cycle {
        border: 0;
      }
    }
  `;

  return (
    <>
      <style>{css}</style>

      <div className="mpilot">

        {/* =========================
            TOP BAR
        ========================= */}

        <header className="topbar">

          <div className="top-left">

            <button className="top-icon">
              <Menu size={19} />
            </button>

            <span className="cycle">
              AIRAC 1807
            </span>

            <span className="flight-status">
              {flight.departure && flight.destination
                ? `${flight.departure} → ${flight.destination}`
                : "Route not saved"}
            </span>

          </div>

          <div className="top-center">
            <Clock3 size={14} />
            <span>00:00</span>
          </div>

          <div className="top-right">

            <button className="top-icon">
              <HelpCircle size={17} />
            </button>

            <button
              className="top-icon"
              onClick={() => setDark(!dark)}
              title="Day / Night"
            >
              {dark ? (
                <Sun size={17} />
              ) : (
                <Moon size={17} />
              )}
            </button>

            <span className="profile">
              default
            </span>

            <span className="online" />

          </div>

        </header>

        {/* =========================
            WORKSPACE
        ========================= */}

        <div className="workspace">

          {/* =========================
              FLIGHT FOLDER
          ========================= */}

          <aside className="sidebar">

            <div className="sidebar-header">

              <span className="sidebar-title">
                Flight Folder
              </span>

              <button className="sidebar-menu">
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
              <Plus size={15} />
              New Flight
            </button>

            <button
              className="folder-row"
              onClick={() => openAirport("departure")}
            >
              <MapPinned size={17} />

              <div className="row-content">
                <span className="row-title">
                  Departure
                </span>

                <span className="row-value">
                  {flight.departure || "Add Departure"}
                </span>
              </div>

              <ChevronRight size={15} />
            </button>

            <button
              className="folder-row"
              onClick={() => openAirport("destination")}
            >
              <MapPinned size={17} />

              <div className="row-content">
                <span className="row-title">
                  Destination
                </span>

                <span className="row-value">
                  {flight.destination || "Add Destination"}
                </span>
              </div>

              <ChevronRight size={15} />
            </button>

            <button
              className="folder-row"
              onClick={() => openAirport("alternate")}
            >
              <MapPinned size={17} />

              <div className="row-content">
                <span className="row-title">
                  Alternate
                </span>

                <span className="row-value">
                  {flight.alternate || "Add Alternate"}
                </span>
              </div>

              <ChevronRight size={15} />
            </button>

            <button className="simple-row">
              <FileText size={16} />
              <span>Documents</span>
              <ChevronRight size={15} />
            </button>

            <button className="simple-row">
              <StickyNote size={16} />
              <span>Route Notes</span>
              <ChevronRight size={15} />
            </button>

            <div className="sidebar-bottom">

              <div className="validity">
                <span>Validity</span>
                <span className="valid">
                  Up to date
                </span>
              </div>

              <div className="ready">
                <span>●</span>
                <span>Ready</span>
              </div>

            </div>

          </aside>

          {/* =========================
              MAP
          ========================= */}

          <main className="map">

            <div className="map-background" />

            <div className="map-grid" />

            {/* simplified chart regions */}

            <div className="region region-1" />
            <div className="region region-2" />
            <div className="region region-3" />
            <div className="region region-4" />

            {/* FIR boundaries */}

            <div className="fir-line fir-1" />
            <div className="fir-line fir-2" />
            <div className="fir-line fir-3" />

            <span className="fir-label fir-label-1">
              LONDON FIR
            </span>

            <span className="fir-label fir-label-2">
              SWISS FIR
            </span>

            <span className="fir-label fir-label-3">
              GERMANY FIR
            </span>

            {/* cities */}

            <span className="city city-1">
              LONDON
            </span>

            <span className="city city-2">
              PARIS
            </span>

            <span className="city city-3">
              BERLIN
            </span>

            <span className="city city-4">
              MÜNCHEN
            </span>

            {/* route */}

            <div className="route-layer">

              <div className="route-line route-a" />
              <div className="route-line route-b" />
              <div className="route-line route-c" />

              <div className="route-point route-point-1" />
              <div className="route-point route-point-2" />
              <div className="route-point route-point-3" />
              <div className="route-point route-point-4" />

              <span className="waypoint waypoint-1">
                KPT
              </span>

              <span className="waypoint waypoint-2">
                ROKIL
              </span>

              <span className="waypoint waypoint-3">
                LAMSI
              </span>

            </div>

            {/* =========================
                AIRPORT PINS
            ========================= */}

            {flight.departure && (
              <div className="airport-marker departure-marker">

                <div className="pin" />

                <span className="pin-label">
                  {flight.departure}
                </span>

              </div>
            )}

            {flight.destination && (
              <div className="airport-marker destination-marker">

                <div className="pin" />

                <span className="pin-label">
                  {flight.destination}
                </span>

              </div>
            )}

            {/* =========================
                MAP INFO
            ========================= */}

            <div className="map-info">

              <div className="map-info-title">
                {activeLevel === "LOW"
                  ? "LOW ENROUTE"
                  : "HIGH ENROUTE"}
              </div>

              <div className="map-info-sub">
                {flight.departure || "----"} →{" "}
                {flight.destination || "----"}
              </div>

            </div>

            {/* =========================
                RIGHT MAP CONTROLS
            ========================= */}

            <div className="map-tools">

              <button className="map-tool">
                <Search size={17} />
              </button>

              <button className="map-tool">
                <Settings size={17} />
              </button>

              <button
                className="map-tool"
                onClick={() => setMapMode("route")}
              >
                <Navigation size={17} />
              </button>

              <button
                className="map-tool"
                onClick={() => setMapMode("position")}
              >
                <LocateFixed size={17} />
              </button>

            </div>

            {/* =========================
                BOTTOM BAR
            ========================= */}

            <div className="map-bottom">

              <div className="level-control">

                <button
                  className={`level ${
                    activeLevel === "LOW"
                      ? "active"
                      : ""
                  }`}
                  onClick={() => setActiveLevel("LOW")}
                >
                  LOW
                </button>

                <button
                  className={`level ${
                    activeLevel === "HIGH"
                      ? "active"
                      : ""
                  }`}
                  onClick={() => setActiveLevel("HIGH")}
                >
                  HIGH
                </button>

              </div>

              <div className="bottom-actions">

                <button className="bottom-action">
                  <FileText size={17} />
                </button>

                <button
                  className={`bottom-action ${
                    mapMode === "position"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setMapMode("position")
                  }
                >
                  <Crosshair size={17} />
                </button>

                <button className="bottom-action">
                  <Layers size={17} />
                </button>

                <button
                  className={`bottom-action ${
                    mapMode === "route"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setMapMode("route")
                  }
                >
                  <MapPinned size={17} />
                </button>

                <button className="bottom-action">
                  <Settings size={17} />
                </button>

              </div>

            </div>

          </main>

        </div>

        {/* =========================
            AIRPORT DIALOG
        ========================= */}

        {selectedAirport && (
          <div className="overlay">

            <div className="dialog">

              <div className="dialog-head">

                <strong>
                  {airportTitle[selectedAirport]}
                </strong>

                <button
                  className="dialog-close"
                  onClick={() => {
                    setSelectedAirport(null);
                    setAirportInput("");
                  }}
                >
                  <X size={17} />
                </button>

              </div>

              <div className="dialog-body">

                <label className="dialog-label">
                  ICAO Airport
                </label>

                <input
                  className="airport-input"
                  value={airportInput}
                  maxLength={4}
                  autoFocus
                  placeholder="EDDF"
                  onChange={(event) =>
                    setAirportInput(
                      event.target.value.toUpperCase()
                    )
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      saveAirport();
                    }
                  }}
                />

                <button
                  className="dialog-button"
                  onClick={saveAirport}
                >
                  LOAD AIRPORT
                </button>

              </div>

            </div>

          </div>
        )}

      </div>
    </>
  );
}

export default App;
