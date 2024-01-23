/* 콤마 추가 */
export const formatPrice = (value) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/* 콤마 제거 */
export const removeCommas = (value) => {
    return value.replace(/,/g, '');
};