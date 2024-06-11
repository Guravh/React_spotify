import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
const Inner = ({
  currentPreviewUrl,
  setCurrentPreviewUrl,
  updateSelectedSongs,
  setCurrentTrackImage,
  setCurrentName,
  setSongList,
}) => {
  const [tracks, setTracks] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  // const [currentUrl, setCurrentUrl] = useState(null);
  const location = useLocation();
  const { state } = location;
  const albumImage = state ? state.albumImage : null;
  const albumName = state ? state.albumName : null;
  useEffect(() => {
    const getTracks = async () => {
      try {
        const accessToken = localStorage.getItem("spotify_token");
        if (!accessToken) {
          console.error("Access token not found in local storage.");
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
        console.log(data.tracks.items.slice(0, 12));
        setTracks(data.tracks.items.slice(0, 12));
        console.log(tracks);
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    };
    getTracks();
  }, []);
  const handleSongClick = (previewUrl, image, name) => {
    setCurrentPreviewUrl(previewUrl);
    setCurrentTrackImage(image);
    setCurrentName(name);
    setSongList(tracks);
  };
  const handleAddOrRemove = (index) => {
    const selectedSong = tracks[index];
    const isSelected = selectedSongs.some(
      (song) => song.id === selectedSong.id
    );

    if (isSelected) {
      setSelectedSongs(
        selectedSongs.filter((song) => song.id !== selectedSong.id)
      );
    } else {
      setSelectedSongs([...selectedSongs, selectedSong]);
      updateSelectedSongs(selectedSongs);
    }
  };
  console.log(selectedSongs);
  useEffect(() => {
    localStorage.setItem("selectedSongs", JSON.stringify(selectedSongs));
  }, [selectedSongs]);
  return (
    <>
      <div
        style={{
          padding: "20px",
          maxWidth: "82%",
          height: "90vh",
          marginLeft: "17%",
          overflow: "auto",
        }}
      >
        <img
          src={albumImage}
          alt="Album Cover"
          style={{
            width: "25%",
            maxHeight: "280px",
            backgroundSize: "100% 100%",
            marginLeft: "-20px",
            borderRadius: "10px",
          }}
        />
        <h3
          style={{
            marginTop: "10px",
            marginBottom: "5px",
            color: "white",
            marginLeft: "-20px",
          }}
        >
          {albumName}
        </h3>
        <p
          style={{ marginBottom: "10px", color: "white", marginLeft: "-20px" }}
        >
          Release Date: 1995-06-16
        </p>
        <h4
          style={{ marginBottom: "5px", color: "white", marginLeft: "-20px" }}
        >
          Songs:
        </h4>
        <hr />
        <ul style={{ listStyleType: "none", padding: 0, cursor: "pointer" }}>
          {tracks.map((e, index) => {
            return (
              <>
                <li
                  key={e.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "7px 0",
                    marginLeft: "-20px",
                  }}
                >
                  <span style={{ marginRight: "10px", color: "white" }}>
                    {index + 1}.
                  </span>
                  <span
                    style={{ flexGrow: 1, color: "white", cursor: "pointer" }}
                    onClick={() =>
                      handleSongClick(
                        e.preview_url,
                        e.album.images[0].url,
                        e.name,
                        tracks
                      )
                    }
                  >
                    {e.name}
                    {currentPreviewUrl === e.preview_url && (
                      <img
                        src="https://jccdallas.org/wp-content/uploads/2020/06/Spotify-Play-Button-1-300x283.png"
                        alt="Play"
                        style={{
                          marginLeft: "10px",
                          width: "20px",
                          height: "20px",
                        }}
                      />
                    )}
                  </span>
                </li>
                <button
                  style={{
                    height: "13px",
                    position: "absolute",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "-30px",
                    marginLeft: "77%",
                    borderRadius: "5px",
                    outline: "none",
                    backgroundColor: selectedSongs.some(
                      (song) => song.id === e.id
                    )
                      ? "green"
                      : "transparent",
                  }}
                  onClick={() => handleAddOrRemove(index)}
                >
                  +
                </button>
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Inner;
