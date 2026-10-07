import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Button } from './Button'

describe('Button', () => {
  describe('element type', () => {
    it('renders a button element by default', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
    })

    it('renders an anchor element when href is provided', () => {
      render(<Button href="/path">Link Button</Button>)
      expect(screen.getByRole('link', { name: 'Link Button' })).toBeInTheDocument()
      expect(screen.getByRole('link')).toHaveAttribute('href', '/path')
    })
  })

  describe('variant styling', () => {
    it('applies govuk-button class to primary variant', () => {
      render(<Button variant="primary">Primary</Button>)
      expect(screen.getByRole('button')).toHaveClass('govuk-button')
      expect(screen.getByRole('button')).not.toHaveClass('govuk-button--secondary')
      expect(screen.getByRole('button')).not.toHaveClass('govuk-button--warning')
    })

    it('applies govuk-button--secondary class to secondary variant', () => {
      render(<Button variant="secondary">Secondary</Button>)
      expect(screen.getByRole('button')).toHaveClass('govuk-button', 'govuk-button--secondary')
    })

    it('applies govuk-button--warning class to warning variant', () => {
      render(<Button variant="warning">Warning</Button>)
      expect(screen.getByRole('button')).toHaveClass('govuk-button', 'govuk-button--warning')
    })

    it('defaults to primary variant when variant is not specified', () => {
      render(<Button>Default</Button>)
      expect(screen.getByRole('button')).toHaveClass('govuk-button')
      expect(screen.getByRole('button')).not.toHaveClass('govuk-button--secondary')
      expect(screen.getByRole('button')).not.toHaveClass('govuk-button--warning')
    })
  })

  describe('size styling', () => {
    it('does not apply size class to default size', () => {
      render(<Button size="default">Default</Button>)
      expect(screen.getByRole('button')).not.toHaveClass('govuk-button--small')
    })

    it('applies govuk-button--small class to small size', () => {
      render(<Button size="small">Small</Button>)
      expect(screen.getByRole('button')).toHaveClass('govuk-button', 'govuk-button--small')
    })

    it('defaults to default size when size is not specified', () => {
      render(<Button>Default</Button>)
      expect(screen.getByRole('button')).not.toHaveClass('govuk-button--small')
    })
  })

  describe('variant and size combinations', () => {
    it('combines secondary variant with small size', () => {
      render(
        <Button variant="secondary" size="small">
          Secondary Small
        </Button>,
      )
      expect(screen.getByRole('button')).toHaveClass(
        'govuk-button',
        'govuk-button--secondary',
        'govuk-button--small',
      )
    })

    it('combines warning variant with small size', () => {
      render(
        <Button variant="warning" size="small">
          Warning Small
        </Button>,
      )
      expect(screen.getByRole('button')).toHaveClass(
        'govuk-button',
        'govuk-button--warning',
        'govuk-button--small',
      )
    })

    it('combines primary variant with small size', () => {
      render(
        <Button variant="primary" size="small">
          Primary Small
        </Button>,
      )
      expect(screen.getByRole('button')).toHaveClass('govuk-button', 'govuk-button--small')
    })
  })

  describe('disabled state', () => {
    it('applies disabled attribute when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('button is not disabled by default', () => {
      render(<Button>Enabled</Button>)
      expect(screen.getByRole('button')).not.toBeDisabled()
    })

    it('click handler does not fire on disabled button', () => {
      const handleClick = jest.fn()
      render(
        <Button onClick={handleClick} disabled>
          Disabled
        </Button>,
      )
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('disabled state works with all variants', () => {
      const { rerender } = render(
        <Button disabled variant="primary">
          Disabled Primary
        </Button>,
      )
      expect(screen.getByRole('button')).toBeDisabled()

      rerender(
        <Button disabled variant="secondary">
          Disabled Secondary
        </Button>,
      )
      expect(screen.getByRole('button')).toBeDisabled()

      rerender(
        <Button disabled variant="warning">
          Disabled Warning
        </Button>,
      )
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  describe('click handling', () => {
    it('calls onClick handler when button is clicked', () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick}>Click me</Button>)
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('passes the click event to onClick handler', () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick}>Click me</Button>)
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick.mock.calls[0][0]).toBeDefined()
      expect(handleClick.mock.calls[0][0].type).toBe('click')
    })
  })

  describe('button type', () => {
    it('defaults to type="button"', () => {
      render(<Button>Default Type</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
    })

    it('applies type="submit" when specified', () => {
      render(<Button type="submit">Submit</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
    })

    it('applies type="reset" when specified', () => {
      render(<Button type="reset">Reset</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('type', 'reset')
    })
  })

  describe('link button attributes', () => {
    it('applies target attribute to link button', () => {
      render(
        <Button href="https://example.com" target="_blank">
          External Link
        </Button>,
      )
      expect(screen.getByRole('link')).toHaveAttribute('target', '_blank')
    })

    it('applies rel attribute to link button', () => {
      render(
        <Button href="https://example.com" rel="noopener noreferrer">
          External Link
        </Button>,
      )
      expect(screen.getByRole('link')).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('applies both target and rel attributes', () => {
      render(
        <Button href="https://example.com" target="_blank" rel="noopener noreferrer">
          External Link
        </Button>,
      )
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('link button applies variant classes', () => {
      render(
        <Button href="#" variant="secondary">
          Secondary Link
        </Button>,
      )
      expect(screen.getByRole('link')).toHaveClass('govuk-button', 'govuk-button--secondary')
    })

    it('link button applies size classes', () => {
      render(
        <Button href="#" size="small">
          Small Link
        </Button>,
      )
      expect(screen.getByRole('link')).toHaveClass('govuk-button', 'govuk-button--small')
    })
  })

  describe('form attributes', () => {
    it('applies name attribute to button', () => {
      render(<Button name="action">Action</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('name', 'action')
    })

    it('applies value attribute to button', () => {
      render(<Button value="submit-value">Submit</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('value', 'submit-value')
    })

    it('applies form attribute to button', () => {
      render(<Button form="my-form">Submit</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('form', 'my-form')
    })
  })

  describe('ARIA attributes', () => {
    it('applies aria-label when specified', () => {
      render(<Button ariaLabel="Delete user account">Delete</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Delete user account')
    })

    it('applies aria-describedby when specified', () => {
      render(<Button ariaDescribedBy="error-message">Submit</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('aria-describedby', 'error-message')
    })

    it('applies aria-busy when specified', () => {
      render(<Button aria-busy={true}>Loading</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
    })

    it('applies aria-disabled when specified', () => {
      render(<Button aria-disabled={true}>Unavailable</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('visual and structural attributes', () => {
    it('applies id attribute when specified', () => {
      render(<Button id="my-button">Click</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('id', 'my-button')
    })

    it('merges custom className with govuk-button classes', () => {
      render(<Button className="custom-class">Custom</Button>)
      expect(screen.getByRole('button')).toHaveClass('govuk-button', 'custom-class')
    })

    it('maintains govuk-button class when custom className is provided', () => {
      render(<Button className="my-custom-button">Custom Button</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('govuk-button')
      expect(button).toHaveClass('my-custom-button')
    })
  })

  describe('children content', () => {
    it('renders text content as children', () => {
      render(<Button>Text Content</Button>)
      expect(screen.getByRole('button', { name: 'Text Content' })).toBeInTheDocument()
    })

    it('renders complex JSX content as children', () => {
      render(
        <Button>
          <span className="icon">→</span> Next
        </Button>,
      )
      expect(screen.getByRole('button')).toContainElement(
        document.querySelector('span.icon'),
      )
    })

    it('renders emoji content as children', () => {
      render(<Button>🗑️ Delete</Button>)
      expect(screen.getByRole('button', { name: /Delete/ })).toBeInTheDocument()
    })
  })

  describe('comprehensive scenarios', () => {
    it('renders a complete primary button with all attributes', () => {
      const handleClick = jest.fn()
      render(
        <Button
          id="submit-btn"
          type="submit"
          variant="primary"
          size="default"
          onClick={handleClick}
          className="custom"
          aria-label="Submit form"
        >
          Submit
        </Button>,
      )
      const button = screen.getByRole('button')
      expect(button).toHaveClass('govuk-button', 'custom')
      expect(button).toHaveAttribute('type', 'submit')
      expect(button).toHaveAttribute('id', 'submit-btn')
      expect(button).toHaveAttribute('aria-label', 'Submit form')
    })

    it('renders a complete secondary disabled button', () => {
      render(
        <Button
          id="cancel-btn"
          variant="secondary"
          size="small"
          disabled
          aria-label="Cancel operation"
        >
          Cancel
        </Button>,
      )
      const button = screen.getByRole('button')
      expect(button).toHaveClass('govuk-button', 'govuk-button--secondary', 'govuk-button--small')
      expect(button).toBeDisabled()
      expect(button).toHaveAttribute('aria-label', 'Cancel operation')
    })

    it('renders a complete warning link button', () => {
      render(
        <Button
          id="delete-link"
          href="/delete"
          variant="warning"
          target="_blank"
          rel="noopener"
          aria-label="Delete item (opens in new window)"
        >
          Delete
        </Button>,
      )
      const link = screen.getByRole('link')
      expect(link).toHaveClass('govuk-button', 'govuk-button--warning')
      expect(link).toHaveAttribute('href', '/delete')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener')
      expect(link).toHaveAttribute('aria-label', 'Delete item (opens in new window)')
    })
  })
})
