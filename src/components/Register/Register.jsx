import Header from "../Header/Header";
import "./Register.css";
import { useSupabase } from "../../../lib/hooks/useSupabase.js";

function Register() {

  const { register } = useSupabase();

  return (
    <>
      <Header />
      <div className="register-screen">
        <h1>Register</h1>
        <form className="register-form">
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input type="password" placeholder="confirm password" />
          <button onClick={register}>register</button>
        </form>
      </div>
    </>
  );
}

export default Register;
