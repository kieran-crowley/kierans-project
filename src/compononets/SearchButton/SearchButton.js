import React from "react";
import styles from "./SearchButton.module.css";

function SearchButton(props) {
  return <button onClick = {props.onClick}>Search</button>;
}

export default SearchButton;
