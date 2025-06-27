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

    const json = { success: true, authToken: "dummy-token" };

      if (json.success) {
        localStorage.setItem("userEmail", enteredCandidate.email);
        localStorage.setItem("authToken", json.authToken);
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => navigate("/"), 1500);
      } else {
        if (json.errors) {
          const newErrors = {};
          json.errors.forEach(err => {
            if (err.param) newErrors[err.param] = err.msg;
            else setError(err.msg);
          });
          setFieldErrors(newErrors);
        } else if (json.message) {
          setError(json.message);
        } else {
          setError("Enter Valid Credentials");
        }
      }
    } catch (err) {
      setError("Something went wrong while logging in.");
      console.error(err);
    }
  };

  const filldetails = () => {
    setCandidate({ email: 'guest@gmail.com', password: '123456' });
  };

  return (
    <>
      <Navbar />
      <div className='container d-flex justify-content-center w-100 mt-5'>
        <form onSubmit={handleSubmit}>
          {success && <div className="alert alert-success">{success}</div>}
          {error && <div className="text-danger mb-2">{error}</div>}

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label text-white">Email address</label>
            <input
              type="email"
              onChange={handleChange}
              name="email"
              value={enteredCandidate.email}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            {fieldErrors.email && <div className="text-danger">{fieldErrors.email}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label text-white">Password</label>
            <input
              type="password"
              onChange={handleChange}
              autoComplete='off'
              name="password"
              value={enteredCandidate.password}
              className="form-control"
            />
            {fieldErrors.password && <div className="text-danger">{fieldErrors.password}</div>}
          </div>

          <button type="submit" className="btn btn-success mx-2">Submit</button>
          <Link to="/createuser" className='btn btn-primary mx-2'>Create Account</Link>
          <button className='btn btn-warning mx-2' type="button" onClick={filldetails}>Guest Mode</button>
        </form>
      </div>
    </>
  );
}
