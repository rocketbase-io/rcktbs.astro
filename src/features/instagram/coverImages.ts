import type { ImageMetadata } from 'astro';
import angebotAbholen from '@/assets/instagram/angebot-abholen.jpg';
import angebotFunkstille from '@/assets/instagram/angebot-funkstille.jpg';
import angebotFunkstilleAnimiert from '@/assets/instagram/angebot-funkstille-animiert.jpg';
import dreiStellen from '@/assets/instagram/drei-stellen.jpg';
import kundenAusDemKopf from '@/assets/instagram/kunden-aus-dem-kopf.jpg';
import quartalsberichtExcel from '@/assets/instagram/quartalsbericht-excel.jpg';
import serverSchrankRechenzentrum from '@/assets/instagram/server-schrank-rechenzentrum.jpg';
import softwareCheckKarussell from '@/assets/instagram/software-check-karussell.jpg';
import softwareCheckReel from '@/assets/instagram/software-check-reel.jpg';
import toolsNullUeberblick from '@/assets/instagram/tools-null-ueberblick.jpg';
import zahlenCockpit from '@/assets/instagram/zahlen-cockpit.jpg';

/**
 * Kachelbilder je Instagram-Post, adressiert über den Shortcode aus der
 * Post-URL (`code` in src/data/instagram.ts).
 *
 * Statische Imports statt `import.meta.glob`, damit Astro sie optimieren kann
 * — dasselbe Muster wie `src/features/references/caseImages.ts`.
 *
 * Die Map darf Lücken haben: Wofür hier nichts steht, zeigt die Bio-Seite das
 * Hero-Bild des verlinkten Blogbeitrags. Gedacht ist das für ältere Posts —
 * die Seite wird fast nur für den jeweils aktuellen benutzt, und dafür lohnt
 * der Wiedererkennungswert der echten Kachel.
 *
 * **Format: 4:5 (1080×1350), wie Instagram es ausliefert.** Die Kacheln auf
 * der Seite sind auf dieses Verhältnis gesetzt. Ein quadratischer Zuschnitt
 * würde oben die Marke und unten den Screenshot anschneiden — deshalb bleibt
 * das Bild so, wie es gepostet wurde. Kommt später ein 1:1-Post dazu, ist das
 * kein Problem (`object-cover` fängt es ab), aber ein einheitliches Verhältnis
 * hält das zweispaltige Raster ruhig.
 *
 * Neues Cover hinzufügen:
 *   1. Bild aus dem Post nach `src/assets/instagram/` legen (4:5, 1080×1350),
 *      benannt nach dem Thema — nicht nach dem Shortcode, der ist im
 *      Dateisystem nicht lesbar.
 *   2. Hier importieren und unter dem Shortcode eintragen.
 */
export const instagramCovers: Record<string, ImageMetadata> = {
  // Vorläufige Schlüssel, bis die echten Shortcodes eingetragen sind, siehe src/data/instagram.ts.
  'reel-software-check-darunter': softwareCheckReel,
  'karussell-4-fragen-die-eure-ki-nie-stellt': softwareCheckKarussell,
  // Reels: das Cover (9:16) auf 4:5 beschnitten.
  DfP5hmmE03W: zahlenCockpit,
  De9tkoGDmeA: dreiStellen,
  DeZmaVVkcys: angebotAbholen,
  DePRIrgEn07: angebotFunkstilleAnimiert,
  DeL4TpPjK8_: serverSchrankRechenzentrum,
  DeJhS4FiDWX: kundenAusDemKopf,
  DeHmBMTCsC4: toolsNullUeberblick,
  DeAjstnCqns: quartalsberichtExcel,
  DdJekmNFtUk: angebotFunkstille,
};
