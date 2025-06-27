import React, { useEffect } from 'react';
import { useDispatchCart } from './ContextReducer';

export default function Success() {
  const dispatch = useDispatchCart();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('Lastcart'));

    if (data && data.length > 0) {
      //  Mock storing order without API
      console.log("✅ Order would be sent to backend here:", data);
      dispatch({ type: 'DROP' });
      localStorage.removeItem('Lastcart');
    }
  }, [dispatch]);

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-dark text-white">
      <div className="text-center">
        <h1 className="mb-4">Order Placed Successfully!</h1>
        <a href="/" className="btn btn-outline-success me-2">Back To Home</a>
        <a href="/myOrder" className="btn btn-outline-primary">View Order History</a>
      </div>
    </div>
  );
}
