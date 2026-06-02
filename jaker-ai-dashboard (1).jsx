import { useState, useEffect } from "react";

const sectors = [
  {
    id: "industria",
    label: "INDUSTRIA",
    sublabel: "& Construcción",
    icon: "⚙",
    color: "#FF6B2B",
    glow: "rgba(255,107,43,0.4)",
    tecnologias: [
      "IA Predictiva",
      "Drones Autónomos",
      "Sensores IoT",
      "Telemetría",
      "Análisis Combustible",
      "Detección de Robo",
      "Visión Artificial",
    ],
    beneficios: [
      "Menos pérdidas operativas",
      "Mayor productividad",
      "Seguridad predictiva",
      "Optimización logística",
    ],
    kpis: [
      { label: "REDUCCIÓN DE PÉRDIDAS", value: "38%", trend: "↓" },
      { label: "EFICIENCIA OPERATIVA", value: "94%", trend: "↑" },
      { label: "TIEMPO DE RESPUESTA", value: "0.3s", trend: "↓" },
    ],
  },
  {
    id: "agro",
    label: "AGRO AI",
    sublabel: "Agricultura Inteligente",
    icon: "◈",
    color: "#2BFF8C",
    glow: "rgba(43,255,140,0.4)",
    tecnologias: [
      "Predicción Climática",
      "Monitoreo de Cultivos",
      "Optimización de Agua",
      "Detección de Plagas",
      "Análisis Satelital",
    ],
    beneficios: [
      "Mayor rendimiento",
      "Menor pérdida de cosecha",
      "Uso eficiente del agua",
      "Control preventivo de plagas",
    ],
    kpis: [
      { label: "RENDIMIENTO COSECHA", value: "+52%", trend: "↑" },
      { label: "USO DE AGUA", value: "-41%", trend: "↓" },
      { label: "PÉRDIDA EVITADA", value: "76%", trend: "↑" },
    ],
  },
  {
    id: "ganaderia",
    label: "GANADERÍA",
    sublabel: "Monitoreo Inteligente",
    icon: "◉",
    color: "#FFD93D",
    glow: "rgba(255,217,61,0.4)",
    tecnologias: [
      "Monitoreo Animal",
      "Control de Temperatura",
      "Producción Leche/Huevo",
      "Detección de Enfermedades",
    ],
    beneficios: [
      "Mayor eficiencia",
      "Reducción de mortalidad",
      "Control sanitario",
      "Trazabilidad completa",
    ],
    kpis: [
      { label: "MORTALIDAD REDUCIDA", value: "-67%", trend: "↓" },
      { label: "PRODUCCIÓN LÁCTEA", value: "+29%", trend: "↑" },
      { label: "ALERTAS SANITARIAS", value: "Real-time", trend: "→" },
    ],
  },
  {
    id: "pesca",
    label: "PESCA",
    sublabel: "Operaciones Marítimas",
    icon: "◇",
    color: "#4FC3F7",
    glow: "rgba(79,195,247,0.4)",
    tecnologias: [
      "Análisis Marítimo",
      "Clima Predictivo",
      "Detección de Cardúmenes",
      "Optimización Combustible",
    ],
    beneficios: [
      "Menor desperdicio",
      "Mayor productividad",
      "Rutas optimizadas",
      "Seguridad en alta mar",
    ],
    kpis: [
      { label: "COMBUSTIBLE AHORRADO", value: "33%", trend: "↓" },
      { label: "CAPTURA EFICIENTE", value: "+44%", trend: "↑" },
      { label: "DESPERDICIO", value: "-58%", trend: "↓" },
    ],
  },
];

function PulseRing({ color }) {
  return (
    <div style={{ position: "relative", width: 12, height: 12 }}>
      <div style={{
        width: 8, height: 8, borderRadius: "50%",
        background: color, position: "absolute",
        top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        boxShadow: `0 0 6px ${color}`,
      }} />
      <div style={{
        width: 12, height: 12, borderRadius: "50%",
        border: `1px solid ${color}`,
        position: "absolute", top: 0, left: 0,
        animation: "pulse 1.5s ease-out infinite",
        opacity: 0.5,
      }} />
    </div>
  );
}

