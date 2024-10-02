// SignUp.jsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase"; // Ensure these paths are correct
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import PlantNavBar from "../shared/PlantNavBar"; // Ensure this path is correct

function SignUp() {
  // State variables for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("customer"); // Default role

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Create user with email and password using Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        // Store additional user details in Firestore
        await setDoc(doc(db, "Users", user.uid), {
          name,
          email: user.email,
          phoneNumber,
          address,
          role,
        });
      }

      // Success feedback
      toast.success("User Registered Successfully!", {
        position: "top-center",
      });

      // Optional: Reset form fields after successful registration
      setName("");
      setEmail("");
      setPassword("");
      setPhoneNumber("");
      setAddress("");
      setRole("customer");
    } catch (error) {
      // Error feedback
      console.error("Registration Error: ", error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <>
      {/* Navigation Bar */}
      <PlantNavBar />

      {/* Registration Form Container */}
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-green-200 via-green-300 to-green-400">
        <form
          onSubmit={handleRegister}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <h3 className="text-2xl font-bold mb-6 text-green-700 text-center">
            Sign Up
          </h3>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              pattern="[0-9]{10}" // Basic pattern for 10-digit numbers
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <small className="text-gray-500">Format: 1234567890</small>
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Address
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          {/* Role */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Role
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Register
            </button>
          </div>

          {/* Redirect to Login */}
          <p className="text-sm text-center text-gray-600">
            Already registered?{" "}
            <a href="/login" className="text-green-600 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </>
  );
}

export default SignUp;
