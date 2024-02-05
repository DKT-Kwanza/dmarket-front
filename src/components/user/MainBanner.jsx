import React, { useState, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight, FaPause, FaPlay } from "react-icons/fa";
import banner01 from '../../assets/images/banner01.png'
import banner02 from '../../assets/images/banner02.png'
import banner03 from '../../assets/images/banner03.png'

const MainBanner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [pause, setPause] = useState(false);
    const images = [banner01, banner02, banner03];

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); 
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length); 
    };

    useEffect(() => {
        if (!pause) {
            const interval = setInterval(() => {
                nextImage(); 
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [pause]);

    const togglePause = () => {
        setPause(!pause);
    };

    return (
        <div className='main-div-mainimg-wrapper'>
            <div className='main-div-mainimg'>
                <img src={images[currentIndex]} alt={`Banner ${currentIndex + 1}`} style={{ width: '100%', height: 'auto' }} />
            </div>
            <div className='main-div-buttonwrapper'>
                <button className='main-btn-movebtn' onClick={prevImage}><FaAngleLeft /></button>
                <button>{currentIndex + 1}/{images.length}</button>
                <button className='main-btn-movebtn' onClick={nextImage}><FaAngleRight /></button>
                <button onClick={togglePause}>{pause ? <FaPlay /> : <FaPause />}</button>
            </div>
        </div>
    );
};

export default MainBanner;
