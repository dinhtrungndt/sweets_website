import React, { useState } from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
  useNavigate,
} from "react-router-dom"; // Import CSS từ Bootstrap

import { HomeScreen } from "./components/pages/home";
import { DetailScreen } from "./components/pages/home/detail";
import QRCodeGenerator from "./components/pages/login";
import { HomeScreen1 } from "./components/pages/home/homeindex/src";
import Register from "./components/pages/login/register";

function App() {
  // đọc thông tin user từ localStorage
  const getUserFromLocalStorage = () => {
    const userString = localStorage.getItem("user");
    if (userString) {
      return JSON.parse(userString);
    }
    return null;
  };

  // lưu thông tin user vào localStorage
  const saveUserToLocalStorage = (userInfo) => {
    if (!userInfo) {
      localStorage.removeItem("user");
      setUser(null);
      return;
    }
    localStorage.setItem("user", JSON.stringify(userInfo));
    setUser(userInfo);
  };

  const [user, setUser] = useState(getUserFromLocalStorage);

  // những component cần phải đăng nhập mới được truy cập
  const ProtectedRoute = () => {
    if (user) {
      return <Outlet />;
    }
    return <Navigate to="/signin" />;
  };

  // những component không cần phải đăng nhập
  const PublicRoute = () => {
    if (user) {
      return <Navigate to="/" />;
    }
    return <Outlet />;
  };

  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<QRCodeGenerator />} />
          <Route path="/posts" element={<HomeScreen1 />} />
          <Route path="/posts/detail/:id" element={<DetailScreen />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
      {/* <QRCodeGenerator /> */}
    </div>
  );
}

export default App;
