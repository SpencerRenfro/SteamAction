import React from 'react';

/**
 * Badge component with DaisyUI styling
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Badge content
 * @param {string} props.variant - Badge variant (primary, secondary, accent, info, success, warning, error)
 * @param {string} props.size - Badge size (lg, md, sm, xs)
 * @param {boolean} props.outline - Whether to use outline style
 * @param {string} props.className - Additional CSS classes
 */
function Badge({ 
  children, 
  variant = '', 
  size = '', 
  outline = false, 
  className = '' 
}) {
  const badgeClasses = [
    'badge',
    variant ? `badge-${variant}` : '',
    size ? `badge-${size}` : '',
    outline ? 'badge-outline' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={badgeClasses}>
      {children}
    </span>
  );
}

export default Badge;
