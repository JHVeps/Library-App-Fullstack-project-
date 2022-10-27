export type Book = {
  _id?: string;
  isbn: string;
  genre: string;
  title: string;
  image: string;
  description: string;
  publisher: string;
  author: string;
  status: string;
  publishDate: string;
  borrowDate: string;
  returnDate: string;
  borrowerId?: string;
};

export type UpdatedBook = {
  _id?: string;
  isbn?: string;
  genre?: string;
  title?: string;
  image?: string;
  description?: string;
  publisher?: string;
  author?: string;
  status?: string;
  publishDate?: string;
  borrowDate?: string;
  returnDate?: string;
  borrowerId?: string;
};

export type updateUserBooksType = {
  _id?: string;
  bookId?: string;
};

export type updateType = {
  _id: string;
  updatedBook: UpdatedBook;
};

export interface booksState {
  items: Book[];
  isLoading: boolean;
  error: boolean;
  item: Book;
}

export type User = {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin?: boolean;
  books?: string[];
};

export type UpdatedUser = {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  isAdmin?: boolean;
  books?: string[];
};

export type updateUserType = {
  _id: string;
  updatedUser: UpdatedUser;
};

export interface userState {
  items: User[];
  isLoading: boolean;
  error: boolean;
  item: User;
}

export interface CredentialResponse {
  credential?: string;

  select_by?:
    | "auto"
    | "user"
    | "user_1tap"
    | "user_2tap"
    | "btn"
    | "btn_confirm"
    | "brn_add_session"
    | "btn_confirm_add_session";
  clientId?: string;
}

export type DecodedUser = {
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  userId: string;
  books: string[];
};

export type genreProps = {
  genre: {
    genre: string;
    url: string;
  };
};

export type HeadlineProps = {
  headline: {
    text: string;
  };
};
