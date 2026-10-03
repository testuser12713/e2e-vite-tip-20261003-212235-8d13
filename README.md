# Trinkgeld-Rechner

Eine kleine Single-Page-Web-App zum Berechnen von Trinkgeld. Nutzerinnen und Nutzer geben den Rechnungsbetrag, den gewünschten Trinkgeld-Prozentsatz und die Personenzahl ein; die App zeigt live das Trinkgeld, den Gesamtbetrag und den Betrag pro Person – auf ganze Cent gerundet. Bei ungültigen Eingaben erscheint statt des Ergebnisses eine verständliche Fehlermeldung. Die Rechenlogik liegt in einer reinen, seiteneffektfreien Funktion und ist mit Vitest-Unit-Tests abgesichert. Es gibt genau eine Seite mit einem schlichten Karten-Layout und einem einzigen Akzentton.

## Tech-Stack

- **Sprache:** TypeScript
- **Framework:** React 18
- **Build:** Vite
- **Test:** Vitest
- **Paketmanager:** npm
- **Styling:** schlichtes CSS (Design-Tokens aus `DESIGN.md`)

## Installation

Voraussetzung: Node.js 20.19+ (oder 22.12+) und npm.

```bash
npm ci
```

## Entwicklung starten

```bash
npm run dev
```

Vite startet einen Entwicklungsserver und gibt die lokale Adresse (standardmäßig `http://localhost:5173`) in der Konsole aus. Die Seite wird bei jeder Änderung automatisch neu geladen.

## Produktions-Build erstellen und ansehen

```bash
npm run build
npm run preview
```

`npm run build` erzeugt das statische Ergebnis im Ordner `dist/`. `npm run preview` serviert diesen Build lokal (standardmäßig `http://localhost:4173`).

## Tests ausführen

```bash
npm test
```

Führt die Vitest-Unit-Tests einmalig aus (`vitest run`).

## Wie man die App benutzt

1. Im Feld **Betrag** den Rechnungsbetrag in Euro eingeben (z. B. `42,50`).
2. Im Feld **Trinkgeld-Prozent** den gewünschten Prozentsatz eingeben (z. B. `10`).
3. Im Feld **Personenzahl** angeben, auf wie viele Personen aufgeteilt wird (mindestens `1`).
4. Das Ergebnis aktualisiert sich sofort bei jeder Eingabe – ohne Absenden. Angezeigt werden Trinkgeld, Gesamtbetrag und Betrag pro Person, jeweils als Euro-Betrag mit zwei Nachkommastellen.
5. Bei leerem, nicht numerischem oder negativem Betrag/Prozent oder einer Personenzahl kleiner als 1 erscheint eine Fehlermeldung und es wird kein Ergebnis angezeigt.

Alle Bedienelemente haben eine Touch-Zielhöhe von mindestens 44px und einen sichtbaren Fokusring; die Seite funktioniert auf Desktop und mobil (Breakpoint 640px).

## Funktionen

- Live-Berechnung von Trinkgeld, Gesamtbetrag und Betrag pro Person bei jeder Eingabeänderung
- Rundung auf ganze Cent und Anzeige im deutschen Euro-Format (z. B. `12,34 €`)
- Eingabevalidierung mit verständlicher deutscher Fehlermeldung statt eines Ergebnisses
- Reine, seiteneffektfreie Berechnungsfunktion (`src/lib/tip.ts`)
- Responsives Ein-Seiten-Layout mit Karten-Design nach `DESIGN.md`
