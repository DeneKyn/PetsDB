import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/HttpHook";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
  MDBValidation,
} from "mdb-react-ui-kit";
import { AuthContext } from "../context/authContext";

export const EditModal = ({
  setIsOpen,
  isOpen,
  selectedAnimal,
  fetchAnimals,
  searchText,
}) => {
  const [form, setForm] = useState(null);
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const { request } = useHttp();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (selectedAnimal) {
      setForm(selectedAnimal);
    }
  }, [selectedAnimal]);

  const fetchUpdate = useCallback(
    async (animalId) => {
      try {
        const data = await request(
          `/api/animals/${animalId}`,
          "PATCH",
          { ...form },
          { Authorization: `Bearer ${token}` }
        );
        return data;
      } catch (e) {}
    },
    [token, request, form]
  );

  const updateAnimalHandler = async (animalId) => {
    const isValid = document.querySelector(".needs-validation").checkValidity();
    if (isValid) {
      setIsOpen(false);
      await fetchUpdate(animalId);
      fetchAnimals(searchText);
    }
  };

  return (
    <>
      {form && (
        <MDBModal
          tabIndex="-1"
          show={isOpen}
          getOpenState={(e) => setIsOpen(e)}
        >
          <MDBModalDialog centered>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Edit {selectedAnimal.name}</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={() => setIsOpen(!isOpen)}
                ></MDBBtn>
              </MDBModalHeader>

              <MDBModalBody>
                <MDBValidation noValidate className="row g-3">
                  <div>
                    <MDBInput
                      onChange={changeHandler}
                      className="mb-4"
                      value={form.name}
                      label="name"
                      required
                      type="text"
                      name="name"
                      validation="Please provide a valid pet's name."
                      invalid
                    />
                  </div>

                  <div>
                    <MDBInput
                      onChange={changeHandler}
                      className="mb-4"
                      value={form.type}
                      label="type"
                      required
                      type="text"
                      name="type"
                      validation="Please provide a valid pet's type."
                      invalid
                    />
                  </div>
                  <div>
                    <MDBInput
                      onChange={changeHandler}
                      value={form.age.toString()}
                      label="age"
                      required
                      type="number"
                      name="age"
                      min="1"
                      max="99"
                      validation="Please provide a valid pet's age."
                      invalid
                    />
                  </div>
                </MDBValidation>
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={() => setIsOpen(!isOpen)}>
                  Close
                </MDBBtn>
                <MDBBtn onClick={() => updateAnimalHandler(selectedAnimal._id)}>
                  Save changes
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      )}
    </>
  );
};
