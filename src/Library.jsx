import React, { useEffect, useState } from 'react';

const Library = ({currentPreviewUrl,setCurrentPreviewUrl,setCurrentTrackImage,currentTrackImage,setCurrentName,setSongList}) => {
  const [selectedSongs, setSelectedSongs] = useState([]);

  useEffect(() => {
    // Fetch selected songs from local storage
    const storedSelectedSongs = JSON.parse(localStorage.getItem('selectedSongs'))||[];
    const storedSelectedSongsArt = JSON.parse(localStorage.getItem('selectedSongsArt')) || [];
    const mergedSelectedSongs = [...storedSelectedSongs, ...storedSelectedSongsArt];
    if (storedSelectedSongs) {
      setSelectedSongs(mergedSelectedSongs);
    }
    console.log(mergedSelectedSongs);
  }, []); 
  const handleSongClick = (previewUrl, image, name) => {
    setCurrentPreviewUrl(previewUrl);
    setCurrentTrackImage(image);
    setCurrentName(name);
  };

  const handleRemoveSong = (name) => {
    
    const updatedSongs = selectedSongs.filter(song => song.name !== name);
    setSelectedSongs(updatedSongs);

    
    localStorage.setItem('selectedSongs', JSON.stringify(updatedSongs));

    
    setSongList(updatedSongs);
  };
  return (
    <div>
      <div style={{ padding: '20px', maxWidth: '82%',height:"90vh",marginLeft:"17%",overflow:"auto" }}>
      <img src={currentTrackImage} alt="Play a song" style={{ width: '25%', maxHeight: '280px', backgroundSize:"100% 100%" ,marginLeft:"-20px" ,borderRadius:"10px" }} />
      <h3 style={{ marginTop: '10px', marginBottom: '5px',color:"white" ,marginLeft:"-20px" }}>My Playlist</h3>
      <h4 style={{ marginBottom: '5px',color:"white" ,marginLeft:"-20px"}}>Songs:</h4>
      <hr />
      <ul style={{ listStyleType: 'none', padding: 0 ,cursor:"pointer"}}>
  {selectedSongs.map((e, index) => {
    return (<>
      <li key={e.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', marginLeft: '-20px' }}>
        <span style={{ marginRight: '10px', color: 'white' }}>{index + 1}.</span>
        <span style={{ flexGrow: 1, color: 'white', cursor: 'pointer' }} onClick={() => handleSongClick(e.preview_url,e.album.images[0].url,e.name,selectedSongs)}>{e.name}
        {currentPreviewUrl === e.preview_url && <img src="https://jccdallas.org/wp-content/uploads/2020/06/Spotify-Play-Button-1-300x283.png" alt="Play" style={{ marginLeft: '10px', width: '20px', height: '20px' }} />}
        </span>
      </li>
      <button
                style={{
                  height: "13px",
                  borderRadius: "5px",
                  outline: "none",
                  position: "absolute",
                  marginLeft: "80%",
                  marginTop: "-30px",
                  width: "12px",
                  backgroundColor: 'red', 
                  border: 'none', 
                  cursor: 'pointer',
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onClick={() => handleRemoveSong(e.name)}
              >
                x
              </button>

    </>);
  })}
</ul>
    </div>
    </div>
  );
};

export default Library;
