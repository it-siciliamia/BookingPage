import instaIcon from "../../images/Header_icons/headerSocialIcons/insta.svg"
import facebookIcon from "../../images/Header_icons/headerSocialIcons/facebook.svg"
import whatsappIcon from "../../images/Header_icons/headerSocialIcons/whats.svg"
import tripIcon from "../../images/Header_icons/headerSocialIcons/tripadvisor_icon2.svg"
import emailIcon from "../../images/Header_icons/headerSocialIcons/email.svg"

const HeaderIcons = () => {
  return (
    <aside className="social-app-icons">
      <a
        href="https://www.instagram.com/bluehousebb/"
        target="_blank"
        rel="noreferrer"
      >
        <img src={instaIcon} alt="instagram icon" className="app-links" />
      </a>
      <a
        href="https://www.facebook.com/bluehouseiceland"
        target="_blank"
        rel="noreferrer"
      >
        <img src={facebookIcon} alt="facebook icon" className="app-links" />
      </a>
      <a
        href="https://api.whatsapp.com/send?phone=3547756480&text=&source=&data="
        target="_blank"
        rel="noreferrer"
      >
        <img src={whatsappIcon} alt="whatsapp icon" className="app-links" />
      </a>
      <a
        href="https://www.tripadvisor.com/Hotel_Review-g189970-d1915669-Reviews-Blue_House-Reykjavik_Capital_Region.html"
        target="_blank"
        rel="noreferrer"
      >
        <img src={tripIcon} alt="tripadvisor icon" className="app-links" />
      </a>
      <a
        href="https://bluehouseis.zohodesk.eu/portal/en/newticket?departmentId=135604000000205173&layoutId=135604000000214460" 
        target="_blank"
        rel="noreferrer"
      >
        <img src={emailIcon} alt="email icon" className="app-links" />
      </a>
    </aside>
  )
}

export default HeaderIcons