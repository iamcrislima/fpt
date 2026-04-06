/**
 * Button — FPT Design System
 *
 * Zero CSS imports. Todos os estilos vivem em src/styles/utilities.css,
 * carregado globalmente via main.jsx.
 *
 * Variantes disponíveis
 * ─────────────────────
 * primary    → fundo sport-primary, texto sobre cor
 * secondary  → outline sport-primary, fundo transparente
 * ghost      → sem borda/fundo, texto muted
 * danger     → fundo vermelho, para ações destrutivas
 *
 * Estados
 * ───────
 * disabled   → opacidade 0.45, cursor not-allowed, pointer-events off
 * loading    → spinner centrado, label invisível (tamanho preservado)
 *
 * Regras de hover
 * ───────────────
 * :hover é suprimido quando :disabled OU .btn-loading — nenhum feedback
 * visual é dado enquanto a ação está pendente ou bloqueada.
 *
 * Prop `as`
 * ─────────
 * Permite renderizar como <a>, Link (React Router) ou qualquer elemento.
 * Quando Tag !== 'button', o atributo `disabled` não é emitido (inválido em
 * âncoras) — .btn-disabled + aria-disabled cobrem o caso.
 *
 * @param {'primary'|'secondary'|'ghost'|'danger'} variant
 * @param {'sm'|'md'|'lg'}                          size
 * @param {boolean}                                  disabled
 * @param {boolean}                                  loading
 * @param {boolean}                                  fullWidth
 * @param {boolean}                                  iconOnly    remove padding, aspect-ratio 1:1
 * @param {React.ElementType}                        as
 * @param {string}                                   className   classes extras do consumidor
 * @param {React.ReactNode}                          children
 */
export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  iconOnly = false,
  as: Tag = 'button',
  className = '',
  children,
  ...props
}) {
  const classes = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    loading   ? 'btn-loading'  : '',
    disabled  ? 'btn-disabled' : '',
    fullWidth ? 'btn-full'     : '',
    iconOnly  ? 'btn-icon'     : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <Tag
      className={classes}
      disabled={Tag === 'button' ? disabled || loading : undefined}
      aria-disabled={disabled || loading || undefined}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <span className="btn__spinner" aria-hidden="true" />}
      <span className="btn__label">{children}</span>
    </Tag>
  )
}
