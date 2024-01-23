import DetailReviewItem from "./DetailReviewItem";

const DetailReviewsList = ({reviews}) => {
    return (
        <div>
            {
                reviews.map((review, index) => (
                    <div key={index}>
                        <DetailReviewItem
                            rating={review.reviewRating}
                            writer={review.reviewWriter}
                            reviewDate={review.reviewCreatedDate.split(' ')[0]}
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