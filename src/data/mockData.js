// Real persona data from Figma Research file (Muscle Intelligence)
export const persona = {
  name: 'Jack Blake',
  age: 41,
  profession: 'Private Equity Partner',
  trainingHistory: '18 years lifting',
  avatar: 'JB',
}

export const dashboardMetrics = [
  { id: 'lean_mass',      label: 'Lean Mass',       value: 74.2,  unit: 'kg',   delta: +0.8,  trend: 'up',   color: '#7B6EF6' },
  { id: 'body_fat',       label: 'Body Fat %',       value: 19.4,  unit: '%',    delta: -0.6,  trend: 'down', color: '#4ECDC4' },
  { id: 'vat',            label: 'VAT',              value: 112,   unit: 'cm²',  delta: -8,    trend: 'down', color: '#4ECDC4' },
  { id: 'vo2max',         label: 'VO₂ Max',          value: 44.1,  unit: 'ml/kg/min', delta: +1.2, trend: 'up', color: '#7B6EF6' },
  { id: 'grip_strength',  label: 'Grip Strength',    value: 52,    unit: 'kg',   delta: +2,    trend: 'up',   color: '#7B6EF6' },
  { id: 'hrv',            label: 'HRV',              value: 58,    unit: 'ms',   delta: +4,    trend: 'up',   color: '#4ECDC4' },
  { id: 'fasting_insulin',label: 'Fasting Insulin',  value: 7.2,   unit: 'μU/mL',delta: -0.8, trend: 'down', color: '#4ECDC4' },
  { id: 'hba1c',          label: 'HbA1c',            value: 5.4,   unit: '%',    delta: -0.1,  trend: 'down', color: '#4ECDC4' },
  { id: 'resting_hr',     label: 'Resting HR',       value: 54,    unit: 'bpm',  delta: -2,    trend: 'down', color: '#4ECDC4' },
  { id: 'pullups',        label: 'Pull-ups',         value: 14,    unit: 'reps', delta: +2,    trend: 'up',   color: '#7B6EF6' },
]

export const leanMassHistory = [
  { month: 'Sep', value: 72.1 },
  { month: 'Oct', value: 72.4 },
  { month: 'Nov', value: 72.9 },
  { month: 'Dec', value: 73.1 },
  { month: 'Jan', value: 73.6 },
  { month: 'Feb', value: 74.0 },
  { month: 'Mar', value: 74.2 },
]

export const bodyFatHistory = [
  { month: 'Sep', value: 22.1 },
  { month: 'Oct', value: 21.6 },
  { month: 'Nov', value: 21.0 },
  { month: 'Dec', value: 20.5 },
  { month: 'Jan', value: 20.0 },
  { month: 'Feb', value: 19.7 },
  { month: 'Mar', value: 19.4 },
]

export const hrvHistory = [
  { day: 'Mon', value: 52 },
  { day: 'Tue', value: 49 },
  { day: 'Wed', value: 55 },
  { day: 'Thu', value: 61 },
  { day: 'Fri', value: 58 },
  { day: 'Sat', value: 63 },
  { day: 'Sun', value: 58 },
]

export const weeklyPlan = [
  {
    day: 'Mon', label: 'Monday',
    type: 'Strength',
    focus: 'Upper Push',
    status: 'completed',
    exercises: [
      { name: 'Bench Press', sets: 4, reps: '6–8', weight: '95kg', rpe: 8 },
      { name: 'Incline DB Press', sets: 3, reps: '10–12', weight: '32kg', rpe: 7 },
      { name: 'Overhead Press', sets: 3, reps: '8–10', weight: '60kg', rpe: 8 },
      { name: 'Lateral Raises', sets: 4, reps: '15–20', weight: '14kg', rpe: 6 },
      { name: 'Tricep Pushdown', sets: 3, reps: '12–15', weight: '35kg', rpe: 7 },
    ],
    duration: 65, calories: 420,
  },
  {
    day: 'Tue', label: 'Tuesday',
    type: 'Zone 2',
    focus: 'Aerobic Base',
    status: 'completed',
    exercises: [
      { name: 'Incline Treadmill', sets: 1, reps: '45 min', weight: '—', rpe: 5 },
    ],
    duration: 45, calories: 310,
  },
  {
    day: 'Wed', label: 'Wednesday',
    type: 'Strength',
    focus: 'Lower Body',
    status: 'active',
    exercises: [
      { name: 'Back Squat', sets: 4, reps: '6–8', weight: '120kg', rpe: 8 },
      { name: 'Romanian Deadlift', sets: 3, reps: '10–12', weight: '90kg', rpe: 7 },
      { name: 'Leg Press', sets: 3, reps: '12–15', weight: '200kg', rpe: 7 },
      { name: 'Nordic Curls', sets: 3, reps: '8–10', weight: 'BW', rpe: 9 },
      { name: 'Calf Raise', sets: 4, reps: '15–20', weight: '60kg', rpe: 6 },
    ],
    duration: 70, calories: 480,
  },
  {
    day: 'Thu', label: 'Thursday',
    type: 'Recovery',
    focus: 'Mobility + Sauna',
    status: 'upcoming',
    exercises: [
      { name: 'Mobility Flow', sets: 1, reps: '20 min', weight: '—', rpe: 3 },
      { name: 'Sauna Protocol', sets: 3, reps: '15 min', weight: '—', rpe: 2 },
    ],
    duration: 50, calories: 120,
  },
  {
    day: 'Fri', label: 'Friday',
    type: 'Strength',
    focus: 'Upper Pull',
    status: 'upcoming',
    exercises: [
      { name: 'Weighted Pull-ups', sets: 4, reps: '6–8', weight: '+15kg', rpe: 8 },
      { name: 'Barbell Row', sets: 4, reps: '8–10', weight: '90kg', rpe: 8 },
      { name: 'Seated Cable Row', sets: 3, reps: '12–15', weight: '70kg', rpe: 7 },
      { name: 'Face Pulls', sets: 3, reps: '15–20', weight: '25kg', rpe: 6 },
      { name: 'Bicep Curl', sets: 3, reps: '12–15', weight: '20kg', rpe: 7 },
    ],
    duration: 65, calories: 400,
  },
  {
    day: 'Sat', label: 'Saturday',
    type: 'Zone 2',
    focus: 'Outdoor Cycle',
    status: 'upcoming',
    exercises: [
      { name: 'Outdoor Cycling', sets: 1, reps: '60 min', weight: '—', rpe: 5 },
    ],
    duration: 60, calories: 520,
  },
  {
    day: 'Sun', label: 'Sunday',
    type: 'Rest',
    focus: 'Active Recovery',
    status: 'upcoming',
    exercises: [
      { name: 'Walk', sets: 1, reps: '30–45 min', weight: '—', rpe: 2 },
    ],
    duration: 40, calories: 180,
  },
]

