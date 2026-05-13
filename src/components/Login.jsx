import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function Login() {

  let navigate = useNavigate();

  const [enteredCandidate, setCandidate] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {

    setCandidate({
      ...enteredCandidate,
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

      const response = await fetch(
        `https://metromeals.onrender.com/api/loginuser`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(enteredCandidate)
        }
      );

      const json = await response.json();

      setLoading(false);

      if (json.success) {

        localStorage.setItem("userEmail", enteredCandidate.email);
        localStorage.setItem("authToken", json.authToken);

        setSuccess("Login successful! Redirecting...");

        setTimeout(() => {
          navigate("/");
        }, 1500);

      } else {

        // validation errors array
        if (Array.isArray(json.errors)) {

          const newErrors = {};

          json.errors.forEach(err => {

            if (err.param) {
              newErrors[err.param] = err.msg;
            }

          });

          setFieldErrors(newErrors);

        }

        // string errors
        else if (typeof json.errors === "string") {

          setError(json.errors);

        }

        // backend message
        else if (json.message) {

          setError(json.message);

        }

        else {

          setError("Invalid credentials");

        }

      }

    } catch (err) {

      setLoading(false);

      setError("Backend is waking up. Please try again.");

      console.error(err);

    }

  };

  const filldetails = () => {

    setCandidate({
      email: 'guest@gmail.com',
      password: '123456'
    });

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

            <label
              htmlFor="exampleInputEmail1"
              className="form-label text-white"
            >
              Email address
            </label>

            <input
              type="email"
              onChange={handleChange}
              name="email"
              value={enteredCandidate.email}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />

            {
              fieldErrors.email &&
              <div className="text-danger">
                {fieldErrors.email}
              </div>
            }

          </div>

          <div className="mb-3">

            <label
              htmlFor="exampleInputPassword1"
              className="form-label text-white"
            >
              Password
            </label>

            <input
              type="password"
              onChange={handleChange}
              autoComplete='off'
              name="password"
              value={enteredCandidate.password}
              className="form-control"
              required
            />

            {
              fieldErrors.password &&
              <div className="text-danger">
                {fieldErrors.password}
              </div>
            }

          </div>

          <button
            type="submit"
            className="btn btn-success mx-2"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Submit"}
          </button>

          <Link
            to="/createuser"
            className='btn btn-primary mx-2'
          >
            Create Your Account
          </Link>

          <button
            className='btn btn-warning mx-2'
            type="button"
            onClick={filldetails}
          >
            Guest Mode
          </button>

        </form>

      </div>

    </>

  );

}