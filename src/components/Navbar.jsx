import { Navbar } from "react-bootstrap";
import Logo from "../logo.svg";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <Navbar
      className="fluid d-flex 
    px-5 justify-content-start gap-5 mx-5"
    >
      <img src={Logo} alt="logo" width="130px" />
      <Link className="navbar-brand fw-bold" to="/">
        <p>Home</p>
      </Link>
    </Navbar>
  );
};
export default NavBar;
