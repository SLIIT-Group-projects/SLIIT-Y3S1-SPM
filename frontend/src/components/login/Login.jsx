import React, { useState } from "react";
import PlantNavBar from "../shared/PlantNavBar";
import { useNavigate } from "react-router-dom";

function Login() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await signInWithEmailAndPassword(auth, email, password);
  //     console.log("User logged in Successfully");
  //     toast.success("User logged in Successfully", {
  //       position: "top-center",
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //     toast.error(error.message, {
  //       position: "bottom-center",
  //     });
  //   }
  // };

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);
      setSuccessMessage("Registration successful! Redirecting to login..."); // Set success message
      setTimeout(() => {
        navigate("/"); // Navigate to login after 2 seconds
      }, 5000);
    } catch (error) {
      console.error(error.message);
    } finally {
      setFormData({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
      });
    }
  };
  return (
    <>
    <PlantNavBar/>
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-green-200 via-green-300 to-green-400">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h3 className="text-2xl font-bold mb-6 text-green-700">Login</h3>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email address</label>
          <input
            type="email"
            name="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            name= "password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-6">
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition duration-300"
          >
            LogIn
          </button>
        </div>

        <p className="text-sm text-center text-gray-600">
          New user?{" "}
          <a href="/signup" className="text-green-600 hover:underline">
            Register Here
          </a>
        </p>
      </form>
    </div>
    </>
  );
}

export default Login;
