import React from "react";
import "../css/GenericHeader.css";
import Login from "./Login.js";

export function GenericHeader({ background, user }) {
  function Header() {
    return (
      <div className="Header">
        Computer Science Senior Design Projects
        <a className="loginLink" href="/login">
          <button className="loginButton">Login</button>
        </a> 
      </div>
    );
  }

  function NavBar() {
    let user = localStorage.getItem("user")
    let ud = JSON.parse(user)
    let usertype = ud.type

    let css = "background";
    if (background == false) {
      css = "see-through";
    } 

    if (usertype === "admin") {
      return (
        <div className={css}>
          <div className="navbar">
            <div className="home"><a className="navItem" href="/">Home</a></div>
            <a className="navItem" href="/search">Projects</a>
            <a className="navItem" href="/upload">Upload</a>
            <a className="navItem" href="/manage">Manage</a>
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
    } else {
      return (
        <div className={css}>
          <div className="navbar">
          <div className="home"><a className="navItem" href="/">Home</a></div>
            <a className="navItem" href="/search">Projects</a>
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
