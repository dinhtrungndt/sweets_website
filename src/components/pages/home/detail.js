// Tạo một file mới: DetailScreen.js
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getPostsDetail,
  likeByPost,
  submitComments,
  submitCommentsC,
} from "../../../services/pages/homeServices";
import "../../pages/home/homeindex/css/index.css";
import ReactPlayer from "react-player";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  getComments,
  getPostsAll,
  getReaction,
  getShare,
  getMedia,
} from "../../../services/pages/homeServices";
import { Link } from "react-router-dom";
import anh from "../../../assets/khanhphan.jpg";
import avatar from "../../../assets/post.jpg";

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
import { Button } from "antd";
import { AiOutlineLike } from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import toast, { toastConfig } from "react-simple-toasts";
import "react-simple-toasts/dist/theme/dark.css";

export const DetailScreen = () => {
  const { id } = useParams();
  // const getUserFromLocalStorage = () => {
  //   const userString = localStorage.getItem("iduser");
  //   if (userString) {
  //     return JSON.parse(userString);
  //   }
  //   return null;
  // };
  // const user = getUserFromLocalStorage();
  const userString = localStorage.getItem("iduser");
  const user = JSON.parse(userString);
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [loading, setLoading] = useState(true);
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState([]);
  const [parentId, setParentId] = useState(null);
  const [parentUserName, setParentUserName] = useState(null);
  const postID = post.map((post) => post._id).join();
  const commentInputRef = useRef(null);
  // console.log(">>>>>>>>>>>>>>> postID", id);

  const onGetPosts = async () => {
    try {
      setIsLoading(true);
      const res = await getPostsDetail(id);
      // console.log(">>>>>>>>>>>>> resresres", res);

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
      setPost(postsWithMedia);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // console.log(">>>>>>>>>>>>>>> post", post);

  const reloadComments = async () => {
    try {
      const response = await getComments(id);
      // console.log("Thành công khi tải danh sách bình luận:", response);
      setComments(response);
    } catch (error) {
      console.error("Lỗi khi tải danh sách bình luận:", error);
    }
  };

  const submitComment = async () => {
    try {
      if (!commentContent) {
        return alert("Vui lòng nhập nội dung !");
      }

      if (parentId && parentUserName !== null) {
        await submitCommentsC(
          user,
          postID,
          parentId,
          commentContent,
          // imagePath,
          parentUserName._id
        );
      } else {
        await submitComments(
          user,
          postID,
          commentContent
          // imagePath,
        );
      }
      setCommentContent("");
      // setImagePath(null);
      // setImage('');
      setParentUserName(null);
      setIsLoading(false);
      await reloadComments();
      await onGetPosts();
    } catch (error) {
      console.error("Lỗi khi gửi comment:", error);
    } finally {
      setIsLoading(false);
      if (commentInputRef.current) {
        commentInputRef.current.value = "";
        await reloadComments();
      }
    }
  };

  useEffect(() => {
    onGetPosts();
  }, []);

  useEffect(() => {
    reloadComments();
  }, []);

  const handleReply = (id, name) => {
    setParentId(id);
    setParentUserName(name);
  };

  const renderComments = (comment) => {
    return (
      <>
        {comment.map((comment, index) => (
          <div
            key={index}
            className={`comment ${comment.idParent ? "child-comment" : ""}`}
          >
            <img
              src={comment.idUsers.avatar}
              alt="Avatar"
              className={`avatar ${comment.idParent ? "child-comment" : ""}`}
            />
            <div className="comment-content">
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="username">{comment.idUsers.name}</div>
                <div style={{ paddingLeft: 10, fontSize: 14 }}>
                  {formatTime(comment.createAt)}{" "}
                </div>
              </div>
              <div className="comment-text">{comment.content}</div>
              {comment.idParent === null ? (
                <>
                  <div
                    className="comment-phanhoi"
                    onClick={() => handleReply(comment?._id, comment?.idUsers)}
                  >
                    Phản hồi
                  </div>
                </>
              ) : (
                <div
                  className="comment-phanhoi"
                  onClick={() => handleReply(comment?._id, comment?.idUsers)}
                >
                  Phản hồi
                </div>
              )}
            </div>
            {comment.subComments && renderComments(comment.subComments)}
          </div>
        ))}
      </>
    );
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
  const search = () => {
    alert("Chức năng đang được phát triển");
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleIndex = () => {
    window.location.href = "/posts";
  };

  const handleLogOut = () => {
    localStorage.removeItem("iduser");
    window.location.href = "/";
  };

  const handleLike = async (idPosts) => {
    try {
      const idUsers = user;
      const type = "Thích";
      const response = await likeByPost(idUsers, idPosts, type);

      if (response.status === 1) {
        const updatedPosts = post.map((post) => {
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
        setPost(updatedPosts);

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

  return (
    <>
      {post.map((post, index) => {
        return (
          <div key={index} className="container">
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
              {/* {loading ? ( // Kiểm tra trạng thái loading để hiển thị nút xoay xoay
        <div className="list-view">
          <LoadingOutlined className="loading" />
        </div>
      ) : (
        <> */}
              <div className="postitemdetail">
                <div className="post-header">
                  <img
                    src={post.idUsers?.avatar}
                    alt="Avatar"
                    className="avatar"
                  />
                  <div>
                    <div className="username">{post?.idUsers?.name}</div>
                    <div className="time">{formatTime(post?.createdAt)}</div>
                  </div>
                </div>
                <div className="post-description">{post?.content}</div>
                {post?.media.length === 1 ? (
                  <>
                    {post.media.map((media, index) => (
                      <div key={media._id}>
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
                  </>
                ) : (
                  <Slider {...settings}>
                    {post?.media.map((media, index) => (
                      <div key={media._id}>
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
                    className={post.liked ? "iconheart liked" : "iconheart"}
                    onClick={() => handleLike(post._id)}
                  />
                  <p>{post.reaction.length}</p>
                  <Link
                    key={post._id}
                    to={`/posts/detail/${post._id}`}
                    className="flex_reactionsLink"
                  >
                    <div className="flex_reactions">
                      <CommentOutlined className="iconheart" />
                      <p className="text-CS">Bình luận</p>
                    </div>
                  </Link>
                  <div
                    className="flex_reactions"
                    onClick={() =>
                      toast(
                        "Sao chép link thành công! 🎉✨💖",
                        "success",
                        "top-right",
                        3000
                      )
                    }
                  >
                    <RiShareForwardLine className="iconheart" />
                    <p className="text-CS">Chia sẻ</p>
                  </div>
                </div>
                <div className="comments-section">
                  <div>
                    {renderComments(
                      post.comment.filter((comment) => !comment.parentId)
                    )}
                  </div>
                </div>
                <div className="new-comment-container">
                  {parentUserName !== null ? (
                    <div className="onClick-parent">
                      <Button onClick={() => setParentUserName(null)}>X</Button>
                      <p className="parentUserName">{parentUserName.name}</p>
                    </div>
                  ) : null}
                  <input
                    type="text"
                    ref={commentInputRef}
                    onChange={(event) => setCommentContent(event.target.value)}
                    placeholder={`Bình luận`}
                    className="new-comment-input"
                  />

                  <button
                    onClick={submitComment}
                    className="submit-comment-button"
                  >
                    Bình luận
                  </button>
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
              <div className="friend">Danh sách bạn bè gần đây</div>
              <div className="list-view-friend">
                {friend.map((friend, index) => (
                  <Friend key={index} friend={friend} />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
