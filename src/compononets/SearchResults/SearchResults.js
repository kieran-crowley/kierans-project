import React, { useState } from "react";
import styles from "./SearchResults.module.css";
import TrackList from "../Tracklist/Tracklist";

function SearchResults(props) {
  let formatProps = [];
  if (props.tracks == null) return;

  props.tracks.forEach((item) => {
    formatProps.push({
      id: item.id,
      name: item.name,
      artists: item.artists[0].name,
      album: item.album.name,
      uri: item.uri,
    });
  });

  return (
    <>
      <h2>Results</h2>
      <TrackList function={props.function} tracks={formatProps} type={"add"}></TrackList>
    </>
  );
}

export default SearchResults;
