import "./App.css";
import { HomeScreen } from "./components/pages/home/index.js";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
  useNavigate,
} from "react-router-dom"; // Import CSS từ Bootstrap

function App() {
  return (
    <div className="App">
      <HomeScreen />
    </div>
  );
}

export default App;
