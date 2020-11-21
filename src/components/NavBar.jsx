import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Navbar,
  NavLink,
  Button,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  DropdownItem,
  DropdownMenu,
  NavbarText,
  UncontrolledDropdown,
  DropdownToggle,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { loadUser, userLogout } from "../actions/user";

const NavBar = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    const c = async () => {
      await dispatch(loadUser());
    };
    c();
  }, []);

  const logout = async () => {
    await dispatch(userLogout());
    history.push("/");
  };

  const renderBasedOffLoggedIn = () => {
    if (user && user.username)
      return (
        <>
          {(user.role === "INSTRUCTOR" || user.role === "ADMIN") && (
            <NavItem>
              <NavLink>
                <Link to="/lessons">My Lessons</Link>
              </NavLink>
            </NavItem>
          )}
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Classes
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <NavLink>
                  <Link to="/">My Classes</Link>
                </NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink>
                  <Link to="/classes">Browse / Search</Link>
                </NavLink>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </>
      );

    return (
      <>
        <NavItem>
          <NavLink>
            <Link to="/login">Login</Link>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink>
            <Link to="/register">Register</Link>
          </NavLink>
        </NavItem>
      </>
    );
  };

  const rightTextAndLogout = () => {
    if (user)
      return (
        <>
          <NavbarText>
            Hello, {user.fname} ({user.role})
          </NavbarText>
          <NavItem>
            <NavLink className="p-0 px-2">
              <Button onClick={() => logout()} color="link">
                Logout
              </Button>
            </NavLink>
          </NavItem>
        </>
      );
  };
  return (
    <div className="mb-4">
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Anywhere Fitness</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink>
                <Link to="/">Home</Link>
              </NavLink>
            </NavItem>
            {renderBasedOffLoggedIn()}
          </Nav>
          {rightTextAndLogout()}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
