import {useEffect, useState} from "react";
import type {RefObject} from "react";

type Props = {
    calendarRef: RefObject<HTMLDivElement | null>;
    startTimeRef: RefObject<HTMLDivElement | null>;
    endTimeRef: RefObject<HTMLDivElement | null>;
}

export const useModalInput = (props: Props) => {
    const [openCalendar, setOpenCalendar] = useState<boolean>(false);
    const [startTimeToggle, setStartTimeToggle] = useState<boolean>(false);
    const [endTimeToggle, setEndTimeToggle] = useState<boolean>(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (props.calendarRef.current && !props.calendarRef.current.contains(event.target as Node)) {
                setOpenCalendar(false);
            }
        };

        if (openCalendar) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openCalendar, props.calendarRef]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (props.startTimeRef.current && !props.startTimeRef.current.contains(event.target as Node)) {
                setStartTimeToggle(false);
            }
        };

        if (startTimeToggle) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [startTimeToggle, props.startTimeRef]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (props.endTimeRef.current && !props.endTimeRef.current.contains(event.target as Node)) {
                setEndTimeToggle(false);
            }
        };

        if (endTimeToggle) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [endTimeToggle, props.endTimeRef]);

    return {openCalendar,setOpenCalendar, startTimeToggle, setStartTimeToggle, endTimeToggle, setEndTimeToggle}
}