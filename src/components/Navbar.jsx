import { React, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Login } from "../containers/Login";
import { Signup } from "../containers/Signup";
import { FiLogIn, FiMenu } from "react-icons/fi";
import { CiCircleQuestion, CiGrid41, CiCircleMore } from "react-icons/ci";
import {IoIosLogOut} from "react-icons/io"
import { useUserContext } from "../contexts/UserContext";
import Auth from "../Auth";
import { Avatar, ClickAwayListener, Slide } from "@mui/material";
import { AsideMenu } from "./AsideMenu";

const linkStyle = {
  textDecoration: "none",
  color: "#E6E6E6",
};

export const Navbar = () => {
  

  const { toggleLoginForm, isLoginView, isLoggedIn, toggleSignupForm, isSignupView } =
    useUserContext();

  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const handleClick = () => {
    setOpen((prev) => !prev);
    console.log("clicked");
  };

  const handleClickAway = () => {
    setOpen(false);
  };
console.log("isloggedin", isLoggedIn);
  //TODO: rozdzielić na dwa komponenty
  if (!isLoggedIn) {
    return (
      // <nav className="navbar">
      //   <div className="navbar__links">
      //     <Link style={linkStyle}>Discover</Link>
      //     <Link style={linkStyle}>About</Link>
      //     <Link style={linkStyle}>Contact</Link>
      //     <Link style={linkStyle} to="auth">
      //       Auth
      //     </Link>
      //   </div>
      //   <Link onClick={() => toggleLoginForm()}>
      //     <div className="outline-btn">Log-in</div>
      //   </Link>

      //   <Link
      //     onClick={() => {
      //       toggleSignupForm();
      //     }}
      //   >
      //     <div className="red-btn">Sign-up</div>
      //   </Link>
      //   <Link onClick={() => toggleLoginForm()}>
      //     <FiLogIn className="login-icon" alt="Login" />
      //   </Link>

      //   <FiMenu className="menu-icon" />
      //   {isLoginView ? <Login /> : null}
      //   {isSignupView ? <Signup /> : null}
      // </nav>
      <>
      <nav className="navbar__logged-out">
        <ul className="navbar-nav">
          <li className="logo">
            <Link to={"/"} className="nav-link__logged-out">
              <span className="link-text logo-text">Mind Map</span>
            </Link>
          </li>

          {/* <li className="nav-item">
            <Link to={"discover"} className="nav-link__logged-out">
              <span className="link-text">Discover</span>
            </Link>
          </li> */}

          <li className="nav-item">
            <Link
              onClick={() => {
                toggleSignupForm();
              }}
            >
              <div className="red-btn">Sign-up</div>
            </Link>
          </li>

          <li className="nav-item">
            <Link onClick={() => toggleLoginForm()}>
              <div className="outline-btn">Log-in</div>
            </Link>
          </li>

          <li className="nav-item">
            <a href="#" className="nav-link__logged-out">
              <CiCircleQuestion className="nav-icon" size={"30px"} />
              <span className="link-text">About</span>
            </a>
          </li>
        </ul>

      </nav>
              {isLoginView ? <Login /> : null}
              {isSignupView ? <Signup /> : null}</>
    );
  } else {
    return (
      <nav className="navbar">
        <ul className="navbar-nav">
          <li className="logo">
            <Link to={"/"} className="nav-link">
              <span className="link-text logo-text">Mind Map</span>
              <FiMenu />
            </Link>
          </li>


          <li className="nav-item">
            <Link to={"dashboard/overview"} className="nav-link">
              <CiGrid41 className="nav-icon" size={"30px"} />
              <span className="link-text">Dashboard</span>
            </Link>
          </li>

          
          <li className="nav-item">
            <Link to={"account"} className="nav-link">
              <div className="nav--avatar-wrapper">
                <Avatar sx={{width: "30px", height: "30px"}} />
              </div>

              <span className="link-text">Profile</span>
            </Link>
          </li>

          <li className="nav-item">
          <Link to={"spotify"} className="nav-link">
              <CiCircleMore className="nav-icon" size={"30px"} />
              <span className="link-text">More</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/" className="nav-link">
              <IoIosLogOut className="nav-icon" size={"30px"} />
              <span className="link-text">Log-out</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/" className="nav-link">
              <CiCircleQuestion className="nav-icon" size={"30px"} />
              <span className="link-text">About</span>
            </Link>
          </li>

          {/* <li className="nav-item" id="themeButton">
            <a href="#" className="nav-link">
              <svg
                className="theme-icon"
                id="lightIcon"
                aria-hidden="true"
                focusable="false"
                data-prefix="fad"
                data-icon="moon-stars"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="svg-inline--fa fa-moon-stars fa-w-16 fa-7x"
              >
                <g className="fa-group">
                  <path
                    fill="currentColor"
                    d="M320 32L304 0l-16 32-32 16 32 16 16 32 16-32 32-16zm138.7 149.3L432 128l-26.7 53.3L352 208l53.3 26.7L432 288l26.7-53.3L512 208z"
                    className="fa-secondary"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M332.2 426.4c8.1-1.6 13.9 8 8.6 14.5a191.18 191.18 0 0 1-149 71.1C85.8 512 0 426 0 320c0-120 108.7-210.6 227-188.8 8.2 1.6 10.1 12.6 2.8 16.7a150.3 150.3 0 0 0-76.1 130.8c0 94 85.4 165.4 178.5 147.7z"
                    className="fa-primary"
                  ></path>
                </g>
              </svg>
              <svg
                className="theme-icon"
                id="solarIcon"
                aria-hidden="true"
                focusable="false"
                data-prefix="fad"
                data-icon="sun"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="svg-inline--fa fa-sun fa-w-16 fa-7x"
              >
                <g className="fa-group">
                  <path
                    fill="currentColor"
                    d="M502.42 240.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.41-94.8a17.31 17.31 0 0 0-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4a17.31 17.31 0 0 0 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.41-33.5 47.3 94.7a17.31 17.31 0 0 0 31 0l47.31-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3a17.33 17.33 0 0 0 .2-31.1zm-155.9 106c-49.91 49.9-131.11 49.9-181 0a128.13 128.13 0 0 1 0-181c49.9-49.9 131.1-49.9 181 0a128.13 128.13 0 0 1 0 181z"
                    className="fa-secondary"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M352 256a96 96 0 1 1-96-96 96.15 96.15 0 0 1 96 96z"
                    className="fa-primary"
                  ></path>
                </g>
              </svg>
            </a>
          </li> */}
        </ul>
      </nav>

    );
  }
};
