import React from "react";
import { Navbar } from "./Navbar";

export const Main = ({children}) => {
  return (
    <main>
            <Navbar />

      {/* <div> */}
        {children}
      {/* </div> */}
    </main>
  );
};
