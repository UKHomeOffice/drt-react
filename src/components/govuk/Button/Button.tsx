import React from 'react'
import './Button.scss'

export type ButtonVariant = 'primary' | 'secondary' | 'warning'
export type ButtonSize = 'default' | 'small'
export type SecondaryButtonStyle = 'govuk' | 'home-office'

export interface ButtonProps {
  // Content & Label
  children: React.ReactNode

  // Styling Variants
  variant?: ButtonVariant
  /** Selects the visual treatment for secondary buttons. Defaults to Home Office. */
  secondaryStyle?: SecondaryButtonStyle

  // Sizing
  size?: ButtonSize
  /** Makes the button fill the width of its containing block. */
  fullWidth?: boolean

  // Decorative Icons
  /** Decorative content displayed before the button text. */
  startIcon?: React.ReactNode
  /** Decorative content displayed after the button text. */
  endIcon?: React.ReactNode

  // HTML Attributes & Behavior
  type?: 'button' | 'submit' | 'reset'
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean

  // Link Button Support
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  rel?: string

  // Accessibility & Forms
  name?: string
  value?: string
  form?: string

  // Visual & Structural
  className?: string
  id?: string

  // ARIA Attributes
  ariaLabel?: string
  ariaDescribedBy?: string
  'aria-busy'?: boolean
  'aria-disabled'?: boolean
}

/**
 * GOV.UK Design System Button component.
 * Renders as <button> or <a> element depending on whether href is provided.
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  secondaryStyle = 'home-office',
  size = 'default',
  fullWidth = false,
  startIcon,
  endIcon,
  type = 'button',
  onClick,
  disabled = false,
  href,
  target,
  rel,
  name,
  value,
  form,
  className,
  id,
  ariaLabel,
  ariaDescribedBy,
  ...ariaAttributes
}) => {
  const classes = [
    'govuk-button',
    variant !== 'primary' && `govuk-button--${variant}`,
    variant === 'secondary' && secondaryStyle === 'home-office' && 'drt-govuk-button--secondary-home-office',
    size === 'small' && 'govuk-button--small',
    fullWidth && 'drt-govuk-button--full-width',
    (startIcon || endIcon) && 'drt-govuk-button--has-icons',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const commonProps = {
    className: classes || undefined,
    id,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    ...ariaAttributes,
  }

  const content = (
    <>
      {startIcon && (
        <span className="drt-govuk-button__icon" aria-hidden="true">
          {startIcon}
        </span>
      )}
      <span className="drt-govuk-button__content">{children}</span>
      {endIcon && (
        <span className="drt-govuk-button__icon" aria-hidden="true">
          {endIcon}
        </span>
      )}
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        {...commonProps}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      name={name}
      value={value}
      form={form}
      {...commonProps}
    >
      {content}
    </button>
  )
}
