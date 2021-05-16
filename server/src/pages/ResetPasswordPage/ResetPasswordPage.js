import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  MDBContainer,
  MDBRow,
  MDBInput,
  MDBBtn,
  MDBValidation,
} from "mdb-react-ui-kit";
import { useHttp } from "../../hooks/HttpHook";
import { useMessage } from "../../hooks/messageHook";
import { useParams } from "react-router-dom";

export const ResetPasswordPage = () => {
  const history = useHistory();
  const message = useMessage();
  const { token } = useParams();
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

  const changePasswordHandler = async (event) => {
    event.preventDefault();
    const isValid = document.querySelector(".needs-validation").checkValidity();

    try {
      if (isValid) {
        console.log("LOLKEK");
        console.log(token);
        await request(`/api/auth/reset/${token}`, "POST", { ...form });
        history.push("/signin");
        message("Password changed successfully", "info");
      }
    } catch (e) {}
  };

  return (
    <MDBContainer className="d-flex h-50 justify-content-center">
      <MDBRow className="justify-content-center align-self-center ">
        <h2 className="text-center">Set new password</h2>
        <MDBValidation
          noValidate
          className="row g-3 forgot-from"
          onSubmit={changePasswordHandler}
        >
          <div>
            <MDBInput
              label="Type your new password"
              id="email"
              required
              type="password"
              name="password"
              className="mb-2"
              onChange={changeHandler}
              minLength="5"
              validation="Password must contain at least 5 characters."
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
