import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Modal from './components/modals'; // Make sure you have this Modal component created

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const loader = useRef(null);

  useEffect(() => {
    loadImages();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 1 });
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
    // eslint-disable-next-line
  }, []);

  const loadImages = async () => {
    setLoading(true);
    const newImages = [];
    for (let i = 0; i < 16; i++) {
      const imageSrc = `https://picsum.photos/id/${Math.floor(Math.random() * 200)}/200/300`;
      newImages.push(imageSrc);
    }
    setImages((prevImages) => [...prevImages, ...newImages]);
    setLoading(false);
  };

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      loadImages();
    }
  };

  const safeOpenModal = (src) => {
    setSelectedImage(src);
    setModalOpen(true);
  };

  return (
    <>
      <div className="grid-layout">
        {images.map((src, index) => (
          <img key={index} src={src} alt={`Random ${index}`} className="grid-item zoom-effect" onClick={() => safeOpenModal(src)} />
        ))}
        {loading && <div>Loading...</div>}
      </div>
      <div ref={loader} style={{ height: "100px", margin: "30px" }}></div>
      {/* Modal Component */}
      <Modal isOpen={modalOpen} src={selectedImage} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default App;
