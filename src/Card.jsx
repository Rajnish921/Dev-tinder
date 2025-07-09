import React from "react";
import axios from "axios";
import { BASE_URL } from "./utils/constant"; // Adjust the import path as needed
import { removeUserFromFeed } from "./utils/feedSlice";
import { useDispatch } from "react-redux";

const Card = ({ user }) => {
  const { _id, FirstName, LastName, photoUrl, age, Gender, About } = user;
  const dispatch = useDispatch();
  const reviewRequest = async (status, toUserid) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + toUserid,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUserFromFeed(toUserid));
    } catch (error) {
      console.error("Error reviewing request:", error);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="user" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {FirstName} {LastName}
        </h2>
        {(age || Gender) && (
          <p>
            Age: {age} | Gender: {Gender}
          </p>
        )}
        <p className="text-red-50">About: {About}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => reviewRequest("ignore", _id)}
          >
            ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => reviewRequest("interested", _id)}
          >
            interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
