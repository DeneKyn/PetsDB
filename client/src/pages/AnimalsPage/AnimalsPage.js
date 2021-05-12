import React, { useCallback, useContext, useEffect, useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";
import { AnimalsLinks } from "../../compoments/AnimalsList";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/HttpHook";

export const AnimalsPage = () => {
  const [animals, setAnimals] = useState([]);
  const { request } = useHttp();
  const { token } = useContext(AuthContext);

  const fetchAnimals = useCallback(
    async (searchText = "") => {
      try {
        const fetched = await request(
          `/api/animals?searchText=${searchText}`,
          "GET",
          null,
          { Authorization: `Bearer ${token}` }
        );
        setAnimals(fetched);
      } catch (e) {}
    },
    [token, request]
  );

  useEffect(() => {
    fetchAnimals();
  }, [fetchAnimals]);

  return (
    <>
      <MDBContainer className="mt-4">
        <MDBRow>
          <MDBCol size="2">
            <MDBBtn>Delete</MDBBtn>
          </MDBCol>
          <MDBCol size="2"></MDBCol>
          <MDBCol size="4">
            <input
              // onChange={searchHandler}
              type="search"
              className="form-control"
              placeholder="Type query"
              aria-label="Search"
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <MDBContainer>
        <AnimalsLinks animals={animals} fetchAnimals={fetchAnimals} />
      </MDBContainer>
    </>
  );
};
