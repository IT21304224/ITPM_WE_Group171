import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./HeroSection.css";
import slideImage from '../../images/1.jpg';
import slideImage4 from '../../images/2.jpg';
import slideImage3 from '../../images/3.jpg';
import smallVideo1 from '../../videos/1.mp4'; // Import your small video 1
import smallVideo2 from '../../videos/2.mp4'; // Import your small video 2
import bottomImage from '../../images/6.jpg'; // Import your bottom image

export default function HeroSection() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    pauseOnHover: true,
    fade: true,
    centerMode: true,
    centerPadding: '0',
  };

  return (
    <div className="hero-section">
      <div className="slider-container">
      <Slider {...settings}>
  <div>
    <img src={slideImage} alt="Slide 1" className="slick-image"   />
  </div>
  <div>
    <img src={slideImage4} alt="Slide 4" className="slick-image resized-image"  />
  </div>
  <div>
    <img src={slideImage3} alt="Slide 3" className="slick-image"  />
  </div>
</Slider>

        </div>
      <div className="video-container">
        <div className="small-videos">
          <video autoPlay loop muted className="small-video">
            <source src={smallVideo1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <img src={bottomImage} alt="Bottom Image" className="bottom-image" />
          <video autoPlay loop muted className="small-video">
            <source src={smallVideo2} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
        </div>
      </div>
    </div>
  );
}




