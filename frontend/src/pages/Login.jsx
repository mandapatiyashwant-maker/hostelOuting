import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/login", {
        email,
        password,
      });

      const role = res.data.role;

      if (role === "student") {
        navigate("/student");
      } else if (role === "mentor") {
        navigate("/mentor");
      } else if (role === "warden") {
        navigate("/warden");
      } else if (role === "admin") {
        navigate("/admin");
      } else {
        alert("Unknown role");
      }
    } catch (err) {
      console.log(err);
      alert("Login Failed");
    }
  };

  return (
    <div>
      <h1>Hostel Outing Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;