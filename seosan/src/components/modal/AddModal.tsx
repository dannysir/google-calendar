import {useState, useEffect, useRef} from "react";
import {MyDatePicker} from "../MyCalendar.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../redux/config/configStore.ts";
import {ALERT_NO_TITLE, formatMonthDateDay, formatTime, hours} from "../../utills.ts";
import {addEvent} from "../../redux/modules/event.ts";
import {XMarkIcon} from "@heroicons/react/24/outline";

type Props = {
    handleClose: () => void
    nowHour: number;
};

export const AddModal = (props: Props) => {
    const [openCalendar, setOpenCalendar] = useState<boolean>(false);
    const [startTimeToggle, setStartTimeToggle] = useState<boolean>(false);
    const [endTimeToggle, setEndTimeToggle] = useState<boolean>(false);
    const [isRepeat, setIsRepeat] = useState<string | null>(null);
    const [title, setTitle] = useState<string>("");
    const calendarRef = useRef<HTMLDivElement>(null);
    const startTimeRef = useRef<HTMLDivElement>(null);
    const endTimeRef = useRef<HTMLDivElement>(null);
    const {selected} = useSelector((state: RootState) => state.calendar);
    const selectedDate = new Date(selected);
    const [selectedStart, setSelectedStart] = useState<number>(selectedDate.getHours());
    const [selectedEnd, setSelectedEnd] = useState<number>(selectedDate.getHours() + 1);
    const dispatch = useDispatch();

    const handleStartTimeSelect = (hour: number) => {
        setSelectedStart(hour);
        setStartTimeToggle(false);
    };

    const handleEndTimeSelect = (hour: number) => {
        setSelectedEnd(hour);
        setEndTimeToggle(false);
    };
    const handleAddEvent = () => {
        if (!title.trim()) {
            alert(ALERT_NO_TITLE);
            return;
        }

        const newEvent = {
            id: Date.now(),
            title: title,
            eventDate: selected,
            startTime: selectedStart,
            endTime: selectedEnd,
            repeat: isRepeat,
        }
        dispatch(addEvent(newEvent));

        props.handleClose();

        setTitle("");
        setSelectedStart(props.nowHour);
        setSelectedEnd(props.nowHour + 1);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setOpenCalendar(false);
            }
        };

        if (openCalendar) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openCalendar]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (startTimeRef.current && !startTimeRef.current.contains(event.target as Node)) {
                setStartTimeToggle(false);
            }
        };

        if (startTimeToggle) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [startTimeToggle]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (endTimeRef.current && !endTimeRef.current.contains(event.target as Node)) {
                setEndTimeToggle(false);
            }
        };

        if (endTimeToggle) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [endTimeToggle]);

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
                    placeholder="제목 추가"
                    className="w-full py-1 border-b-2 border-gray-300 focus:outline-none focus:border-b-[3px] focus:border-blue-500 transition-colors text-2xl"
                />
            </div>

            <div className="mb-6">
                <div className="w-full h-10 mb-4 relative flex justify-between items-center">
                    <div className="relative w-[44%]" ref={calendarRef}>
                        <div
                            className="w-full px-4 py-3 bg-gray-300 rounded-md cursor-pointer flex items-center"
                            onClick={() => setOpenCalendar(!openCalendar)}
                        >
                            {formatMonthDateDay(selectedDate)}
                        </div>

                        {openCalendar && (
                            <div className="absolute z-20 top-full left-0 mt-1 bg-white shadow-lg rounded-lg border border-gray-200">
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
                                                onClick={() => handleStartTimeSelect(hour)}
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
                                                onClick={() => handleEndTimeSelect(hour)}
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
                        onClick={props.handleClose}
                        className="flex-1 px-4 py-3 text-gray-700 rounded-3xl hover:bg-gray-200 font-medium transition-colors cursor-pointer"
                    >
                        취소
                    </button>
                    <button
                        className="flex-1 px-4 py-3 bg-blue-700 text-white rounded-3xl hover:bg-blue-600 font-medium transition-colors cursor-pointer"
                        onClick={handleAddEvent}
                    >
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
};