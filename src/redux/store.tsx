import { configureStore } from "@reduxjs/toolkit";
import listsReducer from './listsSlice';
import modalReducer from './modalSlice';

const store = configureStore({
    reducer: {
        lists: listsReducer,
        modal: modalReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;