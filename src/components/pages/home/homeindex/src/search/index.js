import React, { useEffect, useState } from "react";
import "../../css/index.css";
import "../../css/search.css";
import { ChatPage } from "../chat";
import { ChatPageIn } from "../chat/ChatPageIn";
import { getUserByID } from "../../../../../../services/pages/userServices";
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
import { Link, useNavigate } from "react-router-dom";
import toast, { toastConfig } from "react-simple-toasts";
import ReactPlayer from "react-player";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-simple-toasts/dist/theme/dark.css";
import {
  addHistorySearch,
  getComments,
  getMedia,
  getPosts,
  getReaction,
  getShare,
  likeByPost,
} from "../../../../../../services/pages/homeServices";
import moment from "moment";
import { Button } from "antd";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { RiShareForwardLine } from "react-icons/ri";

export const SearchPage = () => {
  const userString = localStorage.getItem("iduser");
  const user = JSON.parse(userString);
  const [userA, setUserA] = useState(null);
  const [friendInbox, setFriendInbox] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [listUserSearch, setListUserSearch] = useState([]);
  const navigate = useNavigate();
  toastConfig({ theme: "dark" });

  // console.log("posts", posts);

  const onPostHistorySearch = async () => {
    const idUsers = user;
    const res = await addHistorySearch(idUsers, searchValue);
    // console.log(">>>>>>>>>>>>>>> onPostHistorySearch", res);
    setListUserSearch(res);
  };

  const handleSearch = async (text) => {
    setLoading(true);
    setSearchValue(text);
    if (text !== "") {
      await onGetPosts();
      await onPostHistorySearch();
    } else {
      return;
    }
    setLoading(false);
  };

  const onGetPosts = async () => {
    try {
      const res = await getPosts(user);
      const postsWithMedia = (
        await Promise.all(
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
                reactionItem.idUsers._id === user &&
                reactionItem.type === "Thích"
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
        )
      ).filter(
        (post) =>
          post.idTypePosts.name === "Bài viết" &&
          post.content.toLowerCase().includes(searchValue.toLowerCase())
      );
      setPosts(postsWithMedia);
      // console.log(">>>>>>>>>>>>>>> postsWithMedia", postsWithMedia);
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

  const onGetByUserId = async () => {
    try {
      const response = await getUserByID(user);
      //   console.log("response", response);
      setUserA(response);
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const handleIndex = () => {
    window.location.href = "/posts";
  };

  const handleLogOut = () => {
    localStorage.removeItem("iduser");
    window.location.href = "/";
  };

  const handleSearchHere = () => {
    navigate("/search");
  };

  const functionPT = () => {
    toast("Chức năng đang được phát triển !!!", "warning", "top-right", 3000);
  };

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
          {posts.liked ? (
            <FcLike
              className="iconheart liked"
              onClick={() => handleLike(posts._id)}
            />
          ) : (
            <FcLikePlaceholder
              className="iconheart"
              onClick={() => handleLike(posts._id)}
            />
          )}
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

  useEffect(() => {
    onGetByUserId();
  }, []);

  useEffect(() => {
    handleSearch(searchValue);
  }, [searchValue]);

  useEffect(() => {
    setPosts(posts);
  }, [posts]);

  return (
    <div className="container">
      <div className="left-side">
        <div className="textlogo">Sweets</div>
        <div className="item1" onClick={handleIndex}>
          <HomeFilled className="icon" />
          <div className="txttrangchu">Trang chủ</div>
        </div>
        <div className="item1" onClick={handleSearchHere}>
          <SearchOutlined className="icon" />
          <div className="txttrangchu">Tìm kiếm</div>
        </div>
        <div className="item1" onClick={functionPT}>
          <BellFilled className="icon" />
          <div className="txttrangchu">Thông báo</div>
        </div>
        <div className="item1" onClick={functionPT}>
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
        <>
          <div className="search-header">
            <input
              type="text"
              className="search-container"
              placeholder="Tìm kiếm người dùng và bài viết"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button
              type="primary"
              className="search-button"
              onClick={() => handleSearch(searchValue)}
            >
              Tìm kiếm
            </Button>
            {/* {console.log("listUserSearch", listUserSearch)} */}
            <>
              {listUserSearch?.length > 0 && searchValue !== "" ? (
                <>
                  {loading ? (
                    <LoadingOutlined className="loading-icon" />
                  ) : (
                    <>
                      <p className="search-people">Người dùng</p>
                      {listUserSearch.map((user, index) => (
                        <div key={index} className="search-item">
                          <img
                            src={user?.avatar}
                            alt="Avatar"
                            className="avatar"
                          />
                          <div className="search-item-name">{user?.name}</div>
                        </div>
                      ))}
                      <p className="search-people">Bài viết</p>
                      {posts.map((item, index) => (
                        <PostItem key={index} posts={item} />
                      ))}
                    </>
                  )}
                </>
              ) : (
                <p>Không có kết quả tìm kiếm</p>
              )}
            </>
          </div>
        </>

        <div className="right-side-footer">
          <div className="post-header1">
            <img src={userA?.avatar} alt="Avatar" className="avatar" />
            <div>
              <div className="username1">
                {userA?.date
                  ? moment(userA?.dateOfBirth).format("DD/MM/YYYY")
                  : ""}
              </div>
              <div className="username">{userA?.name}</div>
            </div>
            <div onClick={handleLogOut} className="chuyentaikhoan">
              Chuyển
            </div>
          </div>
          <div className="friend">Danh sách bạn bè </div>
          <div className="list-chat">
            <ChatPage
              // cancel={() => setOpenModelMess(false)}
              friend={(idFriend) => {
                setFriendInbox(idFriend);
              }}
            />
          </div>
        </div>
      </div>
      {friendInbox === null ? <></> : <ChatPageIn friendInbox={friendInbox} />}
    </div>
  );
};
