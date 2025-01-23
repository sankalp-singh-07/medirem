'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { getMedicinesFromDB, Medicine } from '@/lib/medicineManage';
import AddMedicine from './medAdd';
import MedicineList from './medList';
import { toast } from 'react-toastify';

export default function Dashboard() {
	const [medicines, setMedicines] = useState<Medicine[]>([]);
	const { user } = useUser();

	useEffect(() => {
		const fetchMedicines = async () => {
			if (!user?.id) return;
			try {
				const data = await getMedicinesFromDB(user.id);
				setMedicines(data);
			} catch (error) {
				console.error('Error fetching medicines:', error);
				toast.error('Failed to fetch medicines');
			}
		};

		fetchMedicines();
	}, [user]);

	const handleAddMedicine = () => {
		// Refresh the medicine list when a new medicine is added
		const fetchMedicines = async () => {
			if (!user?.id) return;
			try {
				const data = await getMedicinesFromDB(user.id);
				setMedicines(data);
				toast.success('Medicine list updated!');
			} catch (error) {
				console.error('Error refreshing medicines:', error);
				toast.error('Failed to refresh medicines');
			}
		};
		fetchMedicines();
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
			<div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-6 space-y-6">
				<h1 className="text-2xl font-bold text-center">
					Medicine Management
				</h1>
				<AddMedicine onAdd={handleAddMedicine} />
				<MedicineList
					medicines={medicines}
					setMedicines={setMedicines}
				/>
			</div>
		</div>
	);
}
