import axios from "axios";
import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import ChatSection from "../components/ChatSection/ChatSection";
import SideBar from "../components/Sidebar/SideBar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [isLogin, setIsLogin] = useState(true);
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
          setIsLogin(false);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  const logout = () => {
    setUser({});
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
