import React, { useMemo, useState } from "react";

/* ============================================================
   mPilot — Step 3
   SimBrief import + MSFS Flight Planner chart hub
   Everything intentionally kept in one App.jsx.
   ============================================================ */

const PLANNER_URL = "https://planner.flightsimulator.com/";

const Icon = ({ name, size = 19, strokeWidth = 1.8 }) => {
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

  const shapes = {
    menu: (
      <>
        <path d="M4 6h16" />
        <path d="M4 12h16" />
        <path d="M4 18h16" />
      </>
    ),
    more: (
      <>
        <circle cx="5" cy="12" r="1.2" fill="currentColor" />
        <circle cx="12" cy="12" r="1.2" fill="currentColor" />
        <circle cx="19" cy="12" r="1.2" fill="currentColor" />
      </>
    ),
    pin: (
      <>
        <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.2" />
      </>
    ),
    route: (
      <>
        <circle cx="6" cy="18" r="2.2" />
        <circle cx="18" cy="6" r="2.2" />
        <path d="M7.8 16.2 16.2 7.8" />
        <path d="M9.8 14.2 14.2 9.8" />
      </>
    ),
    document: (
      <>
        <path d="M6 3h9l3 3v15H6z" />
        <path d="M15 3v4h4" />
        <path d="M9 12h6" />
        <path d="M9 16h5" />
      </>
    ),
    notes: (
      <>
        <path d="M5 4h14v16H5z" />
        <path d="M8 8h8" />
        <path d="M8 12h8" />
        <path d="M8 16h5" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="6.7" />
        <path d="m16 16 4 4" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="m3 12 9 5 9-5" />
        <path d="m3 16 9 5 9-5" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="7" />
        <circle cx="12" cy="12" r="2.5" />
        <path d="M12 2v3" />
        <path d="M12 19v3" />
        <path d="M2 12h3" />
        <path d="M19 12h3" />
      </>
    ),
    pencil: (
      <>
        <path d="m5 19 1-4 9.8-9.8a2.2 2.2 0 0 1 3.1 3.1L9 18l-4 1Z" />
        <path d="m14 6 4 4" />
      </>
    ),
    calendar: (
      <>
        <rect x="4" y="5" width="16" height="15" rx="1.5" />
        <path d="M8 3v4" />
        <path d="M16 3v4" />
        <path d="M4 9h16" />
      </>
    ),
    help: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.6 9.2a2.6 2.6 0 1 1 4.3 2c-1.2 1-1.8 1.2-1.8 2.6" />
        <circle cx="12" cy="17" r=".7" fill="currentColor" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.9 4.9 1.4 1.4" />
        <path d="m17.7 17.7 1.4 1.4" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m4.9 19.1 1.4-1.4" />
        <path d="m17.7 6.3 1.4-1.4" />
      </>
    ),
    moon: <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" />,
    close: (
      <>
        <path d="M6 6l12 12" />
        <path d="M18 6 6 18" />
      </>
    ),
    refresh: (
      <>
        <path d="M20 11a8 8 0 0 0-13.9-4.9L4 8" />
        <path d="M4 4v4h4" />
        <path d="M4 13a8 8 0 0 0 13.9 4.9L20 16" />
        <path d="M20 20v-4h-4" />
      </>
    ),
    external: (
      <>
        <path d="M14 5h5v5" />
        <path d="M19 5 10 14" />
        <path d="M18 13v6H5V6h6" />
      </>
    ),
    download: (
      <>
        <path d="M12 3v11" />
        <path d="m8 10 4 4 4-4" />
        <path d="M5 20h14" />
      </>
    ),
  };

  return <svg {...common}>{shapes[name]}</svg>;
};

const first = (...values) => {
  for (const value of values) {
    if (value !== undefined && value !== null && String(value).trim() !== "") {
      return value;
    }
  }
  return "";
};

const toArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === "object") return Object.values(value);
  return [value];
};

const airportInfo = (airport = {}) => ({
  icao: String(first(
    airport.icao_code,
    airport.icao,
    airport.ident,
    airport.id,
    ""
  )).toUpperCase(),
  iata: String(first(airport.iata_code, airport.iata, "")).toUpperCase(),
  name: first(airport.name, airport.icao_name, airport.airport_name, ""),
  runway: first(airport.plan_rwy, airport.runway, airport.rwy, ""),
  lat: Number(first(airport.pos_lat, airport.lat, airport.latitude, NaN)),
  lon: Number(first(airport.pos_long, airport.lon, airport.longitude, NaN)),
});

const getFixLat = (fix) =>
  Number(first(
    fix.pos_lat,
    fix.lat,
    fix.latitude,
    fix.position?.lat,
    fix.coordinates?.lat,
    NaN
  ));

const getFixLon = (fix) =>
  Number(first(
    fix.pos_long,
    fix.pos_lon,
    fix.lon,
    fix.lng,
    fix.longitude,
    fix.position?.lon,
    fix.position?.long,
    fix.coordinates?.lon,
    NaN
  ));

const normalizeNavlog = (ofp) => {
  const raw = first(
    ofp?.navlog?.fix,
    ofp?.navlog?.fixes,
    ofp?.navlog?.waypoint,
    ofp?.navlog?.waypoints,
    ofp?.navlog
  );

  let items = [];

  if (Array.isArray(raw)) {
    items = raw;
  } else if (raw && typeof raw === "object") {
    const hasFixFields = [
      "ident",
      "fix_ident",
      "name",
      "pos_lat",
      "pos_long",
      "lat",
      "lon",
    ].some((key) => raw[key] !== undefined);

    if (hasFixFields) {
      items = [raw];
    } else {
      items = Object.values(raw);
    }
  }

  return items
    .filter((fix) => fix && typeof fix === "object")
    .map((fix, index) => ({
      id: index,
      ident: String(first(
        fix.ident,
        fix.fix_ident,
        fix.name,
        `FIX${index + 1}`
      )).toUpperCase(),
      lat: getFixLat(fix),
      lon: getFixLon(fix),
      altitude: first(fix.altitude, fix.altitude_feet, fix.altitude_ft, ""),
      flightLevel: first(fix.flight_level, fix.fl, ""),
      ias: first(fix.ias, ""),
      tas: first(fix.tas, ""),
      mach: first(fix.mach, ""),
      gs: first(fix.gs, fix.groundspeed, ""),
      windDir: first(fix.wind_dir, fix.wind_direction, ""),
      windSpd: first(fix.wind_spd, fix.wind_speed, ""),
      oat: first(fix.oat, fix.temperature, ""),
      distance: first(fix.distance, fix.dme_distance, fix.leg_distance, ""),
      airway: first(fix.via_airway, fix.airway, fix.route, ""),
      time: first(fix.time, fix.leg_time, fix.elapsed_time, ""),
      fuel: first(fix.fuel, fix.fuel_used, ""),
      stage: first(fix.stage, ""),
    }))
    .filter((fix) => fix.ident || Number.isFinite(fix.lat) || Number.isFinite(fix.lon));
};

