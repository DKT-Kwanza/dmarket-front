import React from "react";
import { PiStarFill, PiStarLight } from "react-icons/pi";
import { RiDeleteBinLine } from "react-icons/ri";
import './ReviewItem.css';

const ReviewItem = ({ imgSrc, rating, reviewText, reviewDate }) => {
  return (
    <div className="productreview-div-review-content-wrapper">
      {imgSrc && (
        <div className="productreview-div-review-content-img">
          <img src={imgSrc} className='productreview-img-review-content-img' alt="리뷰 이미지"/>
        </div>
      )}
      <div className="productreview-div-review-content-text2-wrapper">
        <div className="productreview-div-reveiw-star-wrapper">
          <div className="productreview-div-review-star">
            {[...Array(rating)].map((_, i) => (
              <PiStarFill className="productreview-PiStarLight-star-lg" key={i}/>
            ))}
            {[...Array(5 - rating)].map((_, i) => (
              <PiStarLight className="productreview-PiStarLight-star-lg" key={i}/>
            ))}
          </div>
          <div>
            <p className="productreview-p-review-star-num">{rating}</p>
          </div>
        </div>
        <div className="productreview-div-review-created-review">
          {reviewText}
        </div>
      </div>
      <div className="productreview-div-review-delete-wrapper">
        <div>
          <p className="productreview-p-review-postdate">{reviewDate}</p>
        </div>
        <button className="productreview-btn-delete-icon"><RiDeleteBinLine /></button>
      </div>
    </div>
  );
};

export default ReviewItem;
