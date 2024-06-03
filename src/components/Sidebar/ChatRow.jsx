import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Message from "../../assets/message.svg";
import Delete from "../../assets/delete.svg";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

const ChatRow = ({ id, user }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [active, setActive] = useState(false);
  const [messages] = useCollection(
    collection(db, "users", user?.email, "chats", id, "messages")
  );
  useEffect(() => {
    if (!pathname) return;
    setActive(pathname.includes(id));
  }, [pathname]);

  const removeChat = async () => {
    await deleteDoc(doc(db, "users", user?.email, "chats", id));
    navigate("/");
  };
  return (
    <Link to={`/chat/${id}`}>
      <div className={active ? "active" : ""}>
        <button className="query">
          <img src={Message} alt="message" />
          {messages?.docs[messages?.docs.length - 1]?.data().text || id}
          <img
            onClick={removeChat}
            src={Delete}
            alt="delete"
            className="deleteIcon"
          />
        </button>
      </div>
    </Link>
  );
};

export default ChatRow;
