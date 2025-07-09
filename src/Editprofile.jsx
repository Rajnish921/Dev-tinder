import React, { useState } from "react";
import Card from "./Card";
import { BASE_URL } from "./utils/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice"; // Adjust the import path as needed

const Editprofile = ({ user }) => {
  const [FirstName, setFirstName] = useState(user.FirstName);
  const [LastName, setLastName] = useState(user.LastName);
  const [age, setAge] = useState(user.age);
  const [Gender, setGender] = useState(user.Gender);
  const [About, setAbout] = useState(user.About);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl); // <-- Fix: add setPhotoUrl
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(false);

  const saveProfile = async () => {
    setError(""); // Reset error message
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          FirstName,
          LastName,
          age,
          Gender,
          About,
          photoUrl,
        },

        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data?.data));
      setProfile(true);
      setTimeout(() => {
        setProfile(false);
      }, 2000); // Hide the toast after 3 seconds
    } catch (err) {
      console.error("Error saving profile:", err.response.data);
      // Handle error appropriately, e.g., show a notification
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="w-full max-w-2xl flex">
          <div className="card bg-base-300 w-72 max-w-xs shadow-sm">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <fieldset className="fieldset my-1">
                  <legend className="fieldset-legend ">FirstName</legend>
                  <input
                    type="text"
                    className="input"
                    value={FirstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset my-1">
                  <legend className="fieldset-legend ">LastName</legend>
                  <input
                    type="text"
                    className="input"
                    value={LastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset my-1">
                  <legend className="fieldset-legend ">Age</legend>
                  <input
                    type="number"
                    className="input"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset my-1">
                  <legend className="fieldset-legend ">Photo URL</legend>
                  <input
                    type="text"
                    className="input"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset my-1">
                  <legend className="fieldset-legend ">Gender</legend>
                  <select
                    className="input"
                    value={Gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset my-1">
                  <legend className="fieldset-legend ">About</legend>
                  <textarea
                    className="input"
                    value={About}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </fieldset>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={saveProfile}>
                  save Profile
                </button>
              </div>
            </div>
          </div>
          <div className="ml-4 flex items-start w-72 max-w-xs">
            <Card
              user={{ FirstName, LastName, age, Gender, About, photoUrl }}
            />
          </div>
        </div>
      </div>
      {profile && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Editprofile;
