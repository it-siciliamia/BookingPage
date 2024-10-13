// RoomBooking.jsx
import Advantages from "./Advantages"
import HeaderIcons from "./HeaderIcons"
import "../styles/index.css"
import "../styles/calendar.css"
import SearchContainer from "./SearchContainer"

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
  )
}

export default RoomBooking