import React, { useState } from "react";

const Search = ({ allSongs, setCurrentPreviewUrl, setCurrentTrackImage, setCurrentName }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSong, setSelectedSong] = useState(null);
  
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  
  const filterSongs = () => {
    return allSongs.filter((song) =>
      song.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  
  const groupSongsIntoRows = (songs) => {
    const rows = [];
    for (let i = 0; i < songs.length; i += 5) {
      const rowSongs = songs.slice(i, i + 5);
      rows.push(rowSongs);
    }
    return rows;
  };

  const handleSearchButtonClick = () => {
    const filteredSongs = filterSongs();
    console.log(filteredSongs);
  };
  const handleSongClick = (previewUrl, trackImage, trackName) => {
    setCurrentPreviewUrl(previewUrl);
    setCurrentTrackImage(trackImage);
    setCurrentName(trackName);
    setSelectedSong({ previewUrl, trackImage, trackName });
  };
  return (
    <>
      <div className="search-bar" style={{ marginRight: "200px" }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          style={{
            borderRadius: "7px",
            padding: "7px",
            marginLeft: "50%",
            marginTop: "15px",
          }}
        />
      </div>
      <hr />
      <div className="main" style={{ marginTop: "60px" }}>
        {groupSongsIntoRows(filterSongs()).map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="row"
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            {row.map((song) => (
              <div
                key={song.id}
                className="song-container"
                style={{ height: "18vh", width: "10%", margin: "0 10px" }}
                onClick={() => handleSongClick(song.preview_url, song.album.images[0].url, song.name)}
              >
                <div className="img">
                  <img
                    src={song.album.images[0].url}
                    alt={song.name}
                    style={{ width: "100%", height: "70%" }}
                  />
                </div>
                <span
                  style={{
                    display: "block",
                    textAlign: "center",
                    marginTop: "5px",
                    color: "white",
                  }}
                >
                  {song.name}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Search;
