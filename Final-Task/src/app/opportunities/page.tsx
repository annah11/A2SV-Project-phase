import { JobPosting } from "@/type/type";
import JobList from "@/components/JobList/JobList";
import { getAllPosts } from "../api/actions/getAllPosts";

export default async function Page() {
  const posts: Promise<JobPosting> = await getAllPosts();
  const data = await posts;

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-6 md:px-8">
      <JobList data={data} />
    </div>
  );
}
