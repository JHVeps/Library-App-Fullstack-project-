import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { RootState } from "redux/store";
import { findBook, getAllBooks, updateBook } from "services/book-services";
import { Book } from "types";

import "./EditBookForm.css";

const initialBook = {
  _id: "",
  isbn: "",
  genre: "",
  title: "",
  image: "",
  description: "",
  publisher: "",
  author: "",
  status: "",
  publishDate: "",
  borrowDate: "",
  returnDate: "",
  borrowerId: "",
};

const EditBookForm = () => {
  const { isbn } = useParams<{ isbn: string }>();
  const books = useAppSelector((state: RootState) => state.books.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const book = books.find((book) => book.isbn === isbn) || initialBook;

  const goBackAllbooks = () => {
    navigate("/home/allbooks");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = { _id: book._id!, updatedBook: state };
    console.log("state: ", state);
    dispatch(updateBook(data));
    navigate("/home/allbooks");
  };

  const [state, setState] = useState<Book>(book);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (book) {
      setState({
        ...state,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    setState(book);
  }, [books.length]);

  useEffect(() => {
    if (books.length === 0) {
      dispatch(getAllBooks());
    }
  }, [dispatch, books.length]);

  console.log("books", books);

  if (!book)
    return (
      <div className="editbook">
        <h1>Book not found!</h1>
        <button className="editbook__button" onClick={goBackAllbooks}>
          BACK
        </button>
      </div>
    );

  return (
    <form onSubmit={handleSubmit}>
      <h1>EDIT: {book.title}</h1>
      <label>
        <h4>Book ID</h4>
      </label>
      <input
        type="text"
        name="_id"
        value={state._id}
        placeholder="BOOK ID"
        readOnly
      />
      <label>Title</label>
      <input
        type="text"
        name="title"
        value={state.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <label>Author</label>
      <input
        type="text"
        name="author"
        value={state.author}
        onChange={handleChange}
        placeholder="Author"
      />
      <label>Image URL</label>
      <input
        type="text"
        name="image"
        value={state.image}
        onChange={handleChange}
        placeholder="IMG"
      />
      <label>Genre</label>
      <input
        type="text"
        name="genre"
        value={state.genre}
        onChange={handleChange}
        placeholder="Genre"
      />
      <label>Description</label>
      <textarea
        name="description"
        value={state.description}
        onChange={handleChange}
        placeholder="Description"
      ></textarea>
      <label>ISBN</label>
      <input
        type="text"
        name="isbn"
        value={state.isbn}
        onChange={handleChange}
        placeholder="Isbn"
      />
      <label>Publisher</label>
      <input
        type="text"
        name="publisher"
        value={state.publisher}
        onChange={handleChange}
        placeholder="Publisher"
      />
      <label>Status</label>
      <input
        type="text"
        name="status"
        value={state.status}
        onChange={handleChange}
        placeholder="Status"
      />
      <label>Borrow Date</label>
      <input
        type="text"
        name="borrowDate"
        value={state.borrowDate}
        onChange={handleChange}
        placeholder="Borrow Date"
      />
      <label>Return Date</label>
      <input
        type="text"
        name="returnDate"
        value={state.returnDate}
        onChange={handleChange}
        placeholder="Return Date"
      />
      <label>Borrower ID</label>
      <input
        type="text"
        name="borrowerId"
        value={state.borrowerId}
        onChange={handleChange}
        placeholder="Borrower ID"
      />
      <button type="submit">UPDATE</button>
      <button onClick={goBackAllbooks}>BACK</button>
    </form>
  );
};

export default EditBookForm;
