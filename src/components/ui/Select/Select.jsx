/**
 * Select — FPT Design System
 * Zero CSS imports: todos os estilos vivem em src/styles/utilities.css.
 *
 * @param {string}             label
 * @param {string}             error
 * @param {{ value, label }[]} options
 */
export function Select({
  label,
  error,
  options = [],
  className = '',
  id,
  ...props
}) {
  const selectClass = [
    'select',
    error ? 'select-error' : '',
    className,
  ].filter(Boolean).join(' ')

  const wrapperClass = [
    'select-wrapper',
    label ? 'select-wrapper-with-label' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={wrapperClass}>
      {label && (
        <label className="select-label" htmlFor={id}>
          {label}
        </label>
      )}
      <select id={id} className={selectClass} {...props}>
        {options.map(({ value, label: optLabel }) => (
          <option key={value} value={value}>
            {optLabel}
          </option>
        ))}
      </select>
      {error && <span className="select-error-msg">{error}</span>}
    </div>
  )
}
