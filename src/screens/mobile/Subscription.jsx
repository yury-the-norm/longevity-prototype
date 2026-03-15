import { motion } from 'framer-motion'
import { Check, ChevronLeft } from 'lucide-react'
import { useState } from 'react'

// Exact data from Figma extraction
const coach = {
  name: 'Alex Morgan',
  title: 'Direction: Performance longevity',
  exp: 'Experience: 12+ yrs coaching',
  quote: '"Extend high performance lifespan through muscle quality, metabolic control, and resilience."',
  initials: 'AM',
}

const plans = [
  {
    id: 'core',
    name: 'core',
    price: '$299/mo',
    features: ['monthly adjustments', 'asynchronous messaging'],
    grad: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$499/mo',
    features: ['weekly strategic refinement', 'direct messaging', 'therapist consultation', 'biannual performance audits'],
    grad: true,
    recommended: true,
  },
]

export default function Subscription({ onBack, annotationsVisible }) {
  const [selected, setSelected] = useState('premium')

  return (
    <div style={{ width:'100%', height:'100%', position:'relative',
      background:'linear-gradient(160deg,#1c1d21 0%,#0e0e12 100%)',
      display:'flex', flexDirection:'column',
    }}>
      {annotationsVisible && <div className="annotation-badge">MOB-09 · Subscription</div>}

      <div className="screen-scroll" style={{ flex:1, padding:'52px 16px 100px' }}>

        {/* Back */}
        <motion.button whileTap={{scale:0.85}} onClick={onBack}
          style={{ width:32, height:32, borderRadius:'50%', background:'rgba(255,255,255,0.06)',
            border:'1px solid rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center',
            cursor:'pointer', marginBottom:16 }}>
          <ChevronLeft size={16} color="rgba(253,255,252,0.8)" />
        </motion.button>

        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}
          style={{ fontSize:24, fontWeight:500, color:'#fdfffc', letterSpacing:'-0.02em', marginBottom:20 }}>
          Subscription details
        </motion.div>

        {/* Coach card */}
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
          style={{ padding:'16px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)',
            borderRadius:14, marginBottom:20, display:'flex', gap:12, alignItems:'flex-start' }}>
          {/* Avatar */}
          <div style={{ width:48, height:48, borderRadius:'50%', background:'linear-gradient(135deg,#78a0d1,#78c8c9)',
            display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <span style={{ fontSize:16, fontWeight:600, color:'#0a0a0a' }}>{coach.initials}</span>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:18, fontWeight:500, color:'#fdfffc', marginBottom:4 }}>{coach.name}</div>
            <div style={{ fontSize:12, color:'rgba(253,255,252,0.5)', marginBottom:2 }}>{coach.title}</div>
            <div style={{ fontSize:12, color:'rgba(253,255,252,0.5)', marginBottom:10 }}>{coach.exp}</div>
            <div style={{ fontSize:12, color:'rgba(253,255,252,0.6)', fontStyle:'italic', lineHeight:1.5 }}>
              {coach.quote}
            </div>
          </div>
        </motion.div>

        {/* Plans label */}
        <div style={{ fontSize:12, fontWeight:500, color:'rgba(253,255,252,0.5)',
          letterSpacing:'0.06em', textTransform:'uppercase', fontSize:10, marginBottom:12 }}>
          Plans and pricing
        </div>

        {/* Plan cards */}
        {plans.map((plan, i) => (
          <motion.div key={plan.id}
            initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.15+i*0.08}}
            onClick={() => setSelected(plan.id)}
            style={{ padding:'18px', marginBottom:10, borderRadius:14, cursor:'pointer',
              background: selected===plan.id ? 'rgba(120,200,201,0.08)' : 'rgba(255,255,255,0.04)',
              border:`1px solid ${selected===plan.id ? 'rgba(120,200,201,0.4)' : 'rgba(255,255,255,0.07)'}`,
              transition:'all 0.2s',
            }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
              <div style={{ fontSize:18, fontWeight:500, color:'#fdfffc', textTransform: plan.id==='core' ? 'lowercase' : 'none' }}>
                {plan.name}
              </div>
              <div>
                <span style={{ fontSize:20, fontWeight:300, color:'#fdfffc' }}>{plan.price}</span>
              </div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:6, marginBottom:14 }}>
              {plan.features.map(f => (
                <div key={f} style={{ display:'flex', alignItems:'center', gap:8, fontSize:14, color:'rgba(253,255,252,0.7)' }}>
                  <Check size={12} color="#78c8c9" />
                  {f}
                </div>
              ))}
            </div>
            <motion.button whileTap={{scale:0.97}}
              style={{ width:'100%', padding:'12px',
                background: plan.grad ? 'linear-gradient(135deg,#78a0d1,#78c8c9)' : 'rgba(255,255,255,0.08)',
                border: plan.grad ? 'none' : '1px solid rgba(255,255,255,0.15)',
                borderRadius:8, color: plan.grad ? '#0a0a0a' : '#fdfffc',
                fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
              select {plan.name.toLowerCase()} plan
            </motion.button>
          </motion.div>
        ))}

        {/* How does it work */}
        <div style={{ textAlign:'center', padding:'8px 0' }}>
          <span style={{ fontSize:14, fontWeight:500, color:'rgba(253,255,252,0.6)', cursor:'pointer' }}>
            How does it work?
          </span>
          <span style={{ fontSize:12, color:'rgba(253,255,252,0.3)', marginLeft:6 }}>(Step-by-step guide)</span>
        </div>

      </div>
    </div>
  )
}
