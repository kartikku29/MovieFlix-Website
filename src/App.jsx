import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MovieFlix from "./pages/MovieFlix";
import Registration from "./pages/Registration";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/movieflix/" element={<Home />} />
          {/* <Route path="/movieflix/movieflixHome" element={<MovieFlix />} /> */}
          <Route path="/movieflix/login" element={<Login />} />
          <Route path="/movieflix/registration" element={<Registration />} />
        </Routes>
        <Toaster />
      </Router>
    </>
  );
}

export default App;
