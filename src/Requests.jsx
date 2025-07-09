import React from "react";
import { BASE_URL } from "./utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "./utils/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.requests));
      console.log(res.data.requests);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return <div>Loading requests...</div>;
  if (requests.length === 0) return <div>No requests found.</div>;

  return (
    <div className="flex flex-wrap gap-4 justify-center my-10">
      {requests.map((req) => (
        <div key={req._id} className="card bg-base-200 w-64 shadow">
          <div className="card-body items-center">
            <img
              src={req.fromUserid?.photoUrl}
              alt={`${req.fromUserid?.FirstName} ${req.fromUserid?.LastName}`}
              className="w-20 h-20 rounded-full mb-2"
            />
            <h2 className="card-title text-lg">
              {req.fromUserid?.FirstName} {req.fromUserid?.LastName}
            </h2>
            <p>Status: {req.status}</p>
            <div className="flex gap-2">
              <button className="btn btn-primary">Reject</button>
              <button className="btn btn-secondary">Accept</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Requests;
