import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import useFetch from "../useFetch";
import "./ProductDetails.css"

import { useCart } from "../context/CartContext";
import { useWishList } from "../context/WishListContext";

export const ProductDetails = () => {
    const {data} = useFetch(
    "https://first-stop-app-data-base.vercel.app/products"
  );

    const { addToCart } = useCart();
    const { addToWishList, removeFromList, wish } = useWishList();

    const { brand } = useParams();
    const [productDetails, setProductDetails] = useState(null);

    useEffect(() => {
        if(!data) return;

        let details = data.find((p) => p.brand === brand);
        const inWish = wish.find((item) => item.brand === brand)
        if(inWish){
            details = inWish; 
        }
        setProductDetails(details);
    },[brand, data, wish])

    return (
        <>
        <div className="ProductDetails">
            {productDetails && (
                <>
                <div className="p-4">
                <div className="cardProduct mb-3">
            <div className="row g-0">
    <div className="col-md-4">
      <img src={productDetails.src} className="img-fluid rounded-start cardProductImg" alt={productDetails.brand} />
    </div>
    <div className="col-md-10">
      <div className="cardProduct-body">
        <h4 className="cardProduct-title">{productDetails.brand}</h4>
        <p className="cardProduct-text"><strong>Details: </strong>{productDetails.details}</p>
        <p className="cardProduct-text"><strong>Description: </strong>{productDetails.description}</p>
        <p className="cardProduct-text"><strong>Rating: </strong>{productDetails.rating}</p>
        <p className="cardProduct-text"><strong>Price: </strong><small className="text-body-secondary">{productDetails.price} $</small></p>
        <p className="cardProduct-text"><strong>Origin: </strong>Made in {productDetails.country}</p>
        <div className="cardProductSpace">
                      <button type="button" className="btn btn-secondary" onClick={() => !productDetails.isInWishlist ? addToWishList(productDetails) : removeFromList(productDetails.brand)}>{productDetails?.isInWishlist ? "Remove from WishList" : "Add to Wishlist"}</button>
                      <button type="button" className="btn btn-secondary" onClick={() =>  addToCart(productDetails)}>Add to Cart</button>
        </div>
        
            </div>
            </div>
            </div>
               </div>
               </div>
                </>
            )}
        </div>
        </>
    )
}