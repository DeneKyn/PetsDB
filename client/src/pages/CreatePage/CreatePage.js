import React, { useContext, useEffect, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBValidation,
} from "mdb-react-ui-kit";
import { useHttp } from "../../hooks/HttpHook";
import { useMessage } from "../../hooks/messageHook";
import { AuthContext } from "../../context/authContext";
import { useHistory } from "react-router";
import "./CreatePage.css";

export const CreatePage = () => {
  const message = useMessage();
  const history = useHistory();
  const { token } = useContext(AuthContext);
  const { request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    name: "",
    age: 0,
    type: "",
  });

  const createAnimalHandler = async (event) => {
    event.preventDefault();
    const isValid = document.querySelector(".needs-validation").checkValidity();

    try {
      if (isValid) {
        await request(
          `/api/animals/`,
          "POST",
          { ...form },
          { Authorization: `Bearer ${token}` }
        );
        history.push("/");
      }
    } catch (e) {}
  };

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <>
      <MDBContainer className="d-flex h-50 justify-content-center">
        <MDBRow className="justify-content-center align-self-center ">
          <h2 className="text-center">Add animal</h2>
          <MDBValidation
            noValidate
            className="row g-3 create-form"
            onSubmit={createAnimalHandler}
          >
            <div>
              <MDBInput
                label="Animal name"
                id="name"
                required
                type="text"
                name="name"
                onChange={changeHandler}
                validation="Please provide a valid pet's name."
                invalid
              />
            </div>

            <div>
              <MDBInput
                label="Kind of animal"
                id="type"
                required
                type="text"
                name="type"
                onChange={changeHandler}
                validation="Please provide a valid pet's kind."
                invalid
              />
            </div>

            <div>
              <MDBCol size="12">
                <MDBInput
                  label="Age of animal"
                  id="age"
                  required
                  type="number"
                  name="age"
                  onChange={changeHandler}
                  min="1"
                  max="99"
                  validation="Please provide a valid pet's age."
                  invalid
                />
              </MDBCol>
            </div>
            <div>
              <MDBBtn type="submit">Submit</MDBBtn>
            </div>
          </MDBValidation>
        </MDBRow>
      </MDBContainer>
    </>
  );
};
