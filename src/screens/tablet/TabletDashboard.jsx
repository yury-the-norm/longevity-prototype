import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle, Users, ClipboardList } from 'lucide-react'
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip, Cell } from 'recharts'

// Exact data from Figma Dashboard screen (385:333)
const statsCards = [
  { label:'Critical alerts',      value:'2',  icon: AlertTriangle, color:'#ff6b6b', bg:'rgba(255,107,107,0.08)' },
  { label:"Today's tasks & sessions", value:'3', icon: CheckCircle, color:'#78c8c9', bg:'rgba(120,200,201,0.08)' },
  { label:'Pending Protocols',    value:'5',  icon: ClipboardList, color:'#e67e22', bg:'rgba(230,126,34,0.08)'  },
  { label:'Average health score', value:'83%',icon: Users,         color:'#05df72', bg:'rgba(5,223,114,0.08)'  },
]

// Client health scores from Figma
const clientScores = [
  { name:'Jack',     score:82, color:'#ff6b6b' },
  { name:'Antonio',  score:88, color:'#05df72' },
  { name:'Leo',      score:71, color:'#ff6b6b' },
  { name:'Adam',     score:90, color:'#05df72' },
  { name:'James',    score:85, color:'#05df72' },
  { name:'John',     score:76, color:'#e67e22' },
  { name:'Gary',     score:91, color:'#05df72' },
]

const alerts = [
  { client:'Jack Blake',    metric:'HRV Trend',      value:'42ms', status:'critical', note:'Below baseline' },
  { client:'Leo Kelly',     metric:'Sleep Duration',  value:'5.1h', status:'critical', note:'Under target' },
  { client:'John Weaver',   metric:'Fasting Insulin', value:'12 μU/mL', status:'warn', note:'Elevated' },
]

export default function TabletDashboard({ annotationsVisible }) {
  return (
    <div style={{ flex:1, overflowY:'auto', padding:'24px 28px', display:'flex', flexDirection:'column', gap:20 }}>
      {annotationsVisible && <div className="annotation-badge">TAB-02 · Dashboard</div>}

      <div>
        <div style={{ fontSize:20, fontWeight:500, color:'#fdfffc', letterSpacing:'-0.02em', marginBottom:4 }}>Dashboard</div>
        <div style={{ fontSize:14, color:'rgba(253,255,252,0.4)' }}>Today's activity overview</div>
      </div>

      {/* Stats row */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
        {statsCards.map((card, i) => {
          const Icon = card.icon
          return (
            <motion.div key={i}
              initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} transition={{delay:i*0.07}}
              style={{ padding:'18px 16px', background:'#19191b',
                border:'1px solid rgba(255,255,255,0.07)', borderRadius:14 }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
                <span style={{ fontSize:12, fontWeight:500, color:'rgba(253,255,252,0.5)' }}>{card.label}</span>
                <div style={{ width:28, height:28, borderRadius:8, background:card.bg,
                  display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Icon size={14} color={card.color} />
                </div>
              </div>
              <div style={{ fontSize:24, fontWeight:700, color:'#fdfffc' }}>{card.value}</div>
            </motion.div>
          )
        })}
      </div>

      {/* Two column layout */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, flex:1 }}>

        {/* Critical Alerts */}
        <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.3}}
          style={{ background:'#19191b', border:'1px solid rgba(255,255,255,0.07)',
            borderRadius:16, padding:'18px', display:'flex', flexDirection:'column', gap:12 }}>
          <div style={{ fontSize:16, fontWeight:500, color:'#fdfffc', marginBottom:4 }}>Critical Alerts</div>
          {alerts.map((a, i) => (
            <div key={i} style={{ padding:'12px 14px',
              background: a.status==='critical' ? 'rgba(255,107,107,0.06)' : 'rgba(230,126,34,0.06)',
              border: `1px solid ${a.status==='critical' ? 'rgba(255,107,107,0.2)' : 'rgba(230,126,34,0.2)'}`,
              borderRadius:10, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div>
                <div style={{ fontSize:13, fontWeight:500, color:'#fdfffc', marginBottom:2 }}>{a.client}</div>
                <div style={{ fontSize:12, color:'rgba(253,255,252,0.45)' }}>{a.metric} · {a.note}</div>
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontSize:14, fontWeight:600,
                  color: a.status==='critical' ? '#ff6b6b' : '#e67e22' }}>{a.value}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Client scores bar chart */}
        <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.35}}
          style={{ background:'#19191b', border:'1px solid rgba(255,255,255,0.07)',
            borderRadius:16, padding:'18px' }}>
          <div style={{ fontSize:16, fontWeight:500, color:'#fdfffc', marginBottom:4 }}>Client Health Scores</div>
          <div style={{ fontSize:12, color:'rgba(253,255,252,0.4)', marginBottom:16 }}>This week</div>
          <div style={{ height:180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={clientScores} barSize={22}>
                <XAxis dataKey="name" tick={{fontSize:11, fill:'rgba(253,255,252,0.4)'}} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background:'#1c1d21', border:'1px solid rgba(255,255,255,0.1)',
                  borderRadius:8, fontSize:11, color:'#fdfffc' }} />
                <Bar dataKey="score" radius={[4,4,0,0]}>
                  {clientScores.map((entry,i)=>(
                    <Cell key={i} fill={entry.color} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
