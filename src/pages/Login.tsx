import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../firebase/auth";
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
