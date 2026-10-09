# Funnel-Seiten — Status & offene To-dos

Anzeigen-Landingpages mit Quiz + Lead-Erfassung unter `/f/[slug]`.
Erste Seite: **`/f/software-analyse`**

Varianten (Stand August 2026):

| Slug | Angle | Frage 1 |
| --- | --- | --- |
| `/f/software-analyse` | Wo verliert die Softwarelandschaft Geld? | `landscapeQuestion` |
| `/f/live-zahlen` | Reporting / Live-Zahlen | `landscapeQuestion` |
| `/f/zeitfresser` | Zeitfresser / Entlastung | `timeQuestion` |
| `/f/eigene-software` | Lizenz-Revival / eigene Software | `softwareFitQuestion` |
| `/f/code-check` | Code-Check für KI-gebaute oder übernommene Anwendungen | `builderQuestion` |

## Architektur (fertig)

| Baustein | Datei |
| --- | --- |
| Inhalte & Quiz-Fragen | `src/data/funnels.ts` |
| Layout (ohne Navigation, noindex) | `src/layouts/FunnelLayout.astro` |
| Quiz-Komponente (React-Island) | `src/components/funnel/FunnelQuiz.tsx` |
| Seiten-Route | `src/pages/f/[slug].astro` |
| Lead-Endpoint (`/api/funnel-lead`) | `netlify/functions/funnel-lead.ts` |

Jeder Lead wird **per E-Mail** (Plunk) verschickt **und** in **Netlify Blobs**
(Store `funnel-leads`, nach Tag gruppiert) gespeichert — inkl. Quiz-Antworten,
UTM-Parametern, Click-IDs (`fbclid`, `gclid`, …), `_fbp`/`_fbc`-Cookies,
Landing-URL, Referrer, Geo (Stadt/Land) und User-Agent. IP wird bewusst nicht
gespeichert.

Leads einsehen: Netlify-Dashboard → Blobs, oder `netlify blobs:list funnel-leads`.

### Zustellung ins CRM

Jeder Lead geht zusätzlich an **rcktbs-sales** (`POST /api/public/funnel-events`) und landet
dort im Rückmeldungs-Board (`/funnel-submissions`) — mit Antworten, Kontaktdaten und Herkunft.

Die Reihenfolge ist der ganze Punkt:

1. **Blob schreiben.** Als einziger Schritt fehlerkritisch: Scheitert er, antwortet die
   Function 500 und der Besucher kann erneut absenden. Vorher wurde der Fehler nur geloggt und
   die Antwort blieb `success: true` — ein bezahlter Lead war weg, ohne Spur.
2. **Zustellen**, best-effort. `201` heißt angekommen, dann wird `deliveredAt` gestempelt.
3. **Nachliefern.** `funnel-redeliver.ts` läuft alle zehn Minuten über die Blobs mit
   `deliveredAt: null` (höchstens 50 je Lauf, höchstens 14 Tage zurück). Ein Redeploy des
   Backends oder ein Ausfall kostet damit nichts, er verzögert nur.

Wiederholen ist gefahrlos: Die Blob-Id reist als `submissionId` mit, und das Backend hält sie
`UNIQUE` — weder eine zweite Abgabe noch ein zweites Ereignis entsteht.

**Erst das Backend deployen, dann die Website.** Als angekommen gilt nur ein `201`. Ein `204`
kommt von einem Backend-Stand vor dem Rückmeldungs-Board: Der behandelt die Abgabe als nacktes
Ereignis und verwirft sie ohne `?r=` sogar ganz. Deshalb zählt `204` hier als Fehlschlag — die
Leads sammeln sich im Blob und werden nachgeliefert, sobald das Backend steht. Andersherum
wären sie weg, mit `deliveredAt` gestempelt und für den Nachlieferer unsichtbar.

Scheitert die Zustellung, trägt die Plunk-Mail den Hinweis „Noch nicht im CRM"; die Daten
stehen dann wie bisher darunter.

**Env (Netlify):** `PUBLIC_SALES_API_URL` — dieselbe Variable, die der Browser-Pfad
(`funnelTracking.ts`) schon nutzt, also nichts Neues einzutragen. Ist keine gesetzt, bleibt der
Lead im Blob liegen und wird nur geloggt. `SALES_API_URL` überschreibt sie, falls die
Zustellung einmal auf einen anderen Host zeigen soll; `SALES_API_TOKEN` setzt optional den
`X-Api-Token`-Header.

