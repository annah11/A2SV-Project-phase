import { getSession } from 'next-auth/react';
import axios from 'axios';

async function bookmark(id: string) {
  const session = await getSession();

  if (!session?.accessToken) {
    throw new Error('No access token available');
  }

  try {
    const response = await axios.post(
      `https://akil-backend.onrender.com/bookmarks/${id}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error bookmarking:', error);
    throw error;
  }
}

async function unBookmark(id: string) {
  const session = await getSession();

  if (!session?.accessToken) {
    throw new Error('No access token available');
  }

  try {
    const response = await axios.delete(`https://akil-backend.onrender.com/bookmarks/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error unbookmarking:', error);
    throw error;
  }
}

export default async function toggleBookmark(id: string, bookmarked: boolean) {
  try {
    if (!bookmarked) {
      return await bookmark(id);
    } else {
      return await unBookmark(id);
    }
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    return null;
  }
}