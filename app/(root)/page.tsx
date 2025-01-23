import Header from '@/components/header';
import Dashboard from '@/components/dashboard';

export default function HomePage() {
	return (
		<div className="min-h-screen flex flex-col">
			<Header />

			<Dashboard />
		</div>
	);
}
