# Longevity System · Prototype

High-fidelity interactive prototype for the Longevity System app.

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

**Password:** `longevity2025`

## Project Structure

```
src/
├── components/
│   ├── PresentationShell.jsx   # Device frame (phone/tablet)
│   ├── MobileNav.jsx           # Bottom nav: Overview / Data / Plan / Profile
│   └── AnnotationLayer.jsx     # Press M to toggle annotations
├── screens/
│   ├── PasswordGate.jsx        # PASS-01 · Sign In
│   ├── PersonaSelector.jsx     # SEL-01 · Choose persona
│   └── mobile/
│       ├── AppleHealth.jsx     # MOB-02 · Connect Apple Health
│       ├── ConnectGarmin.jsx   # MOB-03 · Connect Garmin
│       ├── MedRecs.jsx         # MOB-04 · Medical Records
│       ├── UploadLabs.jsx      # MOB-05 · Upload Labs
│       ├── Onboarding.jsx      # MOB-06 · Define Goals
│       ├── Dashboard.jsx       # MOB-07 · Dashboard
│       ├── MetricDetails.jsx   # MOB-08 · Physique & Muscle
│       └── Subscription.jsx    # MOB-09 · Subscription
├── hooks/
│   └── useAnnotations.js
└── data/
    └── mockData.js
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `M` | Toggle annotation layer |
| `ESC` | Back to persona selector |

## Deployment (Render.com)

1. Push to GitHub
2. Connect repo to Render.com
3. Render auto-detects `render.yaml`
4. Set `VITE_APP_PASSWORD` in Render dashboard → Environment
5. Deploy

## Mobile Flow

Sign In → Apple Health → Connect Garmin → Medical Records → Upload Labs → Define Goals → **Dashboard** → Metric Details / Subscription

## Colors (from Figma)

| Token | Hex | Usage |
|-------|-----|-------|
| bg | `#1c1d21` | Background |
| accent | `#78c8c9` | Primary CTA, teal |
| accent2 | `#78a0d1` | Gradient start |
| critical | `#ff2056` / `#ff6b6b` | Bad metrics |
| warn | `#e67e22` | Monitor metrics |
| gold | `#d4af37` | Mid metrics |
| optimal | `#05df72` | Good metrics |
