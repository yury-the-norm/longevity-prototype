import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'

// Exact from Figma: Client page tabs — Overview, biomarkers, protocols, notes
const TABS = ['Overview', 'biomarkers', 'protocols', 'notes']

// Jack Blake data from Figma research + dashboard extract
const overviewMetrics = [
  { label:'Biological Age', value:'43', sub:'/ 40 real age', delta:'+3 years', color:'#ff6b6b' },
  { label:'Longevity Score', value:'82', sub:'/ 100', delta:null, color:'#fdfffc' },
]

const healthCategories = [
  { label:'Metabolic Health',          score:62, color:'#ff6b6b' },
  { label:'Recovery & Nervous System', score:66, color:'#ff6b6b' },
  { label:'Physique & Muscle',         score:78, color:'#fdfffc' },
  { label:'Performance Capacity',      score:74, color:'#fdfffc' },
  { label:'Mobility & Function',       score:85, color:'#05df72' },
  { label:'Cognitive Function',        score:81, color:'#05df72' },
]

const biomarkers = [
  { name:'HRV Trend',       value:'42 ms',    ref:'>50 ms',  status:'critical' },
  { name:'Sleep Duration',  value:'6.2h',     ref:'>7h',     status:'critical' },
  { name:'Body Fat %',      value:'18%',      ref:'12-18%',  status:'warn'     },
  { name:'HbA1c',           value:'5.1%',     ref:'<5.7%',   status:'optimal'  },
  { name:'VO₂ Max',         value:'48 ml/kg', ref:'>42',     status:'optimal'  },
  { name:'Fasting Insulin', value:'7.2 μU/mL',ref:'2-10',   status:'optimal'  },
  { name:'ApoB',            value:'92 mg/dL', ref:'<90',     status:'warn'     },
  { name:'Testosterone',    value:'620 ng/dL',ref:'400-900', status:'optimal'  },
]

const protocols = [
  { title:'Training protocol',    items:['3x strength training/week','2x cardio sessions','1x flexibility work'] },
  { title:'Nutrition protocol',   items:['2200 kcal daily target','180g protein minimum','Low inflammatory foods'] },
  { title:'Supplements protocol', items:['Creatine 5g post-workout','Omega-3 2g EPA+DHA','Vitamin D3 4000 IU','Magnesium 400mg before bed'] },
]

const trendData = [
  {w:'W1',lean:72.1,fat:22.1},{w:'W2',lean:72.4,fat:21.6},{w:'W3',lean:72.9,fat:21.0},
  {w:'W4',lean:73.1,fat:20.5},{w:'W5',lean:73.6,fat:20.0},{w:'W6',lean:74.0,fat:19.7},{w:'W7',lean:74.2,fat:19.4},
]

const statusColor = { critical:'#ff6b6b', warn:'#e67e22', optimal:'#05df72' }

