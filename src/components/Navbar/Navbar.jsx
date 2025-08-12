import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");
  const { token, url, setToken, getTotalCartAmount } = useContext(StoreContext);
  const [showDropDown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  return (
    <div className='navbar'>
      <Link to="/">
        <img src={assets.logo} alt="" className='logo' />
      </Link>
      <ul className="nav-menu">
        <Link to="/" onClick={() => { setMenu("Home") }} className={menu === "Home" ? "active" : ""}>Home</Link>
        <a href='#explore' onClick={() => { setMenu("Menu") }} className={menu === "Menu" ? "active" : ""}>Menu</a>
        <a href='#app-download' onClick={() => { setMenu("App") }} className={menu === "App" ? "active" : ""}>Mobile app</a>
        <a href='#footer' onClick={() => { setMenu("Contact") }} className={menu === "Contact" ? "active" : ""}>Contact us</a>
      </ul>
      <div className="nav-right">
        <img src={assets.search_icon} alt="" />
        <div className="nav-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}>
          </div>
        </div>
        {!token ? (
          <button className="sign-in-btn" onClick={() => setShowLogin(true)}>
            Sign In
          </button>
        ) : (
          <div className="nav-profile" ref={dropdownRef}>
            <div
              className="profile-trigger"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <img
                className="profile-icon"
                src={assets.profile_icon}
                alt="Profile"
              />

            </div>

            {showDropDown && (
              <ul className="dropdown-menu">
                <li className="dropdown-item" onClick={()=>{setShowDropdown(false);navigate('/cart')}}>Cart</li>
                <li
                  className="dropdown-item"
                  onClick={() => {
                    setToken("");
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    setShowDropdown(false);
                    try {
                      const res = axios.post(`${url}/api/logout`);
                      if (res.status === 200) {
                        toast.success("Logout successful");
                        setShowLogin(false);
                      } else {
                        console.error("Logout failed");
                      }
                    } catch (error) {
                      toast.error("Logout failed. Please try again.");
                      console.error("Logout error:", error);
                    }
                  }}
                >
                  Sign Out
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar