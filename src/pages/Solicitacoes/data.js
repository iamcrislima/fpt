// ── Request types ─────────────────────────────────────────────────────────────
export const REQUEST_TYPE_LABELS = {
  category_change: 'Alteração de Categoria',
  club_transfer: 'Transferência de Clube',
  family_registration: 'Inscrição Família',
}

// ── Status config ─────────────────────────────────────────────────────────────
export const STATUS_CONFIG = {
  approved_auto:   { label: 'Aprovado automaticamente', variant: 'success' },
  pending_review:  { label: 'Em análise',               variant: 'warning' },
  approved_manual: { label: 'Aprovado',                 variant: 'success' },
  rejected:        { label: 'Recusado',                 variant: 'danger'  },
}

// ── Category system ───────────────────────────────────────────────────────────
export const CATEGORIES = ['D', 'C', 'B', 'A', 'Open']

// Points needed to reach each category
export const CATEGORY_REQUIREMENTS = {
  C:    { auto: 500,  review: 420 },
  B:    { auto: 1000, review: 900 },
  A:    { auto: 1500, review: 1350 },
  Open: { auto: 2000, review: 1800 },
}

// ── Clubs ─────────────────────────────────────────────────────────────────────
export const CLUBS = [
  'Academia FPT Londrina',
  'BT Maringá',
  'Clube Atlético Paranaense',
  'Esporte Clube Paranavaí',
  'Pinheiros Tennis Club',
  'FPT Centro Curitiba',
  'Arena BT Cascavel',
]

// ── Mock sport profile (future: comes from API alongside user) ────────────────
export const MOCK_SPORT_PROFILE = {
  categoria: 'C',
  pontos: 840,
  clube: 'Beach Tennis Curitiba',
}

// ── Mock member search (future: GET /api/users?q=) ────────────────────────────
export const MOCK_ATHLETE_SEARCH = [
  { id: 'u-01', name: 'Ana Lima',        codigo: 'FPT-2024-0101' },
  { id: 'u-02', name: 'Bruno Lima',      codigo: 'FPT-2024-0102' },
  { id: 'u-03', name: 'Carla Santos',    codigo: 'FPT-2024-0103' },
  { id: 'u-04', name: 'Diego Ferreira',  codigo: 'FPT-2023-0084' },
  { id: 'u-05', name: 'Elisa Moreira',   codigo: 'FPT-2025-0215' },
]

// ── Seed data for "Minhas solicitações" ───────────────────────────────────────
export const MOCK_REQUESTS = [
  {
    id: 'req-001',
    type: 'category_change',
    status: 'approved_auto',
    createdAt: '2026-03-10T09:00:00Z',
    updatedAt: '2026-03-10T09:02:00Z',
    payload: { fromCategory: 'D', toCategory: 'C', justification: '' },
  },
  {
    id: 'req-002',
    type: 'club_transfer',
    status: 'pending_review',
    createdAt: '2026-03-28T14:30:00Z',
    updatedAt: '2026-03-28T14:30:00Z',
    payload: {
      fromClub: 'BT Maringá',
      toClub: 'Beach Tennis Curitiba',
      reason: 'Mudança de cidade',
    },
  },
]
