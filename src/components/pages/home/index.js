import React, { useEffect, useState } from "react";
import { getPostsAll } from "../../../services/pages/homeServices";
import { Link } from "react-router-dom";

export const HomeScreen = () => {
  const [posts, setPosts] = useState([]);

  const onGetPosts = async () => {
    try {
      const res = await getPostsAll();
      setPosts(res);
    } catch (error) {
      console.log(">>>> errorerror ", error);
    }
  };

  useEffect(() => {
    onGetPosts();
  }, []);

  return (
    <div>
      {posts.map((item, index) => (
        <div key={index}>
          <p style={{ color: "#000" }}>{item._id}</p>
          <p style={{ color: "#000" }}>{item.content}</p>
          <Link key={item._id} to={`/posts/${item._id}`}>
            View Detail
          </Link>
        </div>
      ))}
    </div>
  );
};
