import React, { useEffect, useState } from "react";
import LogoImg from "../assets/logo.png";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import axios from "axios";

const NavbarComponent = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      fetchUserInfo();
    }
  }, [user]);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get("/service/user/user-infor");
      if (response.status === 200) {
        setUserInfo(response.data);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const handleLogout = async () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/signin");
  };

  return (
    <nav className="flex w-full justify-between items-center bg-green-100 shadow-md py-3 px-10">
      {/* Logo */}
      <a href="/">
        <div className="flex gap-1 justify-center items-center cursor-pointer">
          <img src={LogoImg} alt="logo-image" className="h-6 w-6" />
          <p className="text-lg font-semibold text-green-600 hover:text-green-700 transition ease-in-out">
            ToDoSome
          </p>
        </div>
      </a>

      {/* Navigation Menu */}
      <div className="flex gap-6 justify-center items-center text-green-900 font-semibold">
        <a href="#" className="text-sm">
          My ToDo
        </a>
        {user ? (
          <div className="flex items-center gap-3">
            <div className="relative">
              <div 
                className="w-8 h-8 rounded-full bg-green-800 text-white flex items-center justify-center font-semibold cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {userInfo?.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
              </div>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <a 
                    href="/user-infor" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    Profile
                  </a>
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      handleLogout();
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex gap-3">
            <a
              href="/register"
              className="bg-green-600 text-white text-sm py-2 px-6 rounded-md hover:bg-green-700 transition ease-in-out"
            >
              Register
            </a>
            <a
              href="/signin"
              className="bg-green-800 text-white text-sm py-2 px-6 rounded-md hover:bg-green-700 transition ease-in-out"
            >
              Login
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarComponent;
