# Room Booking Application - Blue House

This repository contains the frontend and backend implementation of the room booking feature for **Blue House B&B Iceland**. The application is integrated with the **Beds24 API** for managing room availability, bookings, and payments through **Stripe** and **PayPal**.

## Features

1. **Room Descriptions**: Fetch and display room details using the Beds24 API.
2. **Room Availability**: Check room availability for selected dates.
3. **Room Booking**: Users can create and modify bookings.
4. **Payment Integration**: Handle payments via **Stripe** and **PayPal**.
5. **Date Range Picker**: Select check-in and check-out dates.
6. **Search and Filter**: Search for room availability based on user-selected dates, number of adults, children, and rooms.

---

## Folder Structure

```
src/
├── views/
│   └── roombooking/
│       ├── api/                    # Backend API folder for Beds24 integration
│       │   └── beds24Api.js        # Backend logic for interacting with Beds24 API
│       ├── apiService.js           # Frontend service for API calls (rooms, bookings, Stripe)
│       ├── Advantages.jsx          # Component for displaying room advantages
│       ├── calendar.css            # CSS for the calendar components
│       ├── HeaderIcons.jsx         # Component for header icons
│       ├── HotelDateRangePicker.jsx # Date range picker component
│       ├── index.css               # General CSS for room booking components
│       ├── RoomBooking.jsx         # Main room booking page component
│       ├── SearchContainer.jsx     # Room search and booking form
│       ├── Payment.js              # Payment component with Stripe and PayPal integration
│       ├── StripeCheckout.js       # Handles Stripe payment logic
│       ├── PayPal.js               # Handles PayPal payment logic
```

---

## API Integration

The application integrates with the Beds24 API for fetching room descriptions, availability, and handling bookings.

### API Functions from Beds24

1. **getDescriptions**: Fetch room descriptions for the property.
2. **getAvailabilities**: Fetch room availability for specific dates.
3. **setBooking**: Create or modify a booking for a specific room.
4. **createStripeSession**: Create a Stripe session for handling payments.

### API Endpoints (Backend)

The backend is implemented in `src/views/roombooking/api/beds24Api.js` using **Express.js**. It provides the following endpoints:

1. **GET `/api/rooms`**: Fetches room descriptions for the property from Beds24.
2. **GET `/api/availability`**: Fetches room availability for specified dates.
3. **POST `/api/bookings`**: Allows the creation of bookings with selected dates and guest details.
4. **POST `/api/create-stripe-session`**: Creates a Stripe session for handling payments.

### Running the Backend

1. Install the required dependencies for the backend:

   ```bash
   npm install express node-fetch cors body-parser
   ```

2. Start the backend server:

   ```bash
   node src/views/roombooking/api/beds24Api.js
   ```

3. The backend server will run on `http://localhost:3001`.

---

## Frontend Integration

### API Service

The frontend interacts with the backend using the `apiService.js` file located in `src/views/roombooking/`. It includes functions to fetch room descriptions, availability, and create bookings.

- **`fetchRooms()`**: Fetches room descriptions from the `/api/rooms` endpoint.
- **`fetchAvailability()`**: Fetches room availability from the `/api/availability` endpoint.
- **`createBooking()`**: Sends booking details to the `/api/bookings` endpoint.
- **`createStripeSession()`**: Sends payment details to the `/api/create-stripe-session` endpoint.

### Room Booking Component (`RoomBooking.jsx`)

This is the main component that combines various subcomponents like `SearchContainer`, `Advantages`, and `HeaderIcons` to create the room booking page. It allows users to search for available rooms, view room details, and proceed to booking.

```javascript
import Advantages from "./Advantages";
import HeaderIcons from "./HeaderIcons";
import "./index.css";
import "./calendar.css";
import SearchContainer from "./SearchContainer";

const RoomBooking = () => {
  return (
    <main className="main">
      <div className="booking-container">
        <section className="hero">
          <HeaderIcons />
          <SearchContainer />
        </section>
        <Advantages />
      </div>
    </main>
  );
};

export default RoomBooking;
```

### Search and Booking (`SearchContainer.jsx`)

This component allows users to:

1. Search for room availability based on check-in and check-out dates.
2. Select the number of adults, children, and rooms.
3. Create a booking.

```javascript
import { useEffect, useState } from "react";
import { fetchRooms, fetchAvailability, createBooking } from "./apiService";

const SearchContainer = () => {
  const [rooms, setRooms] = useState([]);
  const [availability, setAvailability] = useState([]);
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
    // Create a booking
    const booking = await createBooking(
      selectedRoom,
      guestDetails,
      startDate,
      endDate
    );
    console.log("Booking created:", booking);
  };

  return (
    <div className="search-wrapper">
      <h1 className="booking-title">Book your stay with Blue House</h1>
      {/* Room Search and Booking UI */}
      {/* Add code to display room data, select dates, and confirm bookings */}
    </div>
  );
};

export default SearchContainer;
```

---

## Payment Integration

### Stripe Payment

Stripe payment is handled using the **Stripe Checkout** session, which is created on the backend and then redirects the user to the Stripe payment page.

```javascript
import React from "react";
import { createStripeSession } from "../apiService";

function StripeCheckout({ price }) {
  const handleCheckout = async () => {
    try {
      const session = await createStripeSession(price, "EUR", "booking-id");
      window.location.href = session.url;
    } catch (error) {
      console.error("Error creating Stripe session:", error);
    }
  };

  return <button onClick={handleCheckout}>Pay Now with Stripe</button>;
}

export default StripeCheckout;
```

### PayPal Payment

The PayPal integration uses the **PayPal Buttons** provided by the PayPal API.

```javascript
import React, { useState, useEffect, useRef } from "react";

export default function PayPal({ price }) {
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState(null);
  const paypalRef = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "EUR",
                  value: price,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaid(true);
        },
        onError: (err) => {
          setError(err);
        },
      })
      .render(paypalRef.current);
  }, [price]);

  return (
    <div>
      <h4>Total Amount: EUR {price}</h4>
      <div ref={paypalRef} />
      {paid && <p>Payment successful!</p>}
      {error && (
        <p>There was an error processing your payment. Please try again.</p>
      )}
    </div>
  );
}
```

---

## Running the Frontend

1. Install the frontend dependencies:

   ```bash
   npm install
   ```

2. Start the frontend development server:

   ```bash
   npm start
   ```

3. The frontend server will run on `http://localhost:3000`.
