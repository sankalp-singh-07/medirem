import { RootState } from '../store';

export const selectAllMedicines = (state: RootState) => state.medicines.list;

export const selectMedicineById = (state: RootState, id: string) =>
	state.medicines.list.find((medicine) => medicine.id === id);
