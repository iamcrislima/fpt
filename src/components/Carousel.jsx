import { useState, useEffect, useRef, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

/**
 * Generic Carousel component.
 *
 * Props:
 *   children       — slide elements (each becomes one slide)
 *   autoPlayMs     — autoplay interval in ms (default 5000). Pass 0 to disable.
 *   ariaLabel      — accessible name for the carousel region
 *   onActiveChange — (index: number) => void — fires on every slide change
 *   className      — additional class names for the root element
 */
export default function Carousel({
  children,
  autoPlayMs = 5000,
  ariaLabel,
  onActiveChange,
  className = '',
}) {
  const slides = Array.isArray(children) ? children : [children]
  const count  = slides.length

  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  // Stable refs — allow callbacks with no deps to always read current values
  const activeRef = useRef(0)
  const countRef  = useRef(count)
  const onChangeRef = useRef(onActiveChange)

  activeRef.current  = active
  countRef.current   = count
  onChangeRef.current = onActiveChange

  // go(i) — navigate to a specific index (wraps around)
  const go = useCallback((i) => {
    const next = ((i % countRef.current) + countRef.current) % countRef.current
    setActive(next)
    onChangeRef.current?.(next)
  }, [])

  // advance / retreat — stable references, read active via ref
  const advance = useCallback(() => go(activeRef.current + 1), [go])
  const retreat = useCallback(() => go(activeRef.current - 1), [go])

  // Autoplay
  useEffect(() => {
    if (paused || count <= 1 || !autoPlayMs) return
    const id = setInterval(advance, autoPlayMs)
    return () => clearInterval(id)
  }, [paused, count, autoPlayMs, advance])

  // Swipe (horizontal only)
  const touchStart = useRef({ x: 0, y: 0 })

  function handleTouchStart(e) {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }

  function handleTouchEnd(e) {
    const dx = touchStart.current.x - e.changedTouches[0].clientX
    const dy = touchStart.current.y - e.changedTouches[0].clientY
    if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy)) {
      dx > 0 ? advance() : retreat()
    }
  }

  // Keyboard
  function handleKeyDown(e) {
    if (e.key === 'ArrowLeft')  { e.preventDefault(); retreat() }
    if (e.key === 'ArrowRight') { e.preventDefault(); advance() }
  }

  return (
    <div
      className={`fa-carousel${className ? ` ${className}` : ''}`}
      role="region"
      aria-label={ariaLabel}
      aria-roledescription="carrossel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* ── Slides viewport ────────────────────────────── */}
      <div className="fa-carousel__viewport">
        <div
          className="fa-carousel__track"
          style={{ transform: `translateX(-${active * 100}%)` }}
          aria-live="polite"
          aria-atomic="false"
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="fa-carousel__slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${count}`}
              aria-hidden={i !== active || undefined}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {count > 1 && (
        <>
          {/* ── Prev arrow ─────────────────────────────── */}
          <button
            className="fa-carousel__arrow fa-carousel__arrow--prev"
            onClick={(e) => { e.stopPropagation(); retreat() }}
            aria-label="Slide anterior"
            tabIndex={-1}
          >
            <FontAwesomeIcon icon={faChevronLeft} aria-hidden="true" />
          </button>

          {/* ── Next arrow ─────────────────────────────── */}
          <button
            className="fa-carousel__arrow fa-carousel__arrow--next"
            onClick={(e) => { e.stopPropagation(); advance() }}
            aria-label="Próximo slide"
            tabIndex={-1}
          >
            <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" />
          </button>

          {/* ── Dot indicators ─────────────────────────── */}
          <div className="fa-carousel__dots" role="tablist" aria-label="Slides">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`fa-carousel__dot${i === active ? ' fa-carousel__dot--active' : ''}`}
                onClick={(e) => { e.stopPropagation(); go(i) }}
                role="tab"
                aria-selected={i === active}
                aria-label={`Slide ${i + 1}`}
                tabIndex={i === active ? 0 : -1}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
