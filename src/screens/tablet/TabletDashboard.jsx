import { motion } from 'framer-motion'
import { BarChart, Bar, ResponsiveContainer, XAxis, Cell } from 'recharts'
import { ChevronRight } from 'lucide-react'

// Exact from Figma Dashboard 385:333
// Layout: 3 panels (BiomarkersOverview)
// Panel1 (top): x:920 w:1326 h:230 — Key Metrics stats row
// Panel2 (left): x:666 w:414 h:424 — Critical Alerts
// Panel3 (bottom): x:666 w:889 h:424 — Today's Schedule

const STATS = [
  { label:'Critical alerts',          value:'2',   color:'#ff2056', bg:'rgba(255,32,86,0.08)',    border:'rgba(255,32,86,0.2)'   },
  { label:"Today's tasks & sessions", value:'3',   color:'#ffffff', bg:'rgba(255,255,255,0.05)',  border:'rgba(255,255,255,0.1)' },
  { label:'Pending Protocols',        value:'5',   color:'#8d8d8f', bg:'rgba(255,255,255,0.04)',  border:'rgba(255,255,255,0.08)'},
  { label:'Average health score',     value:'83%', color:'#78c8c9', bg:'rgba(120,200,201,0.08)',  border:'rgba(120,200,201,0.2)' },
]

const ALERTS = [
  { name:'Leo Kelly',    time:'2 hours ago',  msg:'HRV dropped 16% - Immediate attention needed',    link:'#78c8c9' },
  { name:'Sarah Miller', time:'5 hours ago',  msg:'Metabolic markers declining - Schedule check-in', link:'#4ecdc4' },
]

const SCHEDULE = [
  { time:'2:00 PM', dur:'60 min', title:"Review Leo Kelly's HRV data",              tag:'HRV dropped 16%',                            tagColor:'#ff2056',  action:'Review'          },
  { time:'3:00 PM', dur:'60 min', title:'Consultation with Michael Brown',           tag:'Discuss recovery protocol and stress mgmt',  tagColor:'#78c8c9',  action:'Have a call'     },
  { time:'3:00 PM', dur:'60 min', title:'Update protocol for Sarah Miller',          tag:'Create modified workout based on metabolic',  tagColor:'#d4af37',  action:'Update Protocol' },
]

export default function TabletDashboard({ annotationsVisible }) {
  return (
    <div style={{ flex:1, overflowY:'auto', padding:'20px', background:'#0a0a0a',
      display:'flex', flexDirection:'column', gap:12 }}>
      {annotationsVisible && <div className="annotation-badge">TAB-DASH · Dashboard</div>}

      {/* Panel 1: Key Metrics stats row — Figma: top panel w:1326 h:230 */}
      <div style={{ background:'#19191b', border:'1px solid rgba(255,255,255,0.07)',
        borderRadius:12, padding:'20px 24px' }}>
        <div style={{ fontSize:20, fontWeight:500, color:'#ffffff', marginBottom:4 }}>Key Metrics</div>
        <div style={{ fontSize:14, color:'rgba(255,255,255,0.5)', marginBottom:20 }}>Today's activity overview</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
          {STATS.map((s,i) => (
            <motion.div key={i} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*0.07}}
              style={{ padding:'16px', borderRadius:10, background:s.bg, border:`1px solid ${s.border}` }}>
              <div style={{ fontSize:12, fontWeight:500, color:'rgba(255,255,255,0.6)', marginBottom:8 }}>{s.label}</div>
              <div style={{ fontSize:24, fontWeight:700, color:s.color }}>{s.value}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Panels 2+3 side by side */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>

        {/* Panel 2: Critical Alerts — Figma: x:666 w:414 h:424 */}
        <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.3}}
          style={{ background:'#19191b', border:'1px solid rgba(255,255,255,0.07)',
            borderRadius:12, padding:'20px 24px' }}>
          <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:16 }}>
            <div>
              <div style={{ fontSize:20, fontWeight:500, color:'#ffffff', marginBottom:2 }}>Critical Alerts</div>
              <div style={{ fontSize:12, color:'#ff2056' }}>2 High Priority</div>
            </div>
            <div style={{ fontSize:14, color:'rgba(255,255,255,0.5)' }}>Issues requiring attention</div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {ALERTS.map((a,i) => (
              <div key={i} style={{ padding:'14px 16px', borderRadius:10,
                background:'rgba(255,32,86,0.05)', border:'1px solid rgba(255,32,86,0.15)' }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                  <span style={{ fontSize:16, fontWeight:500, color:'#fafafa' }}>{a.name}</span>
                  <span style={{ fontSize:12, color:'#a1a1a1' }}>{a.time}</span>
                </div>
                <div style={{ fontSize:14, color:'#a1a1a1', marginBottom:10, lineHeight:1.4 }}>{a.msg}</div>
                <span style={{ fontSize:12, fontWeight:500, color:a.link, cursor:'pointer' }}>View Details →</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Panel 3: Today's Schedule — Figma: w:889 h:424 */}
        <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.35}}
          style={{ background:'#19191b', border:'1px solid rgba(255,255,255,0.07)',
            borderRadius:12, padding:'20px 24px' }}>
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:20, fontWeight:500, color:'#ffffff', marginBottom:2 }}>Today's Schedule</div>
            <div style={{ fontSize:14, color:'rgba(255,255,255,0.5)' }}>Thursday, March 12, 2026</div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {SCHEDULE.map((s,i) => (
              <div key={i} style={{ padding:'12px 16px', borderRadius:10,
                background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)',
                display:'flex', gap:16, alignItems:'flex-start' }}>
                <div style={{ flexShrink:0, minWidth:60 }}>
                  <div style={{ fontSize:20, fontWeight:600, color:'#ffffff', lineHeight:1.1 }}>{s.time}</div>
                  <div style={{ fontSize:12, color:'#747476', marginTop:2 }}>{s.dur}</div>
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:16, fontWeight:500, color:'#ffffff', marginBottom:4, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{s.title}</div>
                  <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:6 }}>
                    <span style={{ fontSize:13, color:'#747576' }}>{s.action}</span>
                    <span style={{ fontSize:13, color:'#747576' }}>•</span>
                    <span style={{ fontSize:13, color:'#747576', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{s.tag}</span>
                  </div>
                  <span style={{ fontSize:13, fontWeight:500, color:'#4ecdc4', cursor:'pointer' }}>{s.action}</span>
                </div>
                <ChevronRight size={16} color="rgba(255,255,255,0.2)" style={{flexShrink:0,marginTop:4}}/>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
