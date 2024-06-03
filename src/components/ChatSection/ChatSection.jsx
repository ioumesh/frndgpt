import React, { useState, useRef, useEffect } from "react";
import "./chatsection.css";
import SendBtn from "../../assets/send.svg";
import UserIcon from "../../assets/user-icon.png";
import GPTIcon from "../../assets/chatgptLogo.svg";
import axios from "axios";

const ChatSection = ({ user }) => {
  const mgsEnd = useRef(null);

  const initialMessage = {
    role: "assistant",
    content:
      "Hi, I'm FrndGPT, an AI language model created by Umesh. I'm here to assist with answering questions, providing information, and engaging in conversations. How can I help you today?",
  };

  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([initialMessage]);

  useEffect(() => {
    // Load messages from local storage
    const storedMessages = JSON.parse(localStorage.getItem("messages"));
    if (storedMessages) {
      setMessages(storedMessages);
    }
  }, []);

  const handleInput = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const handleSend = async () => {
    const newMessage = { role: "user", content: inputValue };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);

    // Save messages to local storage
    localStorage.setItem("messages", JSON.stringify(updatedMessages));

    try {
      const url = "https://api.openai.com/v1/chat/completions";
      const apiKey = process.env.REACT_APP_API_KEY;
      const response = await axios.post(
        url,
        {
          model: "gpt-3.5-turbo",
          messages: updatedMessages,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const botMessage = response.data.choices[0].message;
      const finalMessages = [...updatedMessages, botMessage];
      setMessages(finalMessages);

      // Update messages in local storage again after adding bot response
      localStorage.setItem("messages", JSON.stringify(finalMessages));
    } catch (error) {
      console.error("Error fetching response:", error);
    }

    setInputValue("");
  };
  const handleEnter = async (e) => {
    if (e.key === "Enter") {
      await handleSend();
    }
  };

  useEffect(() => {
    mgsEnd.current.scrollIntoView();
  }, [messages]);

  return (
    <>
      <div className="chats">
        {messages.map((item, index) => (
          <div
            key={`chat-${index}`}
            className={item.role === "assistant" ? "chat bot" : "chat"}
          >
            <img
              src={item.role === "assistant" ? GPTIcon : UserIcon}
              alt="chat"
              className="chatImg"
            />
            <p className="text">{item.content}</p>
          </div>
        ))}
        <div ref={mgsEnd} />
      </div>
      <div className="chatFooter">
        <div className="inputBox">
          <input
            value={inputValue}
            type="text"
            name=""
            id=""
            placeholder="Send a message..."
            onChange={handleInput}
            onKeyDown={handleEnter}
          />
          <button className="sendBtn" onClick={handleSend}>
            <img src={SendBtn} alt="sendbtn" />
          </button>
        </div>
        <p>
          FrndGPT may produce inaccurate information about people, places, or
          facts. FrndGPT version 1.0 Made by Umesh!
        </p>
      </div>
    </>
  );
};

export default ChatSection;
