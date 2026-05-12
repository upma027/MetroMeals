import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { TailSpin } from 'react-loader-spinner';

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
  const [loading, setLoading] = useState(false);

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

    setLoading(true);

    try {

      console.log("Sending data:", candidate);

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/createuser`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(candidate)
      });

      const json = await response.json();

      setLoading(false);

      if (json.success) {

        localStorage.setItem("userEmail", candidate.email);
        localStorage.setItem("authToken", json.authToken);

        setSuccess("Account created successfully! Redirecting...");

        setTimeout(() => {
          navigate("/");
        }, 1500);

      } else {

        if (json.errors) {

          const newErrors = {};

          json.errors.forEach(err => {
            if (err.param) {
              newErrors[err.param] = err.msg;
            } else {
              setError(err.msg);
            }
          });

          setFieldErrors(newErrors);

        } else if (json.message) {

          setError(json.message);

        } else {

          setError("Enter Valid Credentials");

        }
      }

    } catch (err) {

      setLoading(false);

      setError("Backend is waking up... Please wait a few seconds and try again.");

      console.error(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className='container d-flex justify-content-center w-100 mt-5'>

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

            <label htmlFor="name" className="form-label text-white">
              Name
            </label>

            <input
              type="text"
              onChange={handleChange}
              className="form-control"
              name="name"
              value={candidate.name}
              required
            />

            {fieldErrors.name && (
              <div className="text-danger">
                {fieldErrors.name}
              </div>
            )}

          </div>

          <div className="mb-3">

            <label htmlFor="exampleInputEmail1" className="form-label text-white">
              Email address
            </label>

            <input
              type="email"
              onChange={handleChange}
              name="email"
              value={candidate.email}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />

            {fieldErrors.email && (
              <div className="text-danger">
                {fieldErrors.email}
              </div>
            )}

            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>

          </div>

          <div className="mb-3">

            <label htmlFor="exampleInputPassword1" className="form-label text-white">
              Password
            </label>

            <input
              type="password"
              onChange={handleChange}
              autoComplete='off'
              name="password"
              value={candidate.password}
              className="form-control"
              required
            />

            {fieldErrors.password && (
              <div className="text-danger">
                {fieldErrors.password}
              </div>
            )}

          </div>

          <div className="mb-3">

            <label htmlFor="location" className="form-label text-white">
              Address
            </label>

            <input
              type="text"
              className="form-control"
              onChange={handleChange}
              name="location"
              value={candidate.location}
              required
            />

          </div>

          <button
            type="submit"
            className="btn btn-success mx-2"
            disabled={loading}
          >

            {loading ? (
              <TailSpin
                height="25"
                width="25"
                color="white"
                ariaLabel="loading"
              />
            ) : (
              "Submit"
            )}

          </button>

          <Link to="/login" className='btn btn-primary mx-2'>
            Already have an Account
          </Link>

        </form>

      </div>
    </>
  );
}