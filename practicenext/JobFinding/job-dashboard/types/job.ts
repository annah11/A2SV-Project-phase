// types/job.ts
export interface Job {
  title: string;
  description: string;
  responsibilities: string[];
  ideal_candidate: {
    age: string;
    gender: string;
    traits: string[];
  };
  when_where: string;
  about: {
    posted_on: string;
    deadline: string;
    location: string;
    start_date: string;
    end_date: string;
    categories: string[];
    required_skills: string[];
  };
  company: string;
  location: string;
  image: string;
  position_type: string[];
  work_type: string;
  slug: string;
  categories: string[];
}

export interface JobList {
  job_postings: Job[];
}