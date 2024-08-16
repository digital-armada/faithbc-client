"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const range = (start, end) => {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
};

const years = range(1900, new Date().getFullYear());
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CustomDatePicker = ({ onChange }) => {
  const [startDate, setStartDate] = useState(null);

  const handleChange = (date) => {
    setStartDate(date);
    onChange(date);
  };

  return (
    <div className="rounded-md sm:col-span-4">
      <DatePicker
        renderCustomHeader={({ date, changeYear, changeMonth }) => (
          <div
            style={{ display: "flex", justifyContent: "center" }}
            className="p-2"
          >
            <select
              value={date.getFullYear()}
              onChange={({ target: { value } }) => changeYear(Number(value))}
              style={{ marginRight: "5px" }}
              className="rounded-md p-1"
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              value={months[date.getMonth()]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
              className="rounded-md p-1"
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
        selected={startDate}
        onChange={handleChange}
        dateFormat="dd/MM/yyyy"
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={120}
        placeholderText="Select Date of Birth"
        // openToDate="1990-01-01"
        showMonthDropdown
      />
    </div>
  );
};

export default CustomDatePicker;
