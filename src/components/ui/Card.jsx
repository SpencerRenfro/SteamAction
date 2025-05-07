import React from 'react';

/**
 * Card component with DaisyUI styling
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.title - Card title
 * @param {string} props.subtitle - Card subtitle (optional)
 * @param {React.ReactNode} props.image - Card image (optional)
 * @param {React.ReactNode} props.actions - Card actions (optional)
 * @param {string} props.className - Additional CSS classes (optional)
 * @param {boolean} props.bordered - Whether to add a border (optional)
 * @param {boolean} props.compact - Whether to make the card compact (optional)
 * @param {string} props.bgColor - Background color class (optional, default: 'bg-base-100')
 */
function Card({
  children,
  title,
  subtitle,
  image,
  actions,
  className = '',
  bordered = false,
  compact = false,
  bgColor = 'bg-base-100'
}) {
  const cardClasses = [
    'card',
    bgColor,
    'shadow-md',
    bordered ? 'border border-base-300' : '',
    compact ? 'card-compact' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses}>
      {image && (
        <figure>
          {image}
        </figure>
      )}
      <div className="card-body flex flex-col">
        <div>
          {title && <h2 className="card-title mb-4">{title}</h2>}
          {subtitle && <p className="text-sm opacity-70 mb-4">{subtitle}</p>}
        </div>

        <div className="flex-grow overflow-y-auto my-2">
          {children}
        </div>

        {actions && (
          <div className="card-actions justify-end mt-4 pt-2 border-t border-base-200">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
