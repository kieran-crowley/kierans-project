import "./App.css";
import React, { useState, useEffect } from "react";
import SearchBar from "./compononets/SearchBar/SearchBar";
import TrackList from "./compononets/Tracklist/Tracklist";
import Playlist from "./compononets/Playlist/Playlist";
import { getAccessToken, handleLogIn } from "./app.module";

// const data = [
//   { id: 0, name: "kieran-can-sing", artist: "kieran", album: "kieransAlbum" },
//   { id: 1, name: "sarin-can-sing", artist: "sarin", album: "sarinsAlbum" },
//   { id: 2, name: "annabeth-can-sing", artist: "annabeth", album: "annabethsAlbum" },
// ];

function App() {
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState("playlist name");
  const [savedplaylist, setSavedplaylist] = useState({});
  const [token, setToken] = useState();

  useEffect(() => {
    if (window.location.hash) {
      setToken(getAccessToken().access_token);
    } else {
      handleLogIn();
    }
  });

  const addSongToPlayList = (track) => {
    if (JSON.stringify(playlist).includes(JSON.stringify(track))) return;
    setPlaylist((current) => [...current, track]);
  };

  const removeSongFromPlaylist = (track) => {
    const filtered = playlist.filter((item) => item !== track);
    setPlaylist(filtered);
  };

  const setName = ({ target }) => {
    setPlaylistName(target.value);
  };

  const saveOfflinePlaylist = () => {
    setSavedplaylist({ [playlistName]: playlist });
    setPlaylist([]);
  };
  // console.log("saved platlist", savedplaylist);
  console.log("inside playlist", playlist);
  return (
    <>
      <SearchBar token={token} function={addSongToPlayList}></SearchBar>
      <Playlist saveOfflinePlaylist={saveOfflinePlaylist} token={token} playlistName={playlistName} playlist={playlist} onChange={setName} function={removeSongFromPlaylist}></Playlist>
    </>
  );
}
export default App;
