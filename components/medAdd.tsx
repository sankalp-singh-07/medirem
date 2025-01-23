'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { addMedicineToDB } from '@/lib/medicineManage';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';

interface AddMedicineProps {
	onAdd: () => void;
}

export default function AddMedicine({ onAdd }: AddMedicineProps) {
	const [name, setName] = useState('');
	const [dosage, setDosage] = useState('');
	const [time, setTime] = useState(''); // Add timing for the medicine
	const { user } = useUser();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!user?.id) {
			toast.error('User not authenticated');
			return;
		}

		if (!name || !dosage || !time) {
			toast.error('Please fill in all fields');
			return;
		}

		const newMedicine = {
			id: crypto.randomUUID(),
			name,
			dosage,
			time,
			taken: false,
			userId: user.id,
			notificationSent: false, // Add the notificationSent property
		};

		try {
			await addMedicineToDB(user.id, newMedicine); // Add to Firebase
			onAdd(); // Refresh the medicine list
			setName('');
			setDosage('');
			setTime('');
			toast.success('Medicine added successfully!');
		} catch (error) {
			console.error('Error adding medicine:', error);
			toast.error('Failed to add medicine');
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<h2 className="text-xl font-bold">Add Medicine</h2>
			<Input
				placeholder="Medicine Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<Input
				placeholder="Dosage"
				value={dosage}
				onChange={(e) => setDosage(e.target.value)}
			/>
			<Input
				type="time"
				placeholder="Time"
				value={time}
				onChange={(e) => setTime(e.target.value)}
			/>
			<Button type="submit">Add Medicine</Button>
		</form>
	);
}
