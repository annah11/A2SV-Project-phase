import JobListings from "./components/JobListings"
import jobsData from "./data/jobs.json"

interface Job {
  id: number
  title: string
  company: string
  location: string
  description: string
  tags?: string[]
  avatar: string
}

export default function HomePage() {
  // Directly use the imported JSON data
  const jobs: Job[] = jobsData

  return (
    <div className="min-h-screen bg-gray-50">
      <JobListings jobs={jobs} />
    </div>
  )
}
