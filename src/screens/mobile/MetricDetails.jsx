import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { LineChart, Line, XAxis, ResponsiveContainer, Tooltip } from 'recharts'

// Exact content from Figma: Physique & Muscle, score 78/100
const trendData = [
  { week:'W1', value:71 }, { week:'W2', value:72 }, { week:'W3', value:73 },
  { week:'W4', value:74 }, { week:'W5', value:75 }, { week:'W6', value:76 }, { week:'W7', value:78 },
]

// Exact metric rows from Figma extraction
const metrics = [
  { label:'Lean Mass',        desc:'Total metabolically active tissue',               value:'162 lbs', fill:'#ffffff0a' },
  { label:'Body Fat %',       desc:'Percentage of total mass that is adipose tissue',  value:'22%',     fill:'#ffffff0a' },
  { label:'Visceral Fat',     desc:'Visceral adipose tissue surrounding organs',       value:'1.2 lbs', fill:'#ffffff0a' },
  { label:'Waist-to-Height',  desc:'Indicator of central adiposity and metabolic risk',value:'0.54',    fill:'#ffffff0a' },
  { label:'Muscle Symmetry',  desc:'Left vs right limb lean mass balance',             value:'92%',     fill:'#ffffff0a' },
]

export default function MetricDetails({ onBack, annotationsVisible }) {
  return (
    <div style={{ width:'100%', height:'100%', position:'relative',
      background:'linear-gradient(160deg,#1c1d21 0%,#0e0e12 100%)',
      display:'flex', flexDirection:'column',
    }}>
      {annotationsVisible && <div className="annotation-badge">MOB-08 · Metric Details</div>}

      {/* Scrollable content */}
      <div className="screen-scroll" style={{ flex:1, padding:'52px 16px 16px', paddingBottom:80 }}>

        {/* Back + Header */}
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
          <motion.button whileTap={{scale:0.85}} onClick={onBack}
            style={{ width:32, height:32, borderRadius:'50%', background:'rgba(255,255,255,0.06)',
              border:'1px solid rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center',
              cursor:'pointer', flexShrink:0 }}>
            <ChevronLeft size={16} color="rgba(253,255,252,0.8)" />
          </motion.button>
        </div>

        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}>
          <div style={{ fontSize:24, fontWeight:500, color:'#fdfffc', letterSpacing:'-0.02em', marginBottom:4 }}>
            Physique & Muscle
          </div>
          <div style={{ fontSize:10, fontWeight:500, color:'rgba(253,255,252,0.5)', fontFamily:'DM Mono,monospace' }}>
            Score: 78 / 100
          </div>
        </motion.div>

        {/* Historical Trend chart — black card, exact from Figma */}
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
          style={{ marginTop:20, padding:'18px 16px', background:'#000000',
            border:'1px solid rgba(255,255,255,0.1)', borderRadius:14 }}>
          <div style={{ fontSize:12, fontWeight:500, color:'rgba(253,255,252,0.7)', marginBottom:14 }}>
            Historical Trend
          </div>
          <ResponsiveContainer width="100%" height={80}>
            <LineChart data={trendData} margin={{top:4,right:4,left:4,bottom:4}}>
              <XAxis dataKey="week" tick={{fill:'rgba(253,255,252,0.4)', fontSize:9}} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background:'#1c1d21', border:'1px solid rgba(255,255,255,0.1)', borderRadius:8, padding:'6px 10px' }}
                labelStyle={{ color:'rgba(253,255,252,0.5)', fontSize:10 }}
                itemStyle={{ color:'#78c8c9', fontSize:12 }}
              />
              <Line type="monotone" dataKey="value" stroke="#78c8c9" strokeWidth={2}
                dot={{ r:3, fill:'#78c8c9', strokeWidth:0 }}
                activeDot={{ r:5, fill:'#78c8c9' }}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Metric rows — white-ish cards, exact from Figma */}
        <div style={{ marginTop:12, display:'flex', flexDirection:'column', gap:8 }}>
          {metrics.map((m, i) => (
            <motion.div key={m.label}
              initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:0.12+i*0.06}}
              style={{ padding:'16px', background:'rgba(255,255,255,0.05)',
                border:'1px solid rgba(255,255,255,0.08)', borderRadius:14,
                display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:16, fontWeight:500, color:'#fdfffc', marginBottom:4 }}>{m.label}</div>
                <div style={{ fontSize:12, color:'rgba(253,255,252,0.45)', lineHeight:1.4 }}>{m.desc}</div>
              </div>
              <div style={{ fontSize:14, fontWeight:500, color:'#fdfffc', marginLeft:16, flexShrink:0 }}>
                {m.value}
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Continue button */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'12px 16px 20px',
        background:'linear-gradient(to top, #0e0e12 60%, transparent)' }}>
        <motion.button whileTap={{scale:0.97}} onClick={onBack}
          style={{ width:'100%', padding:'14px',
            background:'#78c8c9', border:'none', borderRadius:8,
            color:'#0a0a0a', fontSize:14, fontWeight:500, cursor:'pointer', fontFamily:'inherit' }}>
          Continue
        </motion.button>
      </div>
    </div>
  )
}
