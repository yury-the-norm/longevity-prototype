import { motion } from 'framer-motion'
import { LayoutDashboard, Database, CalendarDays, User } from 'lucide-react'

// Exact 4 tabs from Figma Menu component: Overview, Data, Plan, Profile
const tabs = [
  { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
  { id: 'data',     icon: Database,        label: 'Data'     },
  { id: 'plan',     icon: CalendarDays,    label: 'Plan'     },
  { id: 'profile',  icon: User,            label: 'Profile'  },
]

export default function MobileNav({ active, onTab }) {
  return (
    <div
      style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 80,
        background: 'rgba(20,20,25,0.97)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-around',
        paddingTop: 8, paddingBottom: 0,
        paddingLeft: 4, paddingRight: 4,
      }}
    >
      {tabs.map(tab => {
        const Icon = tab.icon
        const isActive = active === tab.id
        return (
          <motion.button
            key={tab.id}
            whileTap={{ scale: 0.85 }}
            onClick={() => onTab(tab.id)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 4, padding: '6px 0',
              background: 'transparent', border: 'none', cursor: 'pointer',
              outline: 'none', position: 'relative',
            }}
          >
            {isActive && (
              <motion.div
                layoutId="tab-bg"
                style={{
                  position: 'absolute', inset: 0,
                  borderRadius: 10,
                  background: 'rgba(120,200,201,0.1)',
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 38 }}
              />
            )}
            <Icon
              size={22}
              color={isActive ? '#78c8c9' : 'rgba(253,255,252,0.35)'}
              style={{ transition: 'color 0.2s', position: 'relative', zIndex: 1 }}
              strokeWidth={isActive ? 2 : 1.5}
            />
            <span style={{
              fontSize: 9, fontWeight: 600,
              color: isActive ? '#78c8c9' : 'rgba(253,255,252,0.35)',
              letterSpacing: '0.03em',
              transition: 'color 0.2s', position: 'relative', zIndex: 1,
              textTransform: 'uppercase',
            }}>
              {tab.label}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}