export const nutritionData = {
  today: {
    calories: { current: 2340, target: 2800 },
    protein:  { current: 182,  target: 220,  unit: 'g' },
    carbs:    { current: 210,  target: 280,  unit: 'g' },
    fat:      { current: 74,   target: 90,   unit: 'g' },
  },
  weeklyProtein: [
    { day: 'Mon', value: 218 },
    { day: 'Tue', value: 195 },
    { day: 'Wed', value: 182 },
    { day: 'Thu', value: 225 },
    { day: 'Fri', value: 210 },
    { day: 'Sat', value: 230 },
    { day: 'Sun', value: 205 },
  ],
  supplements: [
    { name: 'Creatine', dose: '5g', timing: 'Post-workout', taken: true },
    { name: 'Omega-3', dose: '2g EPA+DHA', timing: 'With dinner', taken: true },
    { name: 'Vitamin D3', dose: '4000 IU', timing: 'Morning', taken: true },
    { name: 'Magnesium', dose: '400mg', timing: 'Before bed', taken: false },
    { name: 'Collagen', dose: '15g', timing: 'Pre-workout', taken: false },
  ],
}

export const biomarkersData = [
  {
    category: 'Metabolic',
    markers: [
      { name: 'Fasting Insulin', value: 7.2, unit: 'μU/mL', ref: '2–10', status: 'optimal' },
      { name: 'HbA1c', value: 5.4, unit: '%', ref: '<5.7', status: 'optimal' },
      { name: 'Triglycerides', value: 98, unit: 'mg/dL', ref: '<150', status: 'optimal' },
      { name: 'ApoB', value: 92, unit: 'mg/dL', ref: '<90', status: 'borderline' },
      { name: 'hs-CRP', value: 1.2, unit: 'mg/L', ref: '<1.0', status: 'watch' },
    ],
  },
  {
    category: 'Hormonal',
    markers: [
      { name: 'Total Testosterone', value: 620, unit: 'ng/dL', ref: '400–900', status: 'optimal' },
      { name: 'Free Testosterone', value: 14.2, unit: 'ng/dL', ref: '9–30', status: 'optimal' },
      { name: 'SHBG', value: 38, unit: 'nmol/L', ref: '10–57', status: 'optimal' },
      { name: 'IGF-1', value: 165, unit: 'ng/mL', ref: '115–307', status: 'optimal' },
      { name: 'Cortisol AM', value: 18, unit: 'μg/dL', ref: '6–23', status: 'watch' },
    ],
  },
  {
    category: 'Longevity',
    markers: [
      { name: 'Epigenetic Age', value: 38.2, unit: 'yrs', ref: '<41', status: 'optimal' },
      { name: 'Telomere Length', value: 7.4, unit: 'kb', ref: '>7.0', status: 'optimal' },
      { name: 'Grip Strength', value: 52, unit: 'kg', ref: '>44', status: 'optimal' },
      { name: 'VO₂ Max', value: 44.1, unit: 'ml/kg/min', ref: '>42', status: 'optimal' },
      { name: 'HRV (resting)', value: 58, unit: 'ms', ref: '>50', status: 'optimal' },
    ],
  },
]
