import React from 'react'
import JobCard from './JobCard'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import jobsData from '../data/jobs.json'
import type { JobList } from '@/types/job'
import { join } from 'path'
const jobsDataTyped = jobsData as JobList
const JobListComponent = () => {
    return (
        <div className="max-w-4xl w-full mx-auto p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Opportunities</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Showing 73 results</p>
                </div>
                <div className="flex items-center">
                    <span className="text-sm font-medium mr-2">Sort by:</span>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Most Relevant" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="date">By date</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-4">
                {jobsDataTyped.job_postings.map((job, idx) => (
                    <JobCard
                        key={idx}
                        title={job.title}
                        description={job.description}
                        responsibilities={job.responsibilities}
                        company={job.company}
                        location={job.about.location}
                        image={job.image}
                        position_type={job.position_type}
                        work_type={job.work_type}
                        slug={job.slug}
                    />
                ))}
            </div>
        </div>
    );
}

export default JobListComponent