import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {

  //const [name, setName] = useState()
  //const [email, setEmail] = useState()
  //const [password, setPassword] = useState()




  const [registerform, SetRegisterform] = useState({
    name: "",
    email: "",
    password: "",
  });


  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(registerform)



    const person = { ...registerform };
    console.log(person)
    console.log(JSON.stringify(person))
      let response;
     
        // if we are adding a new record we will POST to /user.
        response = await fetch("http://localhost:5050/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
  


  }

    return (
    
      <form className="h-100 grid place-items-center" onSubmit={handleSubmit}>
        <fieldset className="fieldset w-full max-w-md bg-base-200 border border-base-300 p-6 rounded-box">
          <legend className="fieldset-legend">Register</legend>

          <label className="fieldset-label">Name</label>
          <input name="name"  type="text" className="input w-full" placeholder="Name" onChange={(e) => SetRegisterform({...registerform, name: e.target.value})} />

          <label className="fieldset-label">Email</label>
          <input name="email" type="email" className="input w-full" placeholder="Email" onChange={(e) => SetRegisterform({...registerform, email: e.target.value})} />

          <label className="fieldset-label">Password</label>
          <input name="password" type="password" className="input w-full" placeholder="Password" onChange={(e) => SetRegisterform({...registerform, password: e.target.value})} />

          <button type="submit" className="btn btn-primary mt-4">Register</button>
          <p className="text-center p-4">You have account? <NavLink className=" text-primary" to="/signIn">Signup here!</NavLink></p>
        </fieldset>
        </form>
  
    );
}