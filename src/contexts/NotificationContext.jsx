import { Alert } from "@mui/material";
import React, { createContext, useState, useContext } from "react";

export const NotificationContext = createContext(undefined);

export const NotificationProvider = ({ children }) => {
  const [notificationStatus, setNotificationStatus] = useState("");
  const [message, setMessage] = useState("");

  setTimeout(() => setNotificationStatus(undefined), "3000");
  let content = "";
  if (notificationStatus) {
    content = (
      <>
        {children}
        <Alert
          severity={notificationStatus}
          sx={{ position: "fixed", top: "50px", left: '50%',
          transform: 'translate(-50%, 0)'}}
        >
          {message}
        </Alert>
      </>
    );
  } else {
    content = <>{children}</>;
  }

  return (
    <NotificationContext.Provider value={{ setNotificationStatus, setMessage }}>
      {content}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const ctx = useContext(NotificationContext);

  if (!ctx) {
    // poza komponentem zwróci nulla
    throw new Error(
      "Missing NotificationContext, it's not wrapped in NotificationProvider"
    );
  }
  return ctx;
};
