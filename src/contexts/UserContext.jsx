import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useNotificationContext } from "./NotificationContext";

export const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
  const [usersArray, setUsersArray] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { setNotificationStatus, setMessage } = useNotificationContext();
  const [userName, setUserName] = useState([]);
  const [isLoginView, setIsLoginView] = useState(false);
  const [isSignupView, setIsSignupView] = useState(false);
  const [userId, setUserId] = useState();


  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      setIsLoggedIn(true);
    }


  }, []);

  const toggleLoginForm = () => {
    setIsLoginView((prev) => !prev);
  };

  const toggleSignupForm = () => {
    setIsSignupView((prev) => !prev);
  };

  // move to usersController (MVC)
  const registerUser = async (userName, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: userName,
      password: password,
    });
    if (error) {
      //return notyfikacja
    }
    if (data) {
      const { error } = await supabase
        .from("user_profiles")
        .insert([{ id: data.user.id, user_name: data.user.email }]);
      if (error) {
        //notyfikacja
        console.log("insert error", error)
      }
    }
  };
  const getUserId = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    console.log(user.id)
    setUserId(user.id)
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
      setIsLoggedIn(true);
    }

    
};

  const logIn = async (values) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.login,
      password: values.password,

    });
    console.log("data login", data);
    setIsLoggedIn(true);
    console.log("logged in")
    getUserId();
    setIsLoginView(false);
    setMessage("You have successfully logged in");
    setNotificationStatus("success");


  };

  const logInWithThirdParty = async (provider) => {
    let { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider
    })
    console.log("data login", data);
    setIsLoggedIn(true);
    console.log("logged in")
    getUserId();
    setIsLoginView(false);
    setMessage("You have successfully logged in");
    setNotificationStatus("success");
  }

  const logOut = async () => {
    let { error } = await supabase.auth.signOut();
    setIsLoggedIn(false);
    setMessage("You have successfully logged out");
    setNotificationStatus("info");
  };

  return (
    <UserContext.Provider
      value={{
        registerUser,
        logIn,
        logOut,
        toggleLoginForm,
        toggleSignupForm,
        logInWithThirdParty,
        isLoggedIn,
        userName,
        isLoginView,
        isSignupView,
        userId
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUserContext = () => {
  const ctx = useContext(UserContext);

  if (!ctx) {
    // poza komponentem zwróci nulla
    throw new Error("Missing userContext, it's not wrapped in UserProvider");
  }
  return ctx;
};
