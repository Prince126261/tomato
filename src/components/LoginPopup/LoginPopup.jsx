import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken, token } = useContext(StoreContext)
  const [currState, setCurrState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const data = { name, email, password };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = currState.toLowerCase() === "sign up" ? "register" : "login";
      const res = await axios.post(`${url}/api/user/${endpoint}`, data, { withCredentials: true });
      // Close the popup on success
      localStorage.setItem("token", res.data.token);
      // Store user data in localStorage
      setToken(res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      // Clear the token in case of login
      setShowLogin(false);
      // Success toast (optional)
      toast.success(res.data.message || "Success!");

      // Clear fields after success
      setName("");
      setEmail("");
      setPassword("");

    } catch (err) {
      // Server se error message
      const errorMsg = err.response?.data?.message || "An error occurred";
      toast.error(errorMsg);
      console.error("Error:", err);
    }
  };

console.log(token, "Token in LoginPopup");
  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="close"
          />
        </div>

        {/* Inputs */}
        <div className="login-popup-input">
          {currState === "Sign Up" && (
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="login-popup-button">
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {/* Terms */}
        <div className="login-popup-condition">
          <input type="checkbox" id="policy" required />
          <p>By continuing, you agree to our policy.</p>
        </div>

        {/* Switch State */}
        {currState === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login Here</span>
          </p>
        ) : (
          <p>
            Create new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Create account</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
