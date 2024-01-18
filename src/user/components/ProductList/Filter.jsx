import React, { useState } from 'react';
import './Filter.css';
import { PiStarFill, PiStarLight } from "react-icons/pi";

function Filter(){
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [selectedRating, setSelectedRating] = useState(null);

    const formatPrice = (value) => {
        // 콤마를 제거하고 숫자만 추출
        const number = value.replace(/,/g, '');
        // 숫자를 콤마 포맷으로 변환
        return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handlePriceChange = (e, setPrice) => {
        const formattedPrice = formatPrice(e.target.value);
        setPrice(formattedPrice);
    };

    const handleRatingChange = (rating) => { // 별점 상태 업데이트
        setSelectedRating(rating === selectedRating ? null : rating);
    };

    const handleClearFilter = () => { // 필터 전체 해제
        setMinPrice('');
        setMaxPrice('');
        setSelectedRating(null);
    };

    return (
        <div>
            <div className='filter-container'>
                <div className='filter-price-container'>
                    <div className='filter-label'>가격</div>
                    <input 
                        className='filter-price' 
                        placeholder='0₩' 
                        value={minPrice}
                        onChange={(e) => handlePriceChange(e, setMinPrice)}
                    />
                    <div className='filter-font'>~</div>
                    <input 
                        className='filter-price' 
                        placeholder='0₩' 
                        value={maxPrice}
                        onChange={(e) => handlePriceChange(e, setMaxPrice)}
                    />
                </div>
                <div className='filter-rating-container'>
                    <div className='filter-label'>별점</div>
                    <div>
                        <input 
                            type="radio" 
                            name="rating" 
                            id="star4" 
                            className="filter-radio-btn" 
                            value="4"
                            checked={selectedRating === '4'} 
                            onChange={() => handleRatingChange('4')}
                        />
                        <label for="star4" className="filter-radio-label">
                            <div className='filter-star'>
                                <PiStarFill/>
                                <PiStarFill/>
                                <PiStarFill/>
                                <PiStarFill/>
                                <PiStarLight/>
                            </div>
                            <span> 4점 이상</span>
                        </label>
                        <input 
                            type="radio" 
                            name="rating" 
                            id="star3" 
                            className="filter-radio-btn" 
                            value="3"
                            checked={selectedRating === '3'} 
                            onChange={() => handleRatingChange('3')}
                        />
                        <label for="star3" className="filter-radio-label">
                            <div className='filter-star'>
                                <PiStarFill/>
                                <PiStarFill/>
                                <PiStarFill/>
                                <PiStarLight/>
                                <PiStarLight/>
                            </div>
                            <span> 3점 이상</span>
                        </label>
                        <input 
                            type="radio" 
                            name="rating" 
                            id="star2" 
                            className="filter-radio-btn" 
                            value="2"
                            checked={selectedRating === '2'} 
                            onChange={() => handleRatingChange('2')}
                        />
                        <label for="star2" className="filter-radio-label">
                            <div className='filter-star'>
                                <PiStarFill/>
                                <PiStarFill/>
                                <PiStarLight/>
                                <PiStarLight/>
                                <PiStarLight/>
                            </div>
                            <span> 2점 이상</span>
                        </label>
                        <input 
                            type="radio" 
                            name="rating" 
                            id="star1" 
                            className="filter-radio-btn" 
                            value="1ㄴ"
                            checked={selectedRating === '1'} 
                            onChange={() => handleRatingChange('1')}
                        />
                        <label for="star1" className="filter-radio-label">
                            <div className='filter-star'>
                                <PiStarFill/>
                                <PiStarLight/>
                                <PiStarLight/>
                                <PiStarLight/>
                                <PiStarLight/>
                            </div>
                            <span> 1점 이상</span>
                        </label>
                    </div>
                </div>
            </div>
            <div className='filter-btn-container'>
                <button className='filter-search-btn'>검색</button>
                <button onClick={handleClearFilter} className='filter-clear-btn'>전체해제</button>
            </div>
        </div>
    )
}

export default Filter;