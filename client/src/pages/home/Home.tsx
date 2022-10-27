import jwt_decode from "jwt-decode";
import { DecodedUser } from "types";
import AdminNavBar from "components/adminnav/AdminNavBar";
import SearchBar from "components/searchbar/SearchBar";
import BooksByGenre from "../../components/booksbygenre/BooksByGenre";
import UserNavBar from "components/usernav/UserNavBar";
import SearchBarForUsers from "components/searchbar/SearchBarForUsers";

import "./Home.css";

const Home = () => {
  const token = localStorage.getItem("token") || "";
  const authUser = jwt_decode(token) as DecodedUser;

  if (authUser.isAdmin) {
    return (
      <div className="home">
        <h1>LIBRARY</h1>
        <AdminNavBar />
        <SearchBar />
        <BooksByGenre />
      </div>
    );
  }
  return (
    <div className="home">
      <h1>LIBRARY</h1>
      <UserNavBar />
      <SearchBarForUsers />
      <BooksByGenre />
    </div>
  );
};

export default Home;
