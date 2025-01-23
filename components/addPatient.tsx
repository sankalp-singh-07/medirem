'use client';

import { useState } from 'react';
import { addPatientToDB } from '@/lib/medicineManage';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';

export default function AddPatient({ doctorId }: { doctorId: string }) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [authId, setAuthId] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!name || !email || !authId) {
			toast.error('Please fill in all fields');
			return;
		}

		try {
			await addPatientToDB(doctorId, { name, email, authId });
			toast.success('Patient added successfully!');
			setName('');
			setEmail('');
			setAuthId('');
		} catch (error) {
			console.error('Error adding patient:', error);
			toast.error('Failed to add patient.');
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<h2 className="text-xl font-bold">Add Patient</h2>
			<Input
				placeholder="Patient Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<Input
				placeholder="Patient Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<Input
				placeholder="Patient Auth ID"
				value={authId}
				onChange={(e) => setAuthId(e.target.value)}
			/>
			<Button type="submit">Add Patient</Button>
		</form>
	);
}
