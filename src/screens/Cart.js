import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div className="container mt-5 text-center text-white">
        <h3>Your Cart is Empty</h3>
      </div>
    );
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  const handleCheckout = async () => {
    const userEmail = localStorage.getItem("userEmail");
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orderData`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        name: "Guest", // replace with actual user name if available
        Order_date: new Date().toDateString()
      })
    });

    const json = await response.json();
    if (json.success) {
      alert("Order Placed Successfully!");
      dispatch({ type: "DROP" });
    } else {
      alert("Error placing order. Please try again.");
    }
  };

  return (
    <div className="container mt-5 text-white">
      <h2 className="text-center">My Cart</h2>
      <div className="table-responsive mt-4">
        <table className="table table-hover text-white">
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Size</th>
              <th>Price (₹)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => dispatch({ type: "REMOVE", index })}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="4" className="text-end fw-bold">Total</td>
              <td className="fw-bold">₹{totalPrice}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div className="text-end">
          <button className="btn btn-success" onClick={handleCheckout}>
            Place Order (COD)
          </button>
        </div>
      </div>
    </div>
  );
}
