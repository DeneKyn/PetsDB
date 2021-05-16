import { MDBSpinner } from "mdb-react-ui-kit";

export const Loader = () => (
  <MDBSpinner color="primary" className="loader">
    <span className="visually-hidden">Loading...</span>
  </MDBSpinner>
);
