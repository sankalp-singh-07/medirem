import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

const Header = () => {
	return (
		<header className="flex justify-between items-center bg-primary text-background px-6 py-4 shadow">
			<h1 className="text-xl font-bold">MediRem</h1>

			<div>
				<SignedIn>
					<UserButton />
				</SignedIn>
				<SignedOut>
					<SignInButton>
						<button className="bg-background text-primary px-4 py-2 rounded hover:bg-gray-100 font-semibold text-sm">
							Sign In
						</button>
					</SignInButton>
				</SignedOut>
			</div>
		</header>
	);
};

export default Header;
