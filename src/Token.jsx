import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CLIENT_ID = "a7b5b328a34c4bf2b762e84d13f7eebe";
const CLIENT_SECRET = "396ed0a15a3b44a6bdfe065322cf9a6f";

const Token = ({ children }) => {
  const [token, setToken] = useState('');

  useEffect(() => {
    // Load token from local storage if available
    const storedToken = localStorage.getItem('spotify_token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      updateToken();
    }
  }, []);

  const updateToken = async () => {
    try {
      const response = await axios.post('https://accounts.spotify.com/api/token', null, {
        headers: {
          'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
          grant_type: 'client_credentials'
        }
      });
      const newToken = response.data.access_token;
      setToken(newToken);
      // Save token to local storage
      localStorage.setItem('spotify_token', newToken);
      alert("Token updated successfully!");
    } catch (error) {
      console.error('Error updating token:', error);
      alert("Error updating token. Please check the console for details.");
    }
  };

  return (
    <div>
      {children}
    </div>
  );
};

export default Token;

