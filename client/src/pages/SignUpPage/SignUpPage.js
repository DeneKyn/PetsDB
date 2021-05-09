import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBInput,
  MDBBtn,
  MDBValidation,
} from "mdb-react-ui-kit";
import "./SignUp.css";
import { useHttp } from "../../hooks/HttpHook";

export const SignUpPage = () => {
  const { request } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const signUpHandler = async (event) => {
    event.preventDefault();
    const isValid = document.querySelector(".needs-validation").checkValidity();

    try {
      if (isValid) {
        const data = await request("/api/auth/signup", "POST", { ...form });
        console.log(data);
      }
    } catch (e) {}
  };

  return (
    <MDBContainer className="d-flex h-50 justify-content-center">
      <MDBRow className="justify-content-center align-self-center ">
        <h2 className="text-center">Sign up</h2>
        <MDBValidation
          noValidate
          className="row g-3 sign-up-form "
          onSubmit={signUpHandler}
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
              minlength="5"
              type="password"
              name="password"
              onChange={changeHandler}
              validation="Password must contain at least 5 characters."
              invalid
            />
          </div>
          <div>
            <MDBBtn type="submit">Sign Up</MDBBtn>
          </div>
        </MDBValidation>
      </MDBRow>
    </MDBContainer>
  );
};
