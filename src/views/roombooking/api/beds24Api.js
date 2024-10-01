const express = require("express");
const app = express();
const fetch = require("node-fetch");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

const apiKey = "BookingpageBlueHouse";
const propKey = "BB3578IceZenoLand";
const propId = "3578"; // Property ID
const roomIds = [9748, 7264, 59038, 110158, 42714]; // Add rooms IDs here

// Get Descriptions for rooms
app.get("/api/rooms", async (req, res) => {
    try {
        const response = await fetch("https://api.beds24.com/json/getDescriptions", {
            method: "POST",
            body: JSON.stringify({
                authentication: {
                    apiKey,
                    propKey
                },
                propId
            }),
            headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();
        const rooms = roomIds.map(roomId => data.properties.rooms[roomId]);
        res.json({ rooms });
    } catch (error) {
        console.error("Error fetching rooms:", error);
        res.status(500).send("Error fetching room descriptions");
    }
});

// Get Room Availability
app.get("/api/availability", async (req, res) => {
    try {
        const from = new Date().toISOString().split("T")[0].replace(/-/g, "");
        const to = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0].replace(/-/g, "");

        const availability = await Promise.all(
            roomIds.map(async roomId => {
                const response = await fetch("https://api.beds24.com/json/getRoomDates", {
                    method: "POST",
                    body: JSON.stringify({
                        authentication: {
                            apiKey,
                            propKey
                        },
                        from,
                        to,
                        roomId
                    }),
                    headers: { "Content-Type": "application/json" }
                });
                return { roomId, availability: await response.json() };
            })
        );

        res.json({ availability });
    } catch (error) {
        console.error("Error fetching availability:", error);
        res.status(500).send("Error fetching room availability");
    }
});

// Create a new booking
app.post("/api/bookings", async (req, res) => {
    const { roomId, guestDetails, checkIn, checkOut } = req.body;

    try {
        const response = await fetch("https://api.beds24.com/json/setBooking", {
            method: "POST",
            body: JSON.stringify({
                authentication: {
                    apiKey,
                    propKey
                },
                roomId,
                checkIn,
                checkOut,
                guestDetails
            }),
            headers: { "Content-Type": "application/json" }
        });

        const bookingResponse = await response.json();
        res.json(bookingResponse);
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).send("Booking failed");
    }
});

// Create Stripe Session for payment
app.post("/api/create-stripe-session", async (req, res) => {
    const { price, currency, bookingId } = req.body;

    try {
        const response = await fetch("https://api.beds24.com/json/createStripeSession", {
            method: "POST",
            body: JSON.stringify({
                authentication: {
                    apiKey,
                    propKey
                },
                price,
                currency,
                bookingId
            }),
            headers: { "Content-Type": "application/json" }
        });

        const session = await response.json();
        res.json(session);
    } catch (error) {
        console.error("Error creating Stripe session:", error);
        res.status(500).send("Payment session creation failed");
    }
});

const port = 3001;
app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
});
