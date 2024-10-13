// frontend/services/apiService.js

const API_URL = "http://localhost:3001/api"; // Backend server running locally

// Fetch room descriptions from the backend API
export const fetchRooms = async () => {
    try {
        const response = await fetch(`${API_URL}/rooms`);
        if (!response.ok) {
            throw new Error("Failed to fetch rooms");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching rooms:", error);
        throw error;  // Ensure error is propagated
    }
};

// Fetch room availability from the backend API
export const fetchAvailability = async () => {
    try {
        const response = await fetch(`${API_URL}/availability`);
        if (!response.ok) {
            throw new Error("Failed to fetch availability");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching availability:", error);
        throw error;  // Ensure error is propagated
    }
};

// Create a new booking
export const createBooking = async (roomId, guestDetails, checkIn, checkOut) => {
    try {
        const response = await fetch(`${API_URL}/bookings`, {
            method: "POST",
            body: JSON.stringify({ roomId, guestDetails, checkIn, checkOut }),
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error("Failed to create booking");
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating booking:", error);
        throw error;  // Ensure error is propagated
    }
};

// Create a Stripe session for payment
export const createStripeSession = async (price, currency, bookingId) => {
    try {
        const response = await fetch(`${API_URL}/create-stripe-session`, {
            method: "POST",
            body: JSON.stringify({ price, currency, bookingId }),
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error("Failed to create Stripe session");
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating Stripe session:", error);
        throw error;  // Ensure error is propagated
    }
};
