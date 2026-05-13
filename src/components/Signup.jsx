import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Signup() {

  const navigate = useNavigate();

  const [candidate, setCandidate] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCandidate({
      ...candidate,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/createuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(candidate),
        }
      );

      const json = await response.json();

      setLoading(false);

      if (json.success) {

        localStorage.setItem("userEmail", candidate.email);
        localStorage.setItem("authToken", json.authToken);

        setSuccess("Account created successfully!");

        setTimeout(() => {
          navigate("/");
        }, 1500);

      } else {

        setError(json.message || "Signup failed");

      }

    } catch (err) {

      setLoading(false);
      setError("Backend is waking up. Please try again.");

    }
  };

  return (
    <>
      <Navbar />

      <div className="container d-flex justify-content-center w-100 mt-5">

        <form onSubmit={handleSubmit} style={{ width: "400px" }}>

          {success && (
            <div className="alert alert-success">
              {success}
            </div>
          )}

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <div className="mb-3">

            <label className="form-label text-white">
              Name
            </label>

            <input
              type="text"
              className="form-control"
              name="name"
              value={candidate.name}
              onChange={handleChange}
              required
            />

          </div>

          <div className="mb-3">

            <label className="form-label text-white">
              Email
            </label>

            <input
              type="email"
              className="form-control"
              name="email"
              value={candidate.email}
              onChange={handleChange}
              required
            />

          </div>

          <div className="mb-3">

            <label className="form-label text-white">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              name="password"
              value={candidate.password}
              onChange={handleChange}
              required
            />

          </div>

          <div className="mb-3">

            <label className="form-label text-white">
              Address
            </label>

            <input
              type="text"
              className="form-control"
              name="location"
              value={candidate.location}
              onChange={handleChange}
              required
            />

          </div>

          <button
            type="submit"
            className="btn btn-success mx-2"
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </button>

          <Link to="/login" className="btn btn-primary mx-2">
            Already have an Account
          </Link>

        </form>

      </div>
    </>
  );
}