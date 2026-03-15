import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ChevronRight, ChevronDown } from 'lucide-react'

// Exact data from Figma Clients List (76:145)
// Columns: Client Name, Age, bio Age, Score, risk, Alerts, Protocol compliance, Last updates, status, actions
const CLIENTS = [
  { name:'Jack Blake',    initials:'JB', age:45, bioAge:38, score:'81%', risk:'Low',    riskColor:'#78c8c9', alert:'None',             status:'active',   statusColor:'#78c8c9', joined:'Mar 06, 2026', plan:'Premium' },
  { name:'Antonio Engle', initials:'AE', age:52, bioAge:46, score:'78%', risk:'High',   riskColor:'#ff2056', alert:'High CRP',          status:'active',   statusColor:'#78c8c9', joined:'Feb 12, 2026', plan:'Core'    },
  { name:'Leo Kelly',     initials:'LK', age:50, bioAge:51, score:'70%', risk:'High',   riskColor:'#ff2056', alert:'Sleep Debt',        status:'active',   statusColor:'#78c8c9', joined:'Jan 20, 2026', plan:'Premium' },
  { name:'Adam Walker',   initials:'AW', age:46, bioAge:50, score:'66%', risk:'High',   riskColor:'#ff2056', alert:'Elevated Glucose',  status:'active',   statusColor:'#78c8c9', joined:'Mar 01, 2026', plan:'Premium' },
  { name:'James Kirwin',  initials:'JK', age:45, bioAge:41, score:'82%', risk:'Low',    riskColor:'#78c8c9', alert:'Low HRV',           status:'active',   statusColor:'#78c8c9', joined:'Dec 15, 2025', plan:'Core'    },
  { name:'John Weaver',   initials:'JW', age:60, bioAge:58, score:'62%', risk:'Low',    riskColor:'#78c8c9', alert:'None',              status:'active',   statusColor:'#78c8c9', joined:'Feb 28, 2026', plan:'Core'    },
  { name:'Gary Hennessy', initials:'GH', age:48, bioAge:44, score:'86%', risk:'Medium', riskColor:'#d4af37', alert:'High Testosterone', status:'active',   statusColor:'#78c8c9', joined:'Jan 05, 2026', plan:'Premium' },
  { name:'Kevin Panek',   initials:'KP', age:41, bioAge:38, score:'80%', risk:'High',   riskColor:'#ff2056', alert:'Sleep Debt',        status:'active',   statusColor:'#78c8c9', joined:'Feb 18, 2026', plan:'Core'    },
  { name:'William Levy',  initials:'WL', age:45, bioAge:38, score:'56%', risk:'High',   riskColor:'#ff2056', alert:'High CRP',          status:'active',   statusColor:'#78c8c9', joined:'Mar 03, 2026', plan:'Core'    },
  { name:'Mike Klotz',    initials:'MK', age:52, bioAge:46, score:'78%', risk:'Medium', riskColor:'#d4af37', alert:'High Testosterone', status:'active',   statusColor:'#78c8c9', joined:'Dec 20, 2025', plan:'Premium' },
  { name:'Greg Mitchel',  initials:'GM', age:50, bioAge:51, score:'70%', risk:'High',   riskColor:'#ff2056', alert:'High Insulin',      status:'paused',   statusColor:'#ff2056', joined:'Jan 10, 2026', plan:'Core'    },
  { name:'Connor Smith',  initials:'CS', age:46, bioAge:41, score:'66%', risk:'Low',    riskColor:'#78c8c9', alert:'None',              status:'paused',   statusColor:'#ff2056', joined:'Feb 07, 2026', plan:'Premium' },
  { name:'James Arnolds', initials:'JA', age:45, bioAge:41, score:'82%', risk:'Low',    riskColor:'#78c8c9', alert:'Sleep Debt',        status:'paused',   statusColor:'#ff2056', joined:'Jan 15, 2026', plan:'Core'    },
]

const COLS = ['Client Name','Age','bio Age','Score','risk','Alerts','status']

