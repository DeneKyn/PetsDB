import React, { useContext, useState, useEffect } from "react";
import { useHttp } from "../hooks/HttpHook";
import { AuthContext } from "../context/authContext";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBCheckbox,
} from "mdb-react-ui-kit";

export const AnimalsLinks = ({
  animals,
  fetchAnimals,
  selectedAnimals,
  setSelectedAnimals,
}) => {
  const { token } = useContext(AuthContext);
  const { request } = useHttp();

  const selectAnimalsHandler = (_id) => {
    const isExist = !!selectedAnimals.find((id) => _id === id);
    if (isExist) {
      setSelectedAnimals(selectedAnimals.filter((id) => id !== _id));
    } else {
      setSelectedAnimals([...selectedAnimals, _id]);
    }
  };

  const deleteAnimalHandler = async (animalId) => {
    try {
      await request(`/api/animals/${animalId}`, "DELETE", null, {
        Authorization: `Bearer ${token}`,
      });
    } catch (e) {}
    fetchAnimals();
  };

  return (
    <>
      <MDBTable hover>
        <MDBTableHead>
          <tr>
            <th scope="col"> </th>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Age</th>
            <th scope="col">Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {animals.map((animal, index) => {
            return (
              <tr key={animal._id}>
                <th>
                  <MDBCheckbox
                    name="checkNoLabel"
                    value=""
                    aria-label="..."
                    onChange={() => {
                      selectAnimalsHandler(animal._id);
                    }}
                  />
                </th>
                <th>{index + 1}</th>
                <td>{animal.name}</td>
                <td>{animal.type}</td>
                <td>{animal.age}</td>
                <td>
                  <i
                    className="fas fa-edit"
                    style={{ marginRight: "10px", fontSize: "20px" }}
                  ></i>
                  <i
                    onClick={() => deleteAnimalHandler(animal._id)}
                    className="fas fa-trash "
                    style={{ marginRight: "10px", fontSize: "20px" }}
                  ></i>
                </td>
              </tr>
            );
          })}
        </MDBTableBody>
      </MDBTable>
    </>
  );
};
