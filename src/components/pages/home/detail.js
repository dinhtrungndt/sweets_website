// Tạo một file mới: DetailScreen.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostsDetail } from "../../../services/pages/homeServices";
import '../../pages/home/homeindex/css/index.css';
import { getComments, getPostsAll, getReaction, getShare, getMedia } from "../../../services/pages/homeServices";
import { Link } from "react-router-dom";
import anh from "../../../assets/khanhphan.jpg";

import { SearchOutlined, HomeFilled, BellFilled, UserOutlined, HeartOutlined, RedditCircleFilled, LoadingOutlined, CommentOutlined } from '@ant-design/icons';
import moment from 'moment';
export const DetailScreen = () => {
  const { id } = useParams();
  const [posts, setPost] = useState();

  // useEffect(() => {
  //   const fetchPostDetail = async () => {
  //     try {
  //       const response = await getPostsDetail(id);
  //       const mediaResponse = await getMedia(response._id);
  //       const media = mediaResponse;
  //       const reactionResponse = await getReaction(response._id);
  //       const reaction = reactionResponse;
  //       const commentResponse = await getComments(response._id);
  //       const comment = commentResponse;
  //       const shareResponse = await getShare(response._id);
  //       const share = shareResponse;
  //       setPost({
  //         ...response,
  //         media,
  //         reaction,
  //         comment,
  //         share,
  //       });
  //       console.log(posts)
  //     } catch (error) {
  //       console.log("Error fetching post detail:", error);
  //     }
  //   };



  //   fetchPostDetail();
  // }, [id]);
  // const formatTime = createdAt => {
  //   const currentTime = moment();
  //   const postTime = moment(createdAt);
  //   const diffInSeconds = currentTime.diff(postTime, 'seconds');

  //   if (diffInSeconds < 1) {
  //     return 'Vừa đăng';
  //   } else if (diffInSeconds < 60) {
  //     return `${diffInSeconds} giây trước`;
  //   } else if (diffInSeconds < 3600) {
  //     return `${Math.floor(diffInSeconds / 60)} phút trước`;
  //   } else if (diffInSeconds < 24 * 3600) {
  //     return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
  //   } else if (diffInSeconds < 30 * 24 * 3600) {
  //     return `${Math.floor(diffInSeconds / (24 * 3600))} ngày trước`;
  //   } else if (diffInSeconds < 12 * 30 * 24 * 3600) {
  //     return `${Math.floor(diffInSeconds / (30 * 24 * 3600))} tháng trước`;
  //   } else {
  //     return `${Math.floor(diffInSeconds / (12 * 30 * 24 * 3600))} năm trước`;
  //   }
  // };

  return (

    <div className="postitemdetail">
      <div className="post-header">
        <img src={anh} alt="Avatar" className="avatar" />
        <div>
          <div className="username">Nguyễn Hữu Dũng</div>
          <div className="time">12 Tiếng trước</div>
        </div>
      </div>
      <div className="post-description">Flex bạn luân</div>


      <img src={anh} alt="Post" className="post-image" />


      <HeartOutlined className="iconheart" />

      <CommentOutlined className="iconheart" />

      <div className="post-description-heart">2 Cảm xúc</div>

      <div className="post-description-heart">Xem  Bình luận</div>
      

    </div>



  );
};
