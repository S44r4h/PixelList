import { Navigate, NavLink, useNavigate } from "react-router-dom";

import { useState } from "react";

import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { toast } from "react-toastify";
export default function Register() {
  const [Loginform, SetLoginform] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setUser, loading } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const loginperson = { ...Loginform };
    let response;

    // if we are adding a new record we will POST to /user.
    response = await fetch(`${import.meta.env.VITE_API_URL}/signinuser/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(loginperson),
    });

    const userData = await response.json();

    if (response.ok) {
      setUser(userData);
      navigate("/dashboard");
    } else {
      toast.error(
        userData.message || "Unknown error" /* gives server json message */
      );
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="h-100 grid place-items-center">
          <p>Waking up the server... please wait</p>
          <span className="loading loading-spinner text-primary"></span>
        </div>
      ) : (
        <form className="h-100 grid place-items-center" onSubmit={handleSubmit}>
          <fieldset className="fieldset w-full max-w-md bg-base-200 border border-base-300 p-6 rounded-box">
            <legend className="fieldset-legend">Login</legend>

            <label className="fieldset-label">Email</label>
            <input
              type="email"
              className="input w-full"
              placeholder="Email"
              onChange={(e) =>
                SetLoginform({ ...Loginform, email: e.target.value })
              }
            />

            <label className="fieldset-label">Password</label>
            <input
              type="password"
              className="input w-full"
              placeholder="Password"
              onChange={(e) =>
                SetLoginform({ ...Loginform, password: e.target.value })
              }
            />

            <button
              aria-label="login"
              type="submit"
              className="btn btn-primary mt-4"
            >
              Login
            </button>
            <p className="text-center p-4">
              Not a member?{" "}
              <NavLink className="text-primary link link-hover" to="/register">
                Register here!
              </NavLink>
            </p>
          </fieldset>
        </form>
      )}
    </>
  );
}
