<div align="center">
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License" />
  <img src="https://img.shields.io/badge/Version-1.0.0-purple?style=for-the-badge" alt="Version" />
</div>

<br />
<div align="center">
  <h1 align="center">🧭 Campus Compass</h1>
  <p align="center">
    <strong>An open-source digital campus guide built by students, for students.</strong>
  </p>
</div>

<hr />

## 📖 About the Project

Campus Compass aims to make navigating university campuses simple, intuitive, and accessible. Starting with **MIT Bengaluru**, the project provides an interactive, stunningly designed campus map, building information, and location-aware features designed to help students and visitors explore the campus with absolute confidence.

The interface is built with premium **glassmorphism** aesthetics, dynamic micro-animations, and full support for beautiful dark and light themes.

---

## ✨ Features

### 🗺️ Live Interactive Map
- **Rich Vector Maps:** Powered by MapLibre GL JS for smooth panning and zooming.
- **Categorization System:** Filter locations by Academic, Hostels, Food, Sports, and Parking.
- **Floating Search:** Instantly search for buildings, rooms, or resources with a beautifully animated floating search bar.
- **Live User Location:** Uses GPS to pinpoint your exact location on campus.
- **Satellite View Toggle:** Seamlessly switch between standard vector street view and high-res satellite imagery.

### 🎨 Stunning UI/UX
- **Glassmorphism Design:** Beautiful frosted glass overlays, subtle shadows, and premium layout structure.
- **Dark/Light Mode:** Full synchronized support for dark and light themes that adapts automatically.
- **Fluid Animations:** Smooth gliding tabs, interactive hover states, and glitch-tech micro-animations.

### 🛠️ Interactive Reporting
- **Report an Issue:** Click directly on the map to drop a pin and report missing buildings, incorrect paths, or general map feedback to the team (backed by Supabase).

---

## 💻 Tech Stack

Campus Compass is built using modern, fast, and scalable technologies:

- **Framework:** [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Custom UI Tokens & Animations)
- **Map Engine:** [MapLibre GL JS](https://maplibre.org/)
- **Backend / Database:** [Supabase](https://supabase.com/)

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have Node.js and npm installed on your machine.

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

3. **Set up Environment Variables**
   - Copy the example environment file:
     ```bash
     cp .env.example .env.local
     ```
   - Enter your actual Supabase credentials into `.env.local`. *(Contact the maintainers for access keys if you are part of the core team).*

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🗺️ Roadmap / Future Ideas

- [ ] **Indoor Maps & Floor Plans**
- [ ] **Walking Navigation & Route Planning**
- [ ] **Accessibility Paths & Information**
- [ ] **Event Locations & Live Tracking**
- [ ] **Campus Shuttle Integration**

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <p>Made with ❤️ by students, for students.</p>
</div>
