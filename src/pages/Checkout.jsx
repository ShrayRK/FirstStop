import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useLogin } from "../context/LoginContext";
import { useLocation, useNavigate } from "react-router-dom";
import "./Checkout.css"
import { toast, ToastContainer } from "react-toastify";

export const Checkout = () => {
    const { cart, emptyCart } = useCart();
    const { user, isLoggedIn, addAddress, addOrder } = useLogin();
    const navigate = useNavigate();
    const location = useLocation();

    const [selectedAddress, setSelectedAddress] = useState("");
    const [tempNewAddressInput, setTempNewAddressInput] = useState(""); 
    const [orderPlaced, setOrderPlaced] = useState(false);

    const addresses = user?.addresses || [];

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login", {state: {from: location.pathname } });
        }
        if (cart.length === 0 && !orderPlaced) {
            navigate("/cart"); 
        }
        
        if (addresses.length > 0 && !selectedAddress) {
            setSelectedAddress(addresses[0]);
        }
    }, [isLoggedIn, cart, navigate, orderPlaced, addresses, location]);

    if (!isLoggedIn || cart.length === 0) {
        return null; 
    }

    const totalAmount = cart.reduce((acc, pData) => acc + pData.price * pData.qty, 0);

    const handlePlaceOrder = (event) => {
        event.preventDefault();

        let finalShippingAddress = selectedAddress;
        if ((selectedAddress === "new" || addresses.length === 0) && tempNewAddressInput.trim() !== "") {
            finalShippingAddress = tempNewAddressInput.trim();

            addAddress(finalShippingAddress)
        }

        if (!finalShippingAddress || finalShippingAddress.trim() === "") {
            toast.error("Please select or enter a shipping address.");
            return;
        }

        const orderDetails = {
          id: Date.now(),
          items: cart,
          total: totalAmount,
          address: finalShippingAddress,
          date: new Date().toLocaleString(),
        }

        addOrder(orderDetails);
        
        emptyCart();

        setOrderPlaced(true);

        toast.success("Order placed successfully!");
        
        setTimeout(() => {
          navigate("/")}, 2000);
        
    };
      
    return (
       <div className="Checkout">
         <div className="checkout-container container py-5">
            <h2 className="checkout-title">Checkout</h2>
            {orderPlaced ? (
                <div className="alert alert-success">
                    Your order has been placed successfully!
                    <p className="mt-3">You will be redirected to the order confirmation page.</p>
                </div>
            ) : (
               <form onSubmit={handlePlaceOrder}>
              
               <div className="card checkout-card">
            <div className="col-md-12">
           <div className="card-body">
          <h4 className="mb-3">Order Summary</h4>
          <ul className="list-group list-group-flush py-2">
            {cart.map((item) => (
              <li
                key={item.brand}
                className="list-group-item d-flex justify-content-between"
              >
                {item.brand} (x{item.qty})
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between fw-bold">
              Total
              <span>${totalAmount.toFixed(2)}</span>
            </li>
          </ul>
        </div>
        </div>
       <div className="col-md-12">
        <div className="card-body">
          <h4 className="mb-3">Shipping Address</h4>
          {addresses.length > 0 ? (
            <>
              <p className="mb-2">Select a saved address:</p>
              {addresses.map((addr, index) => (
                <div className="form-check mb-2" key={index}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="shippingAddress"
                    id={`address-${index}`}
                    value={addr}
                    checked={selectedAddress === addr}
                    onChange={() => {
                      setSelectedAddress(addr);
                      setTempNewAddressInput("");
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`address-${index}`}
                  >
                    {addr}
                  </label>
                </div>
              ))}
            </>
          ) : (
            <p>No saved addresses. Please add one below.</p>
          )}

          {/* New address */}
          <div className="form-check mt-3 mb-3">
            <input
              className="form-check-input"
              type="radio"
              name="shippingAddress"
              id="newTempAddress"
              value="new"
              checked={selectedAddress === "new" || addresses.length === 0}
              onChange={() => setSelectedAddress("new")}
            />
            <label className="form-check-label" htmlFor="newTempAddress">
              Enter a new address
            </label>
          </div>
          {(selectedAddress === "new" || addresses.length === 0) && (
            <div className="mb-3">
              <textarea
                id="tempNewShippingAddress"
                className="form-control"
                rows="7"
                cols="90"
                value={tempNewAddressInput}
                onChange={(e) => setTempNewAddressInput(e.target.value)}
                required={selectedAddress === "new" || addresses.length === 0}
                placeholder="Enter full shipping address for this order"
              ></textarea>
            </div>
          )}
        </div>
      
    </div>
               </div>
               

  <div className="row mt-4">
    <div className="col-12">
      <button
        type="submit"
        className="btn btn-success btn-lg w-100 place-order-btn"
       disabled={
  !(
    (selectedAddress && selectedAddress !== "new") ||
    ((selectedAddress === "new" || addresses.length === 0) &&
     tempNewAddressInput.trim() !== "")
  )
}

      >
        Place Order
      </button>
    </div>
  </div>
</form>

            )}
             
        </div>
        if(setOrderPlaced){
          <ToastContainer />
        }
       </div>
    );
};
