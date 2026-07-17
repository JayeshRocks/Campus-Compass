# Campus Compass - Agent Rules

These rules apply to any AI agent working on the Campus Compass codebase.

## 1. Mapping Library
- **Rule**: ALWAYS use `maplibre-gl` instead of Mapbox.
- **Context**: The project uses MapLibre for open-source 3D rendering to avoid commercial licensing fees.

## 2. UI and Styling
- **Rule**: Use Tailwind CSS for all styling.
- **Context**: The UI relies heavily on modern glassmorphism (`liquid-glass` classes), CSS variables for dark/light mode (`dark:bg-surface-container-high`), and Google Material Symbols for icons.

## 3. Map Data
- **Rule**: Building coordinates and metadata are stored locally in `src/data/buildings.ts`.
- **Context**: Boundaries and road networks are fetched via Overpass API scripts (`fetch_roads.cjs`) rather than live queries in the frontend to reduce latency.

## 4. State Management
- **Rule**: Keep UI state (like active tabs and sidebar toggles) in React Context or top-level components (like `App.tsx`), but cache heavy map camera states (pitch/bearing) in module-level variables or `localStorage`.
- **Context**: This prevents the 3D map from jarringly resetting when the user navigates between the map tab and other application pages.

## 5. Overpass API (Road Generation)
- **Rule**: ALWAYS use the `maps.mail.ru` Overpass mirror with a raw POST request when editing `fetch_roads.cjs`.
- **Context**: The official German Overpass API servers actively block and rate-limit Node.js `fetch` requests based on internal browser headers. 

## 6. Supabase & Feedback System
- **Rule**: Feedback forms submit directly to the Supabase `feedback` table. GitHub issues are generated via a Supabase Edge Function.
- **Context**: Do not try to write GitHub API logic in the frontend React code. The GitHub Fine-grained PAT is securely stored in the Supabase Edge Function Secrets vault.
