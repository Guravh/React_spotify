import React from 'react';
import { Link } from 'react-router-dom';


const Sidebar = () => {
  return (
    <>
     <div className="sidebar">
    <div className="logo">
    <Link to="/">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png"
            alt="Logo"
          />
        </Link>
    </div>
    <div className="navigation">
      <ul>
        <li>
        <Link to="/">
              <span className="fa fa-home" />
              <span>Home</span>
            </Link>
        </li>
        <li>
          <Link to="/search">
            <span className="fa fa-search" />
            <span>Search</span></Link>
        </li>
        <li>
          <Link to="/library"><span className="fa fas fa-book" />
            <span>Your Library</span></Link>
        </li>
      </ul>
    </div>
    <div className="navigation">
    </div>
    <div className="policies">
      <ul>
        <li>
          <a href="#">Cookies</a>
        </li>
        <li>
          <a href="#">Privacy</a>
        </li>
      </ul>
    </div>
  </div>
    </>
  )
}

export default Sidebar