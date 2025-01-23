import { db } from '@/lib/firebase';
import {
	collection,
	addDoc,
	getDocs,
	deleteDoc,
	doc,
	updateDoc,
	query,
	where,
	setDoc,
} from 'firebase/firestore';

export interface Medicine {
	notificationSent: boolean; // Explicitly define as boolean
	id: string;
	name: string;
	dosage: string;
	time: string;
	taken: boolean;
	userId: string;
}

export interface Patient {
	id: string;
	name: string;
	email: string;
	authId: string;
	doctorId: string;
}

export const getMedicinesFromDB = async (
	userId: string
): Promise<Medicine[]> => {
	const medicineCollection = collection(db, 'medicines');
	const q = query(medicineCollection, where('userId', '==', userId));
	const snapshot = await getDocs(q);

	return snapshot.docs.map((doc) => ({
		id: doc.id, // Use Firestore document ID
		...doc.data(),
	})) as Medicine[];
};

export const addMedicineToDB = async (userId: string, medicine: Medicine) => {
	const medicineDoc = doc(db, 'medicines', medicine.id); // Use medicine.id as the Firestore document ID
	await setDoc(medicineDoc, { ...medicine, userId });
};
export const deleteMedicineFromDB = async (id: string) => {
	const medicineDoc = doc(db, 'medicines', id);
	await deleteDoc(medicineDoc);
};

export const updateMedicineInDB = async (
	id: string,
	updatedFields: Partial<Medicine>
) => {
	const medicineDoc = doc(db, 'medicines', id);

	console.log('Updating Firestore document:', id, updatedFields); // Debug log
	await updateDoc(medicineDoc, updatedFields);
	console.log('Firestore update completed.'); // Debug log
};

export const getMedicinesCloseToTime = async (
	userId: string
): Promise<Medicine[]> => {
	const medicineCollection = collection(db, 'medicines');
	const q = query(medicineCollection, where('userId', '==', userId));

	const snapshot = await getDocs(q);
	const currentTime = new Date();

	const medicines = snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	})) as Medicine[];

	// Filter medicines that are within 10 minutes of the current time
	const TEN_MINUTES_IN_MS = 10 * 60 * 1000;

	return medicines.filter((medicine) => {
		const [hours, minutes] = medicine.time.split(':').map(Number);
		const medicineTime = new Date();
		medicineTime.setHours(hours, minutes, 0, 0);

		const timeDifference = Math.abs(
			medicineTime.getTime() - currentTime.getTime()
		);

		return (
			timeDifference <= TEN_MINUTES_IN_MS && !medicine.notificationSent
		);
	});
};

export const markNotificationSent = async (medicineId: string) => {
	const medicineDoc = doc(db, 'medicines', medicineId);
	await updateDoc(medicineDoc, { notificationSent: true });
};

export const addPatientToDB = async (doctorId: string, patient: any) => {
	const patientCollection = collection(db, 'patients');
	await addDoc(patientCollection, { ...patient, doctorId });
};

// Get all patients for a specific doctor
export const getPatientsForDoctor = async (doctorId: string) => {
	const q = query(
		collection(db, 'patients'),
		where('doctorId', '==', doctorId)
	);
	const snapshot = await getDocs(q);
	return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
