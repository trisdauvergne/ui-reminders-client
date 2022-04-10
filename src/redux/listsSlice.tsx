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

interface IListContent {
    list: IList
};

const initialListState: IListContent = {
    list: {
        name: '',
        description: '',
        id: '',
    }
};

export const ListsSlice = createSlice({
    name: 'lists',
    initialState: {
        initialListsState,
        initialListState
    },
    reducers: {
        addListsToState: (state, action: PayloadAction<any>) => {
            state.initialListsState.lists = action.payload
        },
        clearListsState: (state) => {
            state.initialListsState.lists = [];
        },
        saveListToState: (state, action: PayloadAction<IList>) => {
            state.initialListState.list = action.payload
        },
    }
});

export const {
    addListsToState,
    clearListsState,
    saveListToState
} = ListsSlice.actions;

export const selectLists = (state: RootState) => state.lists.initialListsState.lists;

export const selectSavedList = (state: RootState) => state.lists.initialListState.list;

export default ListsSlice.reducer;