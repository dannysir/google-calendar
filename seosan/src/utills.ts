export const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

export const hours = Array.from({length: 24}, (_, index) => index);

export const formatMonthDateDay = (date : Date): string => {
    return `${date.getMonth() + 1}월 ${date.getDate()}일 (${weekdays[date.getDay()]}요일)`;
}

export const formatTime = (hour : number): string => {
    const ampm = hour >= 12 ? '오후' : '오전';
    const hours = String(hour % 12).padStart(2, '0');
    return `${ampm} ${hours}:00`
};