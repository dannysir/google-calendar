// index.tsx - 더 간단한 버전
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {closeModal} from "../../redux/modules/modal.ts";
import type {RootState} from "../../redux/config/configStore.ts";
import {AddModal} from "./AddModal.tsx";
import {UpdateModal} from "./UpdateModal.tsx";
import {ADD_STRING, UPDATE_STRING} from "../../utills.ts";

export const Modal = () => {
    const {modalType} = useSelector((state: RootState) => state.modal);
    const {now} = useSelector((state: RootState) => state.calendar);
    const dispatch = useDispatch();
    const nowDate = new Date(now);
    const nowHour = nowDate.getHours();
    const handleClose = () => {
        dispatch(closeModal());
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    const chooseModal = () => {
        if (modalType === ADD_STRING) {
            return <AddModal handleClose={handleClose} nowHour={nowHour}/>
        }
        if (modalType === UPDATE_STRING) {
            return <UpdateModal handleClose={handleClose} nowHour={nowHour}/>
        }
        return null;
    };

    return (
        <div
            className="fixed inset-0 flex justify-center items-center z-50"
            onClick={handleBackdropClick}
        >
            {chooseModal()}
        </div>
    );
};