import { logoutAdmin } from "../../firebase/auth";
import logoutIcon from "../../assets/logout.svg";

export default function AdminHeader() {
  return (
    <header className="admin-header">
      <h2 className="admin-header__title">Dashboard – Mis 15 Años</h2>
      <button onClick={logoutAdmin} className="admin-header-logout">
        <img src={logoutIcon} alt="Logout Icon" className="admin-header-logout__icon" />
      </button>
    </header>
  );
}
