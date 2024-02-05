/* yyyy-mm-dd로 변환 */
export const formatDate = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
};

/* hh:mm로 변환 */
export const formatTime = (datetime) => {
    const date = new Date(datetime);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    hours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${hours}:${formattedMinutes}`;
};

/* ex 1,000,000로 변환*/
export const formatPrice = (value) => {
    if (value == null) return '0';

    const stringValue = value.toString();

    return stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/* 콤마 제거 */
export const removeCommas = (value) => {
    return value.replace(/,/g, '');
};

/* 글자 수 초과 시 ... 처리 */
export const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
};