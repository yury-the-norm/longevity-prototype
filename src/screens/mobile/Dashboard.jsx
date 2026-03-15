import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

// ── Data ─────────────────────────────────────────────────────────────────────
const BIO = { bioAge: 43, actualAge: 40, delta: 3, score: 82 }

const KEY_METRICS = [
  { id:'hrv',     label:'HRV Trend',      value:'42 ms',    isAlert:true,  unit:'ms',       trend:'down',
    history:[{d:'M',v:58},{d:'T',v:52},{d:'W',v:49},{d:'T',v:44},{d:'F',v:42},{d:'S',v:45},{d:'S',v:42}],
    color:'#ff6b6b', ref:'>50 ms', status:'critical', desc:'Below baseline — recovery needed' },
  { id:'sleep',   label:'Sleep Duration', value:'6.2h',     isAlert:false, unit:'h',        trend:'down',
    history:[{d:'M',v:7.2},{d:'T',v:6.8},{d:'W',v:7.1},{d:'T',v:6.5},{d:'F',v:6.0},{d:'S',v:7.5},{d:'S',v:6.2}],
    color:'#e67e22', ref:'>7h', status:'warn', desc:'Slightly below 7h target' },
  { id:'bodyfat', label:'Body Fat %',     value:'18%',      isAlert:false, unit:'%',
    history:[{d:'W1',v:22.1},{d:'W2',v:21.2},{d:'W3',v:20.5},{d:'W4',v:19.8},{d:'W5',v:19.2},{d:'W6',v:18.6},{d:'W7',v:18.0}],
    color:'#e67e22', ref:'12-18%', status:'warn', desc:'At upper boundary — monitor' },
  { id:'hba1c',   label:'HbA1c',          value:'5.1%',     isAlert:false, unit:'%',
    history:[{d:'Q1',v:5.5},{d:'Q2',v:5.4},{d:'Q3',v:5.3},{d:'Q4',v:5.1}],
    color:'#05df72', ref:'<5.7%', status:'optimal', desc:'Well within optimal range' },
  { id:'vo2',     label:'VO₂ Max',        value:'48 ml/kg', isAlert:false, unit:'ml/kg/min',
    history:[{d:'Jan',v:44},{d:'Feb',v:45},{d:'Mar',v:46},{d:'Apr',v:47},{d:'May',v:48}],
    color:'#05df72', ref:'>42', status:'optimal', desc:'Above average for age group' },
]

const HEALTH_CATS = [
  { label:'Metabolic Health',          score:62, fill:'#ff6b6b', status:'critical' },
  { label:'Recovery & Nervous System', score:66, fill:'#e67e22', status:'warn' },
  { label:'Physique & Muscle',         score:78, fill:'#e67e22', status:'warn' },
  { label:'Performance Capacity',      score:74, fill:'#e67e22', status:'warn' },
  { label:'Mobility & Function',       score:85, fill:'#05df72', status:'optimal' },
  { label:'Cognitive Function',        score:81, fill:'#78c8c9', status:'optimal' },
]

const statusColor = { critical:'#ff6b6b', warn:'#e67e22', optimal:'#05df72' }

// ── Bio Age Ring ─────────────────────────────────────────────────────────────
function BioageRing({ size = 130 }) {
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
      <motion.g
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        {ovals.map((o, i) => (
          <motion.ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx={o.rx * scale}
            ry={o.ry * scale}
            fill="none"
            stroke={o.stroke}
            strokeWidth={1.2}
            strokeOpacity={o.opacity}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              opacity: { duration: 0.33, delay: 0.1 + i * 0.05 },
              scale: { duration: 0.33, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] },
            }}
            style={{
              transformOrigin: `${cx}px ${cy}px`,
              transform: `rotate(${i * 22}deg)`,
            }}
          />
        ))}
      </motion.g>
    </svg>
  )
}

