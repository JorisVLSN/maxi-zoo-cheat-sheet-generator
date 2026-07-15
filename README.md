# Maxi Zoo Cheat Sheet Generator

Geavanceerde Next.js-app voor het omzetten van Belgische Maxi Zoo folder-PDF's naar een bewerkbare A4-cheat-sheet.

## Functies
- PDF-upload en tekstextractie in de browser
- Gemini AI-parser met fallback
- Maxi Zoo-specifieke categorieën
- Handmatig corrigeren, toevoegen en verwijderen
- A4-preview
- Export naar PNG, PDF, Excel en PowerPoint
- Vercel-ready, geen database nodig

## Lokaal
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Vercel
1. Importeer de GitHub-repository in Vercel.
2. Voeg `GEMINI_API_KEY` toe bij Environment Variables.
3. Deploy.

De app werkt zonder sleutel met een eenvoudige fallback, maar de beste folderherkenning vereist Gemini.
