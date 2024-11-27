import React from "react";
import Track from "../Track/Track";
import SaveToSpotifyButton from "../SaveToSpotifyButton/SaveToSpotifyButton";
import TrackList from "../Tracklist/Tracklist";
import styles from "./Playlist.module.css";

function PlayList(props) {
  return (
    <div className={styles.personalStyle}>
      <input value={props.playlistName} onChange={props.onChange} />
      <TrackList tracks={props.playlist} function={props.function} type={"remove"}></TrackList>
      <button onClick={props.saveOfflinePlaylist}>
        save to spotidy offline
      </button >
      <SaveToSpotifyButton token={props.token} playlistName={props.playlistName} tracks={props.playlist}></SaveToSpotifyButton>
    </div>
  );
}

export default PlayList;
