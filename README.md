# Spikad Internal Operating System Viewer

An internal dashboard to view Spikad's architectural diagrams and process documentations in one unified interface.

## Quick Start

1.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn
    ```

2.  **Run locally**
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deployment (Vercel)

This project is built with Vite (React + TypeScript) and is ready for Vercel deployment.

1.  **Push to GitHub**
    Initialize a git repo (if not already done) and push this `spikad-viewer` folder (or the root if preferred).

2.  **Import to Vercel**
    - Go to Vercel Dashboard -> Add New -> Project.
    - Import the repository.
    - Set the **Root Directory** to `spikad-viewer` (if you pushed the parent folder).
    - Vercel will automatically detect Vite.
    - Click **Deploy**.

## Project Structure

- `public/diagrams/`: Contains the 6 static HTML source files (DO NOT EDIT these directly if you want to preserve the "source of truth", but you can replace them).
- `src/App.tsx`: The main dashboard logic (Sidebar + Iframe).
- `src/index.css`: Global styles including Tailwind.

## Adding New Diagrams

1.  Place the HTML file in `public/diagrams/`.
2.  Open `src/App.tsx`.
3.  Add an entry to the `DOCS` array:
    ```typescript
    { id: "new-doc", title: "New Documentation", filename: "new_file.html" },
    ```
