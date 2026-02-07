# Compagnia

A modern, elegant web application for **Compagnia**, a chamber music collective based in New York City. This project is a refined clone and enhancement of their digital presence, focusing on high-quality aesthetics, smooth performance, and mobile-responsive design.

## ✨ Features

... [Features list] ...

## 🎨 Quick Start for Non-Developers (iPad & Web)

The easiest way to view or edit this project is using **GitHub Codespaces**. This gives you a full computer in your browser without needing to install anything.

1.  **Open the Environment**: Click the green **"Code"** button at the top of this page, select the **Codespaces** tab, and click **"Create codespace on main"**.
2.  **Wait for Setup**: A new tab will open with a code editor. Wait about 1-2 minutes for the bottom terminal to stop moving (it is automatically installing everything for you).
3.  **View the App**: A small pop-up will appear in the bottom right saying *"Your application is running on port 5173"*. Click **"Open in Browser"** to see the live website!
4.  **Make Changes**: 
    - Open the `src/data/musicians.json` file to change musician names or bios.
    - Open `src/pages/Home.tsx` to change the welcome text.
    - Changes will appear on the live website preview instantly after you save!

## 🚀 Tech Stack

- **Framework**: [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Styling**: Vanilla CSS (Custom properties and modern Layout APIs)
- **Icons**: Custom SVG icons

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/erica-zhong/compagnia.git
   cd compagnia
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 📁 Project Structure

```text
src/
├── components/     # Reusable UI components (Countdown, FadeIn, etc.)
├── data/           # JSON files for musicians and events
├── pages/          # Full page components (Home, About, Bio, etc.)
├── assets/         # Static assets and global styles
└── App.tsx         # Root component and routing logic
```

## 🎹 License

Distributed under the MIT License. See `LICENSE` for more information.

---
*Created with care for the NYC classical music community.*
