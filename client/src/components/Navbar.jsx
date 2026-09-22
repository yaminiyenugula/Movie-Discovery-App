import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">MovieHub</Link>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/wishlist">Wishlist ❤️</Link>
      </div>
    </nav>
  );
};

export default Navbar;