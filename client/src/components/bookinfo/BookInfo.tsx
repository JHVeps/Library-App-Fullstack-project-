import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { RootState } from "redux/store";
import { findBook } from "services/book-services";

import "./BookInfo.css";

const BookInfo = () => {
  const { isbn } = useParams<{ isbn: string }>();
  const book = useAppSelector((state: RootState) => state.books.item);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const goBackHome = () => {
    navigate("/home");
  };

  const [state, setState] = useState(book);

  useEffect(() => {
    dispatch(findBook(isbn as string));
  }, [dispatch, isbn]);
  if (!book)
    return (
      <div className="book">
        <h1>Book not found!</h1>
        <button onClick={goBackHome}>BACK</button>
      </div>
    );

  return (
    <form>
      <h1>{book.title}</h1>

      <label>Title</label>
      <input
        type="text"
        name="title"
        value={state.title}
        placeholder="Title"
        readOnly
      />
      <label>Author</label>
      <input
        type="text"
        name="author"
        value={state.author}
        placeholder="Author"
        readOnly
      />
      <label>Image URL</label>
      <input
        type="text"
        name="image"
        value={state.image}
        placeholder="IMG"
        readOnly
      />
      <label>Genre</label>
      <input
        type="text"
        name="genre"
        value={state.genre}
        placeholder="Genre"
        readOnly
      />
      <label>Description</label>
      <textarea
        name="description"
        value={state.description}
        placeholder="Description"
        readOnly
      ></textarea>
      <label>ISBN</label>
      <input
        type="text"
        name="isbn"
        value={state.isbn}
        placeholder="Isbn"
        readOnly
      />
      <label>Publisher</label>
      <input
        type="text"
        name="publisher"
        value={state.publisher}
        placeholder="Publisher"
        readOnly
      />
      <label>Status</label>
      <input
        type="text"
        name="status"
        value={state.status}
        placeholder="Status"
        readOnly
      />
      <button onClick={goBackHome}>BACK</button>
    </form>
  );
};

export default BookInfo;
