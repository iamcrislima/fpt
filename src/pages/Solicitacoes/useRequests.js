import { useState, useCallback } from 'react'
import { MOCK_REQUESTS } from './data'

/**
 * Manages user request state.
 * Replace the mock internals with real API calls when the backend is ready.
 * The public interface (requests, loading, error, createRequest) must not change.
 */
export function useRequests() {
  const [requests, setRequests] = useState(MOCK_REQUESTS)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState(null)
  const [selectedId, setSelectedId] = useState(null)

  const createRequest = useCallback(async (type, payload) => {
    setLoading(true)
    setError(null)
    try {
      // TODO: replace with → await api.post('/requests', { type, payload })
      await new Promise(r => setTimeout(r, 700))

      const isAutoApprove = type === 'category_change' && payload.autoApprove

      const req = {
        id: `req-${Date.now()}`,
        type,
        status: isAutoApprove ? 'approved_auto' : 'pending_review',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        payload,
      }

      setRequests(prev => [req, ...prev])
      return req
    } catch {
      const msg = 'Falha ao criar solicitação. Tente novamente.'
      setError(msg)
      throw new Error(msg)
    } finally {
      setLoading(false)
    }
  }, [])

  const selected = requests.find(r => r.id === selectedId) ?? null

  return {
    requests,
    loading,
    error,
    selectedId,
    selected,
    setSelectedId,
    createRequest,
  }
}
