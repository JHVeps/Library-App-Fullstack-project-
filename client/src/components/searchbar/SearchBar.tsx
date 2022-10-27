import { SetStateAction, useState } from "react";
import { Link } from "react-router-dom";

import "./SearchBar.css";

const SearchBar = () => {
  const [isbn, setIsbn] = useState("");

  const onChangeIsbn = (e: { target: { value: SetStateAction<string> } }) => {
    setIsbn(e.target.value);
  };

  return (
    <>
      <input
        className="searchBar"
        type="text"
        name="isbn"
        value={isbn}
        onChange={onChangeIsbn}
        placeholder="ISBN..."
      />
      <Link to={`/home/allbooks/editbook/${isbn}`}>
        <button className="searchBar__btn">SEARCH</button>
      </Link>
    </>
  );
};

export default SearchBar;
