import "../styles/header.css";
import { Button, Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { BiSearchAlt } from "react-icons/bi";
// import MobileSearch from "./MobileSearch";
// import SearchMovies from "./SearchMovies";

function Header() {
  const [navBg, setNavBg] = useState(false);

  const changeNavBg = () => {
    window.scrollY >= 1 ? setNavBg(true) : setNavBg(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavBg);
    return () => {
      window.removeEventListener("scroll", changeNavBg);
    };
  }, []);

  return (
    <Navbar expand="lg" className={`colors ${navBg ? "bg-color-change" : ""}`}>
      <Container className="d-flex justify-content-between flex-nowrap">
        <Navbar.Brand
          className="fw-bold fs-5"
          as={Link}
          to="/"
          style={{ color: "white" }}
        >
          movie<span style={{ color: "#dc3545" }}>Coy</span>
        </Navbar.Brand>
        <div className="d-flex ">
          <div className="d-flex">
            <Button
              variant="outline-danger"
              className=" border-2"
              as={Link}
              to="/search"
            >
              <BiSearchAlt style={{ fontSize: "24px" }} />
            </Button>
            <Button
              variant="outline-danger"
              className="disable d-none mx-3 d-md-inline border-2 "
            >
              Login
            </Button>
            <Button variant="danger" className="disable d-none d-md-inline">
              Sign Up
            </Button>
          </div>
        </div>
        {/* <Navbar.Toggle aria-controls="navbarScroll" /> */}
      </Container>
    </Navbar>
  );
}

export default Header;
