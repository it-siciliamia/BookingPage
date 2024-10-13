# Room Booking Application - Blue House

This repository contains the frontend and backend implementation of the room booking feature for **Blue House B&B Iceland**. The application integrates with the **Beds24 API** for managing room availability, bookings, and payments through **Stripe** and **PayPal**.

---

## Project Overview

The application is built with a separate backend (Node.js + Express) and frontend (React) to handle room booking and payments for Blue House B&B Iceland. The backend interacts with the **Beds24 API** to fetch room descriptions, availability, and create bookings, while the frontend offers a user-friendly interface for making room bookings and processing payments via **Stripe** and **PayPal**.

---

## Folder Structure

```
BookingPage/
├── backend/
│   ├── api/
│   │   └── beds24Api.js              # Beds24 API integration (Express server)
│   ├── package.json                  # Backend dependencies
│   ├── server.js                     # Main server file for backend
│   ├── .config.js                    # Config file for sensitive keys
├── frontend/
│   ├── components/                   # Contains all React components for the frontend
│   │   ├── Advantages.jsx
│   │   ├── HeaderIcons.jsx
│   │   ├── HotelDateRangePicker.jsx
│   │   ├── PayPal.js
│   │   ├── Payment.js
│   │   ├── RoomBooking.jsx
│   │   ├── SearchContainer.jsx
│   ├── services/
│   │   └── apiService.js             # API service for frontend (communication with backend)
│   ├── styles/                       # Contains all CSS files for styling
│   │   ├── calendar.css
│   │   └── index.css                 # Frontend styling
│   ├── public/                       # Contains the static HTML file
│   │   └── index.html                # Static HTML template for React app
│   ├── index.js                      # React entry point
│   ├── package.json                  # Frontend dependencies
├── README.md                         # Project documentation
```

---

## Setup Instructions

### Backend Setup

1. **Navigate to the Backend Directory:**

   Open a terminal and navigate to the `backend` folder:

   ```bash
   cd backend
   ```

2. **Install Dependencies:**

   Install the required dependencies for the backend:

   ```bash
   npm install
   ```

3. **Start the Backend Server:**

   Run the following command to start the backend server:

   ```bash
   npm start
   ```

   The backend server will run on `http://localhost:3001`.

### Frontend Setup

1. **Navigate to the Frontend Directory:**

   Open a terminal and navigate to the `frontend` folder:

   ```bash
   cd frontend
   ```

2. **Install Dependencies:**

   Install the required dependencies for the frontend:

   ```bash
   npm install
   ```

3. **Start the Frontend Development Server:**

   Run the following command to start the frontend development server:

   ```bash
   npm start
   ```

   The frontend server will run on `http://localhost:3000`.

---

## How to Test Backend

1. **Ensure the Backend is Running:**

   Start the backend server by navigating to the `backend` folder and running:

   ```bash
   npm start
   ```

2. **Test API Endpoints with Postman or curl:**

   Use Postman or curl to test the API endpoints:

   - **Fetch Room Descriptions:**

     ```bash
     curl http://localhost:3001/api/rooms
     ```

   - **Fetch Room Availability:**

     ```bash
     curl http://localhost:3001/api/availability
     ```

   - **Create a Booking:**
     ```bash
     curl -X POST http://localhost:3001/api/bookings -H "Content-Type: application/json" -d '{
       "roomId": "9748",
       "guestDetails": { "firstName": "John", "lastName": "Doe" },
       "checkIn": "2024-11-01",
       "checkOut": "2024-11-05"
     }'
     ```

---

## How to Test Frontend

1. **Ensure the Frontend is Running:**

   Start the frontend development server by navigating to the `frontend` folder and running:

   ```bash
   npm start
   ```

2. **Visit the Application:**

   Open your browser and navigate to:

   ```bash
   http://localhost:3000
   ```

   Test the frontend by searching for rooms, checking availability, and making bookings.

---

## How to Test Both Together

1. **Ensure the Backend is Running:**

   Start the backend server first by running:

   ```bash
   npm start
   ```

2. **Ensure the Frontend is Running:**

   Start the frontend development server by running:

   ```bash
   npm start
   ```

3. **Test the Full Application:**

   Open the application in your browser (`http://localhost:3000`), search for rooms, make bookings, and proceed to payments. The frontend will communicate with the backend for all booking and availability requests.

---

## How to Run Payment Processing (Stripe and PayPal)

### Stripe Payment

- Select a room and proceed to payment.
- The frontend will send the price, currency, and booking details to the backend via the `/create-stripe-session` endpoint.
- The user will be redirected to Stripe's hosted checkout page to complete the payment.

### PayPal Payment

- Similar to Stripe, select a room and proceed to payment.
- The frontend will use PayPal's buttons to handle the payment process directly within the application.
- Once the payment is approved, the booking will be confirmed.

---

By following these steps, you can successfully set up, test, and run the complete room booking application with integrated payment processing.
