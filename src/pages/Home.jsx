import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom"
import { ImageSlide } from '../components/ImageSlide'
import useFetch from "../useFetch";

import { slides } from "../Data/Image.json"

export const Home = () => {
    const {data, loading, error } = useFetch(
    "https://first-stop-app-data-base.vercel.app/category"
 )

  if (loading) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-5 text-danger">Error: {error}</p>;
  }

  if (!data) {
    return (
      <div>
        <p>"Data not available.</p>
      </div>
    );
  };
  const notify = () => toast("10% off on kids product!");

    return (
        <>
        <ImageSlide img={slides} />
        <div className="App">
            <div className="py-4">
              <p className="display-3"><strong><u>Products Category</u></strong></p>
            </div>
            <div className="container">
              <div className="row">
              {data.map((image) => {
                return (
                  <div className="col-md-4" key={image.title}>
                    
                    <Link to={`/productList/${image.title}`} className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"><img src={image.src} alt={image.title} className="img img-fluid"/><p className="display-6 pb-4">{image.title}</p></Link>
                  </div>
                )
              })}
            </div>
            </div>
        </div>
         <div style={{ textAlign: "center" }}>    
          <button onClick={notify} className="notify-btn col-md-4 p-2 m-4">Sale!</button>
        </div>
               <ToastContainer />
        </>
    )
}


