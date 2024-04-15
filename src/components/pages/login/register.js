import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode.react";
import { encode, decode } from "base-64";
import io from "socket.io-client";
import { CreateDevice } from "../../../services/QRCode/QRCodeService";
import { getPostsAll } from "../../../services/pages/homeServices";
import { getDevice } from "../../../services/QRCode/QRCodeService";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "antd";
import logone from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import Icon from "@ant-design/icons/lib/components/Icon";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import "./index.css";
import { register } from "../../../services/users/userServices";
const data = 
{
  name: "John Doe",
  email: "johndoe@example.com",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  password: "hashedpassword",
  gender: "male",
  date: "1990-01-01",
  avatar: "https://example.com/avatar.jpg",
  coverImage: "https://example.com/cover.jpg"
}
function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [gender, setGender] = useState("null");
  const [date, setDate] = useState("null");
  const [avatar, setAvatar] = useState(
    "https://res.cloudinary.com/dwxly01ng/image/upload/v1709527273/account_vpss3t.png"
  );
  const [coverImage, setAnhbia] = useState("null");
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };
  const onRegister = async () => {
    if (password !== rePassword) {
      alert("Mật khẩu không khớp");
      return;
    }
    if (email === "" || password === "" || name === "") {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    const response = await register(
      name,
      email,
      password,
      gender,
      date,
      avatar,
      coverImage
    );
    if (response.status == 1) {
      alert("Đăng ký thành công");
      navigate("/");
    } else {
      alert("Đăng ký thất bại");
    }
  };

  return (
    <div className="containerlogin">
      <div className="itemregister">
        <div className="leftlogin">
          <div className="Registeritem">
            <div className="txtwelcome">Welcome back</div>
            <img src={logone} className="logo" />
          </div>
          <div className="txtcontent">
            Đăng ký tải khoản để tham gia cùng chúng tôi
          </div>
          <div className="email">
            <div>Nhập tên người dùng</div>
            <Input
              className="inputemail"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="email">
            <div>Nhập tài khoản Email</div>
            <Input
              className="inputemail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="email">
            <div>Nhập mật khẩu</div>
            <Input
              type={showPassword ? "text" : "password"}
              className="inputemail"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <EyeOutlined className="eye" onClick={togglePasswordVisibility} />
            ) : (
              <EyeInvisibleOutlined
                className="eye"
                onClick={togglePasswordVisibility}
              />
            )}
          </div>
          <div className="email">
            <div>Nhập lại mật khẩu</div>
            <Input
              type={showPassword1 ? "text" : "password"}
              className="inputemail"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
            />
            {showPassword1 ? (
              <EyeOutlined
                className="eye"
                onClick={togglePasswordVisibility1}
              />
            ) : (
              <EyeInvisibleOutlined
                className="eye"
                onClick={togglePasswordVisibility1}
              />
            )}
          </div>
          <div className="forgotpass">Quên mật khẩu?</div>
          <Button
            className="btnlogin"
            onClick={() => {
              onRegister();
            }}
          >
            Đăng ký
          </Button>
          <Link to={`/`}>
            <div className="forgotpass">Đăng nhập tài khoản</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
