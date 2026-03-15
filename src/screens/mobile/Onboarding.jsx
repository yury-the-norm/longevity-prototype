import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Check, RotateCcw } from 'lucide-react'

const goals = [
  { id:'muscle',      label:'Build Muscle',           category:'Physique' },
  { id:'stronger',    label:'Get stronger',            category:'Physique' },
  { id:'fat',         label:'Reduce Body Fat',         category:'Physique' },
  { id:'conditioning',label:'Improve Conditioning',    category:'Performance' },
  { id:'recovery',    label:'Improve Recovering',      category:'Performance' },
  { id:'aging',       label:'Slow aging',              category:'Longevity' },
  { id:'custom',      label:'Custom Goal',             category:null, placeholder: true },
]

export default function Onboarding({ onNext, annotationsVisible }) {
  const [selected, setSelected] = useState(['muscle','stronger','aging'])
  const MAX = 3

  const toggle = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(s => s !== id))
    } else if (selected.length < MAX) {
      setSelected([...selected, id])
    }
  }

  return (
    <div style={{ width:'100%', height:'100%', position:'relative',
      background:'linear-gradient(160deg,#1c1d21 0%,#0e0e12 100%)',
      display:'flex', flexDirection:'column', padding:'48px 16px 32px',
    }}>
      {annotationsVisible && <div className="annotation-badge">MOB-06 · Define Goals</div>}

      {/* Progress + header */}
      <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}}>
        <div style={{ fontSize:12, color:'rgba(253,255,252,0.4)', marginBottom:6, fontFamily:'DM Mono,monospace' }}>
          Question 2 of 7
        </div>
        {/* Progress bar */}
        <div style={{ height:2, background:'rgba(255,255,255,0.08)', borderRadius:2, marginBottom:20 }}>
          <div style={{ height:'100%', width:'28%', background:'linear-gradient(90deg,#78a0d1,#78c8c9)', borderRadius:2 }} />
        </div>
        <div style={{ fontSize:24, fontWeight:500, color:'#fdfffc', letterSpacing:'-0.02em', marginBottom:6 }}>
          Define Goals
        </div>
        <div style={{ fontSize:16, color:'rgba(253,255,252,0.7)', marginBottom:20 }}>
          Pick up to 3 core goals
        </div>
      </motion.div>

      {/* Count + Reset */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <div style={{ background:'#78c8c9', borderRadius:20, padding:'2px 10px',
            fontSize:10, fontWeight:500, color:'#0a0a0a', fontFamily:'DM Mono,monospace' }}>
            {selected.length} / {MAX} Selected
          </div>
        </div>
        <motion.button whileHover={{ opacity:0.85 }} whileTap={{scale:0.9}} onClick={() => setSelected([])}
          transition={{ duration:0.15 }}
          style={{ background:'none', border:'none', display:'flex', alignItems:'center', gap:4,
            color:'rgba(253,255,252,0.5)', fontSize:14, fontWeight:500, cursor:'pointer', fontFamily:'inherit' }}>
          <RotateCcw size={12} />
          Reset all
        </motion.button>
      </div>

      {/* Goals */}
      <div style={{ flex:1, overflow:'auto', display:'flex', flexDirection:'column', gap:8 }}>
        {goals.map((goal, i) => {
          const isSelected = selected.includes(goal.id)
          const disabled = !isSelected && selected.length >= MAX
          const num = selected.indexOf(goal.id) + 1

          return (
            <motion.div key={goal.id}
              initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.05*i}}
              whileHover={!disabled ? { background: isSelected ? 'rgba(120,200,201,0.14)' : 'rgba(255,255,255,0.08)' } : undefined}
              whileTap={{scale:0.98}}
              onClick={() => !disabled && toggle(goal.id)}
              style={{ display:'flex', alignItems:'center', gap:12,
                padding:'16px', borderRadius:12, cursor: disabled ? 'not-allowed' : 'pointer',
                background: isSelected ? 'rgba(120,200,201,0.1)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${isSelected ? 'rgba(120,200,201,0.35)' : 'rgba(255,255,255,0.07)'}`,
                opacity: disabled ? 0.4 : 1,
              }}>
              {/* Number badge or check */}
              <div style={{ width:26, height:26, borderRadius:'50%', flexShrink:0,
                background: isSelected ? '#78c8c9' : 'rgba(255,255,255,0.08)',
                display:'flex', alignItems:'center', justifyContent:'center',
                transition:'background 0.2s' }}>
                {isSelected
                  ? <span style={{ fontSize:12, fontWeight:600, color:'#0a0a0a', fontFamily:'DM Mono,monospace' }}>{num}</span>
                  : <span style={{ width:8, height:8, borderRadius:'50%', background:'rgba(255,255,255,0.2)', display:'block' }} />
                }
              </div>

              <div style={{ flex:1 }}>
                <div style={{ fontSize:16, color: isSelected ? '#fdfffc' : 'rgba(253,255,252,0.75)' }}>
                  {goal.label}
                </div>
                {goal.placeholder && !isSelected && (
                  <div style={{ fontSize:13, color:'rgba(253,255,252,0.3)', marginTop:2 }}>
                    e.g. Run sub-7 min mile and deadlift 405 lb
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      <motion.button whileHover={selected.length > 0 ? { opacity:0.92 } : undefined} whileTap={{scale:0.97}} onClick={onNext}
        disabled={selected.length === 0}
        transition={{ duration:0.15 }}
        style={{ width:'100%', padding:'16px', marginTop:16,
          background: selected.length > 0 ? 'linear-gradient(135deg,#78a0d1,#78c8c9)' : 'rgba(255,255,255,0.08)',
          border:'none', borderRadius:8,
          color: selected.length > 0 ? '#0a0a0a' : 'rgba(253,255,252,0.3)',
          fontSize:14, fontWeight:600, cursor: selected.length > 0 ? 'pointer' : 'not-allowed',
          fontFamily:'inherit' }}>
        Continue
      </motion.button>
    </div>
  )
}
