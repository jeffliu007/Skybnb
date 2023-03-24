import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  const demoLogin = () => {
    closeModal();
    return dispatch(
      sessionActions.login({ credential: "Demo-lition", password: "password" })
    );
  };

  return (
    <div className="login-form-container">
      <h1>Log In</h1>
      <form className="login-inner-form" onSubmit={handleSubmit}>
        <ul className="errors-ul">
          {errors.map((error, idx) => (
            <li key={idx} className="errors-li">
              {error}
            </li>
          ))}
        </ul>
        <label className="login-label">
          Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            className="login-form-input"
          />
        </label>
        <label className="password-label">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-form-input"
          />
        </label>
        <button type="submit" className="submit-button">
          Log In
        </button>
        <button className="submit-button" onClick={demoLogin}>
          Demo
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
