import React from "react";
import axios from "axios";
import { BASE_URL } from "./utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "./utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((state) => state.connections);
  const dispatch = useDispatch();

  const fetchedConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data.connections);
      dispatch(addConnection(res.data.connections));
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  useEffect(() => {
    fetchedConnections();
  }, []);

  if (!connections) return null;
  if (connections.length === 0) {
    return (
      <div className="flex justify-center my-10">No connections found.</div>
    );
  }

  return (
    <div>
      <h1 className="text-red-500  flex justify-center">Connections</h1>
      <div className="flex flex-wrap gap-4 justify-center my-10">
        {connections.map((conn) => (
          <div key={conn._id} className="card bg-base-200 w-64 shadow">
            <div className="card-body items-center">
              <img
                src={conn.photoUrl}
                alt={conn.FirstName}
                className="w-20 h-20 rounded-full mb-2"
              />
              <h2 className="card-title text-lg">
                {conn.FirstName} {conn.LastName}
              </h2>
              <div className="flex gap-4 text-sm mb-2">
                {conn.age && <span>Age: {conn.age}</span>}
                {conn.Gender && <span>Gender: {conn.Gender}</span>}
              </div>
              {conn.About && (
                <p className="text-xs text-center text-gray-500">
                  {conn.About}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
