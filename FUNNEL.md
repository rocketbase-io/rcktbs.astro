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
- [ ] **Lead-Export** (z. B. CSV aus den Blobs) oder Weiterleitung ins CRM/Slack,
  sobald das Volumen es rechtfertigt
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
