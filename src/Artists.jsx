import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
const Artists = () => {
  const [tracks,setTracks]=useState([]);
  const Nav= useNavigate();
  useEffect(()=>{
    const getTracks = async () => {
      try {
        const accessToken = localStorage.getItem('spotify_token');

        if (!accessToken) {
          console.error('Access token not found in local storage.');
          return;
        }
        const response = await fetch("https://api.spotify.com/v1/search?q=Hip-Hop&type=artist", {
           headers: {
             'Authorization': `Bearer ${accessToken}`
           }
         });
        const data = await response.json();
        console.log(data.artists.items);
        setTracks(data.artists.items.slice(0,6));
      } catch (error) {
        console.error('Error fetching tracks:', error);
      }
    };
    getTracks();
  },[])
  const handleNav = (artistId,artistImage,artistname) => {
    Nav(`/Art/${artistId}`,{state:{ artistImage,artistname }});
  };
  return (
    <>
      <div className="spotify-playlists">
      <h2>Artists</h2>
      <div className="list">
      {tracks.map((e)=>{
  return <div key={e.id} onClick={() => handleNav(e.id, e.images[0].url,e.name)} className="item">
 <img src={e.images[0].url} alt={e.name} style={{borderRadius:"100px"}} />
 <div className="play">
   <span className="fa fa-play" />
 </div>
 <h4>{e.name}</h4>
</div>
})}
      </div>
      <hr />
    </div>
    </>
  )
}

export default Artists