import { notFound } from "next/navigation"
import JobDetail from "../../components/JobDetail"
import jobsData from "../../data/jobs.json"

interface Job {
  id: number
  title: string
  company: string
  location: string
  description: string
  fullDescription?: string
  responsibilities?: string[]
  idealCandidate?: Array<{ title: string; description: string }>
  postedOn?: string
  deadline?: string
  startDate?: string
  endDate?: string
  categories?: string[]
  requiredSkills?: string[]
  whenWhere?: string
}

function getJob(id: string): Job | null {
  const job = jobsData.find((job) => job.id === Number.parseInt(id))
  return job || null
}

export default function JobPage({ params }: { params: { id: string } }) {
  const job = getJob(params.id)

  if (!job) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <JobDetail job={job} />
    </div>
  )
}
