import {
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";
import { IList } from "../interfaces/List";
import type { RootState } from "./store";

interface IListsState {
    lists: IList[]
};

const initialListsState: IListsState = {
    lists: []
};

export const ListsSlice = createSlice({
    name: 'lists',
    initialState: {
        initialListsState
    },
    reducers: {
        addListsToState: (state, action: PayloadAction<any>) => {
            state.initialListsState.lists = action.payload
        },
        clearListState: (state) => {
            state.initialListsState.lists = [];
        },
    }
});

export const {
    addListsToState,
    clearListState
} = ListsSlice.actions;

export const selectLists = (state: RootState) => state.lists.initialListsState.lists;

export default ListsSlice.reducer;