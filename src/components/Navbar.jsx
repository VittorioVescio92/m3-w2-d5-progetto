import { Navbar } from "react-bootstrap";
import ViMeteo from "../ViMeteo-logo.png";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="bg-info">
      <Navbar
        className="fluid d-flex 
    px-5 justify-content-between gap-5 align-items-center container"
      >
        <img src={ViMeteo} alt="logo" width="130px" />
        <Link className="navbar-brand fw-bold" to="/">
          <p>Home</p>
        </Link>
      </Navbar>
    </div>
  );
};
export default NavBar;
