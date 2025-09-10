import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded mt-10 p-10">
      <nav className="grid grid-flow-col gap-4">
        <NavLink to="/privacypolicy">Privacy policy</NavLink>
      </nav>
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by Saara V
        </p>
      </aside>
    </footer>
  );
}
