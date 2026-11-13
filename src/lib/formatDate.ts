import type { Lang } from '../i18n/LanguageContext'

// Browsers have no built-in Cebuano month names, so we keep our own list.
const CEB_MONTHS = [
  'Enero',
  'Pebrero',
  'Marso',
  'Abril',
  'Mayo',
  'Hunyo',
  'Hulyo',
  'Agosto',
  'Septiyembre',
  'Oktubre',
  'Nobyembre',
  'Disyembre',
]

const EN_MONTH_YEAR = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
  timeZone: 'Asia/Manila',
})

/** "November 2026" in English, "Nobyembre 2026" in Bisaya (Asia/Manila time). */
export function formatMonthYear(date: Date, lang: Lang): string {
  if (lang === 'en') return EN_MONTH_YEAR.format(date)
  const parts = new Intl.DateTimeFormat('en-US', {
    month: 'numeric',
    year: 'numeric',
    timeZone: 'Asia/Manila',
  }).formatToParts(date)
  const month = Number(parts.find((p) => p.type === 'month')?.value ?? 1)
  const year = parts.find((p) => p.type === 'year')?.value ?? ''
  return `${CEB_MONTHS[month - 1]} ${year}`
}
