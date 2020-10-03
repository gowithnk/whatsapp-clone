import React, { useState } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import SearchOutLined from "@material-ui/icons/Search";
import {
  AttachFile,
  MoreVert,
  InsertEmoticon,
  MicOutlined,
} from "@material-ui/icons";
import axios from "./axios";

function Chat({ messages }) {
  const [input, setInput] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post("/messages/new", {
      message: input,
      name: " Niranjan",
      timestamp: "Just now",
      received: false,
    });
    setInput("");
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>Room name</h3>
          <p>Last seen at...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutLined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${message.received && "chat__reciever"}`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <IconButton>
          <InsertEmoticon />
        </IconButton>
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            send a message
          </button>
        </form>
        <IconButton>
          <MicOutlined />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
