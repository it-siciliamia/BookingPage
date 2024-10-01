const API_URL = "http://localhost:3001/api"; // Backend server running locally

// Fetch room descriptions
export const fetchRooms = async () => {
    const response = await fetch(`${API_URL}/rooms`);
    if (!response.ok) {
        throw new Error("Failed to fetch rooms");
    }
    return response.json();
};

// Fetch room availability
export const fetchAvailability = async () => {
    const response = await fetch(`${API_URL}/availability`);
    if (!response.ok) {
        throw new Error("Failed to fetch availability");
    }
    return response.json();
};

// Create a booking
export const createBooking = async (roomId, guestDetails, checkIn, checkOut) => {
    const response = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        body: JSON.stringify({ roomId, guestDetails, checkIn, checkOut }),
        headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
        throw new Error("Failed to create booking");
    }

    return response.json();
};

// Create Stripe session
export const createStripeSession = async (price, currency, bookingId) => {
    const response = await fetch(`${API_URL}/create-stripe-session`, {
        method: "POST",
        body: JSON.stringify({ price, currency, bookingId }),
        headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
        throw new Error("Failed to create Stripe session");
    }

    return response.json();
};
