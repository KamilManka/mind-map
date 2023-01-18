import { Button, TextField, Slide } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

//TODO: move to validators
const yupSchema = yup.object({
  login: yup.string().required().min(8),
  password: yup.string().required().min(8).matches(
    "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$",
    "Must contain 8 characters, one uppercase, one lowercase, one number and one special  character"
  ),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});

export const Signup = () => {
  const {registerUser, toggleSignupForm} = useUserContext();
    const formik = useFormik({
        initialValues: {
          login: "",
          password: "",
          confirmPassword: ""
        },
       // validationSchema: yupSchema,
        onSubmit: ({login,password}) => {
          console.log({login,password})
          registerUser(login,password);
        }
      });
      return (
        <div className="signup">
          <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <div className="register-form-container">
          <form onSubmit={formik.handleSubmit} className="signup-form">
            <TextField size="small" name="login" label="Login" onChange={formik.handleChange} />
            <TextField size="small" name="password" type="password" label="Password" onChange={formik.handleChange} />
            <TextField size="small" name="confirmPassword" type="password" label="Confirm password" onChange={formik.handleChange} />
            <Button type="submit">Sign-up</Button>
            <Button component={Link} onClick={() => toggleSignupForm()}>
            Cancel
          </Button>
          </form>
        </div>
        </Slide>
        </div>
      );
    };
    
