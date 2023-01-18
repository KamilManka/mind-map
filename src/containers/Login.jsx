import { Button, Slide, TextField } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useUserContext } from "../contexts/UserContext";

//TODO: sprawdzić czy zgadza się z bazą
//TOOD: validators -> scheme
const yupSchema = yup.object({
  login: yup.string().required().min(8),
  password: yup.string().required().min(8),
});

export const Login = () => {
  const { logIn, toggleLoginForm, toggleSignupForm, isLoggedIn } = useUserContext();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema: yupSchema,
    onSubmit: (values) => {
      logIn(values);
    },
  });

  // if (isLoggedIn) {
  //   navigate("/dashboard")
  // }

  let slide = true;

  return (
    <div className="login">
      <Slide direction="down" in={slide} mountOnEnter unmountOnExit>
        <div className="login-form-container">
          <form onSubmit={formik.handleSubmit} className="login-form">
            <TextField
              size="small"
              name="login"
              label="Login"
              onChange={formik.handleChange}
            />
            <TextField
              size="small"
              name="password"
              type="password"
              label="Password"
              onChange={formik.handleChange}
            />
            <Button type="submit">Log-in</Button>
            <Button
              component={Link}
              onClick={() => {
                toggleLoginForm();
                toggleSignupForm();
              }}
            >
              Sign-up
            </Button>
            <Button component={Link} onClick={() => {toggleLoginForm()}}>
              Cancel
            </Button>
          </form>
        </div>
      </Slide>
    </div>
  );
};
