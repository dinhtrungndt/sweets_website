// ChatPageIn.js
import React, { useEffect, useRef, useState } from "react";
import "../../css/chatin.css";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { GetMessageSR } from "../../../../../../services/pages/chatService";
import io from "socket.io-client";
import { getUserByID } from "../../../../../../services/pages/userServices";
import moment from "moment";
import { GoDash } from "react-icons/go";

export const ChatPageIn = ({ friendInbox }) => {
  const userString = localStorage.getItem("iduser");
  const user = JSON.parse(userString);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [userA, setUserA] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const messagesEndRef = useRef(null);
  const socket = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  // console.log("friendInbox", friendInbox);

  const onGetByUserId = async () => {
    try {
      const response = await getUserByID(user);
      // console.log("response", response);
      setUserA(response);
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.current = io("https://api.dinhtrungndt.id.vn/");
    let isConnected = false;

    const handleConnect = () => {
      isConnected = true;
      console.log("Socket đã kết nối");
    };

    const handleDisconnect = () => {
      isConnected = false;
      console.log("Socket đã ngắt kết nối");
    };

    socket.current.on("connect", handleConnect);
    socket.current.on("disconnect", handleDisconnect);

    socket.current.on("new_message", (newMessage) => {
      if (
        (newMessage.idSender === user &&
          newMessage.idReceiver === friendInbox.id) ||
        (newMessage.idSender === friendInbox.id &&
          newMessage.idReceiver === user)
      ) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    fetchData();

    return () => {
      socket.current.off("connect", handleConnect);
      socket.current.off("disconnect", handleDisconnect);
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (friendInbox) {
      fetchData();
    }
  }, [friendInbox]);

  const fetchData = async () => {
    try {
      const idSender = user;
      const idReceiver = friendInbox.id;
      const response = await GetMessageSR(idSender, idReceiver);
      setMessages(response);
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const formatTime = (createdAt) => {
    const currentTime = moment();
    const postTime = moment(createdAt);
    const diffInSeconds = currentTime.diff(postTime, "seconds");

    if (diffInSeconds < 1) {
      return "Vừa gửi";
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

  const sendMessage = (content) => {
    if (content === "" || !content.trim()) {
      return;
    }
    if (socket.current && socket.current.connected) {
      const newMessage = {
        idSender: user,
        idReceiver: friendInbox.id,
        content: content,
        time: new Date().toISOString(),
      };
      socket.current.emit("new_message", newMessage);
      setMessageInput("");
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error("Socket chưa kết nối");
    }
  };

  const renderItem = ({ item }) => {
    return (
      <div>
        {item.idSender === user ? (
          <div className="chat-message-receiver">
            <div className="chat-message-receiver-content">
              <div className="chat-message-receiver-content-text">
                {item.content}
              </div>
              <div className="chat-message-receiver-content-time">
                {formatTime(item.time)}
              </div>
            </div>
            <img
              src={userA.avatar}
              alt="Avatar"
              className="chat-message-receiver-avatar"
            />
          </div>
        ) : (
          <div className="chat-message-sender">
            <img
              src={friendInbox.avatar}
              alt="Avatar"
              className="chat-message-sender-avatar"
            />
            <div className="chat-message-sender-content">
              <div className="chat-message-sender-content-text">
                {item.content}
              </div>
              <div className="chat-message-sender-content-time">
                {formatTime(item.time)}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    onGetByUserId();
  }, []);

  // console.log("messagesmessagesmessages", messages);

  return (
    <div className={`chat-in-container ${isExpanded ? "expanded" : ""}`}>
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
          style={{
            display: "flex",
            right: 0,
            alignItems: "center",
            position: "absolute",
          }}
        >
          <div
            className="chat-header-down"
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
          >
            <GoDash />
          </div>
          <div className="chat-header-clone">
            <IoMdClose />
          </div>
        </div>
      </div>
      <div className="chat-messages">
        {
          <div className="chat-messages-container">
            {messages.map((item, index) => (
              <div key={index}>{renderItem({ item })}</div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        }
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          className="chat-input-text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendMessage(messageInput);
            }
          }}
        />
        <div
          className="chat-input-send"
          onClick={() => {
            sendMessage(messageInput);
          }}
        >
          Gửi
        </div>
      </div>
    </div>
  );
};
