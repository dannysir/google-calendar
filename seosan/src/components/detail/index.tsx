import {useSelector} from "react-redux";
import type {RootState} from "../../redux/config/configStore.ts";
import {weekdays} from "../../utills.ts";

export const Detail = () => {
    const {currentWeek} = useSelector((state: RootState) => state.calendar);
    const currentWeekArr = currentWeek.map(v => new Date(v));

    const {eventArray} = useSelector((state: RootState) => state.event);

    console.log(eventArray);

    const hours = Array.from({length: 23}, (_, i) => i + 1);

    return (
        <div className="h-[90%] w-full bg-white rounded-2xl overflow-hidden">
            <div className="h-full overflow-auto">
                <div className="min-w-[896px]">
                    <div className="flex sticky z-10">
                        <div className="w-28 p-3 text-sm font-medium">
                        </div>

                        {currentWeekArr.map((date, index) => (
                            <div
                                key={date.getDate()}
                                className={`flex-1 min-w-[112px] p-3 border-b-2 border-gray-100 text-center text-sm bg-white`}
                            >
                                <div className="font-medium text-gray-700">{weekdays[index]}</div>
                                <div className="text-2xl font-normal text-black mt-1">
                                    {date.getDate()}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="relative flex">
                        <div className="flex flex-col w-28 text-sm font-medium">
                            {hours.map(hour => (
                                <div key={hour} className="flex h-16 relative">
                                    <div
                                        className="w-28 text-sm text-gray-500 font-medium flex items-center justify-end p-3">
                                        <div className="relative">
                                            {hour.toString().padStart(2, '0')}:00
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {currentWeek.map((_, dayIndex) => (
                            <div key={dayIndex} className="flex flex-col flex-1 min-w-[112px] flex-shrink-0 relative">
                                {hours.map(hour => {
                                    return (
                                        <div
                                            key={`${dayIndex}-${hour}`}
                                            className="h-16 border-b border-r border-gray-200 hover:bg-gray-50 relative"
                                        >
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}