import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const response = await axios.get('https://akil-backend.onrender.com/bookmarks', {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    });
    return NextResponse.json(response.data);
  } catch (err) {
    console.error('Error fetching bookmarks from backend:', err);
    return NextResponse.json({ message: 'Failed to fetch bookmarks' }, { status: 500 });
  }
} 