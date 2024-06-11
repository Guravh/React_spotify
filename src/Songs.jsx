import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Album from './Album';
import Artists from './Artists';
import Player from './Player';
import Playlist from './Playlist';
import Token from './Token';
const Songs = ({onTrackSelect,currentPreviewUrl}) => {
  const [selectedTrack, setSelectedTrack] = useState('');
  const [name,setName]=useState('')
  const handleTrackSelect = (previewUrl) => {
    setSelectedTrack(previewUrl);
  };
  return (
    <>
    <div className="main-container">
    <div className="topbar">
      <div className="prev-next-buttons">
        {/* <button type="button" className="fa fas fa-chevron-left" />
        <button type="button" className="fa fas fa-chevron-right" /> */}
      </div>
      <Token/>
      <div className="navbar">
        <ul>
          <li>
            <a href="#">Premium</a>
          </li>
          <li>
            <a href="#">Support</a>
          </li>
          <li>
            <a href="#">Download</a>
          </li>
          <li className="divider">|</li>
          <Link to="/login">
          <li>
            <a href="#">Sign Up</a>
          </li>
          </Link>
        </ul>
        <Link to="/login">
              <button type="button">Log In</button>
            </Link>
      </div>
    </div>
  <Playlist onTrackSelect={onTrackSelect}/>
    <Album />
    <Artists />
  </div>
        <Player currentPreviewUrl={currentPreviewUrl}/>
    </>
  )
}

export default Songs