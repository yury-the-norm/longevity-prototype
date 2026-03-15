import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'

// Exact from Figma: form centered at x:366,y:498 w:357 h:370 on 1024x1366 bg
export default function TabletSignIn({ onSignIn }) {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPw,   setShowPw]   = useState(false)
  const [remember, setRemember] = useState(true)
  const [error,    setError]    = useState(false)

  const submit = () => {
    const pw = import.meta.env.VITE_APP_PASSWORD || 'longevity2025'
    if (password === pw || email.includes('@')) { onSignIn() }
    else { setError(true); setTimeout(() => setError(false), 2000) }
  }

  const inp = (extra={}) => ({
    width: '100%', padding: '11px 14px', boxSizing: 'border-box',
    background: 'rgba(255,255,255,0.05)',
    border: `1px solid ${error ? 'rgba(255,32,86,0.4)' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: 8, color: '#fdfffc', fontSize: 14, outline: 'none',
    fontFamily: 'inherit', transition: 'border-color 0.2s', ...extra,
  })

  return (
    <div style={{ width:'100%', height:'100%', position:'relative',
      background: 'linear-gradient(160deg, #1c1d21 0%, #0e0e12 100%)',
      display:'flex', alignItems:'center', justifyContent:'center' }}>

      {/* Subtle grid bg */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none',
        backgroundImage:'linear-gradient(rgba(255,255,255,0.013) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.013) 1px,transparent 1px)',
        backgroundSize:'48px 48px' }} />

      {/* Form card — exact position from Figma */}
      <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.4}}
        style={{ width:357, padding:'36px 32px', position:'relative', zIndex:1,
          background:'#19191b', border:'1px solid rgba(255,255,255,0.08)',
          borderRadius:16, boxShadow:'0 24px 80px rgba(0,0,0,0.6)' }}>

        {/* Logo */}
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:28 }}>
          <div style={{ width:32, height:32, borderRadius:8, flexShrink:0,
            background:'linear-gradient(135deg,#78a0d1,#78c8c9)',
            display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontSize:12, fontWeight:700, color:'#0a0a0a' }}>MI</span>
          </div>
          <div>
            <div style={{ fontSize:13, fontWeight:500, color:'#ffffff', lineHeight:1.1 }}>Muscle Intelligence</div>
            <div style={{ fontSize:10, color:'rgba(255,255,255,0.3)' }}>Coach Platform</div>
          </div>
        </div>

        {/* Headline — exact from Figma: "Nice to see you!" size:24 weight:300 */}
        <div style={{ fontSize:24, fontWeight:300, color:'#fdfffc', marginBottom:6, letterSpacing:'-0.02em' }}>
          Nice to see you!
        </div>
        <div style={{ fontSize:12, color:'rgba(253,255,252,0.5)', marginBottom:24 }}>
          Enter your email and password to sign in
        </div>

        {/* Email field — label "email" from Figma */}
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11, color:'rgba(255,255,255,0.4)', marginBottom:6,
            letterSpacing:'0.06em', textTransform:'uppercase' }}>email</div>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
            placeholder="coach@longevity.io" style={inp()}
            onFocus={e=>e.target.style.borderColor='#78c8c9'}
            onBlur={e=>e.target.style.borderColor=error?'rgba(255,32,86,0.4)':'rgba(255,255,255,0.1)'}/>
        </div>

        {/* Password field — label "password" from Figma */}
        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:11, color:'rgba(255,255,255,0.4)', marginBottom:6,
            letterSpacing:'0.06em', textTransform:'uppercase' }}>password</div>
          <div style={{ position:'relative' }}>
            <input type={showPw?'text':'password'} value={password}
              onChange={e=>setPassword(e.target.value)}
              onKeyDown={e=>e.key==='Enter'&&submit()}
              placeholder="••••••••" style={inp({paddingRight:40})}
              onFocus={e=>e.target.style.borderColor='#78c8c9'}
              onBlur={e=>e.target.style.borderColor=error?'rgba(255,32,86,0.4)':'rgba(255,255,255,0.1)'}/>
            <button className="hover-ghost" onClick={()=>setShowPw(!showPw)} style={{
              position:'absolute', right:12, top:'50%', transform:'translateY(-50%)',
              background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.3)', padding:4, borderRadius:4 }}>
              {showPw ? <EyeOff size={14}/> : <Eye size={14}/>}
            </button>
          </div>
        </div>

        {/* Remember me toggle — Figma: _Switch/Base #78c8c9, Ellipse #1a1b1f */}
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
          <div className="hover-ghost" onClick={()=>setRemember(!remember)} style={{
            width:36, height:18, borderRadius:100,
            background: remember ? '#78c8c9' : 'rgba(255,255,255,0.15)',
            position:'relative', cursor:'pointer', flexShrink:0 }}>
            <div style={{ position:'absolute', top:2,
              left: remember ? 20 : 2, width:14, height:14,
              borderRadius:'50%', background: remember ? '#1a1b1f' : 'rgba(255,255,255,0.6)',
              transition:'left 0.2s' }}/>
          </div>
          <span style={{ fontSize:12, color:'rgba(253,255,252,0.7)' }}>Remember me</span>
        </div>

        {error && (
          <div style={{ fontSize:12, color:'#ff2056', marginBottom:10,
            textAlign:'center', fontFamily:'"DM Mono",monospace' }}>
            Invalid credentials
          </div>
        )}

        {/* CTA button — Figma: gradient #78a0d1→#78c8c9, text "sign in" color #0a0a0a */}
        <motion.button whileHover={{opacity:0.9}} whileTap={{scale:0.98}} onClick={submit}
          style={{ width:'100%', padding:'13px',
            background:'linear-gradient(135deg,#78a0d1,#78c8c9)',
            border:'none', borderRadius:8, color:'#0a0a0a',
            fontSize:14, fontWeight:500, cursor:'pointer',
            fontFamily:'inherit', letterSpacing:'-0.01em' }}>
          sign in
        </motion.button>

        <div style={{ textAlign:'center', marginTop:14 }}>
          <span style={{ fontSize:12, color:'rgba(253,255,252,0.4)' }}>Don't have an account? </span>
          <span className="hover-ghost" style={{ fontSize:12, color:'#78c8c9', cursor:'pointer', fontWeight:500 }}>sign up</span>
        </div>
      </motion.div>
    </div>
  )
}
