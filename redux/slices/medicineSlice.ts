import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Medicine {
	id: string;
	name: string;
	dosage: string;
	schedule: string;
}

interface MedicineState {
	list: Medicine[];
}

const initialState: MedicineState = {
	list: [],
};

const medicineSlice = createSlice({
	name: 'medicines',
	initialState,
	reducers: {
		addMedicine: (state, action: PayloadAction<Medicine>) => {
			state.list.push(action.payload);
		},
		removeMedicine: (state, action: PayloadAction<string>) => {
			state.list = state.list.filter(
				(medicine) => medicine.id !== action.payload
			);
		},
		updateMedicine: (state, action: PayloadAction<Medicine>) => {
			const index = state.list.findIndex(
				(m) => m.id === action.payload.id
			);
			if (index !== -1) {
				state.list[index] = action.payload;
			}
		},
	},
});

export const { addMedicine, removeMedicine, updateMedicine } =
	medicineSlice.actions;
export default medicineSlice.reducer;
