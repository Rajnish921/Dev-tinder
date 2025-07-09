import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // <-- Add this line
// <-- Add this line
import { addUser } from "./utils/userSlice"; // Import the addUser action
const Login = () => {
  const [email, setEmail] = useState("rajnish@gmail.com");
  const [password, setPassword] = useState("Rajnish@1235");

  const dispatch = useDispatch();
  const navigate = useNavigate(); // <-- Add this line if you want to navigate after login
  const [error, setError] = useState("");
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "/auth/login",
        { Email: email, Password: password },
        { withCredentials: true }
      );
      console.log(res.data);
      dispatch(addUser(res.data));
      return navigate("/"); // <-- Navigate to profile after successful login
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend ">Email ID</legend>
              <input
                type="text"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
          </div>
          <div>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend ">Password</legend>
              <input
                type="input"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
