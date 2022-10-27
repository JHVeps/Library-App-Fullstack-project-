import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "redux/hooks";
import { addBook } from "services/book-services";

import "./AddBookForm.css";

const AddBookForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toAllBooks = () => {
    navigate("/home/allbooks");
  };

  return (
    <Formik
      initialValues={{
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
      }}
      onSubmit={(values) => {
        dispatch(addBook(values));
        navigate("/home/allbooks");
      }}
    >
      <Form>
        <Field name="isbn" type="text" placeholder="ISBN" required />
        <Field name="genre" type="text" as="select" required>
          <option value="select">Select a genre</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Horror">Horror</option>
          <option value="Scifi">Scifi</option>
          <option value="Biography">Biography</option>
          <option value="Childrens">Childrens</option>
          <option value="Hobbies">Hobbies</option>
          <option value="Business">Business</option>
          <option value="Art">Art</option>
          <option value="Guide">Guide</option>
          <option value="History">History</option>
          <option value="Science">Science</option>
          <option value="Travel">Travel</option>
          <option value="Sport">Sport</option>
        </Field>
        <Field name="title" type="text" placeholder="TITLE" required />
        <Field name="image" type="text" placeholder="IMAGE URL" required />
        <Field name="author" type="text" placeholder="AUTHOR" required />
        <Field
          name="description"
          as="textarea"
          placeholder="DESCRIPTION"
          required
        />
        <Field name="publisher" type="text" placeholder="PUBLISHER" required />
        <Field
          name="publishDate"
          type="string"
          placeholder="PUBLISH DATE"
          required
        />
        <Field name="status" type="text" as="select" required>
          <option value="select">Select status</option>
          <option value="Available">Available</option>
          <option value="Fantasy">Not Available</option>
        </Field>
        <Field name="borrowDate" type="string" placeholder="BORROW DATE" />
        <Field name="returnDate" type="string" placeholder="RETURN DATE" />
        <button onClick={toAllBooks}>BACK</button>
        <button type="submit">CREATE</button>
      </Form>
    </Formik>
  );
};

export default AddBookForm;
