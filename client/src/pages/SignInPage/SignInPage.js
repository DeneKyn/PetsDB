import React, { useContext, useState, useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBInput,
  MDBBtn,
  MDBValidation,
} from "mdb-react-ui-kit";
import "./SignIn.css";
import { useHttp } from "../../hooks/HttpHook";
import { AuthContext } from "../../context/authContext";
import { useMessage } from "../../hooks/messageHook";

export const SignInPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log(error);
    message(error);
    clearError();
  }, [error, message, clearError]);
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const signInHandler = async (event) => {
    event.preventDefault();
    const isValid = document.querySelector(".needs-validation").checkValidity();

    try {
      if (isValid) {
        const data = await request("/api/auth/signin", "POST", { ...form });
        auth.login(data.token, data.userId);
      }
    } catch (e) {}
  };

  return (
    <MDBContainer className="d-flex h-50 justify-content-center">
      <MDBRow className="justify-content-center align-self-center ">
        <h2 className="text-center">Sign in</h2>
        <MDBValidation
          noValidate
          className="row g-3 sign-in-form"
          onSubmit={signInHandler}
        >
          <div>
            <MDBInput
              label="Type your email"
              id="email"
              required
              type="email"
              name="email"
              onChange={changeHandler}
              validation="Please provide a valid email."
              invalid
            />
          </div>

          <div>
            <MDBInput
              label="Type your password"
              id="password"
              required
              type="password"
              name="password"
              onChange={changeHandler}
              minLength="5"
              validation="Password must contain at least 5 characters."
              invalid
            />
          </div>
          <div className="d-flex justify-content-between">
            <MDBBtn type="submit">Sign In</MDBBtn>
          </div>
        </MDBValidation>
      </MDBRow>
    </MDBContainer>
  );
};
