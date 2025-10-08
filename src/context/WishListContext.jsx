import { createContext, useContext, useState } from "react";
import { toast } from 'react-toastify';



const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
    const [wish, setWish] = useState([]);

    const addToWishList = (product) => {
        setWish((prevWish) => {
            const inWishList = prevWish.find(
                (item) => item.brand === product.brand
            );
            if (inWishList) {
                return prevWish.map((item) =>
                 item.brand === product.brand
                 ? {...item, isInWishlist: !item.isInWishlist}
                 : item
                );
            }
            return [...prevWish, {...product, isInWishlist: true }];
        });
        toast("Added to Wishlist.🎉")
    };


    const removeFromList = (brand) => {
        setWish((prevWish) => 
            prevWish.filter((item) => item.brand !== brand));
    };

return (
    <WishListContext.Provider value={{wish, addToWishList, removeFromList }}>
        {children}
    </WishListContext.Provider>
      );
};

export const useWishList = () => {
    return useContext(WishListContext);
};
