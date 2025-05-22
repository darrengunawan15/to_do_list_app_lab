import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import NavbarComponent from "../components/NavbarComponent";
import axios from "axios";

const OTPVerificationPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerification = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !otp) {
      toast.error("Please enter both email and OTP code");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/service/user/verify", {
        email,
        otp
      });
      
      toast.success(response.data.message);
      // Redirect to login page after successful verification
      navigate("/signin");
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setResendLoading(true);
    try {
      const response = await axios.post("/service/user/resend-otp", { email });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <>
      <NavbarComponent />
      <div className="flex flex-col items-center justify-center min-h-screen py-8">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl text-green-800 font-semibold mb-4 text-center">
            Email Verification
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Please enter your email and the OTP code sent to your email address.
          </p>
          <form onSubmit={handleVerification} className="flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="border p-3 rounded-md w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                OTP Code *
              </label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP code"
                className="border p-3 rounded-md text-center text-lg tracking-widest w-full"
                maxLength={6}
                pattern="[0-9]*"
                inputMode="numeric"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition w-full"
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Didn't receive the OTP?{" "}
              <button
                onClick={handleResendOTP}
                disabled={resendLoading}
                className="text-green-600 hover:text-green-700 disabled:opacity-50"
              >
                {resendLoading ? "Sending..." : "Resend OTP"}
              </button>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              <button
                onClick={() => navigate("/signin")}
                className="text-green-600 hover:text-green-700"
              >
                Back to Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTPVerificationPage; 