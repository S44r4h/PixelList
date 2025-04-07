import { Navigate, NavLink, useNavigate } from "react-router-dom";

import { useState } from "react";





export default function Register() {

  const [Loginform, SetLoginform] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('nappi toimii')
    const loginperson = { ...Loginform };
    let response;


    // if we are adding a new record we will POST to /user.
    response = await fetch("http://localhost:5050/signinuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginperson),
     
    }
  );

  const data = await response.json();
  console.log(data)
  if(data === "Success")  {
    navigate("/");
  } else {
    alert("login failed")
  }


 

  }



    return (
    <form className="h-100 grid place-items-center" onSubmit={handleSubmit}>
        <fieldset className="fieldset w-full max-w-md bg-base-200 border border-base-300 p-6 rounded-box">
          <legend className="fieldset-legend">Login</legend>

          <label className="fieldset-label">Email</label>
          <input  type="email" className="input w-full" placeholder="Email"  onChange={(e) => SetLoginform({...Loginform, email: e.target.value})} />

          <label className="fieldset-label">Password</label>
          <input type="password" className="input w-full" placeholder="Password" onChange={(e) => SetLoginform({...Loginform, password: e.target.value})} />

          <button type="submit" className="btn btn-primary mt-4">Login</button>
          <p className="text-center p-4">Not a member? <NavLink className="text-primary link link-hover" to="/register">Register here!</NavLink></p>
        </fieldset>
    </form>
    );
  }