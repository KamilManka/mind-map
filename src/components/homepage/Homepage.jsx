import { Button } from '@mui/material';
import React from 'react';
import { useUserContext } from '../../contexts/UserContext';
import { supabase } from '../../supabaseClient';
import {Link} from "react-router-dom"

export const Homepage = () => {
  const { logOut,toggleLoginForm,toggleSignupForm } = useUserContext();

  supabase.auth.onAuthStateChange((event, session) => {
    console.log(event, session);
  });

  return (
    <>
      <div>Homepage</div>
      <Button onClick={logOut}>Log-out</Button>

      <Link
        onClick={() => {
          toggleSignupForm();
        }}
      >
        <div className="red-btn">Sign-up</div>
      </Link>

      <Link onClick={() => toggleLoginForm()}>
        <div className="outline-btn">Log-in</div>
      </Link>
    </>
  );
};
