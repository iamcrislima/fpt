import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import './BottomSheetSelect.css'

/**
 * BottomSheetSelect — substitui <select> nativo no mobile por bottom sheet.
 *
 * Props:
 *   value        — valor atual (string)
 *   onChange     — fn(newValue) — recebe o valor direto (não o event)
 *   options      — [{ value, label }] ou string[] (usa value===label)
 *   placeholder  — texto quando nenhuma opção está selecionada
 *   title        — título exibido no header do sheet
 *   searchable   — boolean (true quando options.length > 10)
 *   className    — classe extra para o trigger
 *   nativeClassName — classe original do <select> nativo (mantida intacta no DOM)
 *
 * No desktop (> 767px) o componente renderiza um <select> normal idêntico ao nativo.
 * No mobile o <select> fica hidden e o bottom sheet é ativado.
 */
function isMobile() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(max-width: 767px)').matches
}

export default function BottomSheetSelect({
  value,
  onChange,
  options = [],
  placeholder = 'Selecione...',
  title = 'Selecione',
  searchable = false,
  className = '',
  nativeClassName = '',
}) {
  const [mobile, setMobile]   = useState(isMobile)
  const [open, setOpen]       = useState(false)
  const [pending, setPending] = useState(value)
  const [query, setQuery]     = useState('')

  const panelRef    = useRef(null)
  const searchRef   = useRef(null)
  const touchStartY = useRef(0)

  // Detecta resize para alternar entre mobile/desktop
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const handler = (e) => setMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Normaliza options para [{ value, label }]
  const normalizedOptions = options.map(opt =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  )

  const selectedLabel = normalizedOptions.find(o => o.value === value)?.label
    ?? normalizedOptions.find(o => o.label === value)?.label

  const filtered = query
    ? normalizedOptions.filter(o => o.label.toLowerCase().includes(query.toLowerCase()))
    : normalizedOptions

  function openSheet() {
    setPending(value)
    setQuery('')
    setOpen(true)
    // Foca o campo de busca após o sheet abrir
    if (searchable) setTimeout(() => searchRef.current?.focus(), 350)
  }

  function closeSheet() {
    setOpen(false)
    setQuery('')
  }

  function applySelection() {
    onChange(pending)
    closeSheet()
  }

  function selectOption(val) {
    setPending(val)
    // Auto-fecha e aplica se não tiver botão Aplicar (comportamento instantâneo)
    onChange(val)
    setTimeout(closeSheet, 120)
  }

  // Swipe down para fechar
  const handleTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY
  }, [])

  const handleTouchEnd = useCallback((e) => {
    const delta = e.changedTouches[0].clientY - touchStartY.current
    if (delta > 80) closeSheet()
  }, [])

  // Fecha com ESC
  useEffect(() => {
    if (!open) return
    function onKey(e) { if (e.key === 'Escape') closeSheet() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  // Bloqueia scroll do body quando aberto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  // ── Desktop: renderiza <select> nativo normal ────────────────
  if (!mobile) {
    return (
      <select
        className={nativeClassName || className}
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {normalizedOptions.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    )
  }

  // ── Mobile: trigger + bottom sheet via portal ────────────────
  return (
    <>
      {/* Trigger */}
      <button
        type="button"
        className={`bss-trigger ${className}`}
        onClick={openSheet}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={`bss-trigger__text${!selectedLabel ? ' bss-trigger__text--placeholder' : ''}`}>
          {selectedLabel || placeholder}
        </span>
        <i className="fa-solid fa-chevron-down bss-trigger__chevron" aria-hidden="true" />
      </button>

      {/* Bottom sheet via portal */}
      {createPortal(
        <>
          {/* Backdrop */}
          <div
            className={`bss-backdrop${open ? ' bss-backdrop--visible' : ''}`}
            style={{ pointerEvents: open ? 'auto' : 'none' }}
            onClick={closeSheet}
            aria-hidden="true"
          />

          {/* Sheet panel */}
          <div
            ref={panelRef}
            className={`bss-panel${open ? ' bss-panel--open' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Handle */}
            <div className="bss-handle" aria-hidden="true" />

            {/* Header */}
            <div className="bss-header">
              <h3 className="bss-header__title">{title}</h3>
              <button
                type="button"
                className="bss-header__close"
                onClick={closeSheet}
                aria-label="Fechar"
              >
                <i className="fa-solid fa-xmark" aria-hidden="true" />
              </button>
            </div>

            {/* Search */}
            {searchable && (
              <div className="bss-search-wrap">
                <i className="fa-solid fa-magnifying-glass bss-search-icon" aria-hidden="true" />
                <input
                  ref={searchRef}
                  type="search"
                  className="bss-search"
                  placeholder="Buscar..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  autoComplete="off"
                />
              </div>
            )}

            {/* Options list */}
            <div className="bss-list" role="listbox" aria-label={title}>
              {filtered.length === 0 && (
                <p className="bss-empty">Nenhum resultado encontrado</p>
              )}
              {filtered.map(opt => {
                const selected = opt.value === value || opt.label === value
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    className={`bss-option${selected ? ' bss-option--selected' : ''}`}
                    onClick={() => selectOption(opt.value)}
                  >
                    <span>{opt.label}</span>
                    {selected
                      ? <i className="fa-solid fa-check bss-option__check" aria-hidden="true" />
                      : <span className="bss-option__radio" aria-hidden="true" />
                    }
                  </button>
                )
              })}
            </div>

            {/* Footer — Aplicar (útil quando searchable) */}
            {searchable && (
              <div className="bss-footer">
                <button type="button" className="bss-apply-btn" onClick={applySelection}>
                  Aplicar
                </button>
              </div>
            )}
          </div>
        </>,
        document.body
      )}
    </>
  )
}