Der Vertrag steht in `rcktbs-sales`: `docs/vertrieb/quiz-funnel.md`.

## Offene To-dos

### Vor dem Kampagnenstart

- [ ] **Meta Pixel via GTM einbinden** (`PUBLIC_GTM_ID` ist im Boilerplate vorgesehen)
  - Trigger auf dataLayer-Event `funnel_lead` → Meta-Standardevent **„Lead"**
    (zwingend, damit Meta auf Leads optimieren kann)
  - Optional: Trigger auf `funnel_quiz_start` → Custom Event für die
    Retargeting-Audience „Quiz gestartet, aber kein Lead"
  - Pixel muss hinter dem bestehenden Consent-Banner laufen
- [ ] **URL-Parameter im Meta-Anzeigenmanager** hinterlegen (einmalig, pro Anzeige automatisch befüllt):
  ```
  utm_source=meta&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}
  ```
- [ ] **Datenschutzerklärung ergänzen**: Absatz zur Lead-Verarbeitung
  (Zweck: Bearbeitung der Anfrage; Speicherung bei Netlify; Plunk als Mail-Versand)
- [ ] **Env-Variablen auf Netlify prüfen**: `PLUNK_SECRET_KEY` und
  `CONTACT_NOTIFICATION_EMAIL` müssen gesetzt sein (werden auch vom
  Kontaktformular genutzt)
- [ ] **End-to-End-Test** mit `netlify dev` (nicht `pnpm dev` — nur so existiert
  `/api/funnel-lead` lokal): Quiz durchspielen, Mail-Empfang und Blob-Eintrag prüfen
- [ ] Entscheiden: **Telefon Pflichtfeld?** Aktuell optional (weniger Reibung).
  Umstellen in `FunnelQuiz.tsx` (Kontakt-Step, `required` am Telefon-Input)

### Nach dem Kampagnenstart (Ausbau)

- [ ] **Meta Conversions API** server-seitig aus `funnel-lead.ts` feuern
  (umgeht iOS-Tracking-Verluste; Datenbasis `fbclid`/`_fbp`/`_fbc`/E-Mail liegt
  bereits bei jedem Lead)
- [x] **Weiterleitung ins CRM** (2026-10-09): Leads gehen an rcktbs-sales, mit
  Blob als haltbarer Warteschlange und Nachlieferer — siehe „Zustellung ins CRM" oben
