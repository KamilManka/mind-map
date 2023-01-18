import { Form } from 'formik';
import { Autocomplete, TextField, Paper, Chip, ListItem, Button } from '@mui/material';
import React from 'react';
import Account from './Account';
import { languageList } from '../Data';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import LanguageTags from './LanguageTags';

const EditAccount = () => {
  const [userLanguages, setUserLanguages] = useState([]);

  let userProfile = JSON.parse(sessionStorage.getItem('userProfile'));

  useEffect(() => {
    setUserLanguages(userProfile.languages.languages);
  }, []);

  const formik = useFormik({
    initialValues: {
      languages: [],
      quantity: '',
      orderTitle: '',
      orderContent: '',
    },
    // validationSchema: yupSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      // setNotification("success");
      // setMessage("Dodano zamówienie");
    },
  });

  const handleLanguageTags = (tags) => {
    setUserLanguages(tags);
  };

  return (
    <Account>
      <form onSubmit={formik.handleSubmit} className="user-detail__skeleton">
        <TextField label="Name" defaultValue={userProfile?.user_name ? userProfile.user_name : ''} size="small" />
        <TextField label="City" defaultValue={userProfile?.city ? userProfile.city : ''} size="small" />
        <TextField label="Country" defaultValue={userProfile?.country ? userProfile.country : ''} size="small" />

        <LanguageTags
          languages={userLanguages}
          languageList={languageList}
          handleLanguageTags={() => handleLanguageTags()}
        />
        {/* <Button type="submit">Save</Button> */}
      </form>
    </Account>
  );
};

export default EditAccount;
