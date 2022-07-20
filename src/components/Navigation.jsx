import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";

const padding = {
  padding: 5,
};

function Navigation() {
  const loggedInUser = useSelector((state) => state.loggedInUser);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">
              home
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {loggedInUser && (
              <Link style={padding} to="/items">
                items
              </Link>
            )}
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {loggedInUser && (
              <Link style={padding} to="/user">
                user
              </Link>
            )}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
