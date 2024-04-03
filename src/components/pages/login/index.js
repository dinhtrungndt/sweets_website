import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode.react";
import { encode, decode } from "base-64";
import io from "socket.io-client";
import { CreateDevice } from "../../../services/QRCode/QRCodeService";
import { getPostsAll } from "../../../services/pages/homeServices";
import { getDevice } from "../../../services/QRCode/QRCodeService";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "antd";
import { Link } from "react-router-dom";
import logone from "../../../assets/logo.png";
import "./index.css";
import Icon from "@ant-design/icons/lib/components/Icon";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
function QRCodeGenerator() {
  const navigate = useNavigate();
  const [dateTime, setDateTime] = useState(new Date());
  const socket = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const handleDateTimeChange = (event) => {
    setDateTime(new Date(event.target.value));
  };
  // Mã hóa dateTime thành Base64
  const encodedDateTime = encode(dateTime.toISOString());
  // test lấy danh sách bài viết
  const OnGetPostsAll = async () => {
    const posts = await getPostsAll();
    console.log(posts);
  };
  // test thêm device
  const OnCreateDevice = async () => {
    const device = await CreateDevice(encodedDateTime);
    console.log(device);
  };

  // test lấy danh sách device
  const OnGetDevice = async () => {
    const device = await getDevice();
    console.log(device);
  };
  useEffect(() => {
    socket.current = io("https://sweets-nodejs.onrender.com/");
    socket.current.on("connect", () => {
      console.log("Connected to server");
    });
    // OnCreateDevice()
    // OnGetDevice()

    // test chuyen man hinh
    // socket.current.on("ChangeScreen", (data) => {
    //   // navigate("/posts");
    //   console.log("ChangeScreen userId", data.userId);
    //   console.log("ChangeScreen deviceid", data.deviceId);
    //   console.log("ChangeScreen encodedDateTime", encodedDateTime);
    //   // if (data.userId == encodedDateTime) {
    //   //   navigate("/posts");
    //   // }

    // });
    socket.current.on('UpdateDevice2', (data) => {
      console.log('UpdateDevice2', data.response);
      if (data.response == true) {
        navigate('/posts');
      }
    });
    return () => {
      socket.current.disconnect();
    };
  }, []);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    socket.current.emit("AddDevice", { device: encodedDateTime });
  }, [dateTime]);

  return (
    <div className="containerlogin">
      <div className="itemlogin">
        <div className="leftlogin">
          <div className="logoitem">
            <div className="txtwelcome">
              Welcome back
            </div>
            <img src={logone} className="logo" />
          </div>
          <div className="txtcontent">
            Chào mừng bạn quay trở lại với chúng tôi
          </div>
          <div className="email1">
            <div>
              Nhập tài khoản Email
            </div>
            <Input
              className="inputemail"
            />
          </div>
          <div className="email">
            <div>
              Nhập mật khẩu
            </div>
            <Input
              type={showPassword ? 'text' : 'password'}
              className="inputemail"
            />
            {
              showPassword ? (
                <EyeOutlined
                  className="eye"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <EyeInvisibleOutlined
                  className="eye"
                  onClick={togglePasswordVisibility}
                />
              )
            }
          </div>
          <div className="forgotpass">
            Quên mật khẩu?
          </div>
          <Button className="btnlogin">Đăng nhập</Button>
          <Link to={`/register`}>
            <div className="forgotpass">
              Đăng ký tài khoản
            </div>
          </Link>


        </div>
        <div className="rightlogin">
          {dateTime && (
            <div className="QRCodeContainer">
              <QRCode value={encodedDateTime} />
            </div>
          )}
          <div className="txtloginqr">
            Login bằng mã QR
          </div>
          <div className="txtqr">
            Sử dụng ứng dụng Sweet
          </div>
          <div className="txtqr">
            để quét mã QR để đăng nhập
          </div>
        </div>
      </div>


    </div>
  );
}

export default QRCodeGenerator;
