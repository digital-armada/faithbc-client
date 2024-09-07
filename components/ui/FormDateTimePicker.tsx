import React, { useState, useEffect } from "react";
import { format, parseISO, isValid } from "date-fns";

const FormDateTimePicker = ({
  label,
  name,
  defaultValue,
  className = "",
  ...props
}) => {
  const [value, setValue] = useState(() => {
    if (defaultValue) {
      const parsedDate = parseISO(defaultValue);
      return isValid(parsedDate)
        ? format(parsedDate, "yyyy-MM-dd'T'HH:mm")
        : "";
    }
    return "";
  });

  useEffect(() => {
    if (props.onChange) props.onChange(value);
  }, [value, props, props.onChange]);

  const handleChange = (event) => {
    let newValue = event.target.value;
    // Check if the time part is empty and set it to midnight if it is
    if (!newValue.includes("T")) {
      newValue = `${newValue}T00:00`;
    }
    setValue(newValue);
  };

  return (
    <div className="sm:col-span-3">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <input
          type="datetime-local"
          name={name}
          value={value}
          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`}
          onChange={handleChange}
          {...props}
        />
      </div>
    </div>
  );
};

export default FormDateTimePicker;
