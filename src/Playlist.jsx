import React, { useEffect, useRef, useState } from 'react';
const Playlist = ({onTrackSelect}) => {
  const [tracks,setTracks]=useState([]);
  const [currentPlayingTrack, setCurrentPlayingTrack] = useState(null);
  const audioRef = useRef(new Audio());
  useEffect(()=>{
    const getTracks = async () => {
      try {
        // const accessToken = "BQDEOh2TIcnW8pZd2mFIXWWdbjiFVWEW310LI6MvH3lw5_1I52JXo2sZqIPzHgJW42GLMdsVOXioYLr9q9GZnnVxStUF6IP0LOk-mZh8ViaDj2CraqUPlXMw7vscKp75g8vIwQYYYjnSNFibecnwo_c91dlVGISzbQ6aD3poJ9v_MMozvHD6pk4ys8Ddix_Ii8-j1hhoOG6y7jqwSl7mIfboG5F-GI301rSA714dqpTm33Xy1U8HO2LI1XrV-DmkRd1oDHsZFb2A_lCmCBoc0Rg2";
        const accessToken = localStorage.getItem('spotify_token');
        if (!accessToken) {
          console.error('Access token not found in local storage.');
          return;
        }
      const response = await fetch ("https://api.spotify.com/v1/search?q=Ehide&type=track", {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        const data = await response.json();
        console.log(data.tracks.items);
        setTracks(data.tracks.items.slice(0,6));
      } catch (error) {
        console.error('Error fetching tracks:', error);
      }
    };
    getTracks();
  },[])
  const handleTrackClick = (previewUrl,image,name) => {
    if (currentPlayingTrack === previewUrl) {
      setCurrentPlayingTrack(null);
      onTrackSelect(null,null);
    } else {
      setCurrentPlayingTrack(previewUrl);
      onTrackSelect(previewUrl,image,name);
    }
  };
  return (
    <>
    <div className="spotify-playlists">
      <h2>Songs on The Go</h2>
      <div className="list">
        {tracks.map((e)=>{
    return <div key={e.id} className="item" style={{width:"30%"}} >
  <img src={e.album.images[0].url}  />
    <div className="play" onClick={() => handleTrackClick(e.preview_url,e.album.images[0].url,e.album.name)}>
    {currentPlayingTrack === e.preview_url ? (
              <img src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes-3/3/05-512.png" alt="Play" style={{ marginLeft: '10px', width: '20px', height: '20px',marginTop:"2px" }} />
              ) : (
                <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="12" fill="#1ED760" />
                <path
                  d="M9.5 17V7L15.5 12L9.5 17Z"
                  fill="white"
                />
              </svg>
              )}
  </div>
   <h4>{e.album.name}</h4>
   <p>Release Date : {e.album.release_date}</p>
   {/* <audio style={{height:"30px"}} src={e.preview_url} controls className='w-100' ></audio> */}
 </div>
        })}
      </div>
    </div>
    </>
  )
}

export default Playlist