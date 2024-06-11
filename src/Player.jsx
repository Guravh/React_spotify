import React, { useEffect, useState } from "react";

const Player = ({setCurrentPreviewUrl, currentPreviewUrl, trackImage, trackName,songList }) => {
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledIndices, setShuffledIndices] = useState([]);
console.log(songList);
  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);

  };
  const toggleShuffle = () => {
    if (isShuffle && shuffledIndices.length > 0) {
      setIsShuffle(false);
      setShuffledIndices([]);
    } else {
      setIsShuffle(true);
      if (!currentPreviewUrl) {
        const shuffled = shuffleSongs(songList);
        setShuffledIndices(shuffled);
      }
    }
  };
  
  const shuffleSongs = () => {
    const indices = [...Array(songList.length).keys()];
    const shuffled = indices.sort(() => Math.random() - 0.5);
    setCurrentIndex(0);
    setCurrentPreviewUrl(songList[shuffled[0]].preview_url);
    return shuffled;
  };

  const playNextSong = () => {
    let nextIndex;
    if (isShuffle) {
      if (shuffledIndices.length === 0) {
        const shuffled = shuffleSongs(songList);
        setShuffledIndices(shuffled);
        nextIndex = shuffled[0];
      } else {
        nextIndex = (currentIndex + 1) % shuffledIndices.length;
      }
      setCurrentIndex(nextIndex);
      setCurrentPreviewUrl(songList[shuffledIndices[nextIndex]].preview_url);
    } else {
      nextIndex = (currentIndex + 1) % songList.length;
      setCurrentIndex(nextIndex);
      setCurrentPreviewUrl(songList[nextIndex].preview_url);
    }
  };
  
  const playPreviousSong = () => {
    let prevIndex;
    if (isShuffle) {
      if (shuffledIndices.length === 0) {
        const shuffled = shuffleSongs(songList);
        setShuffledIndices(shuffled);
        prevIndex = shuffled[0];
      } else {
        prevIndex = (currentIndex - 1 + shuffledIndices.length) % shuffledIndices.length;
      }
      setCurrentIndex(prevIndex);
      setCurrentPreviewUrl(songList[shuffledIndices[prevIndex]].preview_url);
    } else {
      prevIndex = (currentIndex - 1 + songList.length) % songList.length;
      setCurrentIndex(prevIndex);
      setCurrentPreviewUrl(songList[prevIndex].preview_url);
    }
  };
  
  useEffect(() => {
    const audioElement = document.getElementById("audio-player");
  
    const handleSongEnded = () => {
      // Play the next song when the current song ends
      playNextSong();
    };
  
    audioElement.addEventListener("ended", handleSongEnded);
  
    return () => {
      audioElement.removeEventListener("ended", handleSongEnded);
    };
  }, [currentPreviewUrl, playNextSong]);

  return (
    <>
      <div className="preview">
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            height: "10vh",
            width: "100%",
            backgroundColor: "#000",
            padding: "10px",
            borderTop: "1px solid #666",
          }}
        >
          <audio id="audio-player"
            src={currentPreviewUrl}
            controls
            autoPlay
            loop={isRepeat}
            style={{
              borderRadius: "0",
              width: "80%",
              margin: "0 auto",
              display: "block",
              backgroundColor: "#000",
              border: "none",
            }}
          />
          {trackImage && (
            <img
              src={trackImage}
              alt="current song image"
              style={{
                marginTop: "-57px",
                height: "7vh",
                position: "absolute",
              }}
            />
          )}
          {trackName && (
            <p
              style={{
                marginLeft: "0%",
                fontFamily: "sans-serif",
                position: "absolute",
                marginTop: "9px",
                color: "wheat",
              }}
            >
              {trackName}
            </p>
          )}
           <button
            onClick={playPreviousSong}
            style={{
              position: "absolute",
              left: "50%",
              top: "70px",
              backgroundColor: "transparent",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "25px",
              height: "25px",
              cursor: "pointer",
              padding: "0",
            }}
          >
            <img src="https://cdn0.iconfinder.com/data/icons/viiva-audio-video/32/previous-512.png" alt="" style={{height:"20px",borderRadius:"50px",backgroundColor:"white"}} />
          </button>
          <button
            onClick={playNextSong}
            style={{
              position: "absolute",
              left: "52%",
              top: "70px",
              backgroundColor: "transparent",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "25px",
              height: "25px",
              cursor: "pointer",
              padding: "0",
            }}
          >
            <img src="https://th.bing.com/th/id/OIP.NBYduB6GcKzsvxOCPvuBNwHaHa?w=512&h=512&rs=1&pid=ImgDetMain" alt="" style={{height:"20px",borderRadius:"50px"}} />
          </button>
          <button
            onClick={toggleRepeat}
            style={{
              position: "absolute",
              right: "150px",
              top: "25px",
              backgroundColor: isRepeat ? "#4CAF50" : "white",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "25px",
              height: "25px",
              cursor: "pointer",
              padding: "0",
            }}
          >
            <img src="https://pluspng.com/img-png/png-repeat-big-image-png-1444.png" alt="" style={{height:"21px"}} />
          </button>
          <button
            onClick={toggleShuffle}
            style={{
              position: "absolute",
              right: "95px",
              top: "26px",
              backgroundColor: isShuffle ? "#4CAF50" : "white",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "25px",
              height: "25px",
              cursor: "pointer",
              padding: "0",
            }}
          >
          <img src="https://creazilla-store.fra1.digitaloceanspaces.com/icons/3247975/shuffle-icon-sm.png" alt="" style={{height:"19px",marginTop:"-2px"}} />
          </button>
        </div>
      </div>
    </>
  );
};
export default Player;
