import React from "react";
import Logo from "../assets/chatgpt.svg";
import AddBtn from "../assets/add-30.png";
import Message from "../assets/message.svg";
import "./sidebar.css";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="upperSide">
        <div className="upperSideTop">
          <img src={Logo} alt="logo" className="logo" />
          <span className="brand">Frnd GPT</span>
        </div>
        <div className="upperSideBottom">
          <button className="midBtn">
            <img src={AddBtn} className="addBtn" />
            New Chat
          </button>
          <button className="query">
            <img src={Message} alt="message" />
            What is Programming ?
          </button>
          <button className="query">
            <img src={Message} alt="message" />
            What is Programming ?
          </button>
        </div>
      </div>
      <div className="lowerSide"></div>
    </div>
  );
};

export default SideBar;
