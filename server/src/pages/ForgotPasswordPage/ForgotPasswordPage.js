import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBInput,
  MDBBtn,
  MDBValidation,
} from "mdb-react-ui-kit";
import { useHttp } from "../../hooks/HttpHook";
import { useMessage } from "../../hooks/messageHook";
import "./ForgotPasswordPage.css";

export const ForgotPasswordPage = () => {
  const message = useMessage();
  const { request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const forgotPasswordHandler = async (event) => {
    event.preventDefault();
    const isValid = document.querySelector(".needs-validation").checkValidity();

    try {
      if (isValid) {
        await request("/api/auth/forgot", "POST", { ...form });
        message(
          "An email has been sent to your mail with a link to reset your password",
          "info"
        );
      }
    } catch (e) {}
  };
  return (
    <MDBContainer className="d-flex h-50 justify-content-center">
      <MDBRow className="justify-content-center align-self-center ">
        <h2 className="text-center">FORGOT YOUR PASSWORD?</h2>
        <MDBValidation
          noValidate
          className="row g-3 forgot-from"
          onSubmit={forgotPasswordHandler}
        >
          <div>
            <MDBInput
              label="Enter your email address"
              id="email"
              required
              type="email"
              name="email"
              className="mb-2"
              onChange={changeHandler}
              validation="Please provide a valid email."
              invalid
            />
          </div>
          <div>
            <MDBBtn type="submit">Submit</MDBBtn>
          </div>
        </MDBValidation>
      </MDBRow>
    </MDBContainer>
  );
};
