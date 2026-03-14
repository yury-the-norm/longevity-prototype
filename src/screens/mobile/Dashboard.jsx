import { useState } from 'react'
import { motion } from 'framer-motion'

// ── Exact data from Figma Dashboard (250:275) ─────────────────────────
const BIO = { bioAge: 43, actualAge: 40, delta: 3, score: 82 }

// Key metrics: status = dot color, trend = arrow (critical=red border+dot, monitor/optimal = dark bg)
const KEY_METRICS = [
  { label: 'HRV Trend',      value: '42 ms',    status: 'critical', trend: 'down' },
  { label: 'Sleep Duration', value: '6.2h',     status: 'monitor',   trend: 'down' },
  { label: 'Body Fat %',     value: '18%',      status: 'optimal',  trend: 'up' },
  { label: 'HbA1c',         value: '5.1%',     status: 'optimal',  trend: 'up' },
  { label: 'VO₂ Max',        value: '48 ml/kg', status: 'optimal',   trend: 'up' },
]
const STATUS_COLOR = { critical: '#ff2056', monitor: '#e6b800', optimal: '#4ade80' }

// Health categories: exact fills from Figma
// Metabolic:#ff6b6b, Recovery:#e67e22, Physique:#e67e22, Performance:#e67e22, Mobility:#fdfffc, Cognitive:#fdfffc
const HEALTH_CATS = [
  { label: 'Metabolic Health',          score: 62, fill: '#ff6b6b',            labelColor: '#ff6b6b' },
  { label: 'Recovery & Nervous System', score: 66, fill: '#e67e22',            labelColor: '#ff6b6b' },
  { label: 'Physique & Muscle',         score: 78, fill: '#e67e22',            labelColor: '#ffffff' },
  { label: 'Performance Capacity',      score: 74, fill: '#e67e22',            labelColor: '#ffffff' },
  { label: 'Mobility & Function',       score: 85, fill: '#fdfffc',            labelColor: '#ffffff' },
  { label: 'Cognitive Function',        score: 81, fill: '#fdfffc',            labelColor: '#ffffff' },
]

// Bioage center decoration — overlapping luminous teal/blue ovals
function BioageRing({ size = 100 }) {
  const cx = size / 2
  const cy = size / 2
  const scale = size / 100
  const ovals = [
    { rx: 38, ry: 42, stroke: '#8ED1E7', opacity: 0.5 },
    { rx: 42, ry: 36, stroke: '#69B3D3', opacity: 0.45 },
    { rx: 36, ry: 40, stroke: '#7BC4D9', opacity: 0.4 },
    { rx: 40, ry: 38, stroke: '#8ED1E7', opacity: 0.35 },
    { rx: 34, ry: 44, stroke: '#69B3D3', opacity: 0.3 },
  ]
  return (
    <svg width={size} height={size} style={{ position: 'absolute', inset: 0 }}>
      {ovals.map((o, i) => (
        <ellipse
          key={i}
          cx={cx}
          cy={cy}
          rx={o.rx * scale}
          ry={o.ry * scale}
          fill="none"
          stroke={o.stroke}
          strokeWidth={1.2}
          strokeOpacity={o.opacity}
          transform={`rotate(${i * 22} ${cx} ${cy})`}
        />
      ))}
    </svg>
  )
}

const FILTERS = ['Critical', 'Monitor', 'Optimal']

