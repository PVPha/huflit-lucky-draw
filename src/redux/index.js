import {configureStore} from '@reduxjs/toolkit';
import { wheelSlice } from './commonSlicer/wheelSlicer';
import { configSlicer } from './commonSlicer/configSlicer';
const store = configureStore({
    reducer: {
        wheelSlicer: wheelSlice.reducer,
        configSlicer: configSlicer.reducer
    }
    ,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
export default store;