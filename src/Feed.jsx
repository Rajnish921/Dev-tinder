import axios from "axios";
import React from "react";
import { addFeed } from "./utils/feedSlice"; // Adjust the import path as needed
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "./utils/constant"; // Adjust the import path as needed
import Card from "./Card"; // Adjust the import path as needed

const Feed = () => {
  const feed = useSelector((state) => state.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
      // You can use the response data here if needed
    } catch (err) {
      console.error("Error fetching feed:", err);
    }
  };

  React.useEffect(() => {
    getFeed();
  }, []);

  return (
    feed && (
      <div className="flex justify-center my-10">
        <Card user={feed[3]} />
      </div>
    )
  );
};

export default Feed;
