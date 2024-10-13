// HotelDateRangePicker.jsx

import React, { useState } from 'react';
import {
  format, isSameDay, isSameMonth, 
  isWithinInterval, eachDayOfInterval, startOfMonth, 
  endOfMonth, startOfWeek, endOfWeek, subMonths, addMonths, isBefore
} from 'date-fns';

const HotelDateRangePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedDate, setFocusedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDayClick = (day) => {
    if (isBefore(day, new Date())) {
      return; 
    }
    if (!startDate) {
      setStartDate(day);
      setFocusedDate(day); 
    } else if (!endDate) {
        if (isBefore(day, startDate)) {
            setStartDate(day);
            setEndDate(null);
        } else {
            setEndDate(day);
            setShowCalendar(false); 
        }
    } else {
        setStartDate(day);
        setEndDate(null);
        setFocusedDate(day); 
    }
  };


  const renderCalendar = () => {
    // const daysInMonth = eachDayOfInterval({ start: startOfMonth(focusedDate), end: endOfMonth(focusedDate) });
    const firstDayOfMonth = startOfMonth(focusedDate);
    const lastDayOfMonth = endOfMonth(focusedDate);
    const firstDayOfWeek = startOfWeek(firstDayOfMonth);
    const lastDayOfWeek = endOfWeek(lastDayOfMonth);

    const days = eachDayOfInterval({ start: firstDayOfWeek, end: lastDayOfWeek });

    return (
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={() => setFocusedDate(subMonths(focusedDate, 1))}>&lt;</button>
          <span>{format(focusedDate, 'MMMM yyyy')}</span>
          <button onClick={() => setFocusedDate(addMonths(focusedDate, 1))}>&gt;</button>
        </div>
        <div className='calendar-days'>
          {days.map((day) => {
            const isCurrentMonth = isSameMonth(day, focusedDate);
            const isSelected = isSameDay(day, startDate) || isSameDay(day, endDate) || (startDate && endDate && isWithinInterval(day, { start: startDate, end: endDate }));
            const isOutsideMonth = !isWithinInterval(day, {start: firstDayOfMonth, end: lastDayOfMonth});
            const isDisabled = isBefore(day, new Date());

            return (
              <div
                key={day.toString()}
                className={`day ${isOutsideMonth ? 'outside-month' : ''} ${isCurrentMonth ? 'current-month' : ''} ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                onClick={() => isCurrentMonth && !isDisabled && handleDayClick(day)}
              >
                {format(day, 'd')}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="date-range-picker">
      <div className="input-fields">
        <div className='input-toggle'>
          <span className='input-toggle-btn'></span>
          <input
            type="text"
            placeholder="Check in"
            value={startDate ? format(startDate, 'MMM d, yyyy') : ''}
            readOnly
            onClick={() => {
              setFocusedDate(startDate || new Date());
              setShowCalendar(true);
            }}
          />
        </div>
        <div className='input-toggle'>
          <input
            type="text"
            placeholder="Check out"
            value={endDate ? format(endDate, 'MMM d, yyyy') : ''}
            readOnly
            onClick={() => {
              // if (!startDate) {
              //   return;
              // }
              setFocusedDate(endDate || startDate || new Date());
              setShowCalendar(false);
            }}
          />
        </div>
      </div>
      {showCalendar && renderCalendar()}
    </div>
  );
};

export default HotelDateRangePicker;