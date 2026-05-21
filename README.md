# 🌌 Ankit Kumar - Developer Portfolio

An immersive, cinematic, and high-performance personal portfolio website built for **Ankit Kumar** (Full-Stack Developer & AI Engineer). The site features interactive 3D elements, dynamic scroll-linked animations, a custom UI system, and a dual-theme (Cinematic Dark / Clean Light) design language.

---

## 🚀 Core Features

* **Interactive 3D Universe:** Powered by React Three Fiber (Three.js), generating real-time celestial particle systems.
* **Cinematic Scrolling & Timeline Reveals:** Rich, hardware-accelerated animations built using **GSAP (ScrollTrigger)** and **Framer Motion**.
* **Glassmorphic UI Design:** Soft frosted glass surfaces with interactive border glow states and custom styling.
* **Tactile Interactions:** Custom inertia-based tracking cursor, magnetic button systems, and a running speed-controlled marquee.
* **GitHub Integration:** An inline representation of real-time GitHub contributions themed dynamically to match the current visual mode.
* **Responsive Layout:** Adaptive design supporting desktop, tablet, and mobile viewing orientations.

---

## 🎨 Brand & Design System

The visual layout of this project adheres to a futuristic, space-themed design language. For full specifications, see [brand_guideline.md](file:///.gemini/antigravity-ide/brain/a49617f6-5955-42cb-9c8c-2406e6f34ec5/brand_guideline.md).

### 1. Color Palette

* **Primary Accent (Neon Cyan):** `hsl(192, 91%, 50%)` | `#0BC5F3` — Active states, glowing points, interactive custom cursor.
* **Secondary Accent (Cosmic Violet):** `hsl(280, 87%, 65%)` | `#8C58F3` — Gradient highlights.
* **Primary Gradient:** `linear-gradient(135deg, #0BC5F3 0%, #8C58F3 100%)`
* **Dark Mode Background:** `hsl(240, 10%, 4%)` | `#09090B` — Atmospheric dark space.
* **Light Mode Background:** `hsl(0, 0%, 100%)` | `#FFFFFF` — Pure minimal white.

### 2. Typography

* **Display/Headings:** **Space Grotesk** — Geometric, wide, and tech-focused font family.
* **Body/Content:** **Inter** — Highly legible, neutral sans-serif font family.

---

## 🛠️ Technology Stack

* **Core Framework:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **Build Tool:** [Vite 5](https://vitejs.dev/)
* **Styles & Layout:** [Tailwind CSS 3](https://tailwindcss.com/) + [PostCSS](https://postcss.org/)
* **UI Components:** [Radix UI primitives](https://www.radix-ui.com/) + [Shadcn UI](https://ui.shadcn.com/)
* **3D Engine:** [Three.js](https://threejs.org/) / [@react-three/fiber](https://r3f.docs.pmnd.rs/getting-started/introduction) / [@react-three/drei](https://github.com/pmndrs/drei)
* **Animation Libraries:** [GSAP (GreenSock)](https://gsap.com/) + [Framer Motion](https://www.framer.com/motion/)
* **State & Networking:** [TanStack React Query (v5)](https://tanstack.com/query/latest)
* **Routing:** [React Router DOM (v6)](https://reactrouter.com/en/main)
* **Forms & Validation:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
* **Unit Testing:** [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/)

---

## 📂 Project Structure

```text
├── src/
│   ├── components/      # UI components, layout, and sections
│   │   ├── layout/      # Nav, Footer, Scroll controls, Layout wrappers
│   │   ├── sections/    # Hero, About, Projects, GitHub, Skills pages
│   │   ├── three/       # 3D canvas objects, particle systems, canvases
│   │   └── ui/          # Low-level reusable components (Shadcn primitives)
│   ├── data/            # JSON files containing projects, experience, skills data
│   ├── hooks/           # Custom React hooks (theme states, layout sizes)
│   ├── pages/           # Routed view containers (Index, Projects, Skills, etc.)
│   ├── lib/             # Utility styling builders (cn) and global libraries
│   ├── App.tsx          # Main entry route mapper
│   ├── index.css        # Core stylesheet containing the custom theme tokens
│   └── main.tsx         # Root mounting configuration
├── public/              # Static media files, SVGs, and web assets
├── package.json         # Build details and package configuration
├── tailwind.config.ts   # Custom theme setup mapping the brand guidelines
└── vite.config.ts       # Module bundling configurations
```

---

## 💻 Local Development Setup

To run this project locally, ensure you have [Node.js](https://nodejs.org/) installed on your machine.

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Portfolio
   ```

2. **Install dependencies:**
   Using npm:
   ```bash
   npm install
   ```
   Or using Bun:
   ```bash
   bun install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The local server will start, typically at `http://localhost:5173`.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Run test suites:**
   ```bash
   npm run test
   ```
