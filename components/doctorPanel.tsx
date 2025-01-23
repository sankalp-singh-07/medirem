// 'use client';

// import { useEffect, useState } from 'react';
// import { getPatientsForDoctor } from '@/lib/medicineManage';

// export default function DoctorPanel({ doctorId }: { doctorId: string }) {
// 	const [patients, setPatients] = useState<{ id: string; name: string; email: string }[]>([]);

// 	useEffect(() => {
// 		const fetchPatients = async () => {
// 			const data = await getPatientsForDoctor(doctorId);
// 			setPatients(data);
// 		};

// 		fetchPatients();
// 	}, [doctorId]);

// 	if (patients.length === 0) return <p>No patients found.</p>;

// 	return (
// 		<div className="space-y-4">
// 			<h2 className="text-2xl font-bold">Patients</h2>
// 			{patients.map((patient) => (
// 				<div
// 					key={patient.id}
// 					className="bg-gray-100 p-4 rounded shadow"
// 				>
// 					<h3 className="text-xl font-bold">{patient.name}</h3>
// 					<p>{patient.email}</p>
// 				</div>
// 			))}
// 		</div>
// 	);
// }
