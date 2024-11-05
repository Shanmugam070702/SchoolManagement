import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./header.css";
import logo from "../../Assets/school-logo.png";
import Swal from 'sweetalert2';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem('loginUserData'));

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout?",
      showCancelButton: true,
      confirmButtonColor: "#555",
      cancelButtonColor: "#008BA6",
      confirmButtonText: "Yes, logout me!"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("dashboard")
        navigate("/");
      }
    });
  };

  const conditionalClass = (path) =>
    `nav-link py-2 rounded-xl mb-2 ${location.pathname === path ? "active-nav-links" : ""}`;

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      {/* <button className="toggle-btn d-block d-sm-none" onClick={toggleSidebar}>
        <span className="visually-hidden">Toggle sidebar</span>
        <span className="navbar-toggler-icon" />
      </button> */}

      <aside className="sidebar-content">
        <div className="sidebar-header">
          <img src={logo} alt="logo" />
        </div>
        <nav className="sidebar-nav">
          <ul className="mt-2">
            <li>
              <Link to="/dashboard" className={conditionalClass("/dashboard")}>
                <span className="me-3">Dashboard</span>
              </Link>
            </li>
            {userInfo?.userRole === 'ADMIN' && (
              <li>
                <Link to="/adminlist" className={conditionalClass("/adminlist")}>
                  <span className="me-3">Admin List</span>
                </Link>
              </li>
            )}
            <li>
              <Link to="/teacherlist" className={conditionalClass("/teacherlist")}>
                <span className="me-3">Teacher List</span>
              </Link>
            </li>
            <li>
              <Link to="/studentlist" className={conditionalClass("/studentlist")}>
                <span className="me-3">Student List</span>
              </Link>
            </li>

            <div className="line-dashed"></div>

            <li>
              <Link to="/setting" className={conditionalClass("/setting")}>
                <span className="me-3">Setting</span>
              </Link>
            </li>
            <li>
              <Link to="/help" className={conditionalClass("/help")}>
                <span className="me-3">Help & Support</span>
              </Link>
            </li>
            <li>
              <Link onClick={handleLogout} className="nav-link py-2 rounded-xl">
                <span className="me-3">Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}

export default Sidebar;
