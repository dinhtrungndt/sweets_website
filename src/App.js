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
    const userString = localStorage.getItem("iduser");
    if (userString) {
      return JSON.parse(userString);
    }
    return null;
  };

  // lưu thông tin user vào localStorage
  const saveUserToLocalStorage = (userInfo) => {
    if (!userInfo) {
      localStorage.removeItem("iduser");
      setUser(null);
      return;
    }
    localStorage.setItem("iduser", JSON.stringify(userInfo));
    setUser(userInfo);
  };

  const [user, setUser] = useState(getUserFromLocalStorage);

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
          <Route element={<PublicRoute />}>
            <Route
              path="/signin"
              element={<QRCodeGenerator saveUser={saveUserToLocalStorage} />}
            />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/"
              element={<HomeScreen1 userId={user ? user.id : null} />}
            />
            <Route path="/posts/detail/:id" element={<DetailScreen />} />
          </Route>
        </Routes>
      </Router>
      {/* <QRCodeGenerator /> */}
    </div>
  );
}

export default App;
