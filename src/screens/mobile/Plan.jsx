import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, CheckCircle2, Circle, Clock, Flame, Dumbbell, Wind, Bike, Moon, Activity } from 'lucide-react'

const WEEK = [
  {
    day: 'Mon', full: 'Monday',    date: 'Mar 10',
    type: 'Strength', focus: 'Upper Push',
    status: 'done', duration: 65, calories: 420,
    icon: Dumbbell, color: '#78c8c9',
    exercises: [
      { name: 'Bench Press',      sets: 4, reps: '6-8',   weight: '95kg',  rpe: 8 },
      { name: 'Incline DB Press', sets: 3, reps: '10-12', weight: '32kg',  rpe: 7 },
      { name: 'Overhead Press',   sets: 3, reps: '8-10',  weight: '60kg',  rpe: 8 },
      { name: 'Lateral Raises',   sets: 4, reps: '15-20', weight: '14kg',  rpe: 6 },
      { name: 'Tricep Pushdown',  sets: 3, reps: '12-15', weight: '35kg',  rpe: 7 },
    ],
  },
  {
    day: 'Tue', full: 'Tuesday',   date: 'Mar 11',
    type: 'Zone 2', focus: 'Aerobic Base',
    status: 'done', duration: 45, calories: 310,
    icon: Wind, color: '#78a0d1',
    exercises: [{ name: 'Incline Treadmill', sets: 1, reps: '45 min', weight: '—', rpe: 5 }],
  },
  {
    day: 'Wed', full: 'Wednesday', date: 'Mar 12',
    type: 'Strength', focus: 'Lower Body',
    status: 'active', duration: 70, calories: 480,
    icon: Dumbbell, color: '#78c8c9',
    exercises: [
      { name: 'Back Squat',         sets: 4, reps: '6-8',   weight: '120kg', rpe: 8 },
      { name: 'Romanian Deadlift',  sets: 3, reps: '10-12', weight: '90kg',  rpe: 7 },
      { name: 'Leg Press',          sets: 3, reps: '12-15', weight: '200kg', rpe: 7 },
      { name: 'Nordic Curls',       sets: 3, reps: '8-10',  weight: 'BW',    rpe: 9 },
      { name: 'Calf Raise',         sets: 4, reps: '15-20', weight: '60kg',  rpe: 6 },
    ],
  },
  {
    day: 'Thu', full: 'Thursday',  date: 'Mar 13',
    type: 'Recovery', focus: 'Mobility + Sauna',
    status: 'upcoming', duration: 50, calories: 120,
    icon: Moon, color: '#d4af37',
    exercises: [
      { name: 'Mobility Flow',  sets: 1, reps: '20 min', weight: '—', rpe: 3 },
      { name: 'Sauna Protocol', sets: 3, reps: '15 min', weight: '—', rpe: 2 },
    ],
  },
  {
    day: 'Fri', full: 'Friday',    date: 'Mar 14',
    type: 'Strength', focus: 'Upper Pull',
    status: 'upcoming', duration: 65, calories: 400,
    icon: Dumbbell, color: '#78c8c9',
    exercises: [
      { name: 'Weighted Pull-ups', sets: 4, reps: '6-8',   weight: '+15kg', rpe: 8 },
      { name: 'Barbell Row',       sets: 4, reps: '8-10',  weight: '90kg',  rpe: 8 },
      { name: 'Seated Cable Row',  sets: 3, reps: '12-15', weight: '70kg',  rpe: 7 },
      { name: 'Face Pulls',        sets: 3, reps: '15-20', weight: '25kg',  rpe: 6 },
      { name: 'Bicep Curl',        sets: 3, reps: '12-15', weight: '20kg',  rpe: 7 },
    ],
  },
  {
    day: 'Sat', full: 'Saturday',  date: 'Mar 15',
    type: 'Zone 2', focus: 'Outdoor Cycle',
    status: 'upcoming', duration: 60, calories: 520,
    icon: Bike, color: '#78a0d1',
    exercises: [{ name: 'Outdoor Cycling', sets: 1, reps: '60 min', weight: '—', rpe: 5 }],
  },
  {
    day: 'Sun', full: 'Sunday',    date: 'Mar 16',
    type: 'Rest', focus: 'Active Recovery',
    status: 'upcoming', duration: 40, calories: 180,
    icon: Activity, color: '#6b6b80',
    exercises: [{ name: 'Walk', sets: 1, reps: '30-45 min', weight: '—', rpe: 2 }],
  },
]

