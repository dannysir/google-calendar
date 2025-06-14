import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../redux/config/configStore.ts";
import {weekdays} from "../../utills.ts";
import type {EventType} from "../../redux/modules/event.ts";
import {openModal} from "../../redux/modules/modal.ts";
import type {ModalType} from "../../redux/modules/modal.ts";
import {setSelectedDate} from "../../redux/modules/selectDate.ts";

export const Detail = () => {
    const {currentWeek} = useSelector((state: RootState) => state.calendar);
    const currentWeekArr = currentWeek.map(v => new Date(v));

    const {eventArray} = useSelector((state: RootState) => state.event);
    const dispatch = useDispatch();

    const handleOpenEvent = (event: EventType) => {
        const updateString : ModalType = 'update'
        const newModalObj = {
            modalType: updateString,
            selectedEvent: event
        };
        dispatch(openModal(newModalObj));
        dispatch(setSelectedDate(event.eventDate))
    };

    const hours = Array.from({length: 24}, (_, i) => i);

    const isSameDay = (dateA: Date, dateB: Date): boolean => {
        return dateA.getFullYear() === dateB.getFullYear() && dateA.getMonth() === dateB.getMonth() && dateA.getDate() === dateB.getDate();
    };

    const renderEvent = (eventArray: EventType[], hour: number) => {
        const eventsAtHour = eventArray.filter(event => {
            return event.startTime === hour;
        });

        return eventsAtHour.map((event) => {
            const duration = event.endTime - event.startTime;
            const height = duration * 64;

            return (
                <div
                    key={`${event.id}`}
                    className="absolute left-1 right-1 bg-blue-500 text-white text-xs rounded px-2 py-1 z-10 cursor-pointer hover:bg-blue-400 transition-colors"
                    style={{ height: `${height}px` }}
                    onClick={() => handleOpenEvent(event)}
                >
                    <div className="font-medium truncate">{event.title}</div>
                    <div className="text-xs opacity-80">
                        {event.startTime}:00 - {event.endTime}:00
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="h-[90%] w-full bg-white rounded-2xl">
            <div className="h-full overflow-auto">
                <div className="min-w-[896px]">
                    <div className="flex sticky top-0 z-10 bg-white text-sm rounded-2xl">
                        <div className="w-28 p-3 font-medium">
                        </div>

                        {currentWeekArr.map((date, index) => (
                            <div
                                key={date.getDate()}
                                className="flex-1 min-w-[112px] p-3 border-b-2 border-gray-100 text-center"
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
                                        <div className="relative -top-8">
                                            {hour === 0 ? '' : `${hour.toString().padStart(2, '0')}:00`}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {currentWeekArr.map((date, dayIndex) => {
                            const thisWeekEvent = eventArray.filter((e) => {
                                const eventDate = new Date(e.eventDate);
                                return isSameDay(eventDate, date);
                            })
                            return (
                                <div key={date.toISOString()}
                                     className="flex flex-col flex-1 min-w-[112px] flex-shrink-0 relative">
                                    {hours.map(hour => {
                                        return (
                                            <div
                                                key={`${dayIndex}-${hour}`}
                                                className="h-16 border-t border-l border-gray-200 hover:bg-gray-50 relative"
                                            >
                                                {renderEvent(thisWeekEvent, hour)}
                                            </div>
                                        );

                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}