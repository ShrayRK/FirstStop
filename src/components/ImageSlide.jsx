import React, { useState } from "react"
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs"

import "./ImageSlide.css"

export const ImageSlide = ({img}) => {
    const [slide, setSlide] = useState(0)

    const nextSlide = () => {
        setSlide(slide === img.length - 1 ? 0 : slide + 1)
    }
    
    const prevSlide = () => {
        setSlide(slide === 0 ? img.length - 1 : slide - 1)
    }

    return (
        <div className="image-slide">
            <div className="carousel">
            <BsArrowLeftCircleFill className="arrow arrow-left" onClick={prevSlide}/>
            {img.map((image, index) => {
            return <img src={image.src} alt={image.alt} key={index} className={slide === index ? "slide" : "slide-hidden" }/>
        })}
        <BsArrowRightCircleFill className="arrow arrow-right" onClick={nextSlide}/>
        <span className="indicators">
            {img.map((_, index) => {
                return(
                    <button key={index} onClick={() => setSlide(index)} className={slide === index ? "indicator" : "indicator indicator-inactive"}></button>
                )
            })}
        </span>
        </div>
        </div>    
    );
};