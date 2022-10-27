// import { DecodedUser } from "types";
// import jwt_decode from "jwt-decode";
import { BooksOrder } from "components/tableheads/BooksTableHead";
import { UsersOrder } from "components/tableheads/UsersTableHead";

// export const userToken = localStorage.getItem("token") || "";
// export const decoded = jwt_decode(userToken) as DecodedUser;

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getBooksComparator<Key extends keyof any>(
  order: BooksOrder,
  orderBy: Key
): (
  a: { [key in Key]: any | string },
  b: { [key in Key]: any | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function getUsersComparator<Key extends keyof any>(
  order: UsersOrder,
  orderBy: Key
): (
  a: { [key in Key]: any | string },
  b: { [key in Key]: any | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
