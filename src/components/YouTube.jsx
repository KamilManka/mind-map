import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigation } from 'react-router-dom';
import { Link, Pagination, TextField } from '@mui/material';
import { MdDeleteForever } from 'react-icons/md';
import youtubeAPI from '../apis/youtubeAPI';
import Slider from 'react-slick';


const YouTube = () => {
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState('');
  const [videoQuery, setVideoQuery] = useState('');

  const sliderSettings = {
   lazyLoad: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
   swipeToSlide: true,
     afterChange: function() {
    getYoutubeResults(nextPageToken);
     }
  };

  const getYoutubeResults = async (query) => {
    const response = await youtubeAPI.get(`/search?q=${query}`, {
      params: {
        // q: 'react'
        // pageToken: pageToken
      },
    });
    const data = await response.data;
    console.log("data", data)
    setVideos(data.items);
    setNextPageToken(data.nextPageToken)
  };

  // useEffect(() => {
  //   getYoutubeResults();
  // }, []);
  // console.log(videos);

  const ShowTile = ({ imgUrl, title, id }) => {
    return (
      <div className="show-tile">
        {/* <TiPlus className="spotify__thumbnail__add" onClick={() => addShow(id)} /> */}
        <img src={imgUrl} alt="" />
        <h4>{title}</h4>
      </div>
    );
  };

  const handleVideoSearch = (query) => {
    setVideoQuery(query);
    getYoutubeResults(query);
  };

  return (
    <div>
      <h2>Your videos</h2>
      <div >
        {/* <Slider {...sliderSettings} >
        {videos.map((video) => (
            <div key={video.id.videoId} className="yt__video-thumbnail">
              <div>
                <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} rel={'noreferrer'} target={'_blank'}>
                  <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
                  <p>{video.snippet.title}</p>
                </a>
              </div>
              <div className="yt__video-thumbnail__delete">
                <MdDeleteForever />
              </div> 
            </div>
          ))}
        </Slider> */}
      </div>
      <h2>Search new videos</h2>
      <TextField label="Search" size="small" onChange={(e) => handleVideoSearch(e.target.value)} />
      <div className="spotify-tiles">
        {videoQuery
          ? videos.map((video) => <ShowTile imgUrl={video.snippet.thumbnails.medium.url} title={video.snippet.title} id={video.id.videoId} />)
          : ''}
      </div>
    </div>
  );
};

export default YouTube;

