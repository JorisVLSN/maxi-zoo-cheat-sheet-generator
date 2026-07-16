# Maxi Zoo Cheat Sheet Generator

Productieklare Next.js-tool voor **Belgische Maxi Zoo-promotiefolders**. De volledige gebruikersinterface is Nederlandstalig en duidelijk gemarkeerd als interne werkhulp.

## Mogelijkheden

- PDF slepen of kiezen, alle pagina's lokaal renderen en tekst automatisch uitlezen
- Promoties classificeren in de negen Maxi Zoo-categorieën
- Productbeelden automatisch uit bronpagina's halen, uitsnedes corrigeren en beelden vervangen
- Alle gevraagde promotievelden bewerken, filteren, controleren en ontdubbelen
- Onvolledige gegevens, sterke deals en nieuwe, gewijzigde of verlopen promoties aanduiden
- Geavanceerde instellingen die het echte A4-resultaat aanpassen
- Folders lokaal bewaren in IndexedDB en vergelijken met een vorige folder
- Responsief A4- en smartphonevoorbeeld
- Export naar hoge-resolutie PNG, print-PDF, PowerPoint (PptxGenJS) en Excel (ExcelJS)
- Optionele Gemini-verrijking via een beveiligde serverroute; basisextractie blijft gratis en lokaal werken

De applicatie gebruikt geen Maxi Zoo-logo of ander aangeleverd merkmateriaal.

## Lokaal starten

Node.js 20 LTS is vereist.

```bash
npm install
copy .env.example .env.local
npm run dev
```

Een Gemini-sleutel is optioneel. Zet `GEMINI_API_KEY` uitsluitend in `.env.local` of in de server-side Vercel Environment Variables. De sleutel wordt nooit naar de browser gestuurd.

## Kwaliteitscontrole

```bash
npm run lint
npm test
npm run build
```

## Vercel

Importeer de GitHub-repository in Vercel. De `engines`-instelling en `.nvmrc` leggen Node.js 20 vast. Zonder Gemini-configuratie blijft de lokale parser volledig bruikbaar.

## Privacy

PDF-pagina's, bewerkingen en folderhistoriek blijven standaard in de browser. Alleen wanneer Gemini expliciet op de server is geconfigureerd, wordt geëxtraheerde tekst via de serverroute naar Gemini verstuurd.
