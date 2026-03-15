import { motion } from 'framer-motion'
import { Watch, ArrowRight } from 'lucide-react'

const dataItems = [
  'Steps & daily activity',
  'Heart rate & resting HR',
  'Workouts & training sessions',
  'VO₂ max & fitness metrics',
  'Sleep duration & sleep stages',
  'Stress & recovery metrics',
]

export default function ConnectGarmin({ onNext, annotationsVisible }) {
  return (
    <div style={{ width:'100%', height:'100%', position:'relative',
      background:'linear-gradient(160deg,#1c1d21 0%,#0e0e12 100%)',
      display:'flex', flexDirection:'column', padding:'60px 32px 40px' }}>
      {annotationsVisible && <div className="annotation-badge">MOB-03 · Connect Garmin</div>}

      <motion.div initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} transition={{duration:0.4}}
        style={{ width:64, height:64, borderRadius:16, background:'#78c8c9',
          display:'flex', alignItems:'center', justifyContent:'center', marginBottom:28 }}>
        <Watch size={32} color="#0a0a0a" />
      </motion.div>

      <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.1}}>
        <div style={{ fontSize:24, fontWeight:500, color:'#fdfffc', letterSpacing:'-0.02em', marginBottom:12 }}>
          Connect Garmin device
        </div>
        <div style={{ fontSize:14, color:'rgba(253,255,252,0.6)', lineHeight:1.6, marginBottom:28 }}>
          Sync your Garmin watch to automatically import activity, sleep, and recovery data to personalize your longevity insights.
        </div>
      </motion.div>

      <div style={{ fontSize:10, fontWeight:500, color:'rgba(253,255,252,0.4)', letterSpacing:'0.08em', marginBottom:14, textTransform:'uppercase' }}>
        Data we may access
      </div>

      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2}}
        style={{ flex:1, overflow:'auto' }}>
        {dataItems.map((item, i) => (
          <motion.div key={i}
            initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:0.25+i*0.06}}
            style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 0',
              borderBottom: i < dataItems.length-1 ? '1px solid rgba(255,255,255,0.06)':'' }}>
            <div style={{ width:6, height:6, borderRadius:'50%', background:'rgba(120,200,201,0.6)', flexShrink:0 }} />
            <span style={{ fontSize:14, color:'rgba(253,255,252,0.85)' }}>{item}</span>
          </motion.div>
        ))}

        <div style={{ marginTop:16, padding:'12px 14px', background:'rgba(255,255,255,0.03)',
          border:'1px solid rgba(255,255,255,0.06)', borderRadius:8 }}>
          <p style={{ margin:0, fontSize:12, color:'rgba(253,255,252,0.4)', lineHeight:1.5 }}>
            This data helps calculate your Longevity Score, recovery insights, and personalise your training.
          </p>
        </div>
      </motion.div>

      <div style={{ display:'flex', flexDirection:'column', gap:12, paddingTop:20 }}>
        <motion.button whileTap={{scale:0.97}} onClick={onNext}
          style={{ width:'100%', padding:'16px', background:'linear-gradient(135deg,#78a0d1,#78c8c9)',
            border:'none', borderRadius:8, color:'#0a0a0a', fontSize:14, fontWeight:600,
            cursor:'pointer', fontFamily:'inherit' }}>
          Connect Garmin
        </motion.button>
        <motion.button whileTap={{scale:0.97}} onClick={onNext}
          style={{ background:'none', border:'none', color:'rgba(253,255,252,0.6)',
            fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'inherit', padding:'8px' }}>
          Not now
        </motion.button>
      </div>
    </div>
  )
}
