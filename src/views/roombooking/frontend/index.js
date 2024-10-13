// frontend/index.js

import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";  // Global styles
import RoomBooking from "./components/RoomBooking";  // Main Room Booking component

// Render the main RoomBooking component to the root element
ReactDOM.render(
  <React.StrictMode>
    <RoomBooking />
  </React.StrictMode>,
  document.getElementById("root")  // Injects the app into the 'root' element in index.html
);
