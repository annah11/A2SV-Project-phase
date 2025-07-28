import Image from "next/image"

interface Job {
  id: number
  title: string
  company: string
  description: string
  location: string
  type: string
  avatar: string
}

interface JobCardProps {
  job: Job
}

export default function JobCard({ job }: JobCardProps) {
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "full-time":
        return "bg-green-100 text-green-800"
      case "part-time":
        return "bg-blue-100 text-blue-800"
      case "contract":
        return "bg-purple-100 text-purple-800"
      case "remote":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <Image
            src={job.avatar || "/placeholder.svg"}
            alt={`${job.company} logo`}
            width={48}
            height={48}
            className="rounded-lg object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate">{job.title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getTypeColor(job.type)}`}>
              {job.type}
            </span>
          </div>

          <p className="text-sm font-medium text-gray-600 mb-2">{job.company}</p>

          <p className="text-sm text-gray-700 mb-3 line-clamp-2">{job.description}</p>

          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{job.location}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
