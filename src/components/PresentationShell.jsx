// PresentationShell v8
// Phone: fixed 402×874, centered, NO scaling
// Tablet: browser window, landscape, NO scaling, scrollable content

export const PHONE_W  = 402
export const PHONE_H  = 874
export const TABLET_W = 1200
export const TABLET_H = 800

function PhoneFrame({ children }) {
  return (
    <div style={{
      width: PHONE_W, height: PHONE_H,
      borderRadius: 46, background: '#111115',
      boxShadow: '0 0 0 10px #1a1a1f, 0 0 0 11px #252530, 0 40px 100px rgba(0,0,0,0.9)',
      position: 'relative', overflow: 'hidden', flexShrink: 0,
    }}>
      {/* Dynamic Island */}
      <div style={{
        position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
        width: 118, height: 34, background: '#0a0a0a', borderRadius: 18, zIndex: 20,
      }} />
      {/* Buttons */}
      <div style={{ position:'absolute', left:-10, top:116, width:3, height:32, background:'#252530', borderRadius:2 }} />
      <div style={{ position:'absolute', left:-10, top:160, width:3, height:62, background:'#252530', borderRadius:2 }} />
      <div style={{ position:'absolute', left:-10, top:234, width:3, height:62, background:'#252530', borderRadius:2 }} />
      <div style={{ position:'absolute', right:-10, top:150, width:3, height:80, background:'#252530', borderRadius:2 }} />
      {/* Screen */}
      <div style={{ position:'absolute', inset:0, borderRadius:46, overflow:'hidden', background:'#0a0a0f' }}>
        {children}
      </div>
      {/* Home bar */}
      <div style={{
        position:'absolute', bottom:8, left:'50%', transform:'translateX(-50%)',
        width:130, height:4, background:'rgba(255,255,255,0.2)', borderRadius:2, zIndex:30,
      }} />
    </div>
  )
}

function TabletFrame({ children }) {
  return (
    <div style={{
      width: TABLET_W, height: TABLET_H,
      borderRadius: 12, background: '#1a1a1e', flexShrink: 0,
      boxShadow: '0 0 0 1px #2a2a34, 0 40px 100px rgba(0,0,0,0.9)',
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
    }}>
      {/* Browser chrome */}
      <div style={{
        height: 36, flexShrink: 0, background: '#1f1f23',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', alignItems: 'center', padding: '0 14px', gap: 8,
      }}>
        <div style={{ width:12, height:12, borderRadius:'50%', background:'#ff5f57', flexShrink:0 }} />
        <div style={{ width:12, height:12, borderRadius:'50%', background:'#febc2e', flexShrink:0 }} />
        <div style={{ width:12, height:12, borderRadius:'50%', background:'#28c840', flexShrink:0 }} />
        <div style={{
          flex:1, height:22, borderRadius:6, margin:'0 8px',
          background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.08)',
          display:'flex', alignItems:'center', padding:'0 10px',
          fontSize:11, color:'rgba(255,255,255,0.35)', fontFamily:'DM Mono, monospace',
        }}>
          app.longevity.io
        </div>
      </div>
      {/* Content */}
      <div style={{ flex:1, overflow:'hidden', position:'relative' }}>
        {children}
      </div>
    </div>
  )
}

function PresentationBg() {
  return (
    <div style={{
      position:'absolute', inset:0, zIndex:0,
      background: [
        'radial-gradient(ellipse at 20% 50%, rgba(120,160,209,0.06) 0%, transparent 50%)',
        'radial-gradient(ellipse at 80% 50%, rgba(120,200,201,0.05) 0%, transparent 50%)',
        'linear-gradient(180deg, #06060a 0%, #09090e 100%)',
      ].join(', '),
    }}>
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none',
        backgroundImage:'linear-gradient(rgba(255,255,255,0.013) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.013) 1px,transparent 1px)',
        backgroundSize:'48px 48px',
      }} />
    </div>
  )
}

export default function PresentationShell({ mode, children }) {
  if (mode === 'fullscreen') {
    return (
      <div style={{ position:'fixed', inset:0, width:'100vw', height:'100vh' }}>
        {children}
      </div>
    )
  }
  return (
    <div style={{
      position:'fixed', inset:0,
      display:'flex', alignItems:'center', justifyContent:'center',
      overflow:'auto',
    }}>
      <PresentationBg />
      <div style={{ position:'relative', zIndex:1 }}>
        {mode === 'phone'  && <PhoneFrame>{children}</PhoneFrame>}
        {mode === 'tablet' && <TabletFrame>{children}</TabletFrame>}
      </div>
    </div>
  )
}
