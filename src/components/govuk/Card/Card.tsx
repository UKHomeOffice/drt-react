import React from 'react'
import './Card.scss'

export type CardVariant = 'primary' | 'secondary'
export type CardHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

interface CardBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  /** The card heading. Choose a level appropriate to the surrounding page. */
  heading?: React.ReactNode
  headingLevel?: CardHeadingLevel
  variant?: CardVariant
  /** An image above the card content. Use an empty alt for decorative images. */
  image?: { src: string; alt: string }
  /** Show a decorative chevron on a primary card. */
  showChevron?: boolean
}

type CardLinkProps =
  | { href: string; heading: React.ReactNode; clickable: true; action?: never }
  | { href: string; heading: React.ReactNode; clickable?: false; action?: React.ReactNode }
  | { href?: never; clickable?: never; action?: React.ReactNode }

export type CardProps = CardBaseProps & CardLinkProps

/**
 * Groups related content using the NHS card pattern. Clickable cards should
 * contain only one link and no other interactive content.
 */
export const Card: React.FC<CardProps> = ({
  children,
  heading,
  headingLevel = 2,
  variant = 'primary',
  image,
  action,
  href,
  clickable = false,
  showChevron = false,
  className,
  ...attributes
}) => {
  const Heading = `h${headingLevel}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  const classes = [
    'drt-govuk-card',
    variant === 'secondary' && 'drt-govuk-card--secondary',
    clickable && 'drt-govuk-card--clickable',
    showChevron && variant === 'primary' && 'drt-govuk-card--chevron',
    className,
  ].filter(Boolean).join(' ')

  const headingElement = heading != null && (
    <Heading className="drt-govuk-card__heading">
      {href ? <a className="drt-govuk-card__link" href={href}>{heading}</a> : heading}
    </Heading>
  )

  return (
    <div {...attributes} className={classes}>
      {image && <img className="drt-govuk-card__image" src={image.src} alt={image.alt} />}
      {action != null && (
        <div className="drt-govuk-card__heading-container">
          {headingElement}
          <div className="drt-govuk-card__action">{action}</div>
        </div>
      )}
      <div className="drt-govuk-card__content">
        {action == null && headingElement}
        {children}
        {showChevron && variant === 'primary' && (
          <span className="drt-govuk-card__chevron" aria-hidden="true">›</span>
        )}
      </div>
    </div>
  )
}
