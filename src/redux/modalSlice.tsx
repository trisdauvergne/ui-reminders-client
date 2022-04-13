import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { IList } from "../interfaces/List";
import { IReminder } from '../interfaces/Reminder';

interface IModalVisible {
    modalVisible: boolean
}

const reminderModalVisible: IModalVisible = {
    modalVisible: false
}

const alertModalVisible: IModalVisible = {
    modalVisible: false
}

interface IAlertMessage {
    message: string
}

const alertMessage: IAlertMessage = {
    message: ''
}

interface IListContent {
    list: IList
}

const initialList: IListContent = {
    list: {
        name: '',
        description: '',
        id: '',
    }
}

interface IReminderToSave {
    description: string,
    list: string
}

const reminderToSave: IReminderToSave = {
    description: '',
    list: '',
}

export const ModalSlice = createSlice({
    name: 'modal',
    initialState: {
        reminderModalVisible,
        initialList,
        alertModalVisible,
        alertMessage,
        reminderToSave
    },
    reducers: {
        changeReminderModalVisibility: (state, action: PayloadAction<boolean>) => {
            state.reminderModalVisible.modalVisible = action.payload
        },
        changeAlertModalVisibility: (state, action: PayloadAction<boolean>) => {
            state.alertModalVisible.modalVisible = action.payload
        },
        storeListToShare: (state, action: PayloadAction<any>) => {
            state.initialList.list = action.payload
        },
        saveAlertMessage: (state, action: PayloadAction<string>) => {
            state.alertMessage.message = action.payload
        },
        storeReminderForModal: (state, action: PayloadAction<IReminderToSave>) => {
            let reminder = {
                description: action.payload.description,
                list: action.payload.list
            };
            state.reminderToSave = reminder;
        }
    }
});

export const {
    changeReminderModalVisibility,
    storeListToShare,
    changeAlertModalVisibility,
    saveAlertMessage
} = ModalSlice.actions;

export const selectReminderModal = (state: RootState) => state.modal.reminderModalVisible.modalVisible;

export const selectAlertModal = (state: RootState) => state.modal.alertModalVisible.modalVisible;

export const selectList = (state: RootState) => state.modal.initialList.list;

export const selectAlertMessage = (state: RootState) => state.modal.alertMessage.message;

export default ModalSlice.reducer;