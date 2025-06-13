import {MyDatePicker} from "./MyCalendar.tsx";
import {Add} from "./Add.tsx";

export const Left = () => {
    return (
        <div className='flex flex-col min-w-[320px] gap-4'>
            <Add/>
            <MyDatePicker />
        </div>
    );
};