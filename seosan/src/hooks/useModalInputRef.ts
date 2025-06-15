import {useRef} from "react";

export const useModalInputRef = () => {
    const calendarRef = useRef<HTMLDivElement>(null);
    const startTimeRef = useRef<HTMLDivElement>(null);
    const endTimeRef = useRef<HTMLDivElement>(null);

    return {calendarRef, startTimeRef, endTimeRef}
};