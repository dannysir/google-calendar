import {Header} from "../components/header";
import {Left} from "../components/left";
import {Detail} from "../components/detail";
import {Modal} from "../components/modal";
import {useSelector} from "react-redux";
import type {RootState} from "../redux/config/configStore.ts";

export const Calendar = () => {
    const {isOpen} = useSelector((state: RootState) => state.modal);
    return (
        <div className={'h-full bg-gray-50 flex flex-col gap-4'}>
            {isOpen ? <Modal/> : <></>}
            <Header/>
            <div className={'w-full h-full flex gap-4 px-4 min-h-0'}>
                <div className="w-[320px]">
                    <Left/>
                </div>
                <div  className="w-full overflow-hidden">
                    <Detail/>
                </div>
            </div>
        </div>
    );
};