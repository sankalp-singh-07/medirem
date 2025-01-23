import { getAuth } from '@clerk/nextjs/server';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
	const { userId } = getAuth(req);

	if (!userId) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	return NextResponse.json({ message: 'Authenticated!' });
}
