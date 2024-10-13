// Advantages.jsx
import dollarSign from "../../images/roombooking/dollarsign.svg"
import spotSign from "../../images/roombooking/spotSign.svg"
import busSign from "../../images/roombooking/busSign.svg"
import carSign from "../../images/roombooking/carSign.svg"
import planeSign from "../../images/roombooking/planeSign.svg"
import timeSign from "../../images/roombooking/timeSign.svg"

const Advantages = () => {
  return (
    <section className="bh_advantages-wrapper">
        <div className="bh_advantages-container">
            <ul className="bh_advantages-list">
                <li className="bh_advantages-item">
                    <img src={dollarSign} alt="dollar icon" className="bh_advantages-icons"/>
                    <p className="bh_advantages-text">Best Price Guarantee</p>
                </li>
                <li className="bh_advantages-item">
                    <img src={spotSign} alt="dollar icon" className="bh_advantages-icons"/>
                    <p className="bh_advantages-text">Popular Spot for Northern Lights</p>
                </li>
                <li className="bh_advantages-item">
                    <img src={busSign} alt="dollar icon" className="bh_advantages-icons"/>
                    <p className="bh_advantages-text">3 Min Walk to Bus Stop</p>
                </li>
                <li className="bh_advantages-item">
                    <img src={carSign} alt="dollar icon" className="bh_advantages-icons"/>
                    <p className="bh_advantages-text">5 Min Drive 
                    from Town</p>
                </li>
                <li className="bh_advantages-item">
                    <img src={planeSign} alt="dollar icon" className="bh_advantages-icons"/>
                    <p className="bh_advantages-text">45 Min Drive 
                    from Airport</p>
                </li>
                <li className="bh_advantages-item">
                    <img src={timeSign} alt="dollar icon" className="bh_advantages-icons"/>
                    <p className="bh_advantages-text">Late Night 
                    Self Check In</p>
                </li>
            </ul>
        </div>
    </section>
  )
}

export default Advantages