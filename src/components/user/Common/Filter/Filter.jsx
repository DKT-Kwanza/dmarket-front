import React, { useState } from 'react';
import { formatPrice } from '../../../../utils/Format';
import './Filter.css';
import { PiStarFill, PiStarLight } from "react-icons/pi";

function Filter({ setMinPrice, setMaxPrice, setStar }) {
    const [localMinPrice, setLocalMinPrice] = useState('');
    const [localMaxPrice, setLocalMaxPrice] = useState('');
    const [localStar, setLocalStar] = useState('');

    const applyFilters = () => {
        setMinPrice(formatPrice(localMinPrice));
        setMaxPrice(formatPrice(localMaxPrice));
        setStar(localStar);
    };

    const handlePriceChange = (setPriceFunc, value) => {
        setPriceFunc(value);
    };

    const handleRatingChange = (rating) => {
        const newRating = localStar === rating ? '' : rating;
        setLocalStar(newRating);
    };

    const handleClearFilter = () => {
        setLocalMinPrice('');
        setLocalMaxPrice('');
        setLocalStar('');
        setMinPrice('');
        setMaxPrice('');
        setStar('');
    };

    return (
        <div>
            <div className='filter-container'>
                <div className='filter-price-container'>
                    <div className='filter-label'>가격</div>
                    <input 
                        type="text"
                        className='filter-price' 
                        placeholder='최소 가격' 
                        value={localMinPrice}
                        onChange={(e) => handlePriceChange(setLocalMinPrice, e.target.value)}
                    />
                    <div className='filter-font'>~</div>
                    <input 
                        type="text"
                        className='filter-price' 
                        placeholder='최대 가격' 
                        value={localMaxPrice}
                        onChange={(e) => handlePriceChange(setLocalMaxPrice, e.target.value)}
                    />
                </div>
                <div className='filter-rating-container'>
                    <div className='filter-label'>별점</div>
                    {[4, 3, 2, 1].map((starValue) => (
                        <div key={starValue}>
                            <input 
                                type="radio" 
                                name="rating" 
                                id={`star${starValue}`} 
                                className="filter-radio-btn" 
                                value={starValue}
                                checked={localStar === starValue.toString()} 
                                onChange={() => handleRatingChange(starValue.toString())}
                            />
                            <label htmlFor={`star${starValue}`} className="filter-radio-label">
                                <div className='filter-star'>
                                    {[...Array(starValue)].map((_, i) => <PiStarFill key={i} />)}
                                    {[...Array(5 - starValue)].map((_, i) => <PiStarLight key={i} />)}
                                </div>
                                <span> {starValue}점 이상</span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="filter-btn-container">
                <button className="filter-search-btn" onClick={applyFilters}>검색</button>
                <button onClick={handleClearFilter} className="filter-clear-btn">전체해제</button>
            </div>
        </div>
    );
}

export default Filter;
