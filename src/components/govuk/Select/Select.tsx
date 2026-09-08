import React from 'react'
import './Select.scss'

export interface SelectOption {
  value: string
  label: React.ReactNode
}

interface SelectBaseProps {
  name: string
  id?: string
  options: SelectOption[]
  labelClassName?: string
  hint?: string
  error?: string
  value?: string
  defaultValue?: string
  disabled?: boolean
  onChange?: (value: string) => void
  className?: string
}

/**
 * Supply either a visible/visually-hidden label or an aria-label so the select
 * always has an accessible name.
 */
export type SelectProps = SelectBaseProps & (
  | {
    label: React.ReactNode
    ariaLabel?: string
  }
  | {
    label?: undefined
    ariaLabel: string
  }
)

/**
 * GOV.UK Design System Select component.
 */
export const Select: React.FC<SelectProps> = ({
  name,
  id = name,
  options,
  label,
  ariaLabel,
  labelClassName,
  hint,
  error,
  value,
  defaultValue,
  disabled = false,
  onChange,
  className,
}) => {
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const describedBy = [
    hint ? hintId : null,
    error ? errorId : null,
  ]
    .filter(Boolean)
    .join(' ')

  const formGroupClasses = [
    'govuk-form-group',
    error ? 'govuk-form-group--error' : null,
  ]
    .filter(Boolean)
    .join(' ')

  const selectClasses = [
    'govuk-select',
    error ? 'govuk-select--error' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const labelClasses = [
    'govuk-label',
    labelClassName,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={formGroupClasses}>
      {label !== undefined && (
        <label className={labelClasses} htmlFor={id}>
          {label}
        </label>
      )}

      {hint && (
        <div id={hintId} className="govuk-hint">
          {hint}
        </div>
      )}

      {error && (
        <p id={errorId} className="govuk-error-message">
          <span className="govuk-visually-hidden">Error:</span>{' '}
          {error}
        </p>
      )}

      <select
        className={selectClasses}
        id={id}
        name={name}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-describedby={describedBy || undefined}
        aria-invalid={error ? true : undefined}
        onChange={(event) => onChange?.(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
