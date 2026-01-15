import { logoutAdmin } from "../../firebase/auth";
import logoutIcon from "../../assets/logout.svg";
import brandIcon from "../../assets/logotipo-envelope-id.png";
import brandText from "../../assets/logotipo-id.png";

export default function AdminHeader() {
  return (
    <header className="admin-header">
      <h2 className="admin-header-title">
        <img src={brandIcon} alt="Brand Icon" className="admin-header-title__icon" />
        <img src={brandText} alt="Brand Text" className="admin-header-title__text" />
      </h2>
      <button onClick={logoutAdmin} className="admin-header-logout">
        <img src={logoutIcon} alt="Logout Icon" className="admin-header-logout__icon" />
      </button>
    </header>
  );
}