function StatBar({ value, color }) {
  const num = parseInt(value.replace(/[^0-9]/g, "")) || 50;
  const pct = Math.min(num, 100);
  return (
    <div style={{ height: 3, background: "#1a1a2e", borderRadius: 2, overflow: "hidden" }}>
      <div style={{
        height: "100%", width: `${pct}%`,
        background: `linear-gradient(90deg, ${color}88, ${color})`,
        borderRadius: 2,
        animation: "barGrow 1.2s ease-out forwards",
        transformOrigin: "left",
      }} />
    </div>
  );
}

function SectorCard({ sector, isActive, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: isActive
        ? `linear-gradient(135deg, ${sector.color}18 0%, ${sector.color}08 100%)`
        : "rgba(255,255,255,0.02)",
      border: `1px solid ${isActive ? sector.color : "#ffffff18"}`,
      borderRadius: 2,
      padding: "20px 22px",
      cursor: "pointer",
      textAlign: "left",
      transition: "all 0.3s ease",
      boxShadow: isActive ? `0 0 30px ${sector.glow}, inset 0 0 20px ${sector.color}05` : "none",
      position: "relative",
      overflow: "hidden",
    }}>
      {isActive && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(90deg, transparent, ${sector.color}, transparent)`,
        }} />
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <span style={{
          fontSize: 22, color: sector.color,
          filter: isActive ? `drop-shadow(0 0 8px ${sector.color})` : "none",
          transition: "filter 0.3s",
        }}>{sector.icon}</span>
        <div>
          <div style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 11, fontWeight: 700,
            letterSpacing: "0.18em",
            color: isActive ? sector.color : "#888",
            transition: "color 0.3s",
          }}>{sector.label}</div>
          <div style={{ fontSize: 9, color: "#444", letterSpacing: "0.05em", fontFamily: "monospace" }}>
            {sector.sublabel}
          </div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <PulseRing color={isActive ? sector.color : "#333"} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {sector.kpis.slice(0, 2).map((k, i) => (
          <div key={i} style={{
            background: `${sector.color}10`,
            border: `1px solid ${sector.color}30`,
            borderRadius: 1,
            padding: "2px 7px",
            fontFamily: "monospace",
            fontSize: 9,
            color: sector.color,
            letterSpacing: "0.05em",
          }}>
            {k.trend} {k.value}
          </div>
        ))}
      </div>
    </button>
  );
}

function DetailPanel({ sector }) {
  const [tab, setTab] = useState("tech");

  return (
    <div style={{
      background: `linear-gradient(135deg, ${sector.color}0a 0%, transparent 60%)`,
      border: `1px solid ${sector.color}40`,
      borderRadius: 2,
      padding: "28px 32px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Corner accent */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: 60, height: 60,
        borderLeft: `1px solid ${sector.color}30`,
        borderBottom: `1px solid ${sector.color}30`,
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0,
        width: 40, height: 40,
        borderRight: `1px solid ${sector.color}20`,
        borderTop: `1px solid ${sector.color}20`,
      }} />

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <span style={{
            fontSize: 32, filter: `drop-shadow(0 0 12px ${sector.color})`,
          }}>{sector.icon}</span>
          <div>
            <div style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 18, fontWeight: 700,
              letterSpacing: "0.2em",
              color: sector.color,
            }}>{sector.label}</div>
            <div style={{ color: "#555", fontSize: 10, letterSpacing: "0.1em", fontFamily: "monospace" }}>
              {sector.sublabel.toUpperCase()}
            </div>
          </div>
        </div>
        <div style={{ height: 1, background: `linear-gradient(90deg, ${sector.color}60, transparent)`, marginTop: 14 }} />
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
        {sector.kpis.map((k, i) => (
          <div key={i} style={{
            background: "rgba(0,0,0,0.3)",
            border: `1px solid ${sector.color}25`,
            borderRadius: 1,
            padding: "12px 14px",
          }}>
            <div style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 20, fontWeight: 700,
              color: sector.color,
              marginBottom: 4,
              textShadow: `0 0 20px ${sector.color}60`,
            }}>{k.value}</div>
            <div style={{ fontSize: 8, color: "#555", letterSpacing: "0.12em", fontFamily: "monospace" }}>
              {k.label}
            </div>
            <div style={{ marginTop: 8 }}>
              <StatBar value={k.value} color={sector.color} />
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, marginBottom: 16, borderBottom: "1px solid #ffffff10" }}>
        {["tech", "beneficios"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            background: "none",
            border: "none",
            borderBottom: tab === t ? `2px solid ${sector.color}` : "2px solid transparent",
            color: tab === t ? sector.color : "#444",
            padding: "6px 16px",
            fontFamily: "monospace",
            fontSize: 9,
            letterSpacing: "0.15em",
            cursor: "pointer",
            textTransform: "uppercase",
            transition: "all 0.2s",
            marginBottom: -1,
          }}>{t === "tech" ? "TECNOLOGÍAS" : "BENEFICIOS"}</button>
        ))}
      </div>

      {/* Content */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {(tab === "tech" ? sector.tecnologias : sector.beneficios).map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "8px 12px",
            background: `${sector.color}08`,
            border: `1px solid ${sector.color}15`,
            borderRadius: 1,
            animation: `fadeSlide 0.3s ease-out ${i * 0.05}s both`,
          }}>
            <div style={{ width: 4, height: 4, background: sector.color, borderRadius: "50%", flexShrink: 0 }} />
            <span style={{ fontFamily: "monospace", fontSize: 10, color: "#bbb", letterSpacing: "0.05em" }}>
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function JakerAIDashboard() {
  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0);
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1);
      setTime(new Date().toLocaleTimeString("es-MX", { hour12: false }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const activeSector = sectors[active];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#050508",
      color: "#e0e0e0",
      fontFamily: "'Courier New', monospace",
      padding: "32px",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes barGrow {
          from { width: 0; }
        }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scanline {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        * { box-sizing: border-box; }
        button:hover { opacity: 0.85; }
      `}</style>

      {/* Scanline effect */}
      <div style={{
        position: "fixed", left: 0, right: 0, height: "3px",
        background: "linear-gradient(transparent, rgba(255,255,255,0.015), transparent)",
        animation: "scanline 8s linear infinite",
        pointerEvents: "none", zIndex: 999,
      }} />

      {/* Grid background */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 36, borderBottom: "1px solid #ffffff12", paddingBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 6 }}>
                <div style={{
                  width: 8, height: 8, background: "#FF6B2B",
                  boxShadow: "0 0 12px #FF6B2B",
                  animation: "pulse 2s ease-out infinite",
                }} />
                <span style={{
                  fontSize: 26, fontWeight: 900, letterSpacing: "0.25em",
                  color: "#fff",
                  textShadow: "0 0 40px rgba(255,255,255,0.15)",
                }}>JAKER AI</span>
                <span style={{
                  fontSize: 9, letterSpacing: "0.2em", color: "#444",
                  border: "1px solid #333", padding: "3px 8px",
                }}>INDUSTRIAL PLATFORM</span>
              </div>
              <div style={{ color: "#333", fontSize: 9, letterSpacing: "0.15em" }}>
                AUTOR: JUAN MANUEL SILVARDZ · REG. 0101-2024 · SILVA RESEARCH INITIATIVE
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{
                fontSize: 22, fontWeight: 700, color: activeSector.color,
                textShadow: `0 0 20px ${activeSector.color}`,
                letterSpacing: "0.1em",
              }}>{time || "00:00:00"}<span style={{ animation: "blink 1s step-end infinite" }}>_</span></div>
              <div style={{ fontSize: 8, color: "#333", letterSpacing: "0.1em", marginTop: 2 }}>
                SISTEMA ACTIVO · INTELIGENCIA PREDICTIVA
              </div>
            </div>
          </div>
        </div>

        {/* Sector nav */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20 }}>
          {sectors.map((s, i) => (
            <SectorCard key={s.id} sector={s} isActive={active === i} onClick={() => setActive(i)} />
          ))}
        </div>

        {/* Detail panel */}
        <DetailPanel sector={activeSector} />

        {/* Footer */}
        <div style={{
          marginTop: 20,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          borderTop: "1px solid #ffffff08", paddingTop: 14,
        }}>
          <div style={{ fontSize: 8, color: "#2a2a2a", letterSpacing: "0.12em" }}>
            © JAKER AI · MENTELOGICA · PLATAFORMA CONCEPTUAL DE INTELIGENCIA PREDICTIVA
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            {["IoT ACTIVO", "IA ONLINE", "DRONES EN LÍNEA"].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: activeSector.color, boxShadow: `0 0 6px ${activeSector.color}` }} />
                <span style={{ fontSize: 7, color: "#333", letterSpacing: "0.1em" }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
