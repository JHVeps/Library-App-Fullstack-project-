import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "redux/hooks";
import { addUser } from "services/user-services";

import "./AddUserForm.css";

const AddUserForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toAllUsers = () => {
    navigate("/home/allusers");
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
      }}
      onSubmit={(values) => {
        dispatch(addUser(values));
        navigate("/home/allusers");
      }}
    >
      <Form>
        <Field name="firstName" type="text" placeholder="FIRSTNAME" required />
        <Field name="lastName" type="text" placeholder="LASTNAME" required />
        <Field name="email" type="text" placeholder="EMAIL" required />
        <button onClick={toAllUsers}>BACK</button>
        <button type="submit">CREATE</button>
      </Form>
    </Formik>
  );
};

export default AddUserForm;
