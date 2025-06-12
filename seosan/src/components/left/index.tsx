import {MyDatePicker} from "./MyCalendar.tsx";
import {Add} from "./Add.tsx";

export const Left = () => {
    return (
        <div className={'flex flex-col min-w-[320px] bg-gray-100 py-4 px-2 gap-4'}>
            <Add/>
            <MyDatePicker/>
        </div>
    );
};