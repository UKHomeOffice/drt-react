import React, { useState } from 'react'
import './Radios.scss'

export interface RadioOption {
  value: string
  label: React.ReactNode,
  hint?: string
  conditional?: React.ReactNode
  disabled?: boolean
}

export interface RadioDivider {
  divider: string
}

export type RadiosOption = RadioOption | 'or' | RadioDivider

export type LegendSize = 's' | 'm' | 'l' | 'xl'

export interface RadiosProps {
  name: string
  idPrefix?: string
  options: RadiosOption[]
  label?: React.ReactNode
  isPageHeading?: boolean
  legendSize?: LegendSize
  hint?: string
  error?: string
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  inline?: boolean
  small?: boolean
  disabled?: boolean
  className?: string
  formGroupClassName?: string
}

function isRadioOption(option: RadiosOption): option is RadioOption {
  return typeof option === 'object' && 'value' in option
}

function isRadioDivider(option: RadiosOption): option is RadioDivider {
  return typeof option === 'object' && 'divider' in option
}

function getDividerText(option: RadiosOption): string | null {
  if (option === 'or') return 'or'
  if (isRadioDivider(option)) return option.divider
  return null
}

/**
 * GOV.UK Design System Radios component.
 *
 * Renders the official GOV.UK HTML structure with full accessibility support:
 * - aria-describedby linking fieldset to group hint/error
 * - aria-describedby linking inputs to per-option hints
 * - aria-invalid on all inputs when error is present
 * - Conditional reveal via React state (no govuk-frontend JS required)
 * - isPageHeading wraps legend in h1
 * - legendSize applies govuk-fieldset__legend--{size} class
 */
export const Radios: React.FC<RadiosProps> = ({
  name,
  idPrefix,
  options,
  label,
  isPageHeading = false,
  legendSize,
  hint,
  error,
  value: controlledValue,
  defaultValue,
  onChange,
  inline = false,
  small = false,
  disabled = false,
  className,
  formGroupClassName,
}) => {
  const prefix = idPrefix ?? name

  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue)

  const isControlled = controlledValue !== undefined
  const selectedValue = isControlled ? controlledValue : internalValue

  const handleChange = (val: string) => {
    if (!isControlled) {
      setInternalValue(val)
    }
    onChange?.(val)
  }

  // Build aria-describedby for the fieldset
  const fieldsetDescribedBy = [
    hint ? `${prefix}-hint` : null,
    error ? `${prefix}-error` : null,
  ]
    .filter(Boolean)
    .join(' ')

  const formGroupClasses = [
    'govuk-form-group',
    error ? 'govuk-form-group--error' : null,
    formGroupClassName,
  ]
    .filter(Boolean)
    .join(' ')

  const radiosClasses = [
    'govuk-radios',
    inline ? 'govuk-radios--inline' : null,
    small ? 'govuk-radios--small' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const legendClasses = [
    'govuk-fieldset__legend',
    legendSize ? `govuk-fieldset__legend--${legendSize}` : null,
  ]
    .filter(Boolean)
    .join(' ')

  const legend = (
    <legend className={legendClasses}>
      {label}
    </legend>
  )

  // Track option index separately (dividers don't count)
  let optionIndex = 0

  return (
    <div className={formGroupClasses}>
      <fieldset
        className="govuk-fieldset"
        aria-describedby={fieldsetDescribedBy || undefined}
      >
        {isPageHeading ? (
          <h1 className="govuk-fieldset__heading">{legend}</h1>
        ) : (
          legend
        )}

        {hint && (
          <div id={`${prefix}-hint`} className="govuk-hint">
            {hint}
          </div>
        )}

        {error && (
          <p id={`${prefix}-error`} className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span>
            {error}
          </p>
        )}

        <div className={radiosClasses} data-module="govuk-radios">
          {options.map((option, arrayIndex) => {
            const dividerText = getDividerText(option)

            if (dividerText !== null) {
              return (
                <div key={`divider-${arrayIndex}`} className="govuk-radios__divider">
                  {dividerText}
                </div>
              )
            }

            if (isRadioOption(option)) {
              const currentIndex = optionIndex++
              const inputId = `${prefix}-${currentIndex + 1}`
              const hintId = `${prefix}-${currentIndex + 1}-item-hint`
              const conditionalId = `${prefix}-${currentIndex + 1}-conditional`
              const isChecked = selectedValue === option.value
              const isDisabled = disabled || option.disabled

              const inputDescribedBy = option.hint ? hintId : undefined

              return (
                <React.Fragment key={option.value}>
                  <div className="govuk-radios__item">
                    <input
                      className="govuk-radios__input"
                      id={inputId}
                      name={name}
                      type="radio"
                      value={option.value}
                      checked={isChecked}
                      disabled={isDisabled}
                      aria-describedby={inputDescribedBy}
                      aria-invalid={error ? true : undefined}
                      aria-controls={option.conditional ? conditionalId : undefined}
                      onChange={() => handleChange(option.value)}
                    />
                    <label className="govuk-label govuk-radios__label" htmlFor={inputId}>
                      {option.label}
                    </label>
                    {option.hint && (
                      <div id={hintId} className="govuk-hint govuk-radios__hint">
                        {option.hint}
                      </div>
                    )}
                  </div>

                  {option.conditional && (
                    <div
                      id={conditionalId}
                      className={[
                        'govuk-radios__conditional',
                        !isChecked ? 'govuk-radios__conditional--hidden' : null,
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      aria-live="polite"
                    >
                      {option.conditional}
                    </div>
                  )}
                </React.Fragment>
              )
            }

            return null
          })}
        </div>
      </fieldset>
    </div>
  )
}

export default Radios