const typeColor = { Strength:'#78c8c9', 'Zone 2':'#78a0d1', Recovery:'#d4af37', Rest:'#6b6b80' }
const statusIcon = { done: CheckCircle2, active: Flame, upcoming: Circle }

function WorkoutDetail({ day, onClose }) {
  const StatusIcon = statusIcon[day.status]
  const Icon = day.icon
  return (
    <motion.div
      initial={{ opacity:0, y:'100%' }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:'100%' }}
      transition={{ duration:0.3, ease:[0.22,1,0.36,1] }}
      style={{ position:'absolute', inset:0, background:'linear-gradient(160deg,#1c1d21,#0e0e12)',
        zIndex:50, overflowY:'auto', paddingBottom:88 }}
    >
      {/* Header */}
      <div style={{ padding:'54px 24px 0', display:'flex', alignItems:'flex-start', gap:14 }}>
        <motion.button whileTap={{scale:0.9}} onClick={onClose}
          style={{ width:36, height:36, borderRadius:'50%', flexShrink:0, marginTop:2,
            background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)',
            display:'flex', alignItems:'center', justifyContent:'center',
            cursor:'pointer', outline:'none' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(253,255,252,0.8)" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
        </motion.button>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:10, color:'rgba(253,255,252,0.4)', letterSpacing:'0.08em', marginBottom:4, textTransform:'uppercase' }}>
            {day.full} · {day.date}
          </div>
          <div style={{ fontSize:22, fontWeight:500, color:'#fdfffc', letterSpacing:'-0.02em', marginBottom:4 }}>
            {day.focus}
          </div>
          <div style={{ display:'flex', gap:8, alignItems:'center' }}>
            <span style={{ fontSize:12, padding:'2px 8px', borderRadius:4,
              background:`${typeColor[day.type]}20`, border:`1px solid ${typeColor[day.type]}40`,
              color:typeColor[day.type] }}>{day.type}</span>
            <span style={{ fontSize:12, color:'rgba(253,255,252,0.4)' }}>{day.duration} min</span>
            <span style={{ fontSize:12, color:'rgba(253,255,252,0.4)' }}>~{day.calories} kcal</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, margin:'20px 24px 0' }}>
        {[
          { label:'Duration', value:`${day.duration}m`, color:'#78c8c9' },
          { label:'Calories', value:`~${day.calories}`, color:'#e67e22' },
          { label:'Exercises', value:`${day.exercises.length}`, color:'#78a0d1' },
        ].map((s,i) => (
          <div key={i} style={{ padding:'12px 14px', background:'rgba(255,255,255,0.04)',
            border:'1px solid rgba(255,255,255,0.07)', borderRadius:12, textAlign:'center' }}>
            <div style={{ fontSize:18, fontWeight:600, color:s.color, marginBottom:2 }}>{s.value}</div>
            <div style={{ fontSize:10, color:'rgba(253,255,252,0.4)', textTransform:'uppercase', letterSpacing:'0.04em' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Exercise list */}
      <div style={{ margin:'20px 24px 0' }}>
        <div style={{ fontSize:12, color:'rgba(253,255,252,0.5)', marginBottom:12, textTransform:'uppercase', letterSpacing:'0.06em', fontSize:10 }}>
          Exercises
        </div>
        {day.exercises.map((ex, i) => (
          <motion.div key={i}
            initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:0.1+i*0.05}}
            style={{ padding:'14px 16px', marginBottom:8,
              background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)',
              borderRadius:14, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div>
              <div style={{ fontSize:14, fontWeight:500, color:'#fdfffc', marginBottom:4 }}>{ex.name}</div>
              <div style={{ display:'flex', gap:8 }}>
                <span style={{ fontSize:12, color:'rgba(253,255,252,0.5)' }}>{ex.sets} sets</span>
                <span style={{ fontSize:12, color:'rgba(253,255,252,0.5)' }}>×</span>
                <span style={{ fontSize:12, color:'rgba(253,255,252,0.5)' }}>{ex.reps}</span>
                {ex.weight !== '—' && <span style={{ fontSize:12, color:'#78c8c9' }}>{ex.weight}</span>}
              </div>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontSize:11, color:'rgba(253,255,252,0.3)', marginBottom:2 }}>RPE</div>
              <div style={{ fontSize:16, fontWeight:600, color: ex.rpe>=8?'#ff6b6b':ex.rpe>=6?'#d4af37':'#05df72' }}>
                {ex.rpe}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Plan({ annotationsVisible }) {
  const [selected, setSelected] = useState(null)
  const today = 'Wed'

  return (
    <div style={{ width:'100%', height:'100%', position:'relative', overflow:'hidden',
      background:'linear-gradient(160deg,#1c1d21 0%,#0e0e12 100%)' }}>
      {annotationsVisible && <div className="annotation-badge">MOB-PLAN · Weekly Plan</div>}

      <div style={{ overflowY:'auto', height:'100%', paddingBottom:88 }}>
        {/* Header */}
        <div style={{ padding:'54px 24px 0' }}>
          <div style={{ fontSize:24, fontWeight:500, color:'#fdfffc', letterSpacing:'-0.02em', marginBottom:2 }}>
            Training Plan
          </div>
          <div style={{ fontSize:12, color:'rgba(253,255,252,0.45)', marginBottom:20 }}>
            Week of Mar 10–16, 2026
          </div>

          {/* Week summary */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:24 }}>
            {[
              { label:'Workouts', value:'5/7' },
              { label:'Done', value:'2/7' },
              { label:'Volume', value:'~2,730 kcal' },
            ].map((s,i) => (
              <div key={i} style={{ padding:'10px 12px', background:'rgba(255,255,255,0.04)',
                border:'1px solid rgba(255,255,255,0.07)', borderRadius:10, textAlign:'center' }}>
                <div style={{ fontSize:15, fontWeight:600, color:'#fdfffc', marginBottom:2 }}>{s.value}</div>
                <div style={{ fontSize:10, color:'rgba(253,255,252,0.4)', textTransform:'uppercase', letterSpacing:'0.04em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Day cards */}
        <div style={{ padding:'0 24px', display:'flex', flexDirection:'column', gap:8 }}>
          {WEEK.map((day, i) => {
            const Icon = day.icon
            const isToday = day.day === today
            const isDone  = day.status === 'done'
            return (
              <motion.div key={day.day}
                initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}
                whileTap={{scale:0.98}}
                onClick={() => setSelected(day)}
                style={{
                  padding:'14px 16px',
                  background: isToday ? 'rgba(120,200,201,0.07)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isToday ? 'rgba(120,200,201,0.25)' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius:16, cursor:'pointer', display:'flex', alignItems:'center', gap:14,
                }}>
                {/* Day label */}
                <div style={{ width:40, textAlign:'center', flexShrink:0 }}>
                  <div style={{ fontSize:11, fontWeight:600, color: isToday?'#78c8c9':'rgba(253,255,252,0.4)',
                    textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:2 }}>{day.day}</div>
                  <div style={{ fontSize:10, color:'rgba(253,255,252,0.3)' }}>{day.date.split(' ')[1]}</div>
                </div>

                {/* Icon */}
                <div style={{ width:36, height:36, borderRadius:10, flexShrink:0,
                  background:`${day.color}15`, border:`1px solid ${day.color}30`,
                  display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Icon size={16} color={day.color} />
                </div>

                {/* Info */}
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:3 }}>
                    <span style={{ fontSize:14, fontWeight:500, color:'#fdfffc', whiteSpace:'nowrap' }}>{day.focus}</span>
                    {isToday && <span style={{ fontSize:9, padding:'2px 6px', borderRadius:3,
                      background:'rgba(120,200,201,0.15)', color:'#78c8c9', fontWeight:600,
                      textTransform:'uppercase', letterSpacing:'0.06em' }}>Today</span>}
                  </div>
                  <div style={{ display:'flex', gap:10 }}>
                    <span style={{ fontSize:11, color: `${typeColor[day.type]}` }}>{day.type}</span>
                    <span style={{ fontSize:11, color:'rgba(253,255,252,0.35)' }}>{day.duration} min</span>
                    <span style={{ fontSize:11, color:'rgba(253,255,252,0.35)' }}>{day.exercises.length} exercises</span>
                  </div>
                </div>

                {/* Status */}
                <div style={{ flexShrink:0 }}>
                  {isDone ? (
                    <CheckCircle2 size={20} color="#05df72" />
                  ) : day.status === 'active' ? (
                    <Flame size={20} color="#78c8c9" />
                  ) : (
                    <ChevronRight size={18} color="rgba(253,255,252,0.2)" />
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Workout detail overlay */}
      <AnimatePresence>
        {selected && (
          <WorkoutDetail day={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}
