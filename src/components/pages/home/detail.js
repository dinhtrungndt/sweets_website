// Tạo một file mới: DetailScreen.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostsDetail } from "../../../services/pages/homeServices";

export const DetailScreen = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await getPostsDetail(id);
        setPost(response.post);
      } catch (error) {
        console.log("Error fetching post detail:", error);
      }
    };

    fetchPostDetail();
  }, [id]);

  return (
    <div>
      {post ? (
        <div>
          <h2>{post.content}</h2>
          
          {/* Hiển thị các thông tin khác của bài viết */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
