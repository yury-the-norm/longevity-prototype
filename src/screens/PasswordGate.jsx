import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PasswordGate({ onUnlock, annotationsVisible }) {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  const correct = import.meta.env.VITE_APP_PASSWORD || 'longevity2025'

  const handleSubmit = () => {
    if (code === correct || email === correct) {
      onUnlock()
    } else {
      setError(true); setShake(true)
      setTimeout(() => setShake(false), 500)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative',
      background: 'linear-gradient(160deg, #1c1d21 0%, #0e0e12 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
    }}>
      {annotationsVisible && (
        <div className="annotation-badge">PASS-01 · Sign In</div>
      )}

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 300, height: 300, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(120,200,201,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Lock icon — matches Figma (24x24 lock SVG) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
      >
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(253,255,252,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 300, color: '#fdfffc', letterSpacing: '-0.02em', marginBottom: 8 }}>
            Private Access
          </div>
          <div style={{ fontSize: 12, color: 'rgba(253,255,252,0.6)', marginBottom: 4 }}>
            Access by invitation only
          </div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, maxWidth: 260, textAlign: 'center' }}>
            Enter the invitation code sent to your email to access the app
          </div>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={shake ? { x: [-8,8,-6,6,-3,3,0] } : { opacity: 1, y: 0 }}
        transition={shake ? { duration: 0.4 } : { duration: 0.5, delay: 0.1 }}
        style={{ width: 340, display: 'flex', flexDirection: 'column', gap: 12 }}
      >
        {/* Email input */}
        <div>
          <div style={{ fontSize: 14, color: 'rgba(253,255,252,0.6)', marginBottom: 6, letterSpacing: '0.05em', fontSize: 12 }}>
            EMAIL
          </div>
          <input
            type="email" value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            style={{
              width: '100%', padding: '12px 16px',
              background: 'rgba(255,255,255,0.05)',
              border: `1px solid ${error ? 'rgba(255,32,86,0.5)' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: 8, color: '#fdfffc', fontSize: 14,
              outline: 'none', fontFamily: 'inherit',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = '#78c8c9'}
            onBlur={e => e.target.style.borderColor = error ? 'rgba(255,32,86,0.5)' : 'rgba(255,255,255,0.1)'}
          />
        </div>

        {/* Code input */}
        <div>
          <div style={{ fontSize: 12, color: 'rgba(253,255,252,0.6)', marginBottom: 6, letterSpacing: '0.05em' }}>
            INVITATION CODE
          </div>
          <input
            type="text" value={code}
            onChange={e => setCode(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder="Enter code"
            autoFocus
            style={{
              width: '100%', padding: '12px 16px',
              background: 'rgba(255,255,255,0.05)',
              border: `1px solid ${error ? 'rgba(255,32,86,0.5)' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: 8, color: '#fdfffc', fontSize: 14,
              outline: 'none', fontFamily: 'inherit',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = '#78c8c9'}
            onBlur={e => e.target.style.borderColor = error ? 'rgba(255,32,86,0.5)' : 'rgba(255,255,255,0.1)'}
          />
        </div>

        <AnimatePresence>
          {error && (
            <motion.p initial={{opacity:0,y:-4}} animate={{opacity:1,y:0}} exit={{opacity:0}}
              style={{ color: '#ff2056', fontSize: 12, textAlign: 'center', margin: 0, fontFamily: 'DM Mono, monospace' }}>
              Invalid invitation code
            </motion.p>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ opacity: 0.92 }} whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          style={{
            width: '100%', padding: '14px',
            background: 'linear-gradient(135deg, #78a0d1, #78c8c9)',
            border: 'none', borderRadius: 8,
            color: '#0a0a0a', fontSize: 14, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit',
            marginTop: 4,
          }}
        >
          Authenticate
        </motion.button>
      </motion.div>
    </div>
  )
}
