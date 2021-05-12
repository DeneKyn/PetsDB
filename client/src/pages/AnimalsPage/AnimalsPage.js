import React, { useCallback, useContext, useEffect, useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";
import { AnimalsLinks } from "../../compoments/AnimalsList";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/HttpHook";

export const AnimalsPage = () => {
  const [animals, setAnimals] = useState([]);
  const [selectedAnimals, setSelectedAnimals] = useState([]);
  const { request } = useHttp();
  const { token } = useContext(AuthContext);

  const fetchBulkDelete = useCallback(async () => {
    try {
      await request(
        `/api/animals?ids=${selectedAnimals.join(",")}`,
        "DELETE",
        null,
        { Authorization: `Bearer ${token}` }
      );
    } catch (e) {}
  }, [token, request, selectedAnimals]);

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

  const bulkDeleteHandler = async () => {
    await fetchBulkDelete();
    fetchAnimals();
  };

  return (
    <>
      <MDBContainer>
        <MDBRow className="mb-4">
          <MDBCol size="2">
            <MDBBtn onClick={() => bulkDeleteHandler()}>Delete</MDBBtn>
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

        <AnimalsLinks
          animals={animals}
          fetchAnimals={fetchAnimals}
          selectedAnimals={selectedAnimals}
          setSelectedAnimals={setSelectedAnimals}
        />
      </MDBContainer>
    </>
  );
};
