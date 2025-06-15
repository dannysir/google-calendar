import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../redux/config/configStore.ts";
import {formatMonthDateDay, formatTime, hours} from "../../utills.ts";
import {MyDatePicker} from "../MyCalendar.tsx";
import {useState} from "react";
import {deleteEvent, updateEvent} from "../../redux/modules/event.ts";
import type {EventType} from "../../redux/modules/event.ts";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {useSelectTime} from "../../hooks/useSelectTime.ts";
import {useModalInputRef} from "../../hooks/useModalInputRef.ts";
import {useModalInput} from "../../hooks/useModalInput.ts";

type Props = {
    handleClose: () => void
    nowHour: number;
};

export const UpdateModal = (props: Props) => {
    const {selectedEvent} = useSelector((state: RootState) => state.modal);
    const [title, setTitle] = useState<string>(selectedEvent ? selectedEvent.title : '');
    const [isRepeat, setIsRepeat] = useState<string | null>(selectedEvent ? selectedEvent.repeat : null);
    const {calendarRef, startTimeRef, endTimeRef} = useModalInputRef()
    const {openCalendar, setOpenCalendar,startTimeToggle, setStartTimeToggle,endTimeToggle, setEndTimeToggle} = useModalInput({calendarRef, startTimeRef, endTimeRef});
    const {selected} = useSelector((state: RootState) => state.calendar);
    const selectedDate = new Date(selected);
    const {selectedStart, selectedEnd, handleStartTimeSelect, handleEndTimeSelect} = useSelectTime(selectedEvent? selectedEvent.startTime :selectedDate.getHours(), selectedEvent? selectedEvent.endTime : selectedDate.getHours() + 1);
    const dispatch = useDispatch();

    const handleClickStart = (hour: number) => {
        handleStartTimeSelect(hour)
        setStartTimeToggle(false);
    };

    const handleClickEnd = (hour: number) => {
        handleEndTimeSelect(hour);
        setEndTimeToggle(false);
    };

    const handleUpdateEvent = () => {
        const updatedEvent: EventType = {
            id: selectedEvent ? selectedEvent.id : Date.now(),
            title: title,
            eventDate: selected,
            startTime: selectedStart,
            endTime: selectedEnd,
            repeat: isRepeat,
        }
        dispatch(updateEvent(updatedEvent))

        props.handleClose();

        setTitle("");
        handleStartTimeSelect(props.nowHour);
        handleEndTimeSelect(props.nowHour + 1);
    };

    const handleDeleteEvent = () => {
        dispatch(deleteEvent(selectedEvent ? selectedEvent.id : Date.now()));

        props.handleClose();

        setTitle("");
        handleStartTimeSelect(props.nowHour);
        handleStartTimeSelect(props.nowHour + 1);
    };

    return (
        <div
            className="relative flex flex-col bg-gray-100 px-8 py-4 rounded-xl shadow-lg border border-gray-200 min-w-[520px] h-[620px] text-sm font-normal">
            <div className="flex justify-end items-center">
                <button
                    onClick={props.handleClose}
                    className="p-2 cursor-pointer"
                >
                    <XMarkIcon className="stroke-2 stroke-gray-500 w-5 h-5"/>
                </button>
            </div>

            <div className="mb-6 h-8">
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    value={title}
                    className="w-full py-1 border-b-2 border-gray-300 focus:outline-none focus:border-b-[3px] focus:border-blue-500 transition-colors text-2xl"
                />
            </div>

            <div className="mb-4">
                <div className="w-full mb-4 relative flex justify-between items-start gap-4">
                    <div className="relative w-[44%]" ref={calendarRef}>
                        <div
                            className="w-full px-4 py-3 bg-gray-300 rounded-md cursor-pointer flex items-center"
                            onClick={() => setOpenCalendar(!openCalendar)}
                        >
                            {formatMonthDateDay(selectedDate)}
                        </div>

                        {openCalendar && (
                            <div
                                className="absolute z-20 top-full left-0 mt-1 bg-white shadow-lg rounded-lg border border-gray-200">
                                <MyDatePicker/>
                            </div>
                        )}
                    </div>

                    <div className={'flex w-fit items-center justify-end gap-4'}>
                        <div className="relative" ref={startTimeRef}>
                            <div
                                className="relative w-[100px] px-4 py-3 bg-gray-300 rounded-md cursor-pointer"
                                onClick={() => setStartTimeToggle(!startTimeToggle)}
                            >
                                {formatTime(selectedStart)}
                            </div>
                            {startTimeToggle && (
                                <div
                                    className="absolute z-10 top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto"
                                >
                                    {hours
                                        .filter(hour => hour <= 24)
                                        .map((hour) => (
                                            <div
                                                key={hour}
                                                className="px-4 py-2 hover:bg-gray-300 cursor-pointer text-center first:rounded-t-lg last:rounded-b-lg"
                                                onClick={() => handleClickStart(hour)}
                                            >
                                                {String(hour).padStart(2, '0')}:00
                                            </div>
                                        ))
                                    }
                                </div>
                            )}
                        </div>
                        <div>-</div>
                        <div className="relative" ref={endTimeRef}>
                            <div
                                className="relative w-[100px] px-4 py-3 bg-gray-300 rounded-md cursor-pointer"
                                onClick={() => setEndTimeToggle(!endTimeToggle)}
                            >
                                {formatTime(selectedEnd)}
                            </div>
                            {endTimeToggle && (
                                <div
                                    className="absolute z-10 top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto"
                                >
                                    {hours
                                        .filter(hour => hour <= 24)
                                        .map((hour) => (
                                            <div
                                                key={hour}
                                                className="px-4 py-2 hover:bg-gray-300 cursor-pointer text-center first:rounded-t-lg last:rounded-b-lg"
                                                onClick={() => handleClickEnd(hour)}
                                            >
                                                {String(hour).padStart(2, '0')}:00
                                            </div>
                                        ))
                                    }
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-8 flex items-center gap-4">
                <label className="flex w-fit items-center gap-3 cursor-pointer">
                    <input
                        id="repeat-none"
                        name="repeat"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                        checked={isRepeat === null}
                        onChange={() => setIsRepeat(null)}
                    />
                    <span className="text-sm font-medium text-gray-700">반복 없음</span>
                </label>
                <label className="flex w-fit items-center gap-3 cursor-pointer">
                    <input
                        id="repeat-day"
                        name="repeat"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                        checked={isRepeat === 'day'}
                        onChange={() => setIsRepeat('day')}
                    />
                    <span className="text-sm font-medium text-gray-700">요일 반복</span>
                </label>
                <label className="flex w-fit items-center gap-3 cursor-pointer">
                    <input
                        id="repeat-daily"
                        name="repeat"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                        checked={isRepeat === 'daily'}
                        onChange={() => setIsRepeat('daily')}
                    />
                    <span className="text-sm font-medium text-gray-700">매일 반복</span>
                </label>
            </div>

            <div className={'flex w-full h-full justify-end items-end'}>
                <div className="flex gap-3">
                    <button
                        className="flex-1 px-4 py-3 text-gray-700 rounded-3xl hover:bg-gray-200 font-medium transition-colors cursor-pointer"
                        onClick={props.handleClose}
                    >
                        취소
                    </button>

                    <button
                        className="flex-1 px-4 py-3 bg-red-400 text-white rounded-3xl hover:bg-red-600 font-medium transition-colors cursor-pointer"
                        onClick={handleDeleteEvent}
                    >
                        삭제
                    </button>

                    <button
                        className="flex-1 px-4 py-3 bg-blue-700 text-white rounded-3xl hover:bg-blue-600 font-medium transition-colors cursor-pointer"
                        onClick={handleUpdateEvent}
                    >
                        수정
                    </button>
                </div>
            </div>
        </div>
    );
};