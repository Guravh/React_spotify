import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Album from './Album';
import './App.css';
import Art from './Art';
import Artists from './Artists';
import Inner from './Inner';
import Library from './Library';
import LoginForm from './LoginForm';
import Player from './Player';
import Search from './Search';
import Sidebar from './Sidebar';
import Songs from './Songs';
function App() {
  const [allSongs,setAllSongs]=useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [currentPreviewUrl, setCurrentPreviewUrl] = useState(null);
  const [currentTrackImage, setCurrentTrackImage] = useState(null);
  const [currentname,setCurrentName]=useState(null);
  const [songList,setSongList]=useState([]);
  const updateSelectedSongs = (newSelectedSongs) => {
    setSelectedSongs(newSelectedSongs);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('spotify_token');
        if (!accessToken) {
          console.error('Access token not found in local storage.');
          return;
        }

        const headers = {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        };
        // Fetch songs from the three APIs
        const response1 = await fetch("https://api.spotify.com/v1/search?q=Ehide&type=track",{headers});
        const data1 = await response1.json();
        const response2 = await fetch("https://api.spotify.com/v1/search?q=Michael%20Jackson&type=track",{headers});
        const data2 = await response2.json();
        const response3 = await fetch("https://api.spotify.com/v1/search?q=hip-hop&type=track",{headers});
        const data3 = await response3.json();
        // Merge the songs from all APIs
        const allSongs = [
          ...data1.tracks.items,
          ...data2.tracks.items,
          ...data3.tracks.items
        ];
        // Set the merged songs to the state
        setAllSongs(allSongs);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };
    fetchData();
  }, []);


  const handleSongClick = (previewUrl,imageUrl,name,songs) => {
    setCurrentPreviewUrl(previewUrl);
    setCurrentTrackImage(imageUrl);
    setCurrentName(name);
    setSongList(songs);
  };
  
  return (
    <>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Songs onTrackSelect={handleSongClick}/>}/>
          <Route path="/albums" element={<Album />} />
          <Route path="/inner/:albumId" element={<Inner updateSelectedSongs={updateSelectedSongs} songList={songList} setSongList={setSongList} currentname={currentname} setCurrentName={setCurrentName} currentPreviewUrl={currentPreviewUrl} setCurrentPreviewUrl={setCurrentPreviewUrl} currentTrackImage={currentTrackImage} setCurrentTrackImage={setCurrentTrackImage}/>} />
          <Route path='/artist' element={<Artists/>}/>
          <Route path='/library'element={<Library selectedSongs={selectedSongs} songList={songList} setSongList={setSongList} currentname={currentname} setCurrentName={setCurrentName} currentPreviewUrl={currentPreviewUrl} setCurrentPreviewUrl={setCurrentPreviewUrl} currentTrackImage={currentTrackImage} setCurrentTrackImage={setCurrentTrackImage}/>}/>
          <Route path='/Art/:artistId' element={<Art updateSelectedSongs={updateSelectedSongs} songList={songList} setSongList={setSongList} currentname={currentname} setCurrentName={setCurrentName} currentPreviewUrl={currentPreviewUrl} setCurrentPreviewUrl={setCurrentPreviewUrl} currentTrackImage={currentTrackImage} setCurrentTrackImage={setCurrentTrackImage}/>}/>
          <Route path='/login' element={<LoginForm/>}/>
          <Route path='/search' element={<Search allSongs={allSongs}  setCurrentPreviewUrl={setCurrentPreviewUrl} setCurrentTrackImage={setCurrentTrackImage} setCurrentName={setCurrentName} />}/>
        </Routes>
        <Player setCurrentPreviewUrl={setCurrentPreviewUrl} currentPreviewUrl={currentPreviewUrl} trackImage={currentTrackImage} trackName={currentname}  songList={songList} setSongList={setSongList} />
</>
  )
}

export default App
