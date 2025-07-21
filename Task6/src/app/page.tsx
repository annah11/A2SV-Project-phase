import { JobPosting } from '@/type/type';
import JobList from '@/components/JobList/JobList';

export default async function Page() {
  const { job_postings } = await loader();

  return (
    <>
      <JobList job_postings={job_postings} />
    </>
  );
}

export async function loader(): Promise<{ job_postings: import("@/type/type").JobPost[] }> {
  const response = await fetch('http://localhost:3000/api/posts', { cache: 'no-cache' });
  const posts = await response.json();
  return posts;
}