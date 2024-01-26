import React from 'react';
import './ScrollToTopBtn.css';

function ScrollToTopBtn() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button className="ScrollToTopBtn" onClick={scrollToTop}>
            ↑
        </button>
    );
}

export default ScrollToTopBtn;
