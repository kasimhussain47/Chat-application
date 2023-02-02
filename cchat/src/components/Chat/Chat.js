import React, { useEffect, useState } from "react";
// import io from 'socket.io-client';
import { user } from "../Join/Join";
import socketio from "socket.io-client";
import { Button, TextField } from "@mui/material";
import sendlogo from "../../Images/send.png";

const ENDPOINT = "http://localhost:4500/";
const socket = socketio.connect(ENDPOINT);

// let socket;
// const socket = io();
const Chat = () => {
  const [id, setid] = useState("");
  // const [messages, setMessages] = useState([])
  // const ios=socket(ENDPOINT , {transports:['websocket']} );
  // const [isConnected, setIsConnected] = useState(socket.connected);
  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("message", { user,message,id });
    // document.getElementById("chatInput").value = "";

    socket.on("sendMessage", (user,message,id) => {
      console.log(user,message,id);
    });
   
    socket.on("connect", () => {
      // socket.emit("kasim", "hi my id is:");
      alert("hey there");
      setid(socket.id);
    });

  };

  useEffect(() => {

    // socket.on("connect", () => {
    //   socket.emit("kasim", "hi my id is:");
    //   alert("hey there");
    //   setid(socket.id);
    // });

    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      console.log(data.user, data.message);
    });

    socket.on("userJoined", (data) => {
      // setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on("leave", (data) => {
      // setMessages([...messages, data]);
      console.log(data.user, data.message);
    });
    return () => {};
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (user,message,id) => {
      console.log(user,message,id);
    });
    return () => {

    };
  }, []);
  return (
    <div
      className="chatPage"
      style={{
        backgroundColor: "black",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      hey {user}
      <div
        className="chatContainer"
        style={{
          backgroundColor: "white",
          width: "50%",
          height: "60%",
        }}
      >
        <div
          className="header"
          style={{
            backgroundColor: "crimson",
            height: "15%",
          }}
        ></div>
        <div
          className="chatBox"
          style={{
            border: "0.2vmax solid black",
            height: "70%",
          }}
        ></div>
        <div
          className="inputBox"
          style={{
            border: "0.2vmax solid black",
            height: "15%",
          }}
        >
          <TextField
            id="chatInput"
            style={{ width: "80%", backgroungColor: "white" }}
          ></TextField>
          <Button type="button" onClick={send} id="sendbtn">
            <img src={sendlogo} alt="logo" />
          </Button>{" "}
        </div>
      </div>
    </div>
  );
};

export default Chat;
