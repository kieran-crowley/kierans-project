import React, { useState, useEffect } from "react";
import styles from "./SaveToSpotifyButton.module.css";
import { getAccessToken, handleLogIn } from "../../app.module";
import PlayList from "../Playlist/Playlist";

function SaveToSpotifyButton(props) {
  const [data, setData] = useState({});
  const [user_id, setUser_id] = useState("");
  const baseUrl = `https://api.spotify.com`;
  let uri = [];
  let token = props.token;

  if (props.tracks != null) {
    props.tracks.forEach((element) => {
      uri.push(element.uri);
    });
  }

  const getUserID = async () => {
    const URL = `${baseUrl}/v1/me`;
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    try {
      const userID = await fetch(URL, options);
      if (userID.ok) {
        const userName = await userID.json();
        setUser_id(userName.id);
        return userName.id;
        // console.log(user_id);
      } else {
        throw Error("getID not working very well");
      }
    } catch (err) {
      console.log(err);
    }
  }; //both saves and returns, only need one?.

  const getPlayList = async () => {
    const url = `${baseUrl}/v1/playlists/3cEYpjA9oz9GiPac4AsH4n`;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        setData(jsonResponse);
      } else {
        throw new Error("not working son");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createNewPlayList = async () => {
    let user_id = await getUserID();
    // console.log("userID", user_id);
    const URL = `${baseUrl}/v1/users/${user_id}/playlists`;
    const playListName = props.playlistName;

    const options = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name: playListName || "no-name",
      }),
    };

    try {
      const response = await fetch(URL, options);
      if (response.ok) {
        const responceJson = await response.json();
        // console.log("playlist responce", responceJson);
        return responceJson.id;
      } else {
        throw Error("somting rong");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addSongToPlayList = async (playlist_id, uris) => {
    const URL = `${baseUrl}/v1/users/${user_id}/playlists/${playlist_id}/tracks`;

    const options = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        uris,
      }),
    };
    try {
      const responce = await fetch(URL, options);
      if (responce.ok) {
        const jsonResponse = await responce.json();
        // console.log(jsonResponse);
      } else {
        throw Error("somthong wrong with adding song tp a playlist");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const mainFunction = async () => {
    getUserID();
    const newPlaylistID = await createNewPlayList(); //already has name.
    addSongToPlayList(newPlaylistID, uri);
    console.log("main function has now been called");
    window.location = "http://localhost:3000/";
  };

  // console.log("should be saved in playlist: ", uri);

  return (
    <>
      {/* <button onClick={() => handleLogIn()}>newToken</button> */}
      <button onClick={mainFunction}>save to online account</button>
    </>
  );
}

export default SaveToSpotifyButton;

// add the tracks from the user’s custom playlist to the online playlist.
// putting track into playlist wont Worker.
