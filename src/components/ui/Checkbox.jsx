import React from 'react';

/**
 * Checkbox component with DaisyUI styling
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - Checkbox label
 * @param {boolean} props.checked - Whether the checkbox is checked
 * @param {Function} props.onChange - Change handler
 * @param {string} props.color - Checkbox color (primary, secondary, accent, etc.)
 * @param {boolean} props.disabled - Whether the checkbox is disabled
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.id - Checkbox ID
 * @param {string} props.name - Checkbox name
 */
function Checkbox({ 
  label, 
  checked, 
  onChange, 
  color = 'primary', 
  disabled = false, 
  className = '', 
  id, 
  name,
  ...rest 
}) {
  const checkboxId = id || `checkbox-${name || Math.random().toString(36).substr(2, 9)}`;
  
  const checkboxClasses = [
    'checkbox',
    color ? `checkbox-${color}` : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="form-control">
      <label className="label cursor-pointer justify-start gap-2">
        <input
          id={checkboxId}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={checkboxClasses}
          name={name}
          {...rest}
        />
        {label && <span className="label-text">{label}</span>}
      </label>
    </div>
  );
}

export default Checkbox;
