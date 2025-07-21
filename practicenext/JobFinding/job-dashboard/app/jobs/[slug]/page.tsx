// app/jobs/[slug]/page.tsx
import { notFound } from 'next/navigation'
import jobsData from '@/data/jobs.json'
import type { Job } from '@/types/job'
import Sidebar from '@/components/Sidebar'
import { CircleCheckBig, MapPin } from 'lucide-react'

interface Params {
    params: {
        slug: string
    }
}

export default function JobDetailPage({ params }: Params) {
    const job = (jobsData as { job_postings: Job[] }).job_postings.find(
        job => job.slug === params.slug
    )

    if (!job) return notFound()

    return (
        <div className="p-6 flex sm:gap-8 md:gap-4 max-w-6xl mx-auto">
            <div className='flex-1'>
                <h1 className="text-3xl font-bold mb-4">Description</h1>
                <p className="mb-4">{job.description}</p>

                <h2 className="text-xl font-bold mt-10 mb-3">Responsibilities</h2>
                <ul className="space-y-2 mt-2">
                    {job.responsibilities.map((r, i) => (
                        <li key={i} className="flex items-start gap-2">
                            <CircleCheckBig className="text-green-500 mt-1" size={20} />
                            <span>{r}</span>
                        </li>
                    ))}
                </ul>

                <div>
                    <h2 className="text-xl font-bold mt-10 mb-3">Ideal Candidate we want</h2>
                    <ul className="list-disc pl-5 space-y-3">
                        {job.ideal_candidate.traits.map((c, i) => (
                            <li key={i} dangerouslySetInnerHTML={{ __html: c }} />
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className='text-xl font-bold mt-10 mb-3'>When & Where</h2>
                    <div className='flex gap-1.5'>
                        <MapPin color='#26A4FF' className='border-2 rounded-full text-9xl p-1' />
                        <p>{job.when_where}</p>
                    </div>
                </div>
            </div>
            <div className='w-full lg:w-1/3 xl:w-1/4'>
                <Sidebar
                    categories={job.about.categories}
                    location={job.about.location}
                    startDate={job.about.start_date}
                    endDate={job.about.end_date}
                    deadline={job.about.deadline}
                    postedOn={job.about.posted_on}
                    requiredSkills={job.about.required_skills}
                />
            </div>
        </div>
    )
}