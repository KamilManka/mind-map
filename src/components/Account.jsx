import { Avatar, Paper, Skeleton } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import EditAccount from "./EditAccount";
import { useLocation } from "react-router-dom";
import { FiEdit3, FiRotateCcw } from "react-icons/fi";
import { Link } from "react-router-dom";

// type UserProfile = {
//   name:string,
//   city: string,
//   country: string,
//   languages: string[],
// };

const Account = ({ children }) => {
  const location = useLocation();
  return (
    <div className="account">
      <Paper
        elevation={2}
        className="account--details-card"
        sx={{ width: "80%" }}
      >
        <h2>
          Your account details{" "}
          {location.pathname === "/account/edit" ? (
            <Link to={"../"} title="Back to account view">
              <FiRotateCcw />
            </Link>
          ) : (
            <Link to={"edit"} title="Edit account details">
              <FiEdit3 />
            </Link>
          )}
        </h2>
        <Avatar sx={{ width: 80, height: 80, margin: "20px" }} />

        {children}
      </Paper>
    </div>
  );
};

export default Account;
