import styled from "styled-components";
import React from "react";
import StarRating from "./StarRating";

function DetailReviewItem({rating, writer, reviewDate, option, imageSrc, content}) {
    return (
        <ReviewContainer>
            <ReviewInfo>
                <StarRating rating={rating} />
                <InfoLine />
                <div>{writer}</div>
                <InfoLine />
                <div>{reviewDate}</div>
                <InfoLine />
                <div>option : {option}</div>
            </ReviewInfo>
            <ReviewContent>
                {
                    imageSrc
                    ? <Image src={imageSrc}/> : null
                }
                <div>{content}</div>
            </ReviewContent>
            <Line />
        </ReviewContainer>
    );
}

const ReviewContainer = styled.div`
  margin-top: 14px;
  font-size: 15px;
  font-weight: 400;
`;

const ReviewInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InfoLine = styled.div`
  width: 1px;
  height: 16px;
  background: #919191;
  margin: 0 16px;
`;

const ReviewContent = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  background: #D9D9D9;
  margin-right: 20px;
`;

const Line = styled.div`
  margin-top: 19px;
  width: 1060px;
  height: 0.5px;
  background: linear-gradient(0deg, #919191 0%, #919191 100%), #919191;
`;

export default DetailReviewItem;