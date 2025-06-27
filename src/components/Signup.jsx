import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function Signup() {
  let navigate = useNavigate();

  const [candidate, setCandidate] = useState({
    name: "",
    email: "",
    password: "",
    location: ""
  });

  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    setCandidate({
      ...candidate,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setSuccess("");

    const json = { success: true, authToken: "dummy-token" };

      if (json.success) {
        localStorage.setItem("userEmail", candidate.email);
        localStorage.setItem("authToken", json.authToken);
        setSuccess("Account created successfully! Redirecting...");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setError("Enter Valid Credentials");
    } 
  };

  return (
    <>
      <Navbar />
      <div className='container d-flex justify-content-center w-100 mt-5'>
        <form onSubmit={handleSubmit}>
          {success && <div className="alert alert-success">{success}</div>}
          {error && <div className="text-danger mb-2">{error}</div>}

          <div className="mb-3 ">
            <label htmlFor="name" className="form-label text-white">Name</label>
            <input
              type="text"
              onChange={handleChange}
              className="form-control"
              name="name"
              value={candidate.name}
            />
            {fieldErrors.name && <div className="text-danger">{fieldErrors.name}</div>}
          </div>

          <div className="mb-3 ">
            <label htmlFor="exampleInputEmail1" className="form-label text-white">Email address</label>
            <input
              type="email"
              onChange={handleChange}
              name="email"
              value={candidate.email}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            {fieldErrors.email && <div className="text-danger">{fieldErrors.email}</div>}
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label text-white">Password</label>
            <input
              type="password"
              onChange={handleChange}
              autoComplete='off'
              name="password"
              value={candidate.password}
              className="form-control"
            />
            {fieldErrors.password && <div className="text-danger">{fieldErrors.password}</div>}
          </div>

          <div className="mb-3 ">
            <label htmlFor="location" className="form-label text-white">Address</label>
            <input
              type="text"
              className="form-control"
              onChange={handleChange}
              name="location"
              value={candidate.location}
            />
          </div>

          <button type="submit" className="btn btn-success mx-2">Submit</button>
          <Link to="/login" className='btn btn-primary mx-2'>Already have an Account</Link>
        </form>
      </div>
    </>
  );
}
