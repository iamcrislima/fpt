import { Button } from '@1doc/1ds-react'

/**
 * DSButton — wrapper do 1DS Button alinhado ao FPT Design System.
 *
 * POR QUE EXISTE:
 * O componente 1DS Button usa seus próprios nomes de variant ('text', 'neutral').
 * Este wrapper:
 *   1. Expõe os nomes canônicos do FPT DS ('ghost', 'secondary'…)
 *   2. Garante que o mapeamento para 1DS seja centralizado em um lugar
 *   3. Preserva 100% da API do 1DS via ...props (size, startIcon, endIcon,
 *      disabled, loading, fullWidth, className…)
 *
 * O visual é controlado pelos overrides em src/styles/1ds-overrides.css
 * e pelos tokens bridge em src/styles/tokens.css — não há inline styles aqui.
 *
 * QUANDO USAR:
 * - Novas telas que adotam o DS
 * - Migração incremental de botões existentes
 *
 * QUANDO NÃO USAR:
 * - Quando precisar de um variant que só existe no 1DS (ex: 'icon', 'neutral')
 *   → importe diretamente de @1doc/1ds-react
 *
 * @param {'primary'|'secondary'|'ghost'|'danger'|'danger-outlined'} variant
 * @param {'sm'|'md'|'lg'}                                            size
 * @param {boolean}                                                    disabled
 * @param {boolean}                                                    fullWidth
 * @param {string}                                                     startIcon  nome do ícone iconoir
 * @param {string}                                                     endIcon    nome do ícone iconoir
 * @param {string}                                                     loadingIcon
 * @param {string}                                                     className  classes extras
 * @param {React.ReactNode}                                            children
 */

const VARIANT_MAP = {
  primary:          'primary',
  secondary:        'secondary',
  ghost:            'text',        // 1DS "text" = sem fundo, sem borda
  danger:           'danger',
  'danger-outlined':'danger-outlined',
}

export function DSButton({ variant = 'primary', ...props }) {
  const mapped = VARIANT_MAP[variant] ?? variant

  return <Button variant={mapped} {...props} />
}
