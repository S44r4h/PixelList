import { NavLink } from "react-router-dom";

export default function Register() {
    return (
    <div className="h-100 grid place-items-center">
        <fieldset className="fieldset w-full max-w-md bg-base-200 border border-base-300 p-6 rounded-box">
          <legend className="fieldset-legend">Login</legend>

          <label className="fieldset-label">Email</label>
          <input  type="email" className="input w-full" placeholder="Email" />

          <label className="fieldset-label">Password</label>
          <input type="password" className="input w-full" placeholder="Password" />

          <button className="btn btn-primary mt-4">Login</button>
          <p className="text-center p-4">Not a member? <NavLink className="text-primary link link-hover" to="/register">Register here!</NavLink></p>
        </fieldset>
    </div>
    );
  }