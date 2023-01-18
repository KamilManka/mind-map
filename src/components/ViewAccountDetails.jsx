import React from 'react';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import Account from './Account';
import EditAccount from './EditAccount';
import { Skeleton, TextField } from '@mui/material';

export const ViewAccountDetails = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //TODO: move to controller
  const getUserId = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log(user.id);
    return user.id;
  };

  const getUserData = async (userId) => {
    const { data, error } = await supabase.from('user_profiles').select('*').eq('id', userId).single();
    return data;
  };

  const getUserProfileData = async () => {
    const userId = await getUserId();
    const userData = await getUserData(userId);
    setUserProfile(userData);
    sessionStorage.setItem('userProfile', JSON.stringify(userData));
    console.log(userProfile);
  };
  useEffect(() => {
    setIsLoading(true);
    getUserProfileData().then(() => {
      setIsLoading(false);
    });
  }, []);
  return (
    <Account>
      {isLoading ? (
        <>
          <Skeleton variant="rounded" width={210} height={40} />
          <Skeleton variant="rounded" width={210} height={40} />
          <Skeleton variant="rounded" width={210} height={40} />
          <Skeleton variant="rounded" width={210} height={40} />
        </>
      ) : (
        <>
          {/* TODO: label z danymi komponent */}
          <div className="user-detail">
            <span>Name</span>
            {userProfile?.user_name ? userProfile.user_name : ''}
          </div>
          <div className="user-detail">
            <span>City</span>
            {userProfile?.city ? userProfile.city : ''}
          </div>
          <div className="user-detail">
            <span>Country</span>
            {userProfile?.country ? userProfile.country : ''}
          </div>
          <div className="user-detail">
            <span>Languages</span>
            <ul>
              {userProfile?.languages
                ? userProfile.languages.languages.map((el) => {
                    return <li>{el}</li>;
                  })
                : ''}
            </ul>
          </div>
        </>
      )}
    </Account>
  );
};