export default function TabletClients({ onSelectClient, annotationsVisible }) {
  const [search, setSearch] = useState('')

  const filtered = CLIENTS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', background:'#0a0a0a' }}>
      {annotationsVisible && <div className="annotation-badge">TAB-CLIENTS · Clients List</div>}

      {/* Header row — Figma: "Clients" size:22 weight:300 + "Digital Twin approach" size:12 */}
      <div style={{ padding:'20px 24px 16px', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:16 }}>
          <div>
            <div style={{ fontSize:22, fontWeight:300, color:'#fdfffc', letterSpacing:'-0.02em' }}>Clients</div>
            <div style={{ fontSize:12, color:'rgba(253,255,252,0.5)', marginTop:2 }}>Digital Twin approach</div>
          </div>
          <div style={{ fontSize:12, color:'rgba(255,255,255,0.35)', fontFamily:'"DM Mono",monospace' }}>
            {filtered.length} clients
          </div>
        </div>

        {/* Filter bar — Figma: Search, Select Date, Options, Filter 1/2/3, Sort By */}
        <div style={{ display:'flex', gap:8, alignItems:'center', flexWrap:'wrap' }}>
          {/* Search */}
          <div style={{ display:'flex', alignItems:'center', gap:8, flex:1, minWidth:160,
            background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)',
            borderRadius:8, padding:'7px 12px' }}>
            <Search size={13} color="#a6aaaf"/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search"
              style={{ background:'none', border:'none', color:'rgba(255,255,255,0.8)', fontSize:14,
                outline:'none', fontFamily:'inherit', width:'100%' }}/>
          </div>
          {/* Filter pills — Figma: Filter 1, 2, 3 color:#f2f2f2 on dark bg */}
          {['Select Date','Filter 1','Filter 2','Filter 3'].map((f,i) => (
            <button key={i} className="hover-surface" style={{ padding:'7px 12px', borderRadius:8,
              background: i===0 ? 'rgba(255,255,255,0.05)' : 'rgba(120,200,201,0.08)',
              border: `1px solid ${i===0 ? 'rgba(255,255,255,0.08)' : 'rgba(120,200,201,0.2)'}`,
              color: i===0 ? '#212b36' : '#f2f2f2',
              fontSize:13, cursor:'pointer', fontFamily:'inherit', outline:'none',
              display:'flex', alignItems:'center', gap:4 }}>
              {f} {i===0 && <ChevronDown size={12}/>}
            </button>
          ))}
          {/* Sort By */}
          <div style={{ display:'flex', alignItems:'center', gap:6, marginLeft:'auto',
            fontSize:13, color:'rgba(255,255,255,0.5)' }}>
            <span style={{ fontWeight:600, color:'#212b36' }}>Sort By :</span>
            <span style={{ color:'#212b36' }}>Last 7 Days</span>
            <ChevronDown size={12} color="#212b36"/>
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ flex:1, overflow:'auto', padding:'0 24px 20px' }}>
        {/* Header row */}
        <div style={{ display:'grid',
          gridTemplateColumns:'2fr 60px 80px 70px 80px 1fr 80px 28px',
          gap:12, padding:'8px 14px',
          borderBottom:'1px solid rgba(255,255,255,0.08)', marginBottom:4 }}>
          {['Client Name','Age','bio Age','Score','risk','Alerts','status',''].map((h,i) => (
            <div key={i} style={{ fontSize:13, fontWeight:400, color:'#f2f2f2',
              letterSpacing:'0.02em', paddingTop:2, paddingBottom:2 }}>
              {h}
            </div>
          ))}
        </div>

        {/* Data rows */}
        {filtered.map((c,i) => (
          <motion.div key={c.name}
            initial={{opacity:0,y:4}} animate={{opacity:1,y:0}} transition={{delay:i*0.03}}
            whileHover={{background:'rgba(255,255,255,0.03)'}}
            onClick={() => onSelectClient({ ...c })}
            style={{ display:'grid',
              gridTemplateColumns:'2fr 60px 80px 70px 80px 1fr 80px 28px',
              gap:12, padding:'11px 14px', borderRadius:8,
              borderBottom:'1px solid rgba(255,255,255,0.04)',
              cursor:'pointer', transition:'background 0.15s', alignItems:'center' }}>

            {/* Client name + avatar */}
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ width:30, height:30, borderRadius:'50%', flexShrink:0,
                background:'linear-gradient(135deg,rgba(120,160,209,0.3),rgba(120,200,201,0.3))',
                border:'1px solid rgba(120,200,201,0.25)',
                display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ fontSize:10, fontWeight:600, color:'#78c8c9' }}>{c.initials}</span>
              </div>
              <span style={{ fontSize:14, fontWeight:500, color:'#f2f2f2', whiteSpace:'nowrap',
                overflow:'hidden', textOverflow:'ellipsis' }}>{c.name}</span>
            </div>

            <span style={{ fontSize:14, fontWeight:500, color:'#f2f2f2' }}>{c.age}</span>
            <span style={{ fontSize:14, fontWeight:500, color:'#f2f2f2' }}>{c.bioAge}</span>
            <span style={{ fontSize:14, fontWeight:500, color:'#f2f2f2' }}>{c.score}</span>

            {/* Risk badge */}
            <div style={{ display:'inline-flex', padding:'2px 8px', borderRadius:4,
              background:`${c.riskColor}12`, border:`1px solid ${c.riskColor}30` }}>
              <span style={{ fontSize:10, color:c.riskColor }}>{c.risk}</span>
            </div>

            <span style={{ fontSize:13, color:'#f2f2f2', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{c.alert}</span>

            {/* Status badge */}
            <div style={{ display:'inline-flex', padding:'2px 8px', borderRadius:4,
              background:`${c.statusColor}12`, border:`1px solid ${c.statusColor}30` }}>
              <span style={{ fontSize:10, color:c.statusColor }}>{c.status}</span>
            </div>

            <ChevronRight size={14} color="rgba(255,255,255,0.2)"/>
          </motion.div>
        ))}

        {/* Pagination — Figma: Row Per Page, 10, Entries, 1 2 3 [4] 15 */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'14px 14px 0', borderTop:'1px solid rgba(255,255,255,0.06)', marginTop:8 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'#9c9d9b' }}>
            <span>Row Per Page</span>
            <div style={{ padding:'4px 10px', background:'rgba(255,255,255,0.05)',
              border:'1px solid rgba(255,255,255,0.08)', borderRadius:6,
              fontSize:12, color:'#f2f2f2' }}>10</div>
            <span>Entries</span>
          </div>
          <div style={{ display:'flex', gap:4 }}>
            {[1,2,3,4,15].map(n => (
              <div key={n} className="hover-surface" style={{ width:28, height:28, borderRadius:6, display:'flex',
                alignItems:'center', justifyContent:'center', cursor:'pointer',
                background: n===4 ? '#78c8c9' : 'transparent',
                fontSize:12, color: n===4 ? '#0a0a0a' : '#9c9d9b' }}>
                {n}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
