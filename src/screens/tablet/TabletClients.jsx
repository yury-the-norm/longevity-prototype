import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ChevronRight, Filter } from 'lucide-react'

// Exact client list from Figma (76:145)
const clients = [
  { name:'Jack Blake',     age:41, score:82, status:'critical', plan:'Premium', joined:'Mar 06, 2026', initials:'JB' },
  { name:'Antonio Engle',  age:45, score:88, status:'optimal',  plan:'Core',    joined:'Feb 12, 2026', initials:'AE' },
  { name:'Leo Kelly',      age:50, score:71, status:'critical', plan:'Premium', joined:'Jan 20, 2026', initials:'LK' },
  { name:'Adam Walker',    age:46, score:90, status:'optimal',  plan:'Premium', joined:'Mar 01, 2026', initials:'AW' },
  { name:'James Kirwin',   age:45, score:85, status:'optimal',  plan:'Core',    joined:'Dec 15, 2025', initials:'JK' },
  { name:'John Weaver',    age:60, score:76, status:'warn',     plan:'Core',    joined:'Feb 28, 2026', initials:'JW' },
  { name:'Gary Hennessy',  age:48, score:91, status:'optimal',  plan:'Premium', joined:'Jan 05, 2026', initials:'GH' },
  { name:'Kevin Panek',    age:52, score:83, status:'optimal',  plan:'Core',    joined:'Feb 18, 2026', initials:'KP' },
  { name:'William Levy',   age:41, score:79, status:'warn',     plan:'Core',    joined:'Mar 03, 2026', initials:'WL' },
  { name:'Mike Klotz',     age:45, score:87, status:'optimal',  plan:'Premium', joined:'Dec 20, 2025', initials:'MK' },
  { name:'Greg Mitchel',   age:52, score:68, status:'critical', plan:'Core',    joined:'Jan 10, 2026', initials:'GM' },
  { name:'Connor Smith',   age:50, score:92, status:'optimal',  plan:'Premium', joined:'Feb 07, 2026', initials:'CS' },
]

const statusColor  = { critical:'#ff6b6b', warn:'#e67e22', optimal:'#05df72' }
const statusLabel  = { critical:'Critical', warn:'Monitor', optimal:'Optimal' }

export default function TabletClients({ onSelectClient, annotationsVisible }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = clients.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || c.status === filter
    return matchSearch && matchFilter
  })

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      {annotationsVisible && <div className="annotation-badge">TAB-03 · Clients</div>}

      {/* Header */}
      <div style={{ padding:'24px 28px 16px', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:20 }}>
          <div>
            <div style={{ fontSize:22, fontWeight:300, color:'#fdfffc', letterSpacing:'-0.02em' }}>Clients</div>
            <div style={{ fontSize:12, color:'rgba(253,255,252,0.4)', marginTop:2 }}>Digital Twin approach</div>
          </div>
          <div style={{ fontSize:12, color:'rgba(253,255,252,0.35)', fontFamily:'DM Mono,monospace' }}>
            {filtered.length} clients
          </div>
        </div>

        {/* Search + filters */}
        <div style={{ display:'flex', gap:10, alignItems:'center' }}>
          <div style={{ position:'relative', flex:1 }}>
            <Search size={14} color="rgba(253,255,252,0.3)" style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)' }} />
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search"
              style={{ width:'100%', padding:'9px 12px 9px 34px',
                background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)',
                borderRadius:8, color:'rgba(253,255,252,0.8)', fontSize:14, outline:'none', fontFamily:'inherit' }}
              onFocus={e=>e.target.style.borderColor='rgba(120,200,201,0.4)'}
              onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.08)'} />
          </div>
          {['all','critical','warn','optimal'].map(f => (
            <button key={f} onClick={()=>setFilter(f)}
              style={{ padding:'8px 14px', borderRadius:8, border:'none', cursor:'pointer',
                fontFamily:'inherit', fontSize:13, transition:'all 0.15s',
                background: filter===f ? 'rgba(120,200,201,0.12)' : 'rgba(255,255,255,0.04)',
                color: filter===f ? '#78c8c9' : 'rgba(253,255,252,0.45)',
                outline:'none' }}>
              {f==='all' ? 'All' : statusLabel[f]}
            </button>
          ))}
        </div>
      </div>

      {/* Table header */}
      <div style={{ padding:'0 28px', flexShrink:0 }}>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 80px 100px 80px 1fr 32px',
          gap:12, padding:'8px 14px',
          borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
          {['Client Name','Age','Status','Score','Plan',''].map((h,i)=>(
            <div key={i} style={{ fontSize:12, fontWeight:500,
              color:'rgba(253,255,252,0.35)', letterSpacing:'0.04em', textTransform:'uppercase', fontSize:11 }}>
              {h}
            </div>
          ))}
        </div>
      </div>

      {/* Rows */}
      <div style={{ flex:1, overflowY:'auto', padding:'0 28px 24px' }}>
        {filtered.map((client, i) => (
          <motion.div key={client.name}
            initial={{opacity:0, y:6}} animate={{opacity:1, y:0}} transition={{delay:i*0.04}}
            whileHover={{ background:'rgba(255,255,255,0.03)' }}
            onClick={() => onSelectClient(client)}
            style={{ display:'grid', gridTemplateColumns:'2fr 80px 100px 80px 1fr 32px',
              gap:12, padding:'13px 14px', borderRadius:10,
              borderBottom:'1px solid rgba(255,255,255,0.04)',
              cursor:'pointer', transition:'background 0.15s', alignItems:'center' }}>

            {/* Name + initials */}
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ width:32, height:32, borderRadius:'50%', flexShrink:0,
                background:'linear-gradient(135deg,#78a0d120,#78c8c920)',
                border:'1px solid rgba(120,200,201,0.2)',
                display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ fontSize:11, fontWeight:600, color:'#78c8c9' }}>{client.initials}</span>
              </div>
              <div>
                <div style={{ fontSize:14, fontWeight:500, color:'#fdfffc' }}>{client.name}</div>
                <div style={{ fontSize:11, color:'rgba(253,255,252,0.35)' }}>Joined {client.joined}</div>
              </div>
            </div>

            <div style={{ fontSize:14, fontWeight:500, color:'rgba(253,255,252,0.8)' }}>{client.age}</div>

            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:statusColor[client.status] }} />
              <span style={{ fontSize:13, color:statusColor[client.status] }}>{statusLabel[client.status]}</span>
            </div>

            <div style={{ fontSize:14, fontWeight:700, color:'#fdfffc' }}>{client.score}</div>

            <div style={{ fontSize:13,
              color: client.plan==='Premium' ? '#78c8c9' : 'rgba(253,255,252,0.5)' }}>
              {client.plan}
            </div>

            <ChevronRight size={14} color="rgba(253,255,252,0.25)" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
