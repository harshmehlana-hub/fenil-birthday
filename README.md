# For Fenil ♡ — Interactive Birthday Website

A mobile-first, animated birthday experience made for Fenil. Built with React + Vite, with no backend and no environment variables.

## The experience

- A warm welcome screen with floating hearts and animated artwork
- A three-present mini quest to unlock the birthday page
- Interactive birthday candles and confetti
- Four tap-to-reveal appreciation cards, including **My Kitkat** and **My Bataku**
- An envelope animation and heartfelt confession letter
- A final birthday wish and replay option
- Responsive layout, keyboard-friendly buttons, and reduced-motion support

## Run locally

Install Node.js 18+ first, then:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

Create a production build with:

```bash
npm run build
npm run preview
```

## Personalize it

- Edit the birthday text and confession in `src/main.jsx`.
- Change colors, layout, and animations in `src/styles.css`.
- Wonderwall playback is wired to `/wonderwall.mp3`. To enable it, add your permitted-to-share audio file at `public/wonderwall.mp3` (create the `public` folder if needed). The welcome button attempts to start the song when she opens the surprise; the top-right control can pause or resume it. Browsers may block playback if it is not triggered by a user gesture.
- Add your own photos or shared memories if you want to make it more personal. Avoid putting private photos or details in a public repository unless you're comfortable with anyone being able to access them.

## Deploy to Vercel

1. Import this GitHub repository into Vercel.
2. Framework preset: **Vite** (usually detected automatically).
3. Build command: `npm run build`
4. Output directory: `dist`
5. Click **Deploy**. Future pushes to the connected branch deploy automatically.

## Deploy to Cloudflare Pages

1. In Cloudflare, open **Workers & Pages** → **Create** → **Pages** → connect to Git.
2. Select this repository.
3. Build command: `npm run build`
4. Build output directory: `dist`
5. Save and deploy. No server-side functions or environment variables are required.

## Before sharing

Open the deployed URL on your phone and test every step. The confession is direct but explicitly says Fenil doesn't owe you an answer—keep that only if it reflects how you genuinely feel. Make the birthday about her comfort, too. ♡