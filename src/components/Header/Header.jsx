import React from 'react';
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      {/* LCP Image */}
      <img
        src="/header_img.webp"
        srcSet="/header_img_small.webp 600w, /header_img.webp 1200w"
        sizes="100vw"
        alt="Delicious food platter"
        className="header-img"
        width="1920"
        height="650"
      />

      {/* Content */}
      <div className="contents">
        <h2>Order your favorite food here!</h2>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
        </p>
        <button>View Menu</button>
      </div>
    </header>
  );
};

export default Header;
