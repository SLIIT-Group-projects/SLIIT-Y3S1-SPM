import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import PlantNavBar from "../shared/PlantNavBar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Submit
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
