import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../firebase/auth";

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
    <div className="login">
      <form onSubmit={submit}>
        <h2>Panel Administrador</h2>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}