function Overview({ client }) {
  return (
    <div style={{ flex:1, overflowY:'auto', padding:'0 24px 24px', display:'flex', flexDirection:'column', gap:16 }}>
      {/* Key Metrics */}
      <div>
        <div style={{ fontSize:18, fontWeight:500, color:'#fdfffc', marginBottom:4 }}>Key Metrics</div>
        <div style={{ fontSize:14, color:'rgba(253,255,252,0.4)', marginBottom:14 }}>Overall health indicators</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          {overviewMetrics.map((m, i) => (
            <motion.div key={i} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}}
              style={{ padding:'18px 16px', background:'rgba(255,255,255,0.04)',
                border:'1px solid rgba(255,255,255,0.07)', borderRadius:12 }}>
              <div style={{ fontSize:14, color:'rgba(253,255,252,0.5)', marginBottom:6 }}>{m.label}</div>
              {m.delta && <div style={{ fontSize:12, color:m.color, marginBottom:4 }}>{m.delta}</div>}
              <div style={{ display:'flex', alignItems:'baseline', gap:4 }}>
                <span style={{ fontSize:30, fontWeight:700, color:'#fdfffc' }}>{m.value}</span>
                <span style={{ fontSize:14, color:'rgba(253,255,252,0.4)' }}>{m.sub}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Score chart */}
      <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)',
        borderRadius:12, padding:'16px' }}>
        <div style={{ fontSize:13, fontWeight:500, color:'rgba(253,255,252,0.6)', marginBottom:4 }}>Trend</div>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
          <div style={{ width:8, height:8, borderRadius:'50%', background:'#78c8c9' }} />
          <span style={{ fontSize:11, color:'rgba(253,255,252,0.4)' }}>Lean Mass</span>
          <div style={{ width:8, height:8, borderRadius:'50%', background:'#ff6b6b', marginLeft:8 }} />
          <span style={{ fontSize:11, color:'rgba(253,255,252,0.4)' }}>Body Fat %</span>
        </div>
        <div style={{ height:120 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <XAxis dataKey="w" tick={{fontSize:10,fill:'rgba(253,255,252,0.3)'}} axisLine={false} tickLine={false} />
              <YAxis hide />
              <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
              <Tooltip contentStyle={{background:'#19191b',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,fontSize:11,color:'#fdfffc'}} />
              <Line type="monotone" dataKey="lean" stroke="#78c8c9" strokeWidth={2} dot={false} isAnimationActive />
              <Line type="monotone" dataKey="fat"  stroke="#ff6b6b" strokeWidth={2} dot={false} isAnimationActive />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Health categories */}
      <div>
        <div style={{ fontSize:14, fontWeight:500, color:'rgba(253,255,252,0.6)', marginBottom:12 }}>Health Categories</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
          {healthCategories.map((cat, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'11px 14px', background:'rgba(255,255,255,0.03)',
              border:'1px solid rgba(255,255,255,0.06)', borderRadius:10 }}>
              <span style={{ fontSize:13, color:cat.color }}>{cat.label}</span>
              <span style={{ fontSize:16, fontWeight:700, color:'#fdfffc' }}>{cat.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Biomarkers() {
  const summary = { critical:2, warn:1, optimal:12, total:16 }
  return (
    <div style={{ flex:1, overflowY:'auto', padding:'0 24px 24px', display:'flex', flexDirection:'column', gap:16 }}>
      <div>
        <div style={{ fontSize:20, fontWeight:500, color:'#fdfffc', marginBottom:2 }}>Key Metrics</div>
        <div style={{ fontSize:14, color:'rgba(253,255,252,0.4)', marginBottom:16 }}>Comprehensive biomarker tracking</div>
        {/* Summary pills */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:20 }}>
          {[
            { label:'Critical', value:summary.critical, color:'#ff6b6b', bg:'rgba(255,107,107,0.08)' },
            { label:'Monitor',  value:summary.warn,     color:'#e67e22', bg:'rgba(230,126,34,0.08)'  },
            { label:'Optimal',  value:summary.optimal,  color:'#05df72', bg:'rgba(5,223,114,0.08)'   },
            { label:'Total Markers', value:summary.total, color:'#fdfffc', bg:'rgba(255,255,255,0.04)' },
          ].map((s,i)=>(
            <div key={i} style={{ padding:'14px 12px', background:s.bg,
              border:`1px solid ${s.color}20`, borderRadius:12, textAlign:'center' }}>
              <div style={{ fontSize:24, fontWeight:700, color:s.color, marginBottom:2 }}>{s.value}</div>
              <div style={{ fontSize:11, color:'rgba(253,255,252,0.45)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Markers list */}
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {biomarkers.map((b, i) => (
          <motion.div key={i} initial={{opacity:0,x:-6}} animate={{opacity:1,x:0}} transition={{delay:i*0.05}}
            style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'12px 16px', background:'rgba(255,255,255,0.03)',
              border:'1px solid rgba(255,255,255,0.06)', borderRadius:10 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:statusColor[b.status], flexShrink:0 }} />
              <span style={{ fontSize:14, color:'rgba(253,255,252,0.8)' }}>{b.name}</span>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontSize:14, fontWeight:600, color:statusColor[b.status] }}>{b.value}</div>
              <div style={{ fontSize:11, color:'rgba(253,255,252,0.3)' }}>ref: {b.ref}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function Protocols() {
  return (
    <div style={{ flex:1, overflowY:'auto', padding:'0 24px 24px', display:'flex', flexDirection:'column', gap:16 }}>
      <div>
        <div style={{ fontSize:18, fontWeight:500, color:'#fdfffc', marginBottom:4 }}>Protocols & Recommendations</div>
        <div style={{ fontSize:14, color:'rgba(253,255,252,0.4)', marginBottom:16 }}>Protocols created by coach</div>
      </div>
      {protocols.map((p, i) => (
        <motion.div key={i} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*0.1}}
          style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)',
            borderRadius:14, padding:'16px 18px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
            <div style={{ width:6, height:6, borderRadius:'50%', background:'#78c8c9' }} />
            <span style={{ fontSize:14, fontWeight:500, color:'#fdfffc' }}>{p.title}</span>
          </div>
          {p.items.map((item, j) => (
            <div key={j} style={{ display:'flex', alignItems:'center', gap:8,
              padding:'8px 0', borderTop:'1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ width:4, height:4, borderRadius:'50%', background:'rgba(120,200,201,0.5)', flexShrink:0 }} />
              <span style={{ fontSize:12, color:'rgba(253,255,252,0.65)' }}>{item}</span>
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  )
}

export default function TabletClientPage({ client, onBack, annotationsVisible }) {
  const [activeTab, setActiveTab] = useState('Overview')

  const renderTab = () => {
    switch(activeTab) {
      case 'Overview':    return <Overview client={client} />
      case 'biomarkers':  return <Biomarkers />
      case 'protocols':   return <Protocols />
      default:
        return (
          <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ color:'rgba(253,255,252,0.2)', fontSize:14 }}>Notes coming soon</span>
          </div>
        )
    }
  }

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      {annotationsVisible && <div className="annotation-badge">TAB-04 · Client Page</div>}

      {/* Client header */}
      <div style={{ padding:'20px 24px 0', flexShrink:0 }}>
        <button onClick={onBack}
          style={{ display:'flex', alignItems:'center', gap:6, background:'none', border:'none',
            color:'rgba(253,255,252,0.4)', fontSize:13, cursor:'pointer', fontFamily:'inherit',
            marginBottom:16, padding:0 }}>
          <ChevronLeft size={14} /> All Clients
        </button>

        <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:20 }}>
          <div style={{ width:48, height:48, borderRadius:'50%',
            background:'linear-gradient(135deg,#78a0d1,#78c8c9)',
            display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <span style={{ fontSize:16, fontWeight:600, color:'white' }}>{client.initials}</span>
          </div>
          <div>
            <div style={{ fontSize:24, fontWeight:500, color:'#fdfffc', letterSpacing:'-0.02em' }}>{client.name}</div>
            <div style={{ display:'flex', gap:16, marginTop:4 }}>
              <span style={{ fontSize:14, color:'rgba(253,255,252,0.5)' }}>{client.age} years old</span>
              <span style={{ fontSize:14, color:'#78c8c9' }}>{client.plan}</span>
              <span style={{ fontSize:14, color:'rgba(253,255,252,0.35)' }}>Joined {client.joined}</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', gap:0, borderBottom:'1px solid rgba(255,255,255,0.08)', marginBottom:0 }}>
          {TABS.map(tab => (
            <button key={tab} onClick={()=>setActiveTab(tab)}
              style={{ padding:'10px 18px', background:'none', border:'none', cursor:'pointer',
                fontFamily:'inherit', fontSize:14, fontWeight:400,
                color: activeTab===tab ? '#fdfffc' : 'rgba(253,255,252,0.4)',
                borderBottom: activeTab===tab ? '2px solid #78c8c9' : '2px solid transparent',
                marginBottom:-1, transition:'all 0.15s', outline:'none' }}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div key={activeTab}
          initial={{opacity:0, y:6}} animate={{opacity:1, y:0}} exit={{opacity:0}}
          transition={{duration:0.2}}
          style={{ flex:1, overflow:'hidden', display:'flex', flexDirection:'column', paddingTop:16 }}>
          {renderTab()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
