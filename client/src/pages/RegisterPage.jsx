import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import NavbarComponent from "../components/NavbarComponent";
import axios from "axios";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    personal_id: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone_number: "",
  });

  const [loading, setLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/service/user/signup", formData);
      toast.success(response.data.message);
      setRegistrationSuccess(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (registrationSuccess) {
    return (
      <>
        <NavbarComponent />
        <div className="flex flex-col items-center justify-center min-h-screen py-8">
          <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
            <h1 className="text-2xl text-green-800 font-semibold mb-4">
              Registration Successful!
            </h1>
            <p className="text-gray-600 mb-6">
              Please verify your email to complete the registration process.
            </p>
            <button
              onClick={() => navigate("/otpverification")}
              className="bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition w-full mb-3"
            >
              Verify Email
            </button>
            <button
              onClick={() => navigate("/signin")}
              className="bg-gray-600 text-white p-3 rounded-md hover:bg-gray-700 transition w-full"
            >
              Go to Login
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavbarComponent />
      <div className="flex flex-col items-center justify-center min-h-screen py-8">
        <h1 className="text-lg text-green-800 font-semibold mb-4">
          Create an Account
        </h1>
        <form className="flex flex-col gap-3 w-80" onSubmit={handleRegister}>
          <input
            type="text"
            name="personal_id"
            value={formData.personal_id}
            onChange={onChange}
            placeholder="Personal ID"
            className="border p-2 rounded-md"
            required
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            placeholder="Full Name"
            className="border p-2 rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            placeholder="Email"
            className="border p-2 rounded-md"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={onChange}
            placeholder="Password"
            className="border p-2 rounded-md"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={onChange}
            placeholder="Confirm Password"
            className="border p-2 rounded-md"
            required
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={onChange}
            placeholder="Address"
            className="border p-2 rounded-md"
          />
          <input
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={onChange}
            placeholder="Phone Number"
            className="border p-2 rounded-md"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/signin" className="text-green-600 hover:text-green-700">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default RegisterPage; 