const collectAlternates = (ofp) => {
  const result = [];
  const seen = new Set();

  const add = (candidate) => {
    if (!candidate) return;

    const airport = typeof candidate === "string"
      ? airportInfo({ icao_code: candidate })
      : airportInfo(candidate);

    if (!airport.icao || seen.has(airport.icao)) return;

    const origin = String(first(
      ofp?.origin?.icao_code,
      ofp?.origin?.icao,
      ofp?.orig,
      ""
    )).toUpperCase();

    const destination = String(first(
      ofp?.destination?.icao_code,
      ofp?.destination?.icao,
      ofp?.dest,
      ""
    )).toUpperCase();

    if (airport.icao === origin || airport.icao === destination) return;

    seen.add(airport.icao);
    result.push(airport);
  };

  [
    ...toArray(ofp?.alternates),
    ...toArray(ofp?.alternate),
    ...toArray(ofp?.altn),
  ].forEach(add);

  for (let i = 1; i <= 4; i += 1) {
    add(first(
      ofp?.[`altn_${i}_id`],
      ofp?.[`alternate_${i}_id`],
      ""
    ));
  }

  // Some JSON v2 payloads nest alternate IDs.
  const walk = (node, depth = 0) => {
    if (!node || depth > 6) return;
    if (Array.isArray(node)) {
      node.forEach((child) => walk(child, depth + 1));
      return;
    }
    if (typeof node !== "object") return;

    Object.entries(node).forEach(([key, value]) => {
      if (/^(altn_\d+_id|alternate_\d+_id|altn\d+)$/i.test(key)) add(value);
      walk(value, depth + 1);
    });
  };

  walk(ofp);

  return result;
};

const normalizeOFP = (ofp) => {
  const origin = airportInfo(ofp?.origin);
  const destination = airportInfo(ofp?.destination);

  const aircraft = ofp?.aircraft || {};
  const general = ofp?.general || {};
  const times = ofp?.times || {};
  const fuel = ofp?.fuel || {};
  const weights = ofp?.weights || {};
  const atc = ofp?.atc || {};
  const weather = ofp?.weather || {};
  const params = ofp?.params || {};

  const navlog = normalizeNavlog(ofp);
  const alternates = collectAlternates(ofp);

  const pdfDirectory = String(first(
    ofp?.fms_downloads?.directory,
    ofp?.fms_downloads?.dir,
    "https://www.simbrief.com/ofp/uads/"
  )).replace(/\/$/, "");

  const pdfLink = first(
    ofp?.fms_downloads?.pdf?.link,
    ofp?.fms_downloads?.pdf?.url,
    ""
  );

  const pdfUrl = pdfLink
    ? (/^https?:\/\//i.test(String(pdfLink))
        ? String(pdfLink)
        : `${pdfDirectory}/${String(pdfLink).replace(/^\/+/, "")}`)
    : "";

  return {
    raw: ofp,
    flightNumber: String(first(
      general.flight_number,
      general.flight,
      atc.callsign,
      ""
    )).toUpperCase(),

    airline: String(first(
      general.icao_airline,
      general.airline,
      ""
    )).toUpperCase(),

    aircraft: String(first(
      aircraft.icaotype,
      aircraft.icaotype,
      aircraft.type,
      general.aircraft,
      ""
    )).toUpperCase(),

    registration: String(first(
      aircraft.reg,
      aircraft.registration,
      ""
    )).toUpperCase(),

    cruise: first(
      general.initial_altitude,
      general.cruise_altitude,
      general.altitude,
      ""
    ),

    costIndex: first(general.costindex, general.cost_index, ""),

    origin,
    destination,
    alternates,

    route: String(first(
      general.route,
      ofp?.route,
      ""
    )).trim(),

    distance: first(
      general.route_distance,
      general.distance,
      ofp?.distance,
      ""
    ),

    airTime: first(
      times.air_time,
      times.airtime,
      times.flight_time,
      ""
    ),

    blockTime: first(
      times.est_block,
      times.block_time,
      ""
    ),

    std: first(times.sched_out, times.std, ""),
    sta: first(times.sched_in, times.sta, ""),
    etd: first(times.est_out, times.etd, ""),
    eta: first(times.est_in, times.eta, ""),
    takeoff: first(times.est_off, times.takeoff, ""),
    landing: first(times.est_on, times.landing, ""),

    blockFuel: first(
      fuel.plan_ramp,
      fuel.block,
      fuel.block_fuel,
      ""
    ),

    taxiFuel: first(fuel.taxi, fuel.taxi_fuel, ""),
    tripFuel: first(fuel.enroute_burn, fuel.trip, fuel.trip_fuel, ""),
    reserveFuel: first(fuel.reserve, fuel.reserve_fuel, ""),
    alternateFuel: first(fuel.alternate_burn, fuel.alternate, ""),
    finalReserve: first(fuel.reserve_final, fuel.final_reserve, ""),
    landingFuel: first(fuel.plan_ldg, fuel.landing, fuel.landing_fuel, ""),

    tow: first(weights.est_tow, weights.tow, weights.etow, ""),
    landingWeight: first(weights.est_ldw, weights.ldw, weights.landing_weight, ""),
    zfw: first(weights.est_zfw, weights.zfw, weights.zero_fuel_weight, ""),
    mtow: first(weights.mtow, weights.max_tow, ""),

    originMetar: first(weather.orig_metar, ofp?.origin?.metar, ""),
    destinationMetar: first(weather.dest_metar, ofp?.destination?.metar, ""),

    pax: first(weights.pax_count, weights.pax, ""),
    units: first(params.units, ofp?.units, "kgs"),

    navlog,
    pdfUrl,
    importedAt: new Date().toISOString(),
  };
};

