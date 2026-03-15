// Colors exact from Figma
export const C = {
  bg:       '#0a0a0a',
  surface:  '#19191b',
  surface2: '#171719',
  border:   'rgba(255,255,255,0.07)',
  topbar:   '#1f2023',
  text:     '#ffffff',
  textMuted:'rgba(255,255,255,0.5)',
  textDim:  'rgba(255,255,255,0.3)',
  accent:   '#78c8c9',
  accent2:  '#4ecdc4',
  accentB:  '#78a0d1',
  critical: '#ff2056',
  warn:     '#d4af37',
  muted:    '#8d8d8f',
  f2:       '#f2f2f2',
  a1:       '#a1a1a1',
}

// Client header — shared across Overview/Biomarkers/Protocols/Notes
export function ClientHeader({ client, activeTab, onTab }) {
  const tabs = ['Overview', 'biomarkers', 'protocols', 'notes']
  return (
    <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`,
      padding: '16px 24px 0', flexShrink: 0 }}>
      {/* Client info row */}
      <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:16 }}>
        <div style={{ width:44, height:44, borderRadius:'50%',
          background:'linear-gradient(135deg,#78a0d1,#78c8c9)',
          display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <span style={{ fontSize:16, fontWeight:500, color:'#0a0a0a' }}>
            {client.initials}
          </span>
        </div>
        <div>
          <div style={{ fontSize:24, fontWeight:500, color:C.text, letterSpacing:'-0.02em' }}>
            {client.name}
          </div>
          <div style={{ display:'flex', gap:16, marginTop:2 }}>
            <span style={{ fontSize:14, color:C.textMuted }}>{client.age} years old</span>
            <span style={{ fontSize:14, color:C.accent }}>{client.plan}</span>
            <span style={{ fontSize:14, color:C.textMuted }}>Joined {client.joined}</span>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div style={{ display:'flex', gap:0 }}>
        {tabs.map(tab => (
          <button key={tab} onClick={() => onTab(tab)}
            style={{ padding:'10px 20px', background:'none', border:'none', cursor:'pointer',
              fontFamily:'inherit', fontSize:14, fontWeight:400,
              color: activeTab===tab ? C.accent : C.textMuted,
              borderBottom: `2px solid ${activeTab===tab ? C.accent : 'transparent'}`,
              marginBottom:-1, outline:'none', transition:'all 0.15s' }}>
            {tab}
          </button>
        ))}
      </div>
    </div>
  )
}
