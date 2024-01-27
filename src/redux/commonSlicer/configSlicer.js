import { createSlice } from '@reduxjs/toolkit';

const name = 'config';
const initialState = {
    max: 0,
    min: 0,
}

const setMax = (state, action) => {
    state.max = action.payload;
}
const setMin = (state, action) => {
    state.min = action.payload;
}

export const configSlicer = createSlice({
    name,
    initialState,
    reducers: {
        setMax,
        setMin,
    }
});