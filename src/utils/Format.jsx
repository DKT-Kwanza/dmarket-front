/* 날짜만 남기기 */
export const formatDate = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
};

/* 시간만 남기기 */
export const formatTime = (datetime) => {
    const date = new Date(datetime);
    let hours = date.getHours();
    const minutes = date.getMinutes();

    /* 시간을 2자리 형식으로 포매팅*/
    hours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${hours}:${formattedMinutes}`;
};

/* 콤마 추가 */
export const formatPrice = (value) => {
    if (value == null) return '0';

    const stringValue = value.toString();

    return stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/* 콤마 제거 */
export const removeCommas = (value) => {
    return value.replace(/,/g, '');
};
