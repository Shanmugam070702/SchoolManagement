import { useState, useRef, useEffect } from "react";
import "./header.css";
import Swal from 'sweetalert2'
import { Link, useNavigate } from "react-router-dom";
import Instance from "../../Axiosconfig";
// import { useSelector, useDispatch } from 'react-redux';

const Header = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const infoUsers = JSON.parse(localStorage.getItem("loginUserData"));


  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure",
      text: "You want to Logout?",
      showCancelButton: true,
      confirmButtonColor: "#555",
      cancelButtonColor: "#008BA6",
      confirmButtonText: "Yes, logout me!"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token")
        navigate("/")
      }
    })
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <nav className="navbar-header">
        <div className="flex w-full justify-end">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="user-info">
                <span
                  style={{
                    color: "#008BA6",
                    fontSize: "16px",
                    fontWeight: "600",
                    letterSpacing: "0.5px",
                  }}
                >
                  {infoUsers ? `${infoUsers.userName}` : "Guest User"}
                </span>
                <br />
                <span className="xl-2">{infoUsers ? infoUsers.userRole : "Guest"}</span>
              </div>

              <button
                className="user-image"
                type="button"
                aria-controls="user-menu"
                onClick={toggleDropdown}
                aria-expanded={isDropdownOpen}
              >
                <img 
                  className="profile--icon" 
                  src={infoUsers 
                    ? `https://ui-avatars.com/api/?name=${`${infoUsers.userName}`.replace(/ /g, '+')}`
                    : `https://ui-avatars.com/api/?name=Guest+User`
                  } 
                  alt={infoUsers ? `${infoUsers.userName}` : "Guest User"} 
                />
              </button>

              {isDropdownOpen && (
                <div
                  className="dropdown-menu"
                  role="menu"
                  aria-labelledby="user-menu"
                  ref={dropdownRef}
                >
                  <div className="dropdown-menu-items">
                    {/* <Link to="/edit-profile" className="dropdown-item" role="menuitem" tabIndex="0">
                      Edit Profile
                    </Link> */}
                    <div
                      onClick={handleSignOut}
                      className="dropdown-item"
                      role="menuitem"
                      tabIndex="0"
                    >
                      Log out
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
