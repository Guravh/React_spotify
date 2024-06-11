import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
const Album = () => {
  const [tracks, setTracks] = useState([]);
  console.log(tracks);
  const navigate = useNavigate();
  useEffect(() => {
    const getTracks = async () => {
      try {
        const accessToken = localStorage.getItem('spotify_token');
        
        if (!accessToken) {
          console.error('Access token not found in local storage.');
          return;
        }
        const response = await fetch(
          "https://api.spotify.com/v1/search?q=Micheal jackson&type=track",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        console.log(data.tracks.items);
        setTracks(data.tracks.items.slice(0, 6));
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    };
    getTracks();
  }, []);
  const handleNav = (albumId,albumImage,albumName) => {
    navigate(`/inner/${albumId}`,{state:{ albumImage,albumName }});
  };
  return (
    <>
      <div className="spotify-playlists">
        <h2>Albums</h2>
        <div className="list">
          {tracks.map((e) => {
            return (
              <div key={e.id}  onClick={() => handleNav(e.id, e.album.images[0].url,e.name)} className="item">
                <img src={e.album.images[0].url} />
                <div className="play">
                  <span className="fa fa-play" />
                </div>
                <h4>{e.name}</h4>
                <p>Release Date : {e.album.release_date}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Album;
