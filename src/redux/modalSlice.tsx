import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface IModalVisible {
    modalVisible: boolean
}

const initialModalVisible: IModalVisible = {
    modalVisible: false
}

export const ModalSlice = createSlice({
    name: 'modal',
    initialState: {
        initialModalVisible
    },
    reducers: {
        changeModalVisibility: (state, action: PayloadAction<boolean>) => {
            state.initialModalVisible.modalVisible = action.payload
        }
    }
});

export const {
    changeModalVisibility
} = ModalSlice.actions;

export const selectModal = (state: RootState) => state.modal.initialModalVisible.modalVisible;

export default ModalSlice.reducer;