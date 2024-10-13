import { useEffect, useState } from "react";
import { fetchRooms, fetchAvailability, createBooking } from "../services/apiService";
import minusIcon from "../../images/roombooking/minus.svg";
import plusIcon from "../../images/roombooking/plus.svg";
import arrowDown from "../../images/roombooking/ArrowDown.svg";
import arrowUp from "../../images/roombooking/ArrowUp.svg";
import {
    format, isSameDay, isSameMonth, 
    isWithinInterval, eachDayOfInterval, startOfMonth, 
    endOfMonth, startOfWeek, endOfWeek, subMonths, addMonths, isBefore
} from 'date-fns';

const SearchContainer = () => {
    const [rooms, setRooms] = useState([]);
    const [availability, setAvailability] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedDate, setFocusedDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [containerToggle, setContainerToggle] = useState(false);
    const [adultsAmount, setAdultsAmount] = useState(2);
    const [childrenAmount, setChildrenAmount] = useState(0);
    const [roomsAmount, setRoomsAmount] = useState(1);
    const [selectedRoom, setSelectedRoom] = useState(null);

    useEffect(() => {
        const loadRoomData = async () => {
            try {
                const roomData = await fetchRooms();
                setRooms(roomData.rooms);
            } catch (error) {
                console.error("Error loading rooms:", error);
            }
        };

        const loadAvailabilityData = async () => {
            try {
                const availabilityData = await fetchAvailability();
                setAvailability(availabilityData.availability);
            } catch (error) {
                console.error("Error loading availability:", error);
            }
        };

        loadRoomData();
        loadAvailabilityData();
    }, []);

    const handleBooking = async () => {
        const guestDetails = { adults: adultsAmount, children: childrenAmount, rooms: roomsAmount };
        try {
            const booking = await createBooking(selectedRoom, guestDetails, startDate, endDate);
            console.log("Booking created successfully", booking);
        } catch (error) {
            console.error("Error creating booking:", error);
        }
    };

    const handleIncrement = () => setAdultsAmount(adultsAmount + 1);
    const handleIncrementChildren = () => setChildrenAmount(childrenAmount + 1);
    const handleIncrementRooms = () => setRoomsAmount(roomsAmount + 1);

    const handleDecrement = () => {
        if (adultsAmount > 0) setAdultsAmount(adultsAmount - 1);
    };
    const handleDecrementChildren = () => {
        if (childrenAmount > 0) setChildrenAmount(childrenAmount - 1);
    };
    const handleDecrementRooms = () => {
        if (roomsAmount > 0) setRoomsAmount(roomsAmount - 1);
    };

    const toggleHandle = () => {
        setContainerToggle(prevState => !prevState);
        setShowCalendar(false);
    };

    const handleDayClick = (day) => {
        if (isBefore(day, new Date())) return;
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
                        const isOutsideMonth = !isWithinInterval(day, { start: firstDayOfMonth, end: lastDayOfMonth });
                        const isDisabled = isBefore(day, new Date());

                        const isFirstSelected = startDate && isSameDay(day, startDate);
                        const isLastSelected = endDate && isSameDay(day, endDate);

                        return (
                            <div
                                key={day.toString()}
                                className={`day 
                                    ${isOutsideMonth ? 'outside-month' : ''} 
                                    ${isCurrentMonth ? 'current-month' : ''} 
                                    ${isSelected ? 'selected' : ''} 
                                    ${isDisabled ? 'disabled' : ''}
                                    ${isFirstSelected || isLastSelected ? 'first-last-selected' : ''}`}
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
        <div className="search-wrapper">
            <h1 className="booking-title">Book your stay with Blue House</h1>
            <div className="content">
                {/* Render room data */}
                <div className="room-info">
                    {rooms.map((room, index) => (
                        <div key={index}>
                            <h3>{room.name}</h3>
                            <p>{room.description}</p>
                            <button onClick={() => setSelectedRoom(room.id)}>Select Room</button>
                        </div>
                    ))}
                </div>

                <div className="search-container search-btn-container">
                    <button className="search-btn" onClick={handleBooking}>Book Now</button>
                </div>

                <div className="search">
                    <div className="search-container">
                        <span className="calendar-icon"></span>
                        <input
                            className="date-range__input"
                            type="text"
                            placeholder="Check in"
                            value={startDate ? format(startDate, 'MMM d, yyyy') : ''}
                            readOnly
                            onClick={() => {
                                setFocusedDate(startDate || new Date());
                                setShowCalendar(true);
                                if (containerToggle) return setContainerToggle(false);
                            }}
                        />
                    </div>
                    <div className="search-container">
                        <span className="calendar-icon"></span>
                        <input
                            className="date-range__input"
                            type="text"
                            placeholder="Check out"
                            value={endDate ? format(endDate, 'MMM d, yyyy') : ''}
                            readOnly
                            onClick={() => {
                                setFocusedDate(endDate || startDate || new Date());
                                setShowCalendar(false);
                            }}
                        />
                    </div>
                    <div className="search-container quantity">
                        <div>{`${adultsAmount} adults, ${childrenAmount ? childrenAmount + " " + "child" + ", " : ""}${roomsAmount} rooms`}</div>
                        <button
                            className="quantity-container-toggle-btn"
                            onClick={toggleHandle}
                        >
                            <img src={`${containerToggle ? arrowUp : arrowDown}`} alt="arrow icon" />
                        </button>
                        {containerToggle &&

                            <div className="quantity-container">
                                <div className="quantity-element">
                                    <span>Adults</span>
                                    <span className="quantity-content">
                                        <span
                                            className="count-person decrement-btn"
                                            onClick={handleDecrement}
                                        >
                                            <img src={minusIcon} alt="minus icon" />
                                        </span>
                                        <h3 className="count-person">{adultsAmount}</h3>
                                        <span
                                            className="count-person increment-btn"
                                            onClick={handleIncrement}
                                        >
                                            <img src={plusIcon} alt="plus icon" />
                                        </span>
                                    </span>
                                </div>
                                <div className="quantity-element">
                                    <span>Children</span>
                                    <span className="quantity-content">
                                        <span
                                            className="count-person decrement-btn"
                                            onClick={handleDecrementChildren}
                                        >
                                            <img src={minusIcon} alt="minus icon" />
                                        </span>
                                        <h3 className="count-person">{childrenAmount}</h3>
                                        <span
                                            className="count-person increment-btn"
                                            onClick={handleIncrementChildren}
                                        >
                                            <img src={plusIcon} alt="plus icon" />
                                        </span>
                                    </span>
                                </div>
                                <div className="quantity-element">
                                    <span>Rooms</span>
                                    <span className="quantity-content">
                                        <span
                                            className="count-person decrement-btn"
                                            onClick={handleDecrementRooms}
                                        >
                                            <img src={minusIcon} alt="minus icon" />
                                        </span>
                                        <h3 className="count-person">{roomsAmount}</h3>
                                        <span
                                            className="count-person increment-btn"
                                            onClick={handleIncrementRooms}
                                        >
                                            <img src={plusIcon} alt="plus icon" />
                                        </span>
                                    </span>
                                </div>
                                <div className="quantity-element">
                                    <button className="submit-amount">DONE</button>
                                </div>
                            </div>}
                    </div>
                </div>
                {showCalendar && renderCalendar()}
            </div>
        </div>
    );
};

export default SearchContainer;
