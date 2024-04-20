import React, { useEffect, useState } from "react";
import { getFriendByIdUsers } from "../../../../../../services/pages/friendServices";
import "../../css/cssChat.css";
import { BiSolidMessageRoundedAdd } from "react-icons/bi";

export const ChatPage = ({ cancel, friend }) => {
  const getUserFromLocalStorage = () => {
    const userString = localStorage.getItem("iduser");
    if (userString) {
      return JSON.parse(userString);
    }
    return null;
  };

  const user = getUserFromLocalStorage();
  const [listFriend, setListFriend] = useState([]);
  const [loading, setLoading] = useState(true);

  const onGetFriend = async () => {
    try {
      if (user && user._id) {
        const response = await getFriendByIdUsers(user._id);
        // console.log("Lấy danh sách bạn bè thành công");
        setListFriend(response.friendsList);
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi khi lấy danh sách bạn bè:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMessengerClick = (idFriend) => {
    // console.log(">>>>>>>>>> idFriend", idFriend);
    friend(idFriend);
    cancel();
  };

  useEffect(() => {
    onGetFriend();
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : listFriend.length > 0 ? (
        listFriend.map((friend, index) => (
          <div key={index} className="friend-item">
            <img src={friend.avatar} alt="Avatar" className="friend-avatar" />
            <div className="friend-name">{friend.name}</div>
            <div
              className="messenger-icon"
              onClick={() => handleMessengerClick(friend)}
            >
              <BiSolidMessageRoundedAdd />
            </div>
          </div>
        ))
      ) : (
        <div>Không có bạn bè</div>
      )}
    </div>
  );
};