// ── Category arc ring ─────────────────────────────────────────────────────────
function CategoryRing({ score, color, size = 44 }) {
  const cx = size / 2, cy = size / 2
  const r = (size - 6) / 2
  const toRad = d => (d * Math.PI) / 180
  // 270° arc: starts bottom-left (135°), clockwise to bottom-right (45°), gap at bottom
  const s = 135
  const startX = +(cx + r * Math.cos(toRad(s))).toFixed(2)
  const startY = +(cy + r * Math.sin(toRad(s))).toFixed(2)
  const endX   = +(cx + r * Math.cos(toRad(s + 270))).toFixed(2)
  const endY   = +(cy + r * Math.sin(toRad(s + 270))).toFixed(2)
  const arcPath = `M ${startX} ${startY} A ${r} ${r} 0 1 1 ${endX} ${endY}`
  return (
    <svg width={size} height={size}>
      <path d={arcPath} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={3} strokeLinecap="round" />
      <motion.path
        d={arcPath} fill="none" stroke={color} strokeWidth={3} strokeLinecap="round"
        pathLength={100} strokeDasharray={100}
        initial={{ strokeDashoffset: 100 }}
        animate={{ strokeDashoffset: 100 - score }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
      />
    </svg>
  )
}

// ── Metric detail modal ───────────────────────────────────────────────────────
function MetricModal({ metric, onClose }) {
  const isBar = metric.history.length <= 5
  return (
    <motion.div
      initial={{ opacity:0, y:'100%' }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:'100%' }}
      transition={{ duration:0.3, ease:[0.22,1,0.36,1] }}
      style={{ position:'absolute', inset:0, background:'linear-gradient(160deg,#1c1d21,#0e0e12)',
        zIndex:50, overflowY:'auto', paddingBottom:40 }}>
      <div style={{ padding:'54px 24px 0', display:'flex', alignItems:'center', gap:14, marginBottom:24 }}>
        <motion.button whileTap={{ scale:0.9 }} onClick={onClose}
          style={{ width:36, height:36, borderRadius:'50%', flexShrink:0,
            background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)',
            display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', outline:'none' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(253,255,252,0.8)" strokeWidth="2" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </motion.button>
        <div>
          <div style={{ fontSize:22, fontWeight:500, color:'#fdfffc', letterSpacing:'-0.02em' }}>{metric.label}</div>
          <div style={{ fontSize:12, color:statusColor[metric.status], marginTop:2 }}>{metric.desc}</div>
        </div>
      </div>
      <div style={{ margin:'0 24px 24px', padding:'20px', background:'rgba(255,255,255,0.04)',
        border:`1px solid ${metric.color}30`, borderRadius:16, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div>
          <div style={{ fontSize:11, color:'rgba(253,255,252,0.45)', marginBottom:4, textTransform:'uppercase', letterSpacing:'0.06em' }}>Current</div>
          <div style={{ fontSize:36, fontWeight:200, color:metric.color }}>{metric.value}</div>
        </div>
        <div style={{ textAlign:'right' }}>
          <div style={{ fontSize:11, color:'rgba(253,255,252,0.45)', marginBottom:4, textTransform:'uppercase', letterSpacing:'0.06em' }}>Reference</div>
          <div style={{ fontSize:14, color:'rgba(253,255,252,0.7)' }}>{metric.ref}</div>
          <div style={{ marginTop:6, padding:'3px 10px', borderRadius:4,
            background:`${statusColor[metric.status]}15`, border:`1px solid ${statusColor[metric.status]}30`,
            fontSize:11, color:statusColor[metric.status], textTransform:'capitalize' }}>
            {metric.status}
          </div>
        </div>
      </div>
      <div style={{ margin:'0 24px', padding:'16px', background:'rgba(255,255,255,0.04)',
        border:'1px solid rgba(255,255,255,0.07)', borderRadius:16 }}>
        <div style={{ fontSize:13, fontWeight:500, color:'rgba(253,255,252,0.7)', marginBottom:16 }}>Trend</div>
        <div style={{ height:160 }}>
          <ResponsiveContainer width="100%" height="100%">
            {isBar ? (
              <BarChart data={metric.history} barSize={32}>
                <XAxis dataKey="d" tick={{ fontSize:10, fill:'rgba(253,255,252,0.4)' }} axisLine={false} tickLine={false} />
                <YAxis hide domain={['dataMin - 2','dataMax + 2']} />
                <Tooltip contentStyle={{ background:'#1c1d21', border:`1px solid ${metric.color}40`, borderRadius:8, fontSize:11, color:'#fdfffc' }} />
                <Bar dataKey="v" radius={[4,4,0,0]} fill={metric.color} fillOpacity={0.8} />
              </BarChart>
            ) : (
              <AreaChart data={metric.history}>
                <defs>
                  <linearGradient id={`mg${metric.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={metric.color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={metric.color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="d" tick={{ fontSize:10, fill:'rgba(253,255,252,0.4)' }} axisLine={false} tickLine={false} />
                <YAxis hide domain={['dataMin - 2','dataMax + 2']} />
                <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
                <Tooltip contentStyle={{ background:'#1c1d21', border:`1px solid ${metric.color}40`, borderRadius:8, fontSize:11, color:'#fdfffc' }} />
                <Area type="monotone" dataKey="v" stroke={metric.color} strokeWidth={2}
                  fill={`url(#mg${metric.id})`} dot={false} isAnimationActive />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  )
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
export default function Dashboard({ onMetricClick, annotationsVisible }) {
  const [activeMetric, setActiveMetric] = useState(null)

  return (
    <div style={{ width:'100%', height:'100%', position:'relative', overflow:'hidden' }}>
      <div style={{ overflowY:'auto', height:'100%',
        background:'linear-gradient(160deg,#1c1d21 0%,#0e0e12 100%)', paddingBottom:88 }}>

        {annotationsVisible && (
          <div className="annotation-badge" style={{ position:'sticky', top:0, zIndex:99 }}>MOB-07 · Dashboard</div>
        )}

        {/* ── Header ── */}
        <div style={{ padding:'54px 24px 0' }}>
          <div style={{ fontSize:22, fontWeight:600, color:'#fdfffc', letterSpacing:'0.04em',
            textTransform:'uppercase', lineHeight:1.2 }}>
            Performance &amp; Longevity
          </div>
          <div style={{ fontSize:11, color:'rgba(253,255,252,0.4)', marginTop:5,
            letterSpacing:'0.08em', textTransform:'uppercase' }}>
            Digital Twin approach
          </div>
        </div>

        {/* ── Bio Age Card ── */}
        <div
          className="bio-age-card"
          style={{
            margin: '20px 24px 0',
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'transparent',
            border: 'none',
            boxShadow: 'none',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: 326 }}
          >
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
              <span style={{ position: 'relative', zIndex: 1, fontSize: 54, fontWeight: 300, color: '#ffffff', lineHeight: 1 }}>{BIO.bioAge}</span>
              <div style={{ position: 'relative', zIndex: 1, fontSize: 10, fontWeight: 500, color: '#ffffff', letterSpacing: '0.08em', marginTop: 4 }}>BIOAGE</div>
            </div>

            {/* Right: 3 yrs older + actual age: 40 yrs */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                <span style={{ fontSize: 30, fontWeight: 300, color: '#FF9999', lineHeight: 1 }}>{BIO.delta}</span>
                <span style={{ fontSize: 13, fontWeight: 400, color: 'rgba(253,255,252,0.6)', lineHeight: 1 }}> yrs older</span>
              </div>
              <div style={{ fontSize: 10, color: 'rgba(253,255,252,0.5)', marginTop: 5 }}>actual age: {BIO.actualAge} yrs</div>
            </div>
          </motion.div>
        </div>

        {/* ── Add more data banner ── */}
        <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
          style={{ margin:'10px 24px 0', background:'rgba(255,255,255,0.03)',
            border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, padding:'12px 14px',
            display:'flex', alignItems:'center', gap:12, cursor:'pointer' }}>
          {/* Sync icon */}
          <div style={{ width:34, height:34, borderRadius:10, background:'rgba(120,200,201,0.1)',
            display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none"
              stroke="rgba(120,200,201,0.85)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 4v6h-6" /><path d="M1 20v-6h6" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:14, fontWeight:500, color:'#fdfffc' }}>Add more data</div>
            <div style={{ fontSize:11, color:'rgba(255,255,255,0.38)', marginTop:2 }}>
              Improve longevity score accuracy
            </div>
          </div>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none"
            stroke="rgba(253,255,252,0.25)" strokeWidth={2} strokeLinecap="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </motion.div>

        {/* ── Get Your Personalized Plan ── */}
        <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.15 }}
          style={{ margin:'10px 24px 0', padding:'20px 16px 16px' }}>
          <div style={{ textAlign:'center', marginBottom:16 }}>
            <div style={{ fontSize:16, fontWeight:600, color:'#fdfffc', marginBottom:10 }}>
              Get Your Personalized Plan
            </div>
            <div style={{ fontSize:12, color:'rgba(255,255,255,0.4)', lineHeight:1.65 }}>
              Your data will be analyzed by your coach to build a personalized plan to help
              you achieve your goals and improve longevity, performance, and health
            </div>
          </div>
          <motion.button whileTap={{ scale:0.97 }}
            style={{ width:'100%', padding:'15px 0',
              background:'linear-gradient(90deg,#78a0d1 0%,#78c8c9 100%)',
              border:'none', borderRadius:14, color:'#0a0a0a', fontSize:14, fontWeight:700,
              cursor:'pointer', fontFamily:'inherit', letterSpacing:'0.1em', textTransform:'uppercase' }}>
            Get Plan
          </motion.button>
        </motion.div>

        {/* ── Status legend ── */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }}
          style={{ margin:'4px 24px 0', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', gap:41, height:40 }}>
          {[['#ff6b6b','Critical'],['#e67e22','Monitor'],['#05df72','Optimal']].map(([c,label]) => (
            <div key={label} style={{ display:'flex', alignItems:'center', gap:6 }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:c, flexShrink:0 }} />
              <span style={{ fontSize:12, color:'rgba(253,255,252,0.55)' }}>{label}</span>
            </div>
          ))}
        </motion.div>

        {/* ── Key Metrics ── */}
        <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.22 }}
          style={{ margin:'18px 24px 0' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
            <span style={{ fontSize:12, fontWeight:600, color:'rgba(253,255,252,0.45)',
              letterSpacing:'0.08em', textTransform:'uppercase' }}>Key Metrics</span>
            <button style={{ background:'none', border:'none', cursor:'pointer', padding:4, lineHeight:0, outline:'none' }}>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none"
                stroke="rgba(253,255,252,0.3)" strokeWidth={1.5} strokeLinecap="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </button>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
            {KEY_METRICS.map((m, i) => (
              <motion.div key={m.id} whileTap={{ scale:0.95 }}
                initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:0.24 + i * 0.05 }}
                onClick={() => setActiveMetric(m)}
                style={{ padding:'14px 14px 20px', position:'relative',
                  background: m.isAlert ? 'rgba(255,32,86,0.07)' : 'rgba(255,255,255,0.04)',
                  border:`1px solid ${m.isAlert ? 'rgba(255,32,86,0.32)' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius:14, cursor:'pointer',
                  gridColumn: i === 4 ? 'span 2' : 'auto' }}>

                {/* Status dot + trend arrow */}
                <div style={{ position:'absolute', top:10, right:10,
                  display:'flex', flexDirection:'column', alignItems:'center', gap:3 }}>
                  <div style={{ width:8, height:8, borderRadius:'50%', background:statusColor[m.status] }} />
                  {m.trend === 'down' && (
                    <svg width={10} height={10} viewBox="0 0 24 24" fill="none"
                      stroke={statusColor[m.status]} strokeWidth={2.5} strokeLinecap="round">
                      <path d="M7 7l10 10M17 7v10H7" />
                    </svg>
                  )}
                </div>

                {/* Sparkline */}
                <div style={{ position:'absolute', bottom:0, left:0, right:0, height:28,
                  opacity:0.4, borderRadius:'0 0 14px 14px', overflow:'hidden' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={m.history}>
                      <defs>
                        <linearGradient id={`s${m.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%"   stopColor={m.color} stopOpacity={0.4} />
                          <stop offset="100%" stopColor={m.color} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="v" stroke={m.color} strokeWidth={1}
                        fill={`url(#s${m.id})`} dot={false} isAnimationActive={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div style={{ fontSize:12, fontWeight:500, color:'rgba(255,255,255,0.7)', marginBottom:7 }}>
                  {m.label}
                </div>
                <div style={{ fontSize:22, fontWeight:300, color:'#ffffff' }}>{m.value}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Health Categories ── */}
        <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.32 }}
          style={{ margin:'20px 24px 0' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
            <span style={{ fontSize:12, fontWeight:600, color:'rgba(253,255,252,0.45)',
              letterSpacing:'0.08em', textTransform:'uppercase' }}>Health Categories</span>
            <span style={{ fontSize:11, color:'rgba(253,255,252,0.3)' }}>max score: 100</span>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
            {HEALTH_CATS.map((cat, i) => (
              <motion.div key={i} whileTap={{ scale:0.97 }}
                initial={{ opacity:0, scale:0.96 }} animate={{ opacity:1, scale:1 }}
                transition={{ delay:0.34 + i * 0.05 }}
                onClick={onMetricClick}
                style={{ padding:'12px 14px 14px', position:'relative',
                  background:`${cat.fill}0d`,
                  border:`1px solid ${cat.status === 'critical' ? cat.fill + '40' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius:14, cursor:'pointer' }}>

                {/* Status dot */}
                <div style={{ position:'absolute', top:10, right:10,
                  width:8, height:8, borderRadius:'50%', background:statusColor[cat.status] }} />

                {/* Ring + score */}
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
                  <CategoryRing score={cat.score} color={cat.fill} size={44} />
                  <span style={{ fontSize:26, fontWeight:300, color:'#fdfffc' }}>{cat.score}</span>
                </div>

                <div style={{ fontSize:11, color:'rgba(253,255,252,0.55)', lineHeight:1.35 }}>
                  {cat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* ── Metric detail modal ── */}
      <AnimatePresence>
        {activeMetric && (
          <MetricModal metric={activeMetric} onClose={() => setActiveMetric(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}
