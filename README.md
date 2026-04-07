# Compagnia

A modern, elegant web application for **Compagnia**, a chamber music collective based in New York City. This project is a refined clone and enhancement of their digital presence, focusing on high-quality aesthetics, smooth performance, and mobile-responsive design.

## ✨ Features

... [Features list] ...

## 🎻 Director's Guide (iPad & Web)



The easiest way to edit this project is using **GitHub Codespaces**.



1.  **Open the Environment**: Click the green **"Code"** button at the top of this page, select **Codespaces**, and click **"Create codespace on main"**.

2.  **Start Chatting**: In the black box at the bottom (the Terminal), type the letter **`g`** and hit Enter. 

3.  **Ask for Changes**: Tell the AI what you want to do in plain English (e.g., "Change the concert date to March 15th").

4.  **Automatic Updates**: The AI will edit the files and **push the changes live to the website** for you automatically!



### 🚀 How to Save Your Changes

The AI handles the saving for you. If you ever need to save a change manually, use the **Source Control** tab on the left to "Commit" and "Sync" your work.



### 🛡️ The "Safety Gate" (Automated Checks)
To ensure the website doesn't break, I've added an **Automated Safety Gate**. Every time you "Commit" and "Sync" your changes, a robot automatically checks two things:
1.  **Code Quality**: It makes sure there are no typos or mistakes in the hidden code.
2.  **Health Check**: It runs a "Smoke Test" to make sure the homepage still loads correctly and hasn't crashed.

**What happens if there's a mistake?**
If the robot finds an error, it will stop the update. **The live website will stay on the last working version**, so you don't have to worry about "breaking" the site for your audience! You'll see a red mark on GitHub if this happens.

## 🛠️ Forms & Newsletter

The Contact and Newsletter forms on this site use a **"Stealth Google Form"** setup for maximum reliability. 

### How it works:
*   Data is sent directly to a Google Form (`/formResponse`) in the background via a hidden iframe.
*   **Why?** This avoids the need for Google Apps Script "Deployment IDs" which often break when updated. This system is "set it and forget it."
*   **Destination**: All submissions go to the **"General Inquiry Form"** in Iona's Google Drive.

### Maintenance:
If you ever need to change the destination:
1. Create a new Google Form.
2. Get the "entry IDs" for each field (Name, Email, etc.) from the form's HTML.
3. Update the IDs in `src/components/NewsletterForm.tsx` and `src/pages/Contact.tsx`.

### Email Notifications:
To get an email whenever someone signs up:
* Open the Google Form > **Responses** tab > Click **⋮** > Select **"Get email notifications for new responses"**.

---

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

## 🎹 License

Distributed under the MIT License. See `LICENSE` for more information.

---
*Created with care for the NYC classical music community.*
