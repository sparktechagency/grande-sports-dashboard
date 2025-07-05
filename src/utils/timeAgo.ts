// utils/timeAgo.ts  ───────────────────────────────────────────────────────────
type Unit = 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year'

/** RFC 5646 English, short units: s, min, hr, d, mo, yr  */
const rtf = new Intl.RelativeTimeFormat('en', {
  numeric: 'auto',
  style: 'narrow',
})

/** exact lengths for each unit – last entry (“second”) is the fallback        */
const STEPS: [Unit, number][] = [
  ['year', 1000 * 60 * 60 * 24 * 365],
  ['month', 1000 * 60 * 60 * 24 * 30],
  ['day', 1000 * 60 * 60 * 24],
  ['hour', 1000 * 60 * 60],
  ['minute', 1000 * 60],
  ['second', 1000],
]

export function timeAgo(date: string | number | Date): string {
  const then = +new Date(date)                // ↳ timestamp (ms)
  const diff = Date.now() - then              // positive = past
  for (const [unit, ms] of STEPS) {
    if (Math.abs(diff) >= ms || unit === 'second') {
      const value = Math.round(diff / ms)
      return rtf.format(-value, unit)         // negative → “… ago”
    }
  }
  return ''                                   // should never be hit
}
