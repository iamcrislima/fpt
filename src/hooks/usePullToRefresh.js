import { useState, useRef, useCallback } from 'react'

const THRESHOLD = 72   // px necessários para acionar o refresh
const MAX_PULL  = 110  // máximo de arrastar antes de travar

/**
 * usePullToRefresh — pull-to-refresh nativo via touch events.
 *
 * @param {() => Promise<void>} onRefresh — callback async chamado ao soltar
 * @returns {{ pulling, loading, pullRatio, handlers }}
 *
 * Uso:
 *   const { pulling, loading, pullRatio, handlers } = usePullToRefresh(fetchData)
 *   <div {...handlers}>  ← aplique no container scrollável
 *   {(pulling || loading) && <PtrIndicator loading={loading} ratio={pullRatio} />}
 */
export function usePullToRefresh(onRefresh) {
  const [pulling,   setPulling]   = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [pullRatio, setPullRatio] = useState(0)

  const startY    = useRef(0)
  const currentY  = useRef(0)
  const triggered = useRef(false)

  const handleTouchStart = useCallback((e) => {
    // Só aciona se o scroll do container estiver no topo
    const el = e.currentTarget
    if (el.scrollTop > 0) return
    startY.current   = e.touches[0].clientY
    currentY.current = startY.current
    triggered.current = false
  }, [])

  const handleTouchMove = useCallback((e) => {
    if (startY.current === 0) return
    currentY.current = e.touches[0].clientY
    const delta = currentY.current - startY.current
    if (delta <= 0) return

    const ratio = Math.min(delta / THRESHOLD, MAX_PULL / THRESHOLD)
    setPulling(true)
    setPullRatio(ratio)
    triggered.current = delta >= THRESHOLD
  }, [])

  const handleTouchEnd = useCallback(async () => {
    if (!pulling) return
    setPulling(false)
    setPullRatio(0)
    startY.current = 0

    if (triggered.current) {
      setLoading(true)
      try {
        await onRefresh()
      } finally {
        setLoading(false)
      }
    }
  }, [pulling, onRefresh])

  return {
    pulling,
    loading,
    pullRatio,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove:  handleTouchMove,
      onTouchEnd:   handleTouchEnd,
    },
  }
}
