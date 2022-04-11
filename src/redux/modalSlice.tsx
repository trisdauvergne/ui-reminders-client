import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { IList } from "../interfaces/List";

interface IModalVisible {
    modalVisible: boolean
}

const reminderModalVisible: IModalVisible = {
    modalVisible: false
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

export const ModalSlice = createSlice({
    name: 'modal',
    initialState: {
        reminderModalVisible,
        initialList
    },
    reducers: {
        changeReminderModalVisibility: (state, action: PayloadAction<boolean>) => {
            state.reminderModalVisible.modalVisible = action.payload
        },
        storeListToShare: (state, action: PayloadAction<any>) => {
            state.initialList.list = action.payload
        },
    }
});

export const {
    changeReminderModalVisibility,
    storeListToShare
} = ModalSlice.actions;

export const selectReminderModal = (state: RootState) => state.modal.reminderModalVisible.modalVisible;

export const selectList = (state: RootState) => state.modal.initialList.list;

export default ModalSlice.reducer;