// Tạo một file mới: DetailScreen.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostsDetail } from "../../../services/pages/homeServices";
import '../../pages/home/homeindex/css/index.css';
import { getComments, getPostsAll, getReaction, getShare, getMedia } from "../../../services/pages/homeServices";
import { Link } from "react-router-dom";
import anh from "../../../assets/khanhphan.jpg";
import avatar from "../../../assets/post.jpg";

import { SearchOutlined, HomeFilled, BellFilled, UserOutlined, HeartOutlined, RedditCircleFilled, LoadingOutlined, CommentOutlined } from '@ant-design/icons';
import moment from 'moment';
export const DetailScreen = () => {
  const { id } = useParams();
  const [posts, setPost] = useState();
  // const [loading, setLoading] = useState(true);

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
  
  const comments = [
    {
      avatar: anh,
      username: "Nguyễn Hữu Dũng",
      text: "Pro quá bạn ơi"
    },
    {
      avatar: anh,
      username: "Nguyễn Đình Trưng",
      text: "Ối dồi ôi"
    },
    {
      avatar: anh,
      username: "Mang Tuấn Vĩ",
      text: "Nay được nghỉ học hả"
    },
    {
      avatar: anh,
      username: "Phùng Văn Vũ Luân",
      text: "Hôm nay đi chơi không bạn"
    }
  ];
  const friend = [
    {
      avatar: avatar,
      username: "Nguyễn Hữu Dũng",
      date: "12/12/2000",

    },
    {
      avatar: avatar,
      username: "Nguyễn Đình Trứng",
      date: "12/12/2000",
    },
  ]
  const handleIndex = () => {
    window.location.href = "/posts";
  };

  const Friend = ({ friend }) => {
    return (
      <div className="post-header1">
        <img src={friend.avatar} alt="Avatar" className="avatar" />
        <div>
          <div className="username">{friend.username}</div>
          <div className="username1">{friend.date}</div>
        </div>
      </div>
    );
  };
  const search = () => {
    alert("Chức năng đang được phát triển")
  }
  return (

    <div className="container">
      <div className="left-side">
        <div className="textlogo">Sweet</div>
        <div className="item1" onClick={handleIndex}>
          <HomeFilled className="icon" />
          <div className="txttrangchu">
            Trang chủ
          </div>
        </div>
        <div className="item1" onClick={search}>
          <SearchOutlined className="icon" />
          <div className="txttrangchu">
            Tìm kiếm
          </div>
        </div>
        <div className="item1" onClick={search}>
          <BellFilled className="icon" />
          <div className="txttrangchu">
            Thông báo
          </div>
        </div>
        <div className="item1" onClick={search}>
          <RedditCircleFilled className="icon" />
          <div className="txttrangchu">
            Story
          </div>
        </div>
        <div className="item1" onClick={search}>
          <UserOutlined className="icon" />
          <div className="txttrangchu">
            Trang cá nhân
          </div>
        </div>
      </div>
      <div className="right-side">
        {/* {loading ? ( // Kiểm tra trạng thái loading để hiển thị nút xoay xoay
          <div className="list-view">
            <LoadingOutlined className="loading" />
          </div>
        ) : (
          <> */}
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

         

          <div className="post-description-heart">2 Cảm xúc</div>
          <div className="comments-section">
            {comments.map((comment, index) => (
              <div key={index} className="comment">
                <div className="comment-avatar">
                  <img src={comment.avatar} alt="Avatar" />
                </div>
                <div className="comment-content">
                  <div className="comment-username">{comment.username}</div>
                  <div className="comment-text">{comment.text}</div>
                </div>
              </div>
            ))}
          </div>



        </div>

        {/* </>
        )} */}
        
      </div>
      <div className="right-side-footer">
              <div className="post-header1">
                <img src={avatar} alt="Avatar" className="avatar" />
                <div>
                  <div className="username1">Ngày sinh</div>
                  <div className="username">Nguyễn Hữu Dũng</div>
                </div>
                <div className="chuyentaikhoan">Chuyển</div>
              </div>
              <div className="friend">
                Danh sách bạn bè gần đây
              </div>
              <div className="list-view-friend">
                {friend.map((friend, index) => (
                  <Friend key={index} friend={friend} />
                ))}
              </div>
            </div>
    </div>



  );
};
