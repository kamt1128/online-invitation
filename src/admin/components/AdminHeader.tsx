import { logoutAdmin } from "../../firebase/auth";
import logoutIcon from "../../assets/logout.svg";
import invitationIcon from "../../assets/invitation.svg";

export default function AdminHeader() {
  return (
    <header className="admin-header">
      <h2 className="admin-header-title">
        <img src={invitationIcon} alt="Invitation Icon" className="admin-header-title__icon" />
        <span className="admin-header-title__text">Gestor de Invitaciones</span>
      </h2>
      <button onClick={logoutAdmin} className="admin-header-logout">
        <img src={logoutIcon} alt="Logout Icon" className="admin-header-logout__icon" />
      </button>
    </header>
  );
}
