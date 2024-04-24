import React, { useEffect, useState } from "react";
import {
  getComments,
  getPosts,
  getPostsAll,
  getReaction,
  getShare,
  likeByPost,
} from "../../../../../services/pages/homeServices";
import { Link } from "react-router-dom";
import "../css/index.css";
import avatar from "../../../../../assets/khanhphan.jpg";
import ReactPlayer from "react-player";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getMedia } from "../../../../../services/pages/homeServices";
import {
  SearchOutlined,
  HomeFilled,
  BellFilled,
  UserOutlined,
  HeartOutlined,
  RedditCircleFilled,
  LoadingOutlined,
  CommentOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { IoIosShareAlt } from "react-icons/io";
import { RiShareForwardLine } from "react-icons/ri";
import { AiOutlineLike } from "react-icons/ai";
import StoryPage from "../../story";
import toast, { toastConfig } from "react-simple-toasts";
import "react-simple-toasts/dist/theme/dark.css";
import { FaFacebookMessenger } from "react-icons/fa";
import { Modal } from "antd";
import { ChatPage } from "./chat";
import { ChatPageIn } from "./chat/ChatPageIn";

export const HomeScreen1 = (props) => {
  // const { userId } = props;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userString = localStorage.getItem("iduser");
  const user = JSON.parse(userString);

  // console.log(">>>>>>>>>>>>>>> user", user);

  // const getUserFromLocalStorage = () => {
  //   const userString = localStorage.getItem("iduser");
  //   if (userString) {
  //     return JSON.parse(userString);
  //   }
  //   return null;
  // };

  // const user = getUserFromLocalStorage();
  toastConfig({ theme: "dark" });
  const search = () => {
    toast("Chức năng đang được phát triển !!!", "success", "top-right", 3000);
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
  const onGetPosts = async () => {
    try {
      const res = await getPosts(user);
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

          const liked = reaction.some(
            (reactionItem) =>
              reactionItem.idUsers._id === user && reactionItem.type === "Thích"
          );

          return {
            ...post,
            media,
            reaction,
            comment,
            share,
            liked,
          };
        })
      );
      setPosts(postsWithMedia);
      // console.log(">>>>>>>>>>>>>>> postsWithMedia", postsWithMedia);
      setLoading(false); // Đánh dấu việc kết thúc tải dữ liệu
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filteredPosts = posts.filter(
    (post) => post.idTypePosts.name === "Bài viết"
  );

  const filteredStori = posts.filter(
    (post) => post.idTypePosts.name === "Story"
  );

  // console.log(">>>>>>>>>>>>>>> filteredPosts", filteredStori);

  const handleLike = async (idPosts) => {
    try {
      const idUsers = user;
      const type = "Thích";
      const response = await likeByPost(idUsers, idPosts, type);

      if (response.status === 1) {
        const updatedPosts = posts.map((post) => {
          if (post._id === idPosts) {
            const updatedLiked = !post.liked;
            const updatedReaction = post.reaction.map((reactionItem) => {
              if (reactionItem.idUsers._id === user) {
                return { ...reactionItem, type: "Thích" };
              }
              return reactionItem;
            });
            return {
              ...post,
              reaction: updatedReaction,
              liked: updatedLiked,
            };
          }
          return post;
        });
        // console.log("Like bài viết thành công:", updatedPosts);
        setPosts(updatedPosts);

        // Lưu trạng thái liked vào localStorage
        updatedPosts.forEach((post) => {
          localStorage.setItem(`liked_${post._id}`, post.liked);
        });
        await onGetPosts();
      } else {
        console.error("Lỗi khi thay đổi trạng thái like:", response.message);
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu API:", error);
    }
  };

  useEffect(() => {
    const restoreLikedState = () => {
      const updatedPosts = posts.map((post) => {
        const liked = localStorage.getItem(`liked_${post._id}`) === "true";

        return {
          ...post,
          liked,
        };
      });
      setPosts(updatedPosts);
    };

    restoreLikedState();
  }, []);

  // comment
  useEffect(() => {
    onGetPosts();
  }, []);

  const friend = [
    {
      avatar: avatar,
      username: "Mang Tuấn Vĩ",
      date: "12/12/2000",
    },
    {
      avatar: avatar,
      username: "Nguyễn Đình Trứng",
      date: "12/12/2000",
    },
  ];

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
  const handleIndex = () => {
    window.location.href = "/posts";
  };

  const PostItem = ({ posts }) => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    const handleShare = (idPosts) => {
      const url = `https://sweets-liart.vercel.app/posts/detail/${idPosts}`;
      navigator.clipboard.writeText(url);
      toast("Sao chép link thành công! 🎉✨💖", "success", "top-right", 3000);
    };

    return (
      <div className="post-item">
        <div className="post-header">
          <img src={posts.idUsers?.avatar} alt="Avatar" className="avatar" />
          <div>
            <div className="username">{posts.idUsers?.name}</div>
            <div style={{ display: "flex" }}>
              <div className="time">{formatTime(posts.createAt)}</div>
              <div className="object">-</div>
              <div className="object">{posts.idObject.name}</div>
            </div>
          </div>
        </div>
        {/* {console.log(">>>>>>>>>>>>>>> posts", posts)} */}
        <div className="post-description">{posts.content}</div>
        {posts.media.length === 1 ? (
          <>
            {posts.media.map((media, index) => (
              <div key={index}>
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
          </>
        ) : (
          <Slider {...settings}>
            {posts.media.map((media, index) => (
              <div key={index}>
                {media.type === "image" ? (
                  <img src={media.url.join()} className="posts" />
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
        )}
        <div className="flex_reactions">
          <AiOutlineLike
            className={posts.liked ? "iconheart liked" : "iconheart"}
            onClick={() => handleLike(posts._id)}
          />
          <p>{posts.reaction.length}</p>
          <Link
            key={posts._id}
            to={`/posts/detail/${posts._id}`}
            className="flex_reactionsLink"
          >
            <div className="flex_reactions">
              <CommentOutlined className="iconheart" />
              <p className="text-CS">Bình luận</p>
            </div>
          </Link>
          <div
            className="flex_reactions"
            onClick={() => handleShare(posts._id)}
          >
            <RiShareForwardLine className="iconheart" />
            <p className="text-CS">Chia sẻ</p>
          </div>
        </div>
        <Link key={posts._id} to={`/posts/detail/${posts._id}`}>
          <div className="post-description-heart">
            <p className="label-seenComments">
              Xem {posts.comment.length} Bình luận
            </p>
          </div>
        </Link>
      </div>
    );
  };

  const handleLogOut = () => {
    localStorage.removeItem("iduser");
    window.location.href = "/";
  };

  const [openModelMess, setOpenModelMess] = useState(false);
  const [friendInbox, setFriendInbox] = useState(null);

  const handleOk = () => {
    setOpenModelMess(false);
  };
  const handleCancel = () => {
    setOpenModelMess(false);
  };

  return (
    <div className="container">
      <div className="left-side">
        <div className="textlogo">Sweet</div>
        <div className="item1" onClick={handleIndex}>
          <HomeFilled className="icon" />
          <div className="txttrangchu">Trang chủ</div>
        </div>
        <div className="item1" onClick={search}>
          <SearchOutlined className="icon" />
          <div className="txttrangchu">Tìm kiếm</div>
        </div>
        <div className="item1" onClick={search}>
          <BellFilled className="icon" />
          <div className="txttrangchu">Thông báo</div>
        </div>
        <div className="item1" onClick={search}>
          <UserOutlined className="icon" />
          <div className="txttrangchu">Trang cá nhân</div>
        </div>
        {/* Đăng xuất */}
        <div className="item1" onClick={handleLogOut}>
          <LogoutOutlined className="icon" />
          <div className="txttrangchu">Đăng xuất</div>
        </div>
      </div>
      <div className="right-side">
        {loading ? (
          <div className="list-view">
            <LoadingOutlined className="loading" />
          </div>
        ) : (
          <>
            <div className="list-view">
              <StoryPage user={user} story={filteredStori} />
              {filteredPosts.map((item, index) => (
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
              <div className="friend">Danh sách bạn bè gần đây</div>
              <div className="list-view-friend">
                {friend.map((friend, index) => (
                  <Friend key={index} friend={friend} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="floating-button" onClick={() => setOpenModelMess(true)}>
        <FaFacebookMessenger className="icon-floating-button" />
      </div>
      {friendInbox === null ? <></> : <ChatPageIn friendInbox={friendInbox} />}
      <>
        <Modal
          open={openModelMess}
          onOk={handleOk}
          onCancel={handleCancel}
          closeIcon={null}
          centered
          footer={[<div key="back"></div>]}
        >
          <ChatPage
            cancel={() => setOpenModelMess(false)}
            friend={(idFriend) => {
              setFriendInbox(idFriend);
            }}
          />
        </Modal>
      </>
    </div>
  );
};
