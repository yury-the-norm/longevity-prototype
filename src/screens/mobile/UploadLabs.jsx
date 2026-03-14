import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileText, Image, Check, Lock } from 'lucide-react'
import { useState } from 'react'

const uploaded = [
  { name: 'Q3_Comprehensive_Panel.pdf', icon: FileText, done: true },
  { name: 'DXA_Scan.jpg', icon: Image, done: true },
]

export default function UploadLabs({ onNext, annotationsVisible }) {
  const [processing, setProcessing] = useState(false)

  const handleProcess = () => {
    setProcessing(true)
    setTimeout(onNext, 1400)
  }

  return (
    <div style={{ width:'100%', height:'100%', position:'relative',
      background:'linear-gradient(160deg,#1c1d21 0%,#0e0e12 100%)',
      display:'flex', flexDirection:'column', padding:'56px 16px 40px',
    }}>
      {annotationsVisible && <div className="annotation-badge">MOB-05 · Upload Labs</div>}

      <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}>
        <div style={{ fontSize:24, fontWeight:500, color:'#fdfffc', letterSpacing:'-0.02em', marginBottom:10 }}>
          Add Labs & Genetic Data
        </div>
        <div style={{ fontSize:14, color:'rgba(253,255,252,0.6)', lineHeight:1.6, marginBottom:28 }}>
          Upload recent blood panels, DXA scans, or genetic reports.
        </div>
      </motion.div>

      {/* Upload zone */}
      <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
        style={{ border:'1.5px dashed rgba(120,200,201,0.35)', borderRadius:16,
          padding:'28px 20px', textAlign:'center', marginBottom:20, cursor:'pointer',
          background:'rgba(120,200,201,0.04)', transition:'background 0.2s' }}
        whileHover={{ background:'rgba(120,200,201,0.08)' }}
      >
        <div style={{ width:48, height:48, borderRadius:12,
          background:'rgba(120,200,201,0.12)', border:'1px solid rgba(120,200,201,0.2)',
          display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px' }}>
          <Upload size={20} color="#78c8c9" />
        </div>
        <div style={{ fontSize:14, fontWeight:500, color:'#fdfffc', marginBottom:4 }}>Upload Secure PDF</div>
        <div style={{ fontSize:12, color:'rgba(253,255,252,0.4)' }}>Bloodwork, Epigenetic, or DXA</div>
        <div style={{ marginTop:14, display:'inline-block', padding:'6px 16px',
          background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)',
          borderRadius:6, fontSize:10, fontWeight:500, color:'rgba(253,255,252,0.7)', cursor:'pointer',
          fontFamily:'DM Mono, monospace', letterSpacing:'0.04em' }}>
          SELECT FILE
        </div>
      </motion.div>

      {/* Encrypted documents */}
      <div style={{ fontSize:12, fontWeight:500, color:'rgba(253,255,252,0.5)',
        letterSpacing:'0.06em', marginBottom:12, textTransform:'uppercase', fontSize:10,
        display:'flex', alignItems:'center', gap:6 }}>
        <Lock size={10} color="rgba(120,200,201,0.6)" />
        Encrypted Documents
      </div>

      {uploaded.map((f, i) => {
        const Icon = f.icon
        return (
          <motion.div key={f.name}
            initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:0.2+i*0.07}}
            style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 14px', marginBottom:8,
              background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:10 }}>
            <div style={{ width:32, height:32, borderRadius:8, background:'rgba(120,200,201,0.1)',
              display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <Icon size={14} color="#78c8c9" />
            </div>
            <span style={{ fontSize:14, color:'rgba(253,255,252,0.85)', flex:1 }}>{f.name}</span>
            <div style={{ width:18, height:18, borderRadius:'50%', background:'#05df72',
              display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Check size={10} color="#0a0a0a" strokeWidth={3} />
            </div>
          </motion.div>
        )
      })}

      <div style={{ flex:1 }} />

      <motion.button whileTap={{scale:0.97}} onClick={handleProcess}
        disabled={processing}
        style={{ width:'100%', padding:'16px',
          background: processing ? 'rgba(120,200,201,0.4)' : 'linear-gradient(135deg,#78a0d1,#78c8c9)',
          border:'none', borderRadius:8, color:'#0a0a0a', fontSize:14, fontWeight:600,
          cursor:'pointer', fontFamily:'inherit', transition:'background 0.3s',
          display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
        {processing ? (
          <>
            <motion.div animate={{rotate:360}} transition={{repeat:Infinity,duration:0.8,ease:'linear'}}
              style={{ width:14, height:14, border:'2px solid #0a0a0a', borderTopColor:'transparent', borderRadius:'50%' }} />
            Processing...
          </>
        ) : 'Process Baseline Data'}
      </motion.button>
    </div>
  )
}
