import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // <-- Add this line
// <-- Add this line
import { addUser } from "./utils/userSlice"; // Import the addUser action
import { BASE_URL } from "./utils/constant";
const Login = () => {
  const [email, setEmail] = useState("rajnish@gmail.com");
  const [password, setPassword] = useState("Rajnish@1235");
  const [LoginForm, setLoginForm] = useState(false);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");

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
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/auth/signup",
        { Email: email, Password: password, FirstName, LastName },
        { withCredentials: true }
      );
      console.log(res.data);
      dispatch(addUser(res.data.data));
      return navigate("/profile"); // <-- Navigate to profile after successful signup
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {LoginForm ? "Login" : "Signup"}
          </h2>
          {!LoginForm && (
            <>
              <div>
                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend ">First Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={FirstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend ">Last Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={LastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </div>
            </>
          )}
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
            <button
              className="btn btn-primary"
              onClick={LoginForm ? handleLogin : handleSignUp}
            >
              {LoginForm ? "Login" : "Signup"}
            </button>
          </div>
          <p
            className="m-auto cursor-pointer text-blue-500"
            onClick={() => setLoginForm((value) => !value)}
          >
            {LoginForm ? "Don't have an account?" : "Already have an account?"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
