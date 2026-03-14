import { motion, AnimatePresence } from 'framer-motion'

export default function AnnotationLayer({ visible, screenId }) {
  if (!visible) return null
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 9990,
      background: 'rgba(255,32,86,0.03)',
    }}>
      {/* Screen ID badge */}
      {screenId && (
        <div style={{
          position: 'absolute', top: 8, left: 8,
          background: 'rgba(255,32,86,0.15)', border: '1px solid rgba(255,32,86,0.4)',
          color: '#FF2056', fontSize: 9, fontFamily: '"DM Mono", monospace',
          padding: '2px 6px', borderRadius: 4, letterSpacing: '0.05em',
        }}>
          {screenId}
        </div>
      )}
      {/* Corner marks */}
      <div style={{ position:'absolute', top:0, left:0, width:12, height:12, borderTop:'2px solid #FF2056', borderLeft:'2px solid #FF2056', opacity:0.5 }} />
      <div style={{ position:'absolute', top:0, right:0, width:12, height:12, borderTop:'2px solid #FF2056', borderRight:'2px solid #FF2056', opacity:0.5 }} />
      <div style={{ position:'absolute', bottom:0, left:0, width:12, height:12, borderBottom:'2px solid #FF2056', borderLeft:'2px solid #FF2056', opacity:0.5 }} />
      <div style={{ position:'absolute', bottom:0, right:0, width:12, height:12, borderBottom:'2px solid #FF2056', borderRight:'2px solid #FF2056', opacity:0.5 }} />
    </div>
  )
}

export function AnnotationHint({ visible }) {
  return (
    <div style={{
      position: 'fixed', bottom: 20, right: 20, zIndex: 9999,
      display: 'flex', alignItems: 'center', gap: 6,
      background: 'rgba(8,8,12,0.85)', backdropFilter: 'blur(8px)',
      border: `1px solid ${visible ? 'rgba(255,32,86,0.4)' : 'rgba(255,255,255,0.1)'}`,
      borderRadius: 8, padding: '6px 12px',
      fontSize: 11, fontFamily: '"DM Mono", monospace',
      color: visible ? '#FF2056' : 'rgba(255,255,255,0.3)',
      transition: 'all 0.2s', pointerEvents: 'none',
    }}>
      <span>⌨</span>
      <span>M — annotations {visible ? 'ON' : 'OFF'}</span>
    </div>
  )
}
