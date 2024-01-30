import { createSlice } from '@reduxjs/toolkit';

const name = 'config';
const initialState = {
    max: 0,
    min: 0,
    listWinnerNum: []
}

const setMax = (state, action) => {
    state.max = action.payload;
}
const setMin = (state, action) => {
    state.min = action.payload;
}
const setListWinnerNum = (state, action) => {
    state.listWinnerNum = action.payload;
}

export const configSlicer = createSlice({
    name,
    initialState,
    reducers: {
        setMax,
        setMin,
        setListWinnerNum
    }
});