export default function Dashboard({ onMetricClick, annotationsVisible }) {
  const [filter, setFilter] = useState('Monitor')

  return (
    <div style={{
      width: '100%', height: '100%',
      overflowY: 'auto', overflowX: 'hidden',
      background: 'linear-gradient(160deg, #1c1d21 0%, #0e0e12 100%)',
      paddingBottom: 88,
    }}>
      {annotationsVisible && <div className="annotation-badge" style={{ position: 'sticky', top: 0, zIndex: 99 }}>MOB-07 · Dashboard</div>}

      {/* ── Header ── */}
      <div style={{ padding: '54px 24px 0' }}>
        <div style={{ fontSize: 24, fontWeight: 600, color: '#ffffff', letterSpacing: '0.02em', lineHeight: 1.2, textTransform: 'uppercase' }}>
          Performance &amp; Longevity
        </div>
        <div style={{ fontSize: 12, color: 'rgba(253,255,252,0.55)', marginTop: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Digital Twin Approach
        </div>
      </div>

      {/* ── Bio Age Card (no frame, no chart, larger elements) ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        style={{
          margin: '20px 24px 0',
          padding: '24px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: 326 }}>
          {/* Left: Longevity score — 82 / 100 + longevity score */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
              <span style={{ fontSize: 34, fontWeight: 300, color: '#ffffff', lineHeight: 1 }}>{BIO.score}</span>
              <span style={{ fontSize: 15, fontWeight: 400, color: 'rgba(253,255,252,0.6)', lineHeight: 1 }}> / 100</span>
            </div>
            <div style={{ fontSize: 10, color: 'rgba(253,255,252,0.5)', marginTop: 5, textTransform: 'lowercase' }}>longevity score</div>
          </div>

          {/* Center: Bioage — 43 (largest) + BIOAGE */}
          <div style={{ position: 'relative', width: 130, height: 130, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <BioageRing size={130} />
            <span style={{ position: 'relative', zIndex: 1, fontSize: 58, fontWeight: 600, color: '#ffffff', lineHeight: 1 }}>{BIO.bioAge}</span>
            <div style={{ position: 'relative', zIndex: 1, fontSize: 10, fontWeight: 500, color: '#ffffff', letterSpacing: '0.08em', marginTop: 4 }}>BIOAGE</div>
          </div>

          {/* Right: 3 yrs older + actual age: 40 yrs */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
              <span style={{ fontSize: 30, fontWeight: 600, color: '#FF9999', lineHeight: 1 }}>{BIO.delta}</span>
              <span style={{ fontSize: 13, fontWeight: 400, color: 'rgba(253,255,252,0.6)', lineHeight: 1 }}> yrs older</span>
            </div>
            <div style={{ fontSize: 10, color: 'rgba(253,255,252,0.5)', marginTop: 5 }}>actual age: {BIO.actualAge} yrs</div>
          </div>
        </div>
      </motion.div>

      {/* ── Add more data (horizontal card, no border, icon + text + chevron) ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        style={{
          margin: '16px 24px 0',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: 14, padding: '16px 18px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14,
        }}
      >
        <div style={{ width: 36, height: 36, flexShrink: 0, color: 'rgba(253,255,252,0.5)' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
          </svg>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 500, color: '#ffffff' }}>Add more data</div>
          <div style={{ fontSize: 11, color: 'rgba(253,255,252,0.5)', marginTop: 2 }}>Improve longevity score accuracy</div>
        </div>
        <div style={{ color: 'rgba(253,255,252,0.45)', flexShrink: 0 }}>
          <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
        </div>
      </motion.div>

      {/* ── Get Your Personalized Plan ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
        style={{ margin: '20px 24px 0' }}
      >
        <div style={{ fontSize: 16, fontWeight: 600, color: '#ffffff', marginBottom: 8 }}>Get Your Personalized Plan</div>
        <div style={{ fontSize: 12, color: 'rgba(253,255,252,0.55)', lineHeight: 1.55, marginBottom: 18 }}>
          Your data will be analyzed by your coach to build a personalized plan to help you achieve your goals and improve longevity, performance, and health.
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          style={{
            width: '100%', padding: '14px 24px',
            background: 'linear-gradient(135deg, #78a0d1, #78c8c9)',
            border: 'none', borderRadius: 373,
            color: '#ffffff', fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
            cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          GET PLAN
        </motion.button>
      </motion.div>

      {/* ── Legend: Critical / Monitor / Optimal (colored dots) ── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
        style={{ margin: '20px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, height: 37, borderRadius: 14 }}
      >
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'inherit', fontSize: 12, fontWeight: 500, color: '#ffffff',
            transition: 'opacity 0.15s', outline: 'none',
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: STATUS_COLOR[f.toLowerCase()] }} />
            {f}
          </button>
        ))}
      </motion.div>

      {/* ── Key Metrics (KEY METRICS + gear icon, cards with status dot and trend arrow) ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        style={{ margin: '16px 24px 0' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#ffffff', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Key metrics</span>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: 'rgba(253,255,252,0.6)' }} aria-label="Settings">
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {KEY_METRICS.map((m, i) => (
            <motion.div
              key={i}
              whileTap={{ scale: 0.96 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 + i * 0.05 }}
              onClick={onMetricClick}
              style={{
                padding: '16px',
                background: m.status === 'critical' ? 'rgba(255,32,86,0.08)' : 'rgba(255,255,255,0.04)',
                border: m.status === 'critical' ? '1px solid rgba(255,32,86,0.4)' : 'none',
                borderRadius: 14, cursor: 'pointer',
                gridColumn: i === 4 ? 'span 2' : 'auto',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: STATUS_COLOR[m.status], flexShrink: 0 }} />
                <span style={{ fontSize: 12, fontWeight: 500, color: '#ffffff' }}>{m.label}</span>
              </div>
              <div style={{ fontSize: 20, fontWeight: 600, color: '#ffffff' }}>{m.value}</div>
              <div style={{ position: 'absolute', right: 12, bottom: 12, color: m.trend === 'down' && m.status === 'critical' ? '#ff2056' : '#4ade80' }}>
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: m.trend === 'down' ? 'rotate(0deg)' : 'rotate(180deg)' }}><path d="M18 15l-6-6-6 6" /></svg>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Health Categories ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        style={{ margin: '20px 24px 0' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontSize: 12, color: 'rgba(253,255,252,0.5)' }}>Health categories</span>
          <span style={{ fontSize: 12, color: 'rgba(253,255,252,0.35)' }}>max score: 100</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {HEALTH_CATS.map((cat, i) => (
            <motion.div
              key={i}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.32 + i * 0.05 }}
              style={{
                padding: '14px',
                background: `${cat.fill}12`,
                border: `1px solid ${cat.fill}28`,
                borderRadius: 14, cursor: 'pointer',
              }}
            >
              <div style={{
                fontSize: 14, fontWeight: 400,
                color: cat.labelColor, lineHeight: 1.4, marginBottom: 10,
              }}>
                {cat.label}
              </div>
              <div style={{ fontSize: 24, fontWeight: 400, color: '#ffffff' }}>
                {cat.score}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
