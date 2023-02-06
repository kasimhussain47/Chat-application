import React, { useEffect, useState } from "react";
// import io from 'socket.io-client';
import { user } from "../Join/Join";
import socketio from "socket.io-client";
import { Button, TextField } from "@mui/material";
import sendlogo from "../../Images/send.png";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from '../../Images/closeIcon.png'


const ENDPOINT = "http://localhost:4500/";
const socket = socketio.connect(ENDPOINT);

// let socket;
// const socket = io();
const Chat = () => {
  const [id, setid] = useState("");
  const [messages, setMessages] = useState([]);

  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("message", { user, message, id });
    document.getElementById("chatInput").value = "";

  };
  console.log(messages);


  useEffect(() => {
    socket.on("connect", () => {
      // socket.emit("kasim", "hi my id is:");
      // alert("hey there");
      setid(socket.id);
    });

    socket.emit("joined", { user });
    
    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on("leave", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });
    return () => {};
  },[]);

  useEffect(() => {
    // socket.on("sendMessage", (user, message, id) => {
    //   setMessages([...messages, user, message, id]);
    //   console.log(user, message, id);
    socket.on('sendMessage', (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message, data.id);
    });
    return () => {
      socket.off();
    };
  }, [messages]);
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
            display:"flex",
            alignItems:'center',
            justifyContent:'space-between',
          }}
        > 
        <h2 style={{padding:'10px'}}><b>C Chat</b></h2>
        <a href="/"><img src={closeIcon} alt='icon' style={{height:"30%",padding:'20px'}} /></a>
        </div>
        <div
          className="chatBox"
          style={{
            // border: "0.2vmax solid black",
            height: "70%",
            overflowY: "auto",
          }}
        >
          {
            messages.map((item, i) => (
            <Message
              user={item.id === id ? "" : item.user}
              message={item.message}
              classs={item.id === id ? "right" : "left"}
            />
    ))
          }
        </div>
        <div
          className="inputBox"
          style={{
            // border: "0.2vmax solid black",
            height: "13%",
            // border:'none',
            // borderColor:'crimson',
            borderTopLeftRadius:'10px',
            borderTopRightRadius:'10px',
            paddingBottom: "10px",
            backgroundColor: "black",
            position:"relative",
          }}
        >
          <TextField
            id="chatInput"
            onKeyPress={(event) => event.key === 'Enter' ? send() : null}
            style={{ width: "80%", marginTop: "7px",backgroundColor:"white",color:"currentcolor"}}
          ></TextField>
          <Button type="button" onClick={send} id="sendbtn">
            <img src={sendlogo} alt="logo" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
