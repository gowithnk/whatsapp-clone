import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Pusher from "pusher-js";
import axios from "./axios";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("./messages/sync").then((response) => {
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("dbf10fe5f435cb800c80", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (newMessage) {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);

  return (
    <div className="app">
      <div className="app__body">
        {/* sidebar */}
        <Sidebar />
        {/* chat component */}
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
