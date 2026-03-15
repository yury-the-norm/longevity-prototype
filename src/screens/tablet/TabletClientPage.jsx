import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts'

// ── Shared ClientHeader ───────────────────────────────────────────────
function ClientHeader({ client, activeTab, onTab, onBack }) {
  const tabs = ['Overview','biomarkers','protocols','notes']
  return (
    <div style={{ background:'#19191b', borderBottom:'1px solid rgba(255,255,255,0.07)',
      padding:'16px 24px 0', flexShrink:0 }}>
      <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:16 }}>
        <button onClick={onBack} style={{ background:'rgba(255,255,255,0.06)',
          border:'1px solid rgba(255,255,255,0.1)', borderRadius:'50%',
          width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center',
          cursor:'pointer', outline:'none', flexShrink:0 }}>
          <ChevronLeft size={16} color="rgba(253,255,252,0.8)"/>
        </button>
        {/* JB avatar */}
        <div style={{ width:44, height:44, borderRadius:'50%', flexShrink:0,
          background:'linear-gradient(135deg,#78a0d1,#78c8c9)',
          display:'flex', alignItems:'center', justifyContent:'center' }}>
          <span style={{ fontSize:16, fontWeight:500, color:'#0a0a0a' }}>{client.initials}</span>
        </div>
        <div>
          {/* Figma: Jack Blake size:24 weight:500, 40 years old size:14, Premium color:#78c8c9 */}
          <div style={{ fontSize:24, fontWeight:500, color:'#ffffff', letterSpacing:'-0.02em' }}>{client.name}</div>
          <div style={{ display:'flex', gap:16, marginTop:2 }}>
            <span style={{ fontSize:14, color:'rgba(255,255,255,0.6)' }}>{client.age} years old</span>
            <span style={{ fontSize:14, color:'#78c8c9' }}>{client.plan}</span>
            <span style={{ fontSize:14, color:'rgba(255,255,255,0.5)' }}>Joined {client.joined}</span>
          </div>
        </div>
      </div>
      {/* Tabs — Figma: Overview color:#78c8c9 (active), others rgba white */}
      <div style={{ display:'flex', gap:0 }}>
        {tabs.map(t => (
          <button key={t} onClick={()=>onTab(t)}
            style={{ padding:'10px 20px', background:'none', border:'none', cursor:'pointer',
              fontFamily:'inherit', fontSize:14, fontWeight:400,
              color: activeTab===t ? '#78c8c9' : 'rgba(255,255,255,0.5)',
              borderBottom:`2px solid ${activeTab===t ? '#78c8c9' : 'transparent'}`,
              marginBottom:-1, outline:'none', transition:'all 0.15s' }}>
            {t}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Overview tab ─────────────────────────────────────────────────────
// Figma: Key Health Metrics (left panel) + HealthCategoriesOverview (right/main) + Critical Alerts (Group 581)
const catData = [
  {name:'Metabolic Health',score:62,color:'#ff6b6b'},{name:'Recovery',score:66,color:'#ff6b6b'},
  {name:'Physique & Muscle',score:78,color:'#78c8c9'},{name:'Performance',score:74,color:'#78c8c9'},
  {name:'Mobility',score:85,color:'#05df72'},{name:'Cognitive',score:81,color:'#05df72'},
]
const trendData = [
  {w:'W1',v:70},{w:'W2',v:72},{w:'W3',v:71},{w:'W4',v:74},{w:'W5',v:75},{w:'W6',v:77},{w:'W7',v:78}
]

function OverviewTab() {
  return (
    <div style={{ flex:1, overflowY:'auto', padding:'20px 24px', display:'flex', gap:16 }}>
      {/* Left: Key Health Metrics — Figma: w:421 h:343 */}
      <div style={{ width:280, flexShrink:0, display:'flex', flexDirection:'column', gap:12 }}>
        <div style={{ background:'#19191b', border:'1px solid rgba(255,255,255,0.07)',
          borderRadius:12, padding:'18px' }}>
          <div style={{ fontSize:18, fontWeight:500, color:'#ffffff', marginBottom:4 }}>Key Metrics</div>
          <div style={{ fontSize:14, color:'rgba(255,255,255,0.5)', marginBottom:16 }}>Overall health indicators</div>

          {/* Biological Age — Figma: +3 years color:#ff2056, 43 size:30 weight:700 color:#ff2056 */}
          <div style={{ padding:'14px', background:'rgba(255,32,86,0.05)',
            border:'1px solid rgba(255,32,86,0.15)', borderRadius:10, marginBottom:10 }}>
            <div style={{ fontSize:13, color:'rgba(255,255,255,0.6)', marginBottom:6 }}>Biological Age</div>
            <div style={{ fontSize:12, color:'#ff2056', marginBottom:4 }}>+3 years</div>
            <div style={{ display:'flex', alignItems:'baseline', gap:6 }}>
              <span style={{ fontSize:30, fontWeight:700, color:'#ff2056' }}>43</span>
              <span style={{ fontSize:14, color:'rgba(255,255,255,0.6)' }}>/ 40 real age</span>
            </div>
          </div>

          {/* Longevity Score — Figma: 82 size:30 weight:700 color:#78c8c9 */}
          <div style={{ padding:'14px', background:'rgba(120,200,201,0.05)',
            border:'1px solid rgba(120,200,201,0.15)', borderRadius:10, marginBottom:10 }}>
            <div style={{ fontSize:13, color:'rgba(255,255,255,0.6)', marginBottom:6 }}>Longevity Score</div>
            <div style={{ display:'flex', alignItems:'baseline', gap:6 }}>
              <span style={{ fontSize:30, fontWeight:700, color:'#78c8c9' }}>82</span>
              <span style={{ fontSize:14, color:'rgba(255,255,255,0.6)' }}>/ 100</span>
            </div>
            {/* Scale: Bad → Good → Excellent */}
            <div style={{ display:'flex', justifyContent:'space-between', marginTop:10,
              padding:'6px 0', borderTop:'1px solid rgba(255,255,255,0.06)' }}>
              {['Bad','Good','Excellent'].map((l,i) => (
                <span key={i} style={{ fontSize:12, color:i===2?'#78c8c9':i===0?'rgba(255,255,255,0.4)':'rgba(255,255,255,0.8)' }}>{l}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Critical Alerts panel — Figma: Group 581 */}
        <div style={{ background:'#19191b', border:'1px solid rgba(255,255,255,0.07)',
          borderRadius:12, padding:'18px' }}>
          <div style={{ fontSize:18, fontWeight:500, color:'#ffffff', marginBottom:4 }}>Critical Alerts</div>
          <div style={{ fontSize:14, color:'rgba(255,255,255,0.5)', marginBottom:12 }}>Issues requiring immediate attention</div>
          {[
            { t:'HRV dropped 16%',             d:'Recovery metrics showing decline over past 5 days' },
            { t:'Metabolic markers declining',  d:'HbA1c trending upward, review nutrition protocol'  },
            { t:'Sleep debt accumulating',      d:'Average sleep duration 6.2h (target: 7-8h)'        },
          ].map((a,i) => (
            <div key={i} style={{ padding:'10px 12px', marginBottom:8, borderRadius:8,
              background:'rgba(255,32,86,0.04)', border:'1px solid rgba(255,32,86,0.1)' }}>
              <div style={{ fontSize:13, fontWeight:500, color:'#ffffff', marginBottom:2 }}>{a.t}</div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,0.5)' }}>{a.d}</div>
            </div>
          ))}
          <div style={{ fontSize:11, color:'#ff2056', marginTop:6 }}>2 High Priority</div>
        </div>
      </div>

      {/* Right: Health Categories Overview — Figma: w:1318 h:706 */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', gap:12 }}>
        <div style={{ background:'#19191b', border:'1px solid rgba(255,255,255,0.07)',
          borderRadius:12, padding:'18px' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:4 }}>
            <div>
              <div style={{ fontSize:20, fontWeight:500, color:'#ffffff', marginBottom:2 }}>Health Categories Overview</div>
              <div style={{ fontSize:14, color:'rgba(255,255,255,0.5)' }}>Detailed breakdown of all health metrics with 30-day trends</div>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <button style={{ padding:'6px 14px', borderRadius:6, background:'rgba(120,200,201,0.1)',
                border:'1px solid rgba(120,200,201,0.3)', color:'#78c8c9',
                fontSize:13, cursor:'pointer', fontFamily:'inherit', outline:'none' }}>All Categories</button>
              <button style={{ padding:'6px 14px', borderRadius:6, background:'rgba(255,255,255,0.05)',
                border:'1px solid rgba(255,255,255,0.08)', color:'rgba(255,255,255,0.6)',
                fontSize:13, cursor:'pointer', fontFamily:'inherit', outline:'none' }}>Month</button>
            </div>
          </div>

          {/* Trend chart */}
          <div style={{ height:120, margin:'16px 0' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs><linearGradient id="otg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#78c8c9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#78c8c9" stopOpacity={0}/>
                </linearGradient></defs>
                <XAxis dataKey="w" tick={{fontSize:9,fill:'rgba(255,255,255,0.4)'}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontSize:9,fill:'rgba(255,255,255,0.4)'}} axisLine={false} tickLine={false} domain={[60,90]}/>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3"/>
                <Tooltip contentStyle={{background:'#19191b',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,fontSize:11,color:'#fff'}}/>
                <Area type="monotone" dataKey="v" stroke="#78c8c9" strokeWidth={2} fill="url(#otg)" dot={false} isAnimationActive/>
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Category grid */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
            {catData.map((cat,i) => (
              <div key={i} style={{ padding:'12px 14px', borderRadius:10,
                background:`${cat.color}08`, border:`1px solid ${cat.color}20` }}>
                <div style={{ fontSize:13, color:cat.color, marginBottom:6, lineHeight:1.3 }}>{cat.name}</div>
                <div style={{ fontSize:22, fontWeight:500, color:'#ffffff' }}>{cat.score}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Biomarkers tab ────────────────────────────────────────────────────
// Figma: 3 panels — Key Metrics (w:1318 h:884), Lab Tests (w:647 h:344), Genetic Test (w:647 h:344)
const bioGroups = [
  { name:'Hormones', count:'3 markers', warn:1, ok:2,
    markers:[
      { name:'Testosterone', val:'800', unit:'ng/dL', range:'300 - 900 ng/dL', color:'#d4af37' },
      { name:'Cortisol',     val:'14',  unit:'ng/dL', range:'6 - 18 ng/dL',    color:'#4ecdc4' },
      { name:'DHEA-S',       val:'280', unit:'ng/dL', range:'200 - 500',        color:'#4ecdc4' },
    ]},
  { name:'Inflammation', count:'2 markers', warn:0, ok:2,
    markers:[
      { name:'hs-CRP',      val:'1.2', unit:'mg/L',   range:'0 - 3 mg/L',    color:'#4ecdc4' },
      { name:'Homocysteine',val:'8.5', unit:'nmol/L', range:'5 - 12 nmol/L', color:'#4ecdc4' },
    ]},
  { name:'Vitamins', count:'2 markers', warn:1, ok:1,
    markers:[
      { name:'Vitamin D',  val:'28', unit:'ng/mL', range:'30 - 100 ng/mL', color:'#ff2056' },
      { name:'B12',        val:'420',unit:'pg/mL', range:'200 - 900 pg/mL',color:'#4ecdc4' },
    ]},
  { name:'Performance', count:'2 markers', warn:0, ok:2,
    markers:[
      { name:'VO₂ Max',      val:'48', unit:'ml/kg/min', range:'>42',     color:'#4ecdc4' },
      { name:'Grip Strength',val:'52', unit:'kg',        range:'>44 kg',  color:'#4ecdc4' },
    ]},
]

const LAB_TESTS = [
  { name:'Comprehensive Blood Panel', date:'Mar 1, 2026'  },
  { name:'Hormone Panel',             date:'Feb 15, 2026' },
  { name:'Lipid Profile',             date:'Feb 1, 2026'  },
]
const GENETIC_TESTS = [
  { name:'23andMe Full Genome',  detail:'156 markers • Jan 5, 2026'   },
  { name:'Nutrigenomics Panel',  detail:'42 markers • Dec 10, 2025'   },
]

function BiomarkersTab() {
  return (
    <div style={{ flex:1, overflowY:'auto', padding:'20px 24px', display:'flex', gap:16 }}>
      {/* Main biomarkers panel — Figma: w:1318 h:884 */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', gap:12 }}>
        <div style={{ background:'#19191b', border:'1px solid rgba(255,255,255,0.07)',
          borderRadius:12, padding:'18px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
            <div>
              <div style={{ fontSize:20, fontWeight:500, color:'#ffffff', marginBottom:2 }}>Key Metrics</div>
              <div style={{ fontSize:14, color:'rgba(255,255,255,0.5)' }}>Comprehensive biomarker tracking</div>
            </div>
            <div>
              <div style={{ fontSize:20, fontWeight:500, color:'#ffffff', marginBottom:2 }}>
                Biomarkers <span style={{ fontSize:16, fontWeight:400, color:'#757677' }}>(16 markers)</span>
              </div>
              {/* Summary counts — Figma: Critical 2 #ff2056, Monitor 1 #d4af37, Optimal 12 #78c8c9 */}
              <div style={{ display:'flex', gap:16, marginTop:8 }}>
                {[{l:'Critical',v:'2',c:'#ff2056'},{l:'Monitor',v:'1',c:'#d4af37'},{l:'Optimal',v:'12',c:'#78c8c9'},{l:'Total Markers',v:'15',c:'#737374'}].map((s,i)=>(
                  <div key={i} style={{ textAlign:'center' }}>
                    <div style={{ fontSize:24, fontWeight:700, color:s.c }}>{s.v}</div>
                    <div style={{ fontSize:12, color:'rgba(255,255,255,0.6)' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Biomarker groups grid */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            {bioGroups.map((g,i) => (
              <div key={i} style={{ padding:'14px', background:'rgba(255,255,255,0.03)',
                border:'1px solid rgba(255,255,255,0.06)', borderRadius:10 }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
                  <span style={{ fontSize:15, fontWeight:500, color:'#ffffff' }}>{g.name}</span>
                  <div style={{ display:'flex', gap:6, fontSize:11 }}>
                    <span style={{ fontSize:12, fontWeight:500, color:'#ffffff' }}>{g.count}</span>
                    {g.warn>0 && <span style={{ color:'#d4af37' }}>{g.warn}</span>}
                    {g.ok>0 && <span style={{ color:'#4ecdc4' }}>{g.ok}</span>}
                  </div>
                </div>
                {g.markers.map((m,j) => (
                  <div key={j} style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
                    padding:'8px 0', borderTop:'1px solid rgba(255,255,255,0.05)' }}>
                    <div>
                      <div style={{ fontSize:13, fontWeight:500, color:'#ffffff', marginBottom:2 }}>{m.name}</div>
                      <div style={{ fontSize:10, color:'rgba(255,255,255,0.4)' }}>
                        Range: <span style={{ color:'rgba(255,255,255,0.7)' }}>{m.range}</span>
                      </div>
                    </div>
                    <div style={{ textAlign:'right' }}>
                      <span style={{ fontSize:17, fontWeight:600, color:m.color }}>{m.val}</span>
                      <span style={{ fontSize:11, color:'rgba(255,255,255,0.5)', marginLeft:3 }}>{m.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right column: Lab Tests + Genetic Tests */}
      <div style={{ width:260, flexShrink:0, display:'flex', flexDirection:'column', gap:12 }}>
        {/* Lab Tests — Figma: x:443 w:647 h:344 */}
        <div style={{ background:'#19191b', border:'1px solid rgba(255,255,255,0.07)',
          borderRadius:12, padding:'18px' }}>
          <div style={{ fontSize:20, fontWeight:500, color:'#ffffff', marginBottom:4 }}>Lab Tests</div>
          <div style={{ fontSize:14, color:'rgba(255,255,255,0.5)', marginBottom:14 }}>List of lab tests that client has</div>
          <div style={{ display:'flex', gap:8, marginBottom:14 }}>
            {['All','Recent'].map((f,i) => (
              <button key={i} style={{ padding:'5px 12px', borderRadius:6, cursor:'pointer',
                fontFamily:'inherit', fontSize:13, outline:'none',
                background: i===1?'rgba(78,205,196,0.1)':'rgba(255,255,255,0.05)',
                border: `1px solid ${i===1?'rgba(78,205,196,0.3)':'rgba(255,255,255,0.08)'}`,
                color: i===1?'#4ecdc4':'rgba(255,255,255,0.6)' }}>{f}</button>
            ))}
          </div>
          {LAB_TESTS.map((t,i) => (
            <div key={i} style={{ padding:'10px 0', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize:13, color:'#ffffff', marginBottom:2 }}>{t.name}</div>
              <div style={{ fontSize:11, color:'rgba(255,255,255,0.4)' }}>{t.date}</div>
            </div>
          ))}
        </div>

        {/* Genetic Test — Figma: x:443 y:695 w:647 h:344 */}
        <div style={{ background:'#19191b', border:'1px solid rgba(255,255,255,0.07)',
          borderRadius:12, padding:'18px' }}>
          <div style={{ fontSize:20, fontWeight:500, color:'#ffffff', marginBottom:4 }}>Genetic Test</div>
          <div style={{ fontSize:14, color:'rgba(255,255,255,0.5)', marginBottom:14 }}>Information about genetic markers</div>
          <div style={{ display:'flex', gap:8, marginBottom:14 }}>
            {['All','Recent'].map((f,i) => (
              <button key={i} style={{ padding:'5px 12px', borderRadius:6, cursor:'pointer',
                fontFamily:'inherit', fontSize:13, outline:'none',
                background: i===1?'rgba(78,205,196,0.1)':'rgba(255,255,255,0.05)',
                border: `1px solid ${i===1?'rgba(78,205,196,0.3)':'rgba(255,255,255,0.08)'}`,
                color: i===1?'#4ecdc4':'rgba(255,255,255,0.6)' }}>{f}</button>
            ))}
          </div>
          {GENETIC_TESTS.map((t,i) => (
            <div key={i} style={{ padding:'10px 0', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize:13, color:'#ffffff', marginBottom:2 }}>{t.name}</div>
              <div style={{ fontSize:11, color:'rgba(255,255,255,0.4)' }}>{t.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Protocols tab ─────────────────────────────────────────────────────
// Figma: StrategyRecommendations + ProtocolPerformance
const PROTOCOLS = [
  { title:'Training protocol',    items:['3x strength training/week','2x cardio sessions','1x flexibility work'],            color:'#78c8c9' },
  { title:'Nutrition protocol',   items:['2200 kcal daily target','180g protein minimum','Low inflammatory foods'],           color:'#78a0d1' },
  { title:'Supplements protocol', items:['Vitamin D3 5000IU','Omega-3 2g EPA/DHA','Magnesium glycinate 400mg'],              color:'#d4af37' },
  { title:'Recovery protocol',    items:['7-8h sleep target','HRV-guided training','Weekly massage therapy'],                  color:'#4ecdc4' },
]
const perfData = [
  {name:'Training',    compliance:78},
  {name:'Nutrition',   compliance:65},
  {name:'Supplements', compliance:90},
  {name:'Recovery',    compliance:55},
]

function ProtocolsTab() {
  return (
    <div style={{ flex:1, overflowY:'auto', padding:'20px 24px', display:'flex', gap:16 }}>
      {/* Protocols list — Figma: StrategyRecommendations w:1318 h:285 */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', gap:12 }}>
        <div style={{ background:'#171719', border:'1px solid rgba(255,255,255,0.07)',
          borderRadius:12, padding:'18px' }}>
          <div style={{ fontSize:18, fontWeight:500, color:'#ffffff', marginBottom:4 }}>Protocols &amp; Recommendations</div>
          <div style={{ fontSize:14, color:'rgba(255,255,255,0.5)', marginBottom:18 }}>Protocols created by coach</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            {PROTOCOLS.map((p,i) => (
              <div key={i} style={{ padding:'14px 16px', background:'rgba(255,255,255,0.03)',
                border:'1px solid rgba(255,255,255,0.06)', borderRadius:10 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
                  <div style={{ width:6, height:6, borderRadius:'50%', background:p.color, flexShrink:0 }}/>
                  <span style={{ fontSize:14, fontWeight:500, color:'#ffffff' }}>{p.title}</span>
                </div>
                {p.items.map((item,j) => (
                  <div key={j} style={{ display:'flex', alignItems:'center', gap:8, padding:'5px 0',
                    borderTop:'1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ width:4, height:4, borderRadius:'50%', background:`${p.color}60`, flexShrink:0 }}/>
                    <span style={{ fontSize:12, color:'rgba(255,255,255,0.65)' }}>{item}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Protocol Performance — Figma: ProtocolPerformance w:1321 h:352 */}
        <div style={{ background:'#171719', border:'1px solid rgba(255,255,255,0.07)',
          borderRadius:12, padding:'18px' }}>
          <div style={{ fontSize:18, fontWeight:500, color:'#ffffff', marginBottom:4 }}>Protocol Performance</div>
          <div style={{ fontSize:14, color:'rgba(255,255,255,0.5)', marginBottom:18 }}>Protocol compliance by category</div>
          <div style={{ height:160 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={perfData} barSize={40}>
                <XAxis dataKey="name" tick={{fontSize:12,fill:'rgba(255,255,255,0.5)'}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontSize:10,fill:'rgba(255,255,255,0.4)'}} axisLine={false} tickLine={false} domain={[0,100]}/>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3"/>
                <Tooltip contentStyle={{background:'#19191b',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,fontSize:12,color:'#fff'}}
                  formatter={(v)=>[`${v}%`,'Compliance']}/>
                <Bar dataKey="compliance" radius={[6,6,0,0]}>
                  {perfData.map((d,i)=>(
                    <Cell key={i} fill={d.compliance>=75?'#78c8c9':d.compliance>=60?'#d4af37':'#ff6b6b'} fillOpacity={0.85}/>
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Notes tab ─────────────────────────────────────────────────────────
// Figma: Notes panel (w:1318 h:340) + History panel (w:1318 h:748)
const NOTE_TAGS = [
  { label:'Protocol Update', color:'#d4af37' },
  { label:'Consultation',    color:'#d0d0d0' },
  { label:'Lab Analysis',    color:'#d0d0d0' },
  { label:'Progress Check',  color:'#d0d0d0' },
]
const HISTORY = [
  { tag:'Protocol Update', tagColor:'#d4af37',  date:'10 Mar, 2026 - 2:30 pm',  text:'Client showed significant improvement in HRV after implementing new sleep protocol. Continue current approach and monitor.' },
  { tag:'Consultation',    tagColor:'#4ecdc4',  date:'8 Mar, 2026 - 10:15 am',  text:'Discussion about stress management strategies. Client reports high workload. Suggested meditation protocol and adjusted training.' },
  { tag:'Lab Analysis',    tagColor:'#9b59b6',  date:'5 Mar, 2026 - 4:45 pm',   text:'Vitamin D declining despite supplementation. Increased dosage from 2000 IU to 4000 IU. Schedule follow-up in 6 weeks.' },
  { tag:'Progress Check',  tagColor:'#2ecc71',  date:'2 Mar, 2026 - 11:20 am',  text:'Great progress on body composition! Lost 3% body fat while maintaining muscle mass. Continue current protocol.' },
]

function NotesTab() {
  const [noteText, setNoteText] = useState('')
  const [activeTag, setActiveTag] = useState(0)

  return (
    <div style={{ flex:1, overflowY:'auto', padding:'20px 24px', display:'flex', flexDirection:'column', gap:12 }}>
      {/* Notes input panel — Figma: Notes w:1318 h:340 */}
      <div style={{ background:'#19191b', border:'1px solid rgba(255,255,255,0.07)',
        borderRadius:12, padding:'18px' }}>
        <div style={{ fontSize:18, fontWeight:500, color:'#ffffff', marginBottom:4 }}>Notes</div>
        <div style={{ fontSize:14, color:'rgba(255,255,255,0.5)', marginBottom:14 }}>
          Notes that coach can make during consultations or while creating the strategy
        </div>
        {/* Text area — Figma: "Type anything, @mention anyone..." size:16 */}
        <textarea value={noteText} onChange={e=>setNoteText(e.target.value)}
          placeholder="Type anything, @mention anyone..."
          style={{ width:'100%', minHeight:80, padding:'12px 14px', boxSizing:'border-box',
            background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)',
            borderRadius:8, color:'#ffffff', fontSize:15, outline:'none',
            fontFamily:'inherit', resize:'none', lineHeight:1.5,
            transition:'border-color 0.2s' }}
          onFocus={e=>e.target.style.borderColor='rgba(120,200,201,0.4)'}
          onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.08)'}
        />
        {/* Tag selector + Save button */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:12 }}>
          <div style={{ display:'flex', gap:8 }}>
            {NOTE_TAGS.map((t,i) => (
              <button key={i} onClick={()=>setActiveTag(i)}
                style={{ padding:'5px 12px', borderRadius:6, cursor:'pointer',
                  fontFamily:'inherit', fontSize:12, fontWeight:500, outline:'none',
                  background: activeTag===i ? `${t.color}18` : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${activeTag===i ? `${t.color}40` : 'rgba(255,255,255,0.08)'}`,
                  color: activeTag===i ? t.color : '#d0d0d0',
                  transition:'all 0.15s' }}>
                {t.label}
              </button>
            ))}
          </div>
          {/* Save button — Figma: color #000000 on gradient */}
          <motion.button whileTap={{scale:0.97}}
            style={{ padding:'9px 24px', background:'linear-gradient(135deg,#78a0d1,#78c8c9)',
              border:'none', borderRadius:8, color:'#000000',
              fontSize:14, fontWeight:500, cursor:'pointer', fontFamily:'inherit' }}>
            Save
          </motion.button>
        </div>
      </div>

      {/* History panel — Figma: History w:1318 h:748 */}
      <div style={{ background:'#19191b', border:'1px solid rgba(255,255,255,0.07)',
        borderRadius:12, padding:'18px' }}>
        <div style={{ fontSize:18, fontWeight:500, color:'#ffffff', marginBottom:4 }}>History</div>
        <div style={{ fontSize:14, color:'rgba(255,255,255,0.5)', marginBottom:16 }}>
          All notes and updates related to this client
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {HISTORY.map((h,i) => (
            <motion.div key={i} initial={{opacity:0,y:4}} animate={{opacity:1,y:0}} transition={{delay:i*0.07}}
              style={{ padding:'14px 16px', background:'rgba(255,255,255,0.03)',
                border:'1px solid rgba(255,255,255,0.06)', borderRadius:10 }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
                <span style={{ fontSize:12, fontWeight:500, color:h.tagColor,
                  background:`${h.tagColor}15`, padding:'2px 8px', borderRadius:4,
                  border:`1px solid ${h.tagColor}30` }}>{h.tag}</span>
                <span style={{ fontSize:12, color:'rgba(255,255,255,0.5)' }}>{h.date}</span>
              </div>
              <p style={{ margin:0, fontSize:14, color:'rgba(255,255,255,0.75)', lineHeight:1.6 }}>{h.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Main ClientPage component ─────────────────────────────────────────
export default function TabletClientPage({ client, onBack, annotationsVisible }) {
  const [activeTab, setActiveTab] = useState('Overview')

  const renderTab = () => {
    switch(activeTab) {
      case 'Overview':    return <OverviewTab/>
      case 'biomarkers':  return <BiomarkersTab/>
      case 'protocols':   return <ProtocolsTab/>
      case 'notes':       return <NotesTab/>
      default:            return <OverviewTab/>
    }
  }

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', background:'#0a0a0a' }}>
      {annotationsVisible && <div className="annotation-badge">TAB-CLIENT · {activeTab}</div>}
      <ClientHeader client={client} activeTab={activeTab} onTab={setActiveTab} onBack={onBack}/>
      <AnimatePresence mode="wait">
        <motion.div key={activeTab}
          initial={{opacity:0,y:4}} animate={{opacity:1,y:0}} exit={{opacity:0}}
          transition={{duration:0.15}}
          style={{ flex:1, overflow:'hidden', display:'flex', flexDirection:'column' }}>
          {renderTab()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
