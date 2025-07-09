import React from "react";

const Card = ({ user }) => {
  const { FirstName, LastName, photoUrl, age, Gender, About } = user;
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
          <button className="btn btn-primary">ignore</button>
          <button className="btn btn-secondary">interested</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
