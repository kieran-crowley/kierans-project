import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import SearchButton from "../SearchButton/SearchButton";
import SearchResults from "../SearchResults/SearchResults";

function SearchBar(props) {
  const [value, setValue] = useState("Search Song");
  const [searchResults, setSearchResults] = useState();

  const onChange = ({ target }) => {
    setValue(target.value);
  };

  const search = async () => {
    const name = value || "hello";
    const URL = `https://api.spotify.com/v1/search?q=${name}&type=track`;

    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + props.token,
      },
    };
    try {
      const result = await fetch(URL, options);
      if (result.ok) {
        const resultJson = await result.json();
        setSearchResults(resultJson.tracks.items);
        console.log("search results, saved: ", searchResults);
      } else {
        throw Error("error finding song");
      }
    } catch (err) {
      console.log(err);
    }
  }; //both saves and returns, only need one?.

  return (
    <div className={styles.SearchBarStyle}>
      <form onSubmit={search}>
        <input id="input" type="text" value={value} onChange={onChange}></input>
      </form>
      <ul></ul>
      <SearchButton onClick={search}></SearchButton>
      <SearchResults tracks={searchResults} function={props.function}></SearchResults>
    </div>
  );
}

export default SearchBar;
