import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
// Adjust the path as needed

const BASE_URL = "http://localhost:5000"; // Change to your backend URL

const Body = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data)); // or res.data.user if needed
    } catch (err) {
      if (err.status === 401) {
        Navigate("/login ");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <Outlet /> {/* or your main content */}
      </div>
      <Footer />
    </div>
  );
};

export default Body;
