import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const updatedCart = [...state, {
        id: action.id,
        name: action.name,
        qty: action.qty,
        size: action.size,
        price: action.price,
        img: action.img
      }];
      localStorage.setItem('Lastcart', JSON.stringify(updatedCart));
      return updatedCart;

    case "UPDATE":
      localStorage.setItem('Lastcart', JSON.stringify(action.data));
      return action.data;

    case "REMOVE":
      const filteredCart = [...state];
      filteredCart.splice(action.index, 1);
      localStorage.setItem('Lastcart', JSON.stringify(filteredCart));
      return filteredCart;

    case "DROP":
      localStorage.removeItem('Lastcart');
      return [];

    default:
      console.error("❌❌  Reducer Error: Invalid action type", action.type);
      return state;
  }
};

export const CartProvider = ({ children }) => {
  // ✅ Initialize cart from localStorage
  const initialCart = JSON.parse(localStorage.getItem("Lastcart")) || [];
  const [state, dispatch] = useReducer(reducer, initialCart);

  // ✅ Sync localStorage if cart changes
  useEffect(() => {
    localStorage.setItem("Lastcart", JSON.stringify(state));
  }, [state]);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
