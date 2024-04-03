import React, { useEffect, useState } from "react";
import { getComments, getPostsAll, getReaction, getShare } from "../../../../../services/pages/homeServices";
import { Link } from "react-router-dom";
import "../css/index.css";
import avatar from "../../../../../assets/khanhphan.jpg";
import { getMedia } from "../../../../../services/pages/homeServices";
import { SearchOutlined, HomeFilled, BellFilled, UserOutlined, HeartOutlined, RedditCircleFilled, LoadingOutlined, CommentOutlined } from '@ant-design/icons';
import moment from 'moment';
export const HomeScreen1 = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Sử dụng state để theo dõi trạng thái loading

  const search = () => {
    alert("Chức năng đang được phát triển")
  }
  const formatTime = createdAt => {
    const currentTime = moment();
    const postTime = moment(createdAt);
    const diffInSeconds = currentTime.diff(postTime, 'seconds');

    if (diffInSeconds < 1) {
      return 'Vừa đăng';
    } else if (diffInSeconds < 60) {
      return `${diffInSeconds} giây trước`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} phút trước`;
    } else if (diffInSeconds < 24 * 3600) {
      return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
    } else if (diffInSeconds < 30 * 24 * 3600) {
      return `${Math.floor(diffInSeconds / (24 * 3600))} ngày trước`;
    } else if (diffInSeconds < 12 * 30 * 24 * 3600) {
      return `${Math.floor(diffInSeconds / (30 * 24 * 3600))} tháng trước`;
    } else {
      return `${Math.floor(diffInSeconds / (12 * 30 * 24 * 3600))} năm trước`;
    }
  };
  const onGetPosts = async () => {
    try {
      const res = await getPostsAll();
      const postsWithMedia = await Promise.all(
        res.map(async post => {
          const mediaResponse = await getMedia(post._id);
          const media = mediaResponse;
          const reactionResponse = await getReaction(post._id);
          const reaction = reactionResponse;
          const commentResponse = await getComments(post._id);
          const comment = commentResponse;
          const shareResponse = await getShare(post._id);
          const share = shareResponse;

          return {
            ...post,
            media,
            reaction,
            comment,
            share,

          };
        }),
      );
      setPosts(postsWithMedia);
      console.log('>>>>>>>>>>>>>>> postsWithMedia', postsWithMedia);
      setLoading(false); // Đánh dấu việc kết thúc tải dữ liệu
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
// comment
  useEffect(() => {
    onGetPosts();
  }, []);

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

  const PostItem = ({ posts }) => {
   
    return (
      <div className="post-item">
        <div className="post-header">
          <img src={posts.idUsers?.avatar} alt="Avatar" className="avatar" />
          <div>
            <div className="username">{posts.idUsers?.name}</div>
            <div className="time">{formatTime(posts.createAt)}</div>
          </div>
        </div>
        
        <div className="post-description">{posts.content}</div>
        {
          posts.media.map((item, index) => (
            <img key={index} src={item.url} alt="Post" className="post-image" />
          ))
        }
        <HeartOutlined className="iconheart" />
        <Link key={posts._id} to={`/posts/test`}>
          <CommentOutlined className="iconheart" />
        </Link>
        <div className="post-description-heart">{posts.reaction.length} Cảm xúc</div>
        <Link key={posts._id} to={`/posts/test`}>
          <div className="post-description-heart">Xem {posts.comment.length} Bình luận</div>
        </Link>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="left-side">
        <div className="textlogo">Sweet</div>
        <div className="item1" onClick={search}>
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
        {loading ? ( // Kiểm tra trạng thái loading để hiển thị nút xoay xoay
          <div className="list-view">
            <LoadingOutlined className="loading" />
          </div>
        ) : (
          <>
            <div className="list-view">
              {posts.map((item, index) => (
                <PostItem key={index} posts={item} />
              ))}
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
          </>
        )}
      </div>
    </div>
  );
};
