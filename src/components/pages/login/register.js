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
function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const togglePasswordVisibility1 = () => {
        setShowPassword1(!showPassword1);
    };

    return (
        <div className="containerlogin">
            <div className="itemregister">
                <div className="leftlogin">
                    <div className="Registeritem">
                        <div className="txtwelcome">
                            Welcome back
                        </div>
                        <img src={logone} className="logo" />
                    </div>
                    <div className="txtcontent">
                        Đăng ký tải khoản để tham gia cùng chúng tôi
                    </div>
                    <div className="email">
                        <div>
                            Nhập tên người dùng
                        </div>
                        <Input
                            className="inputemail"
                        />
                    </div>
                    <div className="email">
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
                    <div className="email">
                        <div>
                            Nhập lại mật khẩu
                        </div>
                        <Input
                            type={showPassword1 ? 'text' : 'password'}
                            className="inputemail"
                        />
                        {
                            showPassword1 ? (
                                <EyeOutlined
                                    className="eye"
                                    onClick={togglePasswordVisibility1}
                                />
                            ) : (
                                <EyeInvisibleOutlined
                                    className="eye"
                                    onClick={togglePasswordVisibility1}
                                />
                            )
                        }
                    </div>
                    <div className="forgotpass">
                        Quên mật khẩu?
                    </div>
                    <Button className="btnlogin">Đăng ký</Button>
                    <Link to={`/`}>
                        <div className="forgotpass">
                            Đăng nhập tài khoản
                        </div>
                    </Link>


                </div>

            </div>


        </div>
    );
}

export default Register;
