import { useNavigate, useLocation } from "react-router-dom";
import logo from "../images/logo.png";

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const navItem = (name, path) => (
    <button
      onClick={() => navigate(path)}
      className={`px-4 py-2 rounded-lg ${
        location.pathname === path
          ? "bg-blue-900 text-white"
          : "text-gray-600"
      }`}
    >
      {name}
    </button>
  );

  return (
    <div className="bg-white border-b px-10 py-4 flex justify-between items-center">

      {/* LOGO SECTION */}

      <div className="flex items-center gap-3">

        <img
          src={logo}
          alt="MapMyCivic"
          className="w-10 h-10 rounded-lg"
        />

        <h1 className="font-semibold text-lg">
          MapMyCivic
        </h1>

      </div>

      {/* NAVIGATION */}

      <div className="flex gap-6 font-medium">

        {navItem("Dashboard", "/dashboard")}
        {navItem("Map View", "/map")}
        {navItem("Reports", "/reports")}
        {navItem("Public Notices", "/notices")}
        {navItem("Admin Panel", "/admin")}

      </div>

    </div>
  );
}

export default Navbar;