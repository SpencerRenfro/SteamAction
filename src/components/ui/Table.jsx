import React from 'react';

/**
 * Table component with DaisyUI styling
 * 
 * @param {Object} props - Component props
 * @param {Array} props.columns - Array of column objects with key and label
 * @param {Array} props.data - Array of data objects
 * @param {Function} props.renderCell - Custom cell renderer function (optional)
 * @param {boolean} props.zebra - Whether to use zebra striping
 * @param {boolean} props.compact - Whether to use compact styling
 * @param {boolean} props.hoverable - Whether rows should have hover effect
 * @param {string} props.className - Additional CSS classes
 */
function Table({ 
  columns = [], 
  data = [], 
  renderCell, 
  zebra = false, 
  compact = false, 
  hoverable = true, 
  className = '' 
}) {
  const tableClasses = [
    'table',
    'w-full',
    zebra ? 'table-zebra' : '',
    compact ? 'table-compact' : '',
    hoverable ? 'table-hover' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="overflow-x-auto">
      <table className={tableClasses}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <td key={`${rowIndex}-${column.key}`}>
                    {renderCell ? 
                      renderCell(row, column.key, rowIndex) : 
                      row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
