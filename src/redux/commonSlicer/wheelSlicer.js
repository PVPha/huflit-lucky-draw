import {createSlice} from '@reduxjs/toolkit';

const name = 'Wheel';
const initialState = {
    segments: [],
    segColors: [],
    segmentsBK: [],
    segColorsBK: [],
}

const setSegments = (state, action) => {
    state.segments = action.payload;
}
const setSegmentsBK = (state, action) => {
    state.segmentsBK = action.payload;
}
const setSegColors = (state, action) => {
    state.segColors = action.payload;
}
const setSegColorsBK = (state, action) => {
    state.segColorsBK = action.payload;
}

export const wheelSlice = createSlice({
    name,
    initialState,
    reducers: {
        setSegments,
        setSegColors,
        setSegmentsBK,
        setSegColorsBK
    }
});