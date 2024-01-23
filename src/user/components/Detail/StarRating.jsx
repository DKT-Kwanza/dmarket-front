import styled from "styled-components";
import { IoStarHalfSharp, IoStarSharp, IoStarOutline } from "react-icons/io5";

function StarRating({rating, style}) {
    // 0.5 단위로 반올림
    const round = Math.ceil(rating / 0.5) * 0.5;

    // 채워진 별과 반 별의 개수 계산
    const filledStars = Math.floor(round);
    const hasHalfStar = round % 1 !== 0;
    // 빈 별의 개수 계산
    const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

    // 별들을 담을 배열 생성
    const stars = [];

    // 채워진 별 추가
    for (let i = 0; i < filledStars; i++) {
        stars.push(<IoStarSharp key={`filled-${i}`} color="#FFD465" />);
    }

    // 반 별 추가
    if (hasHalfStar) {
        stars.push(<IoStarHalfSharp key="half" color="#FFD465" />);
    }
    // 빈 별 추가
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<IoStarOutline key={`empty-${i}`} color="#FFD465" />);
    }

    return (
        <RatingArea>
            {stars}
            {
                style
                ? null : <div style={{marginLeft:'10px'}}>{rating}</div>
            }
        </RatingArea>
    );
}

const RatingArea = styled.div`
  display: flex;
  align-items: center;
`;

export default StarRating;