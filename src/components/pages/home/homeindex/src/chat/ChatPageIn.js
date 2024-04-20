// ChatPageIn.js
import React from "react";
import "../../css/chatin.css";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

export const ChatPageIn = ({ friendInbox }) => {
  // console.log("friendInbox", friendInbox);

  return (
    <div className="chat-in-container">
      <div className="chat-header">
        <img
          src={friendInbox.avatar}
          alt="Avatar"
          className="chat-header-avatar"
        />
        <div className="chat-header-info">
          <div className="chat-header-name">{friendInbox.name}</div>
          <div className="chat-header-status">Đang hoạt động</div>
        </div>
        <div
          className="chat-header-clone"
          onClick={() => {
            document.querySelector(".chat-in-container").style.display = "none";
          }}
        >
          <IoMdClose />
        </div>
      </div>
      <div className="chat-messages">
        {/* Tin nhắn của người gửi */}
        <div className="chat-message-sender">
          <img
            src="https://res.cloudinary.com/dqo8whkdr/image/upload/v1690714031/cld-sample-3.jpg"
            alt="Avatar"
            className="chat-message-sender-avatar"
          />
          <div className="chat-message-sender-content">
            <div className="chat-message-sender-content-text">
              Xin chào, bạn có thể giúp tôi không?
            </div>
            <div className="chat-message-sender-content-time">10:00</div>
          </div>
        </div>
        {/* Tin nhắn của người nhận */}
        <div className="chat-message-receiver">
          <div className="chat-message-receiver-content">
            <div className="chat-message-receiver-content-text">
              Có, tôi sẽ giúp bạn.
            </div>
            <div className="chat-message-receiver-content-time">10:01</div>
          </div>
          <img
            src="https://res.cloudinary.com/dqo8whkdr/image/upload/v1690714031/cld-sample-3.jpg"
            alt="Avatar"
            className="chat-message-receiver-avatar"
          />
        </div>
      </div>
    </div>
  );
};
