import { configureStore } from '@reduxjs/toolkit';
import medicineReducer from './slices/medicineSlice';

export const store = configureStore({
	reducer: {
		medicines: medicineReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
