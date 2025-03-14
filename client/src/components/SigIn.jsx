export default function SigIn() {
    return (
    <div className="w-full h-150 grid place-items-center">
        <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
          <legend className="fieldset-legend">Login</legend>

          <label className="fieldset-label">Email</label>
          <input type="email" className="input" placeholder="Email" />

          <label className="fieldset-label">Password</label>
          <input type="password" className="input" placeholder="Password" />

          <button className="btn btn-primary mt-4">Login</button>
          <p className="text-center p-4">Not a member? <a className=" text-primary">Register here!</a></p>
        </fieldset>
    </div>
    );
  }