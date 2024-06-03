import axios from "axios";
import { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import ChatSection from "../components/ChatSection/ChatSection";
import SideBar from "../components/Sidebar/SideBar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setIsLogin(false);
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        if (res.data) {
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
          setIsLogin(false);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("messages");
    setIsLogin(true);
    navigate("/");
  };
  return (
    <>
      <div className="sidebar">
        <SideBar login={login} user={user} logout={logout} isLogin={isLogin} />
      </div>
      <div className="main">
        <ChatSection user={user} />
      </div>
    </>
  );
};

export default HomePage;
