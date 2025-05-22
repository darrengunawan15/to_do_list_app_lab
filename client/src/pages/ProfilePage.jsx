import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import NavbarComponent from "../components/NavbarComponent";
import axios from "axios";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get("/service/user/user-infor");
      if (response.status === 200) {
        setUserInfo(response.data);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      toast.error("Failed to fetch user information");
      if (error.response?.status === 403) {
        navigate("/signin");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <NavbarComponent />
        <div className="flex justify-center items-center min-h-screen">
          <div className="loading loading-spinner text-success loading-lg"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavbarComponent />
      <div className="flex flex-col items-center justify-center min-h-screen py-8">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl text-green-800 font-semibold mb-6 text-center">
            Profile Information
          </h1>
          
          {userInfo && (
            <div className="space-y-4">
              <div className="flex justify-center mb-6">
                {userInfo.user_image ? (
                  <img
                    src={userInfo.user_image}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-green-800 text-white flex items-center justify-center text-4xl font-semibold">
                    {userInfo.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="mt-1 p-2 bg-gray-50 rounded-md">{userInfo.name}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 p-2 bg-gray-50 rounded-md">{userInfo.email}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Personal ID</label>
                  <p className="mt-1 p-2 bg-gray-50 rounded-md">{userInfo.personal_id}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <p className="mt-1 p-2 bg-gray-50 rounded-md">{userInfo.address || "Not provided"}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <p className="mt-1 p-2 bg-gray-50 rounded-md">{userInfo.phone_number || "Not provided"}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Member Since</label>
                  <p className="mt-1 p-2 bg-gray-50 rounded-md">
                    {new Date(userInfo.joinedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage; 