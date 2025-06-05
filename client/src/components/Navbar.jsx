import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

export default function Navbar() {
  const { user } = useContext(UserContext);

  function logout() {
    fetch("http://localhost:5050/signinuser/logout", {
      credentials: "include",
      method: "POST",
    });
    user(null);
  }

  return (
    <header>
      <div className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink>About</NavLink>
              </li>
              <li>
                <NavLink>Explore games</NavLink>
              </li>
            </ul>
          </div>
          <NavLink to="/" className="text-xl">
            PixelList
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink>About</NavLink>
            </li>
            <li>
              <NavLink>Explore games</NavLink>
            </li>
            {user && user.role === "admin" && (
              <li>
                <NavLink to="/adminpanel">Add games to site</NavLink>
              </li>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          {user && (
            <>
              <NavLink>
                <div className="avatar avatar-placeholder px-3">
                  <div className="bg-neutral text-neutral-content w-12 rounded-full">
                    <span className="uppercase">{user.name[0]}</span>
                  </div>
                </div>
              </NavLink>
              <NavLink
                onClick={logout}
                className="text-xl btn btn-primary px-1"
              >
                Logout
              </NavLink>
            </>
          )}

          {!user && (
            <NavLink to="/login" className="text-xl btn btn-primary">
              Sign In
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}
