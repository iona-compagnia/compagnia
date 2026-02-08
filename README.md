# Compagnia

A modern, elegant web application for **Compagnia**, a chamber music collective based in New York City. This project is a refined clone and enhancement of their digital presence, focusing on high-quality aesthetics, smooth performance, and mobile-responsive design.

## ✨ Features

... [Features list] ...

## 🎨 Quick Start for Non-Developers (iPad & Web)

The easiest way to edit this project is using **GitHub Codespaces**. This gives you a full computer in your browser.

1.  **Open the Environment**: Click the green **"Code"** button at the top of this page, select **Codespaces**, and click **"Create codespace on main"**.
2.  **Wait for Setup**: A new tab will open. You will see a `TODO.md` file with instructions. **Wait about 1 minute** while the system automatically installs everything and starts the preview.
3.  **View the Website**: A pop-up will appear in the bottom right. Click **"Open in Browser"** to see your live preview.
4.  **Using Gemini (AI Assistant)**:
    - If you want the AI to change something for you, press `Cmd + Shift + P` (iPad/Mac) or `Ctrl + Shift + P` (Windows).
    - Type **"Gemini"** and select **"Gemini: Focus on Gemini View"**.
    - You can now chat with the AI to help you edit the site!

## 🚀 Tech Stack

- **Framework**: [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Styling**: Vanilla CSS (Custom properties and modern Layout APIs)
- **Icons**: Custom SVG icons

## 🛠️ Developer Setup (Local Mac/PC)

If you prefer to work locally on your own machine:

1. **Clone & Install**:
   ```bash
   git clone https://github.com/iona-compagnia/compagnia.git
   cd compagnia
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173`.

3. **Deploy Changes**:
   Simply push your changes to the `main` branch. GitHub Actions will automatically build and deploy the site to **compagnia.org**.

## 📁 Project Structure

```text
src/
├── components/     # Reusable UI components (Countdown, FadeIn, etc.)
├── data/           # JSON files for musicians and events
├── pages/          # Full page components (Home, About, Bio, etc.)
├── assets/         # Static assets and global styles
└── App.tsx         # Root component and routing logic
```

## 📝 TODO / Roadmap

- [ ] **Simplify Content Management**: Connect the `events.json` and `musicians.json` data to a Google Sheet so the director can update the site without touching code.
- [ ] **Image Upload Workflow**: Streamline how the director can upload new performance photos from an iPad.
- [ ] **Admin Dashboard**: Create a simple, password-protected admin page for basic text updates.

## 🎹 License

Distributed under the MIT License. See `LICENSE` for more information.

---
*Created with care for the NYC classical music community.*
