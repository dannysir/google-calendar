import {useDispatch} from "react-redux";
import {openModal} from "../../redux/modules/modal.ts";
import {PlusIcon} from "@heroicons/react/16/solid";
import type {ModalType} from "../../redux/modules/modal.ts";

export const Add = () => {
    const dispatch = useDispatch();
    const handleOpenModal = () => {
        const addString : ModalType = 'add'
        const newModalObj = {
            modalType: addString,
        };
        dispatch(openModal(newModalObj));
    };

    return (
        <div className='flex'>
            <div
                className='flex w-32 bg-white h-14 justify-center items-center rounded-2xl shadow-sm shadow-gray-500 gap-2  cursor-pointer hover:bg-gray-100'
                onClick={handleOpenModal}
            >
                <PlusIcon className='w-6 h-6'/>
                <div>만들기</div>
            </div>
        </div>
    );
};