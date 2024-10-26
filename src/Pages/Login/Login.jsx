import Header from "../../components/Header/Header.jsx";
import "./Login.css";
import { useSupabase } from "../../../lib/hooks/useSupabase.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useSupabase();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="login-screen">
        <h1>Login</h1>
        <form className="login-form">
          <input
            className="login-email"
            type="email"
            placeholder="email"
            value={email}
            onChange={handleEmail}
          />
          <input
            className="login-password"
            type="password"
            placeholder="password"
            value={password}
            onChange={handlePassword}
          />
          {/* <input type="password" placeholder="confirm password" /> */}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button className="login-submit" onClick={loginUser}>
            login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
