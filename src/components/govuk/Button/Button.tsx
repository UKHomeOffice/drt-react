import React from 'react'
import './Button.scss'

export interface ButtonProps {
  // Content & Label
  children: React.ReactNode

  // Styling Variants
  variant?: 'primary' | 'secondary' | 'warning'

  // Sizing
  size?: 'default' | 'small'

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
  size = 'default',
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
    size === 'small' && 'govuk-button--small',
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

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        {...commonProps}
      >
        {children}
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
      {children}
    </button>
  )
}
