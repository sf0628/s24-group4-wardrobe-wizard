import React, { useState } from 'react';
import './Home.css';
import image1 from './Assets/homepage.svg';
import image2 from './Assets/about.svg';
import image3 from './Assets/our team.svg';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [image1, image2, image3];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
  };

  return (
    <div className="slider-container">
      <div className="slider">
        <div className="slide-container" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {images.map((image, index) => (
            <div key={index} className="slide">
              <img src={image} alt={`Slide ${index}`} />
            </div>
          ))}
        </div>
        <button className="prev" onClick={prevSlide}>&#10094;</button>
        <button className="next" onClick={nextSlide}>&#10095;</button>
      </div>
      <button className="join-button" onClick={() => { window.location.href = '/login'; }}>Join Us</button>
    </div>
  );
};

export default Home;