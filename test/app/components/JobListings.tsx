import Image from "next/image"
import Link from "next/link"

interface Job {
  id: number
  title: string
  company: string
  location: string
  description: string
  tags?: string[]
  avatar: string
}

interface JobListingsProps {
  jobs: Job[]
}

export default function JobListings({ jobs }: JobListingsProps) {
  const getTagColor = (tag: string) => {
    switch (tag.toLowerCase()) {
      case "in person":
        return "bg-green-100 text-green-800"
      case "education":
        return "bg-orange-100 text-orange-800"
      case "it":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Opportunities</h1>
          <p className="text-gray-600 mt-1">Showing {jobs.length} results</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Sort by:</span>
          <select className="border border-gray-300 rounded-md px-3 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Most relevant</option>
            <option>Newest first</option>
            <option>Oldest first</option>
          </select>
        </div>
      </div>

      {/* Job Cards */}
      <div className="space-y-6">
        {jobs.map((job) => (
          <Link key={job.id} href={`/jobs/${job.id}`}>
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Image
                    src={job.avatar || "/placeholder.svg"}
                    alt={`${job.company} logo`}
                    width={60}
                    height={60}
                    className="rounded-lg object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
                  <p className="text-gray-600 mb-2">
                    {job.company} • {job.location}
                  </p>
                  <p className="text-gray-700 mb-4 line-clamp-3">{job.description}</p>

                  {/* Tags */}
                  {job.tags && job.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag, index) => (
                        <span key={index} className={`px-3 py-1 rounded-full text-sm font-medium ${getTagColor(tag)}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
