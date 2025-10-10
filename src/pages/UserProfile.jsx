import React, { useState } from "react";
import { useLogin } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";
import { ToastContainer } from "react-toastify";

export const UserProfile = () => {
  const { user, isLoggedIn, logoutUser, addAddress, removeAddress, updateAddress } = useLogin();
  const navigate = useNavigate();

  const [newAddressInput, setNewAddressInput] = useState("");
  const [editAddressIndex, setEditAddressIndex] = useState(null);
  const [editedAddressText, setEditedAddressText] = useState("");

  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  const handleAddressSubmit = (event) => {
    event.preventDefault();
    if (newAddressInput.trim() !== "") {
      addAddress(newAddressInput);
      setNewAddressInput("");
    }
  };

  const handleEditAddressSave = (event, oldAddress) => {
    event.preventDefault();
    if (editedAddressText.trim() !== "") {
      updateAddress(oldAddress, editedAddressText);
      setEditAddressIndex(null);
      setEditedAddressText("");
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  const addresses = user?.addresses || [];

  return (
    <div className="UserProfile container">
      <h2 className="mb-2">User Profile</h2>
      {user && (
        <div className= "cardUser mb-2">
          <div className="cardUser-body">
          <img className="img" src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" alt="User pic." />
            <p className="lead">
              <strong>Username:</strong> {user.name}
            </p>
            <h4 className="mt-4">Your Order History:</h4>
            {user.orders && user.orders.length > 0 ? (
              <ul className="list-group mb-4">
                {user.orders.map((order) => (
                  <li key={order.id} className="list-group-item">
                    <p><strong>Order ID: </strong> {order.id} </p>
                    <p><strong>Date: </strong> {order.date} </p>
                    <p><strong>Address: </strong> {order.address} </p>
                    <p><strong>Total: </strong> {order.total.toFixed(2)} </p>
                    <ul>{order.items.map((item, i) => (
                      <li key={i}>
                        {item.brand} (x{item.qty}) - {item.price * item.qty}
                      </li>
                    ))}</ul>
                  </li>
                ))}
              </ul>
            ):(
              <p>No orders placed yet.</p>
            )}
            
            <h4 className="mt-4">Your Saved Shipping Address:</h4>
            {addresses.length === 0 ? (
              <p>No addresses saved yet. Add address.</p>
            ) : (
              <ul className="list-group mb-4">
                {addresses.map((addr, index) => (
                  <li
                    key={index}
                    className={`list-group-item ${
                      editAddressIndex === index ? "edit-mode" : "d-flex justify-content-between align-items-start"
                    }`}
                  >
                    {editAddressIndex === index ? (
                      <form
                        onSubmit={(e) => handleEditAddressSave(e, addr)}
                        className="edit-address-form"
                      >
                        <label htmlFor="editAddress" className="form-label">
                          Edit address
                        </label>
                        <textarea
                          id="editAddress"
                          className="form-control"
                          rows="3"
                          value={editedAddressText}
                          onChange={(e) => setEditedAddressText(e.target.value)}
                          required
                        ></textarea>

                        <div className="mt-2">
                          <button type="submit" className="btn btn-success btn-sm me-2">
                            Save
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={() => setEditAddressIndex(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <span className="address-text me-auto">{addr}</span>
                        <div>
                          <button
                            className="btn btn-info btn-sm me-2"
                            onClick={() => {
                              setEditAddressIndex(index);
                              setEditedAddressText(addr);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => removeAddress(addr)}
                          >
                            Remove
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}

            <h4>Add New Address:</h4>
            <form onSubmit={handleAddressSubmit} className="mt-3">
              <div className="mb-3">
                <label htmlFor="newAddress" className="form-label visually-hidden">
                  New Full Address:
                </label>
                <textarea
                  id="newAddress"
                  className="form-control textarea"
                  rows="3"
                  value={newAddressInput}
                  onChange={(e) => setNewAddressInput(e.target.value)}
                  placeholder="Enter a new full shipping address"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Add Address
              </button>
            </form>

            <button className="btn btn-danger mt-3" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};
