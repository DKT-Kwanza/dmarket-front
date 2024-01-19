import React from 'react';
import './MileageHistoryItem.css'

const MileageItem = ({ date, contents, addMileage, curMileage  }) => {
    // +, -에 따른 색상 차이
    const mileageClass = addMileage.startsWith('+') 
                         ? 'Mileage-contents-content-data-3-positive' 
                         : 'Mileage-contents-content-data-3-negative';
      
    return (
        <ul className='Mileage-contents-content-data-list'>
            <li className='Mileage-contents-content-data-list-temp'>
                <div className='Mileage-contents-content-data-1'>{date}</div>
                <div className='Mileage-contents-content-data-2'>{contents}</div>
                <div className={`Mileage-contents-content-data-3 ${mileageClass}`}>{addMileage}</div>
                <div className='Mileage-contents-content-data-4'>{curMileage}</div>
            </li>
            <hr className='Mileage-contents-content-data-list-hr' />
        </ul>
    );
};

export default MileageItem;

