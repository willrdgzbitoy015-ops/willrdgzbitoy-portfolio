/*
  The responsive photos made by `npm run images` (scripts/optimize-images.mjs).
  `width` and `height` are the original size: the browser uses them to reserve
  the right space before the photo loads, so nothing jumps.
*/
export interface ResponsiveImage {
  /** Files are /images/<name>-<width>.webp */
  name: string
  widths: readonly number[]
  width: number
  height: number
}

export const HERO_IMAGE: ResponsiveImage = {
  name: 'hero',
  widths: [480, 640, 800, 1195],
  width: 1195,
  height: 1364,
}

export const ABOUT_IMAGE: ResponsiveImage = {
  name: 'about',
  widths: [480, 800],
  width: 844,
  height: 1125,
}

export const CONTACT_IMAGE: ResponsiveImage = {
  name: 'contact',
  widths: [480, 800, 1148],
  width: 1148,
  height: 1500,
}

/** "/images/hero-480.webp 480w, /images/hero-800.webp 800w, ..." */
export function srcSet(image: ResponsiveImage): string {
  return image.widths.map((w) => `/images/${image.name}-${w}.webp ${w}w`).join(', ')
}

/** The fallback `src`: the middle size. */
export function defaultSrc(image: ResponsiveImage): string {
  const middle = image.widths[Math.floor(image.widths.length / 2)]
  return `/images/${image.name}-${middle}.webp`
}
