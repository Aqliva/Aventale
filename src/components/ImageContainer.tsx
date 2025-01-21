import React from "react";

interface Image {
  src: string;
  alt: string;
}

interface ImageContainerProps {
  images: Image[];
}

const ImageContainer: React.FC<ImageContainerProps> = ({ images }) => {
  return (
    
    <div id="image-container">
      {images.map((image, index) => (
        <img key={index} src={image.src} alt={image.alt} />
      ))}
    </div>
  );
};

export default ImageContainer;
