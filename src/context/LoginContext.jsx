import { createContext, useContext, useState, useEffect } from "react";

const LoginContext = createContext();

export const LoginProvider = ({children}) => {
 const [user, setUser] = useState(null);
 const [isLoggedIn, setIsLoggedIn] = useState(false);

 useEffect(() => {
  const storedUser = localStorage.getItem("loggedInUser");
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.address && !parsedUser.addresses) {
      parsedUser.addresses = [parsedUser.address];
      delete parsedUser.address;
    } else if (!parsedUser.addresses) {
      parsedUser.addresses = []
    } 
    setUser(parsedUser);
    setIsLoggedIn(true);
  }
 }, []);

    const loginUser = (name, password) => {
    
    const newUser = {
        name,
        password,
        addresses: user?.addresses || [],
        order: [], 
    };
    setUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));
    return true;
  };

  const logoutUser = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("loggedInUser");
  };

 
  const addAddress = (newAddress) => {
    if (newAddress.trim() === "") return; 
    setUser((prevUser) => {
      const updatedAddresses = [...(prevUser.addresses || []), newAddress.trim()];
      const updatedUser = { ...prevUser, addresses: updatedAddresses };
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  
  const removeAddress = (addressToRemove) => {
    setUser((prevUser) => {
      const updatedAddresses = (prevUser.addresses || []).filter(
        (addr) => addr !== addressToRemove
      );
      const updatedUser = { ...prevUser, addresses: updatedAddresses };
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  
  const updateAddress = (oldAddress, newAddress) => {
      if (newAddress.trim() === "") return;
      setUser((prevUser) => {
          const updatedAddresses = (prevUser.addresses || []).map(addr =>
              addr === oldAddress ? newAddress.trim() : addr
          );
          const updatedUser = { ...prevUser, addresses: updatedAddresses };
          localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
          return updatedUser;
      });
  };

  const addOrder = (order) => {
    setUser((prev) => ({
      ...prev, 
      orders: [...(prev.orders || []), order],
    }));
  };

  return (
     <LoginContext.Provider value={{ user, isLoggedIn, loginUser, logoutUser, addAddress, removeAddress, updateAddress, addOrder }}>
        {children}
    </LoginContext.Provider>
  )
}

export const useLogin = () => {
    return useContext(LoginContext);
}