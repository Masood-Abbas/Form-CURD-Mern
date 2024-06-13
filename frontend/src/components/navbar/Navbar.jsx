import { NavLink } from "react-router-dom"
import "./navbar.css"

const Navbar = () => {
  return (
    <>
      <ul className="nav nav-tabs">
  <li className="nav-item">
    <NavLink className="nav-link " to="/">Home</NavLink>
  </li>
  <li className="nav-item">
    <NavLink className="nav-link" to="/Table">Table</NavLink>
  </li>
</ul>
    </>
  )
}

export default Navbar