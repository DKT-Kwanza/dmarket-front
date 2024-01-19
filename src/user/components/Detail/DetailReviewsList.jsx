import DetailReviewItem from "./DetailReviewItem";

const DetailReviewsList = ({reviews}) => {
    return (
        <div>
            {
                reviews.map((review, index) => (
                    <div key={index}>
                        <DetailReviewItem
                            rating={review.rating}
                            writer={review.writer}
                            reviewDate={review.createdAt.split(' ')[0]}
                            option={review.option}
                            imageSrc={review.reviewImg}
                            content={review.content}/>
                    </div>
                ))
            }
        </div>
    );
}

export default DetailReviewsList;