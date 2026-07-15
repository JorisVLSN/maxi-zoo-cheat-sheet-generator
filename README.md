# Maxi Zoo Cheat Sheet Generator v1.2.0

Next.js/Vercel-app die een Belgische Maxi Zoo-folder omzet naar een bewerkbare cheat sheet.

## Nieuwe visuele extractie

- Rendert iedere PDF-pagina lokaal in de browser.
- Koppelt promoties via `sourcePage` en tekstankers aan hun folderpagina.
- Maakt automatisch een uitsnede uit het relevante paginavak.
- Neemt de uitsnede mee in PNG, PDF en PowerPoint.
- Laat per promotie een betere eigen productfoto uploaden of de foto verwijderen.
- De geavanceerde modus kan productfoto's en automatische extractie aan/uit zetten.

> De automatische uitsnede is bewust controleerbaar: complexe folderlayouts kunnen soms meer dan één product in een vak bevatten. Gebruik dan **Foto vervangen**.

## Installeren

```bash
npm install
cp .env.example .env.local
npm run dev
```

Voor AI-parsing:

```env
GEMINI_API_KEY=...
```

## Vercel

Importeer de GitHub-repository in Vercel en voeg `GEMINI_API_KEY` toe bij Environment Variables.
