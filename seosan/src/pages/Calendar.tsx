import {Header} from "../components/header";
import {Left} from "../components/left";
import {Detail} from "../components/detail";

export const Calendar = () => {
    return (
        <div className={'h-full bg-gray-300 flex flex-col gap-4'}>
            <Header/>
            <div className={'w-full h-full flex gap-4 px-4 min-h-0'}>
                <div className="w-[320px]">
                    <Left/> {/* 25% */}
                </div>
                <div  className="w-full overflow-hidden">
                    <Detail/>
                </div>
            </div>
        </div>
    );
};