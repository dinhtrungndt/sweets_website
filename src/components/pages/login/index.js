import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode.react";
import { encode } from "base-64";
import io from "socket.io-client";
import {
  CreateDevice,
  UpdateDevice,
} from "../../../services/QRCode/QRCodeService";
import { useNavigate } from "react-router-dom";
import { Alert } from "bootstrap";
import { Button, Input } from "antd";
import { Link } from "react-router-dom";
import logone from "../../../assets/logo.png";
import "./index.css";
import Icon from "@ant-design/icons/lib/components/Icon";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { login } from "../../../services/users/userServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function QRCodeGenerator(props) {
  const { saveUser } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [dateTime, setDateTime] = useState(new Date());
  const socket = useRef(null);
  const onCreateDeviceCalled = useRef(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleDateTimeChange = (event) => {
    setDateTime(new Date(event.target.value));
  };
  const encodedDateTime = encode(dateTime.toISOString());
  // đăng nhập ở đây
  const onLogin = async () => {
    const response = await login(email, password);
    if (response.status) {
      console.log("đăng nhập thành công");
      const dataUser = JSON.stringify(response.id);
      JSON.parse(dataUser);
      localStorage.setItem("iduser", dataUser);
      navigate("/posts");
      // if (response.user) {
      //   saveUser(response.user);
      // } else {
      //   alert("Email or password is incorrect");
      // }
      // Toast thông báo đăng nhập thành công
      toast.success("Đăng nhập thành công", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      alert("Đăng nhập thất bại");
    }
  };

  useEffect(() => {
    socket.current = io("https://sweets-nodejs.onrender.com/");
    socket.current.on("connect", () => {
      console.log("Connected to server");
    });
    socket.current.on("send_device_iduser2", (data) => {
      console.log(">>>>>>>>>> data.iduser : ", data.iduser);
      console.log(">>>>>>>>>> data.deviceid : ", data.deviceid);
      console.log(">>>>>>>>>> encodedDateTime : ", encodedDateTime);
      if (data.deviceid !== encodedDateTime) {
        return;
      }
      const CheckDeviceUpdate = async () => {
        const response = await UpdateDevice(data.iduser, data.deviceid);
        if (response.status) {
          console.log("đăng nhập thành côngdata.iduser", data.iduser);
          const dataUser = JSON.stringify(data.iduser);
          JSON.parse(dataUser);
          localStorage.setItem("iduser", dataUser);
          navigate("/posts");
          // Toast thông báo đăng nhập thành công
          toast.success("Đăng nhập thành công", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      };
      CheckDeviceUpdate();
    });
    if (!onCreateDeviceCalled.current) {
      OnCreateDevice();
      onCreateDeviceCalled.current = true;
    }

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const OnCreateDevice = async () => {
    const device = await CreateDevice(encodedDateTime);
    console.log(device);
  };

  const CheckDeviceUpdate = async (iduser, deviceid) => {
    const response = await UpdateDevice(iduser, deviceid);
    if (response.status) {
      console.log("đăng nhập thành công");
      localStorage.setItem("iduser", iduser); // Lưu iduser vào LocalStorage
    }
    return response;
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="containerlogin">
      <div className="itemlogin">
        <div className="leftlogin">
          <div className="logoitem">
            <div className="txtwelcome">Welcome back</div>
            <img src={logone} className="logo" />
          </div>
          <div className="txtcontent">
            Chào mừng bạn quay trở lại với chúng tôi
          </div>
          <div className="email1">
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
          <div className="forgotpass">Quên mật khẩu?</div>
          <Button
            className="btnlogin"
            onClick={() => {
              onLogin(email, password);
              console.log("click");
            }}
          >
            Đăng nhập
          </Button>
          <Link to={`/register`}>
            <div className="forgotpass">Đăng ký tài khoản</div>
          </Link>
        </div>
        <div className="rightlogin">
          {dateTime && (
            <div className="QRCodeContainer">
              <QRCode value={encodedDateTime} />
            </div>
          )}
          <div className="txtloginqr">Login bằng mã QR</div>
          <div className="txtqr">Sử dụng ứng dụng Sweet</div>
          <div className="txtqr">để quét mã QR để đăng nhập</div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default QRCodeGenerator;
