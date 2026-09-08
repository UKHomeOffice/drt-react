import React, { useState } from 'react'
import type { LegendSize } from '../Radios'
import './Checkboxes.scss'

export interface CheckboxOption {
  value: string
  label: React.ReactNode
  hint?: string
  conditional?: React.ReactNode
  disabled?: boolean
  testId?: string
}

export interface CheckboxesProps {
  name: string
  idPrefix?: string
  options: CheckboxOption[]
  label?: React.ReactNode
  isPageHeading?: boolean
  legendSize?: LegendSize
  hint?: string
  error?: string
  value?: string[]
  defaultValue?: string[]
  onChange?: (values: string[]) => void
  disabled?: boolean
  inline?: boolean
  small?: boolean
}

/**
 * GOV.UK Design System Checkboxes component.
 */
export const Checkboxes: React.FC<CheckboxesProps> = ({
  name,
  idPrefix,
  options,
  label,
  isPageHeading = false,
  legendSize,
  hint,
  error,
  value: controlledValue,
  defaultValue = [],
  onChange,
  disabled = false,
  inline = false,
  small = false,
}) => {
  const prefix = idPrefix ?? name
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue)
  const [focusedValue, setFocusedValue] = useState<string>()
  const isControlled = controlledValue !== undefined
  const selectedValues = isControlled ? controlledValue : internalValue
  const selectedValueSet = new Set(selectedValues)

  const handleChange = (changedValue: string, checked: boolean, optionDisabled: boolean) => {
    if (disabled || optionDisabled) return

    const nextSelectedValueSet = new Set(selectedValues)
    if (checked) {
      nextSelectedValueSet.add(changedValue)
    } else {
      nextSelectedValueSet.delete(changedValue)
    }

    const nextValues = options
      .map((option) => option.value)
      .filter((optionValue) => nextSelectedValueSet.has(optionValue))

    if (!isControlled) {
      setInternalValue(nextValues)
    }
    onChange?.(nextValues)
  }

  const fieldsetDescribedBy = [
    hint ? `${prefix}-hint` : null,
    error ? `${prefix}-error` : null,
  ]
    .filter(Boolean)
    .join(' ')

  const formGroupClasses = [
    'govuk-form-group',
    'drt-govuk-checkboxes',
    error ? 'govuk-form-group--error' : null,
  ]
    .filter(Boolean)
    .join(' ')

  const checkboxesClasses = [
    'govuk-checkboxes',
    small ? 'govuk-checkboxes--small' : null,
    inline ? 'drt-checkboxes--inline' : null,
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

        <div className={checkboxesClasses} data-module="govuk-checkboxes">
          {options.map((option, index) => {
            const inputId = `${prefix}-${index + 1}`
            const hintId = `${inputId}-item-hint`
            const conditionalId = `${inputId}-conditional`
            const isChecked = selectedValueSet.has(option.value)
            const isDisabled = disabled || option.disabled === true

            return (
              <React.Fragment key={option.value}>
                <div className="govuk-checkboxes__item">
                  <input
                    className={[
                      'govuk-checkboxes__input',
                      focusedValue === option.value
                        ? 'drt-checkboxes__input--focused'
                        : null,
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    id={inputId}
                    name={name}
                    type="checkbox"
                    value={option.value}
                    checked={isChecked}
                    disabled={isDisabled}
                    data-testid={option.testId}
                    data-cy={option.testId}
                    aria-describedby={option.hint ? hintId : undefined}
                    aria-invalid={error ? true : undefined}
                    aria-controls={option.conditional ? conditionalId : undefined}
                    aria-expanded={option.conditional ? isChecked : undefined}
                    onFocus={() => setFocusedValue(option.value)}
                    onBlur={() => {
                      setFocusedValue(currentValue => (
                        currentValue === option.value ? undefined : currentValue
                      ))
                    }}
                    onChange={(event) => {
                      handleChange(option.value, event.target.checked, isDisabled)
                    }}
                  />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor={inputId}>
                    {option.label}
                  </label>
                  {option.hint && (
                    <div id={hintId} className="govuk-hint govuk-checkboxes__hint">
                      {option.hint}
                    </div>
                  )}
                </div>

                {option.conditional && (
                  <div
                    id={conditionalId}
                    className={[
                      'govuk-checkboxes__conditional',
                      !isChecked ? 'govuk-checkboxes__conditional--hidden' : null,
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
          })}
        </div>
      </fieldset>
    </div>
  )
}

export default Checkboxes
