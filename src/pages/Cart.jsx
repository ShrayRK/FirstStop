import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "./Cart.css"


export const Cart = () => {
    const { cart, updateQty, removeFromCart, emptyCart } = useCart();

    return (
        <div className="cart-page cart-container container py-5">
            <h2 className="mb-4"> Your Cart </h2>

            {cart.length === 0 ? ( 
                <p>Your cart is empty</p>
            ) : (
                <>
                
                  <ul className="list-group">
  {cart.map((pData) => (
    <li className="list-group-item d-flex justify-content-between align-items-center" key={pData.brand}>
      <div className="col-4">
        <img className="cartImg" src={pData.src} alt={pData.brand} />
      </div>
      <div className="col-4">
        <h5 className="mb-1">{pData.brand}</h5>
        <p className="mb-1"><strong>Price:</strong> {pData.price} $</p>
        <p className="mb-1"><strong>Quantity:</strong> {pData.qty}</p>
      </div>
      
      <div className="d-flex flex-column gap-2">
        <button 
          type="button" 
          className="btn btn-primary btn-sm" 
          onClick={() => pData.qty === 1 ? removeFromCart(pData.brand) : updateQty(pData.brand, pData.qty - 1)}
        >
          {pData.qty > 1 ? "Decrease" : "Remove"}
        </button>
        <button 
          type="button" 
          className="btn btn-primary btn-sm" 
          onClick={() => updateQty(pData.brand, pData.qty + 1)}
        >
          Increase
        </button>
      </div>
    </li>
  ))}
  <li className="list-group-item d-flex justify-content-between align-items-center">
     <h4>Total: {cart.reduce((acc, pData) => acc + pData.price * pData.qty, 0)} $</h4>
              <p><button type="button" className="empty-cart-btn" onClick={() => emptyCart()}>Empty Cart</button></p>
              <p><Link to="/checkout" className="btn btn-primary">Go to Checkout</Link></p>
  </li>
</ul>
                </>
            )}
        </div>
    )
}
