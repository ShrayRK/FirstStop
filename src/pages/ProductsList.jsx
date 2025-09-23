import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useWishList } from "../context/WishListContext";
import { useSearch } from "../context/SearchContext";
import useFetch from "../useFetch";

export const Products = () => {
   const {data} = useFetch(
    "https://first-stop-db.vercel.app/products"
  );
    const { addToCart } = useCart();
    const { addToWishList, wish, removeFromList } = useWishList();
    const { searchQuery } = useSearch();
    const { category } = useParams();

    const [productData, setProductData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [selectedRating, setSelectedRating] = useState("All"); 
    const [selectedPrice, setSelectedPrice] = useState("All")

  useEffect(() => {
    if (!data) return;

    let filtered = data;

    if (category) {
      filtered = filtered.filter((pData) => pData.category === category);
    } 
    else if (selectedCategory !== "All") {
      filtered = filtered.filter((pData) => pData.category === selectedCategory);
    }

    if(searchQuery.trim() !== ""){
      filtered = filtered.filter((pData) => 
      pData.brand.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    if (selectedRating !== "All") {
        if(selectedRating === "1-4") {
          filtered = filtered.filter((pData) => pData.rating >= 1 && pData.rating < 4);
        } else if (selectedRating === "4-7"){
            filtered = filtered.filter((pData) => pData.rating >= 4 && pData.rating < 7);
        } else if (selectedRating === "7-10"){
            filtered = filtered.filter((pData) => pData.rating >= 7 && pData.rating <= 10);
        }
    }

    if (selectedPrice !== "All") {
        if(selectedPrice === "0-100"){
          filtered = filtered.filter((pData) => pData.price >= 0 && pData.price < 100);
        } else if(selectedPrice === "100-500"){
          filtered = filtered.filter((pData) => pData.price >= 100 && pData.price < 500);
        } else if(selectedPrice === "500"){
          filtered = filtered.filter((pData) => pData.price >= 500);
        }
    }
    setProductData(filtered);
  }, [category, selectedCategory, selectedRating, selectedPrice, searchQuery, data]);
   
    return (
      <>
        <div className="App container">
            <div className="py-4">
              <p className="display-3"><strong><u>{category || "All products"}</u></strong></p>
            </div>
              {!category && (
                <>
                <div className="pb-4 row">
              <div className="col-md-4">
                    <label htmlFor="categoryFilter"><h2>Product By Category</h2></label>
              <select name="categoryFilter" 
              id="categoryFilter" 
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="p-4 form-control text-center fw-bold">
              <option value="All">All</option>
              <option value="Bags">Bags</option>
              <option value="Clothing">Clothing</option>
              <option value="Accessories">Accessories</option>
              <option value="Kids">Kids</option>
              <option value="Home Decor">Home Decor</option>
              <option value="Beauty">Beauty</option>
              </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="ratingFilter"><h2>Rating</h2></label>
              <select name="rating" id="rating"
              value={selectedRating}
              onChange={(event) => setSelectedRating(event.target.value)}
              className="p-4 form-control text-center fw-bold">
              <option value="All">Select rating</option>
              <option value="1-4">1-4</option>
              <option value="4-7">4-7</option>
              <option value="7-10">7-10</option>
              </select>
              </div>
               <div className="col-md-4">
                <label htmlFor="priceFilter"><h2>Price</h2></label>
              <select name="price" id="price"
              value={selectedPrice}
              onChange={(event) => setSelectedPrice(event.target.value)}
              className="p-4 form-control text-center fw-bold">
              <option value="All">Select Price Range</option>
              <option value="0-100">0-100</option>
              <option value="100-500">100-500</option>
              <option value="500">500 Above</option>
              </select>
              </div>
              </div>
                </>
              )}
              <div className="row">
                {productData.map((pData) => {
                  const inWishList = wish.some((item) => item.brand === pData.brand)

                return (
                  <div className="col-md-6 mb-4" key={pData.brand}>
                   <div className="card">
              <div className="row g-0">
                  <div className="col-md-4">
                    <img src={pData.src} alt={pData.brand} className="img-fluid rounded-start"/>
                  </div>
              <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title pb-2">{pData.brand}</h5>
                    <p className="card-text"><strong>Rating: </strong>{pData.rating}</p>
                    <p className="card-text"><strong>Price: </strong>{pData.price} $</p>
                    <p className="card-text"> <Link to={`/productDetails/${pData.brand}`}  className="link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Details</Link></p>
                  <div className="space">
                      <button type="button" className="btn btn-secondary" onClick={() => !inWishList ? addToWishList(pData) : removeFromList(pData.brand)}>{inWishList ? "Remove from WishList" : "Add to Wishlist"}</button>
                      <button type="button" className="btn btn-secondary" onClick={() =>  addToCart(pData)}>Add to Cart</button>
                  </div>
                </div>
              </div>
                  </div> 
                  </div>
                  </div>
                )
              })}
              </div>
        </div>
        </>
    )
}
