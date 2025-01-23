'use client';

import { useUser } from '@clerk/nextjs';
import Header from '@/components/header';
import Dashboard from '@/components/dashboard';

export default function HomePage() {
	const { isSignedIn } = useUser(); // Check if the user is signed in

	return (
		<div className="min-h-screen flex flex-col">
			<Header />

			{isSignedIn ? (
				<Dashboard /> // Show Dashboard if signed in
			) : (
				<div className="flex flex-col items-center justify-center flex-grow bg-gray-100 p-6">
					<h1 className="text-3xl font-bold mb-4">
						Welcome to Our App
					</h1>
					<p className="text-lg text-gray-600 mb-6">
						Please log in to access your dashboard.
					</p>
				</div>
			)}
		</div>
	);
}
