import { useSelector, useDispatch } from "react-redux";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import type { RootState } from '../../redux/config/configStore.ts';
import { setSelectedDate } from "../../redux/modules/selectDate.ts";
import { ko } from "react-day-picker/locale";

type Props = {
    className? : string
}

export function MyDatePicker(props : Props) {
    const {selected} = useSelector((state: RootState) => state.calendar);
    const selectedDate = new Date(selected);
    const dispatch = useDispatch();

    const handleSelect = (date: Date | undefined) => {
        if (date) {
            dispatch(setSelectedDate(date.toISOString()));
        }
    };

    return (
        <DayPicker
            animate
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            locale={ko}
            footer={
                selectedDate ? `Selected: ${selectedDate.toLocaleDateString()}` : "Pick a day."
            }
            formatters={{
                formatCaption: (date) => `${date.getFullYear()}년 ${date.getMonth() + 1}월`
            }}
            className={props.className}
        />
    );
}