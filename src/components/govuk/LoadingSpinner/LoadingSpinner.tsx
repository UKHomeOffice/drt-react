import React from 'react'
import './LoadingSpinner.scss'

export interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Explain what the user is waiting for. Defaults to "Loading...". */
  children?: React.ReactNode
}

/** A full-page loading indicator based on the Home Office Design System. */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  children = 'Loading...',
  className,
  ...attributes
}) => {
  const classes = ['drt-govuk-loading-spinner', className].filter(Boolean).join(' ')

  return (
    <div {...attributes} className={classes} role="status">
      <div className="drt-govuk-loading-spinner__spinner" aria-hidden="true" />
      <div className="drt-govuk-loading-spinner__content">
        <h1 className="drt-govuk-loading-spinner__heading">{children}</h1>
      </div>
    </div>
  )
}
