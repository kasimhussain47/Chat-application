import React, { useState } from "react";
import logo from "../../Images/logo.png";
import { Button} from "@mui/material";
import { Link } from "react-router-dom";
import socketio from "socket.io-client";
const ENDPOINT = "http://localhost:4500/";
const socket = socketio.connect(ENDPOINT);
let user;

const Join = () => {

  const [name ,setName] = useState();
  
    const sendUser = () => {
        user = document.getElementById('JoinInput').value;
       document.getElementById('JoinInput').value = "";
       socket.emit("joined", user);
    }
  return (
    <div
      className="JoinPage"
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
        className="JoinContainer"
        style={{
          //   border: "2px solid white",
          color: "black",
          height: "50%",
          width: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          //   textAlign:'center'
        }}
      >
        <img src={logo} style={{ width: "10vmax" }} alt="logo" />
        <h1
          style={{
            color: "white",
            fontSize: "40px",
            borderBottom: "2px solid white",
            boxSizing: "border-box",
          }}
        >
          C Chat
        </h1>
        <input
          id="JoinInput"
          placeholder="Enter your name"
          style={{
            backgroundColor: "#a5a5a5",
            textAlign: "center",
            color: "black",
            width: "25vw",
            height: "8vh",
            boxSizing: "border-box",
            outline: "none",
            border: "none",
            borderRadius: "4px",
          }}
            type="text"
            onChange={(e) => setName(e.target.value)}
        ></input>
        <br />
        <Link onClick={(e) => !name ? e.preventDefault():null} to="/chat">
          <Button id="Joinbtn" onClick={sendUser}>
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
export {user};