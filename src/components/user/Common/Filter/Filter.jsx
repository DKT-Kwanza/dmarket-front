import './Filter.css';
import React, {useEffect, useState} from 'react';
import {formatPrice} from '@utils/Format';
import {PiStarFill, PiStarLight} from "react-icons/pi";
import Dropdown from '../Select/Dropdown';

function Filter({ setMinPrice, setMaxPrice, setStar, setSorter }) {
    const [localMinPrice, setLocalMinPrice] = useState('');
    const [localMaxPrice, setLocalMaxPrice] = useState('');
    const [priceValidation, setPriceValidation] = useState(true);
    const [localStar, setLocalStar] = useState('');

    useEffect(() => {
        if (Number(localMinPrice) <= Number(localMaxPrice)) {
            setPriceValidation(true);
        } else {
            setPriceValidation(false);
        }
    }, [localMinPrice, localMaxPrice]);


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
                        type='number'
                        className='filter-price-min'
                        placeholder='최소 가격'
                        value={localMinPrice}
                        onChange={(e) => handlePriceChange(setLocalMinPrice, e.target.value)}
                    />
                    <div className='filter-font'>~</div>
                    <input
                        type='number'
                        className='filter-price-max'
                        placeholder='최대 가격'
                        value={localMaxPrice}
                        onChange={(e) => handlePriceChange(setLocalMaxPrice, e.target.value)}
                    />
                    {
                        priceValidation
                            ? null
                            : <span className='filter-validation'>최소 가격은 최대 가격 보다 크게 입력해주세요.</span>
                    }
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
                                    {[...Array(starValue)].map((_, i) => <PiStarFill key={i}/>)}
                                    {[...Array(5 - starValue)].map((_, i) => <PiStarLight key={i}/>)}
                                </div>
                                <span> {starValue}점 이상</span>
                            </label>
                        </div>
                    ))}
                    <div className="filter-btn-container">
                        <button className="filter-search-btn" onClick={applyFilters} disabled={!priceValidation}>검색</button>
                        <button onClick={handleClearFilter} className="filter-clear-btn">전체해제</button>
                    </div>
                    <Dropdown setSorter={setSorter} />
                </div>
            </div>
        </div>
    );
}

export default Filter;
