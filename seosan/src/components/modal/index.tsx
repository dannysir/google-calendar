// index.tsx - 더 간단한 버전
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {closeModal} from "../../redux/modules/modal.ts";
import type {RootState} from "../../redux/config/configStore.ts";
import {AddModal} from "./AddModal.tsx";
import {UpdateModal} from "./UpdateModal.tsx";

export const Modal = () => {
    const {modalType} = useSelector((state: RootState) => state.modal);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(closeModal());
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    const chooseModal = () => {
        if (modalType === 'add') {
            return <AddModal handleClose={handleClose} />
        }
        if (modalType === 'update') {
            return <UpdateModal handleClose={handleClose} />
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