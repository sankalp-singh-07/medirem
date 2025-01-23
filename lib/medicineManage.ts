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
	id: string;
	name: string;
	dosage: string;
	time: string; // Add the time property here
	taken: boolean;
	userId: string;
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
