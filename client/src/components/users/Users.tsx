//import jwt_decode from "jwt-decode";
import {
  AppBar,
  Box,
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
//import { DecodedUser } from "types";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "components/searchfield-components/SearchFieldComponents";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { RootState } from "redux/store";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import EnhancedTableHead, { Data } from "components/tableheads/UsersTableHead";
import { UsersOrder } from "components/tableheads/UsersTableHead";
import { getUsersComparator } from "util/utils";
import { deleteUser, getAllUsers } from "services/user-services";

import "./Users.css";

const Users = () => {
  //   const token = localStorage.getItem("token") || "";
  //   const authUser = jwt_decode(token) as DecodedUser;

  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state: RootState) => state);
  const [text, setText] = useState("");
  const [order, setOrder] = useState<UsersOrder>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("lastName");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
      const newSelected = users.items.map((n) => n.lastName);
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

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.items.length) : 0;

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  //if authUser.isAdmin return
  return (
    <div className="users">
      {/* {authUser.isAdmin ? (
        <> */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          style={{ background: "#111", textAlign: "center" }}
        >
          <Toolbar sx={{ padding: "30px" }}>
            <Tooltip title="Search for a User by lastname">
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
                rowCount={users.items.length}
              />

              <TableBody>
                {users.items
                  .filter((user) => {
                    if (text === "") {
                      return user;
                    } else if (
                      user.lastName
                        .toLocaleLowerCase()
                        .includes(text.toLocaleLowerCase())
                    ) {
                      return user;
                    }
                    return null;
                  })
                  .slice()
                  .sort(getUsersComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

                  .map((user, index) => {
                    const isItemSelected = isSelected(user._id as string);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        onClick={(event) =>
                          handleClick(event, user._id as string)
                        }
                        tabIndex={-1}
                        key={user._id}
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
                          {user.lastName}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            borderRight: "2px solid #363433",
                            fontSize: "1.3rem",
                            color: "#fff",
                          }}
                        >
                          {user.firstName}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            borderRight: "2px solid #363433",
                            fontSize: "1.3rem",
                            color: "#fff",
                          }}
                        >
                          {user.email}
                        </TableCell>
                        <TableCell align="center">
                          <Link to={`/home/allusers/edituser/${user._id}`}>
                            <button
                              className="users__button"

                              // onClick={() => dispatch(addToCart(book))}
                            >
                              EDIT
                            </button>
                          </Link>
                        </TableCell>
                        <TableCell align="center">
                          <button
                            className="users__button"
                            onClick={() =>
                              dispatch(deleteUser(user._id as string))
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
            count={users.items.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </div>
  );
};

export default Users;
