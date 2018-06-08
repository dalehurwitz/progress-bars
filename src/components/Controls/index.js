import React from 'react'

/**
 * A basic form select input
 * @param {Array}     options           Array of objects with structure { value, label }
 * @param {String}    value             Value of selected item
 * @param {Function}  onChange          On change of select value
 */
const Select = ({
  options,
  value, // index of the selected option in the options array
  onChange,
}) => {
  return (
    <select className="control control__select" value={value} onChange={onChange}>
      <option value="" disabled>Select a bar</option>
      {options.map(({ label, value }) =>
        <option
          key={value}
          value={value}>
          {label}
        </option>
      )}
    </select>
  )
}

// Custom props allow the use of data attributes
const Button = ({ children, onClick }) => (
  <button className="control control__button" type='button' onClick={onClick}>
    {children}
  </button>
)

export {
  Select,
  Button
}
