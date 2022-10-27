import Row from "components/row/Row";
import genres from "genres";
import requests from "Requests";

const BooksByGenre = () => {
  return (
    <div>
      <Row genre={{ genre: genres.fantasy, url: requests.fetchFantasy }} />
      <Row genre={{ genre: genres.horror, url: requests.fetchHorror }} />
      <Row genre={{ genre: genres.scifi, url: requests.fetchScifi }} />
      {/* <Row genre={{ genre: genres.biography }} />
      <Row genre={{ genre: genres.childrens }} />
      <Row genre={{ genre: genres.hobbies }} />
      <Row genre={{ genre: genres.business }} />
      <Row genre={{ genre: genres.art }} />
      <Row genre={{ genre: genres.guide }} />
      <Row genre={{ genre: genres.history }} />
      <Row genre={{ genre: genres.science }} />
      <Row genre={{ genre: genres.travel }} />
      <Row genre={{ genre: genres.sport }} />  */}
    </div>
  );
};

export default BooksByGenre;
