import React from 'react';

/**
 * Select component with DaisyUI styling
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - Select label
 * @param {Array} props.options - Select options array of objects with value and label
 * @param {string} props.value - Selected value
 * @param {Function} props.onChange - Change handler
 * @param {string} props.error - Error message
 * @param {string} props.helperText - Helper text
 * @param {boolean} props.disabled - Whether the select is disabled
 * @param {boolean} props.required - Whether the select is required
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.id - Select ID
 * @param {string} props.name - Select name
 */
function Select({ 
  label, 
  options = [], 
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
  const selectId = id || `select-${name || Math.random().toString(36).substr(2, 9)}`;
  
  const selectClasses = [
    'select',
    'select-bordered',
    'w-full',
    error ? 'select-error' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="form-control w-full">
      {label && (
        <label htmlFor={selectId} className="label">
          <span className="label-text">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </span>
        </label>
      )}
      <select
        id={selectId}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={selectClasses}
        name={name}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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

export default Select;
