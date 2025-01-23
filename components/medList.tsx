'use client';

import {
	updateMedicineInDB,
	deleteMedicineFromDB,
	Medicine,
} from '@/lib/medicineManage';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';

interface MedicineListProps {
	medicines: Medicine[];
	setMedicines: React.Dispatch<React.SetStateAction<Medicine[]>>;
}

export default function MedicineList({
	medicines,
	setMedicines,
}: MedicineListProps) {
	const handleDelete = async (id: string) => {
		try {
			await deleteMedicineFromDB(id);
			setMedicines((prev) =>
				prev.filter((medicine) => medicine.id !== id)
			);
			toast.success('Medicine removed successfully!');
		} catch (error) {
			console.error('Error deleting medicine:', error);
			toast.error('Failed to delete medicine');
		}
	};

	const handleMarkAsTaken = async (id: string) => {
		try {
			await updateMedicineInDB(id, { taken: true });
			setMedicines((prev) =>
				prev.map((medicine) =>
					medicine.id === id ? { ...medicine, taken: true } : medicine
				)
			);
			toast.success('Marked as taken!');
		} catch (error) {
			console.error('Error updating medicine:', error);
			toast.error('Failed to update medicine');
		}
	};

	if (medicines.length === 0) {
		return <p>No medicines available. Add some!</p>;
	}

	return (
		<div className="space-y-4">
			<h2 className="text-xl font-bold">Your Medicines</h2>
			{medicines.map((medicine) => (
				<div
					key={medicine.id}
					className="bg-gray-50 shadow rounded p-4"
				>
					<p>
						<strong>Name:</strong> {medicine.name}
					</p>
					<p>
						<strong>Dosage:</strong> {medicine.dosage}
					</p>
					<p>
						<strong>Time:</strong> {medicine.time}
					</p>
					<p>
						<strong>Status:</strong>{' '}
						{medicine.taken ? 'Taken' : 'Pending'}
					</p>
					{!medicine.taken && (
						<Button
							onClick={() => handleMarkAsTaken(medicine.id)}
							className="mr-3"
						>
							Mark as Taken
						</Button>
					)}
					<Button
						variant="destructive"
						onClick={() => handleDelete(medicine.id)}
					>
						Delete
					</Button>
				</div>
			))}
		</div>
	);
}