function App() {
  const [dark, setDark] = useState(true);
  const [folderOpen, setFolderOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const [simbriefUsername, setSimbriefUsername] = useState(
    localStorage.getItem("mpilot_simbrief_username") || ""
  );

  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(false);
  const [importError, setImportError] = useState("");
  const [selectedContent, setSelectedContent] = useState("route");
  const [plannerAirport, setPlannerAirport] = useState("");
  const [chartUrl, setChartUrl] = useState("");
  const [chartName, setChartName] = useState("");
  const [showImport, setShowImport] = useState(false);

  const theme = dark
    ? {
        bg: "#171b1f",
        panel: "#1d2328",
        panel2: "#252c31",
        panel3: "#2c343a",
        border: "#394249",
        text: "#f0f3f4",
        muted: "#919ba2",
        blue: "#2f9ed5",
        blueSoft: "rgba(47,158,213,.15)",
        green: "#4eaf73",
        map: "#20272c",
        mapLine: "rgba(105,154,170,.12)",
      }
    : {
        bg: "#e7e7e4",
        panel: "#f9f9f7",
        panel2: "#eeeeeb",
        panel3: "#e1e2df",
        border: "#cecfcc",
        text: "#1f2427",
        muted: "#70777b",
        blue: "#1789c3",
        blueSoft: "rgba(23,137,195,.12)",
        green: "#429961",
        map: "#dfe4e4",
        mapLine: "rgba(70,90,95,.12)",
      };

  const displayAirport = (airport) => {
    if (!airport) return "—";
    return airport.icao || airport.iata || "—";
  };

  const mapPoints = useMemo(() => {
    if (!flight?.navlog?.length) {
      return [
        { x: 16, y: 29 },
        { x: 35, y: 38 },
        { x: 52, y: 52 },
        { x: 68, y: 64 },
        { x: 82, y: 73 },
      ];
    }

    const valid = flight.navlog.filter(
      (fix) => Number.isFinite(fix.lat) && Number.isFinite(fix.lon)
    );

    if (valid.length < 2) {
      return [
        { x: 16, y: 29 },
        { x: 35, y: 38 },
        { x: 52, y: 52 },
        { x: 68, y: 64 },
        { x: 82, y: 73 },
      ];
    }

    const lats = valid.map((p) => p.lat);
    const lons = valid.map((p) => p.lon);

    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);

    return valid.map((point) => ({
      x: 8 + ((point.lon - minLon) / Math.max(0.0001, maxLon - minLon)) * 84,
      y: 88 - ((point.lat - minLat) / Math.max(0.0001, maxLat - minLat)) * 76,
    }));
  }, [flight]);

  const routePath = mapPoints
    .map((p, index) => `${index === 0 ? "M" : "L"} ${p.x * 12} ${p.y * 8}`)
    .join(" ");

  const importSimBrief = async () => {
    const username = simbriefUsername.trim();

    if (!username) {
      setImportError("Please enter your SimBrief username.");
      return;
    }

    setLoading(true);
    setImportError("");

    try {
      const url =
        `https://www.simbrief.com/api/xml.fetcher.php?username=` +
        `${encodeURIComponent(username)}&json=v2`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `SimBrief returned HTTP ${response.status}.`
        );
      }

      const data = await response.json();
      const normalized = normalizeOFP(data);

      if (!normalized.origin.icao && !normalized.destination.icao) {
        throw new Error("The SimBrief response did not contain a usable OFP.");
      }

      localStorage.setItem("mpilot_simbrief_username", username);
      localStorage.setItem(
        "mpilot_last_ofp",
        JSON.stringify(normalized)
      );

      setFlight(normalized);
      setShowImport(false);
      setSelectedContent("route");
    } catch (error) {
      console.error(error);
      setImportError(
        error?.message ||
          "The SimBrief OFP could not be loaded."
      );
    } finally {
      setLoading(false);
    }
  };

  const clearFlight = () => {
    setFlight(null);
    localStorage.removeItem("mpilot_last_ofp");
    setMenuOpen(false);
  };

  const openPlanner = (icao = "") => {
    const target = PLANNER_URL;
    window.open(target, "_blank", "noopener,noreferrer");
    if (icao) {
      setPlannerAirport(icao.toUpperCase());
    }
  };

  const saveManualChart = () => {
    if (!chartUrl.trim()) return;

    const item = {
      name: chartName.trim() || "Custom Chart",
      url: chartUrl.trim(),
      airport: plannerAirport.trim().toUpperCase(),
    };

    const current = JSON.parse(
      localStorage.getItem("mpilot_custom_charts") || "[]"
    );

    localStorage.setItem(
      "mpilot_custom_charts",
      JSON.stringify([item, ...current])
    );

    setChartName("");
    setChartUrl("");
  };

  const savedCharts = useMemo(() => {
    try {
      return JSON.parse(
        localStorage.getItem("mpilot_custom_charts") || "[]"
      );
    } catch {
      return [];
    }
  }, [chartUrl, chartName]);

  const displayRoute = flight?.route || "No flight imported";

  const css = `
    * { box-sizing: border-box; }

    html, body, #root {
      width: 100%;
      height: 100%;
      margin: 0;
      overflow: hidden;
    }

    body {
      font-family:
        Inter, -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, Helvetica, Arial, sans-serif;
      background: ${theme.bg};
      color: ${theme.text};
    }

    button, input {
      font: inherit;
    }

    button {
      border: 0;
    }

    .app {
      width: 100vw;
      height: 100dvh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background: ${theme.bg};
      color: ${theme.text};
    }

    .topbar {
      height: 48px;
      min-height: 48px;
      display: flex;
      align-items: center;
      background: ${theme.panel};
      border-bottom: 1px solid ${theme.border};
      position: relative;
      z-index: 100;
    }

    .top-menu {
      width: 48px;
      height: 48px;
      background: transparent;
      color: ${theme.text};
      display: grid;
      place-items: center;
      cursor: pointer;
    }

    .top-menu:hover {
      background: ${theme.panel2};
    }

    .cycle {
      display: flex;
      align-items: center;
      gap: 10px;
      padding-left: 3px;
      font-size: 11px;
    }

    .cycle span {
      color: ${theme.muted};
    }

    .cycle strong {
      font-weight: 600;
    }

    .cycle i {
      width: 1px;
      height: 15px;
      background: ${theme.border};
    }

    .top-center {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 7px;
      font-size: 11px;
    }

    .top-center svg {
      color: ${theme.muted};
    }

    .top-right {
      margin-left: auto;
      height: 100%;
      display: flex;
      align-items: center;
      gap: 5px;
      padding-right: 9px;
    }

    .top-action {
      width: 34px;
      height: 34px;
      display: grid;
      place-items: center;
      color: ${theme.text};
      background: transparent;
      cursor: pointer;
    }

    .top-action:hover {
      background: ${theme.panel2};
    }

    .profile {
      display: flex;
      align-items: center;
      gap: 7px;
      padding-left: 6px;
      color: ${theme.muted};
      font-size: 10px;
    }

    .online {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: ${theme.green};
    }

    .workspace {
      flex: 1;
      min-height: 0;
      display: flex;
      position: relative;
      overflow: hidden;
    }

    .sidebar {
      width: 270px;
      min-width: 270px;
      height: 100%;
      display: flex;
      flex-direction: column;
      background: ${theme.panel};
      border-right: 1px solid ${theme.border};
      z-index: 50;
    }

    .sidebar-header {
      height: 47px;
      min-height: 47px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 7px 0 6px;
      border-bottom: 1px solid ${theme.border};
    }

    .sidebar-title {
      font-size: 13px;
      font-weight: 600;
    }

    .more-button {
      width: 31px;
      height: 31px;
      display: grid;
      place-items: center;
      color: ${theme.text};
      background: transparent;
      cursor: pointer;
    }

    .sidebar-menu {
      position: absolute;
      left: 210px;
      top: 42px;
      width: 150px;
      overflow: hidden;
      border: 1px solid ${theme.border};
      background: ${theme.panel};
      box-shadow: 0 10px 30px rgba(0,0,0,.25);
      z-index: 120;
    }

    .sidebar-menu button {
      width: 100%;
      height: 43px;
      display: flex;
      align-items: center;
      gap: 11px;
      padding: 0 12px;
      background: transparent;
      color: ${theme.text};
      border-bottom: 1px solid ${theme.border};
      text-align: left;
      cursor: pointer;
      font-size: 11px;
    }

    .sidebar-menu button:hover {
      background: ${theme.panel2};
    }

    .new-flight {
      height: 40px;
      margin: 15px 6px 11px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background: ${theme.panel2};
      border: 1px solid ${theme.border};
      color: ${theme.text};
      cursor: pointer;
      border-radius: 3px;
      font-size: 12px;
      font-weight: 600;
    }

    .new-flight:hover {
      border-color: ${theme.blue};
      color: ${theme.blue};
    }

    .folder-row {
      width: 100%;
      min-height: 76px;
      display: grid;
      grid-template-columns: 32px 1fr 20px;
      align-items: center;
      gap: 8px;
      padding: 8px 9px;
      background: transparent;
      color: ${theme.text};
      border-bottom: 1px solid ${theme.border};
      text-align: left;
      cursor: pointer;
    }

    .folder-row:hover,
    .folder-row.active {
      background: ${theme.panel2};
    }

    .folder-icon {
      color: ${theme.muted};
      display: grid;
      place-items: center;
    }

    .folder-copy strong {
      display: block;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .folder-copy small {
      color: ${theme.muted};
      font-size: 10px;
    }

    .arrow {
      color: ${theme.muted};
      font-size: 24px;
      text-align: center;
      line-height: 1;
    }

    .add-alternate {
      height: 37px;
      margin: 0 6px;
      background: ${theme.panel2};
      border: 1px solid ${theme.border};
      color: ${theme.text};
      cursor: pointer;
      font-size: 10px;
      font-weight: 600;
    }

    .add-alternate:hover {
      border-color: ${theme.blue};
      color: ${theme.blue};
    }

    .separator {
      height: 12px;
      background: ${theme.panel2};
      border-top: 1px solid ${theme.border};
      border-bottom: 1px solid ${theme.border};
    }

    .simple-row {
      width: 100%;
      height: 53px;
      display: grid;
      grid-template-columns: 31px 1fr 20px;
      align-items: center;
      gap: 8px;
      padding: 0 9px;
      background: transparent;
      color: ${theme.text};
      border-bottom: 1px solid ${theme.border};
      text-align: left;
      cursor: pointer;
    }

    .simple-row:hover,
    .simple-row.active {
      background: ${theme.panel2};
    }

    .simple-row span {
      font-size: 11px;
      font-weight: 600;
    }

    .folder-spacer {
      flex: 1;
    }

    .validity {
      height: 31px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 7px;
      color: ${theme.muted};
      font-size: 9px;
      border-top: 1px solid ${theme.border};
    }

    .validity strong {
      color: ${theme.green};
      font-weight: 600;
    }

    .map-shell {
      flex: 1;
      min-width: 0;
      min-height: 0;
      position: relative;
      overflow: hidden;
    }

    .map {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(circle at 25% 18%, rgba(65,95,105,.18), transparent 35%),
        radial-gradient(circle at 80% 72%, rgba(65,95,105,.12), transparent 35%),
        ${theme.map};
      overflow: hidden;
    }

    .map-grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(${theme.mapLine} 1px, transparent 1px),
        linear-gradient(90deg, ${theme.mapLine} 1px, transparent 1px);
      background-size: 78px 78px;
    }

    .map-water {
      position: absolute;
      width: 70%;
      height: 45%;
      right: -15%;
      bottom: -5%;
      border-radius: 50%;
      background: rgba(50,120,155,.08);
      transform: rotate(-11deg);
    }

    .map-country {
      position: absolute;
      border: 1px solid ${dark ? "rgba(90,130,104,.26)" : "rgba(80,125,95,.34)"};
      border-radius: 35% 65% 44% 56%;
      background: rgba(100,135,115,.025);
    }

    .country-a {
      width: 38%;
      height: 43%;
      left: 13%;
      top: 17%;
      transform: rotate(-9deg);
    }

    .country-b {
      width: 32%;
      height: 54%;
      left: 44%;
      top: 9%;
      transform: rotate(12deg);
    }

    .country-c {
      width: 39%;
      height: 44%;
      right: -4%;
      bottom: 6%;
      transform: rotate(-14deg);
    }

    .map-text {
      position: absolute;
      color: ${theme.muted};
      opacity: .7;
      font-size: 9px;
      letter-spacing: .07em;
      pointer-events: none;
    }

    .fir-text {
      color: ${dark ? "rgba(106,157,124,.75)" : "rgba(63,118,80,.72)"};
      font-style: italic;
    }

    .fir-a { left: 41%; top: 14%; }
    .fir-b { right: 13%; top: 27%; }
    .fir-c { left: 19%; bottom: 26%; }
    .fir-d { right: 15%; bottom: 16%; }

    .route-svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: visible;
      z-index: 20;
    }

    .route-fir {
      fill: none;
      stroke: ${dark ? "rgba(92,153,110,.5)" : "rgba(69,129,85,.58)"};
      stroke-width: 1.2;
      stroke-dasharray: 9 6;
    }

    .route-shadow {
      fill: none;
      stroke: rgba(0,0,0,.28);
      stroke-width: 6;
      stroke-linejoin: round;
      stroke-linecap: round;
    }

    .route-main {
      fill: none;
      stroke: ${theme.blue};
      stroke-width: 3;
      stroke-linejoin: round;
      stroke-linecap: round;
    }

    .route-fix {
      fill: ${theme.panel};
      stroke: ${theme.blue};
      stroke-width: 2;
    }

    .airport-pin {
      position: absolute;
      transform: translate(-50%, -100%);
      z-index: 40;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .pin-body {
      width: 18px;
      height: 18px;
      border-radius: 50% 50% 50% 0;
      background: ${theme.blue};
      transform: rotate(-45deg);
      box-shadow: 0 2px 5px rgba(0,0,0,.3);
    }

    .pin-body::after {
      content: "";
      position: absolute;
      width: 6px;
      height: 6px;
      left: 6px;
      top: 6px;
      border-radius: 50%;
      background: white;
    }

    .pin-code {
      background: ${dark ? "rgba(22,29,33,.9)" : "rgba(250,250,248,.94)"};
      border: 1px solid ${dark ? "rgba(72,144,190,.6)" : "rgba(35,133,186,.45)"};
      color: ${theme.text};
      border-radius: 2px;
      padding: 3px 6px;
      font-size: 10px;
      font-weight: 700;
    }

    .pin-departure {
      left: 18%;
      top: 28%;
    }

    .pin-destination {
      left: 79%;
      top: 74%;
    }

    .map-toolbar {
      position: absolute;
      right: 13px;
      top: 12px;
      z-index: 60;
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .map-toolbar button {
      width: 38px;
      height: 38px;
      display: grid;
      place-items: center;
      background: ${dark ? "rgba(25,31,35,.92)" : "rgba(248,248,246,.96)"};
      color: ${theme.text};
      border: 1px solid ${theme.border};
      cursor: pointer;
      border-radius: 3px;
    }

    .map-toolbar button:hover {
      border-color: ${theme.blue};
      color: ${theme.blue};
    }

    .map-top-label {
      position: absolute;
      left: 14px;
      top: 13px;
      z-index: 60;
      padding: 7px 10px;
      background: ${dark ? "rgba(21,27,31,.9)" : "rgba(249,249,247,.94)"};
      border: 1px solid ${theme.border};
      color: ${theme.text};
      font-size: 10px;
      letter-spacing: .08em;
      font-weight: 700;
    }

    .map-bottom {
      position: absolute;
      left: 12px;
      bottom: 12px;
      z-index: 60;
      display: flex;
      gap: 1px;
    }

    .map-bottom button {
      height: 34px;
      min-width: 52px;
      border: 1px solid ${theme.border};
      background: ${dark ? "rgba(24,31,35,.94)" : "rgba(248,248,246,.97)"};
      color: ${theme.muted};
      cursor: pointer;
      font-size: 10px;
      font-weight: 700;
    }

    .map-bottom button.active {
      background: ${theme.blue};
      border-color: ${theme.blue};
      color: white;
    }

    .detail-panel {
      position: absolute;
      right: 13px;
      bottom: 60px;
      width: min(430px, calc(100% - 26px));
      max-height: 45%;
      overflow: auto;
      z-index: 70;
      background: ${dark ? "rgba(22,28,32,.96)" : "rgba(250,250,248,.97)"};
      border: 1px solid ${theme.border};
      box-shadow: 0 12px 35px rgba(0,0,0,.25);
    }

    .detail-header {
      height: 43px;
      padding: 0 11px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid ${theme.border};
    }

    .detail-header strong {
      font-size: 11px;
    }

    .detail-body {
      padding: 11px;
    }

    .detail-route {
      font-size: 10px;
      line-height: 1.6;
      color: ${theme.text};
      word-break: break-word;
    }

    .detail-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 7px;
      margin-top: 11px;
    }

    .stat {
      padding: 8px;
      border: 1px solid ${theme.border};
      background: ${theme.panel2};
    }

    .stat small {
      display: block;
      color: ${theme.muted};
      font-size: 8px;
      margin-bottom: 3px;
    }

    .stat strong {
      font-size: 11px;
    }

    .import-overlay {
      position: fixed;
      inset: 0;
      z-index: 200;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0,0,0,.55);
      padding: 18px;
    }

    .import-dialog {
      width: min(460px, 100%);
      background: ${theme.panel};
      border: 1px solid ${theme.border};
      box-shadow: 0 20px 70px rgba(0,0,0,.4);
    }

    .import-header {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 13px;
      border-bottom: 1px solid ${theme.border};
    }

    .import-header strong {
      font-size: 12px;
    }

    .close-button {
      width: 32px;
      height: 32px;
      display: grid;
      place-items: center;
      background: transparent;
      color: ${theme.text};
      cursor: pointer;
    }

    .import-body {
      padding: 16px;
    }

    .input-label {
      display: block;
      margin-bottom: 7px;
      color: ${theme.muted};
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .06em;
    }

    .text-input {
      width: 100%;
      height: 40px;
      border: 1px solid ${theme.border};
      background: ${theme.bg};
      color: ${theme.text};
      padding: 0 10px;
      outline: none;
      font-size: 12px;
    }

    .text-input:focus {
      border-color: ${theme.blue};
    }

    .import-button {
      width: 100%;
      height: 40px;
      margin-top: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      border: 0;
      background: ${theme.blue};
      color: white;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
    }

    .import-button:disabled {
      opacity: .6;
      cursor: wait;
    }

    .error {
      margin-top: 10px;
      padding: 8px;
      border: 1px solid rgba(210,70,70,.45);
      background: rgba(180,50,50,.1);
      color: #d97a7a;
      font-size: 10px;
    }

    .planner-panel {
      position: absolute;
      left: 13px;
      top: 64px;
      z-index: 75;
      width: min(365px, calc(100% - 26px));
      max-height: 65%;
      overflow: auto;
      background: ${dark ? "rgba(22,28,32,.97)" : "rgba(250,250,248,.98)"};
      border: 1px solid ${theme.border};
      box-shadow: 0 12px 35px rgba(0,0,0,.25);
    }

    .planner-section {
      padding: 12px;
      border-bottom: 1px solid ${theme.border};
    }

    .planner-section:last-child {
      border-bottom: 0;
    }

    .planner-section h3 {
      margin: 0 0 8px;
      font-size: 11px;
    }

    .planner-section p {
      margin: 0 0 10px;
      color: ${theme.muted};
      font-size: 9px;
      line-height: 1.5;
    }

    .planner-actions {
      display: flex;
      gap: 6px;
    }

    .planner-actions button {
      flex: 1;
      height: 36px;
      border: 1px solid ${theme.border};
      background: ${theme.panel2};
      color: ${theme.text};
      cursor: pointer;
      font-size: 9px;
      font-weight: 650;
    }

    .planner-actions button.primary {
      background: ${theme.blue};
      color: white;
      border-color: ${theme.blue};
    }

    .chart-item {
      padding: 8px 0;
      border-top: 1px solid ${theme.border};
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .chart-item span {
      font-size: 9px;
      color: ${theme.muted};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .chart-item a {
      color: ${theme.blue};
      font-size: 9px;
      text-decoration: none;
    }

    @media (max-width: 850px) {
      .sidebar {
        width: 235px;
        min-width: 235px;
      }
    }

    @media (max-width: 650px) {
      .sidebar {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        z-index: 150;
        box-shadow: 10px 0 30px rgba(0,0,0,.35);
      }

      .cycle span:last-of-type,
      .profile {
        display: none;
      }

      .top-center {
        display: none;
      }

      .detail-panel {
        bottom: 55px;
      }
    }
  `;

  return (
    <div className="app" style={{
      "--bg": theme.bg,
      "--panel": theme.panel,
      "--panel2": theme.panel2,
      "--border": theme.border,
      "--text": theme.text,
      "--muted": theme.muted,
      "--blue": theme.blue,
    }}>
      <style>{css}</style>

      {/* TOP BAR */}
      <header className="topbar">
        <button
          className="top-menu"
          onClick={() => setFolderOpen((value) => !value)}
          aria-label="Toggle flight folder"
        >
          <Icon name="menu" />
        </button>

        <div className="cycle">
          <strong>
            {flight ? `Cycle ${flight.raw?.params?.airac || "—"}` : "Cycle —"}
          </strong>
          <i />
          <span>
            {flight
              ? `${displayAirport(flight.origin)} → ${displayAirport(flight.destination)}`
              : "Route not saved"}
          </span>
        </div>

        <div className="top-center">
          <Icon name="calendar" size={17} />
          <strong>{flight?.std || "00:00"}</strong>
        </div>

        <div className="top-right">
          <button className="top-action" title="Help">
            <Icon name="help" size={19} />
          </button>

          <button
            className="top-action"
            onClick={() => setDark((value) => !value)}
            title="Day / Night"
          >
            <Icon name={dark ? "sun" : "moon"} size={19} />
          </button>

          <div className="profile">
            <span>default</span>
            <i className="online" />
          </div>
        </div>
      </header>

      {/* WORKSPACE */}
      <div className="workspace">
        {folderOpen && (
          <aside className="sidebar">
            <div className="sidebar-header">
              <span className="sidebar-title">Flight Folder</span>

              <button
                className="more-button"
                onClick={() => setMenuOpen((value) => !value)}
              >
                <Icon name="more" />
              </button>

              {menuOpen && (
                <div className="sidebar-menu">
                  <button>
                    <Icon name="document" size={17} />
                    Share
                  </button>
                  <button
                    onClick={() => {
                      setSelectedContent("route");
                      setMenuOpen(false);
                    }}
                  >
                    <Icon name="document" size={17} />
                    Save
                  </button>
                  <button onClick={clearFlight}>
                    <Icon name="close" size={17} />
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setShowImport(true);
                      setMenuOpen(false);
                    }}
                  >
                    <Icon name="plus" size={17} />
                    New Flight
                  </button>
                </div>
              )}
            </div>

            <button
              className="new-flight"
              onClick={() => setShowImport(true)}
            >
              <Icon name="plus" size={17} />
              New Flight
            </button>

            <button
              className={`folder-row ${
                selectedContent === "departure" ? "active" : ""
              }`}
              onClick={() => setSelectedContent("departure")}
            >
              <div className="folder-icon">
                <Icon name="pin" size={22} />
              </div>

              <div className="folder-copy">
                <strong>
                  {flight ? displayAirport(flight.origin) : "Departure"}
                </strong>
                <small>
                  {flight
                    ? `${flight.origin.name || "Departure"}${
                        flight.origin.iata
                          ? ` · ${flight.origin.iata}`
                          : ""
                      }`
                    : "Add Departure"}
                </small>
              </div>

              <span className="arrow">›</span>
            </button>

            <button
              className={`folder-row ${
                selectedContent === "route" ? "active" : ""
              }`}
              onClick={() => setSelectedContent("route")}
            >
              <div className="folder-icon">
                <Icon name="route" size={23} />
              </div>

              <div className="folder-copy">
                <strong>Route</strong>
                <small>
                  {flight?.distance
                    ? `${flight.distance} NM`
                    : "No route loaded"}
                </small>
              </div>

              <span className="arrow">›</span>
            </button>

            <button
              className={`folder-row ${
                selectedContent === "destination" ? "active" : ""
              }`}
              onClick={() => setSelectedContent("destination")}
            >
              <div className="folder-icon">
                <Icon name="pin" size={22} />
              </div>

              <div className="folder-copy">
                <strong>
                  {flight ? displayAirport(flight.destination) : "Destination"}
                </strong>
                <small>
                  {flight
                    ? `${flight.destination.name || "Destination"}${
                        flight.destination.iata
                          ? ` · ${flight.destination.iata}`
                          : ""
                      }`
                    : "Add Destination"}
                </small>
              </div>

              <span className="arrow">›</span>
            </button>

            <button
              className="add-alternate"
              onClick={() => setSelectedContent("alternate")}
            >
              Add Alternate
            </button>

            <div className="separator" />

            <button
              className={`simple-row ${
                selectedContent === "documents" ? "active" : ""
              }`}
              onClick={() => setSelectedContent("documents")}
            >
              <Icon name="document" size={19} />
              <span>Documents</span>
              <span className="arrow">›</span>
            </button>

            <button
              className={`simple-row ${
                selectedContent === "notes" ? "active" : ""
              }`}
              onClick={() => setSelectedContent("notes")}
            >
              <Icon name="notes" size={19} />
              <span>Route Notes</span>
              <span className="arrow">›</span>
            </button>

            <button
              className={`simple-row ${
                selectedContent === "charts" ? "active" : ""
              }`}
              onClick={() => setSelectedContent("charts")}
            >
              <Icon name="document" size={19} />
              <span>Charts</span>
              <span className="arrow">›</span>
            </button>

            <div className="folder-spacer" />

            <div className="validity">
              <span>Validity</span>
              <strong>
                {flight ? "Up to date" : "No flight"}
              </strong>
            </div>
          </aside>
        )}

        <section className="map-shell">
          <div className="map">
            <div className="map-grid" />
            <div className="map-water" />
            <div className="map-country country-a" />
            <div className="map-country country-b" />
            <div className="map-country country-c" />

            <div className="map-text fir-text fir-a">LANGEN FIR · EDGG</div>
            <div className="map-text fir-text fir-b">KARLSRUHE FIR · EDUU</div>
            <div className="map-text fir-text fir-c">REIMS FIR · LFFF</div>
            <div className="map-text fir-text fir-d">MÜNCHEN FIR · EDMM</div>

            <div className="map-text" style={{ left: "22%", top: "28%" }}>
              DÜSSELDORF
            </div>
            <div className="map-text" style={{ left: "47%", top: "42%" }}>
              FRANKFURT
            </div>
            <div className="map-text" style={{ left: "75%", top: "67%" }}>
              ZÜRICH
            </div>

            <svg
              className="route-svg"
              viewBox="0 0 1200 800"
              preserveAspectRatio="none"
            >
              <path
                className="route-fir"
                d="M50 120 L300 80 L520 170 L790 130 L1120 280"
              />

              <path
                className="route-shadow"
                d={routePath || "M190 190 L380 300 L520 410 L660 520 L820 660"}
              />

              <path
                className="route-main"
                d={routePath || "M190 190 L380 300 L520 410 L660 520 L820 660"}
              />

              {mapPoints.slice(1, -1).map((point, index) => (
                <circle
                  key={`fix-${index}`}
                  className="route-fix"
                  cx={point.x * 12}
                  cy={point.y * 8}
                  r="5"
                />
              ))}
            </svg>

            <div className="airport-pin pin-departure">
              <div className="pin-body" />
              <span className="pin-code">
                {displayAirport(flight?.origin) !== "—"
                  ? displayAirport(flight.origin)
                  : "EDDL"}
              </span>
            </div>

            <div className="airport-pin pin-destination">
              <div className="pin-body" />
              <span className="pin-code">
                {displayAirport(flight?.destination) !== "—"
                  ? displayAirport(flight.destination)
                  : "LSZH"}
              </span>
            </div>

            <div className="map-top-label">
              {flight ? "ROUTE" : "ENROUTE"}
            </div>

            <div className="map-toolbar">
              <button title="Search">
                <Icon name="search" size={20} />
              </button>
              <button title="Center">
                <Icon name="target" size={20} />
              </button>
              <button title="Layers">
                <Icon name="layers" size={20} />
              </button>
              <button
                title="Planner Charts"
                onClick={() => setSelectedContent("charts")}
              >
                <Icon name="document" size={20} />
              </button>
              <button title="Route edit">
                <Icon name="pencil" size={20} />
              </button>
            </div>

            {/* CONTENT PANELS */}
            {selectedContent === "route" && flight && (
              <div className="detail-panel">
                <div className="detail-header">
                  <strong>Route</strong>
                  <button
                    className="close-button"
                    onClick={() => setSelectedContent("")}
                  >
                    <Icon name="close" size={16} />
                  </button>
                </div>

                <div className="detail-body">
                  <div className="detail-route">
                    {displayRoute}
                  </div>

                  <div className="detail-grid">
                    <div className="stat">
                      <small>Distance</small>
                      <strong>{flight.distance || "—"} NM</strong>
                    </div>

                    <div className="stat">
                      <small>Cruise</small>
                      <strong>{flight.cruise || "—"}</strong>
                    </div>

                    <div className="stat">
                      <small>Air Time</small>
                      <strong>{flight.airTime || "—"}</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedContent === "departure" && flight && (
              <div className="detail-panel">
                <div className="detail-header">
                  <strong>Departure</strong>
                  <button
                    className="close-button"
                    onClick={() => setSelectedContent("")}
                  >
                    <Icon name="close" size={16} />
                  </button>
                </div>

                <div className="detail-body">
                  <div className="detail-route">
                    <strong>{flight.origin.icao}</strong>
                    {flight.origin.name ? ` — ${flight.origin.name}` : ""}
                    {flight.origin.iata
                      ? ` · ${flight.origin.iata}`
                      : ""}
                  </div>

                  <div className="detail-grid">
                    <div className="stat">
                      <small>STD</small>
                      <strong>{flight.std || "—"}</strong>
                    </div>
                    <div className="stat">
                      <small>ETD</small>
                      <strong>{flight.etd || "—"}</strong>
                    </div>
                    <div className="stat">
                      <small>METAR</small>
                      <strong>{flight.originMetar ? "Loaded" : "—"}</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedContent === "destination" && flight && (
              <div className="detail-panel">
                <div className="detail-header">
                  <strong>Destination</strong>
                  <button
                    className="close-button"
                    onClick={() => setSelectedContent("")}
                  >
                    <Icon name="close" size={16} />
                  </button>
                </div>

                <div className="detail-body">
                  <div className="detail-route">
                    <strong>{flight.destination.icao}</strong>
                    {flight.destination.name
                      ? ` — ${flight.destination.name}`
                      : ""}
                    {flight.destination.iata
                      ? ` · ${flight.destination.iata}`
                      : ""}
                  </div>

                  <div className="detail-grid">
                    <div className="stat">
                      <small>STA</small>
                      <strong>{flight.sta || "—"}</strong>
                    </div>
                    <div className="stat">
                      <small>ETA</small>
                      <strong>{flight.eta || "—"}</strong>
                    </div>
                    <div className="stat">
                      <small>METAR</small>
                      <strong>
                        {flight.destinationMetar ? "Loaded" : "—"}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedContent === "alternate" && (
              <div className="detail-panel">
                <div className="detail-header">
                  <strong>Alternates</strong>
                  <button
                    className="close-button"
                    onClick={() => setSelectedContent("")}
                  >
                    <Icon name="close" size={16} />
                  </button>
                </div>

                <div className="detail-body">
                  {flight?.alternates?.length ? (
                    flight.alternates.map((alternate) => (
                      <div
                        key={alternate.icao}
                        className="chart-item"
                      >
                        <span>
                          {alternate.icao}
                          {alternate.iata
                            ? ` · ${alternate.iata}`
                            : ""}
                        </span>
                        <span>{alternate.name}</span>
                      </div>
                    ))
                  ) : (
                    <div className="detail-route">
                      No alternates available in the imported OFP.
                    </div>
                  )}
                </div>
              </div>
            )}

            {selectedContent === "documents" && (
              <div className="planner-panel">
                <div className="planner-section">
                  <h3>Documents</h3>
                  <p>
                    The imported SimBrief OFP is available as the
                    original SimBrief PDF when the OFP contains its
                    PDF download reference.
                  </p>

                  {flight?.pdfUrl ? (
                    <div className="planner-actions">
                      <button
                        className="primary"
                        onClick={() =>
                          window.open(
                            flight.pdfUrl,
                            "_blank",
                            "noopener,noreferrer"
                          )
                        }
                      >
                        <Icon name="document" size={16} />
                        Open OFP PDF
                      </button>
                    </div>
                  ) : (
                    <p>No OFP PDF link was returned by this OFP.</p>
                  )}
                </div>
              </div>
            )}

            {selectedContent === "charts" && (
              <div className="planner-panel">
                <div className="planner-section">
                  <h3>MSFS Flight Planner Charts</h3>
                  <p>
                    Open the official Microsoft Flight Planner to
                    access the LIDO airport charts available to your
                    linked MSFS account.
                  </p>

                  <input
                    className="text-input"
                    value={plannerAirport}
                    onChange={(event) =>
                      setPlannerAirport(event.target.value.toUpperCase())
                    }
                    placeholder={
                      flight?.destination?.icao || "Airport ICAO"
                    }
                  />

                  <div className="planner-actions" style={{ marginTop: 8 }}>
                    <button
                      className="primary"
                      onClick={() => openPlanner(plannerAirport)}
                    >
                      <Icon name="external" size={16} />
                      Open Flight Planner
                    </button>
                  </div>
                </div>

                <div className="planner-section">
                  <h3>Chart Import</h3>
                  <p>
                    The official planner requires your Microsoft/Xbox
                    or PlayStation account to be linked to MSFS 2024.
                    Until an official public chart endpoint is
                    available, this field lets us store direct chart
                    URLs without pretending we have access to a
                    private planner API.
                  </p>

                  <input
                    className="text-input"
                    value={chartName}
                    onChange={(event) =>
                      setChartName(event.target.value)
                    }
                    placeholder="Chart name"
                  />

                  <input
                    className="text-input"
                    style={{ marginTop: 7 }}
                    value={chartUrl}
                    onChange={(event) =>
                      setChartUrl(event.target.value)
                    }
                    placeholder="https://..."
                  />

                  <div className="planner-actions" style={{ marginTop: 8 }}>
                    <button onClick={saveManualChart}>
                      Save Chart URL
                    </button>
                  </div>

                  {savedCharts.map((chart, index) => (
                    <div
                      key={`${chart.url}-${index}`}
                      className="chart-item"
                    >
                      <span>
                        {chart.name}
                        {chart.airport ? ` · ${chart.airport}` : ""}
                      </span>

                      <a
                        href={chart.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedContent === "notes" && (
              <div className="planner-panel">
                <div className="planner-section">
                  <h3>Route Notes</h3>
                  <p>
                    Notes will be attached to waypoints in the next
                    navigation step. The panel is intentionally ready
                    for waypoint-specific notes.
                  </p>
                </div>
              </div>
            )}

            <div className="map-bottom">
              <button className="active">LOW</button>
              <button>HIGH</button>
            </div>
          </div>
        </section>
      </div>

      {/* IMPORT DIALOG */}
      {showImport && (
        <div
          className="import-overlay"
          onClick={() => !loading && setShowImport(false)}
        >
          <div
            className="import-dialog"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="import-header">
              <strong>Import SimBrief Flight</strong>

              <button
                className="close-button"
                onClick={() => !loading && setShowImport(false)}
              >
                <Icon name="close" size={18} />
              </button>
            </div>

            <div className="import-body">
              <label className="input-label">
                SimBrief Username
              </label>

              <input
                className="text-input"
                value={simbriefUsername}
                onChange={(event) =>
                  setSimbriefUsername(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    importSimBrief();
                  }
                }}
                placeholder="Enter your SimBrief username"
                autoFocus
              />

              <button
                className="import-button"
                onClick={importSimBrief}
                disabled={loading}
              >
                <Icon
                  name={loading ? "refresh" : "download"}
                  size={17}
                />
                {loading ? "Importing OFP…" : "Import Latest OFP"}
              </button>

              {importError && (
                <div className="error">
                  {importError}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
