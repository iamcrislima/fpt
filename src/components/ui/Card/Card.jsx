/**
 * Card — FPT Design System
 * Zero CSS imports: todos os estilos vivem em src/styles/utilities.css.
 *
 * @param {'default'|'elevated'|'flat'|'outlined'} variant
 * @param {'sm'|'md'|'lg'}                          padding
 * @param {boolean}                                  noPadding
 */
export function Card({
  variant = 'default',
  padding = 'md',
  noPadding = false,
  className = '',
  children,
  ...props
}) {
  const cardClass = [
    'card',
    variant !== 'default' ? `card-${variant}` : '',
    className,
  ].filter(Boolean).join(' ')

  const bodyClass = [
    'card__body',
    padding !== 'md' ? `card__body-${padding}` : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={cardClass} {...props}>
      {noPadding ? children : <div className={bodyClass}>{children}</div>}
    </div>
  )
}
