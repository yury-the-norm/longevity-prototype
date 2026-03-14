import { motion } from 'framer-motion'
import { Smartphone, Tablet, ArrowRight } from 'lucide-react'

export default function PersonaSelector({ onSelect, annotationsVisible }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(160deg, #1c1d21 0%, #0e0e12 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 32,
      position: 'relative',
    }}>
      {annotationsVisible && <div className="annotation-badge">SEL-01 · Persona Selector</div>}

      <motion.div initial={{opacity:0,y:-16}} animate={{opacity:1,y:0}} style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 22, fontWeight: 500, color: '#fdfffc', letterSpacing: '-0.02em', marginBottom: 8 }}>
          Longevity System
        </div>
        <div style={{ fontSize: 12, color: 'rgba(253,255,252,0.4)', fontFamily: 'DM Mono, monospace', letterSpacing: '0.06em' }}>
          SELECT PROTOTYPE VIEW
        </div>
      </motion.div>

      <div style={{ display: 'flex', gap: 20 }}>
        {[
          { id: 'mobile', icon: Smartphone, label: 'Client App', sub: 'Mobile · iPhone', size: '390×874', color: '#78c8c9', screens: '9 screens' },
          { id: 'tablet', icon: Tablet,     label: 'Coach Platform', sub: 'Tablet · iPad Pro', size: '1024×1366', color: '#78a0d1', screens: '4 screens' },
        ].map((p, i) => {
          const Icon = p.icon
          return (
            <motion.button
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelect(p.id)}
              style={{
                width: 168, padding: '24px 20px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 20, cursor: 'pointer', outline: 'none',
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16,
                textAlign: 'left',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = p.color + '60'
                e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.4)`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: `${p.color}18`, border: `1px solid ${p.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={18} color={p.color} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 500, color: '#fdfffc', marginBottom: 4, letterSpacing: '-0.01em' }}>
                  {p.label}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(253,255,252,0.5)', lineHeight: 1.6 }}>
                  {p.sub}
                </div>
              </div>
              <div style={{ width: '100%', paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: 10, color: 'rgba(253,255,252,0.3)', fontFamily: 'DM Mono, monospace', marginBottom: 2 }}>
                  {p.size}
                </div>
                <div style={{ fontSize: 10, color: p.color, fontFamily: 'DM Mono, monospace' }}>
                  {p.screens}
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>

      <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}}
        style={{ fontSize: 11, color: 'rgba(253,255,252,0.2)', fontFamily: 'DM Mono, monospace' }}>
        Press M to toggle annotations
      </motion.p>
    </div>
  )
}
