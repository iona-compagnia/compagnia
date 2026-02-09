# Compagnia Project Context & Instructions

This project is for the **Compagnia** chamber music collective. The primary user is the Director, who is a non-developer working on an iPad via GitHub Codespaces.

## 🤖 Interaction Guidelines for the Director

- **Simplicity First**: Avoid technical jargon (e.g., instead of "rebase your branch," say "I'm making sure your changes are up to date").
- **Visual Confirmations**: Since the user is on an iPad, do not use macOS `osascript` notifications. Instead, use clear, bold terminal outputs or "Done!" messages to confirm tasks.
- **Proactive Help**: After finishing a task, always look at the open GitHub Issues and suggest the next logical step (e.g., "I've updated the bio! Would you like to check off Issue #10 next?").
- **Saving Changes**: Always remind the user to "Commit" and "Sync" their changes in the Source Control tab to make them live on **compagnia.org**.

## 🚀 Technical Context
- **Hosting**: GitHub Pages via GitHub Actions (deploys from `main`).
- **Clean URLs**: Uses `BrowserRouter` with a `404.html` redirect hack.
- **Data**: Events and Musicians are managed via JSON files in `src/data/`.
- **Backend**: Google Apps Script handles the contact form (linked to Google Sheets).

## 🛠️ Coding Values & Principles

- **Consistency is King**: Always ensure styles, layouts, and behaviors are uniform across the entire site.
- **Best Practices First**: Adhere strictly to modern web development standards (accessibility, semantic HTML, mobile-first design).
- **Proactive Warnings**: If a requested change or feature deviates from best practices or project consistency, **alert the user** before implementing it.
- **Tactile Feedback**: Ensure interactive elements provide clear feedback (e.g., active states for buttons) to support touch-screen users on iPad.
- **Robustness**: Build for longevity with clean data handling, spam prevention, and graceful fallbacks for older browsers.
