import type { ImageMetadata } from 'astro';
import angebotFunkstille from '@/assets/instagram/angebot-funkstille.jpg';

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
  DdJekmNFtUk: angebotFunkstille,
};
