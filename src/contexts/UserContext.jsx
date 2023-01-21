import { createContext, useState, useContext, useEffect } from "react";
import { useNavigation } from "react-router-dom";
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
  // const navigate = useNavigation("");


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

    }).then(data => {
      setIsLoggedIn(true);
    }).then(() => {
      setTimeout(() => {
        getUserId();
        setIsLoginView(false);
        setMessage("You have successfully logged in");
        setNotificationStatus("success");
      }, 2000);

    })
    console.log("data login", data);
    console.log("logged in")

  };

  const logInWithThirdParty = async (provider) => {
    let { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider
      })
      // .then(() => {
      // setTimeout(() => {
        getUserId();
        setIsLoginView(false);
        setIsLoggedIn(true);
      //   setMessage("You have successfully logged in");
      //   setNotificationStatus("success");
      // }, 2000);

    // })
    console.log("data login", data);
    console.log("logged in")
  }

  const logOut = async () => {
    let { error } = await supabase.auth.signOut();
    setIsLoggedIn(false);
    setMessage("You have successfully logged out");
    setNotificationStatus("info");
    sessionStorage.removeItem("user")
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
