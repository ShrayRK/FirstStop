import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom" 
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";
import { useLogin } from "../context/LoginContext"
import { useWishList } from "../context/WishListContext";
import { FaUserCircle } from "react-icons/fa";

export default function Nav() {
    const { cart } = useCart();
    const { searchQuery, setSearchQuery } = useSearch();
    const { isLoggedIn, user, logoutUser } = useLogin();
    const { wish } = useWishList();

    const totalWish = wish.length;
    
    const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

    const [searchTerm, setSearchTerm] = useState(searchQuery)

    const location = useLocation();

    const handleSearch = (event) => {
        event.preventDefault();
        setSearchQuery(searchTerm);
    };

    const handleLogoutClick = () => {
        logoutUser();
        setSearchQuery("");
        setSearchTerm("");
    }

  useEffect(() => {
        if (location.pathname !== "/productList" && location.pathname !== "/productList/:category") {
            setSearchQuery("");
            setSearchTerm("");
        } else {
            setSearchTerm(searchQuery); 
        }
    }, [location.pathname, setSearchQuery, searchQuery]);
  
  return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    First Stop
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/productList" className="nav-link">
                                Product List
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/cart" className="nav-link">
                                Cart ({totalItems})
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/wishlist" className="nav-link">
                                WishList ({ totalWish })
                            </Link>
                        </li>
                        {isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <Link to="/profile" className="nav-link">
                                        Hello, {user?.name && user.name.charAt(0).toUpperCase() + user.name.slice(1)} 
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={handleLogoutClick}>
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">
                                    <FaUserCircle size={22} />
                                </Link>
                            </li>
                        )}
                    </ul>
                    {(location.pathname === "/productList" || location.pathname.startsWith("/productList/")) && ( 
                        <form className="d-flex" onSubmit={handleSearch}>
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search products by brand"
                                aria-label="Search"
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                            />
                            <button className="btn btn-outline-success" type="submit">
                                Search
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </nav>
    )
}