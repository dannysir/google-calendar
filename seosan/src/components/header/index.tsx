import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../redux/config/configStore.ts";
import {Bars3Icon, ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/outline";
import {formatTitleMonth} from "../../utills.ts";
import {setDateNextWeek, setDateNow, setDatePrevWeek} from "../../redux/modules/selectDate.ts";

export const Header = () => {
    const {currentWeek} = useSelector((state: RootState) => state.calendar);
    const currentWeekDate = currentWeek.map(v => new Date(v));
    const dispatch = useDispatch();

    const handleClickPrevWeek = () => {
        dispatch(setDatePrevWeek());
    };

    const handleClickNextWeek = () => {
        dispatch(setDateNextWeek());
    };

    const handleClickToday = () => {
        dispatch(setDateNow());
    };

    return (
        <div className='flex w-full min-w-[896px] h-16 px-4 py-2 items-center'>
            <div className='flex min-w-[320px] items-center gap-4'>
                <div className='w-12 h-12 p-2 items-center justify-center flex mx-1'>
                    <Bars3Icon className={'w-6 stroke-[1.5]'}/>
                </div>
                <div className='text-2xl font-normal cursor-default'>Calendar</div>
            </div>

            <div className="flex w-full items-center justify-between p-2">
                <div className='flex gap-4 items-center'>
                    <div
                        className="flex items-center justify-center rounded-3xl border border-black w-[76px] h-12 mx-2 cursor-pointer hover:bg-gray-200 transition-colors"
                        onClick={handleClickToday}
                    >
                        <div>
                            오늘
                        </div>
                    </div>

                    <div className='flex items-center'>
                        <div
                            className="flex items-center justify-center w-9 h-9 cursor-pointer rounded-2xl hover:bg-gray-200 transition-colors"
                            onClick={handleClickPrevWeek}
                        >
                            <ChevronLeftIcon className='w-5 stroke-[2.5]'/>
                        </div>
                        <div
                            className="flex items-center justify-center w-9 h-9 cursor-pointer rounded-2xl hover:bg-gray-200 transition-colors"
                            onClick={handleClickNextWeek}
                        >
                            <ChevronRightIcon className='w-5 stroke-[2.5]'/>
                        </div>
                    </div>

                    <div className='text-2xl'>
                        {formatTitleMonth(currentWeekDate[0], currentWeekDate[currentWeekDate.length - 1])}
                    </div>

                </div>

                <div className='w-fit text-lg text-gray-500'>
                    서산 | dannysir@naver.com
                </div>
            </div>

        </div>
    );
};