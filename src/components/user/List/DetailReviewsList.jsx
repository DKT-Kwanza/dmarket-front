import DetailReviewItem from "../Item/DetailReviewItem";

const DetailReviewsList = ({reviews}) => {
    return (
        <div>
            {
                reviews.map((review, index) => (
                    <div key={index}>
                        <DetailReviewItem
                            rating={review.reviewRating}
                            writer={review.reviewWriter}
                            reviewDate={review.reviewCreatedDate}
                            option={review.productOption}
                            imageSrc={review.reviewImg}
                            content={review.reviewContents}/>
                    </div>
                ))
            }
        </div>
    );
}

export default DetailReviewsList;