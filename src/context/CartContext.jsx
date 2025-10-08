import { createContext, useContext, useState } from "react";
import { toast } from 'react-toastify';


const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const inCart = prevCart.find((item) => item.brand === product.brand);
            if (inCart) {
                return prevCart.map((item) => 
                    item.brand === product.brand ? 
                {...item, qty: item.qty + 1 } : item)
            } else {
                return [...prevCart, {...product, qty: 1}];
            }   
        })
          toast("Added to cart.👍");
    };


const updateQty = (brand, newQty) => {
    setCart((prevCart) => 
    prevCart.map((item) => item.brand === brand ? {...item, qty: newQty < 1 ? 1 : newQty } : item)
 )
};

const removeFromCart = (brand) => {
    setCart((prevCart) => prevCart.filter((item) => item.brand !== brand));
};

const emptyCart = () => {
    setCart([]);
}

return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, removeFromCart, emptyCart }}>
        {children}
    </CartContext.Provider>
       );
};


export const useCart = () => {
    return useContext(CartContext);
};