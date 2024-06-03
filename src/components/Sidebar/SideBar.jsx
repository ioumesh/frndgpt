import React from "react";
import Logo from "../../assets/chatgpt.svg";
import AddBtn from "../../assets/add-30.png";
import Login from "../Login/Login";
import "./sidebar.css";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatRow from "./ChatRow";

const SideBar = ({ login, logout, user, isLogin }) => {
  const [chats] = useCollection(
    user?.email &&
      query(
        collection(db, "users", user?.email, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  const navigate = useNavigate();
  const notify = () => toast("Sign in for New chat");
  const createNewChat = async () => {
    if (user) {
      try {
        const doc = await addDoc(collection(db, "users", user.email, "chats"), {
          messages: [],
          userId: user.email,
          createdAt: serverTimestamp(),
        });
        navigate(`/chat/${doc.id}`);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      notify();
    }
  };
  return (
    <div className="sidebar">
      <div className="upperSide">
        <div className="upperSideTop">
          <img src={Logo} alt="logo" className="logo" />
          <span className="brand">Frnd GPT</span>
        </div>
        <div className="upperSideBottom">
          <button onClick={createNewChat} className="midBtn">
            <img src={AddBtn} className="addBtn" alt="addbtn" />
            New Chat
          </button>
          {user?.email &&
            chats?.docs.map((chat) => {
              return <ChatRow key={chat.id} id={chat.id} user={user} />
            })}
        </div>
      </div>
      <div className="lowerSide">
        <Login login={login} user={user} logout={logout} isLogin={isLogin} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default SideBar;
