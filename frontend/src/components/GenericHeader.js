import React, { useState } from "react";
import "../css/GenericHeader.css";
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

  function NavBar() {
    let user = localStorage.getItem("user")
    let css = "background";
    
    if (user === null) {
      return (
        <div className={css}>
          <div className="navbar">
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

    else if (usertype === "coordinator") {
      return (
        <div className={css}>
          <div className="navbar">
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
