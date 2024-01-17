import {configureStore} from '@reduxjs/toolkit';
import { wheelSlice } from './commonSlicer/wheelSlicer';
const store = configureStore({
    reducer: {
        wheelSlicer: wheelSlice.reducer,
    }
    ,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
export default store;