import React from "react";
import "../css/index.css";
import avatar from "../../../assets/khanhphan.jpg";
import post from "../../../assets/post.jpg";
import { SearchOutlined, HomeFilled, BellFilled, UserOutlined, HeartOutlined, RedditCircleFilled } from '@ant-design/icons';
import { Alert } from "antd";
export const AdminPage = () => {

  const PostItem = ({ post }) => {
    return (
      <div className="post-item">
        <div className="post-header">
          <img src={post.avatar} alt="Avatar" className="avatar" />
          <div className="username">{post.username}</div>
          <div className="time">{post.time}</div>
        </div>
        <img src={post.image} alt="Post" className="post-image" />

        <HeartOutlined className="iconheart" />
        <div className="post-description-heart">1 lượt thích</div>
        <div className="post-description">{post.description}</div>
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
  const search =() =>{
    alert("Chức năng đang được phát triển")
  }

  const posts = [
    {
      avatar: avatar,
      username: "Nguyễn Văn A",
      time: "1 giờ trước",
      image: post,
      description: "Đây là một bài viết rất hay mà sweet đã đăng dành cho mọi người, nhất là cho những người mới học lập trình"
    },
    {
      avatar: avatar,
      username: "Nguyễn Văn B",
      time: "1h45 giờ trước",
      image: post,
      description: "Đây là một bài viết rất hay"
    },
  ]
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
  return (
    <div className="container">
      <div className="left-side">
        <div className="textlogo">Sweet</div>
        <div className="item1" onClick={search}>
          <HomeFilled style={{ fontSize: '25px', color: 'white' }} />
          <div className="txttrangchu">
            Trang chủ
          </div>
        </div>
        <div className="item1">
          <SearchOutlined style={{ fontSize: '25px', color: 'white' }} />
          <div className="txttrangchu">
            Tìm kiếm
          </div>
        </div>
        <div className="item1">
          <BellFilled style={{ fontSize: '25px', color: 'white' }} />
          <div className="txttrangchu">
            Thông báo
          </div>
        </div>

        <div className="item1">
          <RedditCircleFilled style={{ fontSize: '25px', color: 'white' }} />
          <div className="txttrangchu">
            Story
          </div>
        </div>
        <div className="item1">
          <UserOutlined style={{ fontSize: '25px', color: 'white' }} />
          <div className="txttrangchu">
            Trang cá nhân
          </div>
        </div>
      </div>
      <div className="right-side">
        <div className="list-view">
          {posts.map((post, index) => (
            <PostItem key={index} post={post} />
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


      </div>
    </div>
  );
};
