import { motion } from 'framer-motion'
import { Heart, Footprints, Moon, ArrowRight } from 'lucide-react'

const dataItems = [
  { icon: Footprints, label: 'Steps, Walking + Running Distance' },
  { icon: Heart,      label: 'Heart Rate & HRV' },
  { icon: Moon,       label: 'Sleep Analysis' },
]

export default function AppleHealth({ onNext, annotationsVisible }) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative',
      background: 'linear-gradient(160deg, #1c1d21 0%, #0e0e12 100%)',
      display: 'flex', flexDirection: 'column', padding: '60px 32px 40px',
    }}>
      {annotationsVisible && <div className="annotation-badge">MOB-02 · Apple Health</div>}

      {/* Apple Health heart icon */}
      <motion.div initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} transition={{duration:0.4}}
        style={{ width: 64, height: 64, borderRadius: 16, background: '#ff2056', display:'flex', alignItems:'center', justifyContent:'center', marginBottom: 28 }}>
        <Heart size={32} color="white" fill="white" />
      </motion.div>

      <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.1}}>
        <div style={{ fontSize: 24, fontWeight: 500, color: '#fdfffc', letterSpacing:'-0.02em', marginBottom: 12 }}>
          Apple Health
        </div>
        <div style={{ fontSize: 14, color: 'rgba(253,255,252,0.6)', lineHeight: 1.6, marginBottom: 32 }}>
          Connect Apple Health to securely share your daily activity, sleep, and recovery data to personalize your longevity insight.
        </div>
      </motion.div>

      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2}}
        style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: 'rgba(253,255,252,0.5)', letterSpacing: '0.08em', marginBottom: 16, textTransform:'uppercase', fontSize:10 }}>
          Data Requested
        </div>
        {dataItems.map((item, i) => {
          const Icon = item.icon
          return (
            <motion.div key={i}
              initial={{opacity:0,x:-12}} animate={{opacity:1,x:0}} transition={{delay:0.25+i*0.07}}
              style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 0',
                borderBottom: i < dataItems.length-1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <div style={{ width:36, height:36, borderRadius:10, background:'rgba(255,255,255,0.05)',
                border:'1px solid rgba(255,255,255,0.08)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Icon size={16} color="rgba(253,255,252,0.7)" />
              </div>
              <span style={{ fontSize:14, color:'rgba(253,255,252,0.85)' }}>{item.label}</span>
              <ArrowRight size={14} color="rgba(253,255,252,0.2)" style={{ marginLeft:'auto' }} />
            </motion.div>
          )
        })}
      </motion.div>

      <div style={{ flex:1 }} />

      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        <motion.button whileHover={{ opacity:0.92 }} whileTap={{scale:0.97}} onClick={onNext}
          transition={{ duration:0.15 }}
          style={{ width:'100%', padding:'16px', background:'linear-gradient(135deg,#78a0d1,#78c8c9)',
            border:'none', borderRadius:8, color:'#0a0a0a', fontSize:14, fontWeight:600,
            cursor:'pointer', fontFamily:'inherit' }}>
          Allow access
        </motion.button>
        <motion.button whileHover={{ opacity:0.85 }} whileTap={{scale:0.97}} onClick={onNext}
          transition={{ duration:0.15 }}
          style={{ background:'none', border:'none', color:'rgba(253,255,252,0.6)',
            fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'inherit', padding:'8px' }}>
          Not now
        </motion.button>
      </div>
    </div>
  )
}
