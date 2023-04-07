import { Navbar } from "react-bootstrap";
import ViMeteo from "../ViMeteo-logo.png";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar
      bg="info"
      className="fluid d-flex 
    px-5 justify-content-start gap-5 align-items-center container-fluid"
    >
      <img src={ViMeteo} alt="logo" width="130px" />
      <Link className="navbar-brand fw-bold" to="/">
        <p>Home</p>
      </Link>
    </Navbar>
  );
};
export default NavBar;
