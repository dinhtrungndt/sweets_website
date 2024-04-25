import React, { useEffect, useState } from "react";
import { getFriendByIdUsers } from "../../../../../../services/pages/friendServices";
import "../../css/cssChat.css";
import { BiSolidMessageRoundedAdd } from "react-icons/bi";

export const ChatPage = ({ cancel, friend }) => {
  const userString = localStorage.getItem("iduser");
  const user = JSON.parse(userString);
  const [listFriend, setListFriend] = useState([]);
  const [loading, setLoading] = useState(true);

  const onGetFriend = async () => {
    try {
      if (user) {
        const response = await getFriendByIdUsers(user);
        // console.log("Lấy danh sách bạn bè thành công");
        setListFriend(response.friendsList);
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi khi lấy danh sách bạn bè:", error);
    } finally {
      setLoading(false);
    }
  };

  // console.log(">>>>>>>>>> idFriend", listFriend);
  const handleMessengerClick = (idFriend) => {
    // console.log(">>>>>>>>>> idFriend", idFriend);
    friend(idFriend);
    // cancel();
  };

  useEffect(() => {
    onGetFriend();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="friend-item">Loading...</div>
      ) : listFriend.length > 0 ? (
        listFriend.map((friend, index) => (
          <div
            key={index}
            className="friend-item"
            onClick={() => handleMessengerClick(friend)}
          >
            <img src={friend.avatar} alt="Avatar" className="friend-avatar" />
            <div className="friend-name">{friend.name}</div>
          </div>
        ))
      ) : (
        <div>Không có bạn bè</div>
      )}
    </div>
  );
};
