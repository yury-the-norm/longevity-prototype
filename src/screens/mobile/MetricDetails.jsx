import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LineChart, Line, BarChart, Bar, AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts'
import { ChevronLeft, TrendingUp, TrendingDown, Minus } from 'lucide-react'

const weeklyTrend = [
  {w:'W1',v:68},{w:'W2',v:70},{w:'W3',v:73},{w:'W4',v:72},{w:'W5',v:75},{w:'W6',v:77},{w:'W7',v:78}
]

const METRICS = [
  { id:'lean',    label:'Lean Mass',       desc:'Total metabolically active tissue',             value:'162 lbs', unit:'lbs', status:'ok',
    trend:'up',   history:[{m:'Sep',v:72.1},{m:'Oct',v:72.4},{m:'Nov',v:72.9},{m:'Dec',v:73.1},{m:'Jan',v:73.6},{m:'Feb',v:74.0},{m:'Mar',v:74.2}],
    color:'#78c8c9', ref:'Target: >165 lbs', change:'+2.1 lbs' },
  { id:'fat',     label:'Body Fat %',      desc:'Percentage of total mass that is adipose tissue', value:'22%',   unit:'%',  status:'warn',
    trend:'down', history:[{m:'Sep',v:22.1},{m:'Oct',v:21.6},{m:'Nov',v:21.0},{m:'Dec',v:20.5},{m:'Jan',v:20.0},{m:'Feb',v:19.7},{m:'Mar',v:19.4}],
    color:'#e67e22', ref:'Target: <18%', change:'-2.7%' },
  { id:'vat',     label:'Visceral Fat',    desc:'Visceral adipose tissue surrounding organs',    value:'1.2 lbs', unit:'lbs', status:'warn',
    trend:'down', history:[{m:'Sep',v:1.5},{m:'Oct',v:1.45},{m:'Nov',v:1.4},{m:'Dec',v:1.35},{m:'Jan',v:1.3},{m:'Feb',v:1.25},{m:'Mar',v:1.2}],
    color:'#e67e22', ref:'Target: <1.0 lbs', change:'-0.3 lbs' },
  { id:'waist',   label:'Waist-to-Height', desc:'Indicator of central adiposity and metabolic risk', value:'0.54', unit:'', status:'warn',
    trend:'down', history:[{m:'Sep',v:0.58},{m:'Oct',v:0.57},{m:'Nov',v:0.57},{m:'Dec',v:0.56},{m:'Jan',v:0.56},{m:'Feb',v:0.55},{m:'Mar',v:0.54}],
    color:'#e67e22', ref:'Target: <0.5', change:'-0.04' },
  { id:'sym',     label:'Muscle Symmetry', desc:'Left vs right limb lean mass balance',          value:'92%',     unit:'%',  status:'ok',
    trend:'up',   history:[{m:'Sep',v:88},{m:'Oct',v:89},{m:'Nov',v:90},{m:'Dec',v:91},{m:'Jan',v:91},{m:'Feb',v:92},{m:'Mar',v:92}],
    color:'#05df72', ref:'Target: >90%', change:'+4%' },
]

const statusColor = { ok:'#05df72', warn:'#e67e22', critical:'#ff6b6b' }
const TrendIcon = ({ t }) => t==='up' ? <TrendingUp size={12}/> : t==='down' ? <TrendingDown size={12}/> : <Minus size={12}/>

