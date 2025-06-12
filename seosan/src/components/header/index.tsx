import {useSelector} from "react-redux";
import type {RootState} from "../../redux/config/configStore.ts";
import {Bars3Icon, ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/outline";

export const Header = () => {
    const selectedDateString = useSelector((state: RootState) => state.calendar.selectedDate);
    const selectedDate = selectedDateString ? new Date(selectedDateString) : undefined;

    return (
        <div className={'flex w-full bg-yellow-200 h-16 p-2 items-center'}>
            <div className={'flex w-[320px] items-center gap-2'}>
                <div className={'w-12 h-12 p-2 items-center justify-center flex mx-1'}>
                    <Bars3Icon className={'w-6 stroke-[1.5]'}/>
                </div>
                <div className={'text-2xl font-normal'}>Calendar</div>
            </div>

            <div className={'w-full flex gap-4'}>
                <div>
                    오늘
                </div>

                <div className={'flex'}>
                    <ChevronLeftIcon className={'w-5 stroke-[2.5]'}/>
                    <ChevronRightIcon className={'w-5 stroke-[2.5]'}/>
                </div>

                <div>
                    {selectedDate?.toLocaleDateString()}
                </div>

            </div>

            <div className={'w-16'}>
                우측
            </div>
        </div>
    );
};