import React, { useEffect, useRef, useState } from "react";
import RoutersBtns from "../RoutersBtns/RoutersBtns";
import classes from "./ChatBot.module.css";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const inpValue = useRef();

  useEffect(() => {
    const storedMessages = localStorage.getItem("chatMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    messages.length !== 0 &&
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (inpValue.current) {
      inpValue.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMessages = async () => {
    const clientMsg = {
      message: `${inpValue.current.value}`,
      sender: "client",
    };
    const botMsg = { message: "typing", sender: "bot" };
    setMessages((prev) => [...prev, clientMsg, botMsg]);

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${process.env.REACT_APP_API_BOT}`,
      },
      body: JSON.stringify({
        response_as_dict: true,
        attributes_as_list: false,
        show_original_response: false,
        temperature: 0,
        max_tokens: 1000,
        providers: "openai",
        text: `${inpValue.current.value}`,
      }),
    };

    if (inpValue.current.value.trim()) {
      inpValue.current.value = "";
      const res = await fetch(
        `${process.env.REACT_APP_URL}/text/chat`,
        options
      );
      const data = await res.json();
      const botMsg = {
        message: `${data.openai.generated_text}`,
        sender: "bot",
      };

      setMessages((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1 && msg.sender === "bot" ? botMsg : msg
        )
      );
    }
  };

  const handleDeleteChat = () => {
    localStorage.removeItem("chatMessages");
    setMessages([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inpValue.current.value.trim()) {
      handleMessages();
    }
  };

  return (
    <>
      <div className={`container`}>
        <RoutersBtns />
        <div className={`${classes.chat}`}>
          {messages.map((msg, index) => {
            return msg.sender === "client" ? (
              <div className={`${classes.clientMessage}`} key={index}>
                <p>{msg.message}</p>
              </div>
            ) : (
              <div className={`${classes.botMessage}`} key={index}>
                <i className={`robot fa-solid fa-robot`}></i>
                {msg.message === "typing" ? (
                  <p className={`${classes.typing}`}>{msg.message}</p>
                ) : (
                  <p>{msg.message}</p>
                )}
              </div>
            );
          })}
        </div>
        <div className="form">
          <button
            className={`delBtn ms-3 bg-transparent border-0`}
            title="Delete the Chat"
            onClick={handleDeleteChat}
            disabled={messages.length === 0}
          >
            <i className="fa-regular fa-trash-can text-danger fs-3"></i>
          </button>

          <input
            ref={inpValue}
            onKeyPress={handleKeyPress}
            type="text"
            placeholder="Type a message..."
            required
          />
          <button onClick={handleMessages}>
            <i className="fa-regular fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
