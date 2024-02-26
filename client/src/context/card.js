import { useState, useContext, createContext, useEffect } from "react";

// Create Context
const CardContext = createContext();

const CardProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingItem = localStorage.getItem("cart");
    if (existingItem) setCart(JSON.parse(existingItem));
  }, []);

  return (
    <CardContext.Provider value={[cart, setCart]}>
      {children}
    </CardContext.Provider>
  );
};

// Custom Hook
const useCard = () => useContext(CardContext);

export { useCard, CardProvider };