- [ ] **KI-Klassifizierung der Freitext-Antworten** („Etwas anderes"-Option):
  asynchron server-seitig in der Function nachrüsten, falls der Freitext-Anteil
  relevant wird — nicht im Klickpfad (Latenz/Conversion)
- [ ] **Weitere Anzeigen-Varianten** anlegen: Eintrag in `src/data/funnels.ts`
  kopieren, Slug + Hero + Details anpassen; Quiz-Fragen können über
  `analyseQuestions` geteilt werden. Seite entsteht automatisch unter `/f/<slug>`
- [ ] Optional: **eigenes OG-Bild** pro Funnel-Seite (aktuell Site-Default;
  für Anzeigen irrelevant, nur für geteilte Links)

## Tracking-Events (dataLayer → GTM)

| Event | Wann | Payload |
| --- | --- | --- |
| `funnel_quiz_start` | erste Antwort angeklickt | `funnel` |
| `funnel_step_complete` | Frage beantwortet | `funnel`, `step`, `question`, `answer` |
| `funnel_lead` | Lead erfolgreich abgesendet | `funnel`, `problem`, `impact` |

Die Antwort-IDs (`problem`/`impact`, z. B. `altsystem`, `gt250`) eignen sich für
Audiences pro Problem-Kategorie und für wertbasierte Optimierung.

Seit Oktober 2026 gehen alle Quiz-Events zusätzlich an **Plausible** (Custom
Events mit denselben Namen und Props). Ohne GTM wären sie sonst unsichtbar.
Dazugekommen, nur für die Abbruch-Analyse:

| Event | Wann | Props |
| --- | --- | --- |
| `funnel_schritt_erreicht` | Frage 2..n angezeigt (einmal pro Schritt) | `funnel`, `step`, `question` |
| `funnel_kontakt_erreicht` | Kontaktschritt angezeigt | `funnel`, `step` |
| `funnel_fehler` | Absenden gescheitert | `funnel`, `art`: `validierung` \| `netz` |

Abbruch liest sich in Plausible als Differenz der eindeutigen Besucher:
Pageview → `funnel_quiz_start` → `funnel_schritt_erreicht` (step=2, 3, …) →
`funnel_kontakt_erreicht` → `funnel_lead`. Verweildauer pro Seite liefert
Plausible selbst (Engagement-Tracking der aktuellen Script-Version), ein
eigenes Ereignis dafür wäre doppelt.

## Brief und persönliche Mail: Ereignisse pro Kennung (/b/ und /f/-Türen)

Die `?r=`-Kennung ist kanalunabhängig: Sie hängt am QR-Code des Briefs und am
Link in der persönlichen Mail, egal ob der auf `/b/angebot` oder auf eine der
drei Türen (`/f/angebote`, `/f/einsatz`, `/f/zahlen`) zeigt. Für Mail-Links:
`https://rocketbase.io/f/angebote/?r=<kennung>`.

Jedes Ereignis geht an zwei Stellen: **Plausible** (immer, anonym, mit
`funnel` als Property — Trichter über alle Empfänger) und das **Sales-Backend**
`/api/public/funnel-events` (nur mit Kennung — Sicht pro Firma).
Logik in `src/lib/funnelTracking.ts` und `src/lib/engagement.ts`, eingehängt
über die Prop `funnel` des `FunnelLayout` (`brief-<slug>` bzw. `tuer-<slug>`).
Die Seiten brauchen keine Tracking-Attribute: beobachtet werden alle `<video>`,
alle `<section id>` und alle Klicks auf Buttons, Tabs, Links, Regler.
`data-track="name"` an einem Element überschreibt den automatisch gebauten
Namen.

| Event | Wann | Payload |
| --- | --- | --- |
| `page_view` | Seite geladen | `url`, `referrer`, `utm`, `device`, `viewport`, … |
| `video_sichtbar` | Video-Sektion zu 40 % im Viewport | – |
| `video_start` | Play gedrückt | `dauer` (Sekunden gesamt) |
| `video_25` / `_50` / `_75` | Viertelmarken erreicht | `sekunden` |
| `video_ende` | Video zu Ende gesehen | `sekunden` |
| `termin_sichtbar` | Termin-Sektion zu 40 % im Viewport | – |
| `termin_klick` | Fallback-Link geklickt oder Slot im Embed gewählt | `weg`: `link` \| `embed` |
| `termin_gebucht` | Cal.com meldet `bookingSuccessfulV2` (nur Embed) | `weg` |
| `telefon_klick` | `tel:`-Link geklickt | – |
| `weiter_klick` | "Weiter"-Link unter dem Video | `ziel` |
| `sektion_sichtbar` | Sektion mit `id` zu 40 % im Viewport (einmal je Sektion) | `sektion` |
| `interaktion` | Klick auf Button/Tab/Link/Regler (einmal je Element) | `sektion`, `element` |
| `quiz_start` / `quiz_schritt` / `quiz_kontakt` / `quiz_lead` | Quiz auf den Türen, nur Backend (Plausible hat die `funnel_*`-Events) | `step`, `question`, `answer` |
| `verweildauer` | Tab verlassen/versteckt, ab 2 s sichtbarer Zeit | `sekunden`, `scroll` (0–100 %) |

Alle Ereignisse außer `verweildauer` werden pro Seitenaufruf nur einmal
gemeldet (bei `sektion_sichtbar`, `interaktion`, `video_*` und `quiz_schritt`
einmal je Sektion/Element/Video/Schritt); `verweildauer` darf mit höherem Wert erneut kommen, das Backend
nimmt das Maximum.

**Scanner erkennen:** Ein `page_view` ohne `verweildauer` innerhalb weniger
Minuten nach Versand ist ein Mail-Security-Scanner, kein Mensch. Erst
`verweildauer` ≥ 2 s oder ein `video_*`-Ereignis ist eine echte Öffnung.

**Plausible:** Custom Events erscheinen erst im Dashboard, wenn sie dort unter
Site Settings → Goals als Custom Event angelegt sind (gleicher Name). Für die
Trichter-Ansicht: Pageview `/b/angebot/` → `video_start` → `video_50` → `termin_klick`
als Funnel anlegen (Plausible Funnels, Business-Plan).

**Backend:** `rcktbs-sales` muss die neuen Event-Namen annehmen und anzeigen
(bisher nur `page_view` → „Aufruf"). Sinnvolle Darstellung pro Firma: eine
Zeile pro Öffnung mit den erreichten Stufen statt eine Zeile pro Ereignis.
