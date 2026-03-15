import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import PresentationShell  from './components/PresentationShell'
import { AnnotationHint } from './components/AnnotationLayer'
import { useAnnotations } from './hooks/useAnnotations'

import PasswordGate    from './screens/PasswordGate'
import PersonaSelector from './screens/PersonaSelector'
import AppleHealth     from './screens/mobile/AppleHealth'
import ConnectGarmin   from './screens/mobile/ConnectGarmin'
import MedRecs         from './screens/mobile/MedRecs'
import UploadLabs      from './screens/mobile/UploadLabs'
import Onboarding      from './screens/mobile/Onboarding'
import Dashboard       from './screens/mobile/Dashboard'
import MetricDetails   from './screens/mobile/MetricDetails'
import Subscription    from './screens/mobile/Subscription'
import Plan            from './screens/mobile/Plan'
import MobileNav       from './components/MobileNav'
import TabletShell     from './screens/tablet/TabletShell'

const FILL = { position:'absolute', inset:0, width:'100%', height:'100%' }

function MobileApp({ onBack, annotationsVisible }) {
  const [screen, setScreen] = useState('apple-health')
  const [navTab, setNavTab] = useState('overview')
  const [inApp,  setInApp]  = useState(false)

  const enterApp = () => { setInApp(true); setScreen('dashboard') }

  const handleTab = (tab) => {
    setNavTab(tab)
    const map = { overview:'dashboard', data:'metric-details', plan:'plan', profile:'subscription' }
    setScreen(map[tab] || 'dashboard')
  }

  const p = { annotationsVisible }
  const renderScreen = () => {
    switch (screen) {
      case 'apple-health':   return <AppleHealth   {...p} onNext={()=>setScreen('garmin')}/>
      case 'garmin':         return <ConnectGarmin {...p} onNext={()=>setScreen('med-recs')}/>
      case 'med-recs':       return <MedRecs       {...p} onNext={()=>setScreen('upload-labs')}/>
      case 'upload-labs':    return <UploadLabs    {...p} onNext={()=>setScreen('onboarding')}/>
      case 'onboarding':     return <Onboarding    {...p} onNext={enterApp}/>
      case 'dashboard':      return <Dashboard     {...p} onMetricClick={()=>{setScreen('metric-details');setNavTab('data')}}/>
      case 'metric-details': return <MetricDetails {...p} onBack={()=>{setScreen('dashboard');setNavTab('overview')}}/>
      case 'subscription':   return <Subscription  {...p} onBack={()=>{setScreen('dashboard');setNavTab('overview')}}/>
      case 'plan':           return <Plan          {...p}/>
      default:               return <Dashboard     {...p}/>
    }
  }

  return (
    <div style={{...FILL, background:'#0a0a0f', overflow:'hidden'}}>
      <AnimatePresence mode="wait">
        <motion.div key={screen}
          initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}}
          transition={{duration:0.25,ease:[0.22,1,0.36,1]}}
          style={FILL}>
          {renderScreen()}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {inApp && (
          <motion.div initial={{y:80}} animate={{y:0}} exit={{y:80}}
            transition={{duration:0.3,ease:[0.22,1,0.36,1]}}
            style={{position:'absolute',bottom:0,left:0,right:0,zIndex:100}}>
            <MobileNav active={navTab} onTab={handleTab}/>
          </motion.div>
        )}
      </AnimatePresence>

      <button className="hover-icon-btn" onClick={onBack} style={{
        position:'absolute',top:14,right:14,zIndex:200,
        padding:'4px 10px', background:'rgba(0,0,0,0.5)', backdropFilter:'blur(8px)',
        border:'1px solid rgba(255,255,255,0.12)', borderRadius:6,
        color:'rgba(253,255,252,0.45)', fontSize:10,
        cursor:'pointer', fontFamily:'inherit', outline:'none' }}>
        ← selector
      </button>
    </div>
  )
}

export default function App() {
  const { annotationsVisible } = useAnnotations()
  const [stage, setStage] = useState('password')

  useEffect(() => {
    const onKey = (e) => {
      if (e.key==='Escape' && (stage==='mobile'||stage==='tablet')) setStage('selector')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [stage])

  const shellMode = stage==='mobile'?'phone':stage==='tablet'?'tablet':'fullscreen'

  const p = { annotationsVisible }
  const renderStage = () => {
    switch (stage) {
      case 'password': return <PasswordGate    {...p} onUnlock={()=>setStage('selector')}/>
      case 'selector': return <PersonaSelector {...p} onSelect={setStage}/>
      case 'mobile':   return <MobileApp       {...p} onBack={()=>setStage('selector')}/>
      case 'tablet':   return <TabletShell     {...p} onBack={()=>setStage('selector')}/>
      default:         return <PasswordGate    {...p} onUnlock={()=>setStage('selector')}/>
    }
  }

  return (
    <>
      <PresentationShell mode={shellMode}>
        <AnimatePresence mode="wait">
          <motion.div key={stage}
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            transition={{duration:0.22}}
            style={FILL}>
            {renderStage()}
          </motion.div>
        </AnimatePresence>
      </PresentationShell>
      <AnnotationHint visible={annotationsVisible}/>
    </>
  )
}
