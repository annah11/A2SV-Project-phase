import JobList from '@/components/JobList/JobList';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/option';
import { JobPosting } from '@/type/type';

export default async function Page() {
  const data = await loader();
  return <JobList data={data} />;
}

async function loader(): Promise<JobPosting[]> {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    throw new Error('Unauthorized: No access token found.');
  }

  const response = await fetch(`${process.env.BACKEND_URL}/opportunities/search`, {
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const posts: JobPosting[] = await response.json();
  return posts;
}
