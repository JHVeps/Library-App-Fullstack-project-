import { Box, Modal, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { RootState } from "redux/store";
import { findBook } from "services/book-services";
import { genreProps } from "types";

import "./Row.css";

const Row = ({ genre }: genreProps) => {
  const dispatch = useAppDispatch();
  const book = useAppSelector((state: RootState) => state.books.item);
  const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = (isbn: string) => {
    //setIsbn(isbn);
    dispatch(findBook(isbn));
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    bgcolor: "background.paper",
    outline: 0,
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(genre.url);
      console.log(genre.url);
      setBooks(request.data);
      console.log("Books: ", request.data);
      return request;
    }

    fetchData();
  }, [genre.url]);

  return (
    <div className="row">
      <h2>{genre.genre}</h2>

      <div className="row__posters">
        {books.map((book, index) => (
          <div key={index} className="contents">
            <img
              className={`row__poster`}
              key={book["_id"]}
              src={book["image"]}
              alt={book["title"]}
              onClick={() => handleOpen(book["isbn"])}
            />
          </div>
        ))}

        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <img src={book.image} alt={book.title} style={{ maxWidth: 200 }} />

            <Typography variant="h6" component="h2">
              {book.title}
            </Typography>
            <Typography variant="h6" component="h2">
              By: {book.author}
            </Typography>
            <Typography sx={{ mt: 2 }}>{book.description}</Typography>
            <Typography sx={{ mt: 2 }}>Publisher: {book.publisher}</Typography>
            <Typography sx={{ mt: 1 }}>
              Published: {book.publishDate}
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Row;
