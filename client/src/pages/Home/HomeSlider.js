import React from "react";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export default function HomeSlider() {
  return (
    <>
      <div className="home-slider">
        <Carousel>
          <div>
            <img src="/Home1.jpg" />
          </div>
          <div>
            <img src="/home5.jpg" />
          </div>
          <div>
            <img src="/home2.jpg" />
          </div>
        </Carousel>
        {/* <div className="slider-content">
          <h3>Ecommerce Store</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
            voluptatem temporibus cumque reprehenderit nesciunt quas sed iste
            quo minus nobis.
          </p>
          <button>Details</button>
        </div> */}
        {/* <div className="sale-border">
          <p>New Year Sale 2024 | Every Product 10% Discount</p>
        </div> */}
      </div>
    </>
  );
}
