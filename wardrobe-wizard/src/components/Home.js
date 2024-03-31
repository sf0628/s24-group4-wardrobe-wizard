import React from 'react';
import Slider from 'react-slick';
import './Home.css'

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image1 from './Assets/drink.jpeg';
import image2 from './Assets/white flower.JPG';
import image3 from './Assets/table.png';

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div>
      <h2>Welcome to the Home Page!</h2>
      <Slider {...settings}>
        <div>
          <img src={image1} alt="Image 1" />
        </div>
        <div>
          <img src={image2} alt="Image 2" />
        </div>
        <div>
          <img src={image3} alt="Image 3" />
        </div>
      </Slider>
      {/* Add content for your home page */}
    </div>
  );
};

export default Home;
