import React, { useEffect } from 'react';
import { useDispatchCart } from './ContextReducer';

export default function Success() {
  const dispatch = useDispatchCart();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('Lastcart'));
    const userEmail = localStorage.getItem('userEmail');

    const storeOrder = async () => {
      const response = await fetch('http://localhost:5000/api/orderData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          Order_date: new Date().toDateString(),
          name: "Guest" // Replace with actual user if needed
        }),
      });

      if (response.ok) {
        dispatch({ type: 'DROP' });
        localStorage.removeItem('Lastcart');
      }
    };

    if (data && data.length > 0) {
      storeOrder();
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
