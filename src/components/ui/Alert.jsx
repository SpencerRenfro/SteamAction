import React from 'react';

/**
 * Alert component with DaisyUI styling
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Alert content
 * @param {string} props.variant - Alert variant (info, success, warning, error)
 * @param {React.ReactNode} props.icon - Alert icon (optional)
 * @param {string} props.className - Additional CSS classes
 */
function Alert({ 
  children, 
  variant = 'info', 
  icon = null, 
  className = '' 
}) {
  const alertClasses = [
    'alert',
    variant ? `alert-${variant}` : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={alertClasses}>
      {icon && (
        <div className="flex-shrink-0">
          {icon}
        </div>
      )}
      <div>
        {children}
      </div>
    </div>
  );
}

export default Alert;
