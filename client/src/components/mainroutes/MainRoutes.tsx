import { Route, Routes } from "react-router-dom";
import PrivateRoute from "components/privateroute/PrivateRoute";
import Login from "components/login/Login";
import Home from "pages/home/Home";
import BookOperations from "pages/bookmanagement/BookOperations";
import EditBook from "pages/editbook/EditBook";
import AddBooks from "pages/addbook/AddBook";
import UserOperations from "pages/usermanagement/UserOperations";
import Book from "pages/book/Book";
import AddUser from "pages/adduser/AddUser";
import EditUser from "pages/user/EditUser";

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/allbooks" element={<BookOperations />} />
        <Route
          path="/home/allbooks/editbook/:isbn"
          element={
            <PrivateRoute>
              <EditBook />
            </PrivateRoute>
          }
        />
        <Route path="/home/allbooks/book/:isbn" element={<Book />} />
        <Route
          path="/home/allbooks/addbooks"
          element={
            <PrivateRoute>
              <AddBooks />
            </PrivateRoute>
          }
        />
        <Route
          path="/home/allusers"
          element={
            <PrivateRoute>
              <UserOperations />
            </PrivateRoute>
          }
        />
        <Route
          path="/home/allusers/addusers"
          element={
            <PrivateRoute>
              <AddUser />
            </PrivateRoute>
          }
        />
        <Route
          path="/home/allusers/edituser/:_id"
          element={
            <PrivateRoute>
              <EditUser />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default MainRoutes;
