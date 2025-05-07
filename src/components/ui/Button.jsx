import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Button component with DaisyUI styling
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.variant - Button variant (primary, secondary, accent, info, success, warning, error, ghost, link)
 * @param {string} props.size - Button size (lg, md, sm, xs)
 * @param {boolean} props.outline - Whether to use outline style
 * @param {boolean} props.wide - Whether to make the button full width
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.to - Link destination (if button should be a Link)
 * @param {Function} props.onClick - Click handler
 * @param {string} props.type - Button type (button, submit, reset)
 */
function Button({ 
  children, 
  variant = '', 
  size = '', 
  outline = false, 
  wide = false, 
  disabled = false, 
  className = '', 
  to = null, 
  onClick = null, 
  type = 'button',
  ...rest 
}) {
  const buttonClasses = [
    'btn',
    variant ? `btn-${variant}` : '',
    size ? `btn-${size}` : '',
    outline ? 'btn-outline' : '',
    wide ? 'btn-wide' : '',
    disabled ? 'btn-disabled' : '',
    className
  ].filter(Boolean).join(' ');

  // If 'to' prop is provided, render as Link
  if (to) {
    return (
      <Link to={to} className={buttonClasses} {...rest}>
        {children}
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <button 
      type={type} 
      className={buttonClasses} 
      disabled={disabled} 
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
