import jwt_decode from "jwt-decode";
import {
  AppBar,
  // Badge,
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { DecodedUser } from "types";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "components/searchfield-components/SearchFieldComponents";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { RootState } from "redux/store";
import { deleteBook, getAllBooks } from "services/book-services";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import EnhancedTableHead, {
  Data,
  BooksOrder,
} from "components/tableheads/BooksTableHead";
import { getBooksComparator } from "util/utils";

import "./Books.css";
import { updateUserBooks } from "services/user-services";

const Books = () => {
  const token = localStorage.getItem("token") || "";
  const authUser = jwt_decode(token) as DecodedUser;
  const dispatch = useAppDispatch();
  const { books } = useAppSelector((state: RootState) => state);
  const [text, setText] = useState("");
  const [order, setOrder] = useState<BooksOrder>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("title");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();
  const toHome = () => {
    navigate("/home");
  };
  const toAddBooks = () => {
    navigate("/home/allbooks/addbooks");
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = books.items.map((n) => n.title);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleAddBook = (e: any) => {
  //   e.preventDefault();
  //   const data = { bookId: book._id, _id: authUser._id };
  //   console.log("data: ", data);

  //   dispatch(updateUserBooks(data));
  // };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - books.items.length) : 0;

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  return (
    <div className="books">
      {authUser.isAdmin ? (
        <>
          <button className="books__button" onClick={toHome}>
            HOME
          </button>
          <button className="books__button" onClick={toAddBooks}>
            ADD A NEW BOOK
          </button>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar
              position="static"
              style={{ background: "#111", textAlign: "center" }}
            >
              <Toolbar sx={{ padding: "30px" }}>
                <Tooltip title="Search for a Book by title">
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      type="text"
                      placeholder="Search…"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </Search>
                </Tooltip>
                {/* <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: "none", md: "flex" } }}>
             
                    <IconButton>
                      <Badge badgeContent={cart.total} color="error">
                    <Link
                      style={{ textDecoration: 'none', color: '#FFF' }}
                      to={`/cart`}
                    >
                      <ShoppingCart sx={{ fontSize: 50 }} />
                      </Link>
                  </Badge>
                    </IconButton>
              
                </Box> */}
              </Toolbar>
            </AppBar>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
              <TableContainer sx={{ backgroundColor: "#111" }}>
                <Table sx={{ minWidth: 750 }} size={"medium"}>
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={books.items.length}
                  />

                  <TableBody>
                    {books.items
                      .filter((book) => {
                        if (text === "") {
                          return book;
                        } else if (
                          book.title
                            .toLocaleLowerCase()
                            .includes(text.toLocaleLowerCase())
                        ) {
                          return book;
                        }
                        return null;
                      })
                      .slice()
                      .sort(getBooksComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )

                      .map((book, index) => {
                        const isItemSelected = isSelected(book._id as string);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            onClick={(event) =>
                              handleClick(event, book._id as string)
                            }
                            tabIndex={-1}
                            key={book._id}
                            selected={isItemSelected}
                            sx={{
                              backgroundColor: "#111",
                              borderBottom: "2px solid #363433",
                            }}
                          >
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              align="center"
                              sx={{
                                borderRight: "2px solid #363433",
                                fontSize: "1.3rem",
                                color: "#fff",
                              }}
                            >
                              <Link
                                style={{
                                  textDecoration: "none",
                                  color: "#fff",
                                }}
                                to={`/home/allbooks/editbook/${book.isbn}`}
                              >
                                {book.title}
                              </Link>
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                borderRight: "2px solid #363433",
                              }}
                            >
                              <img
                                style={{ width: 100 }}
                                src={book.image}
                                alt="..."
                              />
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                borderRight: "2px solid #363433",
                                fontSize: "1.3rem",
                                color: "#fff",
                              }}
                            >
                              {book.author}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                borderRight: "2px solid #363433",
                                fontSize: "1.3rem",
                                color: "#fff",
                              }}
                            >
                              {book.publisher}
                            </TableCell>
                            <TableCell align="center">
                              <button
                                className="books__button"

                                // onClick={() => dispatch(addToCart(book))}
                              >
                                ADD
                              </button>
                            </TableCell>
                            <TableCell align="center">
                              <Link to={`/home/allbooks/editbook/${book.isbn}`}>
                                <button className="books__button">EDIT</button>
                              </Link>
                            </TableCell>
                            <TableCell align="center">
                              <button
                                className="books__button"
                                onClick={() =>
                                  dispatch(deleteBook(book._id as string))
                                }
                              >
                                DELETE
                              </button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: 53 * emptyRows,
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={books.items.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ flexGrow: 1 }}>
            <button className="books__button" onClick={toHome}>
              HOME
            </button>
            <AppBar
              position="static"
              style={{ background: "#111", textAlign: "center" }}
            >
              <Toolbar sx={{ padding: "30px" }}>
                <Tooltip title="Search for a Book">
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      type="text"
                      placeholder="Search…"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </Search>
                </Tooltip>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                  <IconButton>
                    {/* <Badge badgeContent={cart.total} color="error">
                    <Link
                      style={{ textDecoration: 'none', color: '#FFF' }}
                      to={`/cart`}
                    > */}
                    <ShoppingCart sx={{ fontSize: 50 }} />
                    {/* </Link>
                  </Badge> */}
                  </IconButton>
                </Box>
              </Toolbar>
            </AppBar>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
              <TableContainer sx={{ backgroundColor: "#111" }}>
                <Table sx={{ minWidth: 750 }} size={"medium"}>
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={books.items.length}
                  />

                  <TableBody>
                    {books.items
                      .filter((book) => {
                        if (text === "") {
                          return book;
                        } else if (
                          book.title
                            .toLocaleLowerCase()
                            .includes(text.toLocaleLowerCase())
                        ) {
                          return book;
                        }
                        return null;
                      })
                      .slice()
                      .sort(getBooksComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )

                      .map((book, index) => {
                        const isItemSelected = isSelected(book._id as string);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            onClick={(event) =>
                              handleClick(event, book._id as string)
                            }
                            tabIndex={-1}
                            key={book._id}
                            selected={isItemSelected}
                            sx={{
                              backgroundColor: "#111",
                              borderBottom: "2px solid #363433",
                            }}
                          >
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              align="center"
                              sx={{
                                borderRight: "2px solid #363433",
                                fontSize: "1.3rem",
                                color: "#fff",
                              }}
                            >
                              <Link
                                style={{
                                  textDecoration: "none",
                                  color: "#fff",
                                }}
                                to={`/home/allbooks/editbook/${book.isbn}`}
                              >
                                {book.title}
                              </Link>
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                borderRight: "2px solid #363433",
                              }}
                            >
                              <img
                                style={{ width: 100 }}
                                src={book.image}
                                alt="..."
                              />
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                borderRight: "2px solid #363433",
                                fontSize: "1.3rem",
                                color: "#fff",
                              }}
                            >
                              {book.author}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                borderRight: "2px solid #363433",
                                fontSize: "1.3rem",
                                color: "#fff",
                              }}
                            >
                              {book.publisher}
                            </TableCell>
                            <TableCell align="center">
                              <button
                                className="books__button"
                                onClick={(e: any) => {
                                  e.preventDefault();
                                  const data = {
                                    userId: authUser.userId as string,
                                    // updatedUser: authUser,
                                    books: book._id as string,
                                  };
                                  console.log("data: ", data);
                                  console.log("userId: ", authUser.userId);
                                  dispatch(updateUserBooks(data));
                                }}
                              >
                                ADD
                              </button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: 53 * emptyRows,
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={books.items.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Box>
        </>
      )}
    </div>
  );
};

export default Books;
