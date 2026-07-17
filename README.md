<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=22B8CF&height=200&section=header&text=Campus%20Compass&fontSize=60&fontColor=ffffff&animation=fadeIn" alt="Campus Compass Header" />
</div>

<div align="center">
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge&color=22B8CF" alt="Status" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge&color=22B8CF" alt="License" />
  <img src="https://img.shields.io/badge/Version-1.0.0-purple?style=for-the-badge&color=22B8CF" alt="Version" />
</div>

<br />

<div align="center">
  <p align="center" style="font-size: 1.2rem; color: #475569;">
    <strong>An open-source digital campus guide built by students, for students.</strong>
  </p>
</div>

<hr />

## 📖 The Vision

**Campus Compass** is redefining how students, faculty, and visitors interact with university environments. Starting with **MIT Bengaluru**, this project delivers a highly interactive, 3D-accelerated digital campus map that bridges the gap between physical infrastructure and digital accessibility. 

Engineered with an absolute obsession for detail, Campus Compass pairs cutting-edge web mapping technology with a stunning, premium **glassmorphism** design language.

---

## ✨ Signature Features

### 🗺️ Next-Gen 3D Interactive Mapping
- **Hardware-Accelerated Vector Maps:** Powered by MapLibre GL JS for silky-smooth 60fps panning, zooming, and 3D tilting.
- **Dynamic Extrusions:** Buildings and landmarks are rendered as interactive 3D structures with real-time dynamic shading based on active filters.
- **Smart Categorization:** Instantly filter the campus by Academic, Hostels, Food, Sports, and Admin buildings.
- **Contextual Ghosting:** Unselected buildings smoothly transition into a translucent, muted state to provide environmental context without cluttering the view.
- **GPS Integration:** Live geolocation tracking pinpoints your exact coordinates on campus.
- **Dual Layer Modes:** Seamlessly transition between an ultra-clean architectural vector view and high-resolution satellite imagery.

### 🎨 State-of-the-Art Aesthetic
- **Premium Glassmorphism:** Heavy use of frosted glass (`backdrop-blur`), soft auras, and dynamic micro-animations to create a lightweight, floating UI.
- **Adaptive Theming:** Flawless, synchronized dark and light modes that dynamically adjust map basemaps, building colors, and UI shadows.
- **Fluid Micro-Interactions:** From gliding tabs to pulsing neon buttons, the interface feels alive and hyper-responsive.

### 🛠️ Community-Driven Data
- **Crowdsourced Intelligence:** Found a missing shortcut? Notice a floor plan error? Users can drop pins directly on the map to report issues.
- **Real-Time Backend:** Issue reporting and map updates are securely handled via Supabase integration.

---

## 💻 The Tech Stack

Campus Compass is engineered using a modern, scalable, and highly performant architecture:

### Frontend
- **Framework:** [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) for strict type safety
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Custom UI Tokens, Glassmorphism utilities, and complex animations)
- **Icons:** Google Material Symbols (Rounded & Outlined)

### Mapping Engine
- **Core Library:** [MapLibre GL JS](https://maplibre.org/)
- **Basemaps:** CartoDB (Dark Matter & Positron)
- **Geometry Data:** Sourced via OpenStreetMap (Overpass API) and custom GeoJSON polygon definitions.

### Backend & Database
- **Infrastructure:** [Supabase](https://supabase.com/) (PostgreSQL Database & Edge Functions)

---

## 🚀 Getting Started

To get a local development environment up and running, follow these steps:

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JayeshRocks/Campus-Compass.git
   cd Campus-Compass
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Copy the example environment file to set up your local variables:
   ```bash
   cp .env.example .env.local
   ```
   *Note: Populate `.env.local` with your Supabase credentials. If you are a core contributor, contact the maintainers for development keys.*

4. **Launch the Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

5. **Build for Production**
   ```bash
   npm run build
   ```

---

## 🤝 How to Contribute

Campus Compass thrives on open-source contributions. Whether you're fixing a typo, mapping a new building, or optimizing a React hook—your help is **greatly appreciated**!

1. **Fork** the Project
2. **Create** your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. **Push** to the Branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

*Please ensure your code follows the existing Tailwind architecture and passes all TypeScript checks.*

---

## 🗺️ Roadmap & Future Horizons

- [ ] **Indoor Maps & Floor Plans:** Mapping the interiors of major academic blocks.
- [ ] **Walking Navigation (Routing):** A to B pathfinding across the campus road network.
- [ ] **Accessibility Paths:** Highlighting wheelchair-friendly routes and elevators.
- [ ] **Event Discovery:** Live tracking of club events and guest lectures on the map.
- [ ] **Campus Shuttle Integration:** Live tracking of campus buses.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <p>Crafted with absolute dedication and ❤️ by students, for students.</p>
</div>
