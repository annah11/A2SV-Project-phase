import { Calendar, MapPin, Clock } from "lucide-react"

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

interface JobDetailProps {
  job: Job
}

export default function JobDetail({ job }: JobDetailProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">{job.fullDescription || job.description}</p>
          </section>

          {/* Responsibilities */}
          {job.responsibilities && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Responsibilities</h2>
              <ul className="space-y-3">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-gray-700">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Ideal Candidate */}
          {job.idealCandidate && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Ideal Candidate we want</h2>
              <ul className="space-y-4">
                {job.idealCandidate.map((candidate, index) => (
                  <li key={index}>
                    <h3 className="font-semibold text-gray-900 mb-1">{candidate.title}</h3>
                    {candidate.description && <p className="text-gray-700">{candidate.description}</p>}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* When & Where */}
          {job.whenWhere && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">When & Where</h2>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">{job.whenWhere}</p>
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 space-y-6">
            <h3 className="text-xl font-bold text-gray-900">About</h3>

            {/* Posted On */}
            {job.postedOn && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Posted On</p>
                  <p className="font-semibold text-gray-900">{job.postedOn}</p>
                </div>
              </div>
            )}

            {/* Deadline */}
            {job.deadline && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Deadline</p>
                  <p className="font-semibold text-gray-900">{job.deadline}</p>
                </div>
              </div>
            )}

            {/* Location */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-semibold text-gray-900">{job.location}</p>
              </div>
            </div>

            {/* Start Date */}
            {job.startDate && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Start Date</p>
                  <p className="font-semibold text-gray-900">{job.startDate}</p>
                </div>
              </div>
            )}

            {/* End Date */}
            {job.endDate && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">End Date</p>
                  <p className="font-semibold text-gray-900">{job.endDate}</p>
                </div>
              </div>
            )}

            {/* Categories */}
            {job.categories && job.categories.length > 0 && (
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {job.categories.map((category, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        category === "Marketing" ? "bg-orange-100 text-orange-800" : "bg-green-100 text-green-800"
                      }`}
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Required Skills */}
            {job.requiredSkills && job.requiredSkills.length > 0 && (
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {job.requiredSkills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
