import React, { useEffect, useState } from 'react';
import { Button, ImageList, ImageListItem, ImageListItemBar, TextField } from '@mui/material';
import { TiPlus } from 'react-icons/ti';
import { supabase } from '../supabaseClient';

const Spotify = () => {
  const clientId = '83b8cf8a652942e38b59ecab32b504a8'; // Your client id
  const clientSecret = '227fa1a412a240759ba54406e5556535'; // Your secret
  const [showsList, setShowsList] = useState([]);
  const [showsQuery, setShowsQuery] = useState('');

  const requestToken = async () => {
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: clientId,
          client_secret: clientSecret,
        }).toString(),
      });
      const data = await response.json();
      console.log(data.access_token);
      return data.access_token;
    } catch (error) {
      console.error(error);
    }
  };

  const searchShows = async (query) => {
    try {
      const token = await requestToken();
      const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=show&market=US`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data.shows.items);
      setShowsList(data.shows.items);
      console.log(showsList);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    searchShows(showsQuery);
  }, []);

  const addShow = async (showId) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const userId = user.id;

  const { data, error } = await supabase
  .from('user_spotify')
  .insert({ spotify_show: showId, user_id: userId })


    console.log('show added', data);
  };

  const ShowTile = ({ imgUrl, title, id }) => {
    return (
      <div className="show-tile">
        <TiPlus className="spotify__thumbnail__add" onClick={() => addShow(id)} />
        <img src={imgUrl} alt="" />
        <h4>{title}</h4>
      </div>
    );
  };
  const handleShowsSearch = (query) => {
    setShowsQuery(query);
    searchShows(query);
  };

  return (
    <div>
      <h2>Spotify</h2>
      <TextField label="Search" size="small" onChange={(e) => handleShowsSearch(e.target.value)} />
      <div className="spotify-tiles">
        {showsQuery
          ? showsList.map((item) => <ShowTile imgUrl={item.images[0].url} title={item.name} id={item.id} />)
          : ''}
      </div>
    </div>
  );
};

export default Spotify;
