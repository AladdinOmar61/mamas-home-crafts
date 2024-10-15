import Header from "../../components/Header/Header.jsx";
import "./Register.css";
import { useSupabase } from "../../../lib/hooks/useSupabase.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const { register, guestLogin } = useSupabase();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      setLoginSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  const loginAsGuest = async (e) => {
    e.preventDefault();
    const guest = await guestLogin();
    navigate("/");
    console.log(guest);
  };

  return (
    <>
      <Header />
      <div className="register-screen">
        <h1 className="register-header">Register</h1>
        <form className="register-form">
          <input
            className="register-email"
            type="email"
            placeholder="email"
            value={email}
            onChange={handleEmail}
          />
          <input
            className="register-password"
            type="password"
            placeholder="password"
            value={password}
            onChange={handlePassword}
          />
          {/* <input type="password" placeholder="confirm password" /> */}
          {error !== "" && <p style={{ color: "red" }}>{error}</p>}
          {loginSuccess === true && (
            <p style={{ color: "green" }}>
              Logged in successfully. Redirecting to login screen
            </p>
          )}
          <button className="register-submit" onClick={registerUser}>
            register
          </button>
          <p>
            or
            <button onClick={loginAsGuest} className="guest-login">
              continue as a guest
            </button>{" "}
          </p>
        </form>
      </div>
    </>
  );
}

export default Register;
