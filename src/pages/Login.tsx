import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../firebase/auth";
import backgroundCard from "../assets/background-card.svg";
import "../styles/_login.scss";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginAdmin(email, password);
      navigate("/admin");
    } catch {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="login fondo-radial-center">
      <div className="background-card float-element">
        <img src={backgroundCard} alt="Background Card" className="background-card__image" />
      </div>
      <form onSubmit={submit} className="login-form">
        <h2 className="login-form__title">Panel Administrador</h2>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="login-form__input"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="login-form__input"
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" className="login-form__btn">Ingresar</button>
      </form>
    </div>
  );
}
