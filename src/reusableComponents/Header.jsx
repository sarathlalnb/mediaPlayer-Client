import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar style={{zIndex:"1"}} className="bg-info sticky-top w-100">
      <Container>
        <Link to={"/"} style={{textDecoration:"none"}}>
          <Navbar.Brand style={{ color: "white", fontSize: "25px" }}>
            <i className="fa-solid fa-music me-2"></i>
            Media Player
          </Navbar.Brand>
        </Link>
      </Container>
    </Navbar>
  );
};

export default Header;
