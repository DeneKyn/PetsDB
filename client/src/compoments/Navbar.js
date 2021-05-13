import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { AuthContext } from "../context/authContext";

export const Navbar = () => {
  const [showNavRight, setShowNavRight] = useState(false);
  const auth = useContext(AuthContext);

  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
  };

  const Links = (flag) => {
    if (flag) {
      return (
        <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
          <MDBNavbarItem>
            <NavLink to="/" className="m-2 text-dark">
              Home
            </NavLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <NavLink to="/create" className="m-2 text-dark">
              Add
            </NavLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <NavLink to="" className="m-2 text-dark" onClick={logoutHandler}>
              Logout
            </NavLink>
          </MDBNavbarItem>
        </MDBNavbarNav>
      );
    } else {
      return (
        <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
          <MDBNavbarItem>
            <NavLink to="/signin" className="m-2 text-dark">
              Login
            </NavLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <NavLink to="/signup" className="m-2 text-dark">
              Register
            </NavLink>
          </MDBNavbarItem>
        </MDBNavbarNav>
      );
    }
  };

  return (
    <MDBNavbar expand="lg" light bgColor="light" className="ps-4 pe-4">
      <MDBContainer fluid>
        <MDBNavbarBrand href="#">
          <img
            src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.png"
            height="30"
            alt=""
            loading="lazy"
          />
          Animals DataBase
        </MDBNavbarBrand>

        <MDBNavbarToggler
          type="button"
          data-target="#navbarRightAlignExample"
          aria-controls="navbarRightAlignExample"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNavRight(!showNavRight)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showNavRight}>
          {Links(auth.isAuth)}
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};