function MetricDetailPanel({ metric, onClose }) {
  return (
    <motion.div
      initial={{opacity:0,x:'100%'}} animate={{opacity:1,x:0}} exit={{opacity:0,x:'100%'}}
      transition={{duration:0.28,ease:[0.22,1,0.36,1]}}
      style={{ position:'absolute', inset:0, background:'linear-gradient(160deg,#1c1d21,#0e0e12)',
        zIndex:50, overflowY:'auto', paddingBottom:40 }}>
      {/* Header */}
      <div style={{ padding:'54px 24px 0', display:'flex', alignItems:'center', gap:14, marginBottom:20 }}>
        <motion.button whileHover={{ background:'rgba(255,255,255,0.12)' }} whileTap={{scale:0.9}} onClick={onClose}
          transition={{ duration:0.15 }}
          style={{ width:36, height:36, borderRadius:'50%', flexShrink:0,
            background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)',
            display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', outline:'none' }}>
          <ChevronLeft size={16} color="rgba(253,255,252,0.8)"/>
        </motion.button>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:20, fontWeight:500, color:'#fdfffc', letterSpacing:'-0.02em' }}>{metric.label}</div>
          <div style={{ fontSize:12, color:'rgba(253,255,252,0.45)', marginTop:2 }}>{metric.desc}</div>
        </div>
      </div>

      {/* Value card */}
      <div style={{ margin:'0 24px 16px', padding:'18px', background:'rgba(255,255,255,0.04)',
        border:`1px solid ${metric.color}30`, borderRadius:16, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div>
          <div style={{ fontSize:36, fontWeight:200, color:metric.color, marginBottom:2 }}>{metric.value}</div>
          <div style={{ fontSize:11, color:'rgba(253,255,252,0.45)' }}>{metric.ref}</div>
        </div>
        <div style={{ textAlign:'right' }}>
          <div style={{ display:'flex', alignItems:'center', gap:4, justifyContent:'flex-end',
            color:metric.trend==='up'?'#05df72':'#78c8c9', marginBottom:4 }}>
            <TrendIcon t={metric.trend}/>
            <span style={{ fontSize:14, fontWeight:500 }}>{metric.change}</span>
          </div>
          <div style={{ padding:'3px 10px', borderRadius:4,
            background:`${statusColor[metric.status]}15`, border:`1px solid ${statusColor[metric.status]}30`,
            fontSize:11, color:statusColor[metric.status], textTransform:'capitalize' }}>
            {metric.status}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div style={{ margin:'0 24px 16px', padding:'16px', background:'rgba(255,255,255,0.04)',
        border:'1px solid rgba(255,255,255,0.07)', borderRadius:16 }}>
        <div style={{ fontSize:13, fontWeight:500, color:'rgba(253,255,252,0.7)', marginBottom:16 }}>
          7-Month Trend
        </div>
        <div style={{ height:140 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={metric.history}>
              <defs><linearGradient id={`pg${metric.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={metric.color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={metric.color} stopOpacity={0}/>
              </linearGradient></defs>
              <XAxis dataKey="m" tick={{fontSize:9,fill:'rgba(253,255,252,0.4)'}} axisLine={false} tickLine={false}/>
              <YAxis hide domain={['dataMin - 1','dataMax + 1']}/>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3"/>
              <Tooltip contentStyle={{background:'#1c1d21',border:`1px solid ${metric.color}40`,borderRadius:8,fontSize:11,color:'#fdfffc'}}/>
              <Area type="monotone" dataKey="v" stroke={metric.color} strokeWidth={2}
                fill={`url(#pg${metric.id})`} dot={{fill:metric.color,r:3,strokeWidth:0}}
                activeDot={{r:5,fill:metric.color}} isAnimationActive/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  )
}

export default function MetricDetails({ onBack, annotationsVisible }) {
  const [activeMetric, setActiveMetric] = useState(null)

  return (
    <div style={{ width:'100%', height:'100%', position:'relative', overflow:'hidden' }}>
      <div style={{ overflowY:'auto', height:'100%',
        background:'linear-gradient(160deg,#1c1d21 0%,#0e0e12 100%)', paddingBottom:88 }}>
        {annotationsVisible && <div className="annotation-badge" style={{position:'fixed',zIndex:9999}}>MOB-08 · Metric Details</div>}

        {/* Top bar */}
        <div style={{ display:'flex', alignItems:'center', gap:12, padding:'54px 24px 0' }}>
          <motion.button whileHover={{ background:'rgba(255,255,255,0.12)' }} whileTap={{scale:0.9}} onClick={onBack}
            transition={{ duration:0.15 }}
            style={{ width:36, height:36, borderRadius:'50%', background:'rgba(255,255,255,0.06)',
              border:'1px solid rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center',
              cursor:'pointer', outline:'none' }}>
            <ChevronLeft size={18} color="rgba(253,255,252,0.8)"/>
          </motion.button>
          <div>
            <div style={{ fontSize:24, fontWeight:500, color:'#fdfffc', letterSpacing:'-0.02em' }}>
              Physique &amp; Muscle
            </div>
            <div style={{ fontSize:10, fontWeight:500, color:'rgba(253,255,252,0.5)', marginTop:2 }}>
              Score: 78 / 100
            </div>
          </div>
        </div>

        {/* Trend chart */}
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
          style={{ margin:'20px 24px 0', padding:'16px', background:'rgba(255,255,255,0.04)',
            border:'1px solid rgba(255,255,255,0.08)', borderRadius:14 }}>
          <div style={{ fontSize:12, fontWeight:500, color:'rgba(253,255,252,0.6)', marginBottom:12 }}>
            Overall Score Trend
          </div>
          <div style={{ height:100 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyTrend} margin={{top:4,right:0,bottom:0,left:0}}>
                <XAxis dataKey="w" tick={{fontSize:9,fill:'rgba(253,255,252,0.4)'}} axisLine={false} tickLine={false}/>
                <YAxis hide domain={['dataMin-5','dataMax+5']}/>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3"/>
                <Tooltip contentStyle={{background:'#1c1d21',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,fontSize:11,color:'#fdfffc'}}/>
                <Line type="monotone" dataKey="v" stroke="#78c8c9" strokeWidth={2}
                  dot={{fill:'#78c8c9',r:3,strokeWidth:0}} activeDot={{r:5,fill:'#78c8c9'}} isAnimationActive animationDuration={1000}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Metrics list — CLICKABLE */}
        <div style={{ margin:'16px 24px 0', display:'flex', flexDirection:'column', gap:8 }}>
          <div style={{ fontSize:10, color:'rgba(253,255,252,0.4)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:4 }}>
            Tap a metric to see detail
          </div>
          {METRICS.map((m,i) => (
            <motion.div key={m.id} whileHover={{ background:'rgba(255,255,255,0.08)' }} whileTap={{scale:0.97}}
              initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:0.2+i*0.07}}
              onClick={()=>setActiveMetric(m)}
              style={{ padding:'14px 16px', background:'rgba(255,255,255,0.04)',
                border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, cursor:'pointer',
                display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
              {/* Tap arrow */}
              <div style={{ width:4, height:28, borderRadius:2, background:`${statusColor[m.status]}60`, flexShrink:0 }}/>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:3 }}>
                  <span style={{ fontSize:15, fontWeight:500, color:'#fdfffc' }}>{m.label}</span>
                </div>
                <div style={{ fontSize:11, color:'rgba(253,255,252,0.4)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                  {m.desc}
                </div>
              </div>
              <div style={{ textAlign:'right', flexShrink:0 }}>
                <div style={{ fontSize:15, fontWeight:500, color:statusColor[m.status], marginBottom:2 }}>{m.value}</div>
                <div style={{ display:'flex', alignItems:'center', gap:3, justifyContent:'flex-end',
                  color:m.trend==='up'?'#05df72':'#78c8c9' }}>
                  <TrendIcon t={m.trend}/>
                  <span style={{ fontSize:11 }}>{m.change}</span>
                </div>
              </div>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(253,255,252,0.2)" strokeWidth="2" strokeLinecap="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Metric detail panel */}
      <AnimatePresence>
        {activeMetric && (
          <MetricDetailPanel metric={activeMetric} onClose={()=>setActiveMetric(null)}/>
        )}
      </AnimatePresence>
    </div>
  )
}
