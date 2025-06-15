import { useSelector, useDispatch } from "react-redux";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import type { RootState } from '../redux/config/configStore.ts';
import { setSelectedDate } from "../redux/modules/selectDate.ts";
import { ko } from "react-day-picker/locale";
import {useEffect, useState} from "react";

type Props = {
    className? : string
}

export function MyDatePicker(props : Props) {
    const {selected} = useSelector((state: RootState) => state.calendar);
    const selectedDate = new Date(selected);
    const [currentMonth, setCurrentMonth] = useState(selectedDate);
    const dispatch = useDispatch();

    const handleSelect = (date: Date | undefined) => {
        if (date) {
            dispatch(setSelectedDate(date.toISOString()));
        }

    };
    const handleMonthChange = (month: Date) => {
        setCurrentMonth(month);
    };

    useEffect(() => {
        setCurrentMonth(selectedDate);
    }, [selected]);

    return (
        <DayPicker
            animate
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            month={currentMonth}
            onMonthChange={handleMonthChange}
            locale={ko}
            footer={
                selectedDate ? `선택한 날짜: ${selectedDate.toLocaleDateString()}` : "날짜를 골라주세요"
            }
            formatters={{
                formatCaption: (date) => `${date.getFullYear()}년 ${date.getMonth() + 1}월`
            }}
            className={props.className}
        />
    );
}