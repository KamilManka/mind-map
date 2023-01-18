import React, { useEffect } from 'react';
import { useUserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

export const ProtectedWrapper = ({ children }) => {
  const { isLoggedIn } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return <>{children}</>;
};
