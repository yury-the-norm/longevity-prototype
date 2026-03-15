import { motion } from 'framer-motion'
import { Search, ChevronRight, Check } from 'lucide-react'
import { useState } from 'react'

const providers = [
  { name: 'Quest Diagnostics', type: 'Health System' },
  { name: 'HealthPartners', type: 'Health System' },
  { name: 'Mayo Clinic', type: 'Health System' },
  { name: 'Kaiser Permanente', type: 'Health System' },
  { name: 'Epic MyChart', type: 'Electronic Health Record' },
  { name: 'Cerner', type: 'Electronic Health Record' },
]

export default function MedRecs({ onNext, annotationsVisible }) {
  const [query, setQuery] = useState('')
  const filtered = providers.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div style={{ width:'100%', height:'100%', position:'relative',
      background:'linear-gradient(160deg,#1c1d21 0%,#0e0e12 100%)',
      display:'flex', flexDirection:'column', padding:'56px 16px 32px',
    }}>
      {annotationsVisible && <div className="annotation-badge">MOB-04 · Medical Records</div>}

      <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}>
        <div style={{ fontSize:24, fontWeight:500, color:'#fdfffc', letterSpacing:'-0.02em', marginBottom:10 }}>
          Medical Records
        </div>
        <div style={{ fontSize:14, color:'rgba(253,255,252,0.6)', lineHeight:1.6, marginBottom:24 }}>
          Connect your healthcare provider via FHIR to securely import lab results, conditions, and clinical data.
        </div>
      </motion.div>

      {/* Search */}
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.1}}
        style={{ position:'relative', marginBottom:16 }}>
        <Search size={14} color="rgba(253,255,252,0.35)"
          style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)' }} />
        <input value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Search provider or health system..."
          style={{ width:'100%', padding:'12px 16px 12px 38px',
            background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)',
            borderRadius:10, color:'#fdfffc', fontSize:14, outline:'none', fontFamily:'inherit' }}
          onFocus={e => e.target.style.borderColor='#78c8c9'}
          onBlur={e => e.target.style.borderColor='rgba(255,255,255,0.1)'}
        />
      </motion.div>

      {/* Provider list */}
      <div style={{ flex:1, overflow:'auto' }}>
        {filtered.map((p, i) => (
          <motion.div key={p.name}
            initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.15+i*0.05}}
            onClick={onNext}
            style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'14px 16px', marginBottom:6,
              background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)',
              borderRadius:12, cursor:'pointer', transition:'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background='rgba(120,200,201,0.08)'}
            onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.04)'}
          >
            <div>
              <div style={{ fontSize:14, fontWeight:500, color:'#fdfffc', marginBottom:2 }}>{p.name}</div>
              <div style={{ fontSize:12, color:'rgba(253,255,252,0.4)' }}>{p.type}</div>
            </div>
            <ChevronRight size={16} color="rgba(253,255,252,0.25)" />
          </motion.div>
        ))}
      </div>

      <motion.button whileTap={{scale:0.97}} onClick={onNext}
        style={{ background:'none', border:'none', color:'rgba(253,255,252,0.5)',
          fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'inherit', padding:'12px', marginTop:8 }}>
        Not now
      </motion.button>
    </div>
  )
}
