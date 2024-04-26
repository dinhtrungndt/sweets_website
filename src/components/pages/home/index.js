import React, { useEffect, useState } from "react";
import "./css/home.css";
import avatar from "../../../assets/khanhphan.jpg";
import { Swiper } from "swiper/react";
import ReactPlayer from "react-player";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  SearchOutlined,
  HomeFilled,
  BellFilled,
  UserOutlined,
  HeartOutlined,
  RedditCircleFilled,
} from "@ant-design/icons";
import {
  getComments,
  getMedia,
  getPostsAll,
  getReaction,
  getShare,
} from "../../../services/pages/homeServices";
import moment from "moment/moment";

export const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);

  const onGetPosts = async () => {
    try {
      const res = await getPostsAll();
      const postsWithMedia = await Promise.all(
        res.map(async (post) => {
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
        })
      );
      setPosts(postsWithMedia);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formatTime = (createdAt) => {
    const currentTime = moment();
    const postTime = moment(createdAt);
    const diffInSeconds = currentTime.diff(postTime, "seconds");

    if (diffInSeconds < 1) {
      return "Vừa đăng";
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
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const filteredPosts = posts.filter(
    (post) => post.idTypePosts.name === "Bài viết"
  );

  // console.log(">>>>>>>>>>>>> filteredPosts", filteredPosts);

  useEffect(() => {
    onGetPosts();
  }, []);

  const PostItem = ({ postData }) => {
    // console.log(">>>>>>>>>>>>> postData", postData);
    return (
      <div className="post-item">
        <div className="post-header">
          <img src={postData.idUsers?.avatar} alt="Avatar" className="avatar" />
          <div>
            <div className="username">{postData.idUsers?.name}</div>
            <div className="time">{formatTime(postData.createAt)}</div>
          </div>
        </div>
        <div className="post-description">{postData?.content}</div>
        {postData.media.length > 0 ? (
          <div className="container_media">
            <Slider {...settings}>
              {postData.media?.map((media, index) => (
                <div key={media._id}>
                  {media.type === "image" ? (
                    <>
                      <img src={media.url.join()} className="posts" />
                    </>
                  ) : (
                    <ReactPlayer
                      url={media.url.join()}
                      width={550}
                      height={400}
                      controls
                      thumbnail={media.url.join()}
                      // autoplay={true}
                      className="posts"
                    />
                  )}
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <div style={{ height: 0 }} />
        )}
        <div className="iconheart-like">
          <HeartOutlined className="iconheart" />
          <div className="post-description-heart">
            {postData?.reaction.length} lượt thích
          </div>
        </div>
      </div>
    );
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
    alert("Chức năng đang được phát triển");
  };

  const friend = [
    {
      avatar: avatar,
      username: "Nguyễn Hữu Dũng",
      date: "12/12/2000",
    },
    {
      avatar: avatar,
      username: "Nguyễn Đình Trưng",
      date: "12/12/2000",
    },
  ];
  return (
    <div className="container">
      <div className="left-side">
        <div className="textlogo">Sweets</div>
        <div className="item1" onClick={search}>
          <HomeFilled style={{ fontSize: "25px", color: "black" }} />
          <div className="txttrangchu">Trang chủ</div>
        </div>
        <div className="item1">
          <SearchOutlined style={{ fontSize: "25px", color: "black" }} />
          <div className="txttrangchu">Tìm kiếm</div>
        </div>
        <div className="item1">
          <BellFilled style={{ fontSize: "25px", color: "black" }} />
          <div className="txttrangchu">Thông báo</div>
        </div>

        <div className="item1">
          <RedditCircleFilled style={{ fontSize: "25px", color: "black" }} />
          <div className="txttrangchu">Story</div>
        </div>
        <div className="item1">
          <UserOutlined style={{ fontSize: "25px", color: "black" }} />
          <div className="txttrangchu">Trang cá nhân</div>
        </div>
      </div>
      <div className="right-side">
        <div className="list-view">
          {filteredPosts.map((item, index) => (
            <PostItem key={index} postData={item} />
          ))}
        </div>
        <div className="right-side-footer">
          <div className="post-header1">
            <img src={avatar} alt="Avatar" className="avatar" />
            <div>
              <div className="username1">Ngày sinh</div>
              <div className="username">Nguyễn Văn A</div>
            </div>
            <div className="chuyentaikhoan">Chuyển</div>
          </div>
          <div className="friend">Danh sách bạn bè gần đây</div>
          <div className="list-view-friend">
            {friend.map((friend, index) => (
              <Friend key={index} friend={friend} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
