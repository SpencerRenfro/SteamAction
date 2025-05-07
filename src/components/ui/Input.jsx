import React from 'react';

/**
 * Input component with DaisyUI styling
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - Input label
 * @param {string} props.type - Input type (text, number, email, password, etc.)
 * @param {string} props.placeholder - Input placeholder
 * @param {string} props.value - Input value
 * @param {Function} props.onChange - Change handler
 * @param {string} props.error - Error message
 * @param {string} props.helperText - Helper text
 * @param {boolean} props.disabled - Whether the input is disabled
 * @param {boolean} props.required - Whether the input is required
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.id - Input ID
 * @param {string} props.name - Input name
 */
function Input({ 
  label, 
  type = 'text', 
  placeholder = '', 
  value, 
  onChange, 
  error = '', 
  helperText = '', 
  disabled = false, 
  required = false, 
  className = '', 
  id, 
  name,
  ...rest 
}) {
  const inputId = id || `input-${name || Math.random().toString(36).substr(2, 9)}`;
  
  const inputClasses = [
    'input',
    'input-bordered',
    'w-full',
    error ? 'input-error' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="form-control w-full">
      {label && (
        <label htmlFor={inputId} className="label">
          <span className="label-text">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </span>
        </label>
      )}
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={inputClasses}
        name={name}
        {...rest}
      />
      {(error || helperText) && (
        <label className="label">
          {error ? (
            <span className="label-text-alt text-error">{error}</span>
          ) : helperText ? (
            <span className="label-text-alt">{helperText}</span>
          ) : null}
        </label>
      )}
    </div>
  );
}

export default Input;
