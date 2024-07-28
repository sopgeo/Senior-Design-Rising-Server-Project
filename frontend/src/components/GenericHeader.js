import React, { useState } from "react";
import CSS from "../css/GenericHeader.css";
import Login from "./Login.js";

export function GenericHeader({ background }) {
  const logout = () => {
    localStorage.removeItem("user")
  }

  function Header() {
    let user = localStorage.getItem("user")

    if (user === null) {
      return (
        <div className="Header">
          Computer Science Senior Design Projects
          <a className="loginLink" href="/login">
            <button className="loginButton">Login</button>
          </a> 

        </div>
      );
    }

    else {
      return (
        <div className="Header">
          Computer Science Senior Design Projects
          <a className="logoutLink" href="/">
            <button className="loginButton" onClickCapture={logout}>Logout</button>
          </a> 

        </div>
      );
    }
    }

  function showSidebar() {
    const sidebar = CSS.querySelector(".sidebar")
    // sidebar.style.display = 'flex'
  }

  function NavBar() {
    let user = localStorage.getItem("user")
    let css = "background";
    
    if (user === null) {
      return (
        <div className={css}>
          <div className="navbar">
          <div className="home"><a className="navItem" href="/">Home</a></div>
            <a className="navItem" href="/search">Projects</a>
            {/* <li onClick={showSidebar()}><a className="navItem"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></a></li> */}
          </div>
          <div className="sidebar">
          <div className="home"><a className="navItem" href="/">Home</a></div>
            <a className="navItem" href="/search">Projects</a>
          </div>
        </div>
      );
    }
    
    let ud = JSON.parse(user)
    let usertype = ud.type


    if (background == false) {
      css = "see-through";
    } 

    else if (usertype === "admin" || usertype==="coordinator") {
      return (
        <div className={css}>
          <div className="navbar">
            <div className="home"><a className="navItem" href="/">Home</a></div>
            <a className="navItem" href="/search">Projects</a>
            <a className="navItem" href="/upload">Upload</a>
            <a className="navItem" href="/groupManagement">Manage</a>
            {/* <a className="navItem"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></a> */}
          </div>
          <div className="sidebar">
            <div className="home"><a className="navItem" href="/">Home</a></div>
            <a className="navItem" href="/search">Projects</a>
            <a className="navItem" href="/upload">Upload</a>
            <a className="navItem" href="/groupManagement">Manage</a>
          </div>
        </div>
      );
    } else if (usertype === "student") {
      return (
        <div className={css}>
          <div className="navbar">
            <div className="home"><a className="navItem" href="/">Home</a></div>
            <a className="navItem" href="/search">Projects</a>
            <a className="navItem" href="/upload">Upload</a>
            {/* <a className="navItem"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></a> */}
          </div>
          <div className="sidebar">
            <div className="home"><a className="navItem" href="/">Home</a></div>
            <a className="navItem" href="/search">Projects</a>
            <a className="navItem" href="/upload">Upload</a>
          </div>
        </div>
      );
    } 
  }

  return (
    <div className="FullHeader">
      {Header()}
      {NavBar()}
    </div>
  );
}

export default GenericHeader;
