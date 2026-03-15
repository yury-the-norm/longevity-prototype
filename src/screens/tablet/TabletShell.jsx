import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Bell, ChevronDown } from 'lucide-react'

import TabletSignIn     from './TabletSignIn'
import TabletDashboard  from './TabletDashboard'
import TabletClients    from './TabletClients'
import TabletClientPage from './TabletClientPage'

const NAV = [
  { id:'dashboard', label:'Dashboard' },
  { id:'clients',   label:'Clients'   },
  { id:'labs',      label:'Labs'       },
  { id:'protocols', label:'Protocols'  },
  { id:'analytics', label:'Analytics'  },
]

export default function TabletShell({ onBack, annotationsVisible }) {
  const [signedIn, setSignedIn] = useState(false)
  const [nav,    setNav]    = useState('clients')
  const [client, setClient] = useState(null)

  const handleNav = (id) => { setNav(id); setClient(null) }

  if (!signedIn) {
    return <TabletSignIn onSignIn={() => setSignedIn(true)} />
  }

  const renderContent = () => {
    if (nav === 'dashboard') return <TabletDashboard annotationsVisible={annotationsVisible}/>
    if (nav === 'clients') {
      if (client) return <TabletClientPage client={client} onBack={()=>setClient(null)} annotationsVisible={annotationsVisible}/>
      return <TabletClients onSelectClient={setClient} annotationsVisible={annotationsVisible}/>
    }
    return (
      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:8}}>
        <span style={{fontSize:40,fontWeight:200,color:'rgba(253,255,252,0.05)',letterSpacing:'-0.04em'}}>{nav}</span>
        <span style={{fontSize:12,color:'rgba(253,255,252,0.2)'}}>Screen coming soon</span>
      </div>
    )
  }

  return (
    <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',background:'#0a0a0a',overflow:'hidden'}}>
      {annotationsVisible && <div className="annotation-badge">TAB-01</div>}

      {/* Top nav bar */}
      <div style={{
        height:52, flexShrink:0,
        background:'#1f2023', borderBottom:'1px solid rgba(255,255,255,0.07)',
        display:'flex', alignItems:'center', padding:'0 20px', gap:0,
      }}>
        {/* Brand */}
        <div style={{display:'flex',alignItems:'center',gap:8,marginRight:24,flexShrink:0}}>
          <div style={{width:28,height:28,borderRadius:7,flexShrink:0,
            background:'linear-gradient(135deg,#78a0d1,#78c8c9)',
            display:'flex',alignItems:'center',justifyContent:'center'}}>
            <span style={{fontSize:11,fontWeight:700,color:'#0a0a0a'}}>MI</span>
          </div>
          <div>
            <div style={{fontSize:13,fontWeight:500,color:'#ffffff',lineHeight:1.1,whiteSpace:'nowrap'}}>Muscle Intelligence</div>
            <div style={{fontSize:9,color:'rgba(255,255,255,0.3)',lineHeight:1}}>Coach Platform</div>
          </div>
        </div>

        {/* Nav tabs */}
        <div style={{display:'flex',alignItems:'stretch',height:'100%',gap:0}}>
          {NAV.map(item => {
            const isActive = nav===item.id
            return (
              <button key={item.id} onClick={()=>handleNav(item.id)}
                style={{padding:'0 16px',height:'100%',background:'none',border:'none',cursor:'pointer',
                  fontFamily:'inherit',fontSize:13,fontWeight:isActive?500:400,
                  color:isActive?'#78c8c9':'rgba(255,255,255,0.5)',
                  borderBottom:`2px solid ${isActive?'#78c8c9':'transparent'}`,
                  marginBottom:-1,outline:'none',transition:'all 0.15s',whiteSpace:'nowrap'}}
                onMouseEnter={e=>{if(!isActive)e.currentTarget.style.color='rgba(255,255,255,0.8)'}}
                onMouseLeave={e=>{if(!isActive)e.currentTarget.style.color='rgba(255,255,255,0.5)'}}>
                {item.label}
              </button>
            )
          })}
        </div>

        <div style={{flex:1}}/>

        {/* Search */}
        <div style={{display:'flex',alignItems:'center',gap:8,
          background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',
          borderRadius:8,padding:'5px 12px',marginRight:14,cursor:'text',width:180}}>
          <Search size={12} color="#a6aaaf"/>
          <span style={{fontSize:12,color:'#a6aaaf'}}>Search</span>
        </div>

        {/* Bell */}
        <div style={{position:'relative',marginRight:14,cursor:'pointer'}}>
          <Bell size={17} color="rgba(255,255,255,0.55)"/>
          <div style={{position:'absolute',top:-2,right:-2,width:5,height:5,borderRadius:'50%',background:'#78c8c9',border:'1px solid #1f2023'}}/>
        </div>

        {/* Avatar */}
        <div style={{display:'flex',alignItems:'center',gap:6,cursor:'pointer'}}>
          <div style={{width:28,height:28,borderRadius:'50%',background:'linear-gradient(135deg,#78a0d1,#78c8c9)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
            <span style={{fontSize:10,fontWeight:700,color:'white'}}>AM</span>
          </div>
          <span style={{fontSize:12,color:'rgba(255,255,255,0.7)'}}>Alex Morgan</span>
          <ChevronDown size={12} color="rgba(255,255,255,0.3)"/>
        </div>

        <motion.button whileTap={{scale:0.95}} onClick={onBack}
          style={{marginLeft:16,padding:'4px 10px',
            background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.09)',
            borderRadius:6,color:'rgba(253,255,252,0.4)',fontSize:10,
            cursor:'pointer',fontFamily:'inherit',outline:'none',flexShrink:0}}>
          ← selector
        </motion.button>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div key={nav+(client?.name||'')}
          initial={{opacity:0,y:4}} animate={{opacity:1,y:0}} exit={{opacity:0}}
          transition={{duration:0.15}}
          style={{flex:1,overflow:'hidden',display:'flex',flexDirection:'column'}}>
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
