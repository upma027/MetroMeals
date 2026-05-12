import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Cancel() {
  useEffect(() => {
    localStorage.removeItem('session');
  }, []);

  return (
    <div className='container-fluid w-100 vh-100 bg-dark text-white d-flex justify-content-center align-items-center'>
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <h1>402 : Payment Failed</h1>
        <Link to="/" className='btn btn-outline-success'>Back To Home</Link>
      </div>
    </div>
  );
}
