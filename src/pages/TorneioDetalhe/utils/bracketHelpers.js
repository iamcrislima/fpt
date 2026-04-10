/**
 * Helpers for bracket/tournament display
 * Extracted from TorneioDetalhe.jsx for reusability.
 */

// Avatar color palette
const AV_COLORS = ['#f59e0b', '#3b82f6', '#8b5cf6', '#10b981', '#ef4444', '#f97316', '#06b6d4', '#ec4899']

/**
 * Deterministic background color from player name.
 * Uses a simple hash to pick from the palette.
 */
export function avBg(name) {
  let h = 0
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) & 0xFFFF
  return AV_COLORS[h % AV_COLORS.length]
}

/**
 * Generate 2-letter initials from a full name.
 * e.g. "Roberto Koch Junior" → "RJ", "Ana" → "AN"
 */
export function initials(name) {
  const w = name.trim().split(/\s+/)
  return (w[0][0] + (w.length > 1 ? w[w.length - 1][0] : (w[0][1] || ''))).toUpperCase()
}

/**
 * Abbreviate name for compact bracket display.
 * e.g. "Roberto Koch Junior" → "Roberto J."
 */
export function abbrevName(name) {
  if (!name || name === '—') return '—'
  const parts = name.trim().split(/\s+/)
  if (parts.length <= 1) return name
  return parts[0] + ' ' + parts[parts.length - 1][0] + '.'
